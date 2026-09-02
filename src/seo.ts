import { ARTICLES, articleBySlug } from './content/articles';
import { SITE } from './config/site';
import { LEGACY_REDIRECTS } from './config/redirects';

export interface SeoData {
  title: string;
  description: string;
  canonical: string;
  indexability: 'index' | 'noindex';
  type?: 'website' | 'article';
}

const CUSTOM: Record<string, Omit<SeoData, 'canonical'>> = {
  '/': { title: 'MPU Wissen – verständlich und quellenorientiert', description: 'MPU Wissen zu Ablauf, Kosten, Alkohol, Drogen, Abstinenznachweisen und Begutachtungsstellen – redaktionell strukturiert und transparent.', indexability: 'index', type: 'website' },
  '/wissen/': { title: 'MPU Wissen von A bis Z | MPU Wissen', description: 'Alle MPU-Wissensbereiche im Überblick: Grundlagen, Ablauf, Kosten, Alkohol, Drogen, Nachweise, Begutachtungsstellen und mehr.', indexability: 'index', type: 'website' },
  '/ratgeber/': { title: 'MPU-Ratgeber | MPU Wissen', description: 'Quellenorientierte MPU-Ratgeber mit dokumentiertem Status, Quellen und transparentem Fachreview.', indexability: 'index', type: 'website' },
  '/glossar/': { title: 'MPU-Glossar: wichtige Begriffe | MPU Wissen', description: 'Wichtige MPU-Begriffe kurz, verständlich und im richtigen Zusammenhang erklärt.', indexability: 'index', type: 'website' },
  '/faq/': { title: 'Häufige Fragen zur MPU | MPU Wissen', description: 'Allgemeine Fragen zur MPU nach Themen sortiert und ohne doppelte Service-FAQ.', indexability: 'noindex', type: 'website' },
  '/ueber-uns/': { title: 'Über das Wissensportal | MPU Wissen', description: 'Aufgabe, Grenzen und redaktionelles Modell von mpu-deincoach.de.', indexability: 'index', type: 'website' },
  '/redaktion/': { title: 'Redaktion und Fachprüfung | MPU Wissen', description: 'Rollen, Verantwortlichkeiten und Freigabestatus der MPU-Wissen-Redaktion.', indexability: 'index', type: 'website' },
  '/redaktionsrichtlinien/': { title: 'Redaktionsrichtlinien | MPU Wissen', description: 'Quellen-, Review- und Korrekturstandards für das MPU-Wissensportal.', indexability: 'index', type: 'website' },
  '/korrekturen/': { title: 'Korrekturen und Hinweise | MPU Wissen', description: 'So werden sachliche Hinweise und materiale Korrekturen im MPU-Wissensportal behandelt.', indexability: 'index', type: 'website' },
  '/impressum/': { title: 'Impressum – Freigabe ausstehend | MPU Wissen', description: 'Rechtliche Betreiberangaben sind noch nicht freigegeben.', indexability: 'noindex', type: 'website' },
  '/datenschutz/': { title: 'Datenschutz – Freigabe ausstehend | MPU Wissen', description: 'Datenschutzinformationen sind noch nicht freigegeben.', indexability: 'noindex', type: 'website' },
  '/agb/': { title: 'AGB – Freigabe ausstehend | MPU Wissen', description: 'Die Notwendigkeit und Fassung von AGB ist noch nicht freigegeben.', indexability: 'noindex', type: 'website' },
};

export const INDEXABLE_PATHS = Object.entries(CUSTOM).filter(([, meta]) => meta.indexability === 'index').map(([path]) => path)
  .concat(ARTICLES.filter((article) => article.indexability === 'index' && ['reviewed', 'published'].includes(article.status)).map((article) => article.slug));

const cleanPath = (path: string) => path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;

export function getPageSeo(inputPath: string): SeoData {
  const path = cleanPath(inputPath.split('?')[0]);
  const article = articleBySlug(path);
  if (article) return { title: article.metaTitle, description: article.metaDescription, canonical: article.canonical, indexability: article.indexability, type: 'article' };
  const custom = CUSTOM[path];
  if (custom) return { ...custom, canonical: `${SITE.url}${path === '/' ? '/' : path}` };
  const legacy = LEGACY_REDIRECTS.find((route) => route.from === path);
  if (legacy?.action === '410') return { title: 'Inhalt entfernt | MPU Wissen', description: 'Dieser veraltete Inhalt wurde ohne unpassende Weiterleitung entfernt.', canonical: `${SITE.url}${path}`, indexability: 'noindex', type: 'website' };
  return { title: 'Seite nicht gefunden | MPU Wissen', description: 'Die gesuchte Seite wurde nicht gefunden.', canonical: `${SITE.url}${path}`, indexability: 'noindex', type: 'website' };
}

export function schemaForPath(inputPath: string): object[] {
  const path = cleanPath(inputPath.split('?')[0]);
  const schemas: object[] = [{ '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE.url}/#organization`, name: SITE.legalName, url: SITE.url }];
  if (path === '/') schemas.push({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, inLanguage: SITE.language, publisher: { '@id': `${SITE.url}/#organization` }, potentialAction: { '@type': 'SearchAction', target: `${SITE.url}/?q={search_term_string}`, 'query-input': 'required name=search_term_string' } });
  const article = articleBySlug(path);
  if (article && article.indexability === 'index' && ['reviewed', 'published'].includes(article.status)) {
    schemas.push({ '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.excerpt, datePublished: article.publishedAt, dateModified: article.updatedAt, mainEntityOfPage: article.canonical, author: { '@type': article.author.kind, name: article.author.name }, publisher: { '@id': `${SITE.url}/#organization` }, citation: article.sources.filter((source) => source.url).map((source) => source.url) });
    if (article.schema.includes('FAQPage') && article.faq.length) schemas.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: article.faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) });
  }
  if (path !== '/' && !LEGACY_REDIRECTS.some((route) => route.from === path)) {
    const seo = getPageSeo(path);
    schemas.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Start', item: SITE.url }, { '@type': 'ListItem', position: 2, name: seo.title.split('|')[0].trim(), item: seo.canonical }] });
  }
  return schemas;
}

const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export function renderSeoHead(path: string): string {
  const seo = getPageSeo(path);
  const schema = schemaForPath(path).map((item) => `<script type="application/ld+json" data-static-schema="true">${JSON.stringify(item).replaceAll('<', '\\u003c')}</script>`).join('');
  return `<title>${escapeHtml(seo.title)}</title><meta name="description" content="${escapeHtml(seo.description)}"><meta name="robots" content="${seo.indexability === 'index' ? 'index,follow,max-image-preview:large' : 'noindex,follow'}"><link rel="canonical" href="${escapeHtml(seo.canonical)}"><meta property="og:type" content="${seo.type ?? 'website'}"><meta property="og:title" content="${escapeHtml(seo.title)}"><meta property="og:description" content="${escapeHtml(seo.description)}"><meta property="og:url" content="${escapeHtml(seo.canonical)}"><meta property="og:site_name" content="${SITE.name}"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escapeHtml(seo.title)}"><meta name="twitter:description" content="${escapeHtml(seo.description)}">${schema}`;
}

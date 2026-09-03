import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './App';
import { renderSeoHead } from './seo';
import { INDEXABLE_PATHS } from './seo';
import { ARTICLES } from './content/articles';
import { LEGACY_REDIRECTS } from './config/redirects';

export function render(url: string) {
  return { html: renderToString(<StaticRouter location={url}><App /></StaticRouter>), head: renderSeoHead(url) };
}

export const staticPaths = [
  '/', '/wissen/', '/ratgeber/', '/faq/', '/glossar/', '/ueber-uns/', '/redaktion/',
  '/redaktionsrichtlinien/', '/korrekturen/', '/impressum/', '/datenschutz/', '/agb/', '/404/',
  ...ARTICLES.map((article) => article.slug),
  ...LEGACY_REDIRECTS.filter((item) => item.action === '410' || item.action === 'MANUAL_REVIEW').map((item) => item.from),
];

export const staticRedirects = LEGACY_REDIRECTS
  .filter((item): item is typeof item & { to: string } => Boolean(item.to))
  .map((item) => ({ from: item.from, to: item.to, status: 301 }));

export const staticGonePaths = LEGACY_REDIRECTS
  .filter((item) => item.action === '410')
  .map((item) => item.from);

export const sitemapPaths = INDEXABLE_PATHS;

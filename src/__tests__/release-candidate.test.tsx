import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, staticPaths } from '../entry-server';
import { ARTICLES } from '../content/articles';
import { isArticlePublic, publicFAQItems } from '../content/model';
import { LEGACY_REDIRECTS } from '../config/redirects';
import { schemaForPath } from '../seo';

type Schema = { '@type'?: string; itemListElement?: Array<{ name: string; item: string }>; parentOrganization?: { '@id': string } };
const schemaOfType = (path: string, type: string) => schemaForPath(path).find((item) => (item as Schema)['@type'] === type) as Schema | undefined;

describe('release candidate guards', () => {
  it('serves undecided legacy routes as real 404s instead of a 200 "gone" page', () => {
    const undecided = LEGACY_REDIRECTS.filter((item) => item.action === 'MANUAL_REVIEW').map((item) => item.from);
    expect(undecided.length).toBeGreaterThan(0);
    for (const path of undecided) {
      expect(staticPaths).not.toContain(path);
      const result = render(path);
      expect(result.html).toContain('404');
      expect(result.html).not.toContain('410');
      expect(result.head).toContain('noindex');
    }
  });

  it('does not prerender a crawlable /404/ duplicate of 404.html', () => {
    expect(staticPaths).not.toContain('/404/');
  });

  it('never blocks a prerendered route in robots.txt so noindex stays visible to crawlers', () => {
    const robots = readFileSync(join(process.cwd(), 'public', 'robots.txt'), 'utf8');
    const disallowed = [...robots.matchAll(/^Disallow:\s*(\S+)/gim)].map((match) => match[1]);
    for (const rule of disallowed) expect(staticPaths.some((path) => path.startsWith(rule))).toBe(false);
  });

  it('emits no BreadcrumbList for unknown URLs', () => {
    expect(schemaOfType('/does-not-exist/', 'BreadcrumbList')).toBeUndefined();
  });

  it('mirrors the visible article breadcrumb (Start > Wissen > Artikel) in BreadcrumbList', () => {
    for (const article of ARTICLES) {
      const crumbs = schemaOfType(article.slug, 'BreadcrumbList')?.itemListElement ?? [];
      expect(crumbs.map((crumb) => crumb.name)).toEqual(['Start', 'Wissen', article.title]);
      expect(crumbs[2].item).toBe(article.canonical);
    }
  });

  it('links the portal organization to the MPUdeincoach brand entity', () => {
    expect(schemaOfType('/', 'Organization')?.parentOrganization?.['@id']).toBe('https://mpudeincoach.de/#organization');
  });

  it('marks approved articles as part of the website and in German', () => {
    for (const article of ARTICLES.filter(isArticlePublic)) {
      const schema = schemaOfType(article.slug, 'Article') as Record<string, unknown>;
      expect(schema.inLanguage).toBe('de-DE');
      expect(schema.isPartOf).toEqual({ '@id': 'https://mpudeincoach-wissen.de/#website' });
    }
  });

  it('never prerenders query-dependent search results (they render after hydration)', () => {
    expect(render('/?q=Begutachtungsstelle').html).not.toContain('search-results');
  });

  it('states the FAQ counts from the data instead of hard-coded numbers', () => {
    const faq = ARTICLES.flatMap((article) => article.faq);
    const approved = ARTICLES.flatMap(publicFAQItems).length;
    const html = render('/faq/').html;
    expect(html).toContain(`${approved} geprüfte Fragen sind veröffentlicht`);
    expect(html).toContain(`${faq.length - approved} weitere Fragen bleiben`);
  });

  it('links the alcohol CTA directly to the canonical main-site URL (no redirect hop)', async () => {
    const { CTA_LINKS } = await import('../config/site');
    expect(CTA_LINKS.ALKOHOL).toBe('https://mpudeincoach.de/mpu-wegen-alkohol');
  });

  it('serves the procedure article at /mpu-verfahren/ and no longer links /mpu-ablauf/ (slug clash with mpudeincoach.de/mpu-ablauf)', () => {
    const article = ARTICLES.find((item) => item.id === 'mpu-verfahren');
    expect(article?.slug).toBe('/mpu-verfahren/');
    expect(article?.canonical).toBe('https://mpudeincoach-wissen.de/mpu-verfahren/');
    expect(staticPaths).not.toContain('/mpu-ablauf/');
    expect(render('/mpu-ablauf/').html).toContain('404');
    for (const path of staticPaths) expect(render(path).html).not.toContain('href="/mpu-ablauf/"');
  });

  // Evidence in analysis/: an article-level expert decision (handoff 2026-09-03) exists, but no completed
  // reviewer record (name, qualification, commit, evidence location) and no documented legal review.
  it('claims no more about expert review than the repository documents', () => {
    const approved = ARTICLES.filter(isArticlePublic).map((article) => article.slug);
    for (const path of ['/', '/ratgeber/', ...approved]) {
      const html = render(path).html;
      expect(html).not.toMatch(/(namentliche|dokumentierte)[rn]? Fach(prüfung|freigabe)/);
      expect(html).not.toMatch(/rechtliche Prüfung[^.<]*abgeschlossen/);
    }
    for (const path of approved) expect(render(path).html).toContain('Experten-Handoff vom 3. September 2026');
    expect(render('/').html).toContain('Den Prüfstatus zeigt jeder Artikel.');
  });

  it('emits no canonical and no og:url on 404 and 410 pages (no canonical to a non-existent URL)', () => {
    for (const path of ['/not-found/', '/gibtsnicht/', '/a/b/c/', '/mpu-vorbereitung-ellwangen/', '/warenkorb/']) {
      const { head } = render(path);
      expect(head).not.toContain('rel="canonical"');
      expect(head).not.toContain('og:url');
      expect(head).toContain('noindex');
      expect(head).not.toContain('/not-found/');
    }
  });

  it('keeps a self-canonical on every real page', () => {
    for (const path of staticPaths.filter((item) => !LEGACY_REDIRECTS.some((route) => route.from === item))) {
      expect(render(path).head).toContain(`<link rel="canonical" href="https://mpudeincoach-wissen.de${path}">`);
    }
  });
});

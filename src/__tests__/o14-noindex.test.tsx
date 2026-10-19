import { describe, expect, it } from 'vitest';
import { render, sitemapPaths, staticPaths } from '../entry-server';
import { ARTICLES } from '../content/articles';
import { isArticlePublic, publicFAQItems } from '../content/model';
import { INDEXABLE_PATHS, getPageSeo, schemaForPath } from '../seo';

// Owner decision O-14 (19.10.2026): until the prescribed professional and legal review evidence is complete,
// both expert-handoff articles are APPROVED_NOINDEX: reachable, but excluded from indexing.
const O14 = ['/mpu-verfahren/', '/mpu-begutachtungsstelle/'];
const types = (path: string) => schemaForPath(path).map((item) => (item as { '@type': string })['@type']);

describe('O-14: expert-handoff articles are APPROVED_NOINDEX', () => {
  it('sets both articles to APPROVED_NOINDEX and leaves no article public', () => {
    for (const slug of O14) expect(ARTICLES.find((article) => article.slug === slug)?.publicationState).toBe('APPROVED_NOINDEX');
    expect(ARTICLES.filter(isArticlePublic)).toEqual([]);
  });

  it('keeps them reachable (prerendered, self-canonical) but noindex, outside the sitemap and without Article/FAQ schema', () => {
    for (const slug of O14) {
      expect(staticPaths).toContain(slug);
      const { head, html } = render(slug);
      expect(head).toContain('content="noindex,follow"');
      expect(head).toContain(`<link rel="canonical" href="https://mpudeincoach-wissen.de${slug}">`);
      expect(sitemapPaths).not.toContain(slug);
      expect(types(slug)).not.toContain('Article');
      expect(types(slug)).not.toContain('FAQPage');
      expect(html).toContain('Nicht für Suchmaschinen freigegeben');
      expect(html).not.toContain('Fachprüfung abgeschlossen');
    }
  });

  it('publishes no FAQ answer whose article is not public', () => {
    expect(ARTICLES.flatMap(publicFAQItems)).toEqual([]);
    const html = render('/faq/').html;
    expect(html).not.toContain('Wie lange dauert der gesamte MPU-Ablauf?');
    expect(html).toContain('Derzeit ist keine Frage für die Veröffentlichung freigegeben.');
    expect(types('/faq/')).not.toContain('FAQPage');
  });

  it('takes an empty /faq/ out of the index and the sitemap', () => {
    expect(getPageSeo('/faq/').indexability).toBe('noindex');
    expect(sitemapPaths).not.toContain('/faq/');
  });

  it('indexes exactly the 8 editorial hub and trust pages', () => {
    expect([...INDEXABLE_PATHS].sort()).toEqual(['/', '/glossar/', '/korrekturen/', '/ratgeber/', '/redaktion/', '/redaktionsrichtlinien/', '/ueber-uns/', '/wissen/']);
  });
});

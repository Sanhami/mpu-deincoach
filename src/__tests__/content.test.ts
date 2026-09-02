import { describe, expect, it } from 'vitest';
import { ARTICLES } from '../content/articles';
import { LEGACY_REDIRECTS } from '../config/redirects';
import { getPageSeo, schemaForPath } from '../seo';

describe('editorial content model', () => {
  it('keeps article slugs, canonicals and ids unique', () => {
    expect(new Set(ARTICLES.map((item) => item.id)).size).toBe(ARTICLES.length);
    expect(new Set(ARTICLES.map((item) => item.slug)).size).toBe(ARTICLES.length);
    expect(new Set(ARTICLES.map((item) => item.canonical)).size).toBe(ARTICLES.length);
  });

  it('contains all required governance fields and sources', () => {
    for (const article of ARTICLES) {
      expect(article.primaryTopic).toBeTruthy();
      expect(article.searchIntent).toBeTruthy();
      expect(article.ownerDomain).toBeTruthy();
      expect(article.uniqueValue).toBeTruthy();
      expect(article.sources.length).toBeGreaterThan(0);
      expect(article.body.length).toBeGreaterThan(2);
      expect(article.metaTitle.length).toBeLessThanOrEqual(65);
      expect(article.metaDescription.length).toBeLessThanOrEqual(170);
    }
  });

  it('keeps every unreviewed risk article noindex and excludes Article/FAQ schema', () => {
    for (const article of ARTICLES.filter((item) => item.status === 'review_required')) {
      expect(article.indexability).toBe('noindex');
      expect(getPageSeo(article.slug).indexability).toBe('noindex');
      expect(schemaForPath(article.slug).some((item) => ['Article', 'FAQPage'].includes((item as { '@type'?: string })['@type'] ?? ''))).toBe(false);
    }
  });
});

describe('legacy routing registry', () => {
  it('has unique sources and no self redirects', () => {
    expect(new Set(LEGACY_REDIRECTS.map((item) => item.from)).size).toBe(LEGACY_REDIRECTS.length);
    for (const item of LEGACY_REDIRECTS) expect(item.to).not.toBe(item.from);
  });

  it('contains the ten Phase 5 gone routes', () => {
    expect(LEGACY_REDIRECTS.filter((item) => item.action === '410')).toHaveLength(10);
  });

  it('does not create internal redirect chains', () => {
    const sources = new Set(LEGACY_REDIRECTS.map((item) => item.from));
    for (const item of LEGACY_REDIRECTS.filter((entry) => entry.to?.startsWith('/'))) expect(sources.has(item.to!)).toBe(false);
  });
});

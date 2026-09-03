import { describe, expect, it } from 'vitest';
import { ARTICLES } from '../content/articles';
import { articleIndexability, isArticlePublic, isFAQPublic, publicFAQItems, type PublicationState } from '../content/model';
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
      expect(article.sources.every((source) => source.governanceLevel >= 1 && source.governanceLevel <= 5)).toBe(true);
      expect(article.body.length).toBeGreaterThan(2);
      expect(article.metaTitle.length).toBeLessThanOrEqual(65);
      expect(article.metaDescription.length).toBeLessThanOrEqual(170);
    }
  });

  it('derives article indexability and schema only from APPROVED_PUBLIC', () => {
    for (const article of ARTICLES.filter((item) => !isArticlePublic(item))) {
      expect(articleIndexability(article)).toBe('noindex');
      expect(getPageSeo(article.slug).indexability).toBe('noindex');
      expect(schemaForPath(article.slug).some((item) => ['Article', 'FAQPage'].includes((item as { '@type'?: string })['@type'] ?? ''))).toBe(false);
    }
  });

  it('supports the complete publication-state workflow', () => {
    const states: PublicationState[] = ['DRAFT', 'FACHREVIEW_REQUIRED', 'LEGAL_REVIEW_REQUIRED', 'APPROVED_NOINDEX', 'APPROVED_PUBLIC', 'ARCHIVED'];
    expect(states).toHaveLength(6);
    expect(ARTICLES.every((article) => states.includes(article.publicationState))).toBe(true);
    expect(ARTICLES.filter(isArticlePublic).map((article) => article.slug).sort()).toEqual(['/mpu-ablauf/', '/mpu-begutachtungsstelle/']);
  });

  it('publishes only the six expert-approved FAQ items and scopes FAQ schema', () => {
    const approved = ARTICLES.flatMap(publicFAQItems);
    const blocked = ARTICLES.flatMap((article) => article.faq).filter((item) => !isFAQPublic(item));
    expect(approved).toHaveLength(6);
    expect(blocked).toHaveLength(8);

    const faqSchema = schemaForPath('/faq/').find((item) => (item as { '@type'?: string })['@type'] === 'FAQPage') as { mainEntity: unknown[] };
    expect(faqSchema.mainEntity).toHaveLength(6);
    for (const article of ARTICLES.filter(isArticlePublic)) {
      const articleFaqSchema = schemaForPath(article.slug).find((item) => (item as { '@type'?: string })['@type'] === 'FAQPage') as { mainEntity: unknown[] };
      expect(articleFaqSchema.mainEntity).toHaveLength(article.faq.length);
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

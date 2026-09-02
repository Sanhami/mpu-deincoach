export type ContentStatus = 'draft' | 'review_required' | 'reviewed' | 'published' | 'archived';

export type OwnerDomain = 'MAIN' | 'KNOWLEDGE' | 'SHARED_WITH_DIFFERENT_INTENT';

export interface PersonRef {
  id: string;
  name: string;
  role: string;
  kind: 'Person' | 'Organization';
}

export interface SourceRef {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  sourceType: 'official' | 'professional' | 'legacy' | 'internal';
  reviewedAt?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; id: string; title: string }
  | { type: 'list'; items: string[] }
  | { type: 'important' | 'callout' | 'reflection'; title: string; text: string };

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  primaryTopic: string;
  searchIntent: string;
  ownerDomain: OwnerDomain;
  competingExistingPage?: string;
  uniqueValue: string;
  pillar: string;
  pillarSlug: string;
  author: PersonRef;
  reviewer: PersonRef | null;
  reviewScope?: string;
  publishedAt?: string;
  updatedAt: string;
  lastReviewedAt?: string;
  nextReviewAt?: string;
  sources: SourceRef[];
  body: ArticleBlock[];
  faq: FAQItem[];
  relatedArticles: string[];
  ctaTarget: string | null;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  indexability: 'index' | 'noindex';
  schema: Array<'Article' | 'BreadcrumbList' | 'FAQPage'>;
  status: ContentStatus;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  path?: string;
  state: 'available' | 'review';
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  relatedPath?: string;
}

export type PublicationState =
  | 'DRAFT'
  | 'FACHREVIEW_REQUIRED'
  | 'LEGAL_REVIEW_REQUIRED'
  | 'APPROVED_NOINDEX'
  | 'APPROVED_PUBLIC'
  | 'ARCHIVED';

export type ReviewRequirement = 'MPU_FACHREVIEW' | 'LEGAL_REVIEW' | 'EDITORIAL_REVIEW' | 'SOURCE_VERIFICATION';

export type FAQPublicationState = 'PUBLIC_APPROVED' | 'REVIEW_REQUIRED';

export type SourceCurrencyStatus = 'CURRENT' | 'HISTORICAL_PREVIOUS_VERSION';

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
  governanceLevel: 1 | 2 | 3 | 4 | 5;
  currencyStatus?: SourceCurrencyStatus;
  reviewedAt?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  publicationState: FAQPublicationState;
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
  reviewerRole?: string;
  reviewScope?: string;
  reviewRequirements: ReviewRequirement[];
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
  schema: Array<'Article' | 'BreadcrumbList' | 'FAQPage'>;
  publicationState: PublicationState;
}

export const isArticlePublic = (article: Article) => article.publicationState === 'APPROVED_PUBLIC';

export const articleIndexability = (article: Article): 'index' | 'noindex' => isArticlePublic(article) ? 'index' : 'noindex';

export const isArticleReviewPending = (article: Article) => ['FACHREVIEW_REQUIRED', 'LEGAL_REVIEW_REQUIRED'].includes(article.publicationState);

export const isFAQPublic = (item: FAQItem) => item.publicationState === 'PUBLIC_APPROVED';

export const publicFAQItems = (article: Article) => article.faq.filter(isFAQPublic);

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

import { Link } from 'react-router-dom';
import { CTA_LINKS, type CtaKey } from '../config/site';
import type { Article, ArticleBlock, FAQItem, PersonRef, SourceRef } from '../content/model';
import { articleBySlug } from '../content/articles';
import { Breadcrumbs } from './Breadcrumbs';
import { CalloutBox, ImportantBox, KnowledgeCard, ReflectionBox, ReviewBadge } from './Cards';

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header className="article-header">
      <div className="article-labels"><span className="eyebrow">{article.pillar}</span>{article.status === 'review_required' && <ReviewBadge />}</div>
      <h1>{article.title}</h1>
      <p className="dek">{article.excerpt}</p>
    </header>
  );
}

export function ArticleMeta({ article }: { article: Article }) {
  return (
    <dl className="article-meta">
      <div><dt>Autor</dt><dd>{article.author.name}</dd></div>
      <div><dt>Stand</dt><dd><time dateTime={article.updatedAt}>{new Intl.DateTimeFormat('de-DE', { dateStyle: 'long' }).format(new Date(article.updatedAt))}</time></dd></div>
      <div><dt>Fachprüfung</dt><dd>{article.reviewer ? article.reviewer.name : 'Ausstehend'}</dd></div>
      <div><dt>Nächste Prüfung</dt><dd>{article.nextReviewAt ? new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium' }).format(new Date(article.nextReviewAt)) : 'Nach Freigabe'}</dd></div>
    </dl>
  );
}

export function TableOfContents({ blocks }: { blocks: ArticleBlock[] }) {
  const headings = blocks.filter((block): block is Extract<ArticleBlock, { type: 'heading' }> => block.type === 'heading');
  if (!headings.length) return null;
  return <nav className="toc" aria-label="Inhaltsverzeichnis"><strong>In diesem Artikel</strong><ol>{headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol></nav>;
}

function renderBlock(block: ArticleBlock, index: number) {
  if (block.type === 'paragraph') return <p key={index}>{block.text}</p>;
  if (block.type === 'heading') return <h2 key={block.id} id={block.id}>{block.title}</h2>;
  if (block.type === 'list') return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
  if (block.type === 'important') return <ImportantBox key={index} title={block.title}><p>{block.text}</p></ImportantBox>;
  if (block.type === 'reflection') return <ReflectionBox key={index} title={block.title}><p>{block.text}</p></ReflectionBox>;
  return <CalloutBox key={index} title={block.title}><p>{block.text}</p></CalloutBox>;
}

export function FAQSection({ items }: { items: FAQItem[] }) {
  if (!items.length) return null;
  return <section className="faq-section" aria-labelledby="faq-title"><span className="eyebrow">Kurz beantwortet</span><h2 id="faq-title">Häufige Fragen</h2>{items.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>;
}

export function SourcesList({ sources }: { sources: SourceRef[] }) {
  return <section className="sources" aria-labelledby="sources-title"><h2 id="sources-title">Quellen und Arbeitsgrundlage</h2><ol>{sources.map((source) => <li key={source.id}><strong>{source.title}</strong><span>{source.publisher} · {source.sourceType === 'professional' ? 'Fachquelle' : 'Primärquelle'}{source.reviewedAt ? ` · geprüft ${source.reviewedAt}` : ''}</span>{source.url && <a href={source.url} rel="noreferrer">Quelle öffnen ↗</a>}</li>)}</ol></section>;
}

export function AuthorCard({ person }: { person: PersonRef }) {
  return <section className="person-card"><span className="avatar" aria-hidden="true">R</span><div><span className="card-kicker">Verantwortlich für die Arbeitsfassung</span><h2>{person.name}</h2><p>{person.role}. Die namentliche fachliche Prüfung ist vor Indexfreigabe nachzutragen.</p><Link to="/redaktion/">So arbeitet die Redaktion →</Link></div></section>;
}

export function ReviewerCard({ reviewer, scope }: { reviewer: PersonRef | null; scope?: string }) {
  return <section className="reviewer-card"><ReviewBadge /><h2>{reviewer ? reviewer.name : 'Noch keine namentliche Fachfreigabe'}</h2><p>{scope}</p></section>;
}

export function ArticleUpdateInfo({ article }: { article: Article }) {
  return <p className="update-info">Diese Arbeitsfassung wurde am <time dateTime={article.updatedAt}>{article.updatedAt}</time> redaktionell bearbeitet. Sachliche Korrekturen kannst du über den <Link to="/korrekturen/">Korrekturweg</Link> melden.</p>;
}

export function ArticleCTA({ target }: { target: string | null }) {
  if (!target || !(target in CTA_LINKS)) return null;
  return <aside className="article-cta"><span className="eyebrow">Persönliche Einordnung</span><h2>Wissen beantwortet nicht jede Einzelfallfrage.</h2><p>Wenn du deinen konkreten Fall einordnen lassen möchtest, wechselst du hier bewusst zur kommerziellen Hauptseite.</p><a className="button dark" href={CTA_LINKS[target as CtaKey]}>Zu MPUdeincoach.de ↗</a></aside>;
}

export const CrossDomainCTA = ArticleCTA;

export function RelatedArticles({ paths }: { paths: string[] }) {
  const articles = paths.map(articleBySlug).filter((item): item is Article => Boolean(item));
  if (!articles.length) return null;
  return <section className="related" aria-labelledby="related-title"><span className="eyebrow">Weiterlesen</span><h2 id="related-title">Passende Wissensartikel</h2><div className="card-grid">{articles.map((article) => <KnowledgeCard key={article.id} article={article} />)}</div></section>;
}

export function ArticleLayout({ article }: { article: Article }) {
  return (
    <main id="main-content">
      <div className="wrap"><Breadcrumbs items={[{ label: 'Wissen', path: '/wissen/' }, { label: article.title }]} /></div>
      <article className="article wrap">
        <ArticleHeader article={article} />
        <ArticleMeta article={article} />
        <div className="article-grid">
          <aside className="article-aside"><TableOfContents blocks={article.body} /></aside>
          <div className="article-body">
            {article.body.map(renderBlock)}
            <FAQSection items={article.faq} />
            <SourcesList sources={article.sources} />
            <ArticleUpdateInfo article={article} />
            <AuthorCard person={article.author} />
            <ReviewerCard reviewer={article.reviewer} scope={article.reviewScope} />
            <ArticleCTA target={article.ctaTarget} />
          </div>
        </div>
      </article>
      <div className="wrap"><RelatedArticles paths={article.relatedArticles} /></div>
    </main>
  );
}

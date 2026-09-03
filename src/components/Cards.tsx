import { Link } from 'react-router-dom';
import type { Article, Pillar } from '../content/model';
import { isArticleReviewPending } from '../content/model';

export function ReviewBadge({ compact = false }: { compact?: boolean }) {
  return <span className={`review-badge${compact ? ' compact' : ''}`}><span aria-hidden="true">●</span> Fachprüfung ausstehend</span>;
}

export function PillarCard({ pillar }: { pillar: Pillar }) {
  const content = <><span className="card-kicker">{pillar.state === 'available' ? 'Wissensbereich' : 'In redaktioneller Prüfung'}</span><h3>{pillar.title}</h3><p>{pillar.description}</p>{pillar.path && <span className="text-link">Thema öffnen →</span>}</>;
  return pillar.path ? <Link className="pillar-card" to={pillar.path}>{content}</Link> : <div className="pillar-card muted">{content}</div>;
}

export function KnowledgeCard({ article }: { article: Article }) {
  return (
    <Link className="knowledge-card" to={article.slug}>
      <div className="card-top"><span>{article.pillar}</span>{isArticleReviewPending(article) && <ReviewBadge compact />}</div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <span className="text-link">Artikel lesen →</span>
    </Link>
  );
}

export function CalloutBox({ title, children, tone = 'neutral' }: { title: string; children: React.ReactNode; tone?: 'neutral' | 'important' | 'reflection' }) {
  return <aside className={`callout ${tone}`}><strong>{title}</strong><div>{children}</div></aside>;
}

export const ImportantBox = ({ title, children }: { title: string; children: React.ReactNode }) => <CalloutBox title={title} tone="important">{children}</CalloutBox>;
export const ReflectionBox = ({ title, children }: { title: string; children: React.ReactNode }) => <CalloutBox title={title} tone="reflection">{children}</CalloutBox>;

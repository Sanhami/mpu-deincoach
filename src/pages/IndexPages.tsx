import { Link, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { KnowledgeCard, PillarCard, ReviewBadge } from '../components/Cards';
import { ARTICLES } from '../content/articles';
import { GLOSSARY, PILLARS } from '../content/pillars';

export function KnowledgeIndexPage() {
  return <main id="main-content"><div className="wrap"><Breadcrumbs items={[{ label: 'MPU Wissen' }]} /><header className="page-header"><span className="eyebrow">Wissen von A bis Z</span><h1>MPU-Themen im Zusammenhang verstehen</h1><p>Diese Übersicht trennt Grundlagen, Verfahren, Anlassgruppen und Nachweise. Nur Bereiche mit nützlichem Inhalt erhalten eine eigene Seite.</p></header><div className="pillar-grid page-grid">{PILLARS.map((pillar) => <PillarCard key={pillar.id} pillar={pillar} />)}</div></div></main>;
}

export function GuideIndexPage() {
  return <main id="main-content"><div className="wrap"><Breadcrumbs items={[{ label: 'Ratgeber' }]} /><header className="page-header"><span className="eyebrow">Redaktionelle Bibliothek</span><h1>MPU-Ratgeber</h1><p>Quellenorientierte Arbeitsfassungen. Risikoinhalte bleiben bis zur namentlichen Fachfreigabe auf noindex.</p></header><div className="card-grid page-grid">{ARTICLES.map((article) => <KnowledgeCard key={article.id} article={article} />)}</div></div></main>;
}

export function GlossaryPage() {
  const [params] = useSearchParams();
  const selected = params.get('begriff');
  return <main id="main-content"><div className="wrap narrow"><Breadcrumbs items={[{ label: 'Glossar' }]} /><header className="page-header"><span className="eyebrow">Kuratierte Begriffe</span><h1>MPU-Glossar</h1><p>Kurze Definitionen mit Kontext. Begriffe werden nicht automatisch zu dünnen Einzelseiten aufgeblasen.</p></header><dl className="glossary">{GLOSSARY.map((entry) => <div key={entry.term} className={selected === entry.term ? 'selected' : ''}><dt>{entry.term}</dt><dd>{entry.definition}{entry.relatedPath && <Link to={entry.relatedPath}>Im Zusammenhang lesen →</Link>}</dd></div>)}</dl></div></main>;
}

export function FAQPage() {
  const entries = ARTICLES.flatMap((article) => article.faq.map((faq) => ({ ...faq, path: article.slug, pillar: article.pillar }))).filter((item, index, all) => all.findIndex((candidate) => candidate.question === item.question) === index);
  return <main id="main-content"><div className="wrap narrow"><Breadcrumbs items={[{ label: 'FAQ' }]} /><header className="page-header"><span className="eyebrow">Allgemeine Wissensfragen</span><h1>Häufige Fragen zur MPU</h1><p>Jede Frage hat genau einen redaktionellen Eigentümer. Service-, Buchungs- und Angebotsfragen liegen nicht auf diesem Wissensportal.</p><ReviewBadge /></header><section className="faq-list">{entries.map((entry) => <details key={entry.question}><summary><span>{entry.pillar}</span>{entry.question}</summary><p>{entry.answer}</p><Link to={entry.path}>Im ausführlichen Artikel weiterlesen →</Link></details>)}</section><p className="scope-note boxed">FAQ-Schema bleibt bis zur fachlichen Freigabe deaktiviert. Neun risikoreiche Legacy-Fragen und drei veraltete Fragen wurden nicht veröffentlicht.</p></div></main>;
}

import { Link, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { KnowledgeCard, PillarCard } from '../components/Cards';
import { ARTICLES } from '../content/articles';
import { isFAQPublic } from '../content/model';
import { GLOSSARY, PILLARS } from '../content/pillars';

export function KnowledgeIndexPage() {
  const live = PILLARS.filter((pillar) => pillar.path);
  const review = PILLARS.filter((pillar) => !pillar.path);
  return <main id="main-content"><div className="wrap"><Breadcrumbs items={[{ label: 'MPU Wissen' }]} /><header className="page-header"><span className="eyebrow">Wissen von A bis Z</span><h1>MPU-Themen im Zusammenhang verstehen</h1><p>Diese Übersicht trennt Verfahren, Anlassgruppen, Nachweise und praktische Orientierung. Nur Bereiche mit nützlichem Inhalt erhalten eine eigene Seite.</p></header><section className="knowledge-area" aria-labelledby="live-areas"><div className="section-heading compact"><div><span className="eyebrow">Direkt erreichbar</span><h2 id="live-areas">Aktive Wissensbereiche</h2></div><p>Jede Karte führt zu einer vorhandenen Seite. Der jeweilige Fachprüfstatus bleibt dort sichtbar.</p></div><div className="pillar-grid">{live.map((pillar) => <PillarCard key={pillar.id} pillar={pillar} />)}</div></section><section className="knowledge-area review-areas" aria-labelledby="review-areas"><div className="section-heading compact"><div><span className="eyebrow">Redaktionsplan</span><h2 id="review-areas">In redaktioneller Prüfung</h2></div><p>Diese Bereiche haben noch keine freigegebene Zielseite und sind deshalb bewusst nicht verlinkt.</p></div><div className="pillar-grid">{review.map((pillar) => <PillarCard key={pillar.id} pillar={pillar} />)}</div></section></div></main>;
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
  const entries = ARTICLES.flatMap((article) => article.faq.filter(isFAQPublic).map((faq) => ({ ...faq, path: article.slug, pillar: article.pillar }))).filter((item, index, all) => all.findIndex((candidate) => candidate.question === item.question) === index);
  return <main id="main-content"><div className="wrap narrow"><Breadcrumbs items={[{ label: 'FAQ' }]} /><header className="page-header"><span className="eyebrow">Allgemeine Wissensfragen</span><h1>Häufige Fragen zur MPU</h1><p>Diese Sammlung enthält ausschließlich fachlich freigegebene Fragen. Service-, Buchungs- und Angebotsfragen liegen nicht auf diesem Wissensportal.</p></header><section className="faq-list">{entries.map((entry) => <details key={entry.question}><summary><span>{entry.pillar}</span>{entry.question}</summary><p>{entry.answer}</p><Link to={entry.path}>Im ausführlichen Artikel weiterlesen →</Link></details>)}</section><p className="scope-note boxed">Sechs geprüfte Fragen sind veröffentlicht. Acht weitere Fragen bleiben bis zur erforderlichen Fach- oder Quellenprüfung gesperrt und erscheinen weder hier noch im FAQ-Schema.</p></div></main>;
}

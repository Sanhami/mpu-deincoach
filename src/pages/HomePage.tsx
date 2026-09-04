import { Link } from 'react-router-dom';
import { PILLARS } from '../content/pillars';
import { PillarCard } from '../components/Cards';
import { Search, SearchResults } from '../components/Search';

const situations = [
  ['Ich möchte den Ablauf verstehen', '/mpu-ablauf/', 'Schritte, Rollen und Untersuchung einordnen'],
  ['Meine MPU hat mit Alkohol zu tun', '/alkohol-mpu/', 'Konsummuster, Veränderung und Nachweise'],
  ['Meine MPU hat mit Drogen zu tun', '/drogen-mpu/', 'Anlass, Aufarbeitung und CTU-Wissen'],
  ['Ich möchte Kosten verstehen', '/mpu-kosten/', 'Kostenblöcke und Einflussfaktoren einordnen'],
  ['Ich brauche Informationen zu Nachweisen', '/abstinenznachweis/', 'Haar, Urin und Qualitätsmerkmale'],
  ['Ich suche eine Begutachtungsstelle', '/mpu-begutachtungsstelle/', 'Auswahl, Akte und praktische Kriterien'],
  ['Ich habe eine allgemeine Frage', '/faq/', 'Antworten nach Themen sortiert'],
] as const;

export function HomePage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Das redaktionelle Wissensportal</span>
            <h1>MPU Wissen,<br /><em>das Zusammenhänge erklärt.</em></h1>
            <p className="hero-copy">Verständliche Orientierung zu Ablauf, Alkohol, Drogen, Abstinenznachweisen und Begutachtungsstellen – quellenorientiert, ruhig und ohne Verkaufsversprechen.</p>
            <p className="scope-note">Allgemeine Information. Keine Rechtsberatung, Diagnose oder individuelle Bestehensprognose.</p>
          </div>
          <div className="hero-search"><span className="search-index" aria-hidden="true">01</span><Search large /><SearchResults /></div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="situation-title">
        <div className="section-heading"><div><span className="eyebrow">Direkter Einstieg</span><h2 id="situation-title">Wo stehst du gerade?</h2></div><p>Wähle die Frage, die deiner Situation am nächsten kommt. Du landest in einem Wissensbereich – nicht in einem Verkaufstrichter.</p></div>
        <div className="situation-grid">{situations.map(([title, path, text], index) => <Link key={path} to={path}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><b aria-hidden="true">↗</b></Link>)}</div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <div className="section-heading"><div><span className="eyebrow">Wissenslandkarte</span><h2>Die wichtigsten Themen</h2></div><p>Vorhandene Bereiche sind direkt erreichbar und zeigen ihren Prüfstatus auf der Zielseite. Weitere Themen bleiben als Redaktionsplan sichtbar, aber ohne leere SEO-Seiten.</p></div>
          <div className="pillar-grid">{PILLARS.filter((pillar) => pillar.path).map((pillar) => <PillarCard key={pillar.id} pillar={pillar} />)}</div>
        </div>
      </section>

      <section className="editorial-band">
        <div className="wrap editorial-grid">
          <div><span className="eyebrow">Redaktionelle Qualität</span><h2>Woran du belastbare Orientierung erkennst</h2></div>
          <ol>
            <li><span>01</span><div><h3>Intent vor Textmenge</h3><p>Jede Seite beantwortet eine klar umrissene Wissensfrage und nennt ihren Domain-Eigentümer.</p></div></li>
            <li><span>02</span><div><h3>Quellen vor Gewissheit</h3><p>Rechtliche, medizinische und verfahrensbezogene Aussagen werden belegt oder als prüfpflichtig markiert.</p></div></li>
            <li><span>03</span><div><h3>Review vor Indexierung</h3><p>Risikoinhalte werden erst nach namentlicher Fachprüfung für Suchmaschinen freigegeben.</p></div></li>
            <li><span>04</span><div><h3>Korrekturen bleiben sichtbar</h3><p>Materiale Änderungen erhalten einen nachvollziehbaren Korrekturhinweis.</p></div></li>
          </ol>
          <div className="policy-links"><Link to="/redaktionsrichtlinien/">Redaktionsrichtlinien lesen →</Link><Link to="/korrekturen/">Korrektur melden →</Link></div>
        </div>
      </section>

      <section className="section wrap about-strip">
        <span className="about-monogram" aria-hidden="true">W</span>
        <div><span className="eyebrow">Über dieses Portal</span><h2>Wissen und persönliche Hilfe haben getrennte Aufgaben.</h2><p>mpudeincoach-wissen.de erklärt. mpudeincoach.de berät und bietet Vorbereitung an. Diese Trennung schützt vor doppelten Inhalten und macht klar, wann allgemeines Wissen endet.</p><Link to="/ueber-uns/" className="text-link">Portal und Redaktion kennenlernen →</Link></div>
      </section>

      <section className="wrap transition-card">
        <div><span className="eyebrow">Wenn allgemeines Wissen nicht reicht</span><h2>Dein Fall braucht eine persönliche Einordnung?</h2><p>Die Fallanalyse gehört bewusst zur kommerziellen Hauptseite und wird hier nicht dupliziert.</p></div>
        <a className="button dark" href="https://mpudeincoach.de/#fallanalyse">Zu MPUdeincoach.de ↗</a>
      </section>
    </main>
  );
}

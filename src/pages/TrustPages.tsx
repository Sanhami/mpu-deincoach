import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ReviewBadge } from '../components/Cards';

function TrustLayout({ label, title, intro, children }: { label: string; title: string; intro: string; children: React.ReactNode }) {
  return <main id="main-content"><div className="wrap narrow"><Breadcrumbs items={[{ label: title }]} /><header className="page-header"><span className="eyebrow">{label}</span><h1>{title}</h1><p>{intro}</p></header><div className="prose">{children}</div></div></main>;
}

export function AboutPage() {
  return <TrustLayout label="Über das Portal" title="Wissen erklären. Grenzen sichtbar machen." intro="mpu-deincoach.de ist das redaktionelle Wissensportal der MPUdeincoach Markenfamilie."><h2>Zwei Domains, zwei Aufgaben</h2><p>Dieses Portal beantwortet allgemeine Informationsfragen. Die kommerzielle Hauptseite <a href="https://mpudeincoach.de">mpudeincoach.de</a> ist für Fallanalyse, Beratung, Vorbereitung, Angebote und Produkte zuständig. Inhalte werden nicht zwischen beiden Domains umgeschrieben oder dupliziert.</p><h2>Redaktion statt Behauptung</h2><p>Artikel erhalten strukturierte Metadaten, Quellen, Status, Prüfdatum und einen Korrekturweg. Rechtliche, medizinische und verfahrensbezogene Aussagen werden nur mit geeigneter Quelle und fachlicher Prüfung indexierbar.</p><h2>Wer steht hinter den Texten?</h2><p>Die aktuelle technische Arbeitsfassung wird von der „Redaktion MPU Wissen“ geführt. Eine reale Autor- und Reviewer-Zuordnung wird erst nach dokumentierter Freigabe veröffentlicht; Namen oder Qualifikationen werden nicht erfunden.</p><ReviewBadge /><p><Link to="/redaktion/">Mehr über Rollen und Freigaben →</Link></p></TrustLayout>;
}

export function EditorialPage() {
  return <TrustLayout label="Verantwortung" title="Redaktion und Fachprüfung" intro="Jeder Inhalt hat eine dokumentierte Rolle, einen Status und einen klaren Freigabeweg."><h2>Redaktionelle Rolle</h2><p>Die Redaktion strukturiert Themen, prüft Suchintention und Domain-Eigentum, formuliert verständlich und dokumentiert Quellen. Sie ersetzt keine rechtliche, medizinische oder psychologische Fachprüfung.</p><h2>Fachliche Rolle</h2><p>Hochrisiko-Inhalte benötigen eine namentlich verantwortete Prüfung mit offengelegtem Umfang. Solange diese Person nicht beauftragt und nachgewiesen ist, tragen die betreffenden Artikel den Status „Fachprüfung ausstehend“ und bleiben auf noindex.</p><h2>Offene Besetzung</h2><p>Autor- und Reviewer-Profile werden erst ergänzt, wenn Identität, Rolle, Qualifikation und Einwilligung zur Veröffentlichung belegt sind.</p></TrustLayout>;
}

export function EditorialPolicyPage() {
  return <TrustLayout label="Qualitätsstandard" title="Redaktionsrichtlinien" intro="Unsere Regeln sollen deutlich machen, wie eine Aussage entsteht und wann sie nicht veröffentlicht wird."><h2>Vor jedem wichtigen Artikel</h2><ul><li>Primärthema und Suchintention festlegen</li><li>Domain-Eigentümer und konkurrierende Seite dokumentieren</li><li>eigenständigen Nutzwert definieren</li><li>Quellen- und Reviewbedarf festlegen</li><li>Canonical, Indexierbarkeit und Schema prüfen</li></ul><h2>Quellenhierarchie</h2><p>Aktuelle Gesetze, Behörden und fachliche Primärquellen haben Vorrang. Legacy-Texte sind nur historische Hinweise. Interne Fachzusammenfassungen helfen bei der Struktur, ersetzen aber keine Publikationsfreigabe.</p><h2>Sensible Themen</h2><p>Fristen, Behördenverfahren, Abstinenz, Laborwerte, Cannabisrecht, Diagnosen und konkrete Fallstrategien bleiben bis zur geeigneten menschlichen Prüfung reviewpflichtig. Es gibt keine Bestehensgarantien.</p><h2>KI-Unterstützung</h2><p>Werkzeuge dürfen Recherche, Struktur und Sprachbearbeitung unterstützen. Redaktionelle Verantwortung, Quellenprüfung und Fachfreigabe bleiben menschliche Aufgaben.</p></TrustLayout>;
}

export function CorrectionsPage() {
  return <TrustLayout label="Transparenz" title="Korrekturen und Hinweise" intro="Sachliche Fehler sollen schnell, nachvollziehbar und ohne künstliche Aktualisierung korrigiert werden."><h2>So meldest du einen Hinweis</h2><p>Der produktive Kontaktkanal ist noch nicht freigegeben. Bis zur Benennung einer verantwortlichen Redaktion werden keine Formulare oder alten WordPress-Endpunkte übernommen.</p><h2>Was wir für eine Prüfung brauchen</h2><ul><li>URL und betroffene Passage</li><li>kurze Beschreibung des möglichen Fehlers</li><li>wenn vorhanden: aktuelle Primärquelle</li><li>keine sensiblen Fallakten oder Gesundheitsdaten</li></ul><h2>Korrekturprotokoll</h2><p>Materiale Korrekturen werden künftig mit Datum, Art der Änderung und Prüfrolle dokumentiert. Es liegen noch keine veröffentlichten Korrekturen vor.</p></TrustLayout>;
}

export function LegalPlaceholderPage({ kind }: { kind: 'Impressum' | 'Datenschutz' | 'AGB' }) {
  return <TrustLayout label="Rechtlicher Inhalt – noindex" title={kind} intro="Dieser rechtliche Inhalt ist noch nicht durch den verantwortlichen Betreiber freigegeben."><div className="legal-warning"><strong>Nicht veröffentlichungsbereit</strong><p>Alte WordPress-Rechtstexte wurden bewusst nicht übernommen. Betreiberangaben, Datenschutzverarbeitung und gegebenenfalls die Notwendigkeit von AGB müssen durch die zuständige Stelle neu freigegeben werden.</p></div></TrustLayout>;
}

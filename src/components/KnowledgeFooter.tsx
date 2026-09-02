import { Link } from 'react-router-dom';

export function KnowledgeFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="eyebrow">MPU Wissen</p>
          <p className="footer-lead">Ein redaktionelles Wissensportal aus der MPUdeincoach Markenfamilie.</p>
          <p className="fine-print">Allgemeine Information, keine Rechtsberatung, medizinische Diagnose oder Bestehensprognose.</p>
        </div>
        <div>
          <h2>Wissen</h2>
          <Link to="/wissen/">Themenübersicht</Link>
          <Link to="/ratgeber/">Ratgeber</Link>
          <Link to="/glossar/">Glossar</Link>
          <Link to="/faq/">FAQ</Link>
        </div>
        <div>
          <h2>Redaktion</h2>
          <Link to="/redaktion/">Redaktion</Link>
          <Link to="/redaktionsrichtlinien/">Richtlinien</Link>
          <Link to="/korrekturen/">Korrekturen</Link>
          <Link to="/ueber-uns/">Über das Portal</Link>
        </div>
        <div>
          <h2>Rechtliches</h2>
          <Link to="/impressum/">Impressum</Link>
          <Link to="/datenschutz/">Datenschutz</Link>
          <a href="https://mpudeincoach.de">Persönliche Hilfe ↗</a>
        </div>
      </div>
      <div className="wrap footer-bottom">© 2026 MPU Wissen <span>Stand der redaktionellen Systemprüfung: 2. September 2026</span></div>
    </footer>
  );
}

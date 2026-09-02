import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <main id="main-content" className="status-page wrap"><span className="status-code">404</span><h1>Diese Seite gibt es nicht.</h1><p>Vielleicht findest du das gesuchte Thema in unserer Wissensübersicht.</p><Link className="button dark" to="/wissen/">Zu den MPU-Themen</Link></main>;
}

export function GonePage() {
  return <main id="main-content" className="status-page wrap"><span className="status-code">410</span><h1>Dieser alte Inhalt wurde entfernt.</h1><p>Die Seite gehörte zu einem früheren System und hat keinen passenden, sicheren Nachfolger. Deshalb leiten wir nicht auf eine unpassende Seite weiter.</p><Link className="button dark" to="/wissen/">Aktuelles MPU-Wissen</Link></main>;
}

export function ExternalRedirectPage({ target }: { target: string }) {
  useEffect(() => { window.location.replace(target); }, [target]);
  return <main id="main-content" className="status-page wrap"><span className="status-code">301</span><h1>Du wirst weitergeleitet.</h1><p>Dieser Inhalt gehört zur kommerziellen Hauptseite.</p><a className="button dark" href={target}>Weiter zu MPUdeincoach.de</a></main>;
}

# MPU SEO Actions – Befunde, Korrekturen, offene Maßnahmen

Stand: 19.10.2026. „Behoben“ heißt: Fix im Code, Test vorhanden, lokal gebaut und geprüft. Auf Staging/Produktion ist der Fix erst nach Merge und Deploy sichtbar.
Rankingeffekte wurden **nicht** gemessen; es liegen keine GSC-Daten vor.

## A. Wissensportal (`Sanhami/mpu-deincoach`, Branch `claude/wissen-rc-2026-10`)

### Behoben

| ID | Befund (mit Nachweis) | Korrektur | Test |
| --- | --- | --- | --- |
| S1 | `/mpu-vorbereitung-ellwangen/` → Staging `200` mit Text „410 … entfernt“ und Titel „Seite nicht gefunden“ (Soft-404) | Route wird nicht mehr vorgerendert; App zeigt 404; Host liefert echten 404 | `release-candidate.test.tsx`, Crawl-Guard |
| S2 | `robots.txt` mit `Disallow: /impressum/` usw. – Crawler können das `noindex` nicht lesen | Disallow entfernt, noindex bleibt im HTML | Unit-Test + Crawl-Guard „kein vorgerenderter Pfad gesperrt“ |
| S3 | `/404/` als zweite, mit 200 erreichbare 404-Seite | nicht mehr vorgerendert (`404.html` bleibt) | Unit-Test + Crawl-Guard |
| S4 | React-Hydration-Fehler #418 auf `/?q=…`, auf Staging reproduziert; `?begriff=`-Markierung wirkungslos | Query-abhängige UI erst nach der Hydration (`useHydrated`) | jsdom-Hydrationstest über 13 URLs |
| S5 | Alkohol-CTA → `/mpu-vorbereitung-alkohol` (301-Hop) | direkt `/mpu-wegen-alkohol` | Unit-Test; `npm run links:external`: 16/16 Ziele 200 ohne Redirect |
| S6 | BreadcrumbList auf 404-Seiten; bei Artikeln 2 statt der sichtbaren 3 Ebenen | nur echte Seiten; Artikel `Start > Wissen > Artikel` | Unit-Test |
| S7 | Organization-Schema ohne Bezug zur Marke | `parentOrganization` → `https://mpudeincoach.de/#organization` | Unit-Test |
| S8 | Article-Schema ohne `inLanguage`/`isPartOf` | ergänzt | Unit-Test |
| S9 | – | Crawl validiert jetzt jedes JSON-LD (parsebar, `@context`, `@type`) | `npm run crawl` |
| S10 | Suchergebnis-Karten zeigten den gesamten Artikeltext | Teaser (Excerpt) | Hydrationstest |
| S11 | Markenschrift fehlte; H1-Wortbruch bei 375 px; Linkziele < 24 px | siehe `MPU_EXECUTION_LOG.md` | Browser-Messung 375/768/1024/1440: kein Überlauf |

### Geprüft, ohne Handlungsbedarf (lokaler Build)

- Jede der 29 HTML-Dateien hat Titel, Description, Canonical und genau eine H1. Keine doppelten indexierbaren Titel, Descriptions oder Canonicals.
- Die Sitemap entspricht exakt den 11 indexierbaren Routen und nutzt nur die Produktionsdomain.
- Die 18 Weiterleitungen sind einstufig 301, ohne Ketten oder Selbstweiterleitung, interne Ziele existieren. Die 10 410-Regeln sind erzwungen (`410!`). Es gibt keinen SPA-Catch-all, unbekannte URLs liefern echte 404.
- Ohne JavaScript liefern alle Seiten Inhalt, Metadaten und Schema vollständig im HTML (statisches Prerendering, per Render-Test geprüft).
- Article- und FAQ-Schema erscheinen nur bei `APPROVED_PUBLIC` bzw. `PUBLIC_APPROVED`.
- Quellen sind sichtbar, inklusive Quellenstufe und Prüfdatum. Die BASt-Leitlinie ist als „historische Vorversion“ gekennzeichnet.
- Datenflüsse: keine Formulare mit Serverziel, keine Cookies, kein Storage, kein Tracking, keine Fremd-Requests.

### Offen

| ID | Maßnahme | Abhängig von | Prio |
| --- | --- | --- | --- |
| O1 | Produktionsdomain vom Lovable-Projekt lösen oder dort sofort auf noindex/offline setzen | Inhaber (Lovable/IONOS-DNS) | **P0** |
| O2 | Nach dem Domainwechsel zu Netlify: Live-Prüfung 200/301/404/410, Header, `www` → Apex als **301** | O1, Produktionsfreigabe | P1 |
| O3 | Kannibalisierung Begutachtungsstelle (Portal ↔ Hauptseite) entscheiden | Inhaber, GSC-Daten | P1 |
| O4 | Slug `/mpu-ablauf/` → `/mpu-verfahren/` vor dem Launch (kostenlos, solange nicht live) | Inhaber | P2 |
| O5 | Altdomain `mpu-deincoach.de` (423 Locked): entweder als Alias auf Netlify mit 301 auf die neue Domain, dann wirken die 18/10 Legacy-Regeln, oder bewusst aufgeben | Inhaber (Hosting-Vertrag) | P2 |
| O6 | Search Console für die neue Domain anlegen, Sitemap einreichen, Hauptseite verknüpfen | Inhaber (kostenlos) | P2 nach Launch |
| O7 | Optionale `llms.txt` für das Portal, generiert nur aus freigegebenen Seiten (Google wertet sie nicht aus; manche KI-Crawler schon) | – | P4 |
| O8 | Core Web Vitals im Feld messen (CrUX/GSC), erst wenn die Domain Traffic hat. Vorhandene Labordaten: Lighthouse Performance 99 (Home) und 96 (Begutachtungsstelle) laut `staging-validation/07-lighthouse.md`. Bundle aktuell: JS 306 KB roh / 95 KB gzip, CSS 20 KB | Launch | P3 |

## B. Hauptseite (`Sanhami/mpu-lichtblick`) – nur geprüft, nicht geändert

Live-Crawl am 19.10.2026 (`https://mpudeincoach.de/sitemap.xml`):
- 48 Sitemap-URLs, alle `200`, alle self-canonical, keine noindex-Seite in der Sitemap, je genau eine H1, keine doppelten Titel oder Descriptions.
- 51 interne Linkziele, alle `200`.
- Median-Antwortzeit ca. 45 ms (aus Frankfurt-nahem Netz gemessen, kein CWV-Wert).
- Schema: Organization/WebSite/ProfessionalService/Person auf allen Seiten, BreadcrumbList 47, FAQPage 35, Article 17.
- Repo-Prüfungen: `bun test` 121/121 grün (davon 28 Lead-Funnel-/CRM-Mock-Tests), `bun run seo:check` ohne kritische Fehler (2 Warnungen: kurze Descriptions auf `/mpu-vorbereitung-schwaebisch-hall` und `/ueber-hami`).

Kleinere offene Punkte:

| ID | Befund | Empfehlung | Prio |
| --- | --- | --- | --- |
| H1 | Titel mit 67 Zeichen: `/partnernetzwerk`, `/angebote/mpu-einzelvorbereitung` | kürzen (≤ 60) | P4 |
| H2 | 2 kurze Descriptions (seo:check) | auf 140–160 Zeichen ausbauen | P4 |
| H3 | `/mpu-begutachtungsstelle` konkurriert mit dem Portal | siehe O3 | P1 |
| H4 | Nach dem Portal-Launch Kontextlinks Haupt → Portal (Content Map §3) | nach O1/O2 | P2 |

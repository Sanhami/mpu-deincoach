# Wissensportal – technischer Ist-Stand

Stand: 19.10.2026, geprüft gegen Code (`main` = `09028b9`), lokalen Build und echte HTTP-Antworten.
Maßgeblich für den technischen Stand sind Code und HTTP-Antworten. Die dokumentierten redaktionellen Freigaben gelten unabhängig davon weiter.

## 1. Repository

| Punkt | Befund |
| --- | --- |
| Repository | `Sanhami/mpu-deincoach` (öffentlich), einziger Branch `main` |
| Letzter Commit vor dieser Arbeit | `09028b9` „feat: stabilize MPU Wissen routing and knowledge architecture“ (04.09.2026) |
| Stack | React 19, React Router 7, Vite 7, SSR-gestütztes statisches Prerendering, Node 22.12+ |
| CI | `.github/workflows/qa.yml` → `npm ci` + `npm run qa` bei PR und Push auf `main` |
| Baseline-QA (`npm ci`, `npm run qa`) | grün: Typecheck, Lint, 22 → jetzt 36 Tests, Client-/SSR-Build, Prerender, Crawl |

## 2. Ausgelieferte Hosts

| Host | Was tatsächlich ausgeliefert wird | Bewertung |
| --- | --- | --- |
| `mpu-deincoach-staging.netlify.app` | aktueller `main`-Build (Asset `index-DkCsCvYq.js` = lokaler Build), globaler `X-Robots-Tag: noindex, nofollow` auf 200/301/404/410 | korrekt gesperrt |
| `mpudeincoach-wissen.de` | **Lovable-Hosting** (IP `185.158.133.1`, Cloudflare, `x-deployment-id`, Lovable-Badge im HTML), **älterer Build**: Startseite `200` mit `<meta name="robots" content="index,follow">`, **kein** `X-Robots-Tag`; `robots.txt` und `sitemap.xml` mit 12 URLs ohne Schrägstrich (u. a. `/mpu-wegen-cannabis`, gibt es im Repo nicht); **jede Unterseite inkl. `/impressum` antwortet `404 Not Found`** | **P0** – siehe unten |
| `www.mpudeincoach-wissen.de` | `302` → `https://mpudeincoach-wissen.de/` | 302 statt 301 |
| `mpu-deincoach.de` (Altdomain, WordPress-Bestand) | `85.13.163.40`, Apache, **jede URL `423 Locked`** | Weiterleitungs-Registry (18× 301, 10× 410) greift dort nicht |

### P0-Befund: Produktionsdomain ist live, indexierbar und unvollständig
`mpudeincoach-wissen.de` ist an ein Lovable-Projekt gebunden, obwohl README und `analysis/release-readiness/03-lovable-handoff.md` Lovable als Hosting ausschließen und laut Staging-Bericht die Produktionsdomain „nicht verbunden“ ist. Folgen:
- Die Startseite ist für Suchmaschinen freigegeben, ohne dass Rechtstexte freigegeben sind.
- Ein Impressum ist nicht erreichbar (404).
- Die ausgelieferte Sitemap verweist ausschließlich auf 404-Seiten.

Eine Websuche nach `site:mpudeincoach-wissen.de` lieferte keine Treffer (Suchindex außerhalb Google, nicht beweiskräftig). Google-Search-Console-Daten liegen nicht vor.
Behebung erfordert Zugriff auf Lovable/DNS → **Inhaberentscheidung** (`MPU_OWNER_ACTIONS.md`, Punkt 1). Code-seitig nicht lösbar.

## 3. Zahlen (neu verifiziert)

| Kennzahl | älterer Prüfstand (Doku) | `main` 09028b9 | nach diesem Branch |
| --- | --- | --- | --- |
| vorgerenderte HTML-Dateien | 31 | 31 | **29** (`/404/`-Duplikat und `MANUAL_REVIEW`-Route entfernt) |
| indexierbare Routen | **8** | **11** | 11 |
| Sitemap-URLs | 8 | 11 | 11 |
| eindeutige 301-Weiterleitungen | 18 | 18 | 18 |
| 410-Regeln (erzwungen, `410!`) | 10 | 10 | 10 |
| `MANUAL_REVIEW` | 1 (Ellwangen) | 1, als **200** ausgeliefert | 1, jetzt echter **404** |
| Artikel gesamt / indexierbar | 6 / 0 | 6 / 2 | 6 / 2 |
| FAQ gesamt / öffentlich | 14 / 0 | 14 / 6 | 14 / 6 |

Indexierbar (11): `/`, `/wissen/`, `/ratgeber/`, `/faq/`, `/glossar/`, `/ueber-uns/`, `/redaktion/`, `/redaktionsrichtlinien/`, `/korrekturen/`, `/mpu-ablauf/`, `/mpu-begutachtungsstelle/`.

Ausdrücklich gesperrt (noindex, nicht in Sitemap, kein Article-/FAQ-Schema):
- Fachreview ausstehend: `/mpu-kosten/`, `/alkohol-mpu/`, `/drogen-mpu/`, `/abstinenznachweis/`
- Rechtstext ausstehend: `/impressum/`, `/datenschutz/`, `/agb/`
- 8 von 14 FAQ-Einträgen (`REVIEW_REQUIRED`)

## 4. Widersprüche in der Dokumentation

| Thema | Dokument A | Dokument B / Code | Auflösung |
| --- | --- | --- | --- |
| Indexierbare Routen | `release-readiness/RELEASE-READINESS-MASTER-REPORT.md` und `staging-validation/…MASTER-REPORT.md`: 8 | Code und `editorial-approval/…MASTER-REPORT.md`: 11 | Commit `f311e38` (03.09.) setzte nach Experten-Handoff 2 Artikel und 6 FAQ auf freigegeben. Technisch gilt **11**. |
| `/mpu-ablauf/`, `/mpu-begutachtungsstelle/` | `staging-validation/12-remaining-release-blockers.md`: review_required | `articles.ts`: `APPROVED_PUBLIC` | Staging-Bericht ist älter. Code maßgeblich. |
| FAQ-Indexierung | `staging-validation`: `/faq/` erst nach Reviewer-Freigabe indexieren | Code: `/faq/` indexierbar mit 6 Einträgen | Folgt dem Experten-Handoff (`14-expert-claim-matrix-reconciliation.md`). Die Klärung der Fragen-Zuständigkeit mit der Hauptseite (`06-intent-overlap-resolution.md`, `MAIN_SITE_FOLLOWUP`) ist weiter offen. |
| Wissensdomain | `human-approval/11-brand-architecture-decision.md`, `release-readiness/03-lovable-handoff.md`: `mpu-deincoach.de` | README, `netlify.toml`, `site.ts`, Auftrag: `mpudeincoach-wissen.de` | Code und Auftrag nennen `mpudeincoach-wissen.de`. Die Altdomain ist gesperrt (423). Die Rolle der Altdomain muss der Inhaber entscheiden. |
| Namentliche Fachprüfung | Startseite: „Risikoinhalte werden erst nach **namentlicher** Fachprüfung … freigegeben“ | Beide freigegebenen Artikel: `reviewer: null`; `HUMAN-APPROVAL-MASTER`: „Public reviewer identities supplied: no“ | Öffentliche Aussage und Datenstand passen nicht zusammen → Inhaberentscheidung (Reviewer nennen oder Aussage anpassen). |
| Lovable | README: „Lovable wird nicht … als Hosting-Schicht verwendet“ | Produktionsdomain läuft auf Lovable | siehe P0 |

## 5. Rechtstexte

- `/impressum/`, `/datenschutz/`, `/agb/` sind Platzhalter (noindex). Entwürfe liegen in `analysis/human-approval/10-draft-impressum.md` und `12-draft-datenschutz.md`. Die Betreiberangaben sind laut `HUMAN-APPROVAL-MASTER.md` geliefert (Einzelunternehmen, Anschrift Schwäbisch Hall).
- Offen sind die juristische Freigabe von Impressum und Datenschutz, die AGB-Anwendbarkeit (technisch nicht indiziert, aber zu protokollieren) sowie die Netlify-AVV/Subprozessoren.

## 6. Fehlende Freigaben

1. Fachreview für 4 Artikel und 8 FAQ (Alkohol, Drogen, CTU/Abstinenz, Kosten)
2. Aktuelle Begutachtungsleitlinien (Fassung 12.12.2025): Quelle fehlt; verlinkt ist die BASt-Ausgabe 2022 (als historisch gekennzeichnet)
3. Zeilengenauer Abgleich der 66 Claims: nur `PARTIAL`
4. Rechtstexte (siehe 5.)
5. Ellwangen-Route: Entscheidung über Traffic-/Backlink-Daten
6. Produktionsfreigabe, Domain-/DNS-Entscheidung, Entfernen des Staging-Noindex

## 7. Technische Probleme (vorgefunden) und Status

| # | Problem | Prio | Status |
| --- | --- | --- | --- |
| T1 | Produktionsdomain auf Lovable live, indexierbar, Unterseiten 404 | P0 | **Inhaberaktion** (Hosting/DNS) |
| T2 | `/mpu-vorbereitung-ellwangen/` antwortete auf Staging mit **200** und einer „410“-Seite (Soft-404, Titel „Seite nicht gefunden“) | P1 | behoben → echter 404 |
| T3 | `robots.txt` sperrte `/impressum/`, `/datenschutz/`, `/agb/` → Crawler sehen das `noindex` nicht, die URL kann trotzdem indexiert werden | P1 | behoben |
| T4 | `/404/` als zusätzliches, mit 200 erreichbares 404-Duplikat vorgerendert | P1 | behoben |
| T5 | Hydration-Fehler (React #418) bei `/?q=…`, also auf dem Ziel der `SearchAction`, auf Staging reproduziert; Glossar-Markierung `?begriff=` fiel still aus | P1 | behoben, jsdom-Regressionstest |
| T6 | Alkohol-CTA verlinkte `…/mpu-vorbereitung-alkohol`, das inzwischen per 301 auf `/mpu-wegen-alkohol` umleitet | P1 | behoben, `npm run links:external` |
| T7 | BreadcrumbList-Schema auch auf 404-Seiten; bei Artikeln abweichend von der sichtbaren Navigation (2 statt 3 Ebenen) | P2 | behoben |
| T8 | Suchergebnisse zeigten den kompletten Artikeltext als Teaser | P2 | behoben |
| T9 | FAQ-Hinweis mit fest codierten Zahlen („Sechs … Acht“) | P3 | behoben (datengetrieben) |
| T10 | Schrift Inter/Georgia (nie geladen) statt Markenschrift; Artikel-H1 brach bei 375 px mitten im Wort; einzelne Linkziele unter 24 px | P3 | behoben |
| T11 | Metadaten `competingExistingPage` veraltet (Hauptseite hat seit 08.09. eine eigene indexierbare `/mpu-begutachtungsstelle`) | P2 | Daten korrigiert; Zuständigkeit = Inhaberentscheidung |
| T12 | `www` → Apex per 302 statt 301 (Lovable/Cloudflare) | P3 | Inhaberaktion beim Domainumzug |

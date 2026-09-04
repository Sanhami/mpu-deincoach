# MPU Wissen Implementation Report

Stand: 4. September 2026

## Technical fixes

- Kanonische Produktionsbasis auf `https://mpudeincoach-wissen.de` vereinheitlicht: Site-Konfiguration, Artikel-Canonicals, Sitemap, robots.txt, Open Graph, Schema und Beispielumgebung.
- Sitemap wird aus der indexierbaren Route-Registry und der zentralen Site-URL erzeugt; erfundene globale `lastmod`-Daten wurden entfernt.
- Der Prerender-Build erzeugt für jede bekannte Route eine explizite Host-Regel auf ihre vorhandene `route/index.html`-Datei sowie eine 301-Normalisierung auf den vorhandenen Trailing-Slash-Standard.
- Kein globaler SPA-Catch-all wurde ergänzt. Unbekannte URLs dürfen weiterhin echte 404 bleiben; die vorhandenen 410-Regeln werden nicht von einer Catch-all-Rewrite verdeckt.
- Der statische Crawl validiert Produktionsdomain, exakte Sitemapabdeckung, direkte Routenregeln, Slash-Normalisierung, Redirectketten, 404-Schutz und 410-Manifest.

### Verifizierter Ausgangsbefund

Auf dem derzeit veröffentlichten Lovable-Stand antworteten `/wissen` und `/wissen/` mit 404, während `/wissen/index.html` mit 200 und routenspezifischem HTML ausgeliefert wurde. Das belegt, dass der Prerender vorhanden ist und die Zuordnung der öffentlichen Route zur Datei fehlt. Der neue Build enthält dafür explizite, endliche Mappings statt eines fehlerverdeckenden Catch-alls. Die endgültige Wirkung auf Lovable muss nach dem vom Owner ausgeführten Lovable-Sync/Publish erneut per HTTP geprüft werden.

## Homepage changes

- Die situative Navigation bleibt der dominante Einstieg und enthält nun auch den vorhandenen Kostenartikel.
- Die redundante zweite Artikelliste „Wichtige Guides“ wurde entfernt.
- Die Wissenslandkarte zeigt auf der Startseite nur tatsächlich erreichbare Ziele.
- Die Abgrenzung zwischen `mpudeincoach-wissen.de` (Wissen) und `mpudeincoach.de` (kommerzielle Hilfe) wurde auf die aktuelle Domain korrigiert.

## Wissen hub changes

- `/wissen/` trennt vorhandene, direkt erreichbare Wissensbereiche deutlich von Bereichen im Redaktionsplan.
- Nicht verfügbare Bereiche bleiben sichtbar, aber nicht klickbar.
- Die irreführende Selbstverlinkung „MPU Grundlagen → /wissen/“ wurde entfernt.

## Knowledge architecture changes

Die aktuelle Struktur nutzt vorhandene Seiten als erste Clusterstufe und erzeugt keine leeren Cluster-URLs. Das neue Content Inventory dokumentiert Typ, Parent, Intent, Quellen- und Reviewstatus. Die Governance definiert die skalierbare Parent-, Merge-, FAQ-, Glossar- und CTA-Logik.

## New / improved clusters

Die aktiven Themen Ablauf, Kosten, Alkohol, Drogen, Abstinenznachweis und Begutachtungsstellen sind als erreichbare Themencluster sichtbar. Cannabis bleibt bewusst ein eigener, nicht verlinkter Bereich im Redaktionsplan; es wird nicht unter Drogen versteckt und ohne Fachfreigabe nicht als neue Seite veröffentlicht.

## FAQ changes

Keine fachlichen Antworten wurden neu erfunden. Die sechs freigegebenen FAQ bleiben öffentlich; acht vorhandene sowie zusätzliche mögliche Cannabisfragen bleiben bis zur erforderlichen Fach-/Quellenprüfung gesperrt. Damit wird der Review-Gate nicht zugunsten scheinbarer Umfangszunahme umgangen.

## Content changes

Es wurden keine MPU-fachlichen Aussagen geändert. Die interne Fachbibliothek wurde als vorhandene, private Arbeitsquelle erkannt, aber weder kopiert noch in Git aufgenommen. Kostenangaben, Alkohol-/Drogen-/Cannabis-Details und CTU-Aussagen wurden ohne neue Freigabe nicht erweitert.

## Internal linking

Breadcrumbs, Related-Artikel-System und ein CTA pro Artikel wurden unverändert bewahrt. Der Wissen-Hub ist der gemeinsame übergeordnete Parent; neue Detailseiten benötigen laut Governance genau einen primären Parent.

## Editorial / source system

Artikeltemplate, Quellenstufen, Quellenliste, Autor, Reviewstatus, FAQ-Gate, Korrekturweg und Reviewer-Wahrheit wurden erhalten. Es wurden keine Namen, Qualifikationen, Zitate, Prüfdaten oder Freigaben ergänzt.

## Files changed

- Site-/SEO-Konfiguration und Artikel-Canonicals
- Prerender- und Crawl-Skripte
- Startseite, Wissen-Hub und Themenstatus
- Tests, README und drei Governance-/Inventardokumente

## Tests performed

- TypeScript typecheck
- ESLint ohne Warnungen
- Vitest: 12/12 Tests
- Client-Build
- SSR-Build
- Prerender
- statischer Crawl: 31 HTML, 11 indexierbar, 11 Sitemap-URLs, 18 Redirects, 10 Gone-Seiten
- Responsive Browser-QA auf 320, 375, 390, 430, 768, 1024 und 1440 px für Startseite, Wissen-Hub und freigegebenen Begutachtungsstellen-Artikel: kein horizontaler Overflow, korrekter Menü-/Desktop-Navigationswechsel und stabile Kartenbreiten
- Sichtprüfung auf 320, 768 und 1440 px; dabei gefundener Mobile-H1-Overflow behoben und erneut geprüft
- Semantikprüfung: je Seite ein H1 und Main-Landmark, benannte Navigationen, keine doppelten IDs, keine leeren Links, keine unbeschrifteten Inputs
- Suche geprüft: „Begutachtungsstelle“ liefert den kanonischen Artikel an erster Stelle
- Development- und finaler Prerender-Build: keine Console-Warnungen oder -Fehler; ein gefundener Hydration-Fehler im leeren Vite-Dev-Shell wurde durch getrenntes `createRoot`/`hydrateRoot`-Bootstrap behoben
- Finaler Produktions-Preview: direkte Kernrouten 200, korrekte Canonicals, routenspezifische Titel, Robots und Schema

## Remaining issues

- Lovable-Produktion muss nach manuellem Sync/Publish auf direkte 200-Antworten, 301-Normalisierung, echte 404 und unterstützte 410-Semantik geprüft werden.
- Die aktuelle Produktion wird über Lovable/Cloudflare ausgeliefert; die bisherigen Netlify-spezifischen Datenschutzannahmen sind deshalb keine ausreichende Produktionsfreigabe. Rechtliche Dokumente bleiben noindex und benötigen aktualisierte Fakten plus Legal Review.
- Aktuelle Begutachtungsleitlinien in der von FeV Anlage 4a referenzierten Fassung vom 12. Dezember 2025 sowie benannte Fachreviews fehlen weiterhin für die gesperrten Inhalte.

## Deferred recommendations

- tiefere Alkohol- und eigenständige Cannabis-Unterseiten nach Quellen- und Reviewerfreigabe
- zusätzliche FAQ nur nach fachlicher Freigabe
- Mega-Menü erst bei realer Cluster-Tiefe
- Suchinfrastruktur erst bei deutlich größerem Bestand
- Glossar-Einzelseiten nur bei eigenständigem Intent und Tiefe

## High-risk migrations not executed

Keine Massen-URL-Migration, kein Catch-all mit falschen 200-Antworten, keine Produktionsveröffentlichung, keine Domain-/DNS-Änderung, keine Indexfreigabe reviewpflichtiger Inhalte und keine Übernahme privater Quellen.

## Audit matrix

| Priorität | Befund | Status |
| --- | --- | --- |
| CRITICAL | direkte Nested Routes 404 | `PARTIAL`: Build-Regeln implementiert und lokal validiert; Lovable-HTTP-Verifikation nach Owner-Publish offen |
| CRITICAL | Sitemap falsche Domain | `DONE` |
| HIGH | Canonicals falsche Domain | `DONE` |
| HIGH | Homepage doppelte Orientierung | `DONE` |
| HIGH | aktive und nicht verfügbare Wissenskarten gemischt | `DONE` |
| HIGH | Grundlagenkarte verlinkt irreführend auf eigenen Hub | `DONE` |
| MEDIUM | Inhaltsinventar / Parent Ownership | `DONE` |
| MEDIUM | FAQ-Themenbreite | `BLOCKED`: professionelle Reviews / aktuelle Quellen fehlen |
| MEDIUM | Cannabis als eigenständige Seite | `DEFERRED`: unabhängig modelliert, aber noch keine freigegebene Seite |
| LOW | Mega-Menü | `NOT_RECOMMENDED` bei aktueller Tiefe |

## Git

- Branch: `main`
- Remote: `origin` (`Sanhami/mpu-deincoach`)
- Commit-Nachricht: `feat: stabilize MPU Wissen routing and knowledge architecture`
- Commit-Hash und Push-Ergebnis werden nach dem atomaren Dokumentations-Commit im finalen Delivery-Bericht festgehalten; ein Commit kann seinen eigenen Hash nicht enthalten.

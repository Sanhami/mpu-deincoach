# MPU Final Acceptance Report – Loop 02

Stand: 19.10.2026 · keine erfundenen Rankings, keine Erfolgsmeldungen ohne Messung

## Was funktioniert technisch?

- **CoachOS:** gesund, Version entspricht `d578f3c`, Backups lokal und offsite aktuell, Zugriffsschutz aktiv. Der Release ist technisch abgeschlossen. Offen ist nur der erste Offsite-Restore-Test (O-11).
- **Hauptseite:** 48 indexierbare URLs ohne technische SEO-Fehler, 121 Tests grün, Lead-Funnel→CRM mit Mocks auf beiden Seiten grün (28 + 45 Tests).
- **Wissensportal (Release Candidate):** QA komplett grün (36 Tests, Crawl, externe Links). Die Review-Gates greifen und sind durch Tests abgesichert. Keine Datenflüsse.

## Was wurde verbessert?

Am Wissensportal: 10 Korrekturen in 3 Commits (`9f6e05a`, `ca239f0`, `493fb5f`), 14 neue Tests, 4 neue Crawl-Guards und ein Link-Check-Skript. An der Hauptseite und am CRM wurde nichts geändert; dort war nichts zu beheben.

## Welche SEO-Probleme sind nachweislich behoben? (im RC, lokal belegt)

1. Soft-404 der Ellwangen-Route → echter 404
2. noindex-Seiten per robots.txt blockiert → freigegeben, noindex bleibt lesbar
3. crawlbares `/404/`-Duplikat → entfernt
4. Hydration-Abbruch auf dem SearchAction-Ziel `/?q=` → behoben
5. CTA über einen 301-Hop → direktes Ziel
6. fehlerhaftes BreadcrumbList-Schema (404-Seiten, falsche Tiefe) → korrigiert
7. fehlende Markenverknüpfung im Schema → `parentOrganization`

„Nachweislich“ heißt hier: im Build, in Tests und auf der Netlify Deploy Preview von PR #1 (echter Host, noindex). Auf dem Staging-Hauptstand erscheinen die Fixes nach dem Merge.

## Welche Inhalte sind fachlich freigegeben?

- Artikel `/mpu-verfahren/` (bis 19.10. `/mpu-ablauf/`) und `/mpu-begutachtungsstelle/` (Experten-Handoff, ohne öffentlich genannten Reviewer; die öffentliche Aussage spricht seit O-5 von „dokumentierter“ Fachprüfung)
- 6 von 14 FAQ
- Redaktions- und Vertrauensseiten (redaktionell)

## Welche Inhalte warten auf Review?

- Artikel: `/mpu-kosten/`, `/alkohol-mpu/`, `/drogen-mpu/`, `/abstinenznachweis/`
- 8 FAQ
- aktuelle Begutachtungsleitlinien (12.12.2025) als Quelle
- 66-Claim-Matrix (Abgleich nur teilweise)
- Rechtstexte: Impressum, Datenschutz, AGB-Entscheidung

## Was kann veröffentlicht werden?

**Derzeit nichts.** Technisch ist der RC bereit. Für den Launch fehlen die Rechtstexte (O-2), die Klärung der Produktionsdomain (O-1) und deine Produktionsfreigabe (O-3). Danach könnten 11 Seiten indexierbar online gehen. Vorher sollte O-4 (Begutachtungsstelle) entschieden sein. O-5 und O-7 sind erledigt.

## Was fehlt noch?

- Inhaberaktionen O-1 bis O-13 (`MPU_OWNER_ACTIONS.md`)
- Nach dem Merge: Live-Nachprüfung des RC auf Staging
- Nach dem Launch: Search Console, Feldmessung der Core Web Vitals, Kontextlinks von der Hauptseite zum Portal
- Neue Portal-Themen: 5 Briefings vorbereitet (`MPU_CONTENT_MAP.md` §5), bewusst keine Fachtexte ohne Reviewer
- Notion-Abgleich (Zugriff fehlt)

## Welche Kosten wären eventuell später erforderlich?

Keine für Technik oder Hosting (Netlify Free, vorhandene Domains). Möglich: externe Fachreviewer, juristische Prüfung der Rechtstexte, Netlify-Bezahlplan nur bei Wunsch nach passwortgeschütztem Staging, Weiterbetrieb der Altdomain. Nichts davon wurde beauftragt.

## Welche Entscheidung musst du als Nächstes treffen?

**O-1: Die Produktionsdomain `mpudeincoach-wissen.de` vom Lovable-Projekt lösen.** Sie ist heute indexierbar, ohne erreichbares Impressum, und alle Unterseiten liefern 404. Danach: den PR prüfen und mergen (nur Staging) und die Rechtstexte freigeben.

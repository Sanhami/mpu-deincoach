# MPU Ecosystem Audit – Website, Wissensportal, CoachOS

Stand: 19.10.2026 · ausschließlich lesende Prüfungen an Produktivsystemen

## 1. Systemübersicht

```
Google / KI-Suche
   ├─► mpudeincoach.de (Hauptseite, Cloudflare Workers, Repo mpu-lichtblick)
   │      └─ Fallanalyse-Formular / Guide-Anfrage ──signierter Webhook──► crm.mpudeincoach.de (CoachOS)
   └─► mpudeincoach-wissen.de (Portal, Ziel: Netlify, Repo mpu-deincoach)
          └─ eine kontextuelle Brücke je Artikel ──Link──► mpudeincoach.de (#fallanalyse / Themenseite)
```

Das Portal sammelt selbst **keine** Daten. Leads entstehen ausschließlich auf der Hauptseite und gehen von dort ins CRM.

## 2. CoachOS (Phase 0) – Ergebnis: technisch abgeschlossen

| Prüfung | Ergebnis |
| --- | --- |
| Health `GET /api/health` | `200 {"ok":true,"db":"up"}`, 0,16 s |
| Container | CRM-Container healthy, gestartet 15.10.2026 18:42:43 UTC, **0 Neustarts**; Datenbank, Website und Reverse Proxy healthy |
| Deploy-Historie | letzter Eintrag `2026-10-15T18:42:44Z deploy` |
| Version | 6 im Release geänderte Quelldateien auf dem Server **hash-identisch** mit `d578f3c`. `master` steht auf `6af7dc4`, ändert gegenüber `d578f3c` aber nur das Ausführungsrecht eines Betriebsskripts, keinen App-Code. |
| Backups (Statusskript des Runbooks, Exit 0) | lokal: DB vor 8 h (17 Dumps), Storage vor 8 h (17 Archive). Offsite: DB vor 7 h (17 Stände, ältester 20 Tage), Storage vor 7 h (16 Stände, ältester 18 Tage). **Hinweis:** noch kein Offsite-Restore-Test protokolliert |
| Fehler seit Deploy | 390 Logzeilen, davon 121 fehlerartig: 101× „Server Reference ID did not match the expected format. Received "x"“ (Anfragen mit ungültigem `Next-Action`-Header, typisch für automatisierte Scanner; kein fachlicher Ablauf betroffen) und 20× „aborted“ (vom Client abgebrochene Verbindungen). Kein kritischer Fehler. |
| Datenschutzsperren | alle App-/API-Routen ohne Login → `307 /login`; Webhooks per GET → `405`; `X-Robots-Tag: noindex, nofollow`, HSTS, `X-Frame-Options: DENY`, restriktive Permissions-Policy aktiv |
| Nicht geprüft | Env-Werte (Versandmodus, Aufbewahrungsfristen). Das Lesen wurde vom Berechtigungssystem abgelehnt → `MPU_OWNER_ACTIONS.md` O-13 |

Produktive Kundendaten wurden nicht gelesen oder verändert. Logs wurden nur als anonymisierte Kategorien ausgewertet.

## 3. Formular → CRM (Phase 5, mit Mocks)

| Seite | Prüfung | Ergebnis |
| --- | --- | --- |
| Hauptseite | `bun test src/lead-funnel-crm.test.ts src/lead-funnel.test.ts` (synthetische Daten, Mock-Transport) | 28/28 |
| Hauptseite | gesamte Suite `bun test` | 121/121 |
| CRM | Vitest: Webhook Fallanalyse, Webhook Lead-Magnet, Signaturprüfung, Fallanalyse-Schema, Asset-Check | 45/45 |
| Portal | CTA-Ziele `https://mpudeincoach.de/#fallanalyse` usw. | alle 200; `id="fallanalyse"` auf der Startseite vorhanden |

Keine echten Testnachrichten, keine Live-E-Mails oder WhatsApp-Nachrichten, keine Produktivdaten.

## 4. Hauptseite (technisches SEO, live)

Sauber: 48/48 Sitemap-URLs mit 200, self-canonical, je eine H1, keine Duplikate, 51 interne Linkziele mit 200, Schema auf allen Seiten. Details in `MPU_SEO_ACTIONS.md` §B.

## 5. Wissensportal

Details in `WISSEN_AUDIT_IST_STAND.md`. Kernpunkte:
- Die Produktionsdomain ist versehentlich über Lovable live (P0, Inhaberaktion O-1).
- 11 Code-Befunde, davon 10 im Release Candidate behoben.
- Freigaben: 2/6 Artikel, 6/14 FAQ; Rechtstexte offen.

## 6. Zusammenspiel der Domains

- Die Hauptseite ist faktisch auch die große Informationsseite (48 URLs, inkl. CTU, Hypothesen, Leberwerte). Das Portal muss sich auf **Verfahren, Institutionen, Quellen und Begriffe** konzentrieren, sonst kannibalisiert es die Hauptseite (`MPU_CONTENT_MAP.md`).
- Ein direkter Konflikt besteht schon heute: „MPU-Begutachtungsstelle wählen“ (O-4).
- Die Hauptseite verlinkt das Portal noch nicht. Das ist richtig, solange die Portal-Domain den Lovable-Stand ausliefert.

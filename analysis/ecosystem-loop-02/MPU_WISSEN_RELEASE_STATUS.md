# MPU Wissen – Release-Status

Stand: 19.10.2026 · Release Candidate: Branch `claude/wissen-rc-2026-10` (Basis `main` 09028b9)

## Status auf einen Blick

| Bereich | Status |
| --- | --- |
| Technischer Release Candidate | **bereit** (QA grün, PR offen) |
| Staging (`mpu-deincoach-staging.netlify.app`) | aktiv, global `noindex, nofollow` – unverändert |
| Produktionsdomain `mpudeincoach-wissen.de` | **falsch verbunden** (Lovable, alter Build) → O-1 |
| Rechtstexte | **blockiert** (Entwürfe vorhanden, Freigabe fehlt) |
| Fachfreigabe | 2/6 Artikel, 6/14 FAQ freigegeben |
| Produktionsdeployment | **nicht durchgeführt** (keine Freigabe) |
| Noindex-Sperre entfernt | **nein** |

## QA des Release Candidate (lokal, 19.10.2026)

| Prüfung | Ergebnis |
| --- | --- |
| `npm ci` | ok |
| `npm run qa`: Typecheck, Lint (0 Warnungen), Tests, Client-/SSR-Build, Prerender, Crawl | **grün** |
| Tests | **36/36** (vorher 22): Content-Modell, Legacy-Routing, Prerender, Release-Guards, Hydration |
| Static Crawl | 29 HTML · 11 indexierbar · 11 Sitemap-URLs · 18× 301 · 10× 410 · 0 Fehler; neu: Guards für MANUAL_REVIEW, `/404/`, robots.txt, JSON-LD |
| `npm run links:external` | 16/16 externe Ziele direkt `200` |
| Browser (lokaler Build) | 375/768/1024/1440 px: kein horizontaler Überlauf, je 1 H1, Konsole ohne Fehler auf `/`, `/mpu-ablauf/`, `/?q=Nachweis`, `/glossar/?begriff=CTU` |
| Datenflüsse | keine (keine Formulare mit Serverziel, Cookies, Storage, Tracker oder Fremd-Requests) |

**Nicht geprüft** (erfordert Merge/Deploy): Verhalten des RC auf dem echten Netlify-Host. Auf dem aktuellen Staging-Stand (`main`) gilt: 200/301/404/410 wie erwartet, Header korrekt, Ellwangen noch 200, Hydration-Fehler auf `/?q=` vorhanden. Nach dem Merge sind dort zu prüfen: Ellwangen → 404, `/404/` → 404, `robots.txt` ohne Disallow, Konsole auf `/?q=` sauber.

## Review-Gates (unverändert, durch Tests abgesichert)

- Index, Sitemap und Article-/FAQ-Schema nur bei `APPROVED_PUBLIC` bzw. `PUBLIC_APPROVED` (`content.test.ts`).
- Die 4 fachreviewpflichtigen Artikel bleiben `noindex`, außerhalb der Sitemap und ohne Schema.
- Die Rechtsplatzhalter bleiben `noindex`. Neu: Sie sind nicht mehr per robots.txt gesperrt, damit das noindex überhaupt gelesen werden kann.
- In diesem Branch wurde kein Publikationsstatus geändert.

## Was nach Freigaben veröffentlicht werden könnte

| Inhalt | Technisch | Fachlich | Rechtlich | Veröffentlichbar |
| --- | --- | --- | --- | --- |
| Start, Wissen, Ratgeber, Glossar, FAQ (6), Über uns, Redaktion, Richtlinien, Korrekturen | ✓ | ✓ (redaktionell) | Impressum/Datenschutz fehlen | nach O-2, O-3 |
| `/mpu-ablauf/` | ✓ | ✓ (Handoff) | – | nach O-2, O-3; Slug O-7 |
| `/mpu-begutachtungsstelle/` | ✓ | ✓ (Handoff) | – | nach O-2, O-3, **O-4** |
| `/mpu-kosten/`, `/alkohol-mpu/`, `/drogen-mpu/`, `/abstinenznachweis/` | ✓ | ✗ | teils ✗ | nein (bleiben erreichbar, aber noindex) |

## Restliche Freigaben

Siehe `MPU_OWNER_ACTIONS.md` (O-1 bis O-8).

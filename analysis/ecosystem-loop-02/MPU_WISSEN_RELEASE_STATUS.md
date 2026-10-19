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
| Tests | **44/44** (vorher 22): Content-Modell, Legacy-Routing, Prerender, Release-Guards, Hydration |
| Static Crawl | 29 HTML · 11 indexierbar · 11 Sitemap-URLs · 18× 301 · 10× 410 · 0 Fehler; neu: Guards für MANUAL_REVIEW, `/404/`, robots.txt, JSON-LD |
| `npm run links:external` | 16/16 externe Ziele direkt `200` |
| Browser (lokaler Build) | 375/768/1024/1440 px: kein horizontaler Überlauf, je 1 H1, Konsole ohne Fehler auf `/`, `/mpu-ablauf/` (heute `/mpu-verfahren/`), `/?q=Nachweis`, `/glossar/?begriff=CTU` |
| Datenflüsse | keine (keine Formulare mit Serverziel, Cookies, Storage, Tracker oder Fremd-Requests) |

**Auf dem echten Netlify-Host geprüft** (Deploy Preview von PR #1, `deploy-preview-1--mpu-deincoach-staging.netlify.app`, 19.10.2026): Ellwangen → 404, `/warenkorb/` → 410, `/kontakt/` → 301 auf die Hauptseite, `/wissen` → 301 auf `/wissen/`, unbekannte URL → 404, `robots.txt` ohne Disallow, `X-Robots-Tag: noindex` aktiv, `/?q=Nachweis` mit 7 Ergebnissen und ohne Konsolenfehler.
**404-Behandlung (zweite Preview, Commit `da6e653`):** Unbekannte URLs (`/gibtsnicht`, `/gibtsnicht/`, `/a/b/c.html`, `/mpu-ablauf/`, Ellwangen) liefern **HTTP 404**, ohne Canonical und ohne `og:url`, auch nach der Hydration (im Browser geprüft). 410-Seiten ebenfalls ohne Canonical. `/404` und `/404.html` antworten mit 200, weil Netlify die Datei `404.html` unter ihrem eigenen Namen ausliefert; `/404/` leitet per Netlify-Standard einmal auf `/404`. Diese drei sind keine unbekannten URLs, sondern der Dateiname der Fehlerseite. Sie sind `noindex`, ohne Canonical und nirgends verlinkt. **Bewusst keine zusätzliche Regel** (Vorgabe: keine unnötigen Regeln oder Ketten).
Ebenfalls auf der Preview geprüft: Self-Canonicals auf allen 11 Sitemap-Seiten, Sitemap (11 URLs inkl. `/mpu-verfahren/`), `robots.txt` ohne Disallow, Navigation (8 Links, `/mpu-verfahren/` statt `/mpu-ablauf/`), `X-Robots-Tag: noindex` auf jeder Antwort.
Nach dem Merge auf dem Staging-Host einmal stichprobenartig wiederholen.

## Review-Gates (unverändert, durch Tests abgesichert)

- Index, Sitemap und Article-/FAQ-Schema nur bei `APPROVED_PUBLIC` bzw. `PUBLIC_APPROVED` (`content.test.ts`).
- Die 4 fachreviewpflichtigen Artikel bleiben `noindex`, außerhalb der Sitemap und ohne Schema.
- Die Rechtsplatzhalter bleiben `noindex`. Neu: Sie sind nicht mehr per robots.txt gesperrt, damit das noindex überhaupt gelesen werden kann.
- In diesem Branch wurde kein Publikationsstatus geändert.

## Was nach Freigaben veröffentlicht werden könnte

| Inhalt | Technisch | Fachlich | Rechtlich | Veröffentlichbar |
| --- | --- | --- | --- | --- |
| Start, Wissen, Ratgeber, Glossar, FAQ (6), Über uns, Redaktion, Richtlinien, Korrekturen | ✓ | ✓ (redaktionell) | Impressum/Datenschutz fehlen | nach O-2, O-3 |
| `/mpu-verfahren/` (bis 19.10. `/mpu-ablauf/`) | ✓ | ✓ (Handoff) | – | nach O-2, O-3 |
| `/mpu-begutachtungsstelle/` | ✓ | ✓ (Handoff) | – | nach O-2, O-3, **O-4** |
| `/mpu-kosten/`, `/alkohol-mpu/`, `/drogen-mpu/`, `/abstinenznachweis/` | ✓ | ✗ | teils ✗ | nein (bleiben erreichbar, aber noindex) |

## Indexierungsschalter (neu)

`public/_headers` behält `X-Robots-Tag: noindex, nofollow`. `scripts/prerender.mjs` entfernt die Zeile **nur** bei der Build-Variable `SITE_INDEXING=allow`. `npm run crawl` prüft beide Richtungen und schlägt fehl, wenn ein Standard-Build ohne Sperre entsteht (Mutationsprobe erfolgreich). `netlify.toml` darf die Variable nicht setzen (Test). Geprüft: Standard → Sperre, `allow` → keine Sperre, `Allow` → Sperre.

## Restliche Freigaben

Siehe `MPU_OWNER_ACTIONS.md` (O-1 bis O-14) und `NETLIFY_PRODUKTION_UND_O1.md`.

# MPU Wissen – Release-Status

Stand: 20.10.2026 · `main` = `2dc684f` (PR #1 gemergt, Staging aktualisiert) · PR #2 `claude/wissen-staging-guard-legal` offen

## Status auf einen Blick

| Bereich | Status |
| --- | --- |
| PR #1 (Release Candidate) | **gemergt** am 20.10.2026 nach Inhaberfreigabe (CI grün, Sperren geprüft) |
| Staging (`mpu-deincoach-staging.netlify.app`) | aktualisiert, global `X-Robots-Tag: noindex, nofollow` auf jeder Antwort |
| Indexierbar (falls die Sperre je fällt) | **8** Hub-/Vertrauensseiten; alle Artikel und `/faq/` noindex |
| Produktionsdomain `mpudeincoach-wissen.de` | weiterhin Lovable (alter Build) → O-1 vorbereitet, wartet auf Freigabe |
| Produktionsmodell | Empfehlung: eigene Netlify-Site (O-15) |
| Rechtstexte | Entwürfe korrigiert, Prüfpaket fertig, Freigabe fehlt (O-2) |
| Fachfreigabe | 0 Artikel indexierbar; 2 `APPROVED_NOINDEX` (O-14), 4 `FACHREVIEW_REQUIRED` |
| Produktionsdeployment | **nicht durchgeführt** |
| Noindex-Sperre entfernt | **nein**; auf Staging technisch unmöglich (PR #2) |

## Staging nach dem Merge (gemessen 20.10.2026)

| Prüfung | Ergebnis |
| --- | --- |
| Sitemap | 8 URLs: `/`, `/wissen/`, `/ratgeber/`, `/glossar/`, `/ueber-uns/`, `/redaktion/`, `/redaktionsrichtlinien/`, `/korrekturen/` |
| `/mpu-verfahren/`, `/mpu-begutachtungsstelle/` | 200, `noindex,follow`, Self-Canonical, kein Article-/FAQ-Schema, Hinweis „Nicht für Suchmaschinen freigegeben“ |
| `/faq/` | 200, `noindex,follow`, Leerzustand, kein FAQPage-Schema |
| `/mpu-kosten/`, `/impressum/` | 200, noindex |
| `/mpu-ablauf/`, unbekannte URL, Ellwangen | 404, kein Canonical |
| `/warenkorb/` | 410, kein Canonical |
| `/kontakt/` | 301 → `https://mpudeincoach.de/#fallanalyse` |
| `robots.txt` | kein Disallow |
| `X-Robots-Tag` | `noindex, nofollow` auf jeder 200/404/410-Antwort |

## QA

| Prüfung | `main` (PR #1) | PR #2 |
| --- | --- | --- |
| `npm run qa` | grün | grün |
| Tests | 49/49 | 54/54 |
| Static Crawl | 29 HTML · 8 indexierbar · 8 Sitemap · 18× 301 · 10× 410 | unverändert |
| GitHub-CI `qa` | grün | siehe PR |

## Review-Gates (durch Tests abgesichert)

- Index, Sitemap und Article-Schema nur bei `APPROVED_PUBLIC`.
- FAQ-Antworten sind nur öffentlich, wenn **Antwort und Artikel** freigegeben sind; `/faq/` ist ohne öffentliche Frage noindex und nicht in der Sitemap.
- Fehlerseiten ohne Canonical und ohne `og:url`; echte Seiten mit exaktem Self-Canonical.
- Rechtsplatzhalter: noindex, nicht per robots.txt gesperrt.
- Indexierungssperre: Standard in jedem Build. Sie fällt nur bei `SITE_INDEXING=allow` **und** `CONTEXT=production` **und** `URL=https://mpudeincoach-wissen.de` (PR #2).

## Was nach Freigaben veröffentlicht werden könnte

| Inhalt | Voraussetzung |
| --- | --- |
| 8 Hub-/Vertrauensseiten | O-1, O-2, O-15, O-3 |
| `/mpu-verfahren/`, `/mpu-begutachtungsstelle/`, 6 FAQ | zusätzlich O-14-Nachweise, für die Begutachtungsstelle außerdem O-4 |
| 4 weitere Artikel, 8 FAQ | O-6 |

## Restliche Freigaben

`MPU_OWNER_ACTIONS.md`, `NETLIFY_PRODUKTION_UND_O1.md`, `RECHTSTEXTE_FREIGABEPRUEFUNG.md`.

# 11 — Legacy URL Registry

Phase 5 remains authoritative: 49 records / 48 unique URL strings. The application normalizes one inconsistent record (`/mpu-startseite/` had future `/` but “rewrite” action) to a direct 301 to `/`.

## Live same-domain 301 registry

`/mpu-startseite/` → `/`; `/mpu-deincoach-vorstellung/` → `/ueber-uns/`; `/privacy-policy/` → `/datenschutz/`; `/blog/` → `/ratgeber/`; `/die-kosten-der-mpu/` and `/die-kosten-der-medizinisch-psychologischen-untersuchung/` → `/mpu-kosten/`; `/mpu-wegen-alkohol/` → `/alkohol-mpu/`; `/fragen-und-antworten/` → `/faq/`.

## Live cross-domain 301 registry

`/kontakt/` → main Fallanalyse; `/mpu-vorbereitung/` → main preparation; `/mpu-online-vorbereitung/`, `/online-mpu-vorbereitung/`, `/online-vorbereitung/` (two legacy records) → main online preparation; `/mpu-vorbereitung-schwaebisch-hall/` and `/vorbereitung-schwaebisch-hall/` → matching main route; `/mpu-vorbereitung-crailsheim/` → matching main route; `/preisangebot/` and `/shop/` → main offers.

## Gone (410 decision; noindex gone view implemented)

`/buchungsbestaetigung-mpu-deincoach/`, `/einrichtung-teams/`, `/mpu-vorbereitung-kaiserslautern/`, `/mpu-vorbereitung-covid-19/`, `/warenkorb/`, `/kasse/`, `/mein-konto/`, `/abstinenzradt/`, `/linkbaum/`, `/elementor-51115/`.

## Preserved/rebuilt P0

`/`, `/faq/`, `/ueber-uns/`, `/mpu-ablauf/`, `/mpu-begutachtungsstelle/`, `/mpu-kosten/`, `/alkohol-mpu/`, `/drogen-mpu/`, `/impressum/`, `/datenschutz/`, `/agb/`. Legal routes are noindex placeholders until fresh approval.

## Deferred preserved P1

`/mpu-bestehen-ohne-vorbereitung/`, `/wann-wird-eine-mpu-wegen-drogen-angeordnet/`, `/ablauf-und-inhalte-der-drogen-mpu/`, `/fragen-bei-einer-drogen-mpu/`, `/so-bestehst-du-eine-drogen-mpu/`. They remain out of the sitemap until rebuilt; no thin placeholders were created.

## Offline only / manual

Archive only: `/rueckerstattung_rueckgaben/`, `/danke/`, `/test-abstinenzradtueueueaeae/` and the draft Elementor query URL. Manual review: `/mpu-vorbereitung-ellwangen/` (application serves a noindex gone state until a business destination is approved).

The prerender generates an edge-friendly `_redirects` file and `redirects-manifest.json`. The deployment platform must be configured to return a true HTTP 410 for the ten gone routes; the SPA itself cannot set response status.


# Netlify staging plan

No hosting or Lovable environment is connected, so no deployment was performed.

## Required staging configuration

1. Connect Netlify to `Sanhami/mpu-deincoach` using GitHub integration. Use Node 22, `npm run build`, and publish `dist/`; `netlify.toml` records these values.
2. Keep `VITE_SITE_URL=https://mpu-deincoach.de` so staging does not create competing canonical URLs.
3. Use a Deploy Preview or protected branch deploy. The committed global `X-Robots-Tag: noindex, nofollow` is a fail-safe; also enable Netlify access/password protection when the account plan permits.
4. Serve prerendered route files first, apply all 18 exact 301 rules and ten exact forced 410 rules, then let unknown paths use `404.html`. Do not add a catch-all 200 rewrite.
5. Apply `_headers` or equivalent security/cache rules. Do not cache HTML immutably.
6. Provision TLS. Do not change production DNS during staging validation.

## Acceptance checklist

- Run `npm run qa` against the deployed revision.
- Crawl every route and inspect HTTP status, canonical, robots and sitemap from the public response.
- Verify all 18 301 locations and all ten true 410 statuses with no chain.
- Confirm 404 behavior for a random unknown URL.
- Run Lighthouse on `/`, `/mpu-begutachtungsstelle/`, `/faq/`, `/alkohol-mpu/`, and `/glossar/`.
- Test keyboard/screen-reader basics and real devices/viewports at 320, 375, 390, 430, 768, 1024 and 1440+.
- Recheck external sources and main-site CTA targets.
- Confirm legal and editorial gates remain `noindex` until signed off.

Status: **REPOSITORY CONFIGURATION READY; NETLIFY ACCOUNT CONNECTION REQUIRED**.

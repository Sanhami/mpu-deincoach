# GitHub hosting handoff

## Build contract

- Repository: `mpu-deincoach`
- Branch: `main`
- Baseline HEAD: `977571810f2305613b3ef1543982545244c7e911`
- Runtime: Node 22.12+
- Install: `npm ci`
- QA: `npm run qa`
- Build: `npm run build`
- Output directory: `dist`
- Production domain: `mpu-deincoach.de`
- Environment: optional `VITE_SITE_URL=https://mpu-deincoach.de`
- Stack: React 19, React Router, TypeScript, Vite, SSR-assisted static prerender.

## Routing and platform requirements

The deployment serves prerendered route files directly and must not add a catch-all `200` rewrite. It honors the 18 permanent redirects and ten forced 410 responses generated in `dist/_redirects`; unknown paths fall through to `dist/404.html` with HTTP 404. `public/_headers` must be supported or translated to equivalent platform headers.

Staging preserves production canonical URLs, inherits the committed global `X-Robots-Tag: noindex, nofollow`, and uses access protection where possible. Do not point production DNS or remove the global noindex header until redirect, 410, legal and editorial gates pass.

## Architecture decision

`Sanhami/mpu-deincoach` is the canonical source of truth. Do not recreate or import the application in Lovable and do not depend on Lovable hosting.

## Hosting recommendation

Use Netlify connected directly to GitHub. It consumes the existing Vite build without a framework migration, supports the generated `_redirects` and `_headers`, arbitrary HTTP status rules including forced 410 responses, real custom 404 handling, Deploy Previews, custom-domain HTTPS, atomic deploys and instant rollback.

Cloudflare Pages is a strong second choice, but its static `_redirects` only supports redirect statuses and would require a Pages Function/Worker for 410 responses. Vercel also provides excellent previews and rollback but would require provider-specific routing for the 410 registry. GitHub Pages lacks the response-status and preview controls required here.

Status: **GITHUB SOURCE CONFIRMED; NETLIFY-READY CONFIGURATION PREPARED**.

# 02 — Technical Architecture

## Decision

Greenfield React 19 + TypeScript + Vite application with React Router. This is the closest Git-native/Lovable-compatible implementation to the explicit brief. No WordPress, Laravel, Elementor, WooCommerce or Supabase dependency was introduced.

## Rendering

`vite build` creates the browser bundle. A second Vite SSR build renders each public/draft/410 route to static HTML; `scripts/prerender.mjs` injects route-specific head metadata and writes directory-index files. This provides useful HTML before hydration without a runtime server.

## Boundaries

- `src/content`: typed editorial records and source registry
- `src/config`: site identity, centralized cross-domain CTAs and redirects
- `src/components`: reusable global/editorial components
- `src/pages`: composed route surfaces
- `src/seo.ts`: canonical, robots, social metadata and schema policy
- `scripts/prerender.mjs`: prerender, sitemap and redirect manifest

Runtime search is local, deterministic and dependency-free. There are no forms, cookies, analytics, external scripts or data stores in P0.


# 13 — Testing and QA

## Automated gate

- TypeScript strict build: pass
- ESLint (zero warnings): pass
- Vitest: 9/9 pass
- Vite client build: pass
- Vite SSR build + static prerender: pass
- Content invariant tests: unique IDs/slugs/canonicals, complete metadata, source presence, meta length
- SEO safety tests: review-required articles are noindex and emit no Article/FAQ schema
- Redirect tests: unique sources, no self redirects, no internal chains, exactly ten Phase 5 gone routes
- Render tests: homepage, reference article, 404 and 410 view

## Browser QA

Validated at 320×720, 375×812, 390×844, 430×932, 768×1024 and 1440×900. Two overflow defects were found and fixed. Final overflow: 0 px on homepage and reference article at all widths. Mobile menu exposes eight links and reports `aria-expanded=true`. Search for “Begutachtungsstelle” returned article, pillar and glossary results in relevance order. Search control height: 52 px; mobile menu: 44 px.

Reference article: one H1, semantic H2 structure, labelled breadcrumbs and TOC, visible sources/reviewer state, correct canonical, `noindex,follow`, Organization + BreadcrumbList schema only.

Open release checks: real hosting status codes/redirect precedence, Lighthouse/Core Web Vitals on staging, real-device screen reader pass, external-link validation at launch and Search Console overlap monitoring.


# Final test results

Final local verification date: 2026-09-03

| Check | Result | Evidence |
|---|---|---|
| Typecheck | PASS | `tsc -b` |
| Lint | PASS | ESLint, zero warnings |
| Tests | PASS | 2 files, 9/9 tests |
| Client build | PASS | Vite 7.3.6; JS 296.82 kB / 92.82 kB gzip; CSS 19.11 kB / 4.63 kB gzip |
| SSR build | PASS | 19 modules; 86.20 kB bundle |
| Prerender | PASS | 31 HTML endpoints plus sitemap, 301 and forced-410 artifacts |
| Static crawl | PASS | 31 HTML, 8 indexable, 8 sitemap, 18 redirects, 10 gone; no masked 404 catch-all; zero failures |
| Dependency audit | PASS | 0 vulnerabilities (runtime-only and full tree) |
| Responsive browser QA | PASS | 35 route/viewport combinations, no overflow |
| Lighthouse | PASS with policy note | Performance/A11y/Best Practices 100 across five routes; SEO 100 on indexable routes, 66 on intentional noindex routes |

Lighthouse reports are retained under `analysis/release-readiness/evidence/`. On Windows, Lighthouse emitted an occasional temporary-profile cleanup `EPERM` after successfully writing valid JSON; this did not affect the audits.

No critical or high technical defect remains in the local build. Environment-level HTTP status, headers, staging access, real-device assistive technology, and Core Web Vitals still require a deployed staging environment.

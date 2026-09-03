# SEO release QA

## Automated static crawl

**PASS**: 31 prerendered HTML endpoints, exactly one H1/title/description/canonical per endpoint, 8 indexable routes, 8 matching sitemap URLs, 18 unique 301 redirects, 10 gone templates, no duplicate metadata among indexable pages, no broken internal targets or same-page anchors, and no redirect chains/self-loops.

Indexability is policy-correct: six risk articles, FAQ, and three incomplete legal routes are `noindex` and excluded from the sitemap. Article and FAQPage schema is suppressed until review; eligible pages use controlled Organization/WebSite/BreadcrumbList schema. No accidental indexable draft was found.

## Manual/browser checks

- Breadcrumbs and canonical URLs render correctly on representative pages.
- Search returns relevant internal results and does not create an indexable query canonical.
- External CTA destinations were corrected to current main-site paths.
- `/404/` and `404.html` are noindex; unknown-route status must be verified on the real host.
- The BASt guideline reference needs a manual live-link confirmation before its article is approved.

Lighthouse SEO is 100 on indexable homepage and glossary. Representative `noindex` routes score 66 solely because Lighthouse's crawlability audit treats the deliberate `noindex` as a failure; this is an intentional release gate, not a technical defect.

Production SEO remains blocked by legal/editorial gates, cannibalization adjustments, and host-level status verification.

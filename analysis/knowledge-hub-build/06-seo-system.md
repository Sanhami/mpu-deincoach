# 06 — SEO System

`src/seo.ts` centrally owns title, description, canonical, robots, Open Graph, Twitter and JSON-LD policy. Static HTML receives metadata during prerender; client navigation updates it at runtime.

Schemas supported: Organization, WebSite/SearchAction, BreadcrumbList, Article and FAQPage. Article/FAQ schema is deliberately suppressed for every current review-required draft. Indexable routes alone enter `sitemap.xml`.

Ownership rule: main domain owns service, preparation, lead, product and local intent. Knowledge domain owns educational, definitional and neutral process intent. Shared topics require different format, query set, title/H1 and CTA density. Current main-site homepage was rechecked on 2026-09-02; its primary intent remains preparation + Fallanalyse, distinct from this portal's “MPU Wissen” promise.

The redirect registry is typed and tested for unique sources, no self redirects and no internal chains. Actual HTTP 410 status requires deployment-layer support and remains a launch blocker; the application still renders a clear noindex gone page for those paths.


# Staging SEO validation

## Canonicals

- Hosted pages emit production canonicals on `https://mpu-deincoach.de`.
- No staging hostname was found in canonical output.
- Review-gated routes remain page-level `noindex,follow`.
- The global Netlify header makes every staging response `noindex, nofollow`.

## Sitemap and robots

`/sitemap.xml` returns 200 and contains exactly these eight production URLs:

- `/`
- `/wissen/`
- `/ratgeber/`
- `/glossar/`
- `/ueber-uns/`
- `/redaktion/`
- `/redaktionsrichtlinien/`
- `/korrekturen/`

No staging hostname or review-gated article URL appears in the sitemap. `robots.txt` returns 200, references the production sitemap, and disallows the legal placeholders.

## Schema

- Home: `Organization`, `WebSite`
- Indexable hub/editorial pages: `Organization`, `BreadcrumbList`
- `/faq/` and `/mpu-begutachtungsstelle/`: `Organization`, `BreadcrumbList`
- No premature `FAQPage` or article schema was enabled for review-gated content.

## Links

- 17 unique internal targets were crawled: all returned 200, none redirected, none were broken.
- All inspected external source and commercial-site links returned 200 without a redirect after the BASt correction.

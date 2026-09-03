# Lighthouse

Lighthouse was run on hosted staging pages.

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 99 | 100 | 100 | 66 | 1.6 s | 0 | 0 ms |
| `/mpu-begutachtungsstelle/` | 96 | 100 | 100 | 66 | 1.8 s | 0 | 180 ms |

The SEO score is intentionally reduced because the staging site is blocked from indexing by `X-Robots-Tag`. That is the required staging behavior, not a defect. Reports are retained in `analysis/staging-validation/evidence/`.

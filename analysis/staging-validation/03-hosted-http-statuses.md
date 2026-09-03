# Hosted HTTP statuses

Validated against `https://mpu-deincoach-staging.netlify.app`.

| Route | Expected | Actual | Result |
| --- | ---: | ---: | --- |
| `/` | 200 | 200 | pass |
| `/mpu-begutachtungsstelle/` | 200 | 200 | pass |
| `/faq/` | 200 | 200 | pass |
| `/redaktion/` | 200 | 200 | pass |
| `/redaktionsrichtlinien/` | 200 | 200 | pass |
| `/korrekturen/` | 200 | 200 | pass |
| `/mpu-startseite/` | 301 | 301 to `/` | pass |
| `/` after redirect | 200 | 200 | pass |
| `/warenkorb/` | 410 | 410 | pass |
| `/definitely-not-a-real-page-qa/` | 404 | 404 | pass |

Additional redirect checks:

- `/fragen-und-antworten/` -> `/faq/` -> 200 in one redirect.
- No redirect chain or loop was found in the representative redirect checks.
- Gone and unknown routes have zero redirects.
- Unknown URLs are genuine 404 responses; no catch-all masks 404 or 410 responses.
- `/404` is a directly addressable, noindex error document and returns 200. Unknown URLs still return the same document with status 404.

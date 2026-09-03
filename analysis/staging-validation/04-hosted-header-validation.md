# Hosted header validation

Representative 200, 301, 404, and 410 responses were inspected on Netlify.

All returned:

- `X-Robots-Tag: noindex, nofollow`
- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- a restrictive `Permissions-Policy` for camera, microphone, and geolocation

HTML responses used `text/html; charset=UTF-8`. The 301 included the correct `Location` header. The global noindex header is served by Netlify itself, including on redirects and error responses.

# Legacy redirect QA

The Phase-5 ownership strategy remains authoritative. No route was reverted to the earlier broad commercial-redirect approach.

## Implemented 301 rules

The central registry contains 18 unique redirects: 8 within the knowledge domain and 10 to the main commercial domain. Every source differs from its destination; all internal targets exist; no target is another redirect source; no loop or chain was found. Main-domain destinations were checked for intent and current paths.

## Host-level 410 registry

The build now generates forced Netlify-compatible `410` rules for these exact paths and serves each route's prerendered explanatory body:

```text
/buchungsbestaetigung-mpu-deincoach/
/einrichtung-teams/
/mpu-vorbereitung-kaiserslautern/
/mpu-vorbereitung-covid-19/
/warenkorb/
/kasse/
/mein-konto/
/abstinenzradt/
/linkbaum/
/elementor-51115/
```

`/mpu-vorbereitung-ellwangen/` remains `MANUAL_REVIEW` and must not be redirected or released until ownership/intent is decided. `REWRITE_ON_SAME_URL`, `MERGE_WITHIN_OLD_DOMAIN`, and `ARCHIVE_ONLY` are strategy classifications, not additional runtime rules in the current 29-record implementation registry.

The generated `_redirects` file contains no catch-all 200 rewrite, allowing `404.html` to produce a real host 404. Local Vite preview does not emulate Netlify status rules, so the 301/404/410 responses still require staging verification.

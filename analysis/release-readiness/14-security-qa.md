# Security QA

## Results

- Repository scans found no `.env`, credentials, tokens, API keys, private keys, customer data, database dumps, WordPress configuration, Transfer sources or MPU Fachwissensdatenbank content.
- `.gitignore` explicitly excludes the high-risk source/database/archive paths and common secret/build artifacts.
- `npm audit --audit-level=high` and `npm audit --omit=dev --audit-level=high` report 0 vulnerabilities.
- No `dangerouslySetInnerHTML`, raw HTML injection, `eval`, dynamic script injection or user-provided rich HTML is used.
- No forms submit personal data; no authentication, database, analytics, cookies or local storage exist in P0.
- External navigation uses ordinary HTTPS links; no untrusted content controls their destinations.
- Headers prepared: staging-safe `X-Robots-Tag: noindex, nofollow`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, restrictive `Permissions-Policy`, and `X-Frame-Options: SAMEORIGIN`.

## Hosting follow-up

Confirm Netlify applies `_headers`; add a tested Content Security Policy after staging is available. Enable GitHub secret scanning/push protection. Protect staging. Re-run dependency and repository scans before each release. Do not ever copy private MPU source material into `public/`, `src/`, build artifacts or CI artifacts. Remove the global noindex header only in the explicitly approved production-release change.

Status: **PASS for repository/application baseline; platform verification pending**.

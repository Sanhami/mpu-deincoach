# 14 — Security

The production repository contains no WordPress, PHP, database dump, legacy backup, customer record, form submission, credentials, tokens or API keys. `.gitignore` explicitly excludes Transfer, the professional knowledge database, legacy/backups, archives, SQL and environment secrets.

P0 has no backend, authentication, form endpoint, analytics, cookies, local storage or third-party script. Security headers are supplied in `public/_headers`: nosniff, strict-origin referrer policy, restrictive permissions policy and same-origin framing. Hashed assets receive immutable cache headers.

The professional database stays outside the repository. Only manually written factual summaries and public source references were used. No premium/internal rule engine or personal data was copied.


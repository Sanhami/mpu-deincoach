# Ellwangen legacy-route decision

Current observations for the commercial site:

- `https://mpudeincoach.de/mpu-vorbereitung-ellwangen` returns 404.
- The trailing-slash form redirects once to the non-trailing-slash URL, which then returns 404.
- The knowledge-hub redirect configuration keeps `/mpu-vorbereitung-ellwangen/` as `MANUAL_REVIEW`.
- No equivalent destination, traffic evidence, backlink evidence, or confirmed location-page owner is available in this repository.

Decision: retain `MANUAL_REVIEW`. Do not invent a destination and do not publish or redirect this route yet.

Smallest resolution step: review Search Console/analytics/backlinks and confirm business ownership. If a genuinely equivalent maintained page exists, use one direct 301. If the URL is permanently retired without an equivalent, use 410.

# Staging validation master report

## STAGING RELEASE STATUS

- GitHub repository: `Sanhami/mpu-deincoach`
- Branch: `main`
- Netlify staging created: yes
- Staging URL: `https://mpu-deincoach-staging.netlify.app`
- Production domain attached: **NO**
- Production DNS modified: **NO**

## Hosted validation

- Hosted 200: pass
- Hosted 301: pass; one-hop destinations return 200
- Hosted 404: pass; unknown routes are not masked
- Hosted 410: pass
- Global staging noindex: pass on 200, 301, 404, and 410
- Canonical QA: pass; production canonicals, no staging-host canonicals
- Sitemap QA: pass; eight approved production URLs, no review-gated routes
- Schema QA: pass for current release gates; no premature FAQ/article schema
- Internal links: pass; 17 targets return direct 200
- External links: pass after BASt correction
- Responsive QA: pass at 320, 375, 390, 430, 768, 1024, and 1440
- Accessibility QA: pass; Lighthouse 100 on both tested routes
- Lighthouse: home 99/100/100/66; Begutachtungsstelle 96/100/100/66
- Console health: pass; no browser-console errors observed

The Lighthouse SEO score of 66 is expected because staging is deliberately non-indexable.

## Release decisions

- BASt source: resolved with the official 2022 BASt repository PDF
- Intent overlaps: four decisions documented; implementation/approval outstanding
- Ellwangen: retain `MANUAL_REVIEW` pending traffic/backlink and ownership evidence
- Legal approval: blocked
- Editorial approval: blocked for six articles
- Reviewer approval: blocked for six articles and FAQ
- Production readiness: **BLOCKED**
- Production deployment: **NO**

## Exact remaining blockers

1. Complete and approve Impressum, Datenschutz, and the applicability/content decision for AGB.
2. Obtain qualified, named reviewer evidence and explicit release authorization for six review-gated articles.
3. Complete the inherited reviewer approvals and main-site question-ownership decision for `/faq/`.
4. Implement and approve the four search-intent separation decisions.
5. Resolve `/mpu-vorbereitung-ellwangen/` from traffic, backlink, equivalence, and business-ownership evidence.
6. Password/team-only access is unavailable on the current Netlify plan; staging is protected from indexing, not private access.

## Next safe action

Assign named legal and subject-matter reviewers and collect their documented approvals while keeping staging noindex and the production domain detached.

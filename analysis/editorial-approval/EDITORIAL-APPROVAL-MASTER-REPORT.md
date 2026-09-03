# Editorial approval master report

## Outcome

The remaining blockers are converted into claim-level assignments, reviewer specifications, approval forms, FAQ ownership, legal-owner questions, source governance and a machine-enforced publication gate. No human approval is fabricated.

## Current state

- Blocked articles: 4; approved after corrections: 2
- Claim rows catalogued: 66; exact-row expert reconciliation: `PARTIAL`
- Claims source-supported: 45 (`SUPPORTED` or `SUPPORTED_BUT_REVIEW_REQUIRED`)
- Claims requiring professional review: 33 claim rows
- Claims requiring legal review: 20 claim rows
- Claims requiring source/content revision: 9 (`SOURCE_MISSING`, `TOO_STRONG`, or `OUTDATED_RISK`)
- FAQ items: 14; knowledge-owned: 14; public-approved: 6; review-required: 8
- FAQ categories: 4 explicitly general-knowledge, 14 article-specific, 9 high-risk, 3 legal, 0 service, 0 outdated in the current set. Three legacy questions are described by the existing UI as outdated but their text is not present in the repository; they remain excluded and cannot be reviewed from available evidence.
- Intent overlaps: 3 knowledge pages adjusted; 1 main-site follow-up outstanding
- Ellwangen: manual review
- Legal owner inputs: missing
- AGB: likely unnecessary technically; legal applicability record still required
- Publication state: two `APPROVED_PUBLIC`; four `FACHREVIEW_REQUIRED`
- Public reviewer identities supplied: no
- Articles approved at expert handoff level: 2/6 after corrections
- FAQ approved: 6/14 after corrections
- Staging global noindex: active
- Production domain: detached
- Production readiness: blocked
- Full QA: pass (typecheck, lint, 12 tests, client build, SSR build, prerender, static crawl)
- Crawl safety: 31 HTML, 11 indexable, 11 sitemap URLs, 18 redirects, 10 gone; four blocked articles remain noindex and absent from Article/FAQ schema

## Implemented safeguards

- Article indexability, sitemap inclusion, and Article/FAQ schema now derive from `APPROVED_PUBLIC`.
- Three overlapping knowledge pages were minimally narrowed at implementation level.
- The 14 current FAQ items have explicit ownership and item-level publication state; only six approved items render in the public collection or FAQ schema.
- Search/service/booking/offer questions remain outside the knowledge FAQ.
- Speculative next-review dates are not displayed before an actual reviewer exists.
- Sources carry governance Levels 1–5.
- Trust pages describe the real pending workflow, not an invented completed process.

## Unresolved gates

1. The eight blocked FAQ and four blocked articles require their assigned specialist/source review.
2. Legal counsel must review the remaining identified legal and production-release gates.
3. Missing current sources and remaining review-gated claims must be corrected or qualified.
4. The currently applicable 2025 Begutachtungsleitlinien source must be obtained and verified; the linked BASt edition is 2022.
5. Final legal approval of the prepared Impressum and Datenschutz drafts remains pending.
6. AGB is technically not indicated by current code, but counsel/owner must record the applicability decision.
7. The commercial main site requires later FAQ ownership coordination.
8. Ellwangen remains `MANUAL_REVIEW` pending traffic, backlink, archive and ownership evidence.

## Next human action

Obtain the authoritative 12 December 2025 guideline document, then dispatch the remaining alcohol, drug, abstinence and cost gates to the assigned specialist/source reviewers against this exact content version.

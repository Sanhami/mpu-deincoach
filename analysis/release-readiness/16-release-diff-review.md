# Release diff review

Comparison base: `977571810f2305613b3ef1543982545244c7e911`  
Review date: 2026-09-03

| File | Classification | Reason |
|---|---|---|
| `package-lock.json` | REPOSITORY_READINESS | Records the Node engine metadata without dependency changes. |
| `package.json` | QA_TOOLING | Adds Node support metadata and makes the static crawl part of `npm run qa`. |
| `public/_headers` | RELEASE_FIX | Adds the staging-safe global noindex response gate. |
| `scripts/prerender.mjs` | RELEASE_FIX | Generates exact forced 410 rules and removes the catch-all that masked true 404 responses. |
| `src/components/KnowledgeHeader.tsx` | RELEASE_FIX | Fixes the accessible-name mismatch on the visible brand link. |
| `src/config/site.ts` | RELEASE_FIX | Uses the documented canonical environment value and corrects four stale commercial destinations. |
| `src/content/articles.ts` | CONTENT_CHANGE | Corrects only main-site comparison URLs and intent ownership metadata; article claims/indexability remain unchanged. |
| `src/entry-server.tsx` | RELEASE_FIX | Exports the existing central 410 route set for deployment artifact generation. |
| `src/styles.css` | RELEASE_FIX | Fixes two confirmed contrast failures using the existing design token. |
| `.github/workflows/qa.yml` | REPOSITORY_READINESS | Adds read-only GitHub Actions QA for pull requests and `main`. |
| `.nvmrc` | REPOSITORY_READINESS | Pins the recommended Node major. |
| `README.md` | DOCUMENTATION | Documents local work, QA, GitHub source ownership and Netlify deployment contract. |
| `netlify.toml` | REPOSITORY_READINESS | Declares the Git-based staging/production build without adding a runtime framework. |
| `scripts/static-crawl.mjs` | QA_TOOLING | Makes route, metadata, sitemap, redirect, 404 masking and 410 checks repeatable. |
| `src/vite-env.d.ts` | RELEASE_FIX | Supplies the Vite environment type required by the canonical URL configuration. |
| `analysis/release-readiness/01-repository-readiness.md` | DOCUMENTATION | Repository hygiene evidence. |
| `analysis/release-readiness/02-github-readiness.md` | DOCUMENTATION | Canonical GitHub setup and protection requirements. |
| `analysis/release-readiness/03-lovable-handoff.md` | DOCUMENTATION | Records Lovable exclusion and the GitHub/Netlify hosting decision. |
| `analysis/release-readiness/04-route-release-matrix.csv` | DOCUMENTATION | Release state for all 31 prerendered routes. |
| `analysis/release-readiness/05-editorial-review-gates.md` | DOCUMENTATION | Explicit review gates for risk-sensitive content. |
| `analysis/release-readiness/06-legal-input-checklist.md` | DOCUMENTATION | Missing legal inputs without fabricated operator data. |
| `analysis/release-readiness/07-seo-release-qa.md` | DOCUMENTATION | Static SEO and indexability evidence. |
| `analysis/release-readiness/08-legacy-redirect-qa.md` | DOCUMENTATION | Redirect and generated 410 registry evidence. |
| `analysis/release-readiness/09-cross-domain-qa.md` | DOCUMENTATION | Main-site destination and CTA restraint evidence. |
| `analysis/release-readiness/10-cannibalization-qa.md` | DOCUMENTATION | Intent overlap risks and gates. |
| `analysis/release-readiness/11-staging-plan.md` | DOCUMENTATION | Protected Netlify staging setup and acceptance checks. |
| `analysis/release-readiness/12-accessibility-qa.md` | DOCUMENTATION | Accessibility and responsive verification evidence. |
| `analysis/release-readiness/13-performance-qa.md` | DOCUMENTATION | Bundle and Lighthouse evidence. |
| `analysis/release-readiness/14-security-qa.md` | DOCUMENTATION | Repository, dependency and platform security gates. |
| `analysis/release-readiness/15-final-test-results.md` | DOCUMENTATION | Consolidated QA results. |
| `analysis/release-readiness/RELEASE-READINESS-MASTER-REPORT.md` | DOCUMENTATION | Release decision and remaining blockers. |
| `analysis/release-readiness/evidence/lighthouse-home.json` | QA_TOOLING | Preserves the pre-fix Lighthouse result. |
| `analysis/release-readiness/evidence/lighthouse-home-after.json` | QA_TOOLING | Preserves the verified post-fix result. |
| `analysis/release-readiness/evidence/lighthouse-begutachtungsstelle.json` | QA_TOOLING | Representative review-gated route evidence. |
| `analysis/release-readiness/evidence/lighthouse-faq.json` | QA_TOOLING | Representative FAQ evidence. |
| `analysis/release-readiness/evidence/lighthouse-article.json` | QA_TOOLING | Representative article-heavy route evidence. |
| `analysis/release-readiness/evidence/lighthouse-glossary.json` | QA_TOOLING | Representative indexable glossary evidence. |
| `analysis/release-readiness/16-release-diff-review.md` | DOCUMENTATION | This complete classification and scope check. |

## Scope conclusion

No `UNEXPECTED` file exists. Changes are limited to verified release defects, repository/deployment readiness, QA automation, evidence, and bounded content ownership/link corrections. The P0 architecture, framework, article claims, review gates, legal placeholders, indexability policy and baseline commit are unchanged.

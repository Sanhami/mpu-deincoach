# GitHub readiness

## Prepared

- `README.md` documents install, QA, build, output, routing, redirect and 410 requirements.
- `.env.example` documents the only optional public build variable, `VITE_SITE_URL`.
- `.nvmrc` and `package.json` require Node 22.12+.
- `package-lock.json` is present and current; installation is `npm ci`.
- `.github/workflows/qa.yml` runs `npm run qa` on pull requests and pushes to `main` with read-only contents permission.
- `npm run qa` covers typecheck, lint, tests, client build, SSR build, prerender and static crawl.

## Required owner setup

The owner has designated `https://github.com/Sanhami/mpu-deincoach.git` as the canonical remote. It must be added as `origin` only after confirming no conflicting remote is present. Then:

1. Verify remote history before the first push; never overwrite unrelated commits.
2. Protect `main`: require the QA check, block force pushes/deletion, and require at least one approval for release-affecting changes.
3. Enable secret scanning, push protection and dependency alerts where the plan permits.
4. Configure named code/content/legal owners once those people are known.
5. Connect Netlify for Deploy Previews and keep the production domain detached until all release gates pass.
6. Configure a protected GitHub staging environment if GitHub Actions later owns deployment credentials; production must require explicit approval.

No push was attempted or authorized.

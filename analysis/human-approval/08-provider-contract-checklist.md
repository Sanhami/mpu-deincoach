# Provider account contract checklist

Account and provider findings checked on 2026-09-03 are documented in `13-netlify-privacy-facts.md` and `14-github-privacy-role.md`. The checklist remains open only where account evidence or legal assessment is still missing.

Complete from the actual account, contract, DPA and current provider documents. Record document title/version/date or a durable evidence location. Public provider documentation alone does not prove that a particular account accepted or is covered by a term.

## Netlify account

- Account/team name: `MPU Börse`; slug `sanhami`; billing label `Sanhami`
- Account holder or contracting entity: `NOT VERIFIED — confirm whether Hami Bouidia, Einzelunternehmen, accepted the account terms`
- Billing country/entity, if shown: `NOT SHOWN`
- Current plan: legacy Free (`free-is-free`)
- Contract/terms applicable to the account: `NOT VERIFIED FROM ACCOUNT`
- DPA available for this account: provider DPA available; account-specific acceptance/coverage `UNKNOWN`
- DPA accepted, incorporated automatically, or separate signature required: provider says DPA is incorporated in applicable service terms; concrete account record `NOT VERIFIED`
- DPA/document version and evidence: current public DPA dated 2026-06-09; exact accepted version `NOT VERIFIED`
- Current applicable subprocessor list/version/date: `NOT VERIFIED — Trust Center access/list required`
- Subprocessors applicable to this site's hosting setup: `NOT VERIFIED`
- International-transfer mechanism stated for this account/processing: current provider DPA lists EU-US DPF with SCC fallback; account-specific application `LEGAL REVIEW REQUIRED`
- SCC or other safeguard version/evidence: EU SCCs under Commission Implementing Decision (EU) 2021/914 in current DPA
- Hosting/edge log categories enabled: request-level CDN/security processing documented; exact account-visible visitor log feature `NOT VERIFIED`
- Build/deploy/account audit log categories enabled: deploy logs present; project/team audit logs are not included on the Free plan
- Log purposes: delivery, caching, security, troubleshooting and build/deploy operation
- Log retention for each category: deploy retention 30 days; visitor/security-log retention `NOT VERIFIED`
- Roles/users who can access logs: one accepted account member, current user role `Owner`; provider/support access conditions `NOT VERIFIED`
- Provider/support access conditions: `NOT VERIFIED`
- Platform analytics or visitor tracking enabled: `NO — Web Analytics unavailable/not enabled; Real User Monitoring not included`
- Hosting-introduced cookies/storage on ordinary public page use: `NO FOUND — no Set-Cookie, badge, iframe or tracking script in tested delivery`
- Checked by: repository/account/hosted technical verification
- Check date: `2026-09-03`
- Evidence links/files: `13-netlify-privacy-facts.md`

## GitHub account/repository

Document only facts legally relevant to development and deployment. Do not describe GitHub as an ordinary website-visitor processor when the application sends no visitor data there.

- Repository owner: `Sanhami / correction:`
- Repository: `Sanhami/mpu-deincoach / correction:`
- Account holder or contracting entity:
- Repository visibility: `PUBLIC`
- Organization or personal account: personal/user account according to Netlify repository metadata
- Plan, if relevant to contract/DPA coverage:
- DPA relevance to this account/use: `LEGAL REVIEW`
- Applicable privacy/contract document and version:
- Deployment integration role: source storage and Netlify deploy source `CONFIRMED`
- Any intentional website visitor-data processing by application: `NO`
- Secrets, form submissions or customer data stored in repository: `NO INTENDED OR FOUND IN CURRENT PROJECT REVIEW`
- Users/teams with repository/deployment access:
- International-transfer issue requiring legal treatment: GitHub is a US provider; disclosure/DPA relevance for this narrow infrastructure role requires legal review
- Checked by: repository/account/hosted technical verification
- Check date: `2026-09-03`
- Evidence links/files: `14-github-privacy-role.md`

## Review outcome

- [ ] Netlify facts complete for Datenschutz draft
- [x] GitHub technical facts complete to determine whether/how it should be mentioned
- [ ] International transfers and safeguards sent to legal reviewer
- [x] Platform-level tracking/storage classification documented for legal review
- Outstanding items: exact Netlify contracting party/accepted terms; applicable subprocessors; visitor/security-log access and retention; account-specific transfer assessment; final legal decisions.

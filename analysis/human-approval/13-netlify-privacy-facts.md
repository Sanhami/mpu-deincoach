# Netlify privacy facts

Checked: 2026-09-03. This record distinguishes the authenticated account, Netlify's public provider documentation and facts that still require owner or legal confirmation.

Phase status: `CLOSED — NO FURTHER NETLIFY RESEARCH UNLESS SPECIFICALLY INSTRUCTED`.

Final privacy fact status: `PARTIAL BUT SUFFICIENT FOR LEGAL DRAFT REVIEW`. This is not legal approval.

## Final current factual state

- Plan: Legacy Free (`free-is-free`).
- DPA: official Netlify DPA dated 2026-06-09 verified.
- Account-specific DPA applicability: `LEGAL REVIEW REQUIRED`.
- Contracting customer: an authenticated Owner account exists, but the exact legal contracting customer is not independently verified.
- Subprocessors: official Netlify subprocessor list verified.
- Site-specific subprocessor set: `NOT VERIFIABLE`.
- International transfers: official Netlify documentation references the EU-US Data Privacy Framework and EU Standard Contractual Clauses under Decision 2021/914 as applicable safeguards.
- Site/account-specific legal applicability: `LEGAL REVIEW REQUIRED`.
- Public website cookies: none found.
- Public website `localStorage`: none found.
- Public website `sessionStorage`: none found.
- Netlify Analytics: not enabled/not included.
- Real User Monitoring: not enabled/not included.
- Visitor processing: normal CDN/server request and security processing exists.
- Deploy log retention: 30 days.
- Visitor/security log retention: not verifiable from the available account and documentation.

## Compact fact matrix

| Fact | Status | Source | Legal relevance | Open question |
| --- | --- | --- | --- | --- |
| Authenticated account controller | `ACCOUNT VERIFIED` | Netlify `getCurrentUser` and account API | Identifies the person/account controlling configuration | Login `bouidia_mpu@gmx.de`, GitHub `Sanhami`, Owner role; Netlify profile has no full legal name |
| Legal account holder/customer | `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW` | Account shows billing label `Sanhami`, team `MPU Börse`, but no legal customer name | Determines the customer/data-exporter identity in the contract/DPA | Confirm whether Hami Bouidia, Einzelunternehmen, is the contracting customer |
| Plan | `ACCOUNT VERIFIED` | Account API | Determines available logging/analytics features | Legacy Free (`free-is-free`); no open technical question |
| Project identifier | `ACCOUNT VERIFIED` | Linked project API and `.netlify/state.json` | Identifies the exact hosted service | `mpu-deincoach-staging`, ID `1bdd373a-5c76-4888-b10f-fd03981f2f73` |
| Netlify contractual entity | `PROVIDER DOCUMENTATION VERIFIED` | Current Netlify DPA | Identifies the provider/data importer | Netlify, Inc.; applicable customer agreement still requires account evidence |
| DPA availability | `PROVIDER DOCUMENTATION VERIFIED` | Netlify DPA dated 2026-06-09 | Art. 28/transfer documentation candidate | Publicly available |
| DPA applicability/acceptance | `LEGAL REVIEW REQUIRED` | DPA and Self-Serve Subscription Agreement; account API has no acceptance record | Determines whether the current DPA governs this customer/account | `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW` for accepted terms/version |
| Published subprocessors | `PROVIDER DOCUMENTATION VERIFIED` | Official Netlify Trust Center public record | Identifies authorized downstream providers | 22-provider list retrieved; exact list version label/date not supplied by the page |
| Subprocessors actually used for this static site | `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW` | Account/site API does not expose routing/provider allocation | Determines actual recipients | Netlify must confirm the applicable subset; do not infer it from general purposes |
| International-transfer mechanisms | `PROVIDER DOCUMENTATION VERIFIED` | Current DPA §§14.2-14.3 | Safeguards for US/third-country processing | EU-US DPF, with EU SCCs under Decision 2021/914 when DPF is unavailable/not applicable |
| Transfer applicability/risk assessment | `LEGAL REVIEW REQUIRED` | DPA plus account/customer facts | Determines final disclosure and supplementary assessment | Counsel must apply the provider mechanisms to the confirmed customer and data flows |
| Public visitor request processing | `PROVIDER DOCUMENTATION VERIFIED` | Netlify DPA, Observability and request-chain docs | Hosting, CDN, security and technical-log disclosure | Categories verified; exact underlying retention/provider access not published |
| Deploy logs | `ACCOUNT VERIFIED` | Project/deploy API; account reports 30-day deploy retention | Operational metadata, separate from visitor traffic | No open retention question for the account setting; provider backups/internal deletion not proven |
| Visitor/security-log access | `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW` | Current Owner role verified; account/API does not expose provider personnel or exact visitor-log access | Recipient/access disclosure | Provider access conditions and site-specific account visibility remain unknown |
| Visitor/security-log retention | `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW` | Official docs say retention varies by plan; no exact period for this legacy Free site | Mandatory retention disclosure | Obtain written Netlify confirmation or use counsel-approved criteria wording |
| CDN/security processing | `PROVIDER DOCUMENTATION VERIFIED` | Netlify request-chain and security documentation | Necessary public-site delivery and protection | Exact subprocessor/routing allocation not exposed |
| Public-site cookies/Web Storage | `ACCOUNT VERIFIED` | Live response, delivered bundle and repository | Cookie/storage disclosure | No `Set-Cookie`; no application cookie, `localStorage` or `sessionStorage` use found |
| Netlify Web Analytics | `ACCOUNT VERIFIED` | Account capability false; site analytics instance absent | Analytics disclosure | Not included/not enabled |
| Optional tracking features | `ACCOUNT VERIFIED` | Account/site API and live delivery | Tracking/consent assessment | RUM not included; no plugins; badge setting enabled but no badge/frame/script delivered; no tracking feature found on public delivery |

The status vocabulary above is authoritative for this record. `NOT VERIFIABLE` rows satisfy the stop condition and are not queued for further automated retries.

## Verified from account

| Item | Verified fact | Status |
| --- | --- | --- |
| Authenticated user | `bouidia_mpu@gmx.de`; connected GitHub identity `Sanhami`; profile `full_name` is empty | `ACCOUNT VERIFIED` |
| Team/account | Team name `MPU Börse`; slug `sanhami`; billing name `Sanhami` | `ACCOUNT VERIFIED`; exact legal contracting party `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW` |
| Access | Current user role `Owner`; one accepted member; access to all sites | `ACCOUNT VERIFIED` |
| Plan | Legacy Free plan (`free-is-free` / account type `Free`) | `ACCOUNT VERIFIED` |
| Project | `mpu-deincoach-staging`; project ID `1bdd373a-5c76-4888-b10f-fd03981f2f73` | `ACCOUNT VERIFIED` |
| Domain state | Netlify URL only; no custom domain or domain alias attached | `ACCOUNT VERIFIED` |
| Hosting role | Static files from `dist` served by Netlify; no Netlify Functions, Edge Functions, Identity or database attached | `ACCOUNT VERIFIED` and repository |
| Deployment role | GitHub repository `Sanhami/mpu-deincoach`, branch `main`, `npm run build`, output `dist` | `ACCOUNT VERIFIED` and `netlify.toml` |
| Forms | Netlify form handling is not enabled; Netlify is configured to ignore HTML forms | `ACCOUNT VERIFIED` |
| Web Analytics | Not included for this account; site `analytics_instance_id` is absent | `ACCOUNT VERIFIED` |
| Real User Monitoring | Not included for this plan/account | `ACCOUNT VERIFIED` |
| Plugins | No Netlify plugins configured | `ACCOUNT VERIFIED` |
| Deploy retention | Site API reports `deploy_retention_in_days: 30` | `ACCOUNT VERIFIED`; applies to deploys, not proven visitor-log retention |
| Badge setting | Account API reports the Powered by Netlify badge setting enabled | `ACCOUNT VERIFIED`; no badge, frame or badge script was present in the delivered staging HTML |

The account metadata identifies a billing/account label, not the legal party that accepted the current terms. The owner must confirm whether the contracting customer is Hami Bouidia as Einzelunternehmen and preserve the applicable account agreement/version.

## Verified from hosted delivery

The normal staging homepage returned `200`, `Server: Netlify`, a Netlify request ID, CDN/cache headers and `X-Robots-Tag: noindex, nofollow`.

- No `Set-Cookie` response header was served.
- The delivered HTML contained no analytics marker, remote font, iframe or platform badge.
- The only executable application asset was same-origin.
- The hosted bundle contained no `localStorage`, `sessionStorage`, `document.cookie`, common analytics/tracking marker, XHR or external API implementation.
- Its single `fetch()` occurrence belongs to Vite's same-origin module-preload compatibility code, not an application API call.
- One HTML `<form>` exists for search. It is intercepted client-side and is not submitted to Netlify Forms or another service.

Status: `ACCOUNT VERIFIED` from the linked project's live response and deployed bundle. This does not exclude Netlify's server-side CDN/security logging.

## Verified from provider documentation

| Topic | Provider statement relevant to this site | Status |
| --- | --- | --- |
| DPA availability | Netlify publishes a DPA dated 2026-06-09. It applies where Netlify processes customer data as processor. | `PROVIDER DOCUMENTATION VERIFIED`; account acceptance/version `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW` |
| Hosting data | The DPA's examples include website visitors, IP address and localization data. | `PROVIDER DOCUMENTATION VERIFIED` |
| Request data | Observability documentation identifies request URL including query parameters, user agent, client IP where available, HTTP method/status/content/cache information and request ID. | `PROVIDER DOCUMENTATION VERIFIED` |
| CDN/security | Netlify routes requests through network security, caching and globally distributed edge infrastructure; DDoS protection is part of the provider role. | `PROVIDER DOCUMENTATION VERIFIED` |
| Web Analytics behavior | If enabled, Netlify Web Analytics derives data server-side from CDN logs and does not require client-side code or cookies. It uses IP addresses to calculate unique visitors. | `PROVIDER DOCUMENTATION VERIFIED`; feature is not enabled/included on this account |
| Deploy logs | Deploy logs contain build output and Netlify build/configuration information. | `PROVIDER DOCUMENTATION VERIFIED` |
| Visitor/request logs | Netlify processes server-side request data for delivery, security and operational visibility. Exact underlying provider retention is not published for this account in the inspected materials. | `PROVIDER DOCUMENTATION VERIFIED`; retention `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW` |
| International transfers | Current DPA states EU-US DPF as the primary listed mechanism and EU Standard Contractual Clauses as fallback where the DPF does not apply. | `PROVIDER DOCUMENTATION VERIFIED`; account/application assessment `LEGAL REVIEW REQUIRED` |
| Subprocessors | The official Trust Center publicly exposes a 22-provider list. The account does not expose which subset actually handles this static site. | General list `PROVIDER DOCUMENTATION VERIFIED`; site-specific subset `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW` |

### Current published Netlify subprocessor list

The Trust Center record returned these 22 providers, all with location `United States`: Amazon Web Services (hosting, compute, storage, backup); Google Cloud Platform (infrastructure); Amplitude and Datadog (analytics); WorkOS (identity/access); CrowdStrike (log analysis); SmartBear (error reporting); Fivetran (data services); Snowflake (warehousing); Sigma Computing (business intelligence); DevCycle (feature flags); Deno Land (serverless computing); FullStory (analytics); Altinity (database); Salesforce and Vitally (CRM); Anthropic, OpenAI, Google Vertex AI, Kapa.ai and OpenRouter (AI services); and SendGrid (email services).

This is Netlify's general current provider list, not evidence that every listed provider processes this site's visitor data. The exact applicable subset is `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW`.

Primary provider records:

- [Netlify DPA](https://www.netlify.com/pdf/netlify-dpa.pdf)
- [Netlify Self-Serve Subscription Agreement](https://www.netlify.com/legal/self-serve-subscription-agreement/)
- [Netlify privacy statement](https://www.netlify.com/privacy/)
- [Netlify subprocessors / Trust Center](https://www.netlify.com/legal/subprocessors/)
- [Netlify logs documentation](https://docs.netlify.com/manage/monitoring/logs/)
- [Netlify Observability documentation](https://docs.netlify.com/manage/monitoring/observability/overview/)
- [How Netlify Web Analytics works](https://docs.netlify.com/manage/monitoring/web-analytics/how-web-analytics-works/)
- [Netlify request chain](https://docs.netlify.com/resources/troubleshooting/request-chain/)

## Deploy logs versus visitor logs

Deploy logs document builds, configuration processing and deploy actions. Visitor/request logs arise when a browser, bot or other client requests a page or asset from Netlify's CDN. The verified 30-day deploy-retention setting must not be reused as a visitor-log retention claim.

## Still not verified

- exact legal contracting customer for the account: `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW`
- exact terms/DPA version accepted by that customer and acceptance record: `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW`
- site-specific subset of Netlify's published subprocessors: `NOT VERIFIABLE — COUNSEL / ACCOUNT OWNER REVIEW`
- Netlify's underlying visitor/security-log retention and deletion periods
- which provider personnel/subprocessors can access request data in this account's service path
- account-specific transfer assessment and safeguards required by German/EU law

These facts require counsel/account-owner review before the privacy notice is final. No further automated lookup is planned under the stop condition.

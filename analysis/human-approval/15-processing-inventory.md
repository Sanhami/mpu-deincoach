# Data processing inventory

Checked: 2026-09-03. Legal bases below are candidates for counsel, not final legal conclusions.

| Activity | Purpose | Data categories | Recipient/provider | Legal-basis candidate | Retention status | International transfer | Review requirement |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A. Normal website visit | Retrieve and display requested information | IP address; requested URL/path and, when requested from the server, query string; user agent; HTTP request/response metadata | Hami Bouidia as controller; Netlify as hosting/CDN provider | Art. 6(1)(f) GDPR: reliable website delivery | Exact provider retention missing | Netlify is a US provider; current DPA lists EU-US DPF and fallback SCCs | `LEGAL REVIEW / PROVIDER FACT REQUIRED` |
| B. Server/CDN technical delivery | TLS delivery, edge routing, caching, availability and security | IP address; request URL; user agent; method/status; content/cache data; request ID; potentially localization derived for routing/security | Netlify, Inc. and applicable subprocessors | Art. 6(1)(f) GDPR: delivery, integrity and security | Exact visitor/security-log retention missing | DPF/SCC provider framework documented; account-specific assessment pending | `LEGAL REVIEW / PROVIDER FACT REQUIRED` |
| C. Technical logs | Diagnose delivery errors, abuse and security events; monitor deploys | Visitor/request data above; separately build output, commit/deploy and configuration metadata | Netlify; operator account owner for available dashboard/deploy logs | Art. 6(1)(f) GDPR: operations and security | Deploy retention setting: 30 days. Visitor/security-log retention: not verified | As above | `LEGAL REVIEW / PROVIDER FACT REQUIRED`; do not conflate deploy and visitor logs |
| D. Outbound links | Let users open official sources or the separate commercial MPUdeincoach website | On click, destination receives normal connection data such as IP/user agent; the served policy is `strict-origin-when-cross-origin` | Respective destination operator; no destination request before click | No separate processing by this site before click; destination's own legal basis applies. Wording requires review. | Determined by destination provider | Depends on destination | `LEGAL REVIEW REQUIRED` |
| E. Email contact | Receive and answer voluntary inquiries or corrections | Email address, sender metadata, message and attachments voluntarily supplied | Hami Bouidia; IONOS email service | Art. 6(1)(b) and/or (f) GDPR depending on inquiry | Owner retention/deletion rule not yet recorded | IONOS service/transfer configuration not yet documented | `LEGAL REVIEW / PROVIDER FACT REQUIRED` |
| F. Client-side search | Filter the bundled knowledge content in the browser | Search term in React state and `?q=` URL; no application cookie or Web Storage | No third party during client-side navigation; Netlify if the URL is loaded/reloaded from the server | No separate server processing during local filtering; hosting basis candidate applies when URL is requested | Browser history controlled by user/browser; server retention as in A-C if reloaded | Only if URL is requested from Netlify | `LEGAL REVIEW REQUIRED`; users should not enter case files or health data |
| G. GitHub deployment | Store public source and version history; supply source to Netlify | Source files; commit author and repository/account metadata; no intended visitor data | GitHub, Inc.; authorized repository users; public viewers | Art. 6(1)(f) GDPR candidate for development/version control | Git/repository history retained until altered/deleted under repository governance | GitHub is a US provider; relevance and safeguards require account/legal assessment | `LEGAL REVIEW REQUIRED`; narrow infrastructure disclosure only |
| H. Netlify deployment | Build and publish linked `main` commits | Repository source, commit metadata, build/deploy output and configuration | Netlify, Inc.; GitHub integration | Art. 6(1)(f) GDPR candidate for publishing and operating the website | Verified deploy-retention setting: 30 days; other provider retention not verified | Current Netlify DPA transfer framework applies subject to account/legal assessment | `LEGAL REVIEW / PROVIDER FACT REQUIRED` |

## Application and platform findings

- No application cookies, `localStorage` or `sessionStorage`.
- No application analytics, tracking pixels or session replay.
- Netlify Web Analytics is not enabled/included; Real User Monitoring is not included.
- No third-party runtime embeds, remote fonts or external APIs.
- No contact, booking, checkout, subscription, account or paid-contract form.
- One client-side search form exists; it does not submit to a backend.
- No Netlify Function, Edge Function, Identity service or database is attached.
- Normal hosted response sets no cookie. Netlify dashboard/admin cookies are outside the public website visit and are not treated as visitor cookies.
- Server/CDN request processing and technical logging still occur and must be disclosed independently from browser tracking.

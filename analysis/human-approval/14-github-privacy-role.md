# GitHub privacy role

Checked: 2026-09-03.

## Verified scope

| Item | Verified fact | Status |
| --- | --- | --- |
| Repository | `Sanhami/mpu-deincoach` | `VERIFIED FROM REPOSITORY AND NETLIFY ACCOUNT` |
| Owner type | GitHub user account `Sanhami` | `VERIFIED FROM NETLIFY ACCOUNT` |
| Visibility | Public | `VERIFIED FROM NETLIFY ACCOUNT` (`public_repo: true`) |
| Branch used for deployment | `main` | `VERIFIED FROM NETLIFY ACCOUNT` |
| Integration | Netlify reads the GitHub repository and deploys the linked commit through its Git provider integration | `VERIFIED FROM ACCOUNT` |
| Website role | Source-code and deployment infrastructure only | `VERIFIED FROM ARCHITECTURE` |
| Visitor traffic | No website visitor request is intentionally sent to GitHub; Netlify serves the public pages and assets | `VERIFIED FROM CODE, HOSTED HTML AND NETWORK TARGETS` |

GitHub is not the public website host and must not be described as a general website-visitor processor for this implementation. Its relevant processing concerns repository content, commit/contributor metadata, account/admin activity and the Netlify deployment integration.

## Contract/privacy relevance

- GitHub publishes privacy information and a Data Protection Agreement/subprocessor list for services governed by that agreement.
- Whether a separate GitHub disclosure or DPA treatment is legally necessary for this public source/deployment role is a legal decision.
- No visitor IP address, search query, email inquiry or other application visitor data is intentionally transmitted from `mpu-deincoach.de` to GitHub.

Provider references:

- [GitHub repository visibility documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories)
- [GitHub privacy policies](https://docs.github.com/en/site-policy/privacy-policies)
- [GitHub subprocessors](https://docs.github.com/en/site-policy/privacy-policies/github-subprocessors)

Status: `GITHUB FACTS COMPLETE` for the current website architecture. Final disclosure wording remains `LEGAL REVIEW REQUIRED`.

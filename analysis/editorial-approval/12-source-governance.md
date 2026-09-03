# Source governance

## Hierarchy

| Level | Source class | Examples | Permitted use |
| ---: | --- | --- | --- |
| 1 | law, regulation, official authority text | current FeV on `gesetze-im-internet.de` | primary support for legal requirements; legal interpretation still needs legal review |
| 2 | official professional guidance | BASt Begutachtungsleitlinien | professional framework; verify version against current regulation |
| 3 | recognized institutional professional source | DGVP/DGVM Beurteilungskriterien | specialist support requiring a competent reviewer and edition verification |
| 4 | secondary professional explanation | qualified institutional explainer with citations | context only; trace high-risk claims to Levels 1–3 |
| 5 | legacy content or internal notes | WordPress exports, internal summaries | discovery only; never sole support for high-risk claims |

`SourceRef.governanceLevel` now records this level in the content model and the source list identifies it to readers.

## Governance rules

- Every material claim maps to a source or is marked `SOURCE_MISSING`/editorial.
- Link checks and substantive currency are separate. `reviewedAt` records link verification, not legal or fachlich approval.
- High-risk claims cannot rely solely on Level 5.
- Legal claims use Level 1 plus legal review when interpretation is involved.
- CTU, alcohol and drug claims require applicable Level 1–3 support and a scope-qualified reviewer.
- Concrete prices require source owner, covered service, amount, currency, checked date and expiry/recheck trigger.
- Laws, source editions, and official guidance are rechecked on approval and after a known change.

## Current source risk

The official current FeV Anlage 4a states that its foundation is the Begutachtungsleitlinien in the version dated 12 December 2025. The repository's verified BASt PDF is the 2022 edition. It remains a legitimate Level 2 historical/currently linked source, but it cannot close the source-currency gate for high-risk approval. Obtain and verify the officially applicable 2025 version before approving claims that depend on guideline currency.

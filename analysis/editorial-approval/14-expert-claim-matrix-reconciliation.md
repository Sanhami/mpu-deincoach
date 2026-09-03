# Expert claim-matrix reconciliation

Date: 2026-09-03

## Status

- `EXPERT_ARTICLE_REVIEW_COMPLETE`
- `CLAIM_MATRIX_RECONCILIATION: PARTIAL`

## Why the reconciliation is partial

The project-side matrix exists at `analysis/editorial-approval/02-claim-review-matrix.csv` and contains 66 claim rows. The expert handoff explicitly states that this exact matrix was not available in GitHub `main` during the professional review. It would therefore be inaccurate to mark all 66 rows as individually expert-reviewed.

The article-level decisions have been reconciled without changing the expert's counts or retroactively assigning row-level approvals:

| Route | Matrix rows | Expert article decision | Matrix treatment |
| --- | ---: | --- | --- |
| `/mpu-ablauf/` | 12 | Approved after listed correction | Article decision implemented; rows not relabelled as individually reviewed |
| `/mpu-kosten/` | 10 | Rewrite/source repair required | Source-missing and review gates retained |
| `/alkohol-mpu/` | 9 | Fachreview/current source required | Review and current-source gates retained |
| `/drogen-mpu/` | 8 | Fachreview required | Review gates retained; §§ 13a/14 distinction added |
| `/abstinenznachweis/` | 10 | Fachreview/CTU review required | Review gates retained |
| `/mpu-begutachtungsstelle/` | 17 | Approved after listed corrections | Article decision implemented; rows not relabelled as individually reviewed |

## Current-source boundary

The 2022 BASt guideline PDF is a historical previous version. The current source document corresponding to the 12 December 2025 version referenced by Anlage 4a FeV is not present in the project and remains `CURRENT_SOURCE_REQUIRED`.

# Publication gate model

The article model now uses these machine-readable states:

| State | Meaning | Indexability | Sitemap | Article/FAQ schema |
| --- | --- | --- | --- | --- |
| `DRAFT` | incomplete working content | noindex | excluded | disabled |
| `FACHREVIEW_REQUIRED` | one or more professional gates incomplete | noindex | excluded | disabled |
| `LEGAL_REVIEW_REQUIRED` | professional review complete where required; legal gate incomplete | noindex | excluded | disabled |
| `APPROVED_NOINDEX` | all required reviews complete, intentionally private/non-search | noindex | excluded | disabled |
| `APPROVED_PUBLIC` | every required gate approved for the same version | index | included | eligible if explicitly configured and approved |
| `ARCHIVED` | withdrawn content | noindex | excluded | disabled |

## Enforcement

- `Article.publicationState` is the source of truth.
- `articleIndexability()` returns `index` only for `APPROVED_PUBLIC`.
- `INDEXABLE_PATHS` and therefore sitemap generation select only `APPROVED_PUBLIC` articles.
- Article and FAQ structured data are generated only for `APPROVED_PUBLIC` articles.
- FAQ items additionally carry `PUBLIC_APPROVED` or `REVIEW_REQUIRED`; public collections and FAQ schema select only `PUBLIC_APPROVED` items.
- `reviewRequirements` separately records whether fachlich, legal, editorial and source-verification gates are required.
- `/mpu-ablauf/` and `/mpu-begutachtungsstelle/` are `APPROVED_PUBLIC` after the expert-directed corrections.
- `/mpu-kosten/`, `/alkohol-mpu/`, `/drogen-mpu/` and `/abstinenznachweis/` remain `FACHREVIEW_REQUIRED`.

## Permitted transitions

```text
DRAFT
  -> FACHREVIEW_REQUIRED
  -> LEGAL_REVIEW_REQUIRED (when fachlich gates pass and legal remains)
  -> APPROVED_NOINDEX (all required gates pass, public indexing not authorized)
  -> APPROVED_PUBLIC (all required gates and public authorization pass)

Any state -> DRAFT or FACHREVIEW_REQUIRED when material content changes
Any approved state -> LEGAL_REVIEW_REQUIRED when law/procedure changes
Any state -> ARCHIVED when content is withdrawn
```

An editor must verify that approval forms refer to the same content commit before setting `APPROVED_PUBLIC`.

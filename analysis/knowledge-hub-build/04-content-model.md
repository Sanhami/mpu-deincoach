# 04 — Content Model

`src/content/model.ts` defines the canonical article contract: id, title, slug, excerpt, primary topic, intent, owner domain, competing page, unique value, pillar, author, reviewer, scope, publication/update/review dates, sources, structured body, FAQ, related articles, CTA target, title/description/canonical, indexability, schema configuration and status.

Allowed statuses: `draft`, `review_required`, `reviewed`, `published`, `archived`.

Rendering is generic through `ArticleLayout`; metadata is not scattered across page components. Source, CTA, pillar, glossary and redirect records have their own typed registries.

Release invariant: `review_required` content must be `noindex` and cannot emit Article or FAQ schema. Tests enforce this.


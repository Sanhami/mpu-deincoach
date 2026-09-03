# Review metadata

## Supported fields

- author
- named reviewer
- reviewer role/qualification
- last reviewed date
- next review date
- sources, source level and link-check date
- review scope
- review requirements
- publication state

## Display rules

1. `Reviewed by` or an equivalent named claim may appear only when a real reviewer approved the exact content version and publication of their identity is authorized.
2. Reviewer name, role, last-reviewed date, next-review date, and scope must be stored together with approval evidence.
3. An editorial update date is not presented as a professional review date.
4. Before approval, the UI may state that review is outstanding but must not show invented names, qualifications, future dates, or signature placeholders.
5. Article/FAQ schema must not include reviewer or approval implications before `APPROVED_PUBLIC`.
6. A material correction invalidates affected approval scope and moves the article back to the appropriate required state.

The implementation no longer displays a speculative next-review date for an article without a reviewer. Current articles continue to show an honest outstanding-review state.

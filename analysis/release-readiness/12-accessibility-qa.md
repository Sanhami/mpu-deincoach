# Accessibility and responsive QA

## Verified locally

- Semantic header, navigation, main and footer landmarks
- One H1 per generated page and logical heading structure on representative content
- Skip link targets `#main-content`
- Keyboard-operable navigation, search, links and mobile menu
- Visible focus treatment
- Mobile menu exposes and updates `aria-expanded`
- Search has a programmatic label and named submit control
- Link text is contextual; external CTA purpose is visible
- No content images requiring alt text in P0
- `prefers-reduced-motion` behavior is present where motion is used
- No horizontal overflow across 35 route/viewport combinations at 320, 375, 390, 430, 768, 1024 and 1440 pixels
- Primary controls meet practical touch sizing; tightly rendered inline footer links retain sufficient separation and pass the automated target-size audit

## Defects fixed

1. Removed a redundant brand-link `aria-label` that did not contain the visible link text.
2. Increased muted search/card text contrast by using the design-system muted color token.

After the fixes, Lighthouse accessibility is 100 on all five representative routes with no binary audit failures. Homepage mobile navigation and search were manually exercised. A final screen-reader pass on deployed staging and at least one physical touch device remains recommended because automated testing cannot prove all assistive-technology behavior.

# Staging browser QA

Hosted browser checks covered widths `320`, `375`, `390`, `430`, `768`, `1024`, and `1440` on:

- `/`
- `/mpu-begutachtungsstelle/`
- `/faq/`
- `/redaktion/`

Results:

- no horizontal overflow
- no off-screen offenders
- no missing images
- expected titles, H1s, landmarks, breadcrumbs, articles, source sections, FAQ content, and review badges
- mobile menu opens at 320 px and reports `aria-expanded=true`
- FAQ disclosure opens correctly
- homepage search for `Alkohol` returns two results at `/?q=Alkohol`
- final hosted `/alkohol-mpu/` check at 320 px confirms the corrected BASt URL and zero overflow

Inline breadcrumb, footer, table-of-contents, and source links use natural text line boxes below 24 px in height. They have adequate separation, produced no observed interaction failure, and Lighthouse reported no accessibility failure. This is a non-blocking observation, not a production approval.

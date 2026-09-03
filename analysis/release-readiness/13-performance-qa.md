# Performance QA

Production build after readiness fixes:

- JavaScript: 296.82 kB raw / 92.82 kB gzip
- CSS: 19.11 kB raw / 4.63 kB gzip
- SSR bundle: 86.20 kB (build-only, not shipped to the browser)
- HTML endpoints: 31 prerendered

Representative Lighthouse performance scores were 100 for homepage, Begutachtungsstelle, FAQ, an article-heavy page, and glossary. Best Practices was 100 on all five.

The application has no image payload, custom webfont download, analytics, advertising, third-party scripts, client data fetching, or unnecessary runtime dependency. CSS is one small hashed asset; JavaScript and CSS use Vite content hashes. `_headers` assumes immutable one-year caching for `/assets/*`; HTML must remain revalidatable.

No route-level code splitting was added because the current gzip payload is modest and the content is prerendered. Reassess if P1/P2 materially increases content/runtime code. Staging Core Web Vitals and real-network tests remain required before production DNS cutover.

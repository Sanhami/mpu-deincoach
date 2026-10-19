// Single source of truth for lifting the global `X-Robots-Tag: noindex, nofollow` (public/_headers).
// The header is the default for every build. It is removed only when ALL of these hold:
//   1. SITE_INDEXING === 'allow'          (explicit owner opt-in, set only after release approval)
//   2. CONTEXT === 'production'           (Netlify deploy context; previews/branch deploys never qualify)
//   3. URL === PRODUCTION_ORIGIN          (Netlify's main site address; the staging site reports
//                                          https://mpu-deincoach-staging.netlify.app and therefore never qualifies)
// See analysis/ecosystem-loop-02/NETLIFY_PRODUKTION_UND_O1.md.
export const PRODUCTION_ORIGIN = 'https://mpudeincoach-wissen.de';

export function indexingDecision(env = process.env) {
  if (env.SITE_INDEXING !== 'allow') return { lift: false, reason: 'SITE_INDEXING is not exactly "allow"' };
  if (env.CONTEXT !== 'production') return { lift: false, reason: `CONTEXT is "${env.CONTEXT ?? ''}", not "production"` };
  const url = (env.URL ?? '').replace(/\/+$/, '');
  if (url !== PRODUCTION_ORIGIN) return { lift: false, reason: `URL is "${env.URL ?? ''}", not ${PRODUCTION_ORIGIN}` };
  return { lift: true, reason: 'production build for the production domain with explicit opt-in' };
}

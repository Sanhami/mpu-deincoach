import { useEffect, useState } from 'react';

/**
 * False during prerender and the hydration pass, true afterwards. Query strings never reach the
 * static prerender, so UI that depends on them (search, glossary highlight) must wait for this,
 * otherwise React aborts hydration (error #418) or silently keeps stale attributes.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

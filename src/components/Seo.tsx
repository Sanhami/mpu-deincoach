import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageSeo, schemaForPath } from '../seo';

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.append(element); }
  element.content = content;
}

export function Seo() {
  const location = useLocation();
  useEffect(() => {
    const seo = getPageSeo(location.pathname);
    document.title = seo.title;
    setMeta('meta[name="description"]', 'name', 'description', seo.description);
    setMeta('meta[name="robots"]', 'name', 'robots', seo.indexability === 'index' ? 'index,follow,max-image-preview:large' : 'noindex,follow');
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonical);
    setMeta('meta[property="og:type"]', 'property', 'og:type', seo.type ?? 'website');
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'MPU Wissen');
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = seo.canonical;
    document.head.querySelectorAll('script[data-static-schema], script[data-runtime-schema]').forEach((node) => node.remove());
    schemaForPath(location.pathname).forEach((schema) => { const script = document.createElement('script'); script.type = 'application/ld+json'; script.dataset.runtimeSchema = 'true'; script.text = JSON.stringify(schema); document.head.append(script); });
  }, [location.pathname]);
  return null;
}

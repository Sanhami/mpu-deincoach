// @vitest-environment jsdom
import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from '../App';
import { ARTICLES } from '../content/articles';
import { render } from '../entry-server';

const hydrationErrors = async (url: string) => {
  window.history.replaceState(null, '', url);
  // The host serves the prerendered file of the path; query strings never reach the prerender.
  document.body.innerHTML = `<div id="root">${render(new URL(url, 'https://x').pathname).html}</div>`;
  const errors: string[] = [];
  const root = document.getElementById('root')!;
  await act(async () => {
    hydrateRoot(root, <BrowserRouter><App /></BrowserRouter>, {
      onRecoverableError: (error) => errors.push(String((error as Error).message ?? error)),
      onUncaughtError: (error) => errors.push(String((error as Error).message ?? error)),
    });
  });
  return errors;
};

describe('client hydration of prerendered HTML', () => {
  it('applies query-dependent UI after hydration (search results, glossary highlight)', async () => {
    expect(await hydrationErrors('/?q=Nachweis')).toEqual([]);
    expect(document.querySelector('.search-results h2')?.textContent).toMatch(/Ergebnisse für „Nachweis“/);
    // result cards show the teaser, not the whole article body
    const article = ARTICLES.find((item) => item.slug === '/abstinenznachweis/')!;
    const results = document.querySelector('.search-results')!.textContent!;
    expect(results).toContain(article.excerpt);
    expect(results).not.toContain((article.body[0] as { text: string }).text);
    expect(await hydrationErrors('/glossar/?begriff=CTU')).toEqual([]);
    expect(document.querySelector('.glossary .selected dt')?.textContent).toBe('CTU');
  });

  for (const url of ['/', '/wissen/', '/faq/', '/glossar/', '/mpu-verfahren/', '/mpu-begutachtungsstelle/', '/abstinenznachweis/', '/warenkorb/', '/gibtsnicht/', '/mpu-vorbereitung-ellwangen/', '/?q=Nachweis', '/glossar/?begriff=CTU', '/mpu-verfahren/?utm_source=newsletter']) {
    it(`hydrates ${url} without mismatch`, async () => {
      expect(await hydrationErrors(url)).toEqual([]);
    });
  }
});

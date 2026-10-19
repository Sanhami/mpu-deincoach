import { describe, expect, it } from 'vitest';
import { render } from '../entry-server';

const h1Count = (html: string) => (html.match(/<h1[ >]/g) ?? []).length;

describe('prerender output', () => {
  it('renders the homepage with one clear knowledge H1 and metadata', () => {
    const result = render('/');
    expect(h1Count(result.html)).toBe(1);
    expect(result.html).toContain('MPU Wissen');
    expect(result.head).toContain('<link rel="canonical" href="https://mpudeincoach-wissen.de/">');
    expect(result.head).toContain('SearchAction');
  });

  it('renders the assessment-center article with sources, but noindex and without Article/FAQ schema (O-14)', () => {
    const result = render('/mpu-begutachtungsstelle/');
    expect(h1Count(result.html)).toBe(1);
    expect(result.html).toContain('MPU-Begutachtungsstelle wählen');
    expect(result.html).toContain('§ 11 Fahrerlaubnis-Verordnung');
    expect(result.html).toContain('Nicht für Suchmaschinen freigegeben');
    expect(result.head).toContain('content="noindex,follow"');
    expect(result.head).not.toContain('"@type":"Article"');
    expect(result.head).not.toContain('"@type":"FAQPage"');
  });

  it('renders 404 and gone pages distinctly', () => {
    expect(render('/does-not-exist/').html).toContain('404');
    expect(render('/warenkorb/').html).toContain('410');
  });

  it('renders no unpublished question on the FAQ page and keeps it noindex while empty', () => {
    const result = render('/faq/');
    expect(result.html).not.toContain('Wie lange dauert der gesamte MPU-Ablauf?');
    expect(result.html).not.toContain('Braucht jede Alkohol-MPU einen Abstinenznachweis?');
    expect(result.head).not.toContain('"@type":"FAQPage"');
    expect(result.head).toContain('content="noindex,follow"');
  });
});

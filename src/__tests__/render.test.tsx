import { describe, expect, it } from 'vitest';
import { render } from '../entry-server';

const h1Count = (html: string) => (html.match(/<h1[ >]/g) ?? []).length;

describe('prerender output', () => {
  it('renders the homepage with one clear knowledge H1 and metadata', () => {
    const result = render('/');
    expect(h1Count(result.html)).toBe(1);
    expect(result.html).toContain('MPU Wissen');
    expect(result.head).toContain('<link rel="canonical" href="https://mpu-deincoach.de/">');
    expect(result.head).toContain('SearchAction');
  });

  it('renders the approved assessment-center URL with sources and scoped schema', () => {
    const result = render('/mpu-begutachtungsstelle/');
    expect(h1Count(result.html)).toBe(1);
    expect(result.html).toContain('MPU-Begutachtungsstelle wählen');
    expect(result.html).toContain('§ 11 Fahrerlaubnis-Verordnung');
    expect(result.html).toContain('Fachprüfung abgeschlossen');
    expect(result.head).toContain('index,follow,max-image-preview:large');
    expect(result.head).toContain('"@type":"Article"');
    expect(result.head).toContain('"@type":"FAQPage"');
  });

  it('renders 404 and gone pages distinctly', () => {
    expect(render('/does-not-exist/').html).toContain('404');
    expect(render('/warenkorb/').html).toContain('410');
  });

  it('renders only approved questions on the public FAQ page', () => {
    const result = render('/faq/');
    expect(result.html).toContain('Wie lange dauert der gesamte MPU-Ablauf?');
    expect(result.html).toContain('Kann eine Begutachtungsstelle gleichzeitig meine Vorbereitung verkaufen?');
    expect(result.html).not.toContain('Braucht jede Alkohol-MPU einen Abstinenznachweis?');
    expect(result.head).toContain('"@type":"FAQPage"');
    expect(result.head).toContain('index,follow,max-image-preview:large');
  });
});

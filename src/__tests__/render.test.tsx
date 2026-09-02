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

  it('renders the preserved assessment-center URL with sources and review gate', () => {
    const result = render('/mpu-begutachtungsstelle/');
    expect(h1Count(result.html)).toBe(1);
    expect(result.html).toContain('MPU-Begutachtungsstelle wählen');
    expect(result.html).toContain('§ 11 Fahrerlaubnis-Verordnung');
    expect(result.html).toContain('Fachprüfung ausstehend');
    expect(result.head).toContain('noindex,follow');
  });

  it('renders 404 and gone pages distinctly', () => {
    expect(render('/does-not-exist/').html).toContain('404');
    expect(render('/warenkorb/').html).toContain('410');
  });
});

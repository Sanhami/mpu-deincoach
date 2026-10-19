import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (...parts: string[]) => readFileSync(join(process.cwd(), ...parts), 'utf8').replace(/\r\n/g, '\n');

describe('global noindex release switch', () => {
  it('ships the global noindex header by default (source of every build)', () => {
    expect(read('public', '_headers')).toMatch(/^\/\*\n(?:\s+.+\n)*?\s+X-Robots-Tag: noindex, nofollow$/m);
  });

  it('lifts it only for the exact opt-in SITE_INDEXING=allow, never via a committed config', () => {
    const prerender = read('scripts', 'prerender.mjs');
    expect(prerender).toContain("process.env.SITE_INDEXING === 'allow'");
    expect(read('netlify.toml')).not.toMatch(/SITE_INDEXING/);
  });
});

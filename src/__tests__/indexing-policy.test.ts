import { describe, expect, it } from 'vitest';
// @ts-expect-error plain ESM build script without type declarations
import { indexingDecision, PRODUCTION_ORIGIN } from '../../scripts/indexing-policy.mjs';

const prod = { SITE_INDEXING: 'allow', CONTEXT: 'production', URL: 'https://mpudeincoach-wissen.de' };

describe('indexing policy: the global noindex can only be lifted for the production domain', () => {
  it('lifts it only for SITE_INDEXING=allow + CONTEXT=production + URL=production origin', () => {
    expect(PRODUCTION_ORIGIN).toBe('https://mpudeincoach-wissen.de');
    expect(indexingDecision(prod).lift).toBe(true);
    expect(indexingDecision({ ...prod, URL: 'https://mpudeincoach-wissen.de/' }).lift).toBe(true);
  });

  it('never lifts it on the staging site, even with SITE_INDEXING=allow in the production context', () => {
    expect(indexingDecision({ ...prod, URL: 'https://mpu-deincoach-staging.netlify.app' }).lift).toBe(false);
  });

  it('never lifts it on deploy previews, branch deploys, dev or local builds', () => {
    for (const CONTEXT of ['deploy-preview', 'branch-deploy', 'dev', undefined]) expect(indexingDecision({ ...prod, CONTEXT }).lift).toBe(false);
    expect(indexingDecision({ SITE_INDEXING: 'allow' }).lift).toBe(false);
  });

  it('never lifts it for near-miss values', () => {
    for (const SITE_INDEXING of ['Allow', 'true', '1', 'yes', ' allow', undefined]) expect(indexingDecision({ ...prod, SITE_INDEXING }).lift).toBe(false);
    for (const URL of ['https://www.mpudeincoach-wissen.de', 'http://mpudeincoach-wissen.de', 'https://mpudeincoach-wissen.de.evil.example', undefined]) expect(indexingDecision({ ...prod, URL }).lift).toBe(false);
  });

  it('explains a refused opt-in so a misconfigured production build is visible in the log', () => {
    expect(indexingDecision({ ...prod, URL: 'https://mpu-deincoach-staging.netlify.app' }).reason).toMatch(/URL/);
    expect(indexingDecision({ ...prod, CONTEXT: 'branch-deploy' }).reason).toMatch(/CONTEXT/);
  });
});

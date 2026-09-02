# 00 — Environment

Audit date: 2026-09-02

## Confirmed roots

| Role | Absolute path | State | Rule |
|---|---|---|---|
| Legacy / historical | `C:\Users\harbn\Desktop\MPU-Knowledge-Project\Transfer` | Readable | Read-only input; never built or copied |
| Professional knowledge | `C:\Users\harbn\Desktop\MPU-Knowledge-Project\MPU Fachwissensdatenbank` | Readable; separate Git repository | Read-only factual/editorial input; private/internal material excluded |
| Production app | `C:\Users\harbn\Desktop\MPU-Knowledge-Project\mpu-deincoach` | Empty at audit start | Sole new application repository |

## Phase 0 result

The production root contained no files and no `.git`, so there was no existing Lovable scaffold, framework, routing, components, styling, build, lint, test or typecheck configuration to preserve. It was initialized as a `main` Git repository. The brief's Git/Lovable requirement and explicit ban on WordPress override Phase 5's conditional clean-WordPress recommendation.

Chosen baseline: React 19, TypeScript, Vite, React Router, CSS design tokens, Vitest, ESLint, static prerendering. No Supabase is needed because the first release has no forms, accounts or private data.

Phase reports read: Phase 3, Phase 4, Phase 5 and Phase 6A master reports. Phase 5 owns URL and domain decisions.

## Toolchain

- Node: 24.17.0
- npm: 11.13.0
- Branch: `main`
- Remote: not configured
- Deployment/staging: not supplied


# MPU Execution Log – Loop 02

Persistenter Arbeitsstand: Nach einem Kontextverlust zuerst diese Datei und `MPU_OWNER_ACTIONS.md` lesen.

## Arbeitsumgebung

- Wissensportal: lokaler Klon `C:\Users\harbn\Desktop\mpu-deincoach`, Branch `claude/wissen-rc-2026-10`
- Hauptseite: Worktree `mpu-lichtblick/.claude/worktrees/website-overhaul-deployment-prep-bdb059`, nur gelesen und getestet, nicht geändert
- CRM: `C:\Users\harbn\Desktop\MPUdeincoach-CRM-coachos` (Tests) und Production-Server per SSH (nur lesend)

## 19.10.2026

| Zeit (Reihenfolge) | Schritt | Ergebnis |
| --- | --- | --- |
| 1 | CoachOS: Health, Container, Deploy-Historie, Datei-Hashes gegen `d578f3c`, Backup-Status, Log-Kategorien, Zugriffsschutz | gesund, Release technisch abgeschlossen (Details: Ecosystem Audit §2). Env-Lesen vom Berechtigungssystem abgelehnt → nicht wiederholt. |
| 2 | `git clone Sanhami/mpu-deincoach`; `npm ci`; Baseline `npm run qa` | grün; 31 HTML, 11 indexierbar, 18× 301, 10× 410 |
| 3 | HTTP-Prüfung Staging, Produktionsdomain, Altdomain, CTA-Ziele der Hauptseite | P0: Produktionsdomain auf Lovable live; Altdomain 423; Alkohol-CTA mit 301-Hop |
| 4 | Live-Crawl Hauptseite (48 URLs, 51 Linkziele), Schema-Inventar | sauber |
| 5 | TDD: `src/__tests__/release-candidate.test.tsx` (10 Tests, alle rot) → Fixes S1–S3, S5–S9 → grün | Commit `9f6e05a` |
| 6 | Browser-QA lokaler Build (eigener Static-Server, Port 4321), 4 Breiten × 12 Routen | kein Überlauf; Hydration-Fehler #418 in der Konsole gefunden |
| 7 | Ursache eingegrenzt (nur Query-URLs), auf Staging reproduziert; jsdom-Hydrationstest (rot) → `useHydrated` → grün; im Browser bestätigt | Commit `ca239f0` |
| 8 | Schrift auf Markenstack, mobile H1, 24-px-Linkziele; erneut 4 Breiten gemessen | Commit `493fb5f` |
| 9 | Hauptseite: `bun test` 121/121, Lead-Funnel 28/28, `seo:check` ok. CRM: Webhook-/Schema-Tests 45/45 | keine Änderung nötig |
| 10 | Content-OS-Backlog und SEO-Cluster-Plan (agent-os) gelesen; Notion nicht verfügbar | Content Map §6 |
| 11 | Abschlussdokumente unter `analysis/ecosystem-loop-02/` | Commit siehe `git log` |

## Commits (Branch `claude/wissen-rc-2026-10`)

| Commit | Inhalt |
| --- | --- |
| `9f6e05a` | fix(seo): Release-Candidate-Schutz für Routing, robots.txt und Schema |
| `ca239f0` | fix(hydration): Suchergebnisse und Glossar-Markierung erst nach der Hydration |
| `493fb5f` | style: Markenschrift, mobile H1, 24-px-Linkziele |
| (folgt) | docs: Loop-02-Audit und Release-Dokumente |

## Nicht ausgeführt (bewusst)

Produktivdeployment, Merge nach `main`, Entfernen des Staging-Noindex, DNS-/Lovable-Änderungen, Änderung von Publikationsstatus, neue Fachtexte, Notion-Statusänderungen, Social-Posts, CRM-Schreibzugriffe, Offsite-Restore-Test.

## Nächster Einstieg

1. PR-Status und CI prüfen.
2. Wenn O-1 erledigt ist: Produktionsdomain erneut per HTTP prüfen (`curl -sI https://mpudeincoach-wissen.de/`).
3. Nach dem Merge: Staging-Nachprüfung laut `MPU_WISSEN_RELEASE_STATUS.md` („Nicht geprüft“).

## 19.10.2026 – Nachtrag nach Owner-Review

| Schritt | Ergebnis |
| --- | --- |
| PR #1 auf der Netlify Deploy Preview geprüft | Ellwangen 404, robots.txt ohne Disallow, `/?q=Nachweis` ohne #418, 301/410/404 und noindex korrekt. Neu gesehen: `/404` und `/404.html` antworten auf Netlify mit 200 (noindex, Plattformverhalten, schon vor dem PR so) |
| O-5 und O-7 vom Inhaber freigegeben | Tests zuerst (2 rot) → Startseite und Ratgeber: „dokumentierte“ statt „namentliche“ Fachprüfung; Slug `/mpu-ablauf/` → `/mpu-verfahren/` (id, Canonical, Navigation, Startseite, Pillar, Glossar, Related Links, Inventar) → 38/38 grün |

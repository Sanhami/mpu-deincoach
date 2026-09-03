# Six article review packets

## Expert handoff outcome — 2026-09-03

`EXPERT_ARTICLE_REVIEW_COMPLETE`

| Route | Expert decision | Implemented publication state |
| --- | --- | --- |
| `/mpu-ablauf/` | Approved after listed wording correction | `APPROVED_PUBLIC` |
| `/mpu-begutachtungsstelle/` | Approved after listed wording corrections | `APPROVED_PUBLIC` |
| `/mpu-kosten/` | Rewrite and current source repair required | `FACHREVIEW_REQUIRED` |
| `/alkohol-mpu/` | Current-source and specialist review still required | `FACHREVIEW_REQUIRED` |
| `/drogen-mpu/` | Specialist review still required | `FACHREVIEW_REQUIRED` |
| `/abstinenznachweis/` | CTU review still required | `FACHREVIEW_REQUIRED` |

The approved handoff did not provide public reviewer identities. No reviewer identity, qualification or date has been invented. The publication decisions above implement the expert decision; the detailed 66-row matrix remains a separate, partially reconciled project artifact.

Each decision applies only to the exact reviewed content commit. Check one outcome per required reviewer.

## Named reviewer approval record

Complete one record for every required reviewer block on each article. An article is not approved until every required block has a valid record.

- Article/route:
- Reviewer full name:
- Professional role and qualification:
- Reviewer block: `MPU / TRAFFIC PSYCHOLOGY` / `CTU / TOXICOLOGY` / `GERMAN DRIVER-LICENSING LAW` / `SOURCE / EDITORIAL`
- Exact claims/sections reviewed:
- Reviewed content commit or immutable review-bundle identifier:
- Sources and versions checked:
- Review date:
- Public naming consent: `YES / NO`
- Decision: `APPROVED` / `APPROVED WITH CHANGES` / `NOT APPROVED`
- Required changes/reason:
- Confirmation evidence/signature location:
- Next review date or trigger:

The detailed decision surface is the 66-row `analysis/editorial-approval/02-claim-review-matrix.csv`. A packet-level approval cannot override an unresolved `SOURCE_MISSING`, `TOO_STRONG`, `OUTDATED_RISK` or current-source gate.

## 1. MPU-Verfahren: Rollen, Akte und Gutachten

**Expert decision:** `APPROVED WITH CHANGES` — listed correction implemented; `APPROVED_PUBLIC`.

- **Route:** `/mpu-ablauf/`
- **Review type:** MPU/traffic psychology + German driver-licensing law + source/editorial verification
- **Claims:** 12
- **Official sources:** FeV §11; FeV Anlage 4a
- **Professional source:** Beurteilungskriterien, 5th edition, foundations/H0
- **Claims requiring decision:** deadline wording; authority question and investigation scope; commissioning and usable-file transfer; investigation components; report consequences; cautious duration answer
- **Proposed corrections:** no unresolved mandatory rewrite; reviewer must qualify any overbroad procedural wording and confirm that the narrowed institutional intent is maintained
- [ ] `APPROVED`
- [ ] `APPROVED WITH CHANGES` — required changes:
- [ ] `NOT APPROVED` — reason:

## 2. MPU-Kosten: Bestandteile und Einflussfaktoren

**Expert decision:** `NOT APPROVED` — rewrite and current primary/provider source repair required.

- **Route:** `/mpu-kosten/`
- **Review type:** MPU/procedure + German driver-licensing law for regulated wording + source/editorial verification
- **Claims:** 10
- **Official sources:** FeV §11; FeV Anlage 4a no. 4 for interpreter cost
- **Professional source:** Beurteilungskriterien foundations
- **Claims requiring decision:** completeness of cost taxonomy; authority/labor/evidence cost categories; investigation-at-own-cost wording; statement that no universal total price exists
- **Proposed corrections:** add current official/provider support for authority, laboratory/evidence, and total-cost variability claims; retain zero concrete prices until source, scope, currency, checked date, and recheck trigger exist
- [ ] `APPROVED`
- [ ] `APPROVED WITH CHANGES` — required changes:
- [ ] `NOT APPROVED` — reason:

## 3. Alkohol-MPU: Grundlagen und Wissensübersicht

**Expert decision:** `NOT APPROVED` — remains `FACHREVIEW_REQUIRED`; current 12 December 2025 guideline source required for detailed claims.

- **Route:** `/alkohol-mpu/`
- **Review type:** MPU/traffic psychology with alcohol competence + CTU/toxicology + source verification
- **Claims:** 9
- **Official sources:** FeV Anlage 4a; BASt Begutachtungsleitlinien 2022, which does **not** close the current-version gate
- **Professional sources:** Beurteilungskriterien alcohol A1–A7 and CTU C3
- **Claims requiring decision:** consumption-history factors; stable risk-appropriate change; abstinence versus controlled use; evidence method/period/formality; whether reduced drinking is sufficient
- **Proposed corrections:** qualify or replace the unsupported statement that unsuitable/incomplete evidence may not be repairable; acquire authoritative 2025 Begutachtungsleitlinien before approval
- [ ] `APPROVED`
- [ ] `APPROVED WITH CHANGES` — required changes:
- [ ] `NOT APPROVED` — reason:

## 4. Drogen-MPU: Anlässe, Ablauf und Nachweise

**Expert decision:** `NOT APPROVED` — remains `FACHREVIEW_REQUIRED`.

- **Route:** `/drogen-mpu/`
- **Review type:** MPU/traffic psychology with drug competence + CTU/toxicology + German driver-licensing law for cannabis/current law
- **Claims:** 8
- **Official sources:** FeV Anlage 4a
- **Professional sources:** Beurteilungskriterien drugs D1–D5 and CTU C3
- **Claims requiring decision:** substance/case distinctions; required reconstruction factors; laboratory conditions and prognosis limits; rapid-test equivalence; cannabis/current-law boundary
- **Proposed corrections:** add current official cannabis/FeV legal sources and approve or revise the cannabis boundary before publication
- [ ] `APPROVED`
- [ ] `APPROVED WITH CHANGES` — required changes:
- [ ] `NOT APPROVED` — reason:

## 5. Abstinenznachweis für die MPU: Überblick

**Expert decision:** `NOT APPROVED` — remains `FACHREVIEW_REQUIRED`; CTU validation still required.

- **Route:** `/abstinenznachweis/`
- **Review type:** CTU/toxicology + MPU professional + source/editorial verification
- **Claims:** 10
- **Official source:** FeV Anlage 4a no. 6
- **Professional source:** Beurteilungskriterien CTU C3
- **Claims requiring decision:** individual need/method/period; differences between hair and urine evidence; identity, collection, responsible body and documentation; program versus single test; no universal periods
- **Proposed corrections:** no unresolved mandatory rewrite; CTU reviewer must approve exact terminology and the newly narrowed evidence-integrity intent
- [ ] `APPROVED`
- [ ] `APPROVED WITH CHANGES` — required changes:
- [ ] `NOT APPROVED` — reason:

## 6. MPU-Begutachtungsstelle wählen: Was du wissen solltest

**Expert decision:** `APPROVED WITH CHANGES` — listed corrections implemented; `APPROVED_PUBLIC`.

- **Route:** `/mpu-begutachtungsstelle/`
- **Review type:** German driver-licensing law + MPU/assessment professional + source/editorial verification
- **Claims:** 17
- **Official sources:** FeV §11; FeV §66; FeV Anlage 4a; FeV Anlage 14
- **Professional source:** Beurteilungskriterien foundations
- **Claims requiring decision:** official recognition and requirements; choice/commissioning; file transfer and inspection; center change effects; common standards; independence and role separation; legal FAQ answers
- **Proposed corrections:** source, qualify, or remove claimed consequences of switching centers; qualify/remove the unsupported provider-ranking assertion; legal reviewer must approve every file/procedure/right statement
- [ ] `APPROVED`
- [ ] `APPROVED WITH CHANGES` — required changes:
- [ ] `NOT APPROVED` — reason:

Reviewer full name and block:

Reviewed content commit:

Review date:

Sources/versions checked:

Next review date or trigger:

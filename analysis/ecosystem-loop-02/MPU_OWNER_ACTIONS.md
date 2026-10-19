# Owner Actions – nur Entscheidungen und Freigaben, die du treffen musst

Stand: 20.10.2026. Alles, was ohne dich technisch möglich war, ist erledigt (PR #1 gemergt, PR #2 offen).

## Offen – als Nächstes

**O-1 · Trennung von Lovable ausführen (Variante A gewählt) – wartet auf deine gesonderte Freigabe**
Vorbereitet in `NETLIFY_PRODUKTION_UND_O1.md` § 2. DNS unmittelbar geprüft (19.10.2026 22:01 UTC, `scripts/ops/dns-o1-check.mjs pre`: 10/10 OK). Ablauf:
1. Prüfskript `pre`
2. A `@`/`www` löschen
3. in Lovable *Disconnect*
4. `_lovable`-TXT löschen
5. Prüfskript `post`
6. Search Console prüfen
MX, SPF, `_dmarc`-CNAME und Google-Verifizierung bleiben unangetastet.
**Benötigt:** deine Freigabe für die DNS-Änderung **und** für das Trennen in Lovable. Führst du die Schritte selbst aus oder gibst du mir dafür Zugang? Für IONOS/Lovable habe ich hier keinen Zugang.

**O-15 · Produktionsmodell (neu, vor dem Launch)**
Würde die Produktionsdomain an die bestehende Netlify-Site gehängt, gäbe es keine unabhängige Staging-Umgebung mehr. Empfehlung: eine **eigene Netlify-Site** für die Produktion, die vom Branch `production` baut; die bestehende Site bleibt Staging. Die Staging-Sperre ist technisch gegen `SITE_INDEXING=allow` abgesichert (`URL`- und `CONTEXT`-Bedingung, getestet). Vor dem Anlegen im Netlify-Konto prüfen, dass Kontingent und Site-Anzahl ohne Upgrade reichen. Entscheidung: zweite Site (empfohlen) oder Alternative mit Branch-Deploy-Staging (Runbook § 4).

**O-2 · Rechtstexte** – Prüfpaket `RECHTSTEXTE_FREIGABEPRUEFUNG.md`.
Von dir: Provider-Fakten aus Netlify- und IONOS-Konto (D-5 bis D-9). Dazu deine Antworten zu:
- I-2: Kontaktangaben gewollt?
- I-8: Altdomain im Impressum erwähnen?
- D-8: gleiche Netlify-DPA für eine zweite Site?
Außerdem: eine juristische Prüfung beauftragen oder selbst organisieren (voraussichtlich kostenpflichtig; nichts beauftragt) und die AGB-Entscheidung protokollieren.

**O-14-Nachweise · Prüfnachweise für `/mpu-verfahren/` und `/mpu-begutachtungsstelle/`**
Entscheidung B ist umgesetzt: Beide Artikel sind `APPROVED_NOINDEX`, ebenso die zugehörigen 6 FAQ und `/faq/`. Für eine spätere Indexierung brauchst du: Prüferformular (Name, Qualifikation, Commit, Datum, Nachweisort; Veröffentlichung des Namens optional) und eine rechtliche Prüfung. Danach genügt ein Satz von dir, um sie wieder auf `APPROVED_PUBLIC` zu setzen.

**O-3 · Produktionsfreigabe** – erst nach O-1, O-2, O-15. Kein Produktionsdeployment ohne dich.

## Offen – fachlich und strategisch

- **O-4 · Begutachtungsstelle:** Hauptseite und Portal konkurrieren um dieselbe Suchabsicht. Durch O-14 vorerst entschärft, weil der Portal-Artikel noindex ist. Vor einer späteren Freigabe entscheiden.
- **O-6 · Fachreview** der 4 weiteren Artikel und 8 FAQ sowie Quelle Begutachtungsleitlinien vom 12.12.2025.
- **O-8 · Altdomain `mpu-deincoach.de`** (423 Locked) und Ellwangen: weiterführen oder aufgeben.

## Betrieb und Zugänge

- **O-9** Notion-Connector freischalten (claude.ai-Einstellungen), sonst kein Abgleich der 24 „Skript“-Einträge.
- **O-10** Search Console: Für `mpudeincoach-wissen.de` existiert bereits eine Property. Leistungsdaten von `mpudeincoach.de` helfen bei O-4.
- **O-11** CRM: ersten Offsite-Restore-Test ausführen (Runbook im CRM-Repo, ändert keine Produktivdaten).
- **O-12** CRM: Staging-Instanz nach Plan stoppen.
- **O-13** CRM: Versandmodus und Aufbewahrungsfristen selbst bestätigen (Env-Lesen war mir nicht erlaubt).

## Erledigt

- **O-5** Öffentliche Prüfaussagen auf den Beleg reduziert (PR #1).
- **O-7** Slug `/mpu-verfahren/` (PR #1).
- **O-14** Entscheidung B umgesetzt (PR #1, gemergt 20.10.2026 als `2dc684f`).

## Spätere Kosten (nur zur Kenntnis, nichts beauftragt)

- Netlify: zweite Site im Free-Plan voraussichtlich möglich, Kontingent im Konto prüfen. Passwortschutz für Staging nur in Bezahlplänen.
- Externe Fachreviewer und juristische Prüfung: voraussichtlich kostenpflichtig.
- Altdomain `mpu-deincoach.de`: laufende Kosten, falls weitergeführt.

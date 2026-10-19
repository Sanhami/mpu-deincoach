# Owner Actions – nur Entscheidungen und Freigaben, die du treffen musst

Stand: 19.10.2026. Sortiert nach Dringlichkeit. Alles, was ohne dich technisch möglich war, ist erledigt oder liegt im Release-Candidate-PR.

## Sofort (P0)

**O-1 · Produktionsdomain `mpudeincoach-wissen.de` absichern**
Befund: Die Domain zeigt auf ein Lovable-Projekt (IP `185.158.133.1`) mit einem alten Build. Die Startseite ist `index,follow`, `/impressum` und alle Unterseiten liefern 404, die Sitemap listet nur 404-URLs.
DNS bei IONOS: A `@` und A `www` → `185.158.133.1` (gemeinsame Lovable-IP), TXT `_lovable`/`_lovable.www`. Mail-Einträge und `google-site-verification` müssen bleiben.
**Schritt-für-Schritt-Anleitung: `NETLIFY_PRODUKTION_UND_O1.md` § 2.** Kurz, Variante A (empfohlen, kostenlos, kein Unpublish nötig):
1. bei IONOS die beiden A-Records löschen,
2. in Lovable beide Domains trennen (*Disconnect*),
3. bei IONOS die `_lovable`-TXT löschen,
4. per HTTP/DNS prüfen, in der Search Console ggf. die Startseite vorübergehend entfernen.
Diese Reihenfolge verhindert, dass die Domain auf eine gemeinsame Lovable-IP zeigt, ohne dort verbunden zu sein (Risiko einer Übernahme).
Variante B (sofort an Netlify mit noindex) ist beschrieben, aber nicht empfohlen, solange kein Impressum freigegeben ist.

Ich habe weder Lovable noch DNS angefasst (keine Berechtigung, Domain/DNS ist Inhabersache).

## Vor dem Launch (P1)

**O-2 · Rechtstexte freigeben**
Impressum und Datenschutz liegen als Entwurf vor (`analysis/human-approval/10-draft-impressum.md`, `12-draft-datenschutz.md`). Erforderlich: juristische Freigabe, AGB-Anwendbarkeit protokollieren (technisch nicht nötig: kein Verkauf, keine Konten auf dieser Domain), Netlify-AVV prüfen.

**O-3 · Produktions-Release freigeben**
Erst nach O-1, O-2 und O-14: Produktionsdomain an Netlify, dann in Netlify `SITE_INDEXING=allow` **nur im Kontext „Production“** setzen. Ohne diese Variable bleibt die globale Sperre in jedem Build aktiv. Einstellungen und Abnahme-Checkliste: `NETLIFY_PRODUKTION_UND_O1.md` § 4. Ich habe nichts davon ausgeführt.

**O-4 · Wem gehört „MPU-Begutachtungsstelle wählen“?**
Beide Domains haben eine indexierbare Seite mit fast gleichem Titel (`mpudeincoach.de/mpu-begutachtungsstelle` und `…-wissen.de/mpu-begutachtungsstelle/`).
- **A (empfohlen):** Das Portal ist primär (neutral, FeV-belegt, fachlich freigegeben). Die Hauptseite wird auf „Vorbereitung passend zur Begutachtungsstelle“ umgestellt und verlinkt das Portal.
- **B:** Die Hauptseite bleibt primär, der Portal-Artikel wird `APPROVED_NOINDEX`.
Am besten mit Search-Console-Daten der Hauptseite entscheiden (Impressionen und Klicks dieser URL).

**O-5 · Öffentliche Aussage „namentliche Fachprüfung“ – ERLEDIGT (PR #1), am 19.10. nachgeschärft**
Belegprüfung: Auch „dokumentierte Fachprüfung“ war nicht gedeckt. Dokumentiert ist nur eine Experten-Entscheidung auf Artikelebene (03.09.2026), ohne ausgefülltes Prüferformular und ohne Nachweis einer rechtlichen Prüfung. Jetzt steht dort: „Risikoinhalte bleiben für Suchmaschinen gesperrt, bis eine fachliche Prüfung vorliegt. Den Prüfstatus zeigt jeder Artikel.“ Die Prüfkarte nennt „Fachliche Prüfung … auf Artikelebene abgeschlossen (Experten-Handoff vom 3. September 2026)“ statt „fachliche **und rechtliche** Prüfung“. Ursprünglicher Befund:
Die Startseite sagt, Risikoinhalte würden erst nach *namentlicher* Fachprüfung freigegeben. Die beiden freigegebenen Artikel nennen aber keinen Reviewer (`reviewer: null`).
- **A:** Den Reviewer mit dessen Einverständnis, Qualifikation und Prüfdatum nennen. Ich trage ihn ein.
- **B:** Den Satz anpassen, z. B. „nach dokumentierter Fachprüfung“.
Ich habe weder einen Namen erfunden noch die Aussage eigenmächtig geändert.

## Fachlich (P1/P2)

**O-14 · Prüfnachweis für die 2 indexierbaren Artikel (vor dem Launch)**
`/mpu-verfahren/` und `/mpu-begutachtungsstelle/` sind `APPROVED_PUBLIC` aufgrund des Experten-Handoffs. Nach den Regeln des Repos (`04-review-approval-template.md`, `10-publication-gate-model.md`) fehlen: Prüferformular (Name, Qualifikation, Commit, Datum, Nachweisort; der Name muss **nicht** veröffentlicht werden) und die rechtliche Prüfung (`LEGAL_REVIEW` ist Anforderung beider Artikel).
- **A:** Nachweise ergänzen (intern ablegen), dann bleibt alles wie es ist.
- **B:** Bis dahin beide Artikel auf `APPROVED_NOINDEX` setzen. Ein Satz von dir genügt, ich setze es um.
Für den Merge nach Staging ist das unkritisch (Staging bleibt noindex), für den Launch ist es eine Voraussetzung.

**O-6 · Fachreview der 4 gesperrten Artikel und 8 FAQ**
Kosten, Alkohol, Drogen, Abstinenznachweis. Reviewer-Profile und Prüfpakete liegen in `analysis/human-approval/02-…` und `03-…`. Zusätzlich nötig: die **aktuelle Fassung der Begutachtungsleitlinien vom 12.12.2025** als Quelle (`05-current-source-gap.md`).

**O-7 · Slug des Verfahrensartikels – ERLEDIGT 19.10.2026 (PR #1): jetzt `/mpu-verfahren/`, ohne Weiterleitung, da nie produktiv live.** Ursprünglicher Befund:
`/mpu-ablauf/` kollidiert im Slug mit `mpudeincoach.de/mpu-ablauf`. Vorschlag: Umbenennen in `/mpu-verfahren/`, **bevor** die Seite live ist (dann ohne Weiterleitungskosten). Ja/Nein genügt.

**O-8 · Ellwangen und die Altdomain `mpu-deincoach.de`**
Die Altdomain antwortet überall mit `423 Locked`. Entscheide: (a) den Hosting-Vertrag klären und die Domain als Alias auf Netlify setzen, dann greifen die 18 Weiterleitungen und 10× 410; oder (b) die Altdomain aufgeben. Für Ellwangen werden Traffic- und Backlinkdaten gebraucht (`06-ellwangen-evidence-request.md`). Bis dahin liefert die Route einen echten 404.

## Betrieb und Zugänge (P2)

**O-9 · Notion-Zugriff** – Der Notion-Connector ist nicht autorisiert. Ohne Zugriff kann ich den Status der 24 „Skript“-Einträge nicht prüfen. Freischalten über die claude.ai-Connector-Einstellungen.

**O-10 · Google Search Console** – Für die Domain-Entscheidungen (O-4, O-8) und die Erfolgsmessung: GSC-Zugang (kostenlos) oder ein Export der Leistungsdaten von `mpudeincoach.de`. Für `mpudeincoach-wissen.de` existiert laut DNS-TXT bereits eine bestätigte Property. Sie ist nutzbar für O-1 (Entfernen) und den Launch (Sitemap).

**O-11 · CRM: Offsite-Restore-Test** – Der Backup-Status meldet „noch kein Offsite-Restore-Test im Log“. Den Offsite-Restore-Test laut CRM-Runbook (`deploy/production/README.md`, Schritt 9) einmal ausführen; er ändert keine Produktivdaten. Ich habe ihn nicht gestartet.

**O-12 · CRM: Staging-Instanz** – Die CRM-Staging-Instanz und ihre Datenbank laufen noch neben Production. Laut Runbook nach der Production-Verifikation stoppen; die Datenbank erst nach Cutover-Plan §18 löschen.

**O-13 · CRM: Versandmodus bestätigen** – Das Lesen der Env-Dateien (z. B. `COMMUNICATION_SEND_MODE`) wurde in dieser Sitzung vom Berechtigungssystem abgelehnt. Bitte selbst bestätigen, dass die Werte dem dokumentierten Stand entsprechen.

## Spätere Kosten (nur zur Kenntnis, nichts beauftragt)

- Netlify Free reicht für das statische Portal. Passwortschutz für Staging ist erst in einem bezahlten Netlify-Plan verfügbar; Staging ist deshalb per noindex gesperrt, aber nicht privat.
- Externe Fachreviewer (Verkehrspsychologie, Toxikologie, Recht) sind voraussichtlich kostenpflichtig, Höhe unbekannt.
- Juristische Prüfung der Rechtstexte: voraussichtlich kostenpflichtig.
- Domain `mpu-deincoach.de`: laufende Registrar-/Hostingkosten, falls weitergeführt.

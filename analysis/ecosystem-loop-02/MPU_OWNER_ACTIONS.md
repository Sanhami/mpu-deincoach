# Owner Actions – nur Entscheidungen und Freigaben, die du treffen musst

Stand: 19.10.2026. Sortiert nach Dringlichkeit. Alles, was ohne dich technisch möglich war, ist erledigt oder liegt im Release-Candidate-PR.

## Sofort (P0)

**O-1 · Produktionsdomain `mpudeincoach-wissen.de` absichern**
Befund: Die Domain zeigt auf ein Lovable-Projekt (IP `185.158.133.1`) mit einem alten Build. Die Startseite ist `index,follow`, `/impressum` und alle Unterseiten liefern 404, die Sitemap listet nur 404-URLs.
Entscheidung, eine Option wählen:
- **A (empfohlen, sofort, kostenlos):** Im Lovable-Projekt die Custom Domain entfernen bzw. „Unpublish“. Die Domain liefert dann nichts mehr aus, bis Netlify übernimmt.
- **B:** Die Domain jetzt schon auf Netlify zeigen lassen (IONOS-DNS), mit dem bestehenden globalen noindex. Setzt voraus, dass das Netlify-Projekt die Domain bekommt. Das Noindex bleibt aktiv, bis du O-3 freigibst.

Ich habe weder Lovable noch DNS angefasst (keine Berechtigung, Domain/DNS ist Inhabersache).

## Vor dem Launch (P1)

**O-2 · Rechtstexte freigeben**
Impressum und Datenschutz liegen als Entwurf vor (`analysis/human-approval/10-draft-impressum.md`, `12-draft-datenschutz.md`). Erforderlich: juristische Freigabe, AGB-Anwendbarkeit protokollieren (technisch nicht nötig: kein Verkauf, keine Konten auf dieser Domain), Netlify-AVV prüfen.

**O-3 · Produktions-Release freigeben**
Erst nach O-1 und O-2: PR `claude/wissen-rc-2026-10` mergen, Produktionsdomain an Netlify, globalen `X-Robots-Tag: noindex, nofollow` aus `public/_headers` **nur für die Produktion** entfernen. Ich habe nichts davon ausgeführt.

**O-4 · Wem gehört „MPU-Begutachtungsstelle wählen“?**
Beide Domains haben eine indexierbare Seite mit fast gleichem Titel (`mpudeincoach.de/mpu-begutachtungsstelle` und `…-wissen.de/mpu-begutachtungsstelle/`).
- **A (empfohlen):** Das Portal ist primär (neutral, FeV-belegt, fachlich freigegeben). Die Hauptseite wird auf „Vorbereitung passend zur Begutachtungsstelle“ umgestellt und verlinkt das Portal.
- **B:** Die Hauptseite bleibt primär, der Portal-Artikel wird `APPROVED_NOINDEX`.
Am besten mit Search-Console-Daten der Hauptseite entscheiden (Impressionen und Klicks dieser URL).

**O-5 · Öffentliche Aussage „namentliche Fachprüfung“ – ERLEDIGT 19.10.2026 (Variante B, PR #1)**
Startseite und Ratgeber-Intro sagen jetzt „dokumentierte Fachprüfung/Fachfreigabe“. Die Redaktionsseite bleibt unverändert, ihr Satz „keine namentliche Fachfreigabe“ ist sachlich korrekt. Ursprünglicher Befund:
Die Startseite sagt, Risikoinhalte würden erst nach *namentlicher* Fachprüfung freigegeben. Die beiden freigegebenen Artikel nennen aber keinen Reviewer (`reviewer: null`).
- **A:** Den Reviewer mit dessen Einverständnis, Qualifikation und Prüfdatum nennen. Ich trage ihn ein.
- **B:** Den Satz anpassen, z. B. „nach dokumentierter Fachprüfung“.
Ich habe weder einen Namen erfunden noch die Aussage eigenmächtig geändert.

## Fachlich (P1/P2)

**O-6 · Fachreview der 4 gesperrten Artikel und 8 FAQ**
Kosten, Alkohol, Drogen, Abstinenznachweis. Reviewer-Profile und Prüfpakete liegen in `analysis/human-approval/02-…` und `03-…`. Zusätzlich nötig: die **aktuelle Fassung der Begutachtungsleitlinien vom 12.12.2025** als Quelle (`05-current-source-gap.md`).

**O-7 · Slug des Verfahrensartikels – ERLEDIGT 19.10.2026 (PR #1): jetzt `/mpu-verfahren/`, ohne Weiterleitung, da nie produktiv live.** Ursprünglicher Befund:
`/mpu-ablauf/` kollidiert im Slug mit `mpudeincoach.de/mpu-ablauf`. Vorschlag: Umbenennen in `/mpu-verfahren/`, **bevor** die Seite live ist (dann ohne Weiterleitungskosten). Ja/Nein genügt.

**O-8 · Ellwangen und die Altdomain `mpu-deincoach.de`**
Die Altdomain antwortet überall mit `423 Locked`. Entscheide: (a) den Hosting-Vertrag klären und die Domain als Alias auf Netlify setzen, dann greifen die 18 Weiterleitungen und 10× 410; oder (b) die Altdomain aufgeben. Für Ellwangen werden Traffic- und Backlinkdaten gebraucht (`06-ellwangen-evidence-request.md`). Bis dahin liefert die Route einen echten 404.

## Betrieb und Zugänge (P2)

**O-9 · Notion-Zugriff** – Der Notion-Connector ist nicht autorisiert. Ohne Zugriff kann ich den Status der 24 „Skript“-Einträge nicht prüfen. Freischalten über die claude.ai-Connector-Einstellungen.

**O-10 · Google Search Console** – Für die Domain-Entscheidungen (O-4, O-8) und die Erfolgsmessung: GSC-Zugang (kostenlos) oder ein Export der Leistungsdaten von `mpudeincoach.de`.

**O-11 · CRM: Offsite-Restore-Test** – Der Backup-Status meldet „noch kein Offsite-Restore-Test im Log“. Den Offsite-Restore-Test laut CRM-Runbook (`deploy/production/README.md`, Schritt 9) einmal ausführen; er ändert keine Produktivdaten. Ich habe ihn nicht gestartet.

**O-12 · CRM: Staging-Instanz** – Die CRM-Staging-Instanz und ihre Datenbank laufen noch neben Production. Laut Runbook nach der Production-Verifikation stoppen; die Datenbank erst nach Cutover-Plan §18 löschen.

**O-13 · CRM: Versandmodus bestätigen** – Das Lesen der Env-Dateien (z. B. `COMMUNICATION_SEND_MODE`) wurde in dieser Sitzung vom Berechtigungssystem abgelehnt. Bitte selbst bestätigen, dass die Werte dem dokumentierten Stand entsprechen.

## Spätere Kosten (nur zur Kenntnis, nichts beauftragt)

- Netlify Free reicht für das statische Portal. Passwortschutz für Staging ist erst in einem bezahlten Netlify-Plan verfügbar; Staging ist deshalb per noindex gesperrt, aber nicht privat.
- Externe Fachreviewer (Verkehrspsychologie, Toxikologie, Recht) sind voraussichtlich kostenpflichtig, Höhe unbekannt.
- Juristische Prüfung der Rechtstexte: voraussichtlich kostenpflichtig.
- Domain `mpu-deincoach.de`: laufende Registrar-/Hostingkosten, falls weitergeführt.

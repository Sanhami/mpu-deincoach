# Rechtstexte – Freigabeprüfung `mpudeincoach-wissen.de`

Stand: 20.10.2026. Vorbereitung für die juristische Prüfung. **Dieses Dokument trifft keine rechtlichen Schlussfolgerungen und erteilt keine Freigabe.** Bis zur Freigabe bleiben `/impressum/`, `/datenschutz/` und `/agb/` Platzhalter mit `noindex`.

Entwürfe: `analysis/human-approval/10-draft-impressum.md`, `12-draft-datenschutz.md` (überarbeitet 20.10.2026: Domain korrigiert, offene Punkte als `[OFFEN …]` markiert).
Faktenbasis: `13-netlify-privacy-facts.md`, `14-github-privacy-role.md`, `15-processing-inventory.md`, `16-legal-release-matrix.md`, `09-agb-assessment.md`.

## 1. Korrigiert

| Datei | Vorher | Jetzt |
| --- | --- | --- |
| `10-draft-impressum.md` (Domainzuordnung) | `mpu-deincoach.de` ist das Wissensportal | `mpudeincoach-wissen.de` |
| `12-draft-datenschutz.md` § 2 | `mpu-deincoach.de` | `mpudeincoach-wissen.de` |
| `12-draft-datenschutz.md` § 11 | Ressourcen „von derselben Netlify-Domain“ | „von derselben Domain, über die die Website ausgeliefert wird“ |
| `11-brand-architecture-decision.md` | nennt `mpu-deincoach.de` als Wissensdomain | Nachtrag mit dem aktuellen Inhaberauftrag; die Originalentscheidung bleibt unverändert lesbar |

Weitere historische Berichte (`release-readiness/`, `staging-validation/`, `editorial-approval/`) nennen die alte Domain. Sie wurden als Zeitdokumente **nicht** umgeschrieben.

## 2. Prüfliste Impressum

| # | Punkt | Stand im Entwurf | Offen bei | Status |
| --- | --- | --- | --- | --- |
| I-1 | Name, Rechtsform (Einzelunternehmen), ladungsfähige Anschrift | vorhanden (Inhaberangabe 03.09.2026) | Rechtsprüfung: Vollständigkeit | offen |
| I-2 | Schnelle elektronische Kontaktaufnahme (Telefon, 2 E-Mail-Adressen der Hauptdomain) | vorhanden | Inhaber: gewollt? Rechtsprüfung: ausreichend? | `[OFFEN]` |
| I-3 | USt-IdNr. / Wirtschafts-ID | keine vorhanden (Inhaberangabe), nichts erfunden | Rechtsprüfung: Hinweis nötig? | offen |
| I-4 | Register | kein Eintrag (Inhaberangabe) | – | ok, bestätigen |
| I-5 | Verantwortlicher für journalistisch-redaktionelle Inhalte | Abschnitt vorhanden | Rechtsprüfung: Anwendbarkeit und Wortlaut | `[OFFEN]` |
| I-6 | Verbraucherstreitbeilegung | nicht enthalten | Rechtsprüfung: erforderlich oder entbehrlich (keine Verbraucherverträge auf dieser Domain)? | `[OFFEN]` |
| I-7 | Berufsrechtliche Angaben / Aufsicht | nicht enthalten | Rechtsprüfung: keine reglementierte Tätigkeit bestätigen | `[OFFEN]` |
| I-8 | Erwähnung der Altdomain `mpu-deincoach.de` | nicht enthalten | Inhaber, abhängig von O-8 | `[OFFEN]` |
| I-9 | Freigabevermerk (Prüfer, Datum, Version/Commit) | `MISSING` | Rechtsprüfung | offen |

## 3. Prüfliste Datenschutzerklärung

| # | Punkt | Stand im Entwurf | Offen bei | Status |
| --- | --- | --- | --- | --- |
| D-1 | Verantwortlicher | vorhanden | Rechtsprüfung | offen |
| D-2 | Zweck/Architektur, Domain | korrigiert | – | ok |
| D-3 | Hosting Netlify: Datenkategorien | beschrieben | – | ok, bestätigen |
| D-4 | Netlify: Rechtsgrundlage | Kandidat Art. 6 Abs. 1 lit. f | Rechtsprüfung | `[REQUIRED]` |
| D-5 | Netlify: Speicherdauer Besucher-/Sicherheitslogs | unbekannt | Inhaber (Netlify-Konto/Support) + Rechtsprüfung | `[REQUIRED]` |
| D-6 | Netlify: Vertragspartner und Anschrift aktuell? | Anschrift aus Recherche 09/2026 | Inhaber (aktuelle DPA) | `[OFFEN]` |
| D-7 | Netlify: AVV/DPA-Anwendbarkeit, Unterauftragnehmer, Drittland (DPF/SCC) | Fakten gesammelt | Inhaber + Rechtsprüfung | `[REQUIRED]` |
| D-8 | Bei einer zweiten Netlify-Site für Produktion (Runbook § 4): gleiches Konto, gleiche DPA? | neu | Inhaber | `[OFFEN]` |
| D-9 | E-Mail-Kontakt über IONOS: Rechtsgrundlage, Löschfrist, Vertrag | offen | Inhaber + Rechtsprüfung | `[REQUIRED]` |
| D-10 | Domain und DNS bei IONOS: Erwähnung nötig? | neu markiert | Rechtsprüfung | `[OFFEN]` |
| D-11 | Lokale Suche, `q`-Parameter in der URL | beschrieben | – | ok, bestätigen |
| D-12 | Externe Links, Referrer-Policy | beschrieben | – | ok, bestätigen |
| D-13 | Keine Cookies, kein Storage, kein Tracking | beschrieben; technisch belegt (keine Cookies, kein Storage, keine Tracker) | – | ok, bestätigen |
| D-14 | GitHub (nur Entwicklungsinfrastruktur): nennen? | offen | Rechtsprüfung | `[REQUIRED]` |
| D-15 | Betroffenenrechte, Beschwerderecht, zuständige Aufsichtsbehörde | teilweise | Rechtsprüfung | `[REQUIRED]` |
| D-16 | Datenschutzbeauftragter, automatisierte Entscheidungen, Bereitstellungspflicht, allgemeine Speicherdauer | neu markiert | Rechtsprüfung | `[OFFEN]` |
| D-17 | Search Console: keine Datenverarbeitung bei Besuchern (nur DNS-Verifikation) | nicht erwähnt | Rechtsprüfung: Erwähnung entbehrlich? | offen |
| D-18 | Vorbedingung: Domain nicht mehr über Lovable ausgeliefert (sonst § 3 unzutreffend) | neu markiert | O-1 | `[OFFEN]` |
| D-19 | Freigabevermerk | `MISSING` | Rechtsprüfung | offen |

## 4. AGB

Technisch nicht angezeigt: kein Verkauf, keine Buchung, keine Konten auf dieser Domain (`09-agb-assessment.md`). Benötigt wird nur eine **protokollierte** Entscheidung (Inhaber/Rechtsprüfung), dass keine AGB veröffentlicht werden. `/agb/` bleibt bis dahin Platzhalter mit noindex.

## 5. Ablauf der Freigabe

1. Inhaber liefert die Provider-Fakten D-5 bis D-9 aus Netlify- und IONOS-Konto (keine Kosten).
2. Rechtsprüfung bearbeitet alle `[OFFEN]`/`[REQUIRED]`-Punkte am **exakten Entwurfsstand** (Commit notieren).
3. Freigabevermerk in beiden Entwürfen: Prüfer, Datum, Commit.
4. Erst danach: Platzhalter durch die freigegebenen Texte ersetzen (Code-Änderung mit Test). Die Rechtsseiten bleiben erreichbar; ob sie indexiert werden, wird gesondert entschieden.
5. Vorbedingung für die Veröffentlichung: O-1 abgeschlossen (D-18).

## 6. Hinweis zu Kosten

Eine externe juristische Prüfung ist voraussichtlich kostenpflichtig. Es wurde nichts beauftragt.

# MPU Content Map – Themencluster, URL-Zuordnung, Cross-Domain-Abgrenzung

Stand: 19.10.2026

**Datenbasis:** Live-Crawl der 48 Sitemap-URLs von `mpudeincoach.de`, Code des Wissensportals, Content-OS-Backlog in `mpudeincoach-agent-os/outputs/content/` sowie `SEO_CLUSTER_PLAN_P1_P2.md`.
**Fehlende Datenbasis:** Google Search Console, Suchvolumina und Rankings waren nicht zugänglich. Alle Suchintentionen unten sind **Hypothesen aus Titel, Inhalt und Seitenrolle**, keine gemessenen Daten.

## 1. Grundregel

| Domain | Aufgabe | Primär für |
| --- | --- | --- |
| `mpudeincoach.de` | Beratung, Vorbereitung, Vertrauen, Fallanalyse, Guides, Angebote | transaktionale, kommerzielle und fallbezogene Absichten („Vorbereitung“, „Kosten der Vorbereitung“, Orte, „was tun bei …“) |
| `mpudeincoach-wissen.de` | neutrale, quellenbelegte Antworten | institutionelle, rechtlich-verfahrensbezogene und begriffliche Absichten („Wer macht was?“, „Was regelt die FeV?“, „Was bedeutet …?“) |

Ist-Stand: Die Hauptseite deckt mit 48 indexierbaren URLs bereits fast alle informationsorientierten Absichten ab (Alkohol, Cannabis, CTU, Leberwerte, Promille, Hypothesen A1–A3, Gutachten, Begutachtungsstelle). Das Wissensportal hat 6 Artikel, 2 davon indexierbar. **Würde das Portal unverändert live gehen, konkurrieren 2 indexierbare Seiten direkt mit der Hauptseite; nach weiteren Freigaben wären es bis zu 6.**

Keine flächendeckenden Cross-Domain-Canonicals oder Weiterleitungen. Jede Seite behält ihre Self-Canonical. Die Abgrenzung erfolgt über Intent, Titel, Inhalt und gezielte Querverlinkung.

## 2. URL-Matrix nach Suchabsicht

Legende: **P** = primäre Antwort, **S** = unterstützend, – = kein Inhalt. Risiko = Kannibalisierung, falls beide indexierbar sind.

| # | Suchabsicht (Hypothese) | Hauptseite | Wissensportal | Primär | Risiko | Empfehlung |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | MPU-Vorbereitung buchen / Angebote | `/mpu-vorbereitung`, `/angebote`, `/angebote/*` | – | Haupt | – | unverändert |
| 2 | MPU-Beratung/Vorbereitung vor Ort (Schwäbisch Hall, Crailsheim, Heilbronn, Region, online) | `/mpu-vorbereitung-schwaebisch-hall` usw. | – (Altpfade 301 → Haupt) | Haupt | – | unverändert |
| 3 | Kostenlose Fallanalyse | `/fallanalyse`, `/#fallanalyse` | CTA-Ziel | Haupt | – | unverändert |
| 4 | **MPU-Begutachtungsstelle wählen / Rolle der BfF** | `/mpu-begutachtungsstelle` (indexierbar, „… 2026: TÜV, DEKRA & Co.“) | `/mpu-begutachtungsstelle/` (`APPROVED_PUBLIC`, indexierbar) | **offen** | **hoch**: gleicher Slug, gleicher Titelkern | **Inhaberentscheidung O-4.** Empfehlung: Portal wird primär (neutral, FeV-belegt). Die Hauptseite fokussiert sich auf „Vorbereitung passend zur Begutachtungsstelle“ und verlinkt das Portal. Alternativ bleibt die Hauptseite primär und der Portal-Artikel wird `APPROVED_NOINDEX`. |
| 5 | MPU-Ablauf (Schritte) | `/mpu-ablauf` („Alle Schritte bis zur Neuerteilung“) | `/mpu-ablauf/` („MPU-Verfahren: Rollen und Aktenfluss“) | Haupt für „Ablauf“, Portal für „Verfahren/Rollen/Akte“ | **mittel**: gleicher Slug | **Inhaberentscheidung O-5.** Empfehlung: Portal-Slug vor dem Launch auf `/mpu-verfahren/` ändern. Das ist kostenlos möglich, solange die URL nicht live ist. |
| 6 | MPU-Kosten | `/mpu/kosten` (P), `/abstinenznachweis-kosten` | `/mpu-kosten/` (noindex, Fachreview) | Haupt | niedrig, solange noindex | Portal bleibt bei der Kostensystematik ohne Beträge und verlinkt `/mpu/kosten` |
| 7 | Alkohol-MPU allgemein | `/mpu-wegen-alkohol` (P) + 6 Unterseiten | `/alkohol-mpu/` (noindex) | Haupt | mittel nach Freigabe | Portal als Begriffs- und Hypothesen-Landkarte (A1–A7 erklärt, Quellenlage) ohne Vorbereitungstipps |
| 8 | Was prüft der Gutachter? / Gutachtergespräch | `/ratgeber/mpu-wegen-alkohol-gutachter-kriterien`, `/mpu-simulation`, `/mpu-gutachten` | Pillar „Gutachten & Gespräch“ (in Prüfung, keine Seite) | Haupt (Vorbereitung); Portal (Rahmen: PUG nach BK5 C1, Anlage 4a) | mittel | Portal-Artikel nur zum **Rahmen** des Gesprächs, keine Musterantworten |
| 9 | Drogen-MPU | `/mpu-wegen-drogen` (P) | `/drogen-mpu/` (noindex) | Haupt | mittel nach Freigabe | Portal: §§ 13a/14 FeV-Abgrenzung, D1–D5-Logik |
| 10 | Cannabis-MPU | `/mpu-vorbereitung-cannabis`, `/mpu-cannabis-thc-werte`, `/mpu-cannabis-trennvermoegen`, `/mpu-cannabisgesetz`, `/mpu-abstinenznachweis-cannabis`, Ratgeber | Pillar „Cannabis“ (in Prüfung) | Haupt | – | Portal ergänzt Cannabis vorerst nicht; die Hauptseite deckt es ab |
| 11 | Abstinenznachweis | `/mpu-abstinenznachweis` (P), `-alkohol`, `-cannabis`, `/mpu-ohne-abstinenznachweis` | `/abstinenznachweis/` (noindex) | Haupt | mittel nach Freigabe | Portal: CTU-Qualitätskriterien und Nachweiskette (BK5 C3), keine Dauer- oder Methodenempfehlung |
| 12 | Wie funktionieren Abstinenznachweise technisch? (CTU-Kriterien) | verteilt | `/abstinenznachweis/` | Portal | – | siehe 11 |
| 13 | Punkte-MPU | `/mpu-wegen-punkten` | – | Haupt | – | Portal-Lücke: V1–V3 (BK5) als neutraler Rahmen, nur nach Fachreview |
| 14 | Straftaten-MPU | `/mpu-wegen-straftat` | – | Haupt | – | Portal-Lücke: Anlassgruppe B6/§ 11 Abs. 3 FeV, nur nach Fachreview |
| 15 | Negatives Gutachten | `/mpu-nicht-bestanden`, `/angebote/mpu-nachbereitung` | – | Haupt | – | Portal: „Was das Gutachten rechtlich ist“, verfahrensbezogen, Legal Review |
| 16 | Sperrfrist / Neuerteilung / Behördenablauf / Akteneinsicht | in `/mpu-ablauf` erwähnt | Pillar „Behörden“ (in Prüfung) | **Portal** | – | **Größte echte Portal-Lücke.** Auf der Hauptseite nicht als eigene Seite vorhanden. Rechtlich reviewpflichtig. |
| 17 | Begriffe (BfF, CTU, Fragestellung, Anlassbezogenheit …) | – | `/glossar/` | Portal | – | Glossar ausbauen, keine dünnen Einzelseiten |
| 18 | Allgemeine MPU-Fragen | `/mpu-fragen` (Hintergründe statt Antworten lernen) | `/faq/` (6 Fragen) | geteilt nach Frage | niedrig | Zuständigkeit pro Frage festhalten (`06-intent-overlap-resolution.md`) |
| 19 | Leberwerte, Promille, Hypothesen A1–A3, kontrolliertes Trinken | eigene Seiten | – | Haupt | – | keine Portal-Duplikate |

## 3. Verlinkung zwischen den Domains

- **Portal → Hauptseite:** genau eine kontextuelle Brücke je Artikel (`ArticleCTA`, Governance), dazu je ein Link im Footer und am Ende der Startseite. Alle Ziele antworten direkt mit 200 (`npm run links:external`, 16 Ziele geprüft).
- **Hauptseite → Portal:** derzeit **keine** Links (geprüft per Grep im Repo `mpu-lichtblick`). Richtig so, solange die Portal-Domain den unvollständigen Lovable-Stand ausliefert. Nach dem Launch: auf den Themenseiten 4, 5, 11, 16 je ein Kontextlink „Ausführlich im MPUdeincoach Wissensbereich nachlesen“ (Wortlaut aus der Markenentscheidung), kein Linkblock im Footer auf allen Seiten.
- **Schema:** Die Portal-Organisation verweist jetzt per `parentOrganization` auf `https://mpudeincoach.de/#organization`, damit beide Domains als eine Marke erkennbar sind (Markenentscheidung `11-brand-architecture-decision.md`).

## 4. Artikel-Zuordnung (Wissensportal)

| Artikel | Primäre Nutzerfrage | Suchintention | Zielgruppe | Quellen | Aktualität | Reviewpflicht | Kanonisch | Parent | Interne Links | Index |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MPU-Verfahren | Wer macht im MPU-Verfahren was, und wie läuft die Akte? | informativ/institutionell | Betroffene vor Beauftragung | § 11 FeV, Anlage 4a, BK5 Grundlagen | Links geprüft 02.09.2026 | Fach + Recht: abgeschlossen (Experten-Handoff, ohne öffentlichen Reviewernamen) | `/mpu-ablauf/` (Slug-Änderung empfohlen) | `/wissen/` | Begutachtungsstelle, Abstinenznachweis, FAQ | **index** |
| MPU-Begutachtungsstelle wählen | Wie wähle ich eine BfF, was passiert mit der Akte? | informativ | Betroffene mit Anordnung | §§ 11, 66 FeV, Anlagen 4a/14, BK5 | 02.09.2026 | abgeschlossen (wie oben) | `/mpu-begutachtungsstelle/` | `/wissen/` | Ablauf, FAQ, Kosten | **index** (Konflikt #4) |
| MPU-Kosten | Aus welchen Blöcken bestehen MPU-Kosten? | informativ | Planungsphase | § 11 FeV, Anlage 4a, BK5 | aktuelle Preisquelle fehlt | Fach + Recht + Quelle offen | `/mpu-kosten/` | `/wissen/` | Ablauf, Nachweis, Stelle | noindex |
| Alkohol-MPU | Worum geht es fachlich bei einer Alkohol-MPU? | informativ | Anlass Alkohol | BK5 A1–A7, C3, Anlage 4a, BASt 2022 (historisch) | aktuelle Leitlinie 2025 fehlt | Fachreview offen | `/alkohol-mpu/` | `/wissen/` | Nachweis, Ablauf, FAQ | noindex |
| Drogen-MPU | Was unterscheidet Drogen-Fragestellungen? | informativ | Anlass Drogen | §§ 13a, 14 FeV, Anlage 4a, BK5 D1–D5, C3 | Cannabis-Rechtslage prüfen | Fach + Recht offen | `/drogen-mpu/` | `/wissen/` | Nachweis, Ablauf, FAQ | noindex |
| Abstinenznachweis | Was macht einen Beleg formal verwertbar? | informativ | vor Programmstart | BK5 C3, Anlage 4a | – | CTU-Fachreview offen | `/abstinenznachweis/` | `/wissen/` | Alkohol, Drogen, Ablauf | noindex |

## 5. Neue Themen (nur Briefings, keine veröffentlichten Texte)

Für neue Portal-Artikel wurden bewusst **keine Fachtexte** geschrieben. Begründung: Ohne Fachreviewer und ohne die aktuelle Leitlinienfassung würden neue Seiten zwar `noindex` bleiben, wären aber öffentlich erreichbar, so wie heute die vier gesperrten Artikel. Briefings in Prioritätsreihenfolge (Governance-Regel „Neuanlage“ 1–7):

| Prio | Arbeitstitel | Nutzerfrage | Primärquelle (Fachbibliothek) | Review | Warum Portal statt Hauptseite |
| --- | --- | --- | --- | --- | --- |
| 1 | Fahrerlaubnisbehörde, Fragestellung und Akteneinsicht | Was steht in meiner Anordnung, und was darf die Behörde verlangen? | § 11 Abs. 6 FeV, BK5 Grundlagen/H0 | Legal | auf der Hauptseite nicht als eigene Seite vorhanden |
| 2 | Sperrfrist und Neuerteilung – Verfahren | Wann und wie beantrage ich die Neuerteilung? | FeV §§ 20, 11; StGB § 69a (Primärquelle prüfen) | Legal | institutionell, nicht kommerziell |
| 3 | Beurteilungskriterien und Begutachtungsleitlinien – was ist was? | Woran messen Gutachter? | BK5 Grundlagen, Anlage 4a, Leitlinie 2025 (fehlt) | Fach | Quellenkompetenz des Portals |
| 4 | Das psychologische Untersuchungsgespräch – Rahmen | Was ist das PUG, und was regelt es? | BK5 C1 (`BK5_07_C1_…PUG.pdf`) | Fach | Rahmen statt Training |
| 5 | Verkehrsverstöße/Punkte – Hypothesen V1–V3 | Wie wird eine Punkte-MPU fachlich eingeordnet? | `BK5_Verkehrsverstoesse_V1_V2_V3.pdf` | Fach | ergänzt `/mpu-wegen-punkten` neutral |

## 6. Content-System und Produktionsplan (Phase 6)

**Notion:** Der Notion-Connector ist in dieser Umgebung nicht autorisiert. Die früheren 24 Einträge im Status „Skript“ wurden **nicht** geprüft, kein Status wurde geändert. Verifikation erst nach Freigabe des Zugriffs (`MPU_OWNER_ACTIONS.md`, O-9).

**Vorhandenes, geprüftes System:** Content OS im Repo `mpudeincoach-agent-os`:
- `outputs/content/backlog.json`: 11 Themen, Stand 30.09.2026
- `outputs/content/calendar.json`: 7 Einträge, geplant 05.–09.10.2026, alle Status `geplant`; 6 davon `NEEDS_REVIEW`, 1 `VERIFIED`

Ob diese Termine produziert oder veröffentlicht wurden, lässt sich aus dem Repo nicht belegen. Der Kalender wurde daher nicht verändert.

### Produktionskette (eine Quelle, viele Formate)

```
Fachbaustein (agent-os/knowledge/fachbibliothek, BK5-Kapitel)
  → Fachprüfung (mpu-fachpruefung, Claim-Matrix)
  → kanonischer Text auf GENAU EINER Domain (Matrix §2)
  → Kurzvideo-Skript → Carousel → Social-Post (nur Aussagen aus dem geprüften Text)
  → Veröffentlichung nach Freigabe (manuell)
  → interner Link vom Social-Profil/Linkbaum auf die kanonische URL
  → Messung: GSC-Klicks auf die kanonische URL, Fallanalyse-Eingänge mit Quelle (CRM)
```

Regel gegen widersprüchliche Aussagen: Social-Formate dürfen nur Sätze verwenden, die im freigegebenen kanonischen Text stehen. Neue Zahlen (Promille, Fristen, Dauern) erst nach Claim-Prüfung.

### Zuordnung des bestehenden Backlogs

| Backlog-ID | Thema | Kanonische URL (vorhanden) | Domain | Fachstatus | Nächster Schritt |
| --- | --- | --- | --- | --- | --- |
| BL-ALK-ABST | Abstinenznachweis Alkohol | `/mpu-abstinenznachweis-alkohol` | Haupt | VERIFIED (Kalender) | Reel aus der bestehenden Seite schneiden, auf die URL verlinken |
| BL-ALK-FEHLER | Typische Fehler Alkohol-MPU | – (Leadmagnet „7 Fehler“) | Haupt | NEEDS_REVIEW | Fachprüfung, dann Artikel auf der Hauptseite |
| BL-ALK-FRAGEN | Gutachterfragen Alkohol | `/ratgeber/mpu-wegen-alkohol-gutachter-kriterien` | Haupt | NEEDS_REVIEW | Carousel aus der vorhandenen Seite, keine neuen Aussagen |
| BL-CHECKLISTE | Checkliste vor der MPU | Guide (Leadmagnet) | Haupt | NEEDS_REVIEW | Short-Video → Guide-CTA |
| BL-MPU-ABLAUF | So läuft die MPU ab | `/mpu-ablauf` (Haupt) + `/mpu-ablauf/` (Portal, Rollen) | geteilt | NEEDS_REVIEW | Newsletter verlinkt die Hauptseite; Portal nur für „Rollen/Akte“ |
| BL-MPU-VORB | Wann mit der Vorbereitung anfangen | `/mpu-vorbereitung` | Haupt | NEEDS_REVIEW | Reel → `/fallanalyse` |
| BL-ALK-KT | Kontrolliertes Trinken | `/kontrolliertes-trinken-mpu` | Haupt | NEEDS_REVIEW | FAQ-Ergänzung auf der bestehenden Seite |
| BL-MPU-KOSTEN | Was kostet eine MPU | `/mpu/kosten` | Haupt | – | keine Portal-Duplikate |
| BL-CAN-RECHT | Cannabis/KCanG | `/mpu-cannabisgesetz` | Haupt | Rechtsprüfung | Aktualität der Rechtslage prüfen |
| BL-MYTHEN | MPU-Mythen | – | Haupt | – | aus geprüften FAQ beider Domains zusammenstellen |
| BL-CTU-PETH-210 | PEth-Grenzwert | – | **Portal** (CTU-Qualität) oder Hauptseite `/mpu-abstinenznachweis-alkohol` | Konflikt im `CONFLICT_REGISTER` | erst Konflikt fachlich auflösen |

Kein Beitrag wird automatisch veröffentlicht. Alle Social-Posts bleiben Entwürfe bis zur manuellen Freigabe.

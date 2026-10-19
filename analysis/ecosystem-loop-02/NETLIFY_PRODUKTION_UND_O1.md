# O-1 und Netlify-Produktionsverknüpfung – Runbook

Stand: 19.10.2026. **Alle Schritte führt der Inhaber aus.** Hier wurde nichts an DNS, Lovable oder Netlify-Einstellungen geändert.
Quellen: öffentliche DNS-Abfrage (DNS-over-HTTPS, 19.10.2026), Netlify-Doku „Configure external DNS“, Lovable-Doku „Custom domain“.

## 1. DNS-Ist-Stand `mpudeincoach-wissen.de` (Nameserver IONOS `ui-dns`, kein DNSSEC)

| Name | Typ | Wert | Zweck | Bei O-1 |
| --- | --- | --- | --- | --- |
| `@` | A | `185.158.133.1` | Lovable-Edge | **entfernen** bzw. später ersetzen |
| `www` | A | `185.158.133.1` | Lovable-Edge | **entfernen** bzw. später ersetzen |
| `_lovable` | TXT | `lovable_verify=…` (Apex) | Lovable-Domainnachweis | **entfernen** (nach dem Disconnect) |
| `_lovable.www` | TXT | `lovable_verify=…` (www) | Lovable-Domainnachweis | **entfernen** (nach dem Disconnect) |
| `@` | TXT | `google-site-verification=…` | Search-Console-Property existiert bereits | **behalten** |
| `@` | MX | `mx00.ionos.de`, `mx01.ionos.de` | IONOS-Mail | **behalten** |
| `@` | TXT | `v=spf1 include:_spf-eu.ionos.com ~all` | Mail-SPF | **behalten** |
| `_dmarc` | TXT/CNAME | `v=DMARC1; p=none;` | Mail-DMARC | **behalten** |
| – | AAAA, CAA | keine | – | nichts tun (kein CAA = Let's Encrypt für Netlify erlaubt) |

### Risiko einer verwaisten, übernehmbaren Zuordnung
`185.158.133.1` ist eine **gemeinsam genutzte** Lovable-IP. Wird die Domain in Lovable getrennt, während der A-Record noch dorthin zeigt, zeigt die Domain auf eine Plattform, in der sie keinem Projekt mehr gehört. Lovable verlangt zwar einen projektbezogenen TXT-Nachweis, eine Übernahme ist also ohne DNS-Zugriff nicht offensichtlich möglich. Die internen Prüfregeln von Lovable sind aber nicht öffentlich. Deshalb gilt die Regel: **erst DNS umstellen, dann in Lovable trennen, dann die TXT-Nachweise löschen.** So zeigt die Domain zu keinem Zeitpunkt auf eine Plattform, auf der sie nicht verbunden ist.

## 2. O-1 – empfohlene Variante A: Domain bis zum Launch offline

Begründung: Es gibt noch kein freigegebenes Impressum. Eine erreichbare Website unter der Produktionsdomain ohne Impressum ist ein Rechtsrisiko, auch mit noindex. Variante A schaltet den Webauftritt ab, ohne die Mail zu berühren.

1. **Vorher festhalten:** Screenshot der IONOS-DNS-Tabelle und von Lovable *Project → Settings → Domains* (Rückweg).
2. **IONOS → Domain → DNS:** A-Record `@` (185.158.133.1) löschen, A-Record `www` (185.158.133.1) löschen. MX, SPF, DMARC und `google-site-verification` **nicht** anfassen. Falls IONOS automatisch einen eigenen Standard-A-Record (Parkseite) einsetzt, ist das unkritisch: Er gehört IONOS bzw. deinem Vertrag.
3. **Lovable → Project → Settings → Domains:** bei `mpudeincoach-wissen.de` und `www.mpudeincoach-wissen.de` jeweils „⋯ → Disconnect“. **Kein Unpublish nötig;** das Projekt kann unter seiner `lovable.app`-Adresse bleiben oder separat stillgelegt werden.
4. **IONOS:** TXT `_lovable` und `_lovable.www` löschen.
5. **Prüfen** (nach der TTL, A-Record-TTL derzeit 1 h):
   ```
   curl -s -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=mpudeincoach-wissen.de&type=A'
   curl -sI https://mpudeincoach-wissen.de/
   ```
   Erwartung: kein `185.158.133.1` mehr, keine Lovable-Antwort.
6. **Search Console** (Property existiert laut TXT-Nachweis): unter *Indexierung → Seiten* prüfen, ob `https://mpudeincoach-wissen.de/` indexiert ist; falls ja, *Entfernen → Vorübergehend entfernen*. Das ist kostenlos und schadet dem späteren Launch nicht.

**Rückweg:** A-Records `@`/`www` wieder auf `185.158.133.1`, TXT-Werte aus dem Screenshot, in Lovable neu verbinden.

## 3. Variante B (nur als Alternative): Domain sofort an Netlify, weiter mit noindex

Nur sinnvoll, wenn die Domain keine Ausfallzeit haben darf. Nachteil: Die Seite ist ohne freigegebenes Impressum öffentlich erreichbar. Ablauf: erst die Domain in Netlify hinzufügen (§ 4, Schritt 1), dann die DNS-Werte wie in § 4, Schritt 2, dann Lovable trennen, dann `_lovable`-TXT löschen.

## 4. Netlify-Produktionsverknüpfung (Launch, erst nach O-2 und O-3)

Empfohlenes Modell: **dieselbe Netlify-Site** (`mpu-deincoach-staging`), damit CI, Deploy Previews und Historie erhalten bleiben. Deploy Previews behalten in jedem Fall `noindex`. Netlify setzt dort zusätzlich einen eigenen `X-Robots-Tag: noindex`, auf der Preview von PR #1 beobachtet.

1. **Netlify → Site → Domain management → Add a domain:** `mpudeincoach-wissen.de` als **Primary domain**, `www.mpudeincoach-wissen.de` als Alias. Die Domain vor der DNS-Umstellung in Netlify anlegen; damit ist sie dieser Site zugeordnet.
2. **IONOS-DNS** (IONOS kennt kein ALIAS/ANAME):
   - `@` → **A `75.2.60.5`** (Netlify-Load-Balancer, laut Netlify-Doku der Fallback für Provider ohne ALIAS)
   - `www` → **CNAME `mpu-deincoach-staging.netlify.app`** (vorher den A-Record `www` löschen)
   - MX/SPF/DMARC/Google-TXT unverändert
3. **HTTPS:** Netlify stellt das Let's-Encrypt-Zertifikat automatisch aus, sobald DNS greift (kein CAA vorhanden, also nichts nötig). Unter *HTTPS* abwarten, bis „Certificate active“ angezeigt wird.
4. **Indexierungsschalter (neu in PR #1):** *Site configuration → Environment variables* → `SITE_INDEXING` = `allow`, **nur für den Kontext „Production“**. Ohne diese Variable bleibt `X-Robots-Tag: noindex, nofollow` aktiv. Andere Werte wie `Allow` oder `true` heben die Sperre nicht auf (getestet). Danach den Production-Deploy neu auslösen. **Nicht** in `netlify.toml` eintragen, ein Test verhindert das.
5. `VITE_SITE_URL` ist bereits in `netlify.toml` auf `https://mpudeincoach-wissen.de` gesetzt. Nichts tun.
6. **Hinweis zu Netlify:** Netlify empfiehlt bei externem DNS eine Subdomain als Primary, weil der Apex über den Load Balancer statt über direktes CDN-Routing läuft. Das Portal bleibt trotzdem beim Apex, weil alle Canonicals, die Sitemap und die Markenentscheidung darauf festgelegt sind. Ein Wechsel wäre eine eigene Entscheidung.
7. **GitHub (kostenlos für öffentliche Repos):** Branch-Schutz für `main` mit erforderlichem Check `qa`.

### Abnahme direkt nach dem Launch

| Prüfung | Erwartung |
| --- | --- |
| `curl -sI https://mpudeincoach-wissen.de/` | 200, **kein** `X-Robots-Tag`, gültiges Zertifikat |
| `curl -sI http://mpudeincoach-wissen.de/` und `https://www.…/` | **eine** 301 auf `https://mpudeincoach-wissen.de/` |
| `https://mpu-deincoach-staging.netlify.app/` | 301 auf die Primary Domain (Netlify-Standard) |
| 11 Sitemap-URLs | 200, Self-Canonical, `index,follow` |
| `/mpu-kosten/`, `/impressum/` usw. | 200 mit `noindex` (Impressum erst nach O-2 indexierbar, siehe § 5) |
| unbekannte URL, Ellwangen | 404 |
| 10 Legacy-410-Pfade | 410 |
| `npm run links:external` | alle Ziele 200 |
| Search Console | Sitemap einreichen, Hauptseite verknüpfen |

**Rückweg:** `SITE_INDEXING` löschen und neu deployen (Sperre wieder aktiv), oder die Domain in Netlify entfernen und die DNS-Einträge zurücksetzen.

## 5. Rechtstexte – vollständige Freigabeanforderungen

Grundlage: `analysis/human-approval/10-draft-impressum.md`, `12-draft-datenschutz.md`, `16-legal-release-matrix.md`. Keine dieser Fragen kann technisch entschieden werden.

| # | Anforderung | Stand | Wer |
| --- | --- | --- | --- |
| R1 | **Domain in beiden Entwürfen korrigieren**: Die Entwürfe nennen `mpu-deincoach.de`, das Portal läuft künftig unter `mpudeincoach-wissen.de` | offen (neu gefunden) | Redaktion, dann Rechtsprüfung |
| R2 | Impressum: Anbieterangaben (Einzelunternehmen, Name, ladungsfähige Anschrift, E-Mail, schnelle Kontaktmöglichkeit) | Fakten geliefert, Entwurf vorhanden | juristische Freigabe |
| R3 | Impressum: Verantwortlicher für redaktionelle Inhalte (Entwurf enthält Abschnitt „Redaktionell verantwortlich“) | Entwurf | juristische Freigabe |
| R4 | Datenschutz: Rechtsgrundlage und Speicherdauer der Netlify-Request-/Sicherheitslogs | `[PROVIDER FACT REQUIRED]` im Entwurf | Inhaber (Netlify-Konto) + Rechtsprüfung |
| R5 | Datenschutz: Netlify-AVV/DPA-Anwendbarkeit auf das konkrete Konto, Unterauftragnehmer, Drittlandübermittlung (USA) | offen | Inhaber + Rechtsprüfung |
| R6 | Datenschutz: E-Mail-Kontakt über IONOS (Rechtsgrundlage, Löschfrist, Vertragsdetails) | offen | Inhaber + Rechtsprüfung |
| R7 | Datenschutz: Nennung von GitHub (reine Entwicklungsinfrastruktur) | offen | Rechtsprüfung |
| R8 | Datenschutz: zuständige Aufsichtsbehörde und vollständige Pflichtangaben | offen | Rechtsprüfung |
| R9 | AGB: Anwendbarkeitsentscheidung protokollieren (technisch: kein Verkauf, keine Konten auf dieser Domain → voraussichtlich keine AGB) | offen | Inhaber/Rechtsprüfung |
| R10 | Nach Freigabe: Platzhalterseiten durch die freigegebenen Texte ersetzen; über Indexierbarkeit der Rechtsseiten entscheiden (üblich: `noindex` lassen, aber erreichbar) | Code bereit | Redaktion |

## 6. Fachliche Freigabe vor dem Launch (Belegprüfung vom 19.10.2026)

Die beiden indexierbaren Artikel (`/mpu-verfahren/`, `/mpu-begutachtungsstelle/`) beruhen auf einer **Experten-Entscheidung auf Artikelebene vom 03.09.2026**. Die vom Repo selbst verlangten Nachweise fehlen:
- Prüferformular (`04-review-approval-template.md`) mit Name, Qualifikation, Commit, Datum und Nachweisort
- Nominierung (`02-reviewer-nomination-form.md`)
- eine **rechtliche** Prüfung, obwohl beide Artikel `LEGAL_REVIEW` als Anforderung tragen

Die öffentlichen Texte sind seit PR #1 auf diesen Stand reduziert. Für den Launch muss der Inhaber entweder die Nachweise ergänzen (der Name muss nicht veröffentlicht werden) **oder** beide Artikel vor dem Launch auf `APPROVED_NOINDEX` setzen lassen → `MPU_OWNER_ACTIONS.md` O-14.

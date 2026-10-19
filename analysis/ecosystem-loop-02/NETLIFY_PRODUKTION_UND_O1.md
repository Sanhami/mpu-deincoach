# O-1 und Netlify-Produktionsverknüpfung – Runbook

Stand: 20.10.2026. **Alle Schritte führt der Inhaber aus, DNS-Änderungen und das Trennen in Lovable erst nach gesonderter Freigabe.** Hier wurde nichts an DNS, Lovable oder Netlify-Einstellungen geändert.
Quellen: öffentliche DNS-Abfragen (DNS-over-HTTPS, Cloudflare und Google, zuletzt 19.10.2026 22:01 UTC; autoritative TTL 3600 s), Netlify-Doku „Configure external DNS“ und „Environment variables“, Lovable-Doku „Custom domain“.

## 1. DNS-Ist-Stand `mpudeincoach-wissen.de` (Nameserver IONOS `ui-dns`, kein DNSSEC)

| Name | Typ | Wert | Zweck | Bei O-1 |
| --- | --- | --- | --- | --- |
| `@` | A | `185.158.133.1` | Lovable-Edge (gemeinsame IP) | **entfernen** |
| `www` | A | `185.158.133.1` | Lovable-Edge (gemeinsame IP) | **entfernen** |
| `_lovable` | TXT | `lovable_verify=…` | Lovable-Domainnachweis (Apex) | **entfernen**, nach dem Trennen |
| `_lovable.www` | TXT | `lovable_verify=…` | Lovable-Domainnachweis (www) | **entfernen**, nach dem Trennen |
| `@` | MX | `10 mx00.ionos.de`, `10 mx01.ionos.de` | IONOS-Mail | **behalten** |
| `@` | TXT | `v=spf1 include:_spf-eu.ionos.com ~all` | SPF | **behalten** |
| `_dmarc` | **CNAME** | `dmarc.ionos.de` (liefert `v=DMARC1; p=none;`) | DMARC, von IONOS verwaltet | **behalten** (CNAME, kein eigener TXT) |
| `@` | TXT | `google-site-verification=…` | Search-Console-Property | **behalten** |
| – | AAAA, CAA | keine | – | nichts tun (kein CAA → Let's Encrypt erlaubt) |

### Prüfskript (nur lesend)
`node scripts/ops/dns-o1-check.mjs pre` – **unmittelbar vor** der Änderung: prüft alle Behalten-Einträge und die zu entfernenden Lovable-Einträge über zwei Resolver. Exit 0 = Ausgangslage wie dokumentiert, Exit 1 = **STOPP**.
`node scripts/ops/dns-o1-check.mjs post` – nach der Änderung und erneut nach Ablauf der TTL (1 h): Exit 0 = Lovable-Einträge weg, alle Behalten-Einträge unverändert. Ein FAIL bei einem Behalten-Eintrag ist sofort zu beheben.
Letzter `pre`-Lauf: 19.10.2026 22:01 UTC → **alle 10 Prüfungen OK**.

### Risiko einer verwaisten, übernehmbaren Zuordnung
`185.158.133.1` ist eine gemeinsam genutzte Lovable-IP. Wird die Domain in Lovable getrennt, während der A-Record noch dorthin zeigt, zeigt die Domain auf eine Plattform, in der sie keinem Projekt mehr gehört. Lovable verlangt einen projektbezogenen TXT-Nachweis, deren interne Prüfregeln sind aber nicht öffentlich. Deshalb gilt: **erst die A-Records löschen, dann in Lovable trennen, dann die TXT-Nachweise löschen.** Die TXT-Nachweise bleiben bis zum Trennen bestehen, damit das bestehende Lovable-Projekt bis dahin der Domain zugeordnet bleibt.

## 2. O-1, Variante A (vom Inhaber gewählt): kontrollierte Trennung, Domain bis zum Launch offline

Voraussetzung: gesonderte Freigabe des Inhabers für genau diese Schritte.

1. `node scripts/ops/dns-o1-check.mjs pre` → muss Exit 0 liefern. Bei Exit 1 abbrechen.
2. **Sichern:** Screenshot der IONOS-DNS-Tabelle und von Lovable *Project → Settings → Domains* (Rückweg).
3. **IONOS → Domains & SSL → `mpudeincoach-wissen.de` → DNS:** nur A `@` (185.158.133.1) und A `www` (185.158.133.1) löschen. **Nicht anfassen:** MX, SPF-TXT, `_dmarc`-CNAME, `google-site-verification`-TXT. Falls IONOS automatisch einen eigenen Standard-A-Record (Parkseite) setzt: unkritisch, er gehört zu deinem IONOS-Vertrag. Notieren.
4. **Lovable → Project → Settings → Domains:** `mpudeincoach-wissen.de` und `www.mpudeincoach-wissen.de` jeweils „⋯ → Disconnect“. **Kein Unpublish nötig.**
5. **IONOS:** TXT `_lovable` und `_lovable.www` löschen.
6. `node scripts/ops/dns-o1-check.mjs post` sofort und nach 1 h; zusätzlich `curl -sI https://mpudeincoach-wissen.de/` (keine Lovable-Antwort mehr).
7. **Search Console** (Property existiert): *Indexierung → Seiten* prüfen; ist `https://mpudeincoach-wissen.de/` indexiert → *Entfernen → Vorübergehend entfernen*.

**Rückweg:** A-Records `@`/`www` wieder auf `185.158.133.1`, TXT-Werte aus dem Screenshot, Domains in Lovable neu verbinden.

## 3. Auswirkung einer Produktionsverknüpfung auf das Staging

| Befund | Beleg |
| --- | --- |
| Die Netlify-Site `mpu-deincoach-staging` baut `main` im Kontext **production**. | Netlify setzt auf dem Staging-Host keinen eigenen Noindex-Header; dort gibt es nur unseren eigenen (Messung 19.10.2026). Auf Deploy Previews setzt Netlify zusätzlich `X-Robots-Tag: noindex`. |
| Würde die Produktionsdomain an **diese** Site gehängt, wäre ihr `main`-Deploy die Produktion. Die heutige Staging-Adresse zeigt dann denselben Deploy. | Netlify-Doku: `URL` ist „your own custom domain if you set one“. |
| → Es gäbe **keine unabhängige Staging-Umgebung** mehr. | – |

### Technische Sperre (seit PR #2)
Die Sperre fällt nur, wenn `scripts/indexing-policy.mjs` es erlaubt: `SITE_INDEXING=allow` **und** `CONTEXT=production` **und** `URL=https://mpudeincoach-wissen.de`.

| Umgebung | `CONTEXT` / `URL` | Ergebnis mit `SITE_INDEXING=allow` |
| --- | --- | --- |
| Staging-Site (heute und künftig) | production / `https://mpu-deincoach-staging.netlify.app` | **gesperrt** (getestet) |
| Deploy Preview | deploy-preview | **gesperrt** (getestet) |
| Branch-Deploy | branch-deploy | **gesperrt** (getestet) |
| Produktions-Site mit verbundener Domain | production / `https://mpudeincoach-wissen.de` | Sperre aufgehoben |

Ein abgelehnter Opt-in steht als Warnung im Build-Log. `npm run crawl` schlägt fehl, wenn ein Build ohne erlaubte Aufhebung keinen Noindex-Header enthält.

## 4. Empfohlenes Produktionsmodell: eigene Netlify-Site (erst nach O-2, O-3)

1. **Netlify → Add new site → Import from GitHub → `Sanhami/mpu-deincoach`**, Name z. B. `mpudeincoach-wissen`, **Production branch: `production`** (neuer Branch, entsteht beim ersten freigegebenen Release aus `main`). Build `npm run build`, Publish `dist` (aus `netlify.toml`). Deploy Previews und Branch-Deploys auf dieser Site **deaktivieren** (laufen bereits auf der Staging-Site).
2. Die bestehende Site `mpu-deincoach-staging` bleibt unverändert Staging für `main`. Sie kann die Sperre nie aufheben, weil ihre `URL` die netlify.app-Adresse ist.
3. **Domain management** der neuen Site: `mpudeincoach-wissen.de` als Primary, `www` als Alias.
4. **IONOS-DNS** (IONOS kennt kein ALIAS/ANAME): `@` → **A `75.2.60.5`**; `www` → **CNAME `<neue-site>.netlify.app`**. MX/SPF/`_dmarc`/Google-TXT unverändert. Danach `node scripts/ops/dns-o1-check.mjs post` (die Lovable-Einträge müssen weiterhin fehlen).
5. **HTTPS:** Let's Encrypt automatisch (kein CAA). Abwarten, bis „Certificate active“ angezeigt wird.
6. **Indexierung:** in der **neuen** Site `SITE_INDEXING=allow` setzen (Scope „Builds“). Erst wirksam, wenn die Domain Primary ist (Bedingung `URL`).
7. **Release-Ablauf:** `main` → (Freigabe) → Merge in `production` → Produktions-Deploy. Damit ist jeder Produktions-Deploy eine bewusste Freigabe, und es entstehen nur Builds pro Release.
8. **Kosten:** Eine zweite Site ist im Netlify-Free-Plan grundsätzlich möglich. Vor dem Anlegen im Konto prüfen, ob Build-/Credit-Kontingent und Site-Anzahl ohne Upgrade reichen. **Nichts buchen.**
9. **GitHub (kostenlos, öffentliches Repo):** Branch-Schutz für `main` und `production` mit erforderlichem Check `qa`.

*Alternative ohne zweite Site:* Produktionsdomain an die bestehende Site, Staging als Branch-Deploy eines Branches `staging` (`CONTEXT=branch-deploy` → Sperre bleibt). Nachteil: Die bisherige Staging-Adresse wird zur Produktion, und Staging bekommt eine neue Adresse. Nicht empfohlen.

### Abnahme direkt nach dem Launch

| Prüfung | Erwartung |
| --- | --- |
| `curl -sI https://mpudeincoach-wissen.de/` | 200, **kein** `X-Robots-Tag`, gültiges Zertifikat |
| `http://mpudeincoach-wissen.de/`, `https://www.…/` | eine 301 auf `https://mpudeincoach-wissen.de/` |
| `https://mpu-deincoach-staging.netlify.app/` | weiterhin `X-Robots-Tag: noindex, nofollow` |
| Sitemap-URLs | 200, Self-Canonical, `index,follow` |
| `/mpu-verfahren/`, `/mpu-begutachtungsstelle/`, `/faq/` | noindex, bis O-14-Nachweise vorliegen |
| unbekannte URL, Ellwangen | 404 ohne Canonical |
| 10 Legacy-410-Pfade | 410 ohne Canonical |
| `npm run links:external`; `node scripts/ops/dns-o1-check.mjs post` | alle Ziele 200; Mail-Einträge intakt |

**Rückweg:** `SITE_INDEXING` in der Produktions-Site löschen und neu deployen (Sperre aktiv), oder die Domain dort entfernen.

## 5. Rechtstexte

Vollständige Freigabeprüfung: `RECHTSTEXTE_FREIGABEPRUEFUNG.md`.

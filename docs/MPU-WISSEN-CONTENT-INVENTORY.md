# MPU Wissen Content Inventory

Stand: 4. September 2026

Dieses Inventar dokumentiert die kanonischen Rollen der vorhandenen Seiten. Die ausführbaren Quellen der Wahrheit bleiben `src/seo.ts`, `src/content/articles.ts`, `src/content/pillars.ts` und `src/config/redirects.ts`.

| URL | Titel / Rolle | Typ | Wissensbereich / Parent | Status | Review / Quelle | Primärer Intent |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | MPUdeincoach Wissen | HUB | Root | indexierbar | Redaktionelles Portal | situativer Einstieg |
| `/wissen/` | Wissenslandkarte | HUB | Root | indexierbar | Strukturregister | Themen finden |
| `/ratgeber/` | Ratgeberübersicht | HUB | Wissen | indexierbar | Status je Artikel | Artikel finden |
| `/faq/` | Freigegebene FAQ | FAQ | Wissen | indexierbar | 6 freigegeben, 8 reviewpflichtig | kurze Antworten |
| `/glossar/` | Kuratiertes Glossar | GLOSSARY | Wissen | indexierbar | keine Thin-Content-Einzelseiten | Begriffe verstehen |
| `/mpu-ablauf/` | Rollen, Akte und Gutachten | ARTICLE | Ablauf | `APPROVED_PUBLIC` | FeV / BK5-Grundlagen | institutionelle Rollen und Aktenfluss |
| `/mpu-kosten/` | Bestandteile und Einflussfaktoren | ARTICLE | Kosten | `FACHREVIEW_REQUIRED` | aktuelle umfassende Preisquelle fehlt | neutrale Kostensystematik |
| `/alkohol-mpu/` | Grundlagen und Wissensübersicht | ARTICLE | Alkohol | `FACHREVIEW_REQUIRED` | MPU-Fachreview erforderlich | Risiko, Veränderung, Nachweise |
| `/drogen-mpu/` | Anlässe, Ablauf und Nachweise | ARTICLE | Drogen | `FACHREVIEW_REQUIRED` | MPU-Fachreview erforderlich | Anlass und Nachweisgrenzen |
| `/abstinenznachweis/` | Überblick | ARTICLE | Nachweise | `FACHREVIEW_REQUIRED` | CTU-/Toxikologie-Review erforderlich | Nachweisintegrität |
| `/mpu-begutachtungsstelle/` | Auswahl und Rolle | ARTICLE | Begutachtungsstellen | `APPROVED_PUBLIC` | FeV / redaktionell freigegeben | neutrale Auswahlorientierung |
| `/ueber-uns/` | Portalabgrenzung | EDITORIAL | Vertrauen | indexierbar | Betreiber-/Markenmodell | Portal verstehen |
| `/redaktion/` | Rollen und Fachprüfung | EDITORIAL | Vertrauen | indexierbar | keine erfundenen Reviewer | Redaktion verstehen |
| `/redaktionsrichtlinien/` | Quellen- und Reviewregeln | EDITORIAL | Vertrauen | indexierbar | Governance | Qualitätsstandard verstehen |
| `/korrekturen/` | Korrekturweg | EDITORIAL | Vertrauen | indexierbar | Governance | sachlichen Hinweis melden |
| `/impressum/` | Rechtlicher Platzhalter | LEGAL | Rechtliches | noindex | Legal Review ausstehend | Anbieterangaben |
| `/datenschutz/` | Rechtlicher Platzhalter | LEGAL | Rechtliches | noindex | Hostingwechsel rechtlich prüfen | Datenschutzangaben |
| `/agb/` | Rechtlicher Platzhalter | LEGAL | Rechtliches | noindex | Anwendbarkeit rechtlich entscheiden | AGB-Status |

## Geplante Bereiche ohne Route

MPU Grundlagen, Vorbereitung, Cannabis, Abstinenz, Gutachten und Gespräch, Behörden sowie MPU Tests bleiben nicht verlinkte Redaktionsplan-Einträge. Eine Route entsteht erst, wenn ein eigener Nutzerbedarf, ein primärer Parent, belastbare interne Quellen und die nötige Fachfreigabe vorliegen.

## Pflege

Bei jeder neuen Seite müssen Inventar, SEO-Registry, statische Pfade, Sitemaplogik, Parent, Related Links, Quellenstatus und Reviewstatus gemeinsam geprüft werden. Ein Eintrag allein erzeugt keine Veröffentlichungsfreigabe.

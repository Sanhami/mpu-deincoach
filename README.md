# MPU Wissen

Statisch prerenderter React-Wissenshub für `mpu-deincoach.de`. Das Repository enthält ausschließlich die veröffentlichungsfähige Anwendung und ihre legitimen Projektdateien. Private Wissensdatenbanken, Transferquellen, WordPress-Bestände, Kundendaten und Backups gehören nicht in dieses Repository.

## Lokal arbeiten

Voraussetzung: Node.js 22.12 oder neuer und npm.

```bash
npm ci
npm run dev
```

`VITE_SITE_URL` legt die kanonische Basis-URL fest. Die Voreinstellung und `.env.example` verwenden `https://mpu-deincoach.de`. Auch auf Staging bleibt die Produktions-URL kanonisch. Der aktuelle Build sendet vorsorglich global `X-Robots-Tag: noindex, nofollow`; dieser Header darf erst in einem gesonderten, freigegebenen Produktions-Release entfernt werden.

## Qualität und Build

```bash
npm run qa
```

Der QA-Befehl führt Typecheck, Lint, Tests, Client-Build, SSR-Build, Prerender und einen statischen Crawl aus. Der fertige Build liegt in `dist/`.

## Deploymentvertrag

- Install: `npm ci`
- Build: `npm run build`
- Output: `dist`
- Node: 22.12+
- Routing: statische prerenderte Pfade; kein pauschaler SPA-Fallback, damit unbekannte URLs echte 404-Antworten erhalten
- Weiterleitungen: `dist/_redirects` und `dist/redirects-manifest.json`
- Entfernte URLs: `dist/gone-manifest.json` und zehn erzwungene `410`-Regeln in `dist/_redirects`
- Security Header: `public/_headers` muss vom Host ausgewertet oder äquivalent konfiguriert werden.
- Der Host muss Netlify-kompatible `_redirects`-Statusregeln und die ausgelieferte `404.html` unterstützen.

## Release-Gates

Reviewpflichtige Fachartikel, FAQ und unvollständige Rechtstexte bleiben `noindex` und außerhalb der Sitemap. Eine Indexfreigabe darf erst nach dokumentierter fachlicher beziehungsweise rechtlicher Prüfung erfolgen. Die verbindliche Route-, Redirect- und Freigabelogik steht unter `analysis/release-readiness/`.

## GitHub und Hosting

`Sanhami/mpu-deincoach` ist die kanonische Codebasis. Lovable wird nicht als Repository- oder Hosting-Schicht verwendet. Der Workflow `.github/workflows/qa.yml` ist für Pull Requests und `main` vorbereitet.

Empfohlenes Hosting ist Netlify über die GitHub-Integration: Build `npm run build`, Output `dist`, automatische Deploy Previews und native Verarbeitung von `_redirects`/`_headers`. Vor einer Produktionsverknüpfung müssen geschütztes Staging, Branch-Regeln, die zehn 410-Antworten und die globale Noindex-Sperre geprüft werden.

# Netlify staging

- Site name: `mpu-deincoach-staging`
- Site ID: `1bdd373a-5c76-4888-b10f-fd03981f2f73`
- Staging URL: `https://mpu-deincoach-staging.netlify.app`
- Admin URL: `https://app.netlify.com/projects/mpu-deincoach-staging`
- Repository: `Sanhami/mpu-deincoach`
- Branch: `main`
- Build command: `npm run build`
- Publish directory: `dist`
- Configuration: repository `netlify.toml`
- Production domain attached: no
- Production DNS modified: no
- Global staging header: `X-Robots-Tag: noindex, nofollow`

The project is linked to GitHub and builds from `main`. The staging project's primary Netlify alias was deployed; `mpu-deincoach.de` was never attached or deployed.

Netlify's current project UI reports password protection as an upgrade-only feature for this team. This staging environment is therefore public by URL, but is globally non-indexable by response header. That limitation does not authorize a production release.

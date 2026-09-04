import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = join(root, 'dist');
const template = await readFile(join(dist, 'index.html'), 'utf8');
const server = await import(pathToFileURL(join(root, 'dist-server', 'entry-server.js')).href);

for (const route of [...new Set(server.staticPaths)]) {
  const { html, head } = server.render(route);
  const output = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
  const target = route === '/' ? join(dist, 'index.html') : join(dist, route.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, output, 'utf8');
}

const notFound = server.render('/not-found/');
await writeFile(join(dist, '404.html'), template.replace('<!--app-head-->', notFound.head).replace('<!--app-html-->', notFound.html), 'utf8');

const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const sitemapPaths = server.sitemapPaths;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths.map((route) => `  <url><loc>${escapeXml(`${server.siteUrl}${route}`)}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');

const redirectManifest = server.staticRedirects;
const goneManifest = server.staticGonePaths;
const redirectSources = new Set(redirectManifest.map((item) => item.from));
const gonePaths = new Set(goneManifest);
const directRoutePaths = [...new Set(server.staticPaths)]
  .filter((route) => route !== '/' && route !== '/404/' && !redirectSources.has(route) && !gonePaths.has(route));
const routeNormalizations = directRoutePaths.map((route) => `${route.replace(/\/$/, '')} ${route} 301`);
const directRouteRewrites = directRoutePaths.map((route) => `${route} ${route}index.html 200`);
await writeFile(join(dist, 'redirects-manifest.json'), JSON.stringify(redirectManifest, null, 2), 'utf8');
await writeFile(join(dist, 'gone-manifest.json'), JSON.stringify(goneManifest, null, 2), 'utf8');
await writeFile(
  join(dist, '_redirects'),
  `${routeNormalizations.join('\n')}\n${directRouteRewrites.join('\n')}\n${redirectManifest.map((item) => `${item.from} ${item.to} ${item.status}`).join('\n')}\n${goneManifest.map((route) => `${route} ${route}index.html 410!`).join('\n')}\n`,
  'utf8',
);

await rm(join(root, 'dist-server'), { recursive: true, force: true });

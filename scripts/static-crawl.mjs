import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const failures = [];

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }));
  return nested.flat();
};

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const htmlByRoute = new Map();
const normalizeRoute = (file) => {
  const rel = relative(dist, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404.html';
  return `/${rel.replace(/index\.html$/, '')}`;
};

const attribute = (tag, name) => tag.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))?.[1];
const tagText = (html, tag) => html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1].replace(/<[^>]+>/g, '').trim() || '';
const absoluteFiles = new Set(files.map((file) => `/${relative(dist, file).split(sep).join('/')}`));
const indexable = [];

for (const file of htmlFiles) {
  const route = normalizeRoute(file);
  const html = await readFile(file, 'utf8');
  htmlByRoute.set(route, html);
}

for (const [route, html] of htmlByRoute) {
  const title = tagText(html, 'title');
  const descriptionTag = html.match(/<meta[^>]+name=["']description["'][^>]*>/i)?.[0] || '';
  const robotsTag = html.match(/<meta[^>]+name=["']robots["'][^>]*>/i)?.[0] || '';
  const canonicalTag = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0] || '';
  const description = attribute(descriptionTag, 'content');
  const robots = attribute(robotsTag, 'content') || '';
  const canonical = attribute(canonicalTag, 'href');
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  if (!title) failures.push(`${route}: missing title`);
  if (!description) failures.push(`${route}: missing meta description`);
  if (!canonical) failures.push(`${route}: missing canonical`);
  if (h1Count !== 1) failures.push(`${route}: expected one H1, found ${h1Count}`);
  if (!/noindex/i.test(robots)) indexable.push({ route, title, description, canonical });

  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|tel:|data:)/i.test(value)) continue;
    const [pathPart, fragment] = value.split('#');
    if (!pathPart && fragment && !new RegExp(`id=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(html)) {
      failures.push(`${route}: broken same-page anchor #${fragment}`);
      continue;
    }
    if (!pathPart?.startsWith('/')) continue;
    const normalized = pathPart.endsWith('/') ? pathPart : pathPart;
    const targetExists = htmlByRoute.has(normalized) || absoluteFiles.has(normalized) || absoluteFiles.has(`${normalized}/index.html`);
    if (!targetExists && !pathPart.startsWith('/assets/')) failures.push(`${route}: missing internal target ${pathPart}`);
  }
}

for (const field of ['title', 'description', 'canonical']) {
  const seen = new Map();
  for (const page of indexable) {
    if (seen.has(page[field])) failures.push(`duplicate indexable ${field}: ${seen.get(page[field])} and ${page.route}`);
    seen.set(page[field], page.route);
  }
}

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/mpu-deincoach\.de([^<]*)<\/loc>/g)].map((match) => match[1] || '/');
const expectedIndexable = indexable.map(({ route }) => route).filter((route) => route !== '/404.html').sort();
if (JSON.stringify([...sitemapRoutes].sort()) !== JSON.stringify(expectedIndexable)) failures.push('sitemap does not exactly match indexable HTML routes');

const redirects = JSON.parse(await readFile(join(dist, 'redirects-manifest.json'), 'utf8'));
const goneManifest = JSON.parse(await readFile(join(dist, 'gone-manifest.json'), 'utf8'));
const hostRules = await readFile(join(dist, '_redirects'), 'utf8');
const redirectSources = new Set(redirects.map(({ from }) => from));
if (redirectSources.size !== redirects.length) failures.push('redirect manifest contains duplicate sources');
for (const { from, to, status } of redirects) {
  if (status !== 301) failures.push(`${from}: redirect status is ${status}, expected 301`);
  if (from === to) failures.push(`${from}: self redirect`);
  if (redirectSources.has(to)) failures.push(`${from}: redirect chain through ${to}`);
  if (to.startsWith('/') && !htmlByRoute.has(to)) failures.push(`${from}: internal redirect target missing ${to}`);
}

const goneCount = [...htmlByRoute.values()].filter((html) => html.includes('<title>Inhalt entfernt | MPU Wissen</title>')).length;
if (htmlFiles.length !== 31) failures.push(`expected 31 HTML files, found ${htmlFiles.length}`);
if (indexable.length !== 11) failures.push(`expected 11 indexable pages, found ${indexable.length}`);
if (redirects.length !== 18) failures.push(`expected 18 redirects, found ${redirects.length}`);
if (goneCount !== 10) failures.push(`expected 10 gone pages, found ${goneCount}`);
if (goneManifest.length !== 10 || new Set(goneManifest).size !== 10) failures.push('gone manifest must contain 10 unique routes');
for (const route of goneManifest) {
  if (!htmlByRoute.has(route)) failures.push(`${route}: gone manifest route has no prerendered page`);
  if (!hostRules.includes(`${route} ${route}index.html 410!`)) failures.push(`${route}: missing forced host-level 410 rule`);
}
if (/\/\*\s+\/index\.html\s+200/.test(hostRules)) failures.push('SPA catch-all would mask real 404 responses');

console.log(`Static crawl: ${htmlFiles.length} HTML, ${indexable.length} indexable, ${sitemapRoutes.length} sitemap URLs, ${redirects.length} redirects, ${goneCount} gone pages.`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Static crawl passed with no failures.');
}

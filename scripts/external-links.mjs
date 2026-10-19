// Network check (not part of `npm run qa`, which stays offline): every absolute link in the
// prerendered HTML must answer 200 directly. A redirect hop on a main-site CTA or a source link
// is reported, because it costs link equity and hides moved targets.
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const walk = async (dir) => (await Promise.all((await readdir(dir, { withFileTypes: true }))
  .map((entry) => (entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)])))).flat();

const links = new Map();
for (const file of (await walk(dist)).filter((path) => path.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  for (const [, href] of html.matchAll(/<a[^>]+href="(https?:\/\/[^"]+)"/g)) if (!links.has(href)) links.set(href, file);
}
for (const { to } of JSON.parse(await readFile(join(dist, 'redirects-manifest.json'), 'utf8'))) {
  if (to.startsWith('http') && !links.has(to)) links.set(to, 'redirects-manifest.json');
}

const failures = [];
for (const [href, origin] of links) {
  const url = href.split('#')[0];
  let response;
  try { response = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'mpu-wissen-linkcheck/1.0' } }); }
  catch (error) { failures.push(`${href}: ${error.message} (${origin})`); continue; }
  const location = response.headers.get('location');
  console.log(`${response.status} ${href}${location ? ` -> ${location}` : ''}`);
  if (response.status !== 200) failures.push(`${href}: ${response.status}${location ? ` -> ${location}` : ''} (${origin})`);
}
console.log(`\n${links.size} external targets checked.`);
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }

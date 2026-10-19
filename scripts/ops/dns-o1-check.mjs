// Read-only DNS check for owner action O-1 (detach mpudeincoach-wissen.de from Lovable).
// Usage:  node scripts/ops/dns-o1-check.mjs pre    -> run immediately BEFORE changing DNS
//         node scripts/ops/dns-o1-check.mjs post   -> run after the change (and again after the TTL)
// Queries two public DNS-over-HTTPS resolvers; changes nothing. Exit code 1 = do not proceed / not done.
const DOMAIN = 'mpudeincoach-wissen.de';
const LOVABLE_IP = '185.158.133.1';
const RESOLVERS = ['https://cloudflare-dns.com/dns-query', 'https://dns.google/resolve'];

// Records that must survive O-1 unchanged (baseline 2026-10-19, see NETLIFY_PRODUKTION_UND_O1.md § 1).
const KEEP = [
  { name: DOMAIN, type: 'MX', match: (v) => v.includes('mx00.ionos.de'), label: 'MX mx00.ionos.de' },
  { name: DOMAIN, type: 'MX', match: (v) => v.includes('mx01.ionos.de'), label: 'MX mx01.ionos.de' },
  { name: DOMAIN, type: 'TXT', match: (v) => v.includes('v=spf1 include:_spf-eu.ionos.com'), label: 'SPF (IONOS)' },
  { name: `_dmarc.${DOMAIN}`, type: 'CNAME', match: (v) => v.replace(/\.$/, '') === 'dmarc.ionos.de', label: 'DMARC CNAME _dmarc -> dmarc.ionos.de' },
  { name: `_dmarc.${DOMAIN}`, type: 'TXT', match: (v) => v.includes('v=DMARC1'), label: 'DMARC policy (via CNAME)' },
  { name: DOMAIN, type: 'TXT', match: (v) => v.includes('google-site-verification='), label: 'Google Search Console verification' },
];
// Records that O-1 removes.
const REMOVE = [
  { name: DOMAIN, type: 'A', match: (v) => v === LOVABLE_IP, label: `A @ -> ${LOVABLE_IP} (Lovable)` },
  { name: `www.${DOMAIN}`, type: 'A', match: (v) => v === LOVABLE_IP, label: `A www -> ${LOVABLE_IP} (Lovable)` },
  { name: `_lovable.${DOMAIN}`, type: 'TXT', match: (v) => v.includes('lovable_verify='), label: 'TXT _lovable (Apex)' },
  { name: `_lovable.www.${DOMAIN}`, type: 'TXT', match: (v) => v.includes('lovable_verify='), label: 'TXT _lovable.www' },
];

async function lookup(resolver, name, type) {
  const response = await fetch(`${resolver}?name=${encodeURIComponent(name)}&type=${type}`, { headers: { accept: 'application/dns-json' } });
  if (!response.ok) throw new Error(`${resolver} answered ${response.status}`);
  const json = await response.json();
  // Match on record type, not owner name: _dmarc is a CNAME to dmarc.ionos.de and its TXT sits at the chain end.
  const TYPE_CODE = { A: 1, CNAME: 5, MX: 15, TXT: 16 };
  return (json.Answer ?? []).filter((answer) => answer.type === TYPE_CODE[type]).map((answer) => String(answer.data).replace(/^"|"$/g, ''));
}

async function present(record) {
  const results = await Promise.all(RESOLVERS.map((resolver) => lookup(resolver, record.name, record.type)));
  return results.map((values) => values.some(record.match));
}

const mode = process.argv[2];
if (!['pre', 'post'].includes(mode)) { console.error('usage: node scripts/ops/dns-o1-check.mjs pre|post'); process.exit(2); }

let ok = true;
console.log(`O-1 DNS check (${mode}) for ${DOMAIN} – ${new Date().toISOString()} – resolvers: Cloudflare, Google`);
for (const record of KEEP) {
  const seen = await present(record);
  const good = seen.every(Boolean);
  ok &&= good;
  console.log(`${good ? 'OK  ' : 'FAIL'} keep    ${record.label}${good ? '' : `  (seen: ${seen.join('/')})`}`);
}
for (const record of REMOVE) {
  const seen = await present(record);
  const expected = mode === 'pre';
  const good = seen.every((value) => value === expected);
  ok &&= good;
  const state = seen.every(Boolean) ? 'present' : seen.some(Boolean) ? 'partially propagated' : 'absent';
  console.log(`${good ? 'OK  ' : (mode === 'post' ? 'WAIT' : 'FAIL')} remove  ${record.label}: ${state}`);
}
console.log(ok
  ? (mode === 'pre' ? 'Baseline as expected – safe to start O-1 in the documented order.' : 'O-1 complete in DNS – keep records intact, Lovable records gone.')
  : (mode === 'pre' ? 'Unexpected baseline – STOP and compare with NETLIFY_PRODUKTION_UND_O1.md § 1.' : 'Not finished (or still propagating, TTL 3600 s) – re-run later; a FAIL on a keep record needs immediate attention.'));
process.exitCode = ok ? 0 : 1;

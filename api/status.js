/* Vercel serverless function — server-side uptime check for linked production sites.
   Runs on the server, so there are no CORS limits and we can read real HTTP status codes.

   The URL list lives HERE, not in the query string, so this endpoint can't be used as an
   open proxy to probe arbitrary hosts. To link a project's prod site, add a line below —
   the key must match the `data-prod` attribute on that page's badge. */

const SITES = {
  'w-labs': 'https://wsoft.space/',
  'snaplive-2': 'https://snaplive.wsoftdev.space/',
  'tmc': 'https://tmc.ai.kr/',
  'smart-surveillance-system': 'http://54.180.100.89/',
  // Product modules on the W Labs site rather than standalone apps — the probe still
  // checks the specific path, so a 404 on the module correctly reads as down.
  'wiz-assistant': 'https://wsoft.space/wiz-assistant',
  'lc-oct': 'https://wsoft.space/skin_arch',
};

const TIMEOUT_MS = 5000;

async function probe(url) {
  const started = Date.now();
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ac.signal });
    // Some servers reject HEAD outright — retry once with GET before calling the site down.
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: ac.signal });
    }
    return { up: res.status < 400, code: res.status, ms: Date.now() - started };
  } catch (_) {
    return { up: false, code: 0, ms: Date.now() - started };
  } finally {
    clearTimeout(timer);
  }
}

module.exports = async (req, res) => {
  const slugs = Object.keys(SITES);
  const results = await Promise.all(slugs.map((s) => probe(SITES[s])));

  const body = {};
  slugs.forEach((s, i) => { body[s] = results[i]; });

  // Edge-cache the result so visitors don't each fire a fresh round of requests at client sites.
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.status(200).json(body);
};

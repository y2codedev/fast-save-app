// Read-only HTTP audit. Run against a built local server or the deployed site.
// node scripts/audit-site.mjs http://localhost:3100
import { readFileSync, writeFileSync } from 'node:fs';
import { load } from 'cheerio';
const base = process.argv[2] || 'http://localhost:3100';
const registry = readFileSync('src/lib/constants.ts', 'utf8');
const paths = [...new Set(['/', '/about', '/contact', '/privacy', '/terms', '/pdf-tools', '/image-tools', '/archive-tools', '/video-tools', '/sitemap', ...[...registry.matchAll(/path: '([^']+)'/g)].map(m => m[1])])];
const noindexBlock = registry.match(/NOINDEX_TOOLS\s*=\s*\[([\s\S]*?)\]/)?.[1] || '';
const noindexPaths = new Set([...noindexBlock.matchAll(/'([^']+)'/g)].map(m => m[1]));
const results = [];
for (const path of [
  ...paths,
  '/es',
  '/es/privacy',
  '/zip-to-rar',
  '/zip-to-iso',
  '/es/zip-to-rar',
  '/ig-downloader',
  '/fb-video',
  '/snapchat',
  '/es/ig-downloader',
  '/audit-missing-page',
]) {
  const response = await fetch(base + path);
  const $ = load(await response.text());
  const retired = /(?:ig-downloader|fb-video|snapchat)$/.test(path);
  const withdrawn = /zip-to-(?:rar|iso)$/.test(path) || path === '/audit-missing-page';
  const issues = [];
  const expectedStatus = retired ? 410 : withdrawn ? 404 : 200;
  if (response.status !== expectedStatus) issues.push(`HTTP ${response.status}`);
  // Some converters mount headings after hydration; record this for browser verification.
  const serverHeading = $('h1').text();
  if (!retired && !withdrawn && !$('link[rel=canonical]').attr('href')) issues.push('Missing canonical');
  const robotsMeta = $('meta[name="robots"]').attr('content') || '';
  if (noindexPaths.has(path) && !/noindex/i.test(robotsMeta)) issues.push('Missing intentional noindex');
  if (!noindexPaths.has(path) && !retired && !withdrawn && /noindex/i.test(robotsMeta)) issues.push('Unexpected noindex');
  if (!retired && !withdrawn && $('link[rel="alternate"][hreflang]').length !== 11) issues.push('Incomplete hreflang set');
  if ($('ins.adsbygoogle').length || $('script[src*="adsbygoogle.js"]').length) issues.push('Ads active');
  if ($('a[href$="/zip-to-rar"],a[href$="/zip-to-iso"]').length) issues.push('Link to withdrawn tool');
  $('script,style').remove();
  const text = $('body').text().replace(/\s+/g,' ');
  if (/Footer\.All rights reserved|Navigation\.(Image Compressor|Compress Image)/.test(text)) issues.push('Visible translation key');
  results.push({path,status:response.status,title:$('title').text(),serverHeading,words:text.split(' ').length,issues});
}
const sitemapResponse = await fetch(base + '/sitemap.xml');
const xml = await sitemapResponse.text();
const robots = await (await fetch(base + '/robots.txt')).text();
const adsTxt = await (await fetch(base + '/ads.txt')).text();
const retiredApiResponse = await fetch(base + '/api/download?url=https%3A%2F%2Fexample.com');
const summary = {base, checkedAt:new Date().toISOString(), pages:results.length, failures:results.filter(r=>r.issues.length), sitemapStatus:sitemapResponse.status, sitemapUrlCount:(xml.match(/<loc>/g) || []).length, withdrawnInSitemap:/(?:zip-to-(?:rar|iso)|ig-downloader|fb-video|snapchat)/.test(xml), blocksRenderingAssets:/Disallow: \/(_next|wasm)/.test(robots), publisherVerified:adsTxt.includes('pub-1504999187644497'), retiredApiStatus:retiredApiResponse.status, results};
writeFileSync('/tmp/adsense-http-audit.json',JSON.stringify(summary,null,2));
console.log(JSON.stringify({...summary,results:undefined},null,2));
if(summary.failures.length || summary.withdrawnInSitemap || summary.blocksRenderingAssets || !summary.publisherVerified || summary.retiredApiStatus !== 410) process.exitCode=1;

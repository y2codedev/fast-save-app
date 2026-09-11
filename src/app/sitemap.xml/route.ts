import { getSiteUrl, getAlternateLanguages } from '@/lib/seo';
import { locales, defaultLocale } from '@/i18n/routing';
import { ALL_TOOLS, NOINDEX_TOOLS } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function GET() {
  const siteUrl = getSiteUrl();

  const categoryPaths = ['/pdf-tools', '/image-tools', '/video-tools', '/archive-tools'];
  const staticPaths = ['', '/about', '/contact', '/privacy', '/terms', '/sitemap', '/file-privacy-security'];
  const toolPaths = Array.from(new Set(ALL_TOOLS.map(t => t.path))).filter(p => p !== '/' && p !== '' && !NOINDEX_TOOLS.includes(p));
  const allPaths = [...staticPaths, ...categoryPaths, ...toolPaths];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;


  // This release updates shared site content and navigation across every route.
  const lastmod = '2026-09-11';

  for (const path of allPaths) {
    const languages = getAlternateLanguages(path);
    for (const locale of locales) {
      const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
      const url = `${siteUrl}${localePrefix}${path}`;

      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;

      // Add reciprocal hreflang links
      for (const [lang, langUrl] of Object.entries(languages)) {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${langUrl}" />\n`;
      }

      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}

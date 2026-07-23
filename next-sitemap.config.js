/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://fast-save.vercel.app',
  generateRobotsTxt: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  trailingSlash: true,
  exclude: ['/manifest.webmanifest', '/manifest.webmanifest/'],
};

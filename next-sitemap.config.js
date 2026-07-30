/** @type {import('next-sitemap').IConfig} */

const locales = [
  'en',
  'es',
  'fr',
  'zh',
  'pt',
  'id',
  'ru',
  'de',
  'tr',
  'ar',
];

const defaultLocale = 'en';

const routes = [
  '',
  '/about',
  '/privacy',
  '/terms',
  '/contact',
  '/merge-pdf',
  '/image-to-pdf',
  '/pdf-to-jpg',
  '/md-converter',
  '/unlock-pdf',
  '/protect-pdf',
  '/video-compressor',
  '/video-to-gif',
  '/video-trimmer',
  '/audio',
  '/audio-trimmer',
  '/bg-remover',
  '/image-compressor',
  '/photo',
  '/image-editor',
  '/ig-downloader',
  '/fb-video',
  '/snapchat',
];

module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://convertallnow.com',

  generateRobotsTxt: false,

  sitemapSize: 5000,

  trailingSlash: true,

  exclude: ['*'],

  autoLastmod: false,

  additionalPaths: async () => {
    const result = [];

    for (const route of routes) {
      for (const locale of locales) {
        const loc =
          locale === defaultLocale
            ? route === ''
              ? '/'
              : `${route}/`
            : route === ''
              ? `/${locale}/`
              : `/${locale}${route}/`;

        result.push({
          loc,
          changefreq: 'weekly',
          priority: route === '' ? 1.0 : 0.7,
        });
      }
    }

    return result;
  },
};
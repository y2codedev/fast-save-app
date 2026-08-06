import WebPageSchema from '@/components/seo/WebPageSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getCanonicalUrl, getAlternateLanguages, CATEGORY_TOOLS } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Sitemap — All Tools & Pages | ConvertAllNow';
  const description = 'Browse all free online tools and pages on ConvertAllNow: PDF tools, image tools, video tools, archive tools, and more.';

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: getCanonicalUrl(locale, '/sitemap'),
      languages: getAlternateLanguages('/sitemap'),
    },
  };
}

const categories = [
  {
    name: 'PDF Tools',
    path: '/pdf-tools',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/10',
    border: 'border-red-100 dark:border-red-800/20',
    tools: CATEGORY_TOOLS.pdf,
  },
  {
    name: 'Image Tools',
    path: '/image-tools',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    border: 'border-purple-100 dark:border-purple-800/20',
    tools: CATEGORY_TOOLS.image,
  },
  {
    name: 'Video & Audio Tools',
    path: '/video-tools',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-100 dark:border-blue-800/20',
    tools: CATEGORY_TOOLS.video,
  },
  {
    name: 'Archive & ZIP Tools',
    path: '/archive-tools',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/10',
    border: 'border-orange-100 dark:border-orange-800/20',
    tools: CATEGORY_TOOLS.archive,
  },
];

const staticPages = [
  { name: 'Home', path: '/', desc: 'ConvertAllNow homepage with all tools overview' },
  { name: 'About Us', path: '/about', desc: 'Learn about ConvertAllNow and our mission' },
  { name: 'Contact', path: '/contact', desc: 'Get in touch with the ConvertAllNow team' },
  { name: 'Privacy Policy', path: '/privacy', desc: 'How we handle your data and privacy' },
  { name: 'Terms of Service', path: '/terms', desc: 'Terms and conditions for using ConvertAllNow' },
];

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Sitemap' });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Sitemap', href: '/sitemap' },
  ];

  return (
    <>
      <WebPageSchema
        title={t('title')}
        description={t('subtitle')}
        path="/sitemap"
        locale={locale}
        breadcrumb={breadcrumbItems}
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <VisualBreadcrumb items={breadcrumbItems} />

          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* General Pages Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('generalPages')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staticPages.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className="group flex flex-col justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition duration-200"
                >
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {page.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {page.desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tool Categories & Links */}
          <div className="space-y-10">
            {categories.map((cat) => (
              <div
                key={cat.path}
                className={`rounded-2xl border ${cat.border} ${cat.bg} p-6 sm:p-8 transition duration-300`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className={`text-2xl font-bold ${cat.color}`}>
                    {cat.name}
                  </h2>
                  <Link
                    href={cat.path}
                    className={`inline-flex items-center gap-1 text-sm font-semibold ${cat.color} hover:underline`}
                  >
                    {t('viewCategory')}
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.path}
                      href={tool.path}
                      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/60 dark:border-gray-800 hover:shadow-md hover:scale-[1.02] transition duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {tool.name}
                        </div>
                        {tool.desc && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {tool.desc}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

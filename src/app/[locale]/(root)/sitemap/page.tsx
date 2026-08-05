import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getCanonicalUrl, getAlternateLanguages, CATEGORY_TOOLS } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Sitemap — All Tools & Pages | ConvertAllNow';
  const description = 'Browse all free online tools and pages on ConvertAllNow: PDF tools, image tools, video tools, archive tools, and more.';

  return {
    title, description,
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

  return (
    <>
      <BreadcrumbSchema locale={locale} items={[{ name: 'Sitemap' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <VisualBreadcrumb items={[{ name: 'Sitemap' }]} className="px-0 py-2 mb-2" />

        <div className="py-8 md:py-10">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Sitemap
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A complete directory of all tools and pages on ConvertAllNow.
          </p>
        </div>

        {/* Static Pages */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gray-400 rounded-full inline-block" />
            General Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {staticPages.map(page => (
              <Link
                key={page.path}
                href={page.path}
                className="group flex flex-col gap-1 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700 hover:border-gray-300 rounded-xl p-3.5 transition-all"
              >
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {page.name}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{page.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Category + Tool listings */}
        {categories.map(cat => (
          <div key={cat.path} className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <h2 className={`text-lg font-bold ${cat.color}`}>{cat.name}</h2>
              <Link
                href={cat.path}
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${cat.bg} ${cat.color} ${cat.border} border hover:opacity-80 transition-opacity`}
              >
                View Category →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {cat.tools.map(tool => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="group flex flex-col gap-1 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 rounded-xl p-3.5 transition-all"
                >
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {tool.name}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 leading-snug">{tool.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

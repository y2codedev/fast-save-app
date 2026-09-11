import WebPageSchema from '@/components/seo/WebPageSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getCanonicalUrl, getAlternateLanguages } from '@/lib/seo';
import AllToolsHub from '@/components/sections/AllToolsHub';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'All Free Online File Tools — Convert, Compress & Edit | ConvertAllNow';
  const description = 'Browse all free online tools on ConvertAllNow: PDF tools, image compressors, video converters, audio trimmers, and archive managers. 100% private in-browser processing.';

  return {
    title, description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: getCanonicalUrl(locale, '/sitemap'),
      languages: getAlternateLanguages('/sitemap'),
    },
  };
}

const staticPages = [
  { name: 'Home', path: '/', desc: 'ConvertAllNow homepage with instant tool navigation' },
  { name: 'File Privacy & Security', path: '/file-privacy-security', desc: 'In-depth explanation of our in-browser WebAssembly processing architecture' },
  { name: 'About Us', path: '/about', desc: 'Learn about our team, developer mission, and technical standards' },
  { name: 'Contact & Support', path: '/contact', desc: 'Get support or send feedback directly to the development team' },
  { name: 'Privacy Policy', path: '/privacy', desc: 'Clear terms on cookie usage, advertising, and zero-upload processing' },
  { name: 'Terms of Service', path: '/terms', desc: 'Permitted usage, copyright disclaimers, and software terms' },
];

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'All Tools', href: '/sitemap' },
  ];

  return (
    <>
      <WebPageSchema
        title="All Free Online File Tools"
        description="Explore our comprehensive directory of 100% private, browser-based utilities for PDF, image, video, audio, and archive conversions."
        path="/sitemap"
        locale={locale}
        breadcrumb={breadcrumbItems}
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="w-full min-h-screen bg-slate-50 dark:bg-gray-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
          <VisualBreadcrumb items={breadcrumbItems} />

          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              All Free Online File Tools
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Explore our comprehensive suite of 100% private, browser-based utilities for PDF documents, image editing, video &amp; audio compression, and archive conversions.
            </p>
          </div>

          {/* Interactive All Tools Discovery Hub */}
          <AllToolsHub />

          {/* General & Legal Pages Section */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sm:p-10 space-y-6">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Platform Documentation &amp; Legal Policies
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Transparency, security guidelines, and legal disclosures for ConvertAllNow.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticPages.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className="group flex flex-col justify-between p-5 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-500/40 hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-all duration-200"
                >
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {page.name}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                      {page.desc}
                    </div>
                  </div>
                  <div className="mt-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Page</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import HowToSchema from '@/components/seo/HowToSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import ToolContentSection from '@/components/sections/ToolContentSection';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, CATEGORY_TOOLS, RELATED_TOOLS } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { ArrowRightIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Free Archive & ZIP Tools Online — Create, Extract, Convert ZIP Files';
  const description =
    'Free browser-based archive tools: create ZIP files, extract ZIP, convert RAR/7Z/TAR to ZIP, protect archives with passwords, and more. No signup required.';

  return {
    title, description,
    keywords: [
      'zip tools online free', 'create zip file', 'extract zip', 'unzip online',
      'rar to zip', '7z to zip', 'tar to zip', 'zip converter', 'archive tools',
      'password protect zip', 'zip file online free',
    ],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/archive-tools'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, site: '@convertallnow', creator: '@convertallnow' },
    alternates: {
      canonical: getCanonicalUrl(locale, '/archive-tools'),
      languages: getAlternateLanguages('/archive-tools'),
    },
  };
}

const faqs = [
  {
    question: 'What archive formats are supported?',
    answer: 'We support ZIP, RAR, 7Z, TAR, TAR.GZ (TGZ), TAR.BZ2, TAR.XZ, GZ, BZ2, XZ, and ISO formats across our various archive tools.',
  },
  {
    question: 'Can I create a password-protected ZIP file?',
    answer: 'Yes! Use our Protect ZIP tool to add AES-256 password encryption to any ZIP archive. The protected file can be opened with any standard ZIP application using the password.',
  },
  {
    question: 'How do I extract a ZIP file in my browser?',
    answer: 'Navigate to the Unzip ZIP tool, upload your ZIP file, and our tool will extract all contents. You can download individual files or all files as a new archive.',
  },
  {
    question: 'Can I convert RAR to ZIP without software?',
    answer: 'Yes! Our RAR to ZIP converter processes everything in your browser — upload the RAR file and download the converted ZIP instantly.',
  },
  {
    question: 'Is there a file size limit for ZIP archives?',
    answer: 'Since all processing is done locally in your browser, the practical limit depends on your device\'s available memory. Most modern devices handle archives of several hundred megabytes easily.',
  },
  {
    question: 'Can I add or remove files from an existing ZIP?',
    answer: 'Yes! Our Edit ZIP tool lets you open an existing ZIP archive, add new files, remove existing ones, or rename them — all without re-downloading the original.',
  },
];

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free Archive & ZIP Tools Online',
  description: 'Collection of free browser-based archive tools including ZIP creation, extraction, conversion, and security.',
  url: 'https://convertallnow.com/archive-tools',
  hasPart: CATEGORY_TOOLS.archive.slice(0, 10).map(tool => ({
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: `https://convertallnow.com${tool.path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  })),
};

export default async function ArchiveToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHub = await getTranslations({ locale, namespace: 'CategoryHubs' });
  const title = tHub('archiveTitle');
  const subtitle = tHub('archiveSubtitle');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Archive & ZIP Tools', href: '/archive-tools' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={subtitle} path="/archive-tools" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <VisualBreadcrumb items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl mb-2">
              <ArchiveBoxIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {CATEGORY_TOOLS.archive.map((tool) => (
              <Link
                key={tool.path}
                href={tool.path}
                className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/5 dark:hover:shadow-orange-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {tool.name}
                  </div>
                  {tool.desc && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-normal">
                      {tool.desc}
                    </p>
                  )}
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* FAQs Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

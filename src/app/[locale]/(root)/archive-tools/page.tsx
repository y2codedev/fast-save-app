import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, CATEGORY_TOOLS } from '@/lib/seo';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
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

  // Group archive tools
  const organizeTools = CATEGORY_TOOLS.archive.slice(0, 8);
  const convertToZip = CATEGORY_TOOLS.archive.slice(8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema locale={locale} items={[{ name: 'Archive Tools' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <VisualBreadcrumb items={[{ name: 'Archive Tools' }]} className="px-0 py-2 mb-2" />

        <div className="text-center py-10 md:py-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30 text-xs font-semibold text-orange-600 dark:text-orange-400 mb-4">
            <ArchiveBoxIcon className="h-3.5 w-3.5" />
            Archive Tools
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            {tHub('archiveTitle')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {tHub('archiveSubtitle')}
          </p>
        </div>

        {/* Organize ZIP Tools */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 px-1">Organize & Manage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {organizeTools.map(tool => (
              <Link
                key={tool.path}
                href={tool.path}
                className="group flex flex-col gap-2 bg-white dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">
                    {tool.name}
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-all group-hover:translate-x-1" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Convert Tools */}
        <div className="mb-16">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 px-1">Format Conversions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {convertToZip.map(tool => (
              <Link
                key={tool.path}
                href={tool.path}
                className="group flex flex-col gap-2 bg-white dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">
                    {tool.name}
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-all group-hover:translate-x-1" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-10 mb-16">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Archive Management in Your Browser
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
              <p>
                Archive files like ZIP, RAR, and 7Z are essential for compressing, organizing, and securely transferring multiple files. Managing these archives traditionally required dedicated software like WinRAR, 7-Zip, or similar applications. ConvertAllNow brings full archive management capability to your web browser — no software installation required.
              </p>
              <p>
                Our ZIP management tools cover every use case: <Link href="/create-zip" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">creating new ZIP archives</Link> from multiple files, <Link href="/unzip-zip" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">extracting ZIP contents</Link>, <Link href="/edit-zip" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">modifying existing archives</Link>, <Link href="/merge-zip" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">merging multiple ZIP files</Link>, and <Link href="/protect-zip" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">protecting archives with AES-256 encryption</Link>.
              </p>
              <p>
                For cross-format compatibility, we provide converters between all major archive formats: RAR to ZIP, 7Z to ZIP, TAR to ZIP, TAR.GZ to ZIP, and many more — in both directions. All conversions happen locally in your browser with full privacy.
              </p>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-45 transition-transform inline-block">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

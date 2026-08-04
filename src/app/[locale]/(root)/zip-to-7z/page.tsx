import ArchiveConverter from '@/components/sections/ArchiveConverter';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { Metadata } from 'next';
import React from 'react';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';

const SLUG = 'zip-to-7z';
const PAGE_TITLE = 'ZIP to 7Z Converter – Convert ZIP Files Online Free';
const PAGE_DESCRIPTION = 'Convert ZIP files to 7Z securely in your browser. No uploads, no registration, and no server-side processing.';

const FAQ_ITEMS = [
  {
    question: 'Is this ZIP to 7Z converter completely free to use?',
    answer: 'Yes, ConvertAllNow provides this archive converter completely free of charge. There are no registration requirements, no paywalls, and no daily conversion quotas.',
  },
  {
    question: 'Are my files uploaded to a cloud server during conversion?',
    answer: 'No! Your files never leave your device. Conversion happens entirely inside your web browser using WebAssembly and Web Workers. No file contents, filenames, or data packets are transmitted across the internet or stored on external backend servers.',
  },
  {
    question: 'What are the maximum allowed file sizes for conversion?',
    answer: 'On desktop devices, you can process ZIP archives up to 500 MB in size. On mobile devices and tablets, the maximum file limit is 100 MB to ensure smooth processing without exhausting device random access memory (RAM) or causing browser out-of-memory errors.',
  },
  {
    question: 'Why should I convert ZIP files to 7Z format?',
    answer: 'The 7Z archive format utilizes advanced LZMA and LZMA2 compression algorithms, offering significantly higher compression ratios than traditional ZIP format. This results in much smaller file sizes while preserving original folder structures and Unicode filenames.',
  },
  {
    question: 'Can I extract or open the converted 7Z files with standard tools?',
    answer: 'Absolutely. The exported .7z files are 100% compatible with all standard archiving utilities, including desktop 7-Zip, WinRAR, WinZip, Keka, Peazip, as well as built-in archive extractors in modern Windows, macOS, and Linux operating systems.',
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      'zip to 7z',
      'convert zip to 7z',
      'zip to 7z converter online',
      'free 7z converter',
      'browser archive converter',
      'wasm archive tool',
      'compress zip to 7z',
      'online 7zip creator',
      'secure file conversion',
      'no upload archive tool',
    ],
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: getCanonicalUrl(locale, `/${SLUG}`),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [
        {
          url: '/images/icon.png',
          width: 1200,
          height: 630,
          alt: 'ConvertAllNow ZIP to 7Z Browser Converter',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      creator: '@convertallnow',
      site: '@convertallnow',
      images: ['/images/icon.png'],
    },
    alternates: {
      canonical: getCanonicalUrl(locale, `/${SLUG}`),
      languages: getAlternateLanguages(`/${SLUG}`),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const softwareSchema = createToolSchema({
    name: 'ZIP to 7Z Converter – Client-Side Browser Tool',
    description: PAGE_DESCRIPTION,
    path: `/${SLUG}`,
    locale,
    featureList: [
      '100% local browser conversion using WebAssembly',
      'No server file uploads or backend storage',
      'Preserves original directory structure and Unicode filenames',
      'Non-blocking Web Worker execution',
      'Supports files up to 500MB on Desktop and 100MB on Mobile',
    ],
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SchemaMarkup data={softwareSchema} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: 'Home', href: '/' },
          { name: 'Archive Converters', href: `/${SLUG}` },
          { name: 'ZIP to 7Z Converter' },
        ]}
      />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-16 pb-16">
          {/* Main Interactive Converter Client Component */}
          <ArchiveConverter />

          {/* Server-Rendered Indexable SEO & Explanatory Content */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 w-full space-y-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200">
            <header className="space-y-3 text-center sm:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                About the Free ZIP to 7Z Online Converter
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                ConvertAllNow offers a secure, zero-upload online utility specifically architected to transform ZIP archives into highly compressed 7Z archives right inside your web browser. Utilizing modern WebAssembly (WASM) technology, this converter bypasses cloud servers entirely, offering unequaled privacy, immediate processing speed, and zero external transfer latency.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-3 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Why Upgrade from ZIP to 7Z?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  While ZIP is widely recognized, the 7Z archive format employs sophisticated LZMA and LZMA2 algorithms that deliver significantly higher compression ratios. Converting large file archives from standard ZIP to 7Z saves important local disk storage and reduces bandwidth consumption when sharing files online, all while perfectly preserving internal folder hierarchies and multilingual Unicode file naming conventions.
                </p>
              </article>

              <article className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-3 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Client-Side Web Worker Security
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Traditional conversion tools force you to upload personal documents or company archives to third-party servers, posing serious data confidentiality risks. Our converter runs a compiled 7-Zip engine inside an isolated background Web Worker on your device. Your data never transmits across the network, ensuring complete zero-knowledge privacy and instant memory disposal upon completion.
                </p>
              </article>
            </div>

            <div className="space-y-6 bg-white dark:bg-gray-800/40 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                How to Convert ZIP to 7Z Online
              </h3>
              <ol className="space-y-4 text-sm sm:text-base list-decimal list-inside text-gray-700 dark:text-gray-300 font-medium">
                <li className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <strong className="text-indigo-600 dark:text-indigo-400">Select or Drag File:</strong> Click the upload dropzone above or drag and drop your target .zip file into the box.
                </li>
                <li className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <strong className="text-indigo-600 dark:text-indigo-400">Start Conversion:</strong> Click the <span className="underline decoration-indigo-500">Convert to 7Z</span> button. The WebAssembly engine will initialize cleanly in memory without freezing your browser interface.
                </li>
                <li className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <strong className="text-indigo-600 dark:text-indigo-400">Save Your 7Z File:</strong> Once extraction and LZMA re-compression complete, click <span className="underline decoration-green-500">Download .7z Archive</span> to save the newly created archive instantly to your device disk.
                </li>
              </ol>
            </div>

            {/* Server-Rendered FAQ Section */}
            <section className="space-y-6 pt-6">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Everything you need to know about our browser-based ZIP to 7Z file converter.
                </p>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800/50 shadow-sm">
                {FAQ_ITEMS.map((faq, i) => (
                  <div key={i} className="p-5 sm:p-6 space-y-2 hover:bg-gray-50/50 dark:hover:bg-gray-750/50 transition-colors">
                    <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white flex items-center justify-between">
                      <span>{faq.question}</span>
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </div>
      </ToolLayoutWithAds>
    </>
  );
}

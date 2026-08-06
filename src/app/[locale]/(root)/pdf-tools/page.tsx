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
import { ArrowRightIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const title = 'Free PDF Tools Online — Merge, Convert, Compress & Edit PDFs';
  const description =
    'All-in-one free PDF tools: merge PDFs, convert PDF to Word, PDF to JPG, protect PDFs, and more. No signup required. 100% browser-based and secure.';

  return {
    title,
    description,
    keywords: [
      'pdf tools online free', 'merge pdf', 'pdf to word', 'pdf to jpg', 'compress pdf',
      'protect pdf', 'unlock pdf', 'image to pdf', 'word to pdf', 'pdf converter',
      'online pdf editor free', 'pdf tools no signup',
    ],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/pdf-tools'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image', title, description,
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/pdf-tools'),
      languages: getAlternateLanguages('/pdf-tools'),
    },
  };
}

const faqs = [
  {
    question: 'Are all PDF tools completely free?',
    answer: 'Yes. Every PDF tool on ConvertAllNow is 100% free to use with no hidden fees, no watermarks, and no signup required.',
  },
  {
    question: 'Is my PDF file safe and private?',
    answer: 'All processing happens directly in your browser. Your files never leave your device or get uploaded to our servers, ensuring complete privacy and security.',
  },
  {
    question: 'Can I merge more than two PDF files at once?',
    answer: 'Yes! Our Merge PDF tool lets you combine unlimited PDF files in any order. Simply drag and drop them, reorder as needed, then click merge.',
  },
  {
    question: 'What is the maximum file size supported?',
    answer: 'Since processing is browser-based, the practical limit is your device\'s available memory. Most modern devices handle files up to several hundred megabytes.',
  },
  {
    question: 'Can I convert a scanned PDF to Word?',
    answer: 'Our PDF to Word converter works best with text-based PDFs. For scanned documents, you would need OCR (Optical Character Recognition) which is currently not supported.',
  },
  {
    question: 'Do PDF tools work on mobile?',
    answer: 'Yes! All tools are fully responsive and work on iOS and Android devices via any modern web browser including Chrome, Safari, and Firefox.',
  },
  {
    question: 'How do I protect a PDF with a password?',
    answer: 'Navigate to our Protect PDF tool, upload your file, enter your desired password, and click Protect. The encrypted PDF will download instantly.',
  },
  {
    question: 'Can I remove a password from a PDF I own?',
    answer: 'Yes. Use our Unlock PDF tool to remove password protection from PDFs you have legal access to. Enter the existing password and we\'ll create an unlocked version.',
  },
];

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free PDF Tools Online',
  description: 'Collection of free browser-based PDF tools including merge, convert, compress, protect, and edit.',
  url: 'https://convertallnow.com/pdf-tools',
  hasPart: CATEGORY_TOOLS.pdf.map(tool => ({
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: `https://convertallnow.com${tool.path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  })),
};

export default async function PdfToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHub = await getTranslations({ locale, namespace: 'CategoryHubs' });
  const title = tHub('pdfTitle');
  const subtitle = tHub('pdfSubtitle');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'PDF Tools', href: '/pdf-tools' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={subtitle} path="/pdf-tools" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="min-h-screen bg-gradient-to-b from-red-50/40 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <VisualBreadcrumb items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl mb-2">
              <DocumentTextIcon className="w-8 h-8" />
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
            {CATEGORY_TOOLS.pdf.map((tool) => (
              <Link
                key={tool.path}
                href={tool.path}
                className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-red-500/50 dark:hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/5 dark:hover:shadow-red-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {tool.name}
                  </div>
                  {tool.desc && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-normal">
                      {tool.desc}
                    </p>
                  )}
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
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

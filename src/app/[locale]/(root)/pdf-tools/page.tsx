import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, CATEGORY_TOOLS } from '@/lib/seo';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema locale={locale} items={[{ name: 'PDF Tools' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <VisualBreadcrumb items={[{ name: 'PDF Tools' }]} className="px-0 py-2 mb-2" />

        {/* Hero */}
        <div className="text-center py-10 md:py-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 text-xs font-semibold text-red-600 dark:text-red-400 mb-4">
            <DocumentTextIcon className="h-3.5 w-3.5" />
            PDF Tools
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            {tHub('pdfTitle')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {tHub('pdfSubtitle')}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {CATEGORY_TOOLS.pdf.map(tool => (
            <Link
              key={tool.path}
              href={tool.path}
              className="group flex flex-col gap-2 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  {tool.name}
                </span>
                <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-all group-hover:translate-x-1" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>

        {/* Content Section */}
        <div className="space-y-10 mb-16">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              All-in-One PDF Tools — Free, Fast & Secure
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
              <p>
                PDF (Portable Document Format) is the world's most widely used document format, trusted by businesses, students, and professionals globally. Managing PDFs efficiently — merging multiple documents, extracting content, converting formats, or protecting sensitive files — is an everyday necessity. ConvertAllNow provides a complete suite of professional-grade PDF tools, entirely free and 100% browser-based.
              </p>
              <p>
                Unlike desktop software that requires installation or cloud services that upload your files to remote servers, all ConvertAllNow PDF tools operate directly in your web browser using modern JavaScript APIs. This means your documents are processed locally on your device, ensuring maximum privacy and security. There are no file size limits imposed by server storage, no account creation, no watermarks, and no restrictions.
              </p>
              <p>
                Whether you need to <Link href="/merge-pdf" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">merge multiple PDFs</Link> into a single file, <Link href="/pdf-to-docx" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">convert a PDF to an editable Word document</Link>, extract images with <Link href="/pdf-to-jpg" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">PDF to JPG</Link>, or <Link href="/protect-pdf" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">add a password to protect sensitive PDFs</Link>, all tools are available instantly without any download or installation.
              </p>
              <p>
                Our PDF tools are designed for everyone — students combining research papers, legal professionals managing contracts, marketers creating presentations, and developers working with document workflows. Each tool has a clean, intuitive interface that takes seconds to master, while delivering professional results.
              </p>
            </div>
          </div>

          {/* Why Choose */}
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Choose ConvertAllNow PDF Tools?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'No Upload Required', desc: 'All processing happens in your browser. Files never leave your device.' },
                { title: '100% Free Forever', desc: 'No hidden fees, no premium tiers, no subscription needed.' },
                { title: 'No Watermarks', desc: 'Output files are clean with no branding added to your documents.' },
                { title: 'No Signup', desc: 'Use any tool instantly without creating an account.' },
                { title: 'Works on All Devices', desc: 'Fully responsive — works on desktop, tablet, and mobile.' },
                { title: 'Supports All Browsers', desc: 'Compatible with Chrome, Firefox, Safari, and Edge.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="flex-shrink-0 mt-0.5 text-indigo-500">✓</span>
                  <div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.title} — </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
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

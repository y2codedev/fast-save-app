import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, CATEGORY_TOOLS } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { 
  ArrowRightIcon, 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  LockClosedIcon, 
  ArrowsRightLeftIcon, 
  FolderIcon, 
  SparklesIcon, 
  BoltIcon, 
  CheckCircleIcon, 
  DevicePhoneMobileIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const title = 'Free PDF Tools Online — Merge, Convert, Compress & Protect PDFs | ConvertAllNow';
  const description =
    'All-in-one free PDF tools: merge PDFs, convert PDF to Word or JPG, protect and unlock PDFs. 100% browser-based with zero file uploads and no signup required.';

  return {
    title,
    description,
    keywords: [
      'pdf tools online free', 'merge pdf', 'pdf to word', 'pdf to jpg', 'compress pdf',
      'protect pdf', 'unlock pdf', 'image to pdf', 'word to pdf', 'pdf converter',
      'online pdf editor free', 'pdf tools no signup', 'private pdf tools',
    ],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/pdf-tools'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@convertallnow',
      creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/pdf-tools'),
      languages: getAlternateLanguages('/pdf-tools'),
    },
  };
}

const POPULAR_TOOLS = [
  { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDF files into one organized document in any custom order.', badge: 'Most Popular' },
  { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract and convert every PDF page into a high-definition JPG image instantly.', badge: 'Fast' },
  { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Turn JPG, PNG, and WebP photos into a multi-page PDF with custom margins.', badge: 'Essential' },
  { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert read-only PDF documents into fully editable Microsoft Word (.docx) files.', badge: 'High Accuracy' },
  { name: 'Protect PDF', path: '/protect-pdf', desc: 'Add 128-bit or 256-bit password encryption to secure confidential PDF documents.', badge: 'Secure' },
  { name: 'Unlock PDF', path: '/unlock-pdf', desc: 'Remove password restrictions from PDF documents you have authorized access to.', badge: 'Instant' },
];

const CONVERT_TOOLS = [
  { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract high-resolution JPG images from any PDF document without quality degradation.' },
  { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Combine photo albums, receipts, and scans into a single, clean PDF file.' },
  { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF tables, text, and graphics into an editable Word document.' },
  { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Save Microsoft Word documents as standard PDF files preserving original formatting.' },
  { name: 'Markdown to PDF', path: '/md-converter', desc: 'Format and render GitHub-flavored Markdown text into professionally styled PDFs.' },
  { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF document layouts into clean, semantic HTML code for web pages.' },
  { name: 'Word to HTML', path: '/word-to-html', desc: 'Transform Word (.docx) files into clean, web-ready HTML without messy markup.' },
];

const ORGANIZE_TOOLS = [
  { 
    name: 'Merge PDF', 
    path: '/merge-pdf', 
    desc: 'Reorder, combine, and merge multiple PDF documents into one continuous file with drag-and-drop ease.',
    badge: 'Available Now'
  },
  { 
    name: 'Split PDF', 
    path: '/split-pdf', 
    desc: 'Extract specific page ranges or split all pages into individual PDF documents with in-browser processing.',
    badge: 'Available Now'
  },
];

const SECURITY_TOOLS = [
  { name: 'Protect PDF', path: '/protect-pdf', desc: 'Add strong password encryption to protect sensitive financial records, legal agreements, and personal data.' },
  { name: 'Unlock PDF', path: '/unlock-pdf', desc: 'Decrypt and remove password locks from password-protected PDF files when the password is known.' },
];

const faqs = [
  {
    question: 'Are all PDF tools completely free to use?',
    answer: 'Yes. Every PDF tool on ConvertAllNow is 100% free with no hidden charges, no subscription paywalls, no file watermarks, and no registration required. You can convert, merge, and protect as many files as you need.',
  },
  {
    question: 'Is my PDF file safe and private?',
    answer: 'Yes. Supported PDF tools process your files directly inside your web browser using client-side JavaScript and WebAssembly (such as pdf-lib and PDF.js). Your confidential files are never uploaded to ConvertAllNow servers or stored in any remote database.',
  },
  {
    question: 'Can I merge more than two PDF files at once?',
    answer: 'Yes! Our Merge PDF tool allows you to combine dozens of PDF documents at once. You can freely drag and drop thumbnails to reorder pages and files before merging them into a single final document.',
  },
  {
    question: 'What is the maximum file size supported for PDF conversions?',
    answer: 'Because processing happens entirely within your web browser, the maximum file size depends solely on your device’s available RAM memory. Most modern laptops and smartphones comfortably process PDFs of 100MB to 500MB without issue.',
  },
  {
    question: 'Can I convert scanned PDF documents to Word?',
    answer: 'Our PDF to Word converter accurately converts text-based digital PDFs to editable DOCX files. For image-only or flat scanned documents, an OCR (Optical Character Recognition) tool is required.',
  },
  {
    question: 'Do ConvertAllNow PDF tools work on mobile phones?',
    answer: 'Yes. All tools are fully responsive and run seamlessly on iOS (iPhone/iPad Safari) and Android (Chrome/Firefox/Samsung Internet) without installing any mobile app or software.',
  },
  {
    question: 'How does password protection work on PDF documents?',
    answer: 'Our Protect PDF tool applies standard PDF encryption using your chosen password. Only individuals who enter the correct password will be able to view, copy, or print the document.',
  },
  {
    question: 'Can I unlock a password-protected PDF?',
    answer: 'Yes. If you have legitimate access to the password of a secured PDF, our Unlock PDF tool removes the encryption wrapper so you can save a permanent, unlocked version for easier archiving and sharing.',
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
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const tHub = await getTranslations({ locale, namespace: 'CategoryHubs' });
  const title = tHub('pdfTitle');
  const heading = tHub('pdfHeading');
  const subtitle = tHub('pdfSubtitle');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'PDF Tools', href: '/pdf-tools' },
  ];
  const relatedTools = RELATED_TOOLS['pdf-tools'] || [];

  return (
    <>
      
      <HowToSchema name={`How to ${title}`} description={description} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={description} path="/pdf-tools" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="bg-gradient-to-b from-red-50/40 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          <VisualBreadcrumb items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl shadow-sm mb-2">
              <DocumentTextIcon className="w-9 h-9" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {heading}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Section 1: Popular PDF Tools */}
          <section className="space-y-6" aria-labelledby="popular-pdf-tools">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <SparklesIcon className="w-6 h-6 text-red-500" />
              <h2 id="popular-pdf-tools" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('pdfPopularTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {POPULAR_TOOLS.map((tool) => (
                <Link
                  key={tool.path + tool.name}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-red-500/50 dark:hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/5 dark:hover:shadow-red-500/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {tool.name}
                      </h3>
                      {tool.badge && (
                        <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-normal">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                    <span>Open Tool</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 2: Convert PDF Files */}
          <section className="space-y-6" aria-labelledby="convert-pdf-files">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <ArrowsRightLeftIcon className="w-6 h-6 text-red-500" />
              <h2 id="convert-pdf-files" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('pdfConvertTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {CONVERT_TOOLS.map((tool) => (
                <Link
                  key={tool.path + tool.name}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-red-500/50 dark:hover:border-red-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-normal">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                    <span>Convert Now</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: Manage & Organize PDFs */}
          <section className="space-y-6" aria-labelledby="manage-pdf-files">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <FolderIcon className="w-6 h-6 text-red-500" />
              <h2 id="manage-pdf-files" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('pdfManageTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {ORGANIZE_TOOLS.map((tool) => (
                <Link
                  key={tool.path + tool.name}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-red-500/50 dark:hover:border-red-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {tool.name}
                      </h3>
                      {tool.badge && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-normal">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                    <span>Manage Document</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 4: Protect PDF Documents */}
          <section className="space-y-6" aria-labelledby="protect-pdf-documents">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <LockClosedIcon className="w-6 h-6 text-red-500" />
              <h2 id="protect-pdf-documents" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('pdfProtectTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SECURITY_TOOLS.map((tool) => (
                <Link
                  key={tool.path + tool.name}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-red-500/50 dark:hover:border-red-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                    <span>Configure Security</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 5: Why Use ConvertAllNow PDF Tools? */}
          <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 sm:p-10 space-y-8" aria-labelledby="why-convertallnow-pdf">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 id="why-convertallnow-pdf" className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                {tHub('pdfWhyTitle')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Designed from the ground up for privacy, speed, and zero friction.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/40 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Private by Design</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Supported tools process your files directly in your web browser. No remote servers ever receive your documents.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/40 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <BoltIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Fast In-Browser Speed</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Instant processing without upload queues or download waiting times. Powered by modern client WebAssembly.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/40 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">100% Free & No Signup</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  No subscriptions, no watermarks, no account registration, and no credit card required. Pure utility.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/40 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <DevicePhoneMobileIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Works on Any Device</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Fully responsive interface engineered to run smoothly on desktop browsers, Mac, Windows, Linux, iOS, and Android.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Privacy & Local Browser Processing */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6" aria-labelledby="pdf-privacy-breakdown">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-2xl">
                <ShieldExclamationIcon className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <h2 id="pdf-privacy-breakdown" className="text-2xl font-bold text-white">
                  {tHub('pdfPrivacyTitle')}
                </h2>
                <p className="text-gray-300 text-sm">
                  Why browser-based PDF processing offers superior document confidentiality.
                </p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                Unlike traditional online converter services that require you to upload confidential contracts, tax returns, medical files, or bank statements to cloud servers, ConvertAllNow executes supported PDF operations directly inside your web browser.
              </p>
              <p>
                When you select a file in our <Link href="/merge-pdf" className="text-red-400 hover:underline">Merge PDF</Link>, <Link href="/pdf-to-jpg" className="text-red-400 hover:underline">PDF to JPG</Link>, or <Link href="/image-to-pdf" className="text-red-400 hover:underline">Image to PDF</Link> tools, the file data remains inside your browser’s local sandbox memory. Open-source libraries such as <code className="text-red-300 bg-red-950/60 px-1.5 py-0.5 rounded">pdf-lib</code> and <code className="text-red-300 bg-red-950/60 px-1.5 py-0.5 rounded">PDF.js</code> compile and render the document without transmitting any bytes across the network.
              </p>
              <p>
                Once you finish your work and close the browser tab, the temporary memory buffer is automatically destroyed by your browser. No cookies track your file contents, no server logs record your document data, and no third-party cloud ever has access to your intellectual property.
              </p>
            </div>
          </section>

          {/* Section 7: FAQs */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Frequently Asked Questions About PDF Tools
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
      </ToolLayoutWithAds>
    </>
  );
}

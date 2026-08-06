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
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const tHub = await getTranslations({ locale, namespace: 'CategoryHubs' });

  const getT = (text: string) => {
    if (!text) return text;
    const key = text.replace(/\./g, '_');
    try {
      if (tHub.has(key)) return tHub(key);
      if (tHub.has(text)) return tHub(text);
    } catch {}
    return text;
  };

  // Group archive tools
  const organizeTools = CATEGORY_TOOLS.archive.slice(0, 8);
  const convertToZip = CATEGORY_TOOLS.archive.slice(8);

  
const faqs = [
  { question: 'Is this tool free to use?', answer: 'Yes, this tool is 100% free with no hidden fees or signups required.' },
  { question: 'Are my files uploaded to a server?', answer: 'No. All processing happens locally in your web browser. Your files never leave your device, ensuring total privacy.' },
  { question: 'Is there a file size limit?', answer: 'Since processing happens in your browser, the limit depends on your device RAM, usually supporting files up to several hundred megabytes.' },
  { question: 'Does this work on mobile devices?', answer: 'Yes! The tool works seamlessly on both desktop and mobile browsers.' },
  { question: 'What browsers are supported?', answer: 'We support all modern browsers including Chrome, Safari, Firefox, and Edge.' },
];

const howToSteps = [
  { name: 'Upload File', text: 'Select or drag and drop your file into the tool.' },
  { name: 'Process', text: 'Click the action button to begin processing. Wait a few moments.' },
  { name: 'Download', text: 'Once completed, download your newly processed file directly to your device.' },
];

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Archive Tools', href: '/archive-tools' },
  ];
  const relatedTools = RELATED_TOOLS['archive-tools'] || [];

  return (
    <>
      
      <HowToSchema name={`How to ${title}`} description={description} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={description} path="/archive-tools" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="Online Tools"
        categoryPath="/"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 pb-6">
            {CATEGORY_TOOLS.archive?.map((tool) => (
              <Link
                key={tool.path}
                href={tool.path}
                className="group p-6 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {getT(tool.name)}
                    </h3>
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 transition-all duration-300">
                      →
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {getT(tool.desc)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <ToolContentSection
            toolName={title}
            introduction={
              <>
                <p>
                  {title} is a free online tool to process your files securely in your browser. Our tool ensures your data remains private while delivering fast results. No installation or registration is required.
                </p>
                <p className="mt-3">
                  This tool operates entirely on your device using advanced web technologies. This means your files are never uploaded to our servers, eliminating privacy risks and avoiding file size limits typically imposed by cloud services.
                </p>
              </>
            }
            features={[
              { title: '100% Free & Unlimited', description: 'Use the tool as many times as you want without any restrictions or fees.' },
              { title: 'Private & Secure', description: 'All processing happens locally in your browser. Your files never leave your device.' },
              { title: 'No Installation', description: 'Works directly in Chrome, Safari, Firefox, and Edge on any device.' },
              { title: 'Fast Processing', description: 'Leverages your device\'s hardware for near-instant results.' },
            ]}
            howToSteps={howToSteps}
            faqs={faqs}
            supportedFormats="Supports all standard formats."
            privacyNote="Your files are completely safe. All processing happens in your browser and files are never uploaded to any server."
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
}

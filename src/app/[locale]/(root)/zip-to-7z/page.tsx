import ArchiveConverter from '@/components/sections/ArchiveConverter';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import ToolContentSection from '@/components/sections/ToolContentSection';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, RELATED_TOOLS } from '@/lib/seo';

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
  const title = PAGE_TITLE;
  const description = PAGE_DESCRIPTION;

  
  


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
    { name: 'Zip To 7z', href: '/zip-to-7z' },
  ];
  const relatedTools = RELATED_TOOLS['zip-to-7z'] || [];

  return (
    <>
      
      <HowToSchema name={`How to ${title}`} description={description} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={description} path="/zip-to-7z" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="Archive Tools"
        categoryPath="/archive-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <ArchiveConverter />
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

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
import { getTranslations } from 'next-intl/server';
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
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });
  const title = `ZIP to 7Z Converter - Free Online Archive Tool | ConvertAllNow`;
  const description = PAGE_DESCRIPTION;

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
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });
  const tCommon = await getTranslations({ locale, namespace: 'CommonContent' });
  const translatedName = tNav('ZIP to 7Z');
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
  { question: tCommon('faq1Q'), answer: tCommon('faq1A') },
  { question: tCommon('faq2Q'), answer: tCommon('faq2A') },
  { question: tCommon('faq3Q'), answer: tCommon('faq3A') },
  { question: tCommon('faq4Q'), answer: tCommon('faq4A') },
  { question: tCommon('faq5Q'), answer: tCommon('faq5A') },
];

const howToSteps = [
  { name: tCommon('step1Name'), text: tCommon('step1Text') },
  { name: tCommon('step2Name'), text: tCommon('step2Text') },
  { name: tCommon('step3Name'), text: tCommon('step3Text') },
];

  const breadcrumbItems = [
    { name: tCommon('crumbHome'), href: '/' },
    { name: tNav('Archive Tools'), href: '/archive-tools' },
    { name: translatedName, href: `/${SLUG}` },
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
            toolName={translatedName}
            introduction={
              <>
                <p>
                  {tCommon('intro1', { toolName: translatedName })}
                </p>
                <p className="mt-3">
                  {tCommon('intro2')}
                </p>
              </>
            }
            features={[
              { title: 'Browser-Based Conversion', description: 'Convert files directly in your browser without uploading to any server.' },
              { title: 'High Compression Ratio', description: '7Z format provides superior compression compared to ZIP.' },
              { title: 'Fast Processing', description: 'Powered by WebAssembly for near-native performance.' },
              { title: 'Completely Free', description: 'No registration, no limits, totally free to use.' },
            ]}
            howToSteps={howToSteps}
            faqs={faqs}
            supportedFormats={tCommon('supportedFmt')}
            privacyNote={tCommon('privacyNote')}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
}

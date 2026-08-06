import DataFormatter from '@/components/sections/DataFormatter';
import ExploreOtherTools from '@/components/sections/ExploreOtherTools';
import AdsenseAd from '@/components/AdsenseAd';
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = "Free Online Data Formatter & Converter - JSON, XML, YAML, CSV | ConvertAllNow";
  const description = "Beautify, minify, validate, and convert between JSON, XML, YAML, and CSV formats instantly inside your browser with zero server uploads.";

  return {
    title,
    description,
    keywords: ["data formatter", "json formatter online", "xml beautifier", "yaml to json converter", "csv to json", "in browser code formatter", "private syntax validator"],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/data-formatter'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@convertallnow",
      site: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/data-formatter'),
      languages: getAlternateLanguages('/data-formatter'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;
  const title = "Data Formatter & Converter";
  const description = "Pro in-browser utility to format, minify, validate, and convert between JSON, XML, YAML, and CSV data structures securely.";

  const schemaData = createToolSchema({
    name: title,
    description: description,
    path: '/data-formatter',
    locale,
    featureList: ['Format and beautify JSON, XML, YAML, and CSV data', 'Real-time syntax validation with error reporting', 'Convert across file formats (JSON to YAML, CSV to JSON, etc.)', '100% Client-side browser execution with zero uploads'],
    screenshot: '/images/og-default.png',
  });

  
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
    { name: 'Data Formatter', href: '/data-formatter' },
  ];
  const relatedTools = RELATED_TOOLS['data-formatter'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${title}`} description={description} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={description} path="/data-formatter" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="Online Tools"
        categoryPath="/"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <DataFormatter />
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
};

export default Page;

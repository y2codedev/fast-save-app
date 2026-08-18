import HowToSchema from '@/components/seo/HowToSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import ToolContentSection from '@/components/sections/ToolContentSection';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import ImageConverter from '@/components/sections/ImageConverter';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageConverterSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['photo'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/photo'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/photo-converter.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/photo-converter.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/photo'),
      languages: getAlternateLanguages('/photo'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const t = await getTranslations({ locale, namespace: 'ImageConverterSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/photo', locale,
    featureList: ['Convert PNG to JPG', 'Convert JPG to WebP', 'SVG to PNG', 'Batch image conversion'],
    screenshot: '/images/photo-converter.png',
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
    { name: 'Image Tools', href: '/image-tools' },
    { name: 'Image Converter', href: '/photo' },
  ];
  const relatedTools = RELATED_TOOLS['photo'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/photo" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="Image Tools"
        categoryPath="/image-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <ImageConverter />
          <ToolContentSection
            toolName={t('title')}
            introduction={
              <>
                <p>
                  The Photo Utilities collection is designed for quick, everyday enhancements and manipulations of your photographs. Whether you need to quickly resize an image for a passport application, crop a photo for a profile picture, or apply a quick filter, these tools are built for speed and simplicity.
                </p>
                <p className="mt-3">
                  All photo processing relies on your device's native browser capabilities. This ensures that your personal memories and sensitive photographs are kept strictly on your device. Enjoy the convenience of cloud-like tools with the security of offline software.
                </p>
              </>
            }
            features={[
              { title: "Quick Enhancements", description: "Apply standard fixes and filters in just a few clicks." },
              { title: "No Registration", description: "Access all photo tools immediately without making an account." },
              { title: "100% Private", description: "Your personal photos are never transmitted over the internet." },
              { title: "Mobile Friendly", description: "Perfectly optimized for quick edits on smartphones and tablets." },
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
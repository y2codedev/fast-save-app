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
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import VideoToGifConverter from '@/components/sections/VideoToGifConverter';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VideoToGifSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['video-to-gif'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/video-to-gif'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/video-to-gif.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/video-to-gif.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/video-to-gif'),
      languages: getAlternateLanguages('/video-to-gif'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const t = await getTranslations({ locale, namespace: 'VideoToGifSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/video-to-gif', locale,
    featureList: ['Video to animated GIF', 'Custom start/end time', 'Adjustable frame rate', 'Browser-based conversion'],
    screenshot: '/images/video-to-gif.png',
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
    { name: 'Video & Audio Tools', href: '/video-tools' },
    { name: 'Video to GIF', href: '/video-to-gif' },
  ];
  const relatedTools = RELATED_TOOLS['video-to-gif'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/video-to-gif" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="Video & Audio Tools"
        categoryPath="/video-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <VideoToGifConverter />
          <ToolContentSection
            toolName={t('title')}
            introduction={
              <>
                <p>
                  Video to GIF Converter allows you to extract segments from your video files and turn them into high-quality, looping animated GIFs. Whether you are creating reaction memes, social media content, or demonstrating a software feature for a tutorial, this tool provides precise control over the GIF creation process.
                </p>
                <p className="mt-3">
                  Powered by FFmpeg compiled to WebAssembly, the entire conversion happens on your local device. You can set the frame rate (FPS), adjust the resolution, and select exact start and end times to ensure the resulting GIF is optimized for the web without requiring any server uploads.
                </p>
              </>
            }
            features={[
              { title: "FFmpeg Powered", description: "Uses industry-standard FFmpeg for high-quality palette generation." },
              { title: "Custom Frame Rate", description: "Adjust FPS to balance smooth animation with file size." },
              { title: "Total Privacy", description: "Your personal videos are never uploaded; processing is 100% local." },
              { title: "Resolution Control", description: "Scale down videos to create lightweight, web-friendly GIFs." },
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
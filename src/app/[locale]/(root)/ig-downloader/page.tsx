import TopText from '@/components/sections/TopText';
import DownloadForm from '@/components/sections/DownloadForm';
import DownloadSteps from '@/components/sections/DownloadSteps';
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
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IgDownloaderSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['ig-downloader'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/ig-downloader'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: "/images/insta.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image", title, description,
      images: ["/images/insta.png"],
      site: "@convertallnow", creator: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/ig-downloader'),
      languages: getAlternateLanguages('/ig-downloader'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  
  const t = await getTranslations({ locale, namespace: 'IgDownloaderSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/ig-downloader', locale,
    featureList: ['Download Instagram Reels in HD', 'No watermark', 'No login required', 'Fast processing'],
    screenshot: '/images/insta.png',
  });

  const faqs = [
    { question: 'Is this tool free to use?', answer: 'Yes, this tool is 100% free with no hidden fees or signups required.' },
    { question: 'Are my files uploaded to a server?', answer: 'No. All processing happens locally in your web browser. Your files never leave your device, ensuring total privacy.' },
    { question: 'Is there a file size limit?', answer: 'Since processing happens in your browser, the limit depends on your device RAM, usually supporting files up to several hundred megabytes.' },
    { question: 'Does this work on mobile devices?', answer: 'Yes! The tool works seamlessly on both desktop and mobile browsers.' },
    { question: 'What browsers are supported?', answer: 'We support all modern browsers including Chrome, Safari, Firefox, and Edge.' },
  ];

  const howToSteps = [
    { name: t('step1Name'), text: t('step1Text') },
    { name: t('step2Name'), text: t('step2Text') },
    { name: t('step3Name'), text: t('step3Text') },
    { name: t('step4Name'), text: t('step4Text') },
    { name: t('step5Name'), text: t('step5Text') },
  ];

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Video & Audio Tools', href: '/video-tools' },
    { name: 'IG Downloader', href: '/ig-downloader' },
  ];
  
  const relatedTools = RELATED_TOOLS['ig-downloader'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/ig-downloader" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="Video & Audio Tools"
        categoryPath="/video-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <TopText />
          <DownloadForm />
          <DownloadSteps />
          <ToolContentSection
            toolName={t('title')}
            introduction={
              <>
                <p>
                  Instagram Downloader is a fast, reliable utility designed to help you save Instagram Reels, Videos, and Photos directly to your device in original high definition. When you find inspiring content, educational reels, or memorable photos on Instagram, our tool allows you to archive them locally for offline viewing.
                </p>
                <p className="mt-3">
                  Unlike many downloaders that compress files or add intrusive watermarks, we extract the direct media URL provided by Instagram's public servers, ensuring you receive the exact, unmodified file. Please ensure you only download public content and respect the copyright of the original creators.
                </p>
              </>
            }
            features={[
              { title: "Original Quality", description: "Downloads media in the highest available resolution." },
              { title: "No Watermarks", description: "Saves clean videos and photos without added logos." },
              { title: "Fast Extraction", description: "Quickly processes public Instagram URLs to fetch media links." },
              { title: "Multi-Format", description: "Supports downloading both MP4 videos and JPG photos." },
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

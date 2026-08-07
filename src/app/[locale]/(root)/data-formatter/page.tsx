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
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'DataFormatter' });
  const title = t("seoTitle");
  const description = t("seoDesc");

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
      images: [{ url: '/images/data-formatter.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ['/images/data-formatter.png'],
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
  const t = await getTranslations({ locale, namespace: 'DataFormatter' });
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;
  const title = t("h1");
  const description = t("h2");

  const schemaData = createToolSchema({
    name: title,
    description: description,
    path: '/data-formatter',
    locale,
    featureList: ['Format and beautify JSON, XML, YAML, and CSV data', 'Real-time syntax validation with error reporting', 'Convert across file formats (JSON to YAML, CSV to JSON, etc.)', '100% Client-side browser execution with zero uploads'],
    screenshot: '/images/og-default.png',
  });

  
const faqs = [
  { question: t('faq1Q'), answer: t('faq1A') },
  { question: t('faq2Q'), answer: t('faq2A') },
  { question: t('faq3Q'), answer: t('faq3A') },
  { question: t('faq4Q'), answer: t('faq4A') },
  { question: t('faq5Q'), answer: t('faq5A') },
];

const howToSteps = [
  { name: t('step1Name'), text: t('step1Text') },
  { name: t('step2Name'), text: t('step2Text') },
  { name: t('step3Name'), text: t('step3Text') },
];

  const breadcrumbItems = [
    { name: t('crumbHome'), href: '/' },
    { name: t('crumbTool'), href: '/data-formatter' },
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
                  {t("intro1")}
                </p>
                <p className="mt-3">
                  {t("intro2")}
                </p>
              </>
            }
            features={[
              { title: t('feat1Title'), description: t('feat1Desc') },
              { title: t('feat2Title'), description: t('feat2Desc') },
              { title: t('feat3Title'), description: t('feat3Desc') },
              { title: t('feat4Title'), description: t('feat4Desc') },
            ]}
            howToSteps={howToSteps}
            faqs={faqs}
            supportedFormats={t("supportedFmt")}
            privacyNote={t("privacyNote")}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

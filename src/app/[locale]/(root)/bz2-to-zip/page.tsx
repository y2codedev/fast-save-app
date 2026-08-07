import ZipToolConverter from '@/components/sections/ZipToolConverter';
import { ZIP_TOOL_CONFIGS } from '@/lib/zip-tools';
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

const SLUG = 'bz2-to-zip';
const config = ZIP_TOOL_CONFIGS[SLUG];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });
  const translatedName = tNav(config.toolName) || config.toolName;
  const translatedDesc = tNav(config.description) || config.description;
  const title = `${translatedName} - Free Online Archive Tool | ConvertAllNow`;
  const description = translatedDesc;

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS[SLUG],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, `/${SLUG}`),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [{ url: '/images/zip-tools.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@convertallnow',
      site: '@convertallnow',
      images: ['/images/zip-tools.png'],
    },
    alternates: {
      canonical: getCanonicalUrl(locale, `/${SLUG}`),
      languages: getAlternateLanguages(`/${SLUG}`),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });
  const tCommon = await getTranslations({ locale, namespace: 'CommonContent' });
  const translatedName = tNav(config.toolName) || config.toolName;
  const translatedDesc = tNav(config.description) || config.description;
  const title = typeof config !== "undefined" && config.toolName ? `${translatedName} Converter` : "Online Tool";
  const description = typeof config !== "undefined" && config.description ? translatedDesc : "Free online tool.";

  
  


  const schemaData = createToolSchema({
    name: `${config.toolName} Converter - Free Online Tool`,
    description: config.description,
    path: `/${SLUG}`,
    locale,
    featureList: [`Convert ${config.fromFormat} to ${config.toFormat}`, 'Browser-based processing', 'No file upload to server', 'Free online tool'],
  });

  
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
  const relatedTools = RELATED_TOOLS['bz2-to-zip'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${title}`} description={description} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={description} path="/bz2-to-zip" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="Archive Tools"
        categoryPath="/archive-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          
          <ZipToolConverter slug={SLUG} />
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
              { title: tCommon('feat1Title'), description: tCommon('feat1Desc') },
              { title: tCommon('feat2Title'), description: tCommon('feat2Desc') },
              { title: tCommon('feat3Title'), description: tCommon('feat3Desc') },
              { title: tCommon('feat4Title'), description: tCommon('feat4Desc') },
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
};

export default Page;

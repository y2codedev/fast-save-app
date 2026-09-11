import UnlockPdf from '@/components/sections/UnlockPdf';
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
  const t = await getTranslations({ locale, namespace: 'UnlockPdfSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['unlock-pdf'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/unlock-pdf'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/unlock-pdf.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/unlock-pdf.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/unlock-pdf'),
      languages: getAlternateLanguages('/unlock-pdf'),
    },
  };
}

const getFAQs = (t: any) => [
  { question: t('faq1Q'), answer: t('faq1A') },
  { question: t('faq2Q'), answer: t('faq2A') },
  { question: t('faq3Q'), answer: t('faq3A') },
  { question: t('faq4Q'), answer: t('faq4A') },
  { question: t('faq5Q'), answer: t('faq5A') },
  { question: t('faq6Q'), answer: t('faq6A') },
  { question: t('faq7Q'), answer: t('faq7A') },
];

const getHowToSteps = (t: any) => [
  { name: t('step1Name'), text: t('step1Text') },
  { name: t('step2Name'), text: t('step2Text') },
  { name: t('step3Name'), text: t('step3Text') },
  { name: t('step4Name'), text: t('step4Text') },
];

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;


  
  const t = await getTranslations({ locale, namespace: 'UnlockPdfSEO' });
  const title = t('title');
  const description = t('description');

  const faqs = getFAQs(t);
  const howToSteps = getHowToSteps(t);

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/unlock-pdf', locale,
    featureList: ['Remove PDF restrictions', 'Browser-based processing', 'No file upload', 'Supports RC4 and AES encryption'],
    screenshot: '/images/unlock-pdf.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'PDF Tools', href: '/pdf-tools' },
    { name: 'Unlock PDF' },
  ];

  const relatedTools = RELATED_TOOLS['unlock-pdf'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={getHowToSteps(t)} totalTime="PT1M" />
      <FAQSchema faqs={getFAQs(t)} />
      <WebPageSchema title={t('title')} description={t('description')} path="/unlock-pdf" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related PDF Tools"
        categoryName="PDF Tools"
        categoryPath="/pdf-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems.slice(1)} />
          <UnlockPdf />
          <ToolContentSection
            toolName="Unlock PDF"
            introduction={
              <>
                <p>
                  Unlock PDF is a specialized client-side tool designed to remove passwords and access restrictions from your PDF documents. If you have the password but are tired of entering it every time you open a document, this tool will strip the security layer and give you a clean, accessible file.
                </p>
                <p className="mt-3">
                  Security is paramount when dealing with encrypted files. That's why our unlocker runs entirely in your web browser. You enter your password locally, the file is decrypted locally, and the new unlocked PDF is generated on your device. We never see your password or your file contents.
                </p>
              </>
            }
            features={[
              { title: 'Removes Password Protection', description: 'Permanently removes the need to enter a password to view.' },
              { title: 'Removes Restrictions', description: 'Unlocks printing, copying, and editing restrictions.' },
              { title: 'Absolute Privacy', description: 'Your password and document never leave your computer.' },
              { title: 'Instant Decryption', description: 'Uses local hardware for lightning-fast file unlocking.' },
            ]}
            howToSteps={getHowToSteps(t)}
            useCases={[
              'Unlocking PDFs you own to enable printing at a print shop',
              'Removing copy restrictions to extract quotes from research PDFs',
              'Recovering access to old archived documents with forgotten passwords',
              'Removing editing restrictions to annotate or fill forms',
              'Batch unlocking multiple PDFs for archival or migration purposes',
            ]}
            supportedFormats={['PDF (RC4 40-bit)', 'PDF (RC4 128-bit)', 'PDF (AES 128-bit)', 'PDF 1.4', 'PDF 1.5', 'PDF 1.6', 'PDF 1.7']}
            privacyNote="PDF unlocking is performed entirely in your browser. No PDF data is transmitted to our servers. Your documents remain completely private on your local device throughout the process."
            tips={[
              'For PDFs requiring an open password, have the correct password ready before starting.',
              'If the PDF cannot be unlocked, it may use 256-bit AES encryption which requires the correct owner password.',
              'After unlocking, consider saving with a new password if you need to maintain some security.',
              'Use our Protect PDF tool to add a new password once you\'ve made your edits.',
            ]}
            faqs={getFAQs(t)}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

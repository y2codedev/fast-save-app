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
  const title = "Online Tool";
  const description = "Free online tool.";
  
  const t = await getTranslations({ locale, namespace: 'UnlockPdfSEO' });

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
                  Unlock PDF is a free online tool that removes password protection and editing/printing restrictions from PDF files, directly in your web browser. Whether a PDF you own is preventing you from printing, copying text, or editing content, our tool restores full access without any software installation or file uploads.
                </p>
                <p className="mt-3">
                  PDF security comes in two forms: user passwords (required to open the PDF) and owner restrictions (permissions that prevent printing, copying, or editing). Our tool handles both scenarios. For PDFs with owner restrictions, removal is automatic. For PDFs with a user/open password, you'll need to enter the correct password — after which all restrictions can be removed.
                </p>
                <p className="mt-3">
                  All unlocking is performed locally in your browser using JavaScript. Your PDF files never leave your device. This is particularly important for sensitive documents such as legal contracts, financial statements, or confidential business reports. After unlocking, you can then <strong><a href="/protect-pdf" className="text-indigo-600 dark:text-indigo-400 hover:underline">re-protect with a new password</a></strong> or <strong><a href="/pdf-to-docx" className="text-indigo-600 dark:text-indigo-400 hover:underline">convert to an editable Word document</a></strong>.
                </p>
              </>
            }
            features={[
              { title: 'Removes Printing Restrictions', description: 'Restore the ability to print PDFs that have printing disabled.' },
              { title: 'Removes Copy Restrictions', description: 'Enable text selection and copying from restricted PDFs.' },
              { title: 'Removes Edit Restrictions', description: 'Allow editing and annotation of restricted PDF documents.' },
              { title: 'Browser-Based', description: 'All processing is local — files never leave your device.' },
              { title: 'Multiple Encryption Support', description: 'Handles RC4 (40-bit, 128-bit) and AES (128-bit) encryption.' },
              { title: 'Content Preserved', description: 'Only restrictions removed — all content stays identical.' },
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

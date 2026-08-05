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

const faqs = [
  { question: 'What types of PDF restrictions can be removed?', answer: 'We can remove owner restrictions such as printing restrictions, copying restrictions, and editing restrictions. User password (open password) removal requires knowing the original password.' },
  { question: 'Is Unlock PDF legal to use?', answer: 'This tool is intended for use on PDFs you own or have legal permission to access. Removing restrictions from PDFs you don\'t own may violate copyright law or terms of service.' },
  { question: 'Can I unlock a PDF without knowing the password?', answer: 'If the PDF has an owner restriction (permission password), we can remove those restrictions. If it has a user password (open password) — required to open the file — you must know it to unlock.' },
  { question: 'Are my PDF files uploaded to a server?', answer: 'No. All unlocking is performed locally in your browser. Your PDF files never leave your device.' },
  { question: 'What encryption standards are supported?', answer: 'The tool supports 40-bit RC4, 128-bit RC4, and 128-bit AES encrypted PDFs. 256-bit AES encrypted PDFs may require the correct password.' },
  { question: 'Will unlocking change the PDF content?', answer: 'No. Only the security restrictions are removed. All text, images, formatting, and pages remain exactly as in the original.' },
  { question: 'Why can\'t I print or copy text from my PDF?', answer: 'The PDF creator may have applied printing and copying restrictions (owner permissions). Our Unlock PDF tool removes these restrictions while preserving all content.' },
];

const howToSteps = [
  { name: 'Upload PDF', text: 'Click the upload area or drag and drop your password-protected PDF.' },
  { name: 'Enter Password (if needed)', text: 'If the PDF requires a password to open, enter it in the field provided.' },
  { name: 'Unlock', text: 'Click "Unlock PDF". Security restrictions are removed using client-side JavaScript.' },
  { name: 'Download Unlocked PDF', text: 'Download the unlocked PDF — now printable, copyable, and editable.' },
];

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'UnlockPdfSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/unlock-pdf', locale,
    featureList: ['Remove PDF restrictions', 'Browser-based processing', 'No file upload', 'Supports RC4 and AES encryption'],
    screenshot: '/images/unlock-pdf.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'PDF Tools', href: '/pdf-tools' },
    { name: t('title') },
  ];

  const relatedTools = RELATED_TOOLS['unlock-pdf'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
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
            howToSteps={howToSteps}
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
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

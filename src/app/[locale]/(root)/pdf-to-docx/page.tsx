import PdfToDocxConverter from '@/components/sections/PdfToDocxConverter';
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
  const t = await getTranslations({ locale, namespace: 'PdfToDocxSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS['pdf-to-docx'],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/pdf-to-docx'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [
        {
          url: "/images/pdf-to-docx.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/pdf-to-docx.png"],
      creator: "@convertallnow",
      site: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/pdf-to-docx'),
      languages: getAlternateLanguages('/pdf-to-docx'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;


  
  

  const t = await getTranslations({ locale, namespace: 'PdfToDocxSEO' });
  const title = t('title');
  const description = t('description');

  const schemaData = createToolSchema({
    name: t('title'),
    description: t('description'),
    path: '/pdf-to-docx',
    locale,
    featureList: ['Convert PDF to editable Word document', 'Preserve layout and images', 'Browser-based local conversion', 'No watermarks'],
    screenshot: '/images/pdf-to-docx.png',
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
    { name: 'PDF Tools', href: '/pdf-tools' },
    { name: 'PDF to Word', href: '/pdf-to-docx' },
  ];
  const relatedTools = RELATED_TOOLS['pdf-to-docx'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/pdf-to-docx" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="PDF Tools"
        categoryPath="/pdf-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <PdfToDocxConverter />
          <ToolContentSection
            toolName="PDF to Word Converter"
            introduction={
              <>
                <p>
                  PDF to Word Converter converts text-based PDF documents into editable Microsoft Word (.docx) files directly in your web browser. It extracts paragraphs, headings, and text content while attempting to preserve basic document structure where supported.
                </p>
                <p className="mt-3">
                  All conversion logic runs client-side on your device without transmitting documents across external servers. Please note: this tool is engineered for digital, text-based PDF files. Scanned, flattened paper documents require dedicated Optical Character Recognition (OCR) to reconstruct editable text.
                </p>
              </>
            }
            features={[
              { title: 'Editable DOCX Output', description: 'Converts text-based PDF pages into standard Word documents you can open in Microsoft Word, Google Docs, or LibreOffice.' },
              { title: 'Local In-Browser Conversion', description: 'Documents are processed locally on your device — confidential agreements and records never upload to cloud servers.' },
              { title: 'No Installation or Sign-Up', description: 'Works instantly on desktop and mobile web browsers without software downloads or registration.' },
              { title: 'Free to Use', description: 'No hidden paywalls, document limits, or watermarks added to your output.' },
            ]}
            howToSteps={howToSteps}
            faqs={faqs}
            supportedFormats={['PDF (Text-based)', 'Outputs DOCX']}
            relatedLinks={[
              { label: 'Convert Word DOCX back to PDF', href: '/word-to-pdf', context: 'Need to convert your edited Word file back into a PDF?' },
              { label: 'Merge multiple PDFs together', href: '/merge-pdf', context: 'Want to combine multiple documents before converting?' },
              { label: 'Extract PDF pages as images', href: '/pdf-to-jpg', context: 'Need individual pages as images instead of Word text?' },
            ]}
            privacyNote="Your files remain private. Document parsing and DOCX generation happen entirely within your browser."
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

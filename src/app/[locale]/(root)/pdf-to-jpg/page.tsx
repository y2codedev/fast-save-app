import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import ToolContentSection from '@/components/sections/ToolContentSection';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import PdfToJpg from '@/components/sections/PdfToJpg';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PdfToJpgSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['pdf-to-jpg'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/pdf-to-jpg'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/pdf-to-jpg.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/pdf-to-jpg.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/pdf-to-jpg'),
      languages: getAlternateLanguages('/pdf-to-jpg'),
    },
  };
}

const faqs = [
  { question: 'Can I extract all pages from a PDF as separate JPGs?', answer: 'Yes! Our PDF to JPG tool extracts every page from your PDF as an individual high-resolution JPG image, which you can download together as a ZIP.' },
  { question: 'What resolution will the exported images be?', answer: 'Exported images are high-resolution — typically 150-300 DPI, suitable for presentations, printing, or web use. Resolution settings may vary by tool version.' },
  { question: 'Does the tool support password-protected PDFs?', answer: 'For password-protected PDFs, first use our Unlock PDF tool to remove the password, then convert to JPG.' },
  { question: 'Can I convert PDF to PNG instead of JPG?', answer: 'Yes. PNG output preserves transparency and is ideal for PDFs with complex graphics. JPG is better for photos and general use due to smaller file sizes.' },
  { question: 'Are my PDF files uploaded to a server?', answer: 'No. PDF rendering and conversion happens entirely in your browser using PDF.js. Your files never leave your device.' },
  { question: 'Can I select specific pages to convert?', answer: 'Yes, you can choose to convert all pages, a specific page range, or individual pages from your PDF.' },
  { question: 'How do I convert PDF to JPG on iPhone or Android?', answer: 'Open this page in Chrome or Safari on your mobile device, upload the PDF, and download the JPG images directly to your phone.' },
];

const howToSteps = [
  { name: 'Upload PDF', text: 'Click the upload area or drag and drop your PDF file. Password-protected PDFs must be unlocked first.' },
  { name: 'Select Pages', text: 'Choose to convert all pages, a specific range, or individual pages.' },
  { name: 'Convert to JPG', text: 'Click "Convert". Each PDF page is rendered and saved as a high-quality JPG image.' },
  { name: 'Download Images', text: 'Download all images as a ZIP archive, or save individual page images.' },
];

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const t = await getTranslations({ locale, namespace: 'PdfToJpgSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/pdf-to-jpg', locale,
    featureList: ['Convert all PDF pages to JPG', 'High resolution output', 'Browser-based PDF.js', 'No file upload'],
    screenshot: '/images/pdf-to-jpg.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'PDF Tools', href: '/pdf-tools' },
    { name: 'PDF To JPG' },
  ];

  const relatedTools = RELATED_TOOLS['pdf-to-jpg'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/pdf-to-jpg" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related PDF Tools"
        categoryName="PDF Tools"
        categoryPath="/pdf-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems.slice(1)} />
          <PdfToJpg />
          <ToolContentSection
            toolName="PDF to JPG Converter"
            introduction={
              <>
                <p>
                  PDF to JPG Converter allows you to instantly extract pages from any PDF document and save them as high-quality JPG images. This is incredibly useful when you need to share a specific page on social media, insert a document into a presentation, or bypass systems that don't accept PDF uploads.
                </p>
                <p className="mt-3">
                  Our tool utilizes advanced client-side rendering (PDF.js) to draw each page of your document directly onto an HTML canvas, which is then saved as a JPG. Since the rendering happens entirely on your GPU/CPU, it is extremely fast and completely private. No documents are uploaded to any server.
                </p>
              </>
            }
            features={[
              { title: 'High-Quality Rendering', description: 'Produces crisp, clear JPG images of your PDF pages.' },
              { title: 'Page-by-Page Extraction', description: 'Converts each page of a multi-page PDF into separate images.' },
              { title: 'Total Privacy', description: 'Files are rendered locally; zero server uploads.' },
              { title: 'Fast Conversion', description: "Leverages your device's processing power for instant results." },
            ]}
            howToSteps={howToSteps}
            useCases={[
              'Extracting charts and diagrams from PDF reports',
              'Converting PDF slides to images for PowerPoint or Keynote',
              'Creating image previews of PDF documents for websites',
              'Sharing individual PDF pages on social media',
              'Editing PDF content in photo editing software',
              'Archiving PDF pages as individual image files',
            ]}
            supportedFormats={['PDF 1.4', 'PDF 1.5', 'PDF 1.6', 'PDF 1.7', 'PDF 2.0']}
            privacyNote="PDF rendering and image extraction happens entirely in your browser using PDF.js. Your PDF files are never sent to any server. All processing is local and completely private."
            tips={[
              'If your PDF is password-protected, use our Unlock PDF tool first.',
              'For sharper images, zoom in before exporting — higher zoom = higher resolution output.',
              'Use PNG output for PDFs with text or line graphics for sharper results.',
              'Use JPG for PDFs with photos or scanned pages for smaller file sizes.',
            ]}
            relatedLinks={[
              { label: 'Convert images back to PDF', href: '/image-to-pdf', context: 'Need to reassemble images into a PDF?' },
              { label: 'Unlock a password-protected PDF first', href: '/unlock-pdf', context: 'Password-protected PDF?' },
              { label: 'Compress the extracted images', href: '/image-compressor', context: 'Want smaller image files?' },
            ]}
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

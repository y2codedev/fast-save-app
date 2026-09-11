import SplitPdf from '@/components/sections/SplitPdf';
import { createToolSchema } from '@/components/sections/SchemaMarkup';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
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
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, getSiteUrl, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Split PDF Online — Extract Pages Free | ConvertAllNow';
  const description = 'Split PDF documents online for free. Extract custom page ranges or save all pages as separate PDFs. Fast, secure, and 100% private in-browser processing.';

  return {
    title,
    description,
    keywords: [
      'split pdf online free',
      'split pdf pages',
      'extract pdf pages',
      'separate pdf pages',
      'pdf splitter free',
      'extract pages from pdf online',
      'split pdf without signup',
      'free pdf page extractor',
    ],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/split-pdf'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [{ url: '/images/split-pdf.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/split-pdf.png'],
      creator: '@convertallnow',
      site: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/split-pdf'),
      languages: getAlternateLanguages('/split-pdf'),
    },
  };
}

const faqs = [
  {
    question: 'How do I split a PDF into separate pages online for free?',
    answer: 'Upload your PDF using the uploader above, choose between extracting specific page ranges (e.g. 1-3, 5) or splitting all pages into individual files, and click "Split PDF Now". The separated files download instantly in your browser.',
  },
  {
    question: 'Can I extract non-consecutive pages from a PDF?',
    answer: 'Yes. In "Extract Page Range" mode, you can enter comma-separated numbers and hyphenated ranges such as "1-3, 6, 8-10" to combine exactly the pages you need into one new PDF.',
  },
  {
    question: 'Are my PDF documents uploaded to a remote server?',
    answer: 'No. Our PDF splitter uses WebAssembly and client-side JavaScript (pdf-lib) directly inside your web browser. Your document is processed locally in device memory and never transmitted over the internet.',
  },
  {
    question: 'How do I download every page as an individual PDF?',
    answer: 'Select the "Split All Pages" mode. Every single page of your document will be separated into an individual PDF file and neatly bundled into a single ZIP archive for fast downloading.',
  },
  {
    question: 'Does splitting a PDF damage original fonts or vector graphics?',
    answer: 'No. The splitting engine extracts the exact native PDF objects, embedded fonts, and vector paths without re-rasterizing or re-compressing them. Text crispness and document quality are 100% preserved.',
  },
  {
    question: 'Can I split password-protected PDFs?',
    answer: 'If your PDF is password-encrypted, use our free Unlock PDF tool first to remove the password before uploading it to the splitter.',
  },
];

const howToSteps = [
  {
    name: 'Upload Your PDF Document',
    text: 'Click the upload zone or drag and drop your multi-page PDF file into the browser tool.',
  },
  {
    name: 'Select Split Mode & Page Range',
    text: 'Choose "Extract Page Range" and enter the page numbers you want, or select "Split All Pages" to break the entire document into single-page PDFs.',
  },
  {
    name: 'Click Split PDF Now',
    text: 'Press the action button. Processing executes locally in your browser memory within seconds.',
  },
  {
    name: 'Download Your Split Files',
    text: 'Click the download button to save your extracted PDF document or ZIP package of individual pages directly to your device.',
  },
];

export default async function SplitPdfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = 'Split PDF Online — Extract Pages Free | ConvertAllNow';
  const description = 'Split PDF documents online for free. Extract custom page ranges or save all pages as separate PDFs. Fast, secure, and 100% private in-browser processing.';

  const schemaData = createToolSchema({
    name: title,
    description,
    path: '/split-pdf',
    locale,
    featureList: [
      'Extract custom page ranges (e.g. 1-3, 5, 8-10)',
      'Split all pages into individual single-page PDFs',
      'Instant ZIP archive packaging for bulk downloads',
      'Client-side processing with zero server uploads',
    ],
    screenshot: '/images/split-pdf.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'PDF Tools', href: '/pdf-tools' },
    { name: 'Split PDF' },
  ];

  const relatedLinks = [
    { label: 'Combine multiple documents with Merge PDF', href: '/merge-pdf', context: 'Need to combine pages from multiple files into one PDF?' },
    { label: 'Extract images with PDF to JPG Converter', href: '/pdf-to-jpg', context: 'Want to turn individual PDF pages into image files?' },
    { label: 'Convert PDF to editable Word document', href: '/pdf-to-docx', context: 'Need to edit the text and paragraphs inside your PDF?' },
    { label: 'Add password security with Protect PDF', href: '/protect-pdf', context: 'Want to secure your split PDF document with a password?' },
  ];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <FAQSchema faqs={faqs} />
      <HowToSchema
        name="How to Split PDF Pages Online"
        description="Learn how to extract specific pages or split multi-page PDF documents into individual files for free."
        steps={howToSteps}
        totalTime="PT1M"
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />
      <WebPageSchema
        title={title}
        description={description}
        path="/split-pdf"
        locale={locale}
        breadcrumb={breadcrumbItems}
      />

      <ToolLayoutWithAds relatedTools={RELATED_TOOLS['split-pdf']}>
        <div className="w-full space-y-8">
          <VisualBreadcrumb items={breadcrumbItems} />
          <SplitPdf />
          <ToolContentSection
            toolName="Split PDF"
            introduction="Our free Split PDF tool gives you complete control over document page organization. Whether you need to extract a two-page financial section from a 50-page annual report, split chapters of an ebook into separate files, or unpack every page into individual single-page PDFs, you can do it directly in your browser without installing third-party desktop software."
            features={[
              { title: 'Custom Range Extraction', description: 'Specify custom page ranges (e.g. 1-3, 5, 8-12) to extract only the exact pages you need into a new PDF document.' },
              { title: 'Split All Pages in One Click', description: 'Break apart every page of your document into separate PDFs and download them simultaneously in an organized ZIP bundle.' },
              { title: '100% Private Local Processing', description: 'Your files are processed in your browser memory using WebAssembly. Documents never leave your computer or phone.' },
              { title: 'Zero Loss in Vector Quality', description: 'Embedded fonts, vector diagrams, and original layouts remain intact without pixelation or quality loss.' },
            ]}
            useCases={[
              'Extracting Specific Agreement Pages: Extract signature pages or specific clauses from lengthy contracts to send to clients.',
              'Splitting Scanned Receipts & Invoices: Separate multi-page scanner feeds into individual invoice and receipt documents for accounting.',
              'Sharing Chapter Excerpts: Break large presentation decks or manuals into lightweight, chapter-specific files for email distribution.',
              'Preparing Academic Submissions: Separate cover sheets, assignment essays, and bibliography pages according to submission requirements.',
            ]}
            faqs={faqs}
            relatedLinks={relatedLinks}
            lastUpdated="2026-09-11"
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
}

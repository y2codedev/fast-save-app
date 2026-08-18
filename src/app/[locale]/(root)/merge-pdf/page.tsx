import MergePdf from '@/components/sections/MergePdf';
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
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, getSiteUrl, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MergePdfSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS['merge-pdf'],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/merge-pdf'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [{ url: '/images/merge-pdf.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/merge-pdf.png'],
      creator: '@convertallnow', site: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/merge-pdf'),
      languages: getAlternateLanguages('/merge-pdf'),
    },
  };
}

const faqs = [
  { question: 'How do I merge PDF files online for free?', answer: 'Upload your PDF files using the uploader above, drag to reorder them if needed, then click "Merge PDFs". The combined file downloads instantly — no signup required.' },
  { question: 'Is there a limit to how many PDFs I can merge?', answer: 'No hard limit. You can merge as many PDFs as your device memory allows. Most modern devices comfortably handle dozens of PDF files at once.' },
  { question: 'Are my PDF files uploaded to a server?', answer: 'No. Merge PDF uses client-side JavaScript to process files entirely in your browser. Your files never leave your device, ensuring complete privacy.' },
  { question: 'Will merging PDFs reduce quality?', answer: 'No. The merge operation combines PDF pages without re-rendering or re-encoding them, so the original quality, fonts, and formatting are fully preserved.' },
  { question: 'Can I reorder pages before merging?', answer: 'Yes! After uploading, you can drag and drop the PDF thumbnails to rearrange the order before merging.' },
  { question: 'What is the maximum PDF file size?', answer: 'Since processing happens in your browser, the practical limit is your device RAM. Typically files up to several hundred megabytes work without issues.' },
  { question: 'Does Merge PDF work on mobile phones?', answer: 'Yes. The tool is fully responsive and works on iOS and Android devices via Chrome, Safari, or any modern mobile browser.' },
  { question: 'How do I split a merged PDF back into separate files?', answer: 'Use our PDF to JPG tool to extract individual pages, or check back soon — we\'re working on a dedicated PDF splitter tool.' },
];

const howToSteps = [
  { name: 'Upload PDF Files', text: 'Click the upload area or drag and drop multiple PDF files. You can add files from your device, cloud storage, or other sources.' },
  { name: 'Reorder Pages', text: 'After uploading, drag and drop the PDF thumbnails to arrange them in your desired order.' },
  { name: 'Click Merge PDFs', text: 'Press the "Merge PDFs" button. Processing happens instantly in your browser using JavaScript.' },
  { name: 'Download the Result', text: 'Once merged, click "Download" to save the combined PDF file to your device.' },
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const t = await getTranslations({ locale, namespace: 'MergePdfSEO' });

  const schemaData = createToolSchema({
    name: t('title'),
    description: t('description'),
    path: '/merge-pdf',
    locale,
    featureList: ['Merge multiple PDFs', 'Drag and drop reorder', 'Browser-based processing', 'No file upload to server'],
    screenshot: '/images/merge-pdf.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'PDF Tools', href: '/pdf-tools' },
    { name: 'Merge PDF' },
  ];

  const relatedTools = RELATED_TOOLS['merge-pdf'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema
        name={`How to ${t('title')}`}
        description={t('description')}
        steps={howToSteps}
        totalTime="PT1M"
      />
      <FAQSchema faqs={faqs} />
      <WebPageSchema
        title={t('title')}
        description={t('description')}
        path="/merge-pdf"
        locale={locale}
        breadcrumb={breadcrumbItems}
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related PDF Tools"
        categoryName="PDF Tools"
        categoryPath="/pdf-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems.slice(1)} />
          <MergePdf />
          <ToolContentSection
            toolName="Merge PDF"
            introduction={
              <>
                <p>
                  Merge PDF is a powerful browser-based utility that lets you combine multiple PDF documents into a single, organized file. Stop sending multiple attachments in emails — easily join invoices, reports, scanned pages, or chapters into one cohesive document.
                </p>
                <p className="mt-3">
                  Using the robust pdf-lib library directly within your browser, our tool allows you to rearrange the order of your PDFs before merging. Because there is no server upload, you can merge highly sensitive financial or legal documents instantly without worrying about data leaks or waiting for slow uploads.
                </p>
              </>
            }
            features={[
              { title: 'Drag & Drop Ordering', description: 'Easily rearrange the sequence of files before merging.' },
              { title: 'Zero Upload Wait Time', description: "Merge files instantly using your computer's own processing power." },
              { title: '100% Privacy Guaranteed', description: 'Confidential files are never sent over the internet.' },
              { title: 'Preserves Original Quality', description: 'The merged PDF retains the exact quality of the source files.' },
            ]}
            howToSteps={howToSteps}
            useCases={[
              'Combining multiple scanned pages into one PDF document',
              'Merging chapters from different authors into a final book',
              'Consolidating monthly financial reports into an annual PDF',
              'Assembling multiple invoices for a single email attachment',
              'Combining resumes, cover letters, and portfolio pages for job applications',
              'Merging multiple contracts or legal documents for filing',
              'Creating a single PDF presentation from multiple slide decks',
            ]}
            supportedFormats={['PDF 1.0', 'PDF 1.1', 'PDF 1.2', 'PDF 1.3', 'PDF 1.4', 'PDF 1.5', 'PDF 1.6', 'PDF 1.7', 'PDF 2.0']}
            privacyNote="All PDF merging happens entirely in your browser using JavaScript. Your files are never uploaded to our servers. We have no access to the content of your documents. Your data stays completely private on your device."
            tips={[
              'Sort your files before uploading to save reordering time.',
              'If a PDF is password-protected, use our Unlock PDF tool first.',
              'For very large files, ensure your browser tab has enough memory (close other tabs if needed).',
              'After merging, use Compress PDF tools to reduce the final file size for email sharing.',
              'Use Chrome or Firefox for the best performance with large PDF batches.',
            ]}
            relatedLinks={[
              { label: 'Compress the merged PDF', href: '/image-compressor', context: 'After merging, you may want to reduce the file size.' },
              { label: 'Protect PDF with a password', href: '/protect-pdf', context: 'Need to secure the merged document?' },
              { label: 'Convert PDF to Word', href: '/pdf-to-docx', context: 'Need to edit the content?' },
            ]}
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
}

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
  { question: 'How do I split a merged PDF back into separate files?', answer: 'Use our dedicated Split PDF tool to extract specific page ranges or break down a multi-page PDF into individual documents.' },
];

const howToSteps = [
  { name: 'Upload PDF Files', text: 'Click the upload area or drag and drop multiple PDF files. You can add files from your device, cloud storage, or other sources.' },
  { name: 'Reorder Pages', text: 'After uploading, drag and drop the PDF thumbnails to arrange them in your desired order.' },
  { name: 'Click Merge PDFs', text: 'Press the "Merge PDFs" button. Processing happens instantly in your browser using JavaScript.' },
  { name: 'Download the Result', text: 'Once merged, click "Download" to save the combined PDF file to your device.' },
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;


  
  

  const t = await getTranslations({ locale, namespace: 'MergePdfSEO' });
  const title = t('title');
  const description = t('description');

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
    { name: t('title') },
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
                  Merge PDF is a free online tool that lets you combine multiple PDF files into a single document instantly, entirely within your web browser. Whether you're consolidating reports, combining scanned documents, assembling a portfolio, or preparing a multi-chapter document, our PDF merger makes it effortless with no software installation, no signup, and no file size restrictions.
                </p>
                <p className="mt-3">
                  Unlike traditional desktop software like Adobe Acrobat, our Merge PDF tool works directly in your browser using modern JavaScript APIs. This means your PDF files are never uploaded to any server — all processing is done locally on your device, ensuring complete privacy and security for sensitive documents such as legal contracts, medical records, or financial statements.
                </p>
                <p className="mt-3">
                  The tool supports drag-and-drop reordering, allowing you to arrange your PDFs in any order before merging. You can combine as many files as your device's memory supports — typically dozens of PDFs without any issues. The resulting merged PDF preserves all original content including text, images, hyperlinks, fonts, bookmarks, and formatting exactly as they appear in the source files.
                </p>
                <p className="mt-3">
                  After merging, you may want to <strong><a href="/protect-pdf" className="text-indigo-600 dark:text-indigo-400 hover:underline">Protect the PDF</a></strong> with a password, or <strong><a href="/pdf-to-jpg" className="text-indigo-600 dark:text-indigo-400 hover:underline">convert it to JPG images</a></strong> for easy sharing.
                </p>
              </>
            }
            features={[
              { title: 'Browser-Based Processing', description: 'All merging happens locally — files never leave your device.' },
              { title: 'Unlimited Files', description: 'Combine as many PDFs as needed with no artificial cap.' },
              { title: 'Drag & Drop Reorder', description: 'Rearrange uploaded PDFs before merging with intuitive drag-and-drop.' },
              { title: 'Preserves Quality', description: 'Original fonts, images, hyperlinks, and formatting fully preserved.' },
              { title: 'No Watermarks', description: 'Output PDF is completely clean with no added branding.' },
              { title: 'Free Forever', description: 'No subscription, no credits, no hidden costs — always free.' },
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
              { label: 'Separate documents with Split PDF', href: '/split-pdf', context: 'Need to extract specific pages or break a PDF into parts?' },
              { label: 'Convert PDF to JPG images', href: '/pdf-to-jpg', context: 'Need to extract individual pages as photos?' },
              { label: 'Protect PDF with a password', href: '/protect-pdf', context: 'Need to secure the merged document?' },
              { label: 'Convert PDF to editable Word', href: '/pdf-to-docx', context: 'Need to edit the text or layout?' },
              { label: 'Create PDF from photos or scans', href: '/image-to-pdf', context: 'Have images you want to add to your PDF?' },
            ]}
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
}

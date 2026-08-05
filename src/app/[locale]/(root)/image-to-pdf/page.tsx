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
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import ImageToPdfConverter from '@/components/sections/ImageToPdfConverter';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageToPdfSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['image-to-pdf'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/image-to-pdf'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/image-to-pdf.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/image-to-pdf.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/image-to-pdf'),
      languages: getAlternateLanguages('/image-to-pdf'),
    },
  };
}

const faqs = [
  { question: 'How do I convert multiple images to one PDF?', answer: 'Upload all your images, arrange them in the desired order by dragging thumbnails, then click "Convert to PDF". All images become pages in a single PDF file.' },
  { question: 'What image formats are supported?', answer: 'Supported formats include JPG, JPEG, PNG, WebP, GIF, BMP, and TIFF. All images are converted to PDF pages while preserving their original quality.' },
  { question: 'Will the image quality be preserved in the PDF?', answer: 'Yes. Images are embedded in the PDF at their original resolution. No quality degradation occurs during the conversion process.' },
  { question: 'Can I set the PDF page size?', answer: 'Yes, you can choose standard page sizes (A4, Letter, etc.) or have each image fill its own page at its original dimensions.' },
  { question: 'Are my images uploaded to a server?', answer: 'No. All conversion happens in your browser. Your image files never leave your device.' },
  { question: 'Can I add a password to the converted PDF?', answer: 'After creating the PDF, use our Protect PDF tool to add a password and restrict access.' },
  { question: 'Is there a limit to how many images I can convert?', answer: 'No artificial limit. You can convert as many images as your device memory supports — typically dozens or even hundreds of images.' },
];

const howToSteps = [
  { name: 'Upload Images', text: 'Click the upload area or drag and drop JPG, PNG, WebP, or other image files.' },
  { name: 'Arrange Order', text: 'Drag image thumbnails to set the page order in your final PDF.' },
  { name: 'Choose Settings', text: 'Set page size (A4, Letter, or image size) and orientation.' },
  { name: 'Convert & Download', text: 'Click "Convert to PDF" to generate and download your PDF file instantly.' },
];

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageToPdfSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/image-to-pdf', locale,
    featureList: ['Multiple images to one PDF', 'Drag-and-drop reorder', 'Custom page size', 'Browser-based conversion'],
    screenshot: '/images/image-to-pdf.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'PDF Tools', href: '/pdf-tools' },
    { name: t('title') },
  ];

  const relatedTools = RELATED_TOOLS['image-to-pdf'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/image-to-pdf" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related PDF Tools"
        categoryName="PDF Tools"
        categoryPath="/pdf-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems.slice(1)} />
          <NoSSRWrapper><ImageToPdfConverter /></NoSSRWrapper>
          <ToolContentSection
            toolName="Image to PDF Converter"
            introduction={
              <>
                <p>
                  Image to PDF Converter is a free online tool that combines one or multiple images into a single PDF document, directly in your web browser. Whether you're scanning documents with your phone, creating a photo album, submitting an assignment, or building a portfolio — converting images to PDF is the universal solution for sharing, printing, and archiving visual content professionally.
                </p>
                <p className="mt-3">
                  Our converter supports JPG, PNG, WebP, GIF, BMP, and TIFF formats. You can upload multiple images at once and arrange them in any order before generating the PDF. Choose from standard page sizes (A4, US Letter) or fit each image to its own custom page. Images are embedded at their original resolution, ensuring no quality loss in the output PDF.
                </p>
                <p className="mt-3">
                  Since all conversion happens in your browser, your images are completely private — no files are uploaded to servers. The result is a clean, standards-compliant PDF file ready to share, print, or archive. After converting, you can <strong><a href="/protect-pdf" className="text-indigo-600 dark:text-indigo-400 hover:underline">add a password</a></strong> or <strong><a href="/merge-pdf" className="text-indigo-600 dark:text-indigo-400 hover:underline">merge it with other PDFs</a></strong>.
                </p>
              </>
            }
            features={[
              { title: 'Multi-Image Support', description: 'Combine unlimited images into a single PDF document.' },
              { title: 'Drag & Drop Reorder', description: 'Arrange page order by dragging image thumbnails before converting.' },
              { title: 'Custom Page Sizes', description: 'Choose A4, US Letter, or fit-to-image page sizing.' },
              { title: 'Original Quality', description: 'Images embedded at full resolution — no quality loss.' },
              { title: 'Browser-Based', description: 'No upload required — all processing happens locally.' },
              { title: 'No Watermarks', description: 'Output PDF is completely clean with no added branding.' },
            ]}
            howToSteps={howToSteps}
            useCases={[
              'Converting phone-scanned documents into a single PDF for email',
              'Creating a PDF photo album or portfolio from multiple images',
              'Combining multiple screenshots into a single report document',
              'Submitting assignment photos as a single PDF file',
              'Converting product images into a PDF catalog',
              'Archiving physical documents scanned as JPG into PDF format',
            ]}
            supportedFormats={['JPG', 'JPEG', 'PNG', 'WebP', 'GIF', 'BMP', 'TIFF']}
            privacyNote="Image to PDF conversion is entirely browser-based. Your image files are processed locally on your device using JavaScript. No files are transmitted to or stored on our servers."
            tips={[
              'For scanned documents, use JPG images at 150 DPI or higher for readable text.',
              'Sort images by filename before uploading to save reordering time.',
              'Use A4 page size for standard documents and reports.',
              'For photo books, use "Fit to Image" mode to preserve each photo\'s original aspect ratio.',
            ]}
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
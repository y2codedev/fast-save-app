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
import ImageCompressor from '@/components/sections/ImageCompressor';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageCompressorSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['image-compressor'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/image-compressor'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/image-compressor.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/image-compressor.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/image-compressor'),
      languages: getAlternateLanguages('/image-compressor'),
    },
  };
}

const faqs = [
  { question: 'How much can I compress an image without losing quality?', answer: 'You can significantly reduce image file sizes while controlling output quality. At 75-85% quality, most images look virtually identical to the original while using far less storage.' },
  { question: 'Which image formats does the compressor support?', answer: 'The compressor supports JPG, JPEG, PNG, and WebP formats. You can preserve the original format or export as high-efficiency WebP.' },
  { question: 'Are my images uploaded to a server?', answer: 'No. All compression happens locally in your browser using JavaScript and Canvas APIs. Your images never leave your device.' },
  { question: 'Can I compress multiple images at once?', answer: 'Yes! Upload multiple images in batch. Each will be compressed with your selected quality settings and downloadable individually or as a ZIP.' },
  { question: 'What is the difference between lossy and lossless compression?', answer: 'Lossy compression (like JPEG) discards imperceptible image data to achieve smaller files. Lossless compression (like PNG) reduces file size without any data loss. Our tool uses adjustable compression with a quality slider.' },
  { question: 'Will compressing a PNG make it a JPG?', answer: 'Not necessarily — you can choose to keep the PNG format with transparency, or convert to JPG or WebP for smaller file sizes.' },
  { question: 'How do I compress an image for web use?', answer: 'For web images, a quality of 75-85% is typically ideal. WebP format can provide smaller files than JPG at comparable visual quality.' },
  { question: 'Is there a maximum file size?', answer: 'No server-imposed limit. Processing happens in your browser, so practical limits are set by your device\'s RAM — typically several hundred megabytes.' },
];

const howToSteps = [
  { name: 'Upload Images', text: 'Click the upload area or drag and drop JPG, PNG, or WebP image files.' },
  { name: 'Set Quality Level', text: 'Use the quality slider to choose your compression level. Lower values = smaller files, higher values = better quality.' },
  { name: 'Compress', text: 'Click "Compress" to process your images instantly in your browser.' },
  { name: 'Download', text: 'Download your compressed images individually or as a ZIP archive.' },
];

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;


  
  

  const t = await getTranslations({ locale, namespace: 'ImageCompressorSEO' });
  const title = t('title');
  const description = t('description');

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/image-compressor', locale,
    featureList: ['Compress JPG/PNG/WebP', 'Adjustable quality slider', 'Batch compression', 'Browser-based processing'],
    screenshot: '/images/image-compressor.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Image Tools', href: '/image-tools' },
    { name: 'Image Compressor' },
  ];

  const relatedTools = RELATED_TOOLS['image-compressor'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/image-compressor" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Image Tools"
        categoryName="Image Tools"
        categoryPath="/image-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems.slice(1)} />
          <ImageCompressor />
          <ToolContentSection
            toolName="Image Compressor"
            introduction={
              <>
                <p>
                  Image Compressor is a free online tool that reduces image file sizes without noticeable quality loss, entirely in your web browser. Large image files are one of the most common causes of slow website loading, excessive storage usage, and failed email attachments. Our tool solves these problems instantly — no software installation, no cloud uploads, no signup.
                </p>
                <p className="mt-3">
                  Our compressor uses smart lossy and lossless compression algorithms applied directly in your browser via JavaScript and Canvas APIs. You control the quality level with an interactive slider — typically 75-85% quality delivers visually identical results to the original while achieving substantial file size reduction. This is critical for website performance, as smaller images directly improve Core Web Vitals scores and page load times.
                </p>
                <p className="mt-3">
                  The tool supports batch processing — upload multiple images at once and compress them all in one go. Supported formats include JPG, JPEG, PNG, and WebP. You can choose to output in the original format or convert to WebP, which can often provide smaller files than JPEG at comparable visual quality.
                </p>
                <p className="mt-3">
                  After compressing images, you may want to <strong><a href="/image-editor" className="text-indigo-600 dark:text-indigo-400 hover:underline">edit them further</a></strong>, <strong><a href="/bg-remover" className="text-indigo-600 dark:text-indigo-400 hover:underline">remove backgrounds</a></strong>, or <strong><a href="/image-to-pdf" className="text-indigo-600 dark:text-indigo-400 hover:underline">convert them to a PDF document</a></strong>.
                </p>
              </>
            }
            features={[
              { title: 'Adjustable Quality Slider', description: 'Fine-tune compression level from 1-100% to balance size and quality.' },
              { title: 'Batch Processing', description: 'Compress multiple images simultaneously for maximum efficiency.' },
              { title: 'JPG, PNG & WebP Support', description: 'Works with JPG, PNG, and WebP images.' },
              { title: 'WebP Output', description: 'Convert to WebP for smaller files than JPG at comparable visual quality.' },
              { title: 'Size Preview', description: 'See original vs compressed size comparison before downloading.' },
              { title: 'No Upload Required', description: '100% browser-based — images never leave your device.' },
            ]}
            howToSteps={howToSteps}
            useCases={[
              'Optimizing website images to improve Core Web Vitals and page speed',
              'Reducing image size before uploading to social media platforms',
              'Compressing product photos for e-commerce stores',
              'Shrinking images before attaching to emails or messages',
              'Batch compressing a photography portfolio for web galleries',
              'Reducing storage usage in cloud drives or local libraries',
              'Optimizing images for mobile apps or PWAs',
            ]}
            supportedFormats={['JPG', 'JPEG', 'PNG', 'WebP']}
            privacyNote="Your images are processed entirely within your browser. No image data is ever transmitted to our servers. ConvertAllNow has zero access to your image files or their contents."
            tips={[
              'For web use, target a quality of 75-85% — the difference is invisible to users but the size savings are significant.',
              'Convert to WebP format when possible — it can often provide smaller files than JPG at comparable visual quality.',
              'For PNG images with transparency, keep PNG format to avoid introducing a white background.',
              'Use batch mode to process entire photo folders at once and save significantly more time.',
              'Compare the before/after preview to fine-tune your quality setting before downloading.',
            ]}
            relatedLinks={[
              { label: 'Resize image dimensions with Resize Image', href: '/resize-image', context: 'Need exact pixel dimensions or percentage scaling?' },
              { label: 'Convert between JPG, PNG, and WebP', href: '/photo', context: 'Need another image format?' },
              { label: 'Convert images to PDF document', href: '/image-to-pdf', context: 'Want to turn compressed images into a single document?' },
              { label: 'Crop, resize, or edit before compressing', href: '/image-editor', context: 'Need to edit or apply filters to your photo?' },
              { label: 'Remove image background', href: '/bg-remover', context: 'Want a transparent background?' },
            ]}
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
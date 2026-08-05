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
  { question: 'How much can I compress an image without losing quality?', answer: 'Typically 60-80% file size reduction is achievable with minimal perceptible quality loss. At 75-80% quality, most images look identical to the original to the human eye.' },
  { question: 'Which image formats does the compressor support?', answer: 'The compressor supports JPG, JPEG, PNG, WebP, GIF, BMP, and TIFF formats. Output format options depend on the input type.' },
  { question: 'Are my images uploaded to a server?', answer: 'No. All compression happens locally in your browser using JavaScript and Canvas APIs. Your images never leave your device.' },
  { question: 'Can I compress multiple images at once?', answer: 'Yes! Upload multiple images in batch. Each will be compressed with your selected quality settings and downloadable individually or as a ZIP.' },
  { question: 'What is the difference between lossy and lossless compression?', answer: 'Lossy compression (like JPEG) discards some image data to achieve smaller files. Lossless compression (like PNG) reduces file size without any data loss. Our tool uses lossy compression with a quality slider.' },
  { question: 'Will compressing a PNG make it a JPG?', answer: 'Not necessarily — you can choose to keep the PNG format with lossless compression, or convert to JPG or WebP for smaller file sizes.' },
  { question: 'How do I compress an image for web use?', answer: 'For web images, a quality of 75-85% is typically ideal. Use WebP format for the best compression-to-quality ratio on modern browsers.' },
  { question: 'Is there a maximum file size?', answer: 'No server-imposed limit. Processing happens in your browser, so practical limits are set by your device\'s RAM — typically several hundred megabytes.' },
];

const howToSteps = [
  { name: 'Upload Images', text: 'Click the upload area or drag and drop JPG, PNG, WebP, or other image files.' },
  { name: 'Set Quality Level', text: 'Use the quality slider to choose your compression level. Lower values = smaller files, higher values = better quality.' },
  { name: 'Compress', text: 'Click "Compress" to process your images instantly in your browser.' },
  { name: 'Download', text: 'Download your compressed images individually or as a ZIP archive.' },
];

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageCompressorSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/image-compressor', locale,
    featureList: ['Compress JPG/PNG/WebP', 'Adjustable quality slider', 'Batch compression', 'Browser-based processing'],
    screenshot: '/images/image-compressor.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Image Tools', href: '/image-tools' },
    { name: t('title') },
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
                  Our compressor uses smart lossy and lossless compression algorithms applied directly in your browser via JavaScript and Canvas APIs. You control the quality level with a slider — typically 75-85% quality delivers visually identical results to the original while achieving 60-80% smaller file sizes. This is critical for website performance, as smaller images directly improve Core Web Vitals scores and page load times.
                </p>
                <p className="mt-3">
                  The tool supports batch processing — upload multiple images at once and compress them all in one go. Supported formats include JPG, JPEG, PNG, WebP, GIF, BMP, and TIFF. You can choose to output in the original format or convert to WebP, which is Google's recommended format for web images due to its superior compression efficiency.
                </p>
                <p className="mt-3">
                  After compressing images, you may want to <strong><a href="/image-editor" className="text-indigo-600 dark:text-indigo-400 hover:underline">edit them further</a></strong>, <strong><a href="/bg-remover" className="text-indigo-600 dark:text-indigo-400 hover:underline">remove backgrounds</a></strong>, or <strong><a href="/image-to-pdf" className="text-indigo-600 dark:text-indigo-400 hover:underline">convert them to a PDF document</a></strong>.
                </p>
              </>
            }
            features={[
              { title: 'Adjustable Quality Slider', description: 'Fine-tune compression level from 1-100% to balance size and quality.' },
              { title: 'Batch Processing', description: 'Compress multiple images simultaneously for maximum efficiency.' },
              { title: 'Multiple Format Support', description: 'Works with JPG, PNG, WebP, GIF, BMP, and TIFF.' },
              { title: 'WebP Output', description: 'Convert to WebP for 25-35% better compression than JPG at same quality.' },
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
            supportedFormats={['JPG', 'JPEG', 'PNG', 'WebP', 'GIF', 'BMP', 'TIFF']}
            privacyNote="Your images are processed entirely within your browser. No image data is ever transmitted to our servers. ConvertAllNow has zero access to your image files or their contents."
            tips={[
              'For web use, target a quality of 75-85% — the difference is invisible to users but the size savings are significant.',
              'Convert to WebP format when possible — it is 25-35% smaller than JPG at equivalent visual quality.',
              'For PNG images with transparency, keep PNG format to avoid introducing a white background.',
              'Use batch mode to process entire photo folders at once and save significantly more time.',
              'Compare the before/after preview to fine-tune your quality setting before downloading.',
            ]}
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
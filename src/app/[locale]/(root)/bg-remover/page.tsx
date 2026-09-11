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
import BgRemover from '@/components/sections/BgRemover';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BgRemoverSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['bg-remover'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/bg-remover'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/bg-remover.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/bg-remover.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/bg-remover'),
      languages: getAlternateLanguages('/bg-remover'),
    },
  };
}

const faqs = [
  { question: 'How does AI background removal work?', answer: 'Our tool uses a machine learning segmentation model that detects the primary subject in your image and separates it from the background, creating a transparent PNG output.' },
  { question: 'What image formats are supported for input?', answer: 'Input: JPG, JPEG, PNG, WebP, and BMP. Output is always PNG with a transparent background.' },
  { question: 'Why is the output always PNG?', answer: 'PNG is the only widely-supported image format that supports full transparency (alpha channel). JPG does not support transparency.' },
  { question: 'Can I remove the background from a photo with multiple people?', answer: 'Yes. The AI model handles multiple subjects. It works best when subjects are clearly distinguishable from the background.' },
  { question: 'Are my images uploaded to a server?', answer: 'No. The AI model runs directly in your browser using WebAssembly. Your images never leave your device.' },
  { question: 'How do I get the best results?', answer: 'Use images with good contrast between subject and background. High-resolution images produce the cleanest edges. Strong, uniform lighting helps the AI detect edges more accurately.' },
  { question: 'Can I add a new background after removal?', answer: 'Yes! After removing the background, use our Pro Image Editor to place the transparent PNG on a new background color or image.' },
  { question: 'Does it work with product photos for e-commerce?', answer: 'Yes. This is one of the most popular use cases. Remove busy backgrounds and replace with white or transparent backgrounds for clean product listing photos.' },
];

const howToSteps = [
  { name: 'Upload Image', text: 'Click the upload area or drag and drop your JPG, PNG, or WebP image.' },
  { name: 'AI Processing', text: 'The AI model analyzes your image and identifies the foreground subject automatically.' },
  { name: 'Preview Result', text: 'Preview the result with the background removed. Adjust if needed.' },
  { name: 'Download PNG', text: 'Download the transparent PNG image ready for use in designs, presentations, or e-commerce.' },
];

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;


  
  

  const t = await getTranslations({ locale, namespace: 'BgRemoverSEO' });
  const title = t('title');
  const description = t('description');

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/bg-remover', locale,
    featureList: ['AI background removal', 'Transparent PNG output', 'Browser-based ML model', 'No file upload'],
    screenshot: '/images/bg-remover.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Image Tools', href: '/image-tools' },
    { name: 'Remove Background' },
  ];

  const relatedTools = RELATED_TOOLS['bg-remover'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/bg-remover" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Image Tools"
        categoryName="Image Tools"
        categoryPath="/image-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems.slice(1)} />
          <BgRemover />
          <ToolContentSection
            toolName="Background Remover"
            introduction={
              <>
                <p>
                  Background Remover is a free AI-powered tool that automatically detects and removes the background from any image, creating a clean transparent PNG — entirely in your web browser without any uploads. Whether you need product photos with white backgrounds for e-commerce, profile pictures without distracting backgrounds, or cutout assets for graphic design, this tool delivers professional results in seconds.
                </p>
                <p className="mt-3">
                  Our tool uses a deep learning segmentation model compiled to WebAssembly, which runs natively in your browser using your device's CPU. The AI analyzes pixel relationships and subject boundaries to accurately separate the foreground subject from the background. Unlike traditional approaches that rely on manual masking or chroma key techniques, AI-based removal works with any background — complex scenes, gradients, busy patterns, or natural environments.
                </p>
                <p className="mt-3">
                  Output is always a transparent PNG, the standard format for images with transparency. You can then use the result directly in graphic design tools, e-commerce platforms, presentations, or edit further with our <strong><a href="/image-editor" className="text-indigo-600 dark:text-indigo-400 hover:underline">Pro Image Editor</a></strong> to add a new background, adjust brightness, or resize the image.
                </p>
              </>
            }
            features={[
              { title: 'AI-Powered Detection', description: 'Deep learning model accurately detects subject boundaries.' },
              { title: 'Any Background Type', description: 'Works with complex, patterned, or multi-colored backgrounds.' },
              { title: 'Transparent PNG Output', description: 'Industry-standard transparent PNG ready for design tools.' },
              { title: 'Browser-Based AI', description: 'WebAssembly model runs locally — no upload required.' },
              { title: 'High-Resolution Support', description: 'Processes high-resolution images for sharp, clean edges.' },
              { title: 'Instant Processing', description: 'Results in seconds depending on image size and complexity.' },
            ]}
            howToSteps={howToSteps}
            useCases={[
              'Removing backgrounds from product photos for Amazon, Shopify, or Etsy listings',
              'Creating professional profile pictures with transparent or solid backgrounds',
              'Making stickers and cutout assets for graphic design projects',
              'Preparing images for use in presentations and documents',
              'Creating transparent logos from photos',
              'Editing photos for social media with custom backgrounds',
              'Preparing product images for marketing materials',
            ]}
            supportedFormats={['JPG', 'JPEG', 'PNG', 'WebP', 'BMP']}
            privacyNote="The AI background removal model runs entirely in your browser using WebAssembly. Your images are never uploaded to our servers. All processing happens locally on your device, ensuring complete privacy."
            tips={[
              'High contrast between subject and background produces the cleanest results.',
              'For complex hair or fur edges, use an image with good lighting for the best AI accuracy.',
              'After removal, use our Image Editor to place the subject on a new custom background.',
              'For e-commerce, download and place on a pure white (#FFFFFF) background for clean product shots.',
              'Sharper, higher-resolution input images produce cleaner edge detection results.',
            ]}
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
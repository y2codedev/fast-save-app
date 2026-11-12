import HowToSchema from '@/components/seo/HowToSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import ToolContentSection from '@/components/sections/ToolContentSection';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import ImageConverter from '@/components/sections/ImageConverter';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageConverterSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['photo'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/photo'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/photo-converter.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/photo-converter.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/photo'),
      languages: getAlternateLanguages('/photo'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;


  
  

  const t = await getTranslations({ locale, namespace: 'ImageConverterSEO' });
  const title = t('title');
  const description = t('description');

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/photo', locale,
    featureList: ['Convert PNG to JPG', 'Convert JPG to WebP', 'Convert raster images to SVG', 'Batch image format conversion'],
    screenshot: '/images/photo-converter.png',
  });

  
const faqs = [
  { question: 'Which image formats can I convert?', answer: 'The format converter accepts common raster formats including JPG, PNG, GIF, BMP, WebP, ICO, TIFF, RAW, and TGA. Available output formats are shown after you add a file.' },
  { question: 'Can I create an SVG from a photo?', answer: 'Yes. Open the SVG tab and add a PNG, JPG, or WebP image. The tool traces the raster image and lets you download the resulting SVG or copy its code.' },
  { question: 'Are my image files uploaded to your server?', answer: 'No. The selected image content is processed in your browser. The format converter downloads a supporting conversion engine before processing.' },
  { question: 'Can I convert more than one image?', answer: 'Yes. The format converter accepts multiple images and lets you choose an output format for each file.' },
  { question: 'Why can a large image be slow?', answer: 'Conversion speed and practical file size depend on your browser, device memory, image dimensions, and chosen output format.' },
];

const howToSteps = [
  { name: 'Add images', text: 'Select or drag one or more supported raster image files into the format converter.' },
  { name: 'Choose a format', text: 'Choose the required output format for each image, or use the SVG tab to trace a PNG, JPG, or WebP file.' },
  { name: 'Convert and download', text: 'Start the conversion, then download each completed image to your device.' },
];

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Image Tools', href: '/image-tools' },
    { name: 'Image Converter', href: '/photo' },
  ];
  const relatedTools = RELATED_TOOLS['photo'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/photo" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="Image Tools"
        categoryPath="/image-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <ImageConverter />
          <ToolContentSection
            toolName={t('title')}
            introduction={
              <>
                <p>
                  This browser-based image converter changes common raster files between formats such as JPG, PNG, WebP, GIF, BMP, ICO, and TIFF. You can add several images, choose an output format for each one, and download the converted results.
                </p>
                <p className="mt-3">
                  The separate SVG workspace traces a PNG, JPG, or WebP image into vector paths. Selected image content is processed locally in your browser; the format converter first downloads its supporting conversion engine.
                </p>
              </>
            }
            features={[
              { title: "Multiple Output Formats", description: "Choose from the output formats shown for each raster image." },
              { title: "Batch Workflow", description: "Add multiple images and configure each conversion in one workspace." },
              { title: "Raster-to-SVG Tracing", description: "Create an eight-color SVG trace from a PNG, JPG, or WebP image." },
              { title: "Local File Processing", description: "Selected image content is processed in your browser rather than uploaded to our server." },
            ]}
            howToSteps={howToSteps}
            faqs={faqs}
            supportedFormats="Format conversion: JPG, JPEG, PNG, GIF, BMP, WebP, ICO, TIF, TIFF, RAW, and TGA. SVG tracing: PNG, JPG, and WebP."
            privacyNote="Selected image content is processed locally in your browser. The format converter downloads a supporting WebAssembly conversion engine before it processes your files."
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

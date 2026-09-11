import ResizeImage from '@/components/sections/ResizeImage';
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
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Resize Image Online — Change Image Dimensions Free | ConvertAllNow';
  const description = 'Resize JPG, PNG, and WebP images online for free. Adjust dimensions in pixels or percentages while locking aspect ratio. 100% private in-browser tool.';

  return {
    title,
    description,
    keywords: [
      'resize image online',
      'change image dimensions',
      'resize photo online free',
      'image resizer',
      'resize png online',
      'resize jpg online',
      'scale image online',
      'resize image without losing quality',
    ],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/resize-image'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [{ url: '/images/resize-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/resize-image.png'],
      creator: '@convertallnow',
      site: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/resize-image'),
      languages: getAlternateLanguages('/resize-image'),
    },
  };
}

const faqs = [
  {
    question: 'How do I resize an image online for free?',
    answer: 'Upload your image using the box above, adjust the target width or height in pixels (or click a quick percentage preset like 50%), choose your output format, and click "Resize Image". Download your newly resized picture instantly.',
  },
  {
    question: 'Will resizing stretch or distort my image?',
    answer: 'No. By default, "Lock Aspect Ratio" is enabled. When you type a new width, the height calculates automatically to maintain your image’s original proportions perfectly.',
  },
  {
    question: 'Are my photos uploaded to a remote server?',
    answer: 'No. Our image resizer runs entirely inside your browser using HTML5 Canvas graphics acceleration. Your private images are never uploaded or transmitted over the internet.',
  },
  {
    question: 'What image formats can I resize?',
    answer: 'You can upload and resize JPG, JPEG, PNG, WebP, GIF, and BMP files. You can also convert between JPG, PNG, and WebP during export.',
  },
  {
    question: 'Does enlarging an image decrease sharpness?',
    answer: 'Upscaling any raster image beyond its original pixel dimensions requires interpolation. While our high-quality smoothing algorithm softens pixelation, we recommend using original high-resolution assets whenever possible.',
  },
  {
    question: 'What is the maximum image file size supported?',
    answer: 'Because processing happens on your local device, you can resize high-resolution camera photos up to several hundred megapixels depending on your available RAM.',
  },
];

const howToSteps = [
  {
    name: 'Upload Your Image',
    text: 'Click the upload zone or drag and drop your JPG, PNG, or WebP photo into the tool.',
  },
  {
    name: 'Set Desired Dimensions',
    text: 'Type your exact target pixel width or height, or select a percentage preset (e.g. 50% or 75%).',
  },
  {
    name: 'Choose Format and Quality',
    text: 'Select your preferred export format and adjust the quality slider to balance clarity and file size.',
  },
  {
    name: 'Download Resized Image',
    text: 'Click the resize button to instantly render and download your resized picture to your device.',
  },
];

export default async function ResizeImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = 'Resize Image Online — Change Image Dimensions Free | ConvertAllNow';
  const description = 'Resize JPG, PNG, and WebP images online for free. Adjust dimensions in pixels or percentages while locking aspect ratio. 100% private in-browser tool.';

  const schemaData = createToolSchema({
    name: title,
    description,
    path: '/resize-image',
    locale,
    featureList: [
      'Exact pixel dimension resizing',
      'Proportional aspect ratio locking',
      'One-click percentage presets (25%, 50%, 75%, 150%)',
      'Instant HTML5 Canvas in-browser processing',
    ],
    screenshot: '/images/resize-image.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Image Tools', href: '/image-tools' },
    { name: 'Resize Image' },
  ];

  const relatedLinks = [
    { label: 'Compress image file size with Image Compressor', href: '/image-compressor', context: 'Need to shrink file size in KB or MB after resizing?' },
    { label: 'Convert image formats with Image Converter', href: '/photo', context: 'Want to convert your photo between JPG, PNG, and WebP?' },
    { label: 'Remove image backgrounds automatically', href: '/bg-remover', context: 'Need a transparent background cutout for your photo?' },
    { label: 'Convert images into a PDF document', href: '/image-to-pdf', context: 'Want to bundle your resized photos into a multi-page PDF?' },
  ];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <FAQSchema faqs={faqs} />
      <HowToSchema
        name="How to Resize an Image Online"
        description="Learn how to change the pixel dimensions of any photo or graphic online for free."
        steps={howToSteps}
        totalTime="PT1M"
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />
      <WebPageSchema
        title={title}
        description={description}
        path="/resize-image"
        locale={locale}
        breadcrumb={breadcrumbItems}
      />

      <ToolLayoutWithAds relatedTools={RELATED_TOOLS['resize-image']}>
        <div className="w-full space-y-8">
          <VisualBreadcrumb items={breadcrumbItems} />
          <ResizeImage />
          <ToolContentSection
            toolName="Resize Image"
            introduction="Our free online Image Resizer makes adjusting photo dimensions effortless. Whether you need exact pixel dimensions for social media banners, website hero images, online application forms, or email signatures, you can resize photos quickly with smart bicubic smoothing directly in your browser."
            features={[
              { title: 'Exact Pixel Controls', description: 'Enter custom pixel dimensions for width and height with automatic aspect ratio calculation to prevent distortion.' },
              { title: 'One-Click Scale Presets', description: 'Scale images down to 50%, 75%, or up to 200% with a single click using standard ratio presets.' },
              { title: 'In-Browser Privacy', description: 'Processed locally via your browser graphics hardware. Photos are never uploaded or stored on remote servers.' },
              { title: 'Multi-Format Export', description: 'Export resized graphics as JPG, PNG, or modern high-efficiency WebP images with custom compression control.' },
            ]}
            useCases={[
              'Social Media Headers & Posts: Resize graphics to match Instagram, Twitter/X, LinkedIn, and Facebook banner specifications.',
              'Website & Blog Optimization: Scale oversized camera photos down to web-friendly widths (e.g. 1200px or 1920px) for faster page loading.',
              'Passport & Identity Photos: Resize portrait photos to exact dimension requirements for visa and job applications.',
              'Email Attachments & Signatures: Shrink photo dimensions so they embed seamlessly into newsletters and personal emails.',
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

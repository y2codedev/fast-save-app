import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import HowToSchema from '@/components/seo/HowToSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import ToolContentSection from '@/components/sections/ToolContentSection';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, CATEGORY_TOOLS, RELATED_TOOLS } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { ArrowRightIcon, PhotoIcon } from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Free Image Tools Online — Compress, Edit, Convert & Remove Background';
  const description =
    'Professional free image tools: compress images, remove backgrounds, convert formats, edit and resize photos. No signup. 100% browser-based.';

  return {
    title, description,
    keywords: [
      'image tools online free', 'compress image', 'remove background', 'image converter',
      'resize image online', 'crop image', 'photo editor free', 'webp to jpg', 'png to jpg',
      'image compressor no signup', 'background remover free',
    ],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/image-tools'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, site: '@convertallnow', creator: '@convertallnow' },
    alternates: {
      canonical: getCanonicalUrl(locale, '/image-tools'),
      languages: getAlternateLanguages('/image-tools'),
    },
  };
}

const faqs = [
  {
    question: 'What image formats are supported?',
    answer: 'Our tools support JPG, JPEG, PNG, WebP, GIF, BMP, TIFF, AVIF, and more. Specific format support varies by tool and is noted on each tool\'s page.',
  },
  {
    question: 'Does compressing an image reduce its quality?',
    answer: 'Our Image Compressor uses smart compression algorithms. You can adjust the quality slider — typically 75-85% quality is visually identical to the original but significantly smaller in file size.',
  },
  {
    question: 'How does AI background removal work?',
    answer: 'Our Remove Background tool uses on-device AI models to detect the subject in your image and remove the surrounding background, creating a transparent PNG in seconds.',
  },
  {
    question: 'Can I batch convert multiple images at once?',
    answer: 'Yes! Our Image Converter and Image Compressor both support batch processing — upload multiple files and convert or compress them all at once.',
  },
  {
    question: 'Are images uploaded to a server?',
    answer: 'No. All image processing happens entirely in your browser using JavaScript and WebAssembly. Your images never leave your device.',
  },
  {
    question: 'What is the maximum image size I can process?',
    answer: 'There is no strict limit, but very large images (100MB+) may be slower depending on your device\'s memory and processing power.',
  },
];

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free Image Tools Online',
  description: 'Collection of free browser-based image tools including compress, convert, edit, and background removal.',
  url: 'https://convertallnow.com/image-tools',
  hasPart: CATEGORY_TOOLS.image.map(tool => ({
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: `https://convertallnow.com${tool.path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  })),
};

export default async function ImageToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const tHub = await getTranslations({ locale, namespace: 'CategoryHubs' });

  
const faqs = [
  { question: 'Is this tool free to use?', answer: 'Yes, this tool is 100% free with no hidden fees or signups required.' },
  { question: 'Are my files uploaded to a server?', answer: 'No. All processing happens locally in your web browser. Your files never leave your device, ensuring total privacy.' },
  { question: 'Is there a file size limit?', answer: 'Since processing happens in your browser, the limit depends on your device RAM, usually supporting files up to several hundred megabytes.' },
  { question: 'Does this work on mobile devices?', answer: 'Yes! The tool works seamlessly on both desktop and mobile browsers.' },
  { question: 'What browsers are supported?', answer: 'We support all modern browsers including Chrome, Safari, Firefox, and Edge.' },
];

const howToSteps = [
  { name: 'Upload File', text: 'Select or drag and drop your file into the tool.' },
  { name: 'Process', text: 'Click the action button to begin processing. Wait a few moments.' },
  { name: 'Download', text: 'Once completed, download your newly processed file directly to your device.' },
];

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Image Tools', href: '/image-tools' },
  ];
  const relatedTools = RELATED_TOOLS['image-tools'] || [];

  return (
    <>
      
      <HowToSchema name={`How to ${title}`} description={description} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={description} path="/image-tools" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="Online Tools"
        categoryPath="/"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 pb-6">
            {CATEGORY_TOOLS.image?.map((tool) => (
              <Link
                key={tool.path}
                href={tool.path}
                className="group p-6 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name}
                    </h3>
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 transition-all duration-300">
                      →
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <ToolContentSection
            toolName={title}
            introduction={
              <>
                <p>
                  {title} is a free online tool to process your files securely in your browser. Our tool ensures your data remains private while delivering fast results. No installation or registration is required.
                </p>
                <p className="mt-3">
                  This tool operates entirely on your device using advanced web technologies. This means your files are never uploaded to our servers, eliminating privacy risks and avoiding file size limits typically imposed by cloud services.
                </p>
              </>
            }
            features={[
              { title: '100% Free & Unlimited', description: 'Use the tool as many times as you want without any restrictions or fees.' },
              { title: 'Private & Secure', description: 'All processing happens locally in your browser. Your files never leave your device.' },
              { title: 'No Installation', description: 'Works directly in Chrome, Safari, Firefox, and Edge on any device.' },
              { title: 'Fast Processing', description: 'Leverages your device\'s hardware for near-instant results.' },
            ]}
            howToSteps={howToSteps}
            faqs={faqs}
            supportedFormats="Supports all standard formats."
            privacyNote="Your files are completely safe. All processing happens in your browser and files are never uploaded to any server."
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
}

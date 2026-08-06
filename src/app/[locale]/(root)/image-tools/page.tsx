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
  const tHub = await getTranslations({ locale, namespace: 'CategoryHubs' });
  const title = tHub('imageTitle');
  const subtitle = tHub('imageSubtitle');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Image Tools', href: '/image-tools' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={subtitle} path="/image-tools" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="min-h-screen bg-gradient-to-b from-purple-50/40 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <VisualBreadcrumb items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl mb-2">
              <PhotoIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {CATEGORY_TOOLS.image.map((tool) => (
              <Link
                key={tool.path}
                href={tool.path}
                className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 dark:hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {tool.name}
                  </div>
                  {tool.desc && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-normal">
                      {tool.desc}
                    </p>
                  )}
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* FAQs Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

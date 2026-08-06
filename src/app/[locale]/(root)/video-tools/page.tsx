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
import { ArrowRightIcon, FilmIcon } from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Free Video & Audio Tools Online — Compress, Trim, Convert & Extract';
  const description =
    'Free browser-based video and audio tools: compress videos, trim clips, convert video to GIF, extract audio as MP3, and more. No signup, no upload.';

  return {
    title, description,
    keywords: [
      'video tools online free', 'compress video', 'trim video online', 'video to gif',
      'extract audio from video', 'audio trimmer', 'video compressor free',
      'mp4 to mp3', 'video cutter online free', 'audio tools online',
    ],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/video-tools'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, site: '@convertallnow', creator: '@convertallnow' },
    alternates: {
      canonical: getCanonicalUrl(locale, '/video-tools'),
      languages: getAlternateLanguages('/video-tools'),
    },
  };
}

const faqs = [
  {
    question: 'What video formats are supported?',
    answer: 'Our video tools support MP4, WebM, MOV, AVI, MKV, and more. Specific format support depends on your browser\'s built-in codec support.',
  },
  {
    question: 'Will my video quality be reduced when compressing?',
    answer: 'You can control the compression level. Using our quality slider, you can achieve significant file size reduction (typically 50-80%) while keeping visually acceptable quality.',
  },
  {
    question: 'How does video to GIF conversion work?',
    answer: 'Select a video clip, choose the segment, frame rate, and dimensions, and our tool converts it to an animated GIF entirely in your browser using FFmpeg WebAssembly.',
  },
  {
    question: 'Can I extract audio from any video?',
    answer: 'Yes. Our Audio Converter tool extracts audio from MP4, WebM, MOV, and other formats and saves it as MP3, WAV, or OGG — no upload required.',
  },
  {
    question: 'Is there a video file size limit?',
    answer: 'Since processing is browser-based, practical limits depend on your device\'s RAM. Most devices handle files up to 1-2GB. For larger files, processing may take longer.',
  },
  {
    question: 'Why does video processing use FFmpeg?',
    answer: 'FFmpeg is the industry-standard open-source tool for video processing. We use FFmpeg compiled to WebAssembly, which runs entirely in your browser without any server-side processing.',
  },
];

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free Video & Audio Tools Online',
  description: 'Collection of free browser-based video and audio tools including compress, trim, convert, and audio extraction.',
  url: 'https://convertallnow.com/video-tools',
  hasPart: CATEGORY_TOOLS.video.map(tool => ({
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: `https://convertallnow.com${tool.path}`,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  })),
};

export default async function VideoToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHub = await getTranslations({ locale, namespace: 'CategoryHubs' });
  const title = tHub('videoTitle');
  const subtitle = tHub('videoSubtitle');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Video & Audio Tools', href: '/video-tools' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={subtitle} path="/video-tools" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="min-h-screen bg-gradient-to-b from-blue-50/40 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <VisualBreadcrumb items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl mb-2">
              <FilmIcon className="w-8 h-8" />
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
            {CATEGORY_TOOLS.video.map((tool) => (
              <Link
                key={tool.path}
                href={tool.path}
                className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </div>
                  {tool.desc && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-normal">
                      {tool.desc}
                    </p>
                  )}
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
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

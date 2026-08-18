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
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const tHub = await getTranslations({ locale, namespace: 'CategoryHubs' });

  const getT = (text: string) => {
    if (!text) return text;
    const key = text.replace(/\./g, '_');
    try {
      if (tHub.has(key)) return tHub(key);
      if (tHub.has(text)) return tHub(text);
    } catch {}
    return text;
  };

  
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
    { name: 'Video & Audio Tools', href: '/video-tools' },
  ];
  const relatedTools = RELATED_TOOLS['video-tools'] || [];

  return (
    <>
      
      <HowToSchema name={`How to ${title}`} description={description} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={description} path="/video-tools" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="Video & Audio Tools"
        categoryPath="/video-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 pb-6">
            {CATEGORY_TOOLS.video?.map((tool) => (
              <Link
                key={tool.path}
                href={tool.path}
                className="group p-6 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {getT(tool.name)}
                    </h3>
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 transition-all duration-300">
                      →
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {getT(tool.desc)}
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
                  Welcome to the Video Tools Hub, your centralized suite for processing, editing, and optimizing video files entirely within your web browser. Traditionally, video editing required expensive, heavy desktop software. We've changed that by bringing industry-standard tools directly to the web.
                </p>
                <p className="mt-3">
                  Our platform leverages FFmpeg compiled to WebAssembly. This breakthrough technology means your browser uses your computer's own CPU to compress, trim, and convert videos. Your large video files are never uploaded to external servers, providing unmatched speed, zero file-size limits, and guaranteed privacy.
                </p>
              </>
            }
            features={[
              { title: "FFmpeg WebAssembly", description: "Desktop-class video processing running natively in your browser." },
              { title: "No Upload Limits", description: "Process massive 4K videos without waiting for cloud uploads." },
              { title: "Total Data Privacy", description: "Your personal videos remain strictly on your local device." },
              { title: "Universal Formats", description: "Full support for MP4, WebM, MOV, MKV, and AVI files." },
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

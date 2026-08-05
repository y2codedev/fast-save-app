import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, CATEGORY_TOOLS } from '@/lib/seo';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema locale={locale} items={[{ name: 'Video & Audio Tools' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <VisualBreadcrumb items={[{ name: 'Video & Audio Tools' }]} className="px-0 py-2 mb-2" />

        <div className="text-center py-10 md:py-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4">
            <FilmIcon className="h-3.5 w-3.5" />
            Video & Audio Tools
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            {tHub('videoTitle')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {tHub('videoSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {CATEGORY_TOOLS.video.map(tool => (
            <Link
              key={tool.path}
              href={tool.path}
              className="group flex flex-col gap-2 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  {tool.name}
                </span>
                <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-all group-hover:translate-x-1" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>

        <div className="space-y-10 mb-16">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Browser-Based Video & Audio Processing
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
              <p>
                Video files are among the largest and most bandwidth-intensive content types on the web. Whether you're sharing a video on social media, sending a clip to a colleague, or preparing footage for a website, managing video file size and format is critical. ConvertAllNow's video tools leverage FFmpeg compiled to WebAssembly, bringing professional video processing directly into your browser — no installation, no server uploads.
              </p>
              <p>
                Our <Link href="/video-compressor" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Video Compressor</Link> reduces file sizes by up to 80% using H.264 encoding, making videos easy to share via email or messaging apps. The <Link href="/video-trimmer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Video Trimmer</Link> lets you precisely cut any portion of a video clip without re-encoding the entire file. Need an animated GIF? Our <Link href="/video-to-gif" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Video to GIF converter</Link> creates perfect looping GIFs from any video segment.
              </p>
              <p>
                For audio, the <Link href="/audio" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Audio Converter</Link> extracts audio tracks from video files and saves them as MP3, WAV, or OGG with configurable bitrate settings. The <Link href="/audio-trimmer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Audio Trimmer</Link> allows precise trimming of audio files for ringtones, podcasts, and music clips. All audio and video processing is completely private — your files never leave your device.
              </p>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-45 transition-transform inline-block">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

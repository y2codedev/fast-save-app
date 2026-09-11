import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, CATEGORY_TOOLS } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { 
  ArrowRightIcon, 
  FilmIcon, 
  SparklesIcon, 
  ScissorsIcon, 
  SpeakerWaveIcon, 
  ShieldCheckIcon,
  BoltIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  ShieldExclamationIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Free Video & Audio Tools Online — Compress, Trim, Convert & Extract | ConvertAllNow';
  const description =
    'Free browser-based video and audio tools: compress videos, trim clips, convert video to GIF, and extract audio as MP3. Powered by FFmpeg WebAssembly with zero file uploads.';

  return {
    title,
    description,
    keywords: [
      'video tools online free', 'compress video', 'trim video online', 'video to gif',
      'extract audio from video', 'audio trimmer', 'video compressor free',
      'mp4 to mp3', 'video cutter online free', 'audio tools online', 'private video converter',
    ],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/video-tools'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@convertallnow',
      creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/video-tools'),
      languages: getAlternateLanguages('/video-tools'),
    },
  };
}

const COMPRESS_TOOLS = [
  {
    name: 'Video Compressor',
    path: '/video-compressor',
    desc: 'Compress MP4, WebM, and MOV video clips right in your browser. Significantly reduces file size for WhatsApp, Discord, email, and web publishing.',
    badge: 'Flagship Tool',
  },
];

const EDIT_TOOLS = [
  {
    name: 'Video Trimmer',
    path: '/video-trimmer',
    desc: 'Cut and trim video segments with exact start and end timestamps. Fast in-browser clip trimming without needing to re-encode the entire video.',
    badge: 'Fast Cut',
  },
  {
    name: 'Video to GIF',
    path: '/video-to-gif',
    desc: 'Convert short video clips or movie highlights into looping animated GIFs. Adjust frame rate, width, and speed directly in your browser.',
    badge: 'Animated GIF',
  },
];

const AUDIO_TOOLS = [
  {
    name: 'Video to MP3 / Audio Converter',
    path: '/audio',
    desc: 'Extract high-quality audio tracks from MP4, WebM, and MOV videos and export them into MP3, WAV, AAC, or OGG audio formats.',
    badge: 'Extract Audio',
  },
  {
    name: 'Audio Trimmer',
    path: '/audio-trimmer',
    desc: 'Cut audio files, create ringtones, and trim podcast snippets with interactive visual waveforms and precise audio playback.',
    badge: 'Visual Waveform',
  },
];

const SOCIAL_TOOLS = [
  {
    name: 'Instagram Downloader',
    path: '/ig-downloader',
    desc: 'Save public Instagram Reels, Stories, and videos for personal offline reference and viewing.',
    badge: 'Social Media',
  },
];

const faqs = [
  {
    question: 'What video and audio formats are supported?',
    answer: 'Our tools support popular container and media formats including MP4, WebM, MOV, AVI, MKV, MP3, WAV, AAC, OGG, and M4A. Specific format playback depends on browser media decoders and WebAssembly FFmpeg support.',
  },
  {
    question: 'Will video compression noticeably lower video quality?',
    answer: 'You have full control over the compression settings. Our tool uses smart CRF (Constant Rate Factor) encoding algorithms that eliminate invisible high-frequency noise, drastically reducing file size while keeping visual crispness intact.',
  },
  {
    question: 'How does video processing work without server uploads?',
    answer: 'We utilize FFmpeg compiled directly to WebAssembly (WASM). This allows your browser to run the full power of FFmpeg natively on your computer’s CPU and GPU threads. Your video data never travels over the internet.',
  },
  {
    question: 'Can I extract MP3 audio from any video recording?',
    answer: 'Yes. Simply upload your video into our Audio Converter or Video to MP3 tool, choose your desired audio bitrate (e.g. 128kbps, 192kbps, or 320kbps), and the audio stream will be extracted and saved as an MP3 file.',
  },
  {
    question: 'Is there a video file size limit?',
    answer: 'Because video processing occurs entirely in browser memory, practical limits depend on your computer or device’s available RAM. Files up to 500MB–1GB typically process smoothly on modern desktop and laptop systems.',
  },
  {
    question: 'Do social media download tools store my download links or videos?',
    answer: 'No. Link requests are processed solely to retrieve media streams for the user and are never logged, archived, or associated with your identity.',
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
  const title = tHub('videoTitle');
  const heading = tHub('videoHeading');
  const subtitle = tHub('videoSubtitle');

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

      <div className="bg-gradient-to-b from-blue-50/40 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          <VisualBreadcrumb items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl shadow-sm mb-2">
              <FilmIcon className="w-9 h-9" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {heading}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Section 1: Compress Videos */}
          <section className="space-y-6" aria-labelledby="compress-videos-hub">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <SparklesIcon className="w-6 h-6 text-purple-500" />
              <h2 id="compress-videos-hub" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('videoCompressTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COMPRESS_TOOLS.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 dark:hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                    <span>Compress Video Free</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 2: Trim & Cut Videos */}
          <section className="space-y-6" aria-labelledby="edit-videos-hub">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <ScissorsIcon className="w-6 h-6 text-purple-500" />
              <h2 id="edit-videos-hub" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('videoEditTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {EDIT_TOOLS.map((tool) => (
                <Link
                  key={tool.path + tool.name}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-normal">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                    <span>Open Tool</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: Convert & Extract Audio */}
          <section className="space-y-6" aria-labelledby="audio-tools-hub">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <MusicalNoteIcon className="w-6 h-6 text-purple-500" />
              <h2 id="audio-tools-hub" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('videoAudioTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {AUDIO_TOOLS.map((tool) => (
                <Link
                  key={tool.path + tool.name}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-normal">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                    <span>Extract / Trim Audio</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 4: Social Tools */}
          <section className="space-y-6" aria-labelledby="social-tools-hub">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <SpeakerWaveIcon className="w-6 h-6 text-purple-500" />
              <h2 id="social-tools-hub" className="text-2xl font-bold text-gray-900 dark:text-white">
                Social Video Downloaders
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SOCIAL_TOOLS.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                    <span>Open Downloader</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 5: Why Our Video Tools Are Private */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6" aria-labelledby="video-privacy-breakdown">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-2xl">
                <ShieldExclamationIcon className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <h2 id="video-privacy-breakdown" className="text-2xl font-bold text-white">
                  {tHub('videoPrivacyTitle')}
                </h2>
                <p className="text-gray-300 text-sm">
                  Powered by FFmpeg WebAssembly executed inside your browser sandbox.
                </p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                Video files are large, private, and computationally expensive. Traditional websites require you to spend minutes uploading hundreds of megabytes to their cloud servers, where your personal videos sit on their hard drives.
              </p>
              <p>
                ConvertAllNow eliminates this security risk. Our <Link href="/video-compressor" className="text-purple-400 hover:underline">Video Compressor</Link> and <Link href="/video-trimmer" className="text-purple-400 hover:underline">Video Trimmer</Link> run the industry-standard FFmpeg multimedia engine directly inside your browser via WebAssembly (WASM).
              </p>
              <p>
                Your video bits stay securely in your device’s local memory buffer. Files stay on your device with no server upload wait times.
              </p>
            </div>
          </section>

          {/* Section 6: FAQs */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Frequently Asked Questions About Video & Audio Tools
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
      </ToolLayoutWithAds>
    </>
  );
}

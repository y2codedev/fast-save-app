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
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import VideoCompressor from '@/components/sections/VideoCompressor';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VideoCompressorSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['video-compressor'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/video-compressor'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/video-compressor.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/video-compressor.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/video-compressor'),
      languages: getAlternateLanguages('/video-compressor'),
    },
  };
}

const faqs = [
  { question: 'How does the video compressor work?', answer: 'It uses FFmpeg compiled to WebAssembly, which runs directly in your browser. The video is re-encoded using H.264 codec at your selected quality level.' },
  { question: 'What video formats are supported?', answer: 'Input: MP4, WebM, MOV, AVI, MKV, and more. Output is typically MP4 (H.264), which is universally compatible across all devices and platforms.' },
  { question: 'Is there a video file size limit?', answer: 'No server-imposed limit. Processing is done in your browser, so practical limits are your device\'s available RAM — most devices handle 1-2GB files comfortably.' },
  { question: 'How much will my video be compressed?', answer: 'Compression ratio depends on the original quality and your settings. Typically 50-80% size reduction is achievable. The quality slider lets you control the trade-off.' },
  { question: 'Will compressed video lose quality?', answer: 'Some quality loss occurs with any lossy compression, but at moderate settings (CRF 23-28), the visual difference is minimal to imperceptible in most videos.' },
  { question: 'How long does video compression take?', answer: 'Processing time depends on video length, resolution, and your device\'s CPU speed. A 1-minute HD video typically takes 30-120 seconds to compress.' },
  { question: 'Can I compress video for WhatsApp or email?', answer: 'Yes! WhatsApp has a 16MB limit. Set a lower quality to ensure your compressed video meets size requirements for sharing via messaging apps or email.' },
  { question: 'Does compressed video work on all devices?', answer: 'Yes. Output is in MP4 (H.264) format, which is supported universally on iOS, Android, Windows, macOS, and all web browsers.' },
];

const howToSteps = [
  { name: 'Upload Video', text: 'Click the upload area or drag and drop your video file. Supports MP4, WebM, MOV, AVI, MKV, and more.' },
  { name: 'Set Compression Level', text: 'Choose your quality setting. Lower quality = smaller file size. For most uses, "Medium" or "High" quality works best.' },
  { name: 'Start Compression', text: 'Click "Compress Video". FFmpeg processes the video entirely in your browser — this may take a minute depending on file size.' },
  { name: 'Download Result', text: 'Once complete, click "Download" to save the compressed MP4 to your device.' },
];

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VideoCompressorSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/video-compressor', locale,
    featureList: ['Compress MP4/WebM/MOV', 'Adjustable quality settings', 'Browser-based FFmpeg', 'No file upload'],
    screenshot: '/images/video-compressor.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Video Tools', href: '/video-tools' },
    { name: t('title') },
  ];

  const relatedTools = RELATED_TOOLS['video-compressor'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT3M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/video-compressor" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Video & Audio Tools"
        categoryName="Video & Audio Tools"
        categoryPath="/video-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems.slice(1)} />
          <NoSSRWrapper><VideoCompressor /></NoSSRWrapper>
          <ToolContentSection
            toolName="Video Compressor"
            introduction={
              <>
                <p>
                  Video Compressor is a free online tool that reduces video file sizes using FFmpeg WebAssembly — running entirely in your web browser without uploading files to any server. Whether you need to compress a video for WhatsApp, shrink a large MP4 for email, or reduce storage usage, our tool delivers professional results in minutes.
                </p>
                <p className="mt-3">
                  Powered by FFmpeg — the industry-standard open-source video processing library — compiled to WebAssembly, our compressor gives you the same capabilities as desktop video tools without any installation. The H.264 encoder provides excellent compression efficiency, typically reducing file sizes by 50-80% while maintaining visually acceptable quality.
                </p>
                <p className="mt-3">
                  The quality slider lets you control the trade-off between file size and quality. A CRF (Constant Rate Factor) value of 23 is ideal for general use, while higher values (28-35) are suitable for videos that will be further compressed or are intended for preview purposes. Output is always in the universally compatible MP4 format.
                </p>
                <p className="mt-3">
                  After compressing, you may want to <strong><a href="/video-trimmer" className="text-indigo-600 dark:text-indigo-400 hover:underline">trim specific segments</a></strong>, <strong><a href="/video-to-gif" className="text-indigo-600 dark:text-indigo-400 hover:underline">create an animated GIF</a></strong>, or <strong><a href="/audio" className="text-indigo-600 dark:text-indigo-400 hover:underline">extract the audio track</a></strong>.
                </p>
              </>
            }
            features={[
              { title: 'FFmpeg WebAssembly', description: 'Industry-standard video processing runs natively in your browser.' },
              { title: 'Quality Control', description: 'Adjustable CRF slider to balance output size and visual quality.' },
              { title: 'H.264 Encoding', description: 'Universal MP4 output compatible with all devices and platforms.' },
              { title: 'No Server Upload', description: 'Video processing is 100% local — complete privacy guaranteed.' },
              { title: 'All Major Formats', description: 'Supports MP4, WebM, MOV, AVI, MKV input formats.' },
              { title: 'Progress Indicator', description: 'Real-time compression progress with estimated time remaining.' },
            ]}
            howToSteps={howToSteps}
            useCases={[
              'Compressing videos to meet WhatsApp\'s 16MB sharing limit',
              'Reducing video size for Gmail or Outlook attachments',
              'Optimizing videos for website embedding and faster loading',
              'Shrinking screen recordings before sharing with colleagues',
              'Archiving large video libraries with reduced storage footprint',
              'Compressing social media videos (Instagram Reels, TikTok, YouTube Shorts)',
              'Preparing videos for mobile app content delivery',
            ]}
            supportedFormats={['MP4', 'WebM', 'MOV', 'AVI', 'MKV', 'FLV', 'WMV', 'M4V']}
            privacyNote="Video processing using FFmpeg WebAssembly happens entirely in your browser. Your video files are never transmitted to our servers. All compression is performed locally on your device using your CPU."
            tips={[
              'For WhatsApp sharing, aim for a file under 16MB — use the "Low" quality preset as a starting point.',
              'Processing is CPU-intensive — close unnecessary browser tabs to speed up compression.',
              'Longer videos at high resolution will take more time. 4K+ videos may take several minutes.',
              'For best results, trim your video first to remove unwanted segments before compressing.',
              'Try compressing at Medium quality first — if the size is still too large, try Low quality.',
            ]}
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
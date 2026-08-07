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
import VideoTrimmer from '@/components/sections/VideoTrimmer';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VideoTrimmerSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['video-trimmer'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/video-trimmer'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/video-trimmer.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/video-trimmer.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/video-trimmer'),
      languages: getAlternateLanguages('/video-trimmer'),
    },
  };
}

const faqs = [
  { question: 'Will trimming re-encode my entire video?', answer: 'Our trimmer uses FFmpeg WebAssembly to cut your video precisely. Depending on the settings, it may use stream copy (no re-encoding) or re-encode only when necessary for accuracy.' },
  { question: 'What video formats can I trim?', answer: 'Supported input formats include MP4, WebM, MOV, AVI, and MKV. Output is typically in MP4 (H.264) format for universal compatibility.' },
  { question: 'How precise is the trimming?', answer: 'Trimming precision depends on the video\'s keyframe structure. Frame-accurate cuts are available, though some codecs may trim to the nearest keyframe for maximum speed.' },
  { question: 'Is there a video length or file size limit?', answer: 'No server-imposed limits. Practical limits depend on your device\'s RAM. Most devices handle videos up to 1-2GB comfortably.' },
  { question: 'Are my videos uploaded to a server?', answer: 'No. All video processing happens in your browser using FFmpeg WebAssembly. Your files never leave your device.' },
  { question: 'Can I extract a specific clip from the middle of a video?', answer: 'Yes! Use the start and end time selectors to define any segment of your video. Only that segment will be extracted and downloaded.' },
  { question: 'Will the audio be preserved in the trimmed video?', answer: 'Yes. The trimmed video retains its original audio track, perfectly synchronized with the video.' },
];

const howToSteps = [
  { name: 'Upload Video', text: 'Click the upload area or drag and drop your video file (MP4, WebM, MOV, AVI, or MKV).' },
  { name: 'Set Start & End Points', text: 'Use the timeline or input the exact start and end times to define your clip.' },
  { name: 'Trim', text: 'Click "Trim". FFmpeg processes the video entirely in your browser — no upload needed.' },
  { name: 'Download', text: 'Download the trimmed video clip to your device.' },
];

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const t = await getTranslations({ locale, namespace: 'VideoTrimmerSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/video-trimmer', locale,
    featureList: ['FFmpeg WebAssembly trimming', 'Frame-accurate cuts', 'No file upload', 'MP4/WebM/MOV support'],
    screenshot: '/images/video-trimmer.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Video & Audio Tools', href: '/video-tools' },
    { name: 'Video Trimmer' },
  ];

  const relatedTools = RELATED_TOOLS['video-trimmer'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT2M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/video-trimmer" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Video & Audio Tools"
        categoryName="Video & Audio Tools"
        categoryPath="/video-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems.slice(1)} />
          <NoSSRWrapper><VideoTrimmer /></NoSSRWrapper>
          <ToolContentSection
            toolName="Video Trimmer"
            introduction={
              <>
                <p>
                  Video Trimmer is a free online tool that lets you precisely cut and extract clips from any video — entirely in your browser without uploading files to any server. Whether you need to remove the beginning or end of a recording, extract a highlight clip from a longer video, cut out a specific scene, or create a short snippet for social media, our tool handles it instantly using FFmpeg WebAssembly.
                </p>
                <p className="mt-3">
                  Powered by FFmpeg compiled to WebAssembly, the same technology used in professional video editing applications is available directly in your browser. You can set precise start and end times to extract any segment of your video. The trimmed clip retains the original video quality, codec, and audio track — nothing is re-encoded unless required for accuracy.
                </p>
                <p className="mt-3">
                  Output is saved as a standard MP4 file, universally compatible with iOS, Android, Windows, macOS, and all social media platforms. After trimming, you may want to <strong><a href="/video-compressor" className="text-indigo-600 dark:text-indigo-400 hover:underline">compress the trimmed clip</a></strong> for smaller file size, <strong><a href="/video-to-gif" className="text-indigo-600 dark:text-indigo-400 hover:underline">convert it to a GIF</a></strong>, or <strong><a href="/audio" className="text-indigo-600 dark:text-indigo-400 hover:underline">extract its audio track</a></strong>.
                </p>
              </>
            }
            features={[
              { title: 'FFmpeg WebAssembly', description: 'Professional-grade video trimming runs directly in your browser.' },
              { title: 'Precise Time Selection', description: 'Set exact start/end times with second-level precision.' },
              { title: 'No Re-encoding', description: 'Stream copy mode preserves original quality without re-encoding.' },
              { title: 'Audio Preserved', description: 'Trimmed clips retain original synchronized audio tracks.' },
              { title: 'Browser-Based', description: 'No server upload — all processing is private and local.' },
              { title: 'Universal MP4 Output', description: 'Compatible with all devices and social media platforms.' },
            ]}
            howToSteps={howToSteps}
            useCases={[
              'Cutting unwanted intros and outros from recorded meetings',
              'Extracting highlight clips from long sports or event recordings',
              'Creating short snippets from lectures or tutorials for sharing',
              'Trimming social media videos to meet platform time limits',
              'Removing sensitive portions from screen recordings before sharing',
              'Creating preview clips or trailers from longer video content',
              'Extracting specific scenes for video editing projects',
            ]}
            supportedFormats={['MP4', 'WebM', 'MOV', 'AVI', 'MKV', 'FLV', 'M4V']}
            privacyNote="All video processing happens locally in your browser using FFmpeg WebAssembly. Your video files are never uploaded to any server. The entire trimming operation occurs on your device, ensuring complete privacy."
            tips={[
              'Use the video preview to precisely identify your start and end points before trimming.',
              'For longer videos, allow extra time for FFmpeg to process — CPU-intensive on large files.',
              'Compress the trimmed video afterwards if you need a smaller file for sharing.',
              'Close other browser tabs before processing large videos to free up memory.',
              'For very precise cuts, enter the exact timestamp in hours:minutes:seconds format.',
            ]}
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
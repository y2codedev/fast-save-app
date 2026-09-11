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
import AudioTrimmer from '@/components/sections/AudioTrimmer';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AudioTrimmerSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['audio-trimmer'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/audio-trimmer'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/audio-trimmer.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/audio-trimmer.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/audio-trimmer'),
      languages: getAlternateLanguages('/audio-trimmer'),
    },
  };
}

const faqs = [
  { question: 'What audio formats are supported?', answer: 'Supported input formats include MP3, WAV, OGG, AAC, FLAC, M4A, and AIFF. Output format depends on the input, typically preserved in the same format.' },
  { question: 'Will audio quality be affected by trimming?', answer: 'When using stream copy mode, audio quality is completely preserved as no re-encoding occurs. If re-encoding is required, quality settings are optimized to minimize any loss.' },
  { question: 'Can I use this to create a ringtone?', answer: 'Yes! Trim your favorite song or audio clip to 20-30 seconds and download it. On iPhone, you\'ll need to use iTunes/Finder to set it as a ringtone. On Android, it can be set directly.' },
  { question: 'Are my audio files uploaded to a server?', answer: 'No. All processing happens in your browser using FFmpeg WebAssembly. Your audio files never leave your device.' },
  { question: 'Can I trim multiple audio files at once?', answer: 'Currently, the tool processes one file at a time. Upload, trim, and download each file individually.' },
  { question: 'How precise is the audio trimming?', answer: 'Audio trimming is precise to the millisecond. You can enter exact timestamps in the format hours:minutes:seconds.milliseconds for frame-perfect cuts.' },
  { question: 'Can I fade in or fade out the trimmed audio?', answer: 'Yes, our trimmer includes optional fade-in and fade-out effects that can be applied at the start and end of your trimmed clip.' },
];

const howToSteps = [
  { name: 'Upload Audio File', text: 'Click the upload area or drag and drop your MP3, WAV, OGG, or other audio file.' },
  { name: 'Set Trim Points', text: 'Use the waveform timeline or input fields to set exact start and end times.' },
  { name: 'Apply Trim', text: 'Click "Trim". FFmpeg processes the audio entirely in your browser.' },
  { name: 'Download Result', text: 'Download the trimmed audio file in the original format.' },
];

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;


  
  

  const t = await getTranslations({ locale, namespace: 'AudioTrimmerSEO' });
  const title = t('title');
  const description = t('description');

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/audio-trimmer', locale,
    featureList: ['FFmpeg WebAssembly audio trimming', 'Precise millisecond cuts', 'Fade in/out effects', 'Browser-based'],
    screenshot: '/images/audio-trimmer.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Video & Audio Tools', href: '/video-tools' },
    { name: 'Audio Trimmer' },
  ];

  const relatedTools = RELATED_TOOLS['audio-trimmer'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/audio-trimmer" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Video & Audio Tools"
        categoryName="Video & Audio Tools"
        categoryPath="/video-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems.slice(1)} />
          <NoSSRWrapper><AudioTrimmer /></NoSSRWrapper>
          <ToolContentSection
            toolName="Audio Trimmer"
            introduction={
              <>
                <p>
                  Audio Trimmer is a free online tool that lets you precisely cut and trim any audio file — entirely in your web browser without any file uploads. Whether you're creating a ringtone, editing a podcast clip, removing silence from a recording, or extracting a specific musical phrase, our trimmer delivers studio-quality results in seconds.
                </p>
                <p className="mt-3">
                  Built on FFmpeg WebAssembly, our Audio Trimmer supports all major audio formats including MP3, WAV, OGG, AAC, FLAC, M4A, and AIFF. You can set precise start and end times to the millisecond, apply optional fade-in and fade-out effects, and download the trimmed result in the original audio format — no quality loss in stream copy mode.
                </p>
                <p className="mt-3">
                  The tool is ideal for podcast editors, musicians, content creators, and anyone who works with audio. After trimming, you may want to <strong><a href="/audio" className="text-indigo-600 dark:text-indigo-400 hover:underline">convert the audio format</a></strong> or <strong><a href="/video-trimmer" className="text-indigo-600 dark:text-indigo-400 hover:underline">trim the source video</a></strong> it was extracted from.
                </p>
              </>
            }
            features={[
              { title: 'Millisecond Precision', description: 'Set exact trim points to millisecond accuracy.' },
              { title: 'Waveform Visualization', description: 'See the audio waveform to identify exact trim points.' },
              { title: 'Fade In/Out Effects', description: 'Optional smooth fade effects at start and end of clips.' },
              { title: 'No Quality Loss', description: 'Stream copy mode preserves original audio quality.' },
              { title: 'All Audio Formats', description: 'Supports MP3, WAV, OGG, AAC, FLAC, M4A, and AIFF.' },
              { title: 'Browser-Based', description: 'No upload required — completely private local processing.' },
            ]}
            howToSteps={howToSteps}
            useCases={[
              'Creating ringtones from songs or audio clips',
              'Editing podcast episodes to remove silence or off-topic sections',
              'Extracting specific musical phrases for samples or reference',
              'Removing dead air from the beginning or end of recordings',
              'Creating short audio previews or trailers',
              'Trimming recorded lectures or interviews to specific topics',
              'Preparing audio clips for use in video editing projects',
            ]}
            supportedFormats={['MP3', 'WAV', 'OGG', 'AAC', 'FLAC', 'M4A', 'AIFF', 'OPUS']}
            privacyNote="Audio trimming uses FFmpeg WebAssembly and runs entirely in your browser. Your audio files are never uploaded to or stored on our servers. All processing happens on your local device."
            tips={[
              'Use the waveform view to visually identify silence, applause, or specific audio events.',
              'For ringtones, aim for 20-30 seconds and apply a 1-2 second fade-out for a professional finish.',
              'Enter exact timestamps for precision cuts rather than dragging the handles.',
              'For podcasts, consider removing the first/last few seconds of background noise or room tone.',
            ]}
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

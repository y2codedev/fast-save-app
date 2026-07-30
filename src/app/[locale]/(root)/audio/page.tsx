import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import AudioSections from '@/components/sections/AudioSections';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VideoToAudioSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['audio'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/audio'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/video-to-audio.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/video-to-audio.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/audio'),
      languages: getAlternateLanguages('/audio'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VideoToAudioSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/audio', locale,
    featureList: ['Video to MP3 conversion', 'Extract audio from any video', 'High quality output', 'Browser-based processing'],
    screenshot: '/images/video-to-audio.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'Audio Tools', href: '/audio' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <NoSSRWrapper><AudioSections /></NoSSRWrapper>
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
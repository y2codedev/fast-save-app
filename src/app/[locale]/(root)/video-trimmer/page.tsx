import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import VideoTrimmer from '@/components/sections/VideoTrimmer';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

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

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VideoTrimmerSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/video-trimmer', locale,
    featureList: ['Trim and cut videos', 'Set precise start/end times', 'No quality loss', 'Browser-based FFmpeg'],
    screenshot: '/images/video-trimmer.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'Video Tools', href: '/video-trimmer' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <NoSSRWrapper><VideoTrimmer /></NoSSRWrapper>
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
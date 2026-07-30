import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import VideoCompressor from '@/components/sections/VideoCompressor';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VideoCompressorSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS['video-compressor'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/video-compressor'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
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

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VideoCompressorSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/video-compressor', locale,
    featureList: ['Compress MP4/WebM/MOV', 'Adjustable quality settings', 'Browser-based FFmpeg', 'No file upload'],
    screenshot: '/images/video-compressor.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'Video Tools', href: '/video-compressor' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <NoSSRWrapper><VideoCompressor /></NoSSRWrapper>
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
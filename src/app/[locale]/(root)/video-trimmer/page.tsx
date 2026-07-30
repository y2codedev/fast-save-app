import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import VideoTrimmer from '@/components/sections/VideoTrimmer';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://convertallnow.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VideoTrimmerSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/video-trimmer`,
      siteName: 'ConvertAllNow',
      locale,
      type: 'website',
      images: [
        {
          url: '/images/video-trimmer.png',
          width: 1200,
          height: 630,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/video-trimmer.png'],
      site: '@convertallnow',
      creator: '@convertallnow',
    },
    alternates: {
      canonical: `${siteUrl}/video-trimmer`,
    }
  };
}

const Page = () => {
  const t = useTranslations('VideoTrimmerSEO');

  const schemaData = {
      '@context': 'https://schema.org' as const,
      '@type': 'WebApplication' as const,
      'name': 'Video Trimmer Tool',
      'description': t('description'),
      'applicationCategory': 'Multimedia' as const,
      'operatingSystem': 'Web' as const,
  };

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <NoSSRWrapper>
            <VideoTrimmer />
          </NoSSRWrapper>
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
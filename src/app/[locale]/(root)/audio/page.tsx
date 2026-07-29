import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import AudioSections from '@/components/sections/AudioSections';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'VideoToAudioSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/audio`,
      siteName: 'FastSave',
      locale,
      type: 'website',
      images: [
        {
          url: '/images/video-to-audio.png',
          width: 1200,
          height: 630,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/video-to-audio.png'],
      site: '@fastsaveapp',
      creator: '@fastsaveapp',
    },
    alternates: {
      canonical: `${siteUrl}/audio`,
    }
  };
}

const Page = () => {
  const t = useTranslations('VideoToAudioSEO');

  const schemaData = {
      '@context': 'https://schema.org' as const,
      '@type': 'WebApplication' as const,
      'name': 'Video to Audio Converter',
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
            <AudioSections />
          </NoSSRWrapper>
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
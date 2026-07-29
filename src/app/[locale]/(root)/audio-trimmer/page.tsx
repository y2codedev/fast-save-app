import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import AudioTrimmer from '@/components/sections/AudioTrimmer';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'AudioTrimmerSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/audio-trimmer`,
      siteName: 'FastSave',
      locale,
      type: 'website',
      images: [
        {
          url: '/images/audio-trimmer.png',
          width: 1200,
          height: 630,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/audio-trimmer.png'],
      site: '@fastsaveapp',
      creator: '@fastsaveapp',
    },
    alternates: {
      canonical: `${siteUrl}/audio-trimmer`,
    }
  };
}

const Page = () => {
  const t = useTranslations('AudioTrimmerSEO');

  const schemaData = {
      '@context': 'https://schema.org' as const,
      '@type': 'WebApplication' as const,
      'name': 'Audio Trimmer Tool',
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
            <AudioTrimmer />
          </NoSSRWrapper>
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import VideoToGifConverter from '@/components/sections/VideoToGifConverter';

const title = 'Video to GIF Converter - Create Animated GIFs - FastSave';
const description = 'Convert MP4 and other videos to high-quality animated GIFs instantly. Free online video to GIF maker.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${siteUrl}/video-to-gif`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/video-to-gif.png',
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/video-to-gif.png'],
    site: '@fastsaveapp',
    creator: '@fastsaveapp',
  },
  alternates: {
    canonical: `${siteUrl}/video-to-gif`,
  }
};

const schemaData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication' as const,
    'name': 'Video to GIF Converter',
    'description': description,
    'applicationCategory': 'Multimedia' as const,
    'operatingSystem': 'Web' as const,
};

const Page = () => {
  return (
    <>
      <SchemaMarkup data={schemaData} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <NoSSRWrapper>
            <VideoToGifConverter />
          </NoSSRWrapper>
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
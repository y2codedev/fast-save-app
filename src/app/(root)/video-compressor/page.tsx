import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import VideoCompressor from '@/components/sections/VideoCompressor';

const title = 'Video Compressor Online - Reduce Video Size - FastSave';
const description = 'Compress video files online without losing quality. Reduce MP4 file size quickly and securely in your browser.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${siteUrl}/video-compressor`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/video-compressor.png',
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/video-compressor.png'],
    site: '@fastsaveapp',
    creator: '@fastsaveapp',
  },
  alternates: {
    canonical: `${siteUrl}/video-compressor`,
  }
};

const schemaData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication' as const,
    'name': 'Video Compressor Tool',
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
            <VideoCompressor />
          </NoSSRWrapper>
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
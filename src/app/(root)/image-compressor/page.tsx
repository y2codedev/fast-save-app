import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import AdvancedImageEditor from '@/components/sections/AdvancedImageEditor';

const title = 'Image Compressor - Compress JPG, PNG Online Free - FastSave';
const description = 'Reduce image file size easily online without losing quality. Free image compressor for fast web loading.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${siteUrl}/image-compressor`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/image-compressor.png',
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/image-compressor.png'],
    site: '@fastsaveapp',
    creator: '@fastsaveapp',
  },
  alternates: {
    canonical: `${siteUrl}/image-compressor`,
  }
};

const schemaData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication' as const,
    'name': 'Image Compressor Tool',
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
            <AdvancedImageEditor />
          </NoSSRWrapper>
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
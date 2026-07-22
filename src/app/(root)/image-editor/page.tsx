import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import AdvancedImageEditor from '@/components/sections/AdvancedImageEditor';

const title = 'Pro Image Editor Online - Edit Photos Free - FastSave';
const description = 'Edit, crop, resize, and apply filters to your images online. Free professional photo editing tools.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${siteUrl}/image-editor`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/home-og.png',
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/home-og.png'],
    site: '@fastsaveapp',
    creator: '@fastsaveapp',
  },
  alternates: {
    canonical: `${siteUrl}/image-editor`,
  }
};

const schemaData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication' as const,
    'name': 'Pro Image Editor',
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
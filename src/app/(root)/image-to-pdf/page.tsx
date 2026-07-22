import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import ImageToPdfConverter from '@/components/sections/ImageToPdfConverter';

const title = 'Image to PDF Converter - JPG to PDF Free - FastSave';
const description = 'Convert JPG, PNG, and other images to a single PDF document easily. Fast, free, and secure online converter.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${siteUrl}/image-to-pdf`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/image-to-pdf.png',
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/image-to-pdf.png'],
    site: '@fastsaveapp',
    creator: '@fastsaveapp',
  },
  alternates: {
    canonical: `${siteUrl}/image-to-pdf`,
  }
};

const schemaData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication' as const,
    'name': 'Image to PDF Converter',
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
            <ImageToPdfConverter />
          </NoSSRWrapper>
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
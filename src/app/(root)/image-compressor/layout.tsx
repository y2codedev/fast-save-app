import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';

const title = 'Compress Images Online Without Losing Quality - FastSave';
const description = 'Reduce image file size instantly with our free image compressor. Compress JPG, PNG, WEBP without losing visible quality.';
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
    images: [{ url: '/images/image-compressor.png', width: 1200, height: 630 }]
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup data={schemaData} />
      {children}
    </>
  );
}

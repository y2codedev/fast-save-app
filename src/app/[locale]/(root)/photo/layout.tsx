import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';

const title = 'Image Converter & Photo Tools - FastSave';
const description = 'Convert images between formats (JPG, PNG, WEBP, SVG) easily with our free online image converter.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${siteUrl}/photo`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/images/photo-converter.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/photo-converter.png'],
    site: '@fastsaveapp',
    creator: '@fastsaveapp',
  },
  alternates: {
    canonical: `${siteUrl}/photo`,
  }
};

const schemaData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication' as const,
    'name': 'Image Converter Tool',
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

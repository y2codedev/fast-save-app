import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';

const title = 'Remove Background from Image Free Online - FastSave';
const description = 'Instantly remove backgrounds from images with AI. 100% free, fast, and high quality background eraser online.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${siteUrl}/bg-remover`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/images/bg-remover.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/bg-remover.png'],
    site: '@fastsaveapp',
    creator: '@fastsaveapp',
  },
  alternates: {
    canonical: `${siteUrl}/bg-remover`,
  }
};

const schemaData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication' as const,
    'name': 'Background Remover Tool',
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

import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';

const description = 'Instantly remove backgrounds from images with AI. 100% free, fast, and high quality background eraser online.';

const schemaData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication' as const,
    'name': 'Background Remover Tool',
    'description': description,
    'applicationCategory': 'Multimedia' as const,
    'operatingSystem': 'Web' as const,
    'offers': {
      '@type': 'Offer' as const,
      'price': '0',
      'priceCurrency': 'USD',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup data={schemaData} />
      {children}
    </>
  );
}

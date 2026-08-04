import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';

const description = 'Convert images between formats (JPG, PNG, WEBP, SVG) easily with our free online image converter.';

const schemaData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication' as const,
    'name': 'Image Converter Tool',
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

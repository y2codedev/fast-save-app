import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';

const description = 'Reduce image file size instantly with our free image compressor. Compress JPG, PNG, WEBP without losing visible quality.';

const schemaData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication' as const,
    'name': 'Image Compressor Tool',
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

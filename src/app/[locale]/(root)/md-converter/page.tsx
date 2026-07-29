import MdConverter from '@/components/sections/MdConverter';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MdConverterSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: ['markdown converter', 'md to pdf', 'markdown to word', 'md to docx', 'free md converter', 'online markdown editor', 'browser md to pdf', 'privacy markdown converter'],
    openGraph: {
      title,
      description,
      url: `${siteUrl}/md-converter`,
      siteName: 'FastSave',
      images: [
        {
          url: `/images/md-converter.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/md-converter.png`],
    },
    alternates: {
      canonical: `${siteUrl}/md-converter`,
    }
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MdConverterSEO' });

  const schemaData = {
      "@context": "https://schema.org" as const,
      "@type": "WebApplication" as const,
      "name": t('title'),
      "description": t('description'),
      "applicationCategory": "Multimedia" as const,
      "operatingSystem": "Web" as const,
  };

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <MdConverter />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

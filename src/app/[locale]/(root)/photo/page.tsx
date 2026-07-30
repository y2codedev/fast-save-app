import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import ImageConverter from '@/components/sections/ImageConverter';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageConverterSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['photo'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/photo'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/photo-converter.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/photo-converter.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/photo'),
      languages: getAlternateLanguages('/photo'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageConverterSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/photo', locale,
    featureList: ['Convert PNG to JPG', 'Convert JPG to WebP', 'SVG to PNG', 'Batch image conversion'],
    screenshot: '/images/photo-converter.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'Image Tools', href: '/photo' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <ImageConverter />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
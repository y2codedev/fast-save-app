import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import ImageToPdfConverter from '@/components/sections/ImageToPdfConverter';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageToPdfSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS['image-to-pdf'],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/image-to-pdf'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [{ url: '/images/image-to-pdf.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/image-to-pdf.png'],
      site: '@convertallnow',
      creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/image-to-pdf'),
      languages: getAlternateLanguages('/image-to-pdf'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageToPdfSEO' });

  const schemaData = createToolSchema({
    name: t('title'),
    description: t('description'),
    path: '/image-to-pdf',
    locale,
    featureList: ['Convert JPG/PNG to PDF', 'Multiple images to single PDF', 'Drag and drop reorder', 'Browser-based processing'],
    screenshot: '/images/image-to-pdf.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'PDF Tools', href: '/image-to-pdf' },
        { name: t('title') },
      ]} />
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
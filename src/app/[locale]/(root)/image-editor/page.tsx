import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import NoSSRWrapper from '@/components/sections/NoSSRWrapper';
import AdvancedImageEditor from '@/components/sections/AdvancedImageEditor';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageEditorSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['image-editor'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/image-editor'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/home-og.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/home-og.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/image-editor'),
      languages: getAlternateLanguages('/image-editor'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ImageEditorSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/image-editor', locale,
    featureList: ['Resize and crop images', 'Rotate and flip', 'Filters and adjustments', 'Browser-based editing'],
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'Image Tools', href: '/image-editor' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <NoSSRWrapper><AdvancedImageEditor /></NoSSRWrapper>
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
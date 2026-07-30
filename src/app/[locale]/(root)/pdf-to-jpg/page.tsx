import PdfToJpg from '@/components/sections/PdfToJpg';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PdfToJpgSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS['pdf-to-jpg'],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/pdf-to-jpg'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [{ url: "/images/pdf-to-jpg.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/pdf-to-jpg.png"],
      creator: "@convertallnow",
      site: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/pdf-to-jpg'),
      languages: getAlternateLanguages('/pdf-to-jpg'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PdfToJpgSEO' });

  const schemaData = createToolSchema({
    name: t('title'),
    description: t('description'),
    path: '/pdf-to-jpg',
    locale,
    featureList: ['PDF to JPG conversion', 'High quality image extraction', 'Batch page conversion', 'Browser-based processing'],
    screenshot: '/images/pdf-to-jpg.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'PDF Tools', href: '/pdf-to-jpg' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <PdfToJpg />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

import MdConverter from '@/components/sections/MdConverter';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MdConverterSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS['md-converter'],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/md-converter'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [{ url: `/images/md-converter.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/md-converter.png`],
      site: '@convertallnow',
      creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/md-converter'),
      languages: getAlternateLanguages('/md-converter'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MdConverterSEO' });

  const schemaData = createToolSchema({
    name: t('title'),
    description: t('description'),
    path: '/md-converter',
    locale,
    featureList: ['Markdown to PDF', 'Markdown to DOCX', 'Live preview', 'Browser-based conversion'],
    screenshot: '/images/md-converter.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'PDF Tools', href: '/md-converter' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <MdConverter />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

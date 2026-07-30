import MergePdf from '@/components/sections/MergePdf';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, getSiteUrl, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MergePdfSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS['merge-pdf'],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/merge-pdf'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [
        {
          url: "/images/merge-pdf.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/merge-pdf.png"],
      creator: "@convertallnow",
      site: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/merge-pdf'),
      languages: getAlternateLanguages('/merge-pdf'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MergePdfSEO' });

  const schemaData = createToolSchema({
    name: t('title'),
    description: t('description'),
    path: '/merge-pdf',
    locale,
    featureList: ['Merge multiple PDFs', 'Drag and drop reorder', 'Browser-based processing', 'No file upload to server'],
    screenshot: '/images/merge-pdf.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'PDF Tools', href: '/merge-pdf' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <MergePdf />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

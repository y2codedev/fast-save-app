import PdfToDocxConverter from '@/components/sections/PdfToDocxConverter';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PdfToDocxSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS['pdf-to-docx'],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/pdf-to-docx'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [
        {
          url: "/images/pdf-to-docx.png",
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
      images: ["/images/pdf-to-docx.png"],
      creator: "@convertallnow",
      site: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/pdf-to-docx'),
      languages: getAlternateLanguages('/pdf-to-docx'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PdfToDocxSEO' });

  const schemaData = createToolSchema({
    name: t('title'),
    description: t('description'),
    path: '/pdf-to-docx',
    locale,
    featureList: ['Convert PDF to editable Word document', 'Preserve layout and images', 'Browser-based local conversion', 'No watermarks'],
    screenshot: '/images/pdf-to-docx.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'PDF Tools', href: '/pdf-to-docx' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <PdfToDocxConverter />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

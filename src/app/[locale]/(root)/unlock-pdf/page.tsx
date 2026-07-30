import UnlockPdf from '@/components/sections/UnlockPdf';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'UnlockPdfSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS['unlock-pdf'],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/unlock-pdf'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [{ url: "/images/unlock-pdf.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/unlock-pdf.png"],
      creator: "@convertallnow",
      site: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/unlock-pdf'),
      languages: getAlternateLanguages('/unlock-pdf'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'UnlockPdfSEO' });

  const schemaData = createToolSchema({
    name: t('title'),
    description: t('description'),
    path: '/unlock-pdf',
    locale,
    featureList: ['Remove PDF passwords', 'Decrypt protected PDFs', 'Browser-based processing', 'No file upload to server'],
    screenshot: '/images/unlock-pdf.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'PDF Tools', href: '/unlock-pdf' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <UnlockPdf />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

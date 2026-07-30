import ProtectPdf from '@/components/sections/ProtectPdf';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProtectPdfSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS['protect-pdf'],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/protect-pdf'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [{ url: "/images/protect-pdf.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/protect-pdf.png"],
      site: "@convertallnow",
      creator: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/protect-pdf'),
      languages: getAlternateLanguages('/protect-pdf'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProtectPdfSEO' });

  const schemaData = createToolSchema({
    name: t('title'),
    description: t('description'),
    path: '/protect-pdf',
    locale,
    featureList: ['Add password to PDF', 'Encrypt PDF documents', 'Browser-based encryption', 'Secure processing'],
    screenshot: '/images/protect-pdf.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'PDF Tools', href: '/protect-pdf' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <ProtectPdf />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

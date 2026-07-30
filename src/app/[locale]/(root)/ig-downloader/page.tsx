import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import TopText from '@/components/sections/TopText';
import DownloadForm from '@/components/sections/DownloadForm';
import DownloadSteps from '@/components/sections/DownloadSteps';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IgDownloaderSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['ig-downloader'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/ig-downloader'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: "/images/insta.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image", title, description,
      images: ["/images/insta.png"],
      site: "@convertallnow", creator: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/ig-downloader'),
      languages: getAlternateLanguages('/ig-downloader'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IgDownloaderSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/ig-downloader', locale,
    featureList: ['Download Instagram Reels in HD', 'No watermark', 'No login required', 'Fast processing'],
    screenshot: '/images/insta.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'Social Tools', href: '/ig-downloader' },
        { name: t('title') },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <div className="pt-8">
            <TopText />
          </div>
          <div className="mx-auto max-w-4xl w-full">
            <DownloadForm />
          </div>
          <DownloadSteps />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

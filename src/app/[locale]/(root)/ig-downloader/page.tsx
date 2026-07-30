import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import TopText from '@/components/sections/TopText';
import DownloadForm from '@/components/sections/DownloadForm';
import DownloadSteps from '@/components/sections/DownloadSteps';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://convertallnow.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IgDownloaderSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: ['instagram reels downloader', 'download instagram reels', 'ig reels to mp4', 'save instagram reels', 'no watermark reels download'],
    openGraph: {
      title,
      description,
      url: `${siteUrl}/ig-downloader`,
      siteName: 'ConvertAllNow',
      locale,
      type: 'website',
      images: [
        {
          url: "/images/insta.png",
          width: 1200,
          height: 630,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/insta.png"],
      site: "@convertallnow",
      creator: "@convertallnow",
    },
    alternates: {
      canonical: `${siteUrl}/ig-downloader`,
    }
  };
}

const Page = () => {
  const t = useTranslations('IgDownloaderSEO');
  
  const schemaData = {
      "@context": "https://schema.org" as const,
      "@type": "WebApplication" as const,
      "name": "Instagram Reels Downloader",
      "description": t('description'),
      "applicationCategory": "Multimedia" as const,
      "operatingSystem": "Web" as const,
  };

  return (
    <>
      <SchemaMarkup data={schemaData} />
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

import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import TopText from '@/components/sections/TopText';
import DownloadForm from '@/components/sections/DownloadForm';
import DownloadSteps from '@/components/sections/DownloadSteps';
import { Metadata } from 'next';
import React from 'react';

const title = 'Instagram Reels Downloader - FastSave';
const description = 'Download Instagram Reels in HD with FastSave. No watermark, no login, 100% free. Save public Reels as MP4 videos in seconds.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['instagram reels downloader', 'download instagram reels', 'ig reels to mp4', 'save instagram reels', 'no watermark reels download'],
  openGraph: {
    title,
    description,
    url: `${siteUrl}/ig-downloader`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/ig-downloader`,
  }
};

const schemaData = {
    "@context": "https://schema.org" as const,
    "@type": "WebApplication" as const,
    "name": "Instagram Reels Downloader",
    "description": "Download Instagram Reels and Videos instantly without watermark.",
    "applicationCategory": "Multimedia" as const,
    "operatingSystem": "Web" as const,
};

const Page = () => {
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

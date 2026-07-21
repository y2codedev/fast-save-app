import MergePdf from '@/components/sections/MergePdf';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';

const title = 'Merge PDF Files Online - FastSave';
const description = 'Combine multiple PDF files into one single document instantly and securely in your browser. No files are uploaded to any server.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['merge pdf', 'combine pdf', 'join pdf files', 'pdf merger online', 'free pdf tools', 'privacy pdf merger'],
  openGraph: {
    title,
    description,
    url: `${siteUrl}/merge-pdf`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: "/images/merge-pdf.png",
        width: 1200,
        height: 630,
        alt: "Merge PDF Files Online - FastSave",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/merge-pdf.png"],
    creator: "@fastsaveapp",
    site: "@fastsaveapp",
  },
  alternates: {
    canonical: `${siteUrl}/merge-pdf`,
  }
};

const schemaData = {
    "@context": "https://schema.org" as const,
    "@type": "WebApplication" as const,
    "name": "Merge PDF Files",
    "description": "Combine multiple PDF files into one securely inside your browser.",
    "applicationCategory": "Multimedia" as const,
    "operatingSystem": "Web" as const,
};

const Page = () => {
  return (
    <>
      <SchemaMarkup data={schemaData} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <MergePdf />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

import UnlockPdf from '@/components/sections/UnlockPdf';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';

const title = 'Unlock PDF Online - Remove PDF Password - FastSave';
const description = 'Remove password protection from your PDF files instantly and securely in your browser. 100% free, fast, and privacy-focused.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['unlock pdf', 'remove pdf password', 'decrypt pdf', 'pdf password remover', 'free pdf unlocker'],
  openGraph: {
    title,
    description,
    url: `${siteUrl}/unlock-pdf`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: "/images/unlock-pdf.png",
        width: 1200,
        height: 630,
        alt: "Unlock PDF Online - FastSave",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/unlock-pdf.png"],
    creator: "@fastsaveapp",
    site: "@fastsaveapp",
  },
  alternates: {
    canonical: `${siteUrl}/unlock-pdf`,
  }
};

const schemaData = {
    "@context": "https://schema.org" as const,
    "@type": "WebApplication" as const,
    "name": "Unlock PDF Tool",
    "description": "Remove password protection from PDF documents securely inside your browser.",
    "applicationCategory": "Multimedia" as const,
    "operatingSystem": "Web" as const,
};

const Page = () => {
  return (
    <>
      <SchemaMarkup data={schemaData} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <UnlockPdf />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

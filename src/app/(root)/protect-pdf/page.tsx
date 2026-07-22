import ProtectPdf from '@/components/sections/ProtectPdf';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';

const title = 'Protect PDF Online - Add PDF Password - FastSave';
const description = 'Add password protection to your PDF files securely in your browser. 100% free, fast, and privacy-focused.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['protect pdf', 'add pdf password', 'encrypt pdf', 'pdf password protector', 'free pdf encryptor'],
  openGraph: {
    title,
    description,
    url: `${siteUrl}/protect-pdf`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: "/images/protect-pdf.png",
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/protect-pdf.png"],
    site: "@fastsaveapp",
    creator: "@fastsaveapp",
  },
  alternates: {
    canonical: `${siteUrl}/protect-pdf`,
  }
};

const schemaData = {
    "@context": "https://schema.org" as const,
    "@type": "WebApplication" as const,
    "name": "Protect PDF Tool",
    "description": "Add password protection to PDF documents securely inside your browser.",
    "applicationCategory": "Multimedia" as const,
    "operatingSystem": "Web" as const,
};

const Page = () => {
  return (
    <>
      <SchemaMarkup data={schemaData} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <ProtectPdf />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

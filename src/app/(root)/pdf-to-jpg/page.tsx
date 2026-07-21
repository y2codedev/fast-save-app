import PdfToJpg from '@/components/sections/PdfToJpg';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';

const title = 'Convert PDF to JPG Online - FastSave';
const description = 'Extract high-quality JPG images from any PDF document instantly and securely in your browser. 100% free and privacy-focused.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['pdf to jpg', 'convert pdf to image', 'pdf to png', 'extract images from pdf', 'free pdf to jpg converter'],
  openGraph: {
    title,
    description,
    url: `${siteUrl}/pdf-to-jpg`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: "/images/pdf-to-jpg.png",
        width: 1200,
        height: 630,
        alt: "Convert PDF to JPG Online - FastSave",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/pdf-to-jpg.png"],
    creator: "@fastsaveapp",
    site: "@fastsaveapp",
  },
  alternates: {
    canonical: `${siteUrl}/pdf-to-jpg`,
  }
};

const schemaData = {
    "@context": "https://schema.org" as const,
    "@type": "WebApplication" as const,
    "name": "PDF to JPG Converter",
    "description": "Convert PDF documents to JPG images securely inside your browser.",
    "applicationCategory": "Multimedia" as const,
    "operatingSystem": "Web" as const,
};

const Page = () => {
  return (
    <>
      <SchemaMarkup data={schemaData} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <PdfToJpg />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

import MdConverter from '@/components/sections/MdConverter';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import Link from 'next/link';
import { Metadata } from 'next';
import React from 'react';

const title = 'Markdown to PDF & DOCX Converter - FastSave';
const description = 'Convert your Markdown (.md) files to PDF or Word (DOCX) formats instantly and securely in your browser. 100% free and privacy-focused.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['markdown converter', 'md to pdf', 'markdown to word', 'md to docx', 'free md converter', 'online markdown editor', 'browser md to pdf', 'privacy markdown converter'],
  openGraph: {
    title,
    description,
    url: `${siteUrl}/md-converter`,
    siteName: 'FastSave',
    images: [
      {
        url: `/images/md-converter.png`,
        width: 1200,
        height: 630,
        alt: 'Markdown to PDF & Word Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`/images/md-converter.png`],
  },
  alternates: {
    canonical: `${siteUrl}/md-converter`,
  }
};

const schemaData = {
    "@context": "https://schema.org" as const,
    "@type": "WebApplication" as const,
    "name": "Markdown to PDF/DOCX Converter",
    "description": "Convert Markdown files to PDF and Word documents securely inside your browser.",
    "applicationCategory": "Multimedia" as const,
    "operatingSystem": "Web" as const,
};

const Page = () => {
  return (
    <>
      <SchemaMarkup data={schemaData} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <MdConverter />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

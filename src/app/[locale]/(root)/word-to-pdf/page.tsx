import WordToPdfConverter from '@/components/sections/WordToPdfConverter';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = "Free Word to PDF Converter Online - 100% Private & Client-Side | ConvertAllNow";
  const description = "Convert Microsoft Word documents (.docx, .doc) to high-quality PDF files instantly inside your browser. Zero file uploads, lightning-fast execution, and 100% data privacy.";

  return {
    title,
    description,
    keywords: ["word to pdf", "docx to pdf", "convert word to pdf free", "browser docx converter", "private word to pdf online", "doc to pdf no upload"],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/word-to-pdf'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@convertallnow",
      site: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/word-to-pdf'),
      languages: getAlternateLanguages('/word-to-pdf'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const title = "Word to PDF Converter";
  const description = "Convert Microsoft Word documents to professional PDF archives locally in your browser without external servers.";

  const schemaData = createToolSchema({
    name: title,
    description: description,
    path: '/word-to-pdf',
    locale,
    featureList: ['Convert DOCX and DOC to high-resolution PDF', 'Preserve document formatting and tables', '100% browser-based private conversion', 'Zero server file storage'],
    screenshot: '/images/og-default.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'PDF Tools', href: '/pdf-to-docx' },
        { name: title },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <WordToPdfConverter />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

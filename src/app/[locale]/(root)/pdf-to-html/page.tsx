import PdfToHtmlConverter from '@/components/sections/PdfToHtmlConverter';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = "Free PDF to HTML Converter Online - 100% Private & Client-Side | ConvertAllNow";
  const description = "Convert PDF documents to clean, structured HTML5 web pages instantly inside your browser with interactive live preview and zero uploads.";

  return {
    title,
    description,
    keywords: ["pdf to html", "convert pdf to html free", "pdf to webpage", "private pdf html converter", "in browser pdf converter", "pdf code extractor"],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/pdf-to-html'),
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
      canonical: getCanonicalUrl(locale, '/pdf-to-html'),
      languages: getAlternateLanguages('/pdf-to-html'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const title = "PDF to HTML Converter";
  const description = "Convert multi-page PDF files into structured HTML5 webpages locally in your browser with real-time web preview.";

  const schemaData = createToolSchema({
    name: title,
    description: description,
    path: '/pdf-to-html',
    locale,
    featureList: ['Convert PDF to clean HTML5 webpage format', 'Interactive Live Web Preview & Source Code Viewer', '100% browser-based local execution', 'Zero server data uploads'],
    screenshot: '/images/og-default.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'PDF Tools', href: '/pdf-to-html' },
        { name: title },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <PdfToHtmlConverter />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

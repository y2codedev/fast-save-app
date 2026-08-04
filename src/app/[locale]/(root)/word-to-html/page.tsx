import WordToHtmlConverter from '@/components/sections/WordToHtmlConverter';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = "Free Word to HTML Converter Online - 100% Private & Client-Side | ConvertAllNow";
  const description = "Convert Microsoft Word documents (.docx, .doc) into clean, responsive HTML webpages instantly inside your browser with live preview and zero uploads.";

  return {
    title,
    description,
    keywords: ["word to html", "docx to html", "convert word to html free", "clean word html converter", "private docx to html online", "doc to web page"],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/word-to-html'),
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
      canonical: getCanonicalUrl(locale, '/word-to-html'),
      languages: getAlternateLanguages('/word-to-html'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const title = "Word to HTML Converter";
  const description = "Convert Word documents into clean, publish-ready HTML5 code locally in your browser with interactive web preview.";

  const schemaData = createToolSchema({
    name: title,
    description: description,
    path: '/word-to-html',
    locale,
    featureList: ['Convert DOCX and DOC to clean HTML5 code', 'Interactive Live Web Preview & Source Code Viewer', '100% browser-based private conversion', 'Zero server file storage'],
    screenshot: '/images/og-default.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'Document Tools', href: '/word-to-html' },
        { name: title },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <WordToHtmlConverter />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

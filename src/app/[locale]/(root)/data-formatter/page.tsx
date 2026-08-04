import DataFormatter from '@/components/sections/DataFormatter';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ExploreOtherTools from '@/components/sections/ExploreOtherTools';
import AdsenseAd from '@/components/AdsenseAd';
import { Metadata } from 'next';
import React from 'react';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = "Free Online Data Formatter & Converter - JSON, XML, YAML, CSV | ConvertAllNow";
  const description = "Beautify, minify, validate, and convert between JSON, XML, YAML, and CSV formats instantly inside your browser with zero server uploads.";

  return {
    title,
    description,
    keywords: ["data formatter", "json formatter online", "xml beautifier", "yaml to json converter", "csv to json", "in browser code formatter", "private syntax validator"],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/data-formatter'),
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
      canonical: getCanonicalUrl(locale, '/data-formatter'),
      languages: getAlternateLanguages('/data-formatter'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;
  const title = "Data Formatter & Converter";
  const description = "Pro in-browser utility to format, minify, validate, and convert between JSON, XML, YAML, and CSV data structures securely.";

  const schemaData = createToolSchema({
    name: title,
    description: description,
    path: '/data-formatter',
    locale,
    featureList: ['Format and beautify JSON, XML, YAML, and CSV data', 'Real-time syntax validation with error reporting', 'Convert across file formats (JSON to YAML, CSV to JSON, etc.)', '100% Client-side browser execution with zero uploads'],
    screenshot: '/images/og-default.png',
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'Dev Tools', href: '/data-formatter' },
        { name: title },
      ]} />
      
      {/* Full-width responsive container without side adbars compressing the code tools */}
      <div className="min-h-screen py-6 sm:py-10">
        <main className="w-full">
          <DataFormatter />
        </main>

        {/* Bottom Advertising Strip */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 mb-8">
          <div className="text-center text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Advertisement</div>
          <AdsenseAd height="h-[250px] sm:h-[280px]" slot={adsenseSlotId} className="rounded-2xl shadow-md border border-gray-200 dark:border-gray-800" />
        </div>

        {/* Explore More Tools Section */}
        <ExploreOtherTools />
      </div>
    </>
  );
};

export default Page;

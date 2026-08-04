import ZipToolConverter from '@/components/sections/ZipToolConverter';
import { ZIP_TOOL_CONFIGS } from '@/lib/zip-tools';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { Metadata } from 'next';
import React from 'react';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

const SLUG = 'zip-to-xz';
const config = ZIP_TOOL_CONFIGS[SLUG];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = `${config.toolName} Converter - Free Online Archive Tool | ConvertAllNow`;
  const description = config.description;

  return {
    title,
    description,
    keywords: TOOL_KEYWORDS[SLUG],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, `/${SLUG}`),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@convertallnow',
      site: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, `/${SLUG}`),
      languages: getAlternateLanguages(`/${SLUG}`),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  const schemaData = createToolSchema({
    name: `${config.toolName} Converter - Free Online Tool`,
    description: config.description,
    path: `/${SLUG}`,
    locale,
    featureList: [`Convert ${config.fromFormat} to ${config.toFormat}`, 'Browser-based processing', 'No file upload to server', 'Free online tool'],
  });

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <BreadcrumbSchema locale={locale} items={[
        { name: 'Home', href: '/' },
        { name: 'Archive Converters', href: `/${SLUG}` },
        { name: config.toolName },
      ]} />
      <ToolLayoutWithAds>
        <div className="flex flex-col space-y-12 pb-12">
          <ZipToolConverter slug={SLUG} />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

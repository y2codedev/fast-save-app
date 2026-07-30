import PdfToJpg from '@/components/sections/PdfToJpg';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://convertallnow.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PdfToJpgSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: ['pdf to jpg', 'convert pdf to image', 'pdf to png', 'extract images from pdf', 'free pdf to jpg converter'],
    openGraph: {
      title,
      description,
      url: `${siteUrl}/pdf-to-jpg`,
      siteName: 'ConvertAllNow',
      locale,
      type: 'website',
      images: [
        {
          url: "/images/pdf-to-jpg.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/pdf-to-jpg.png"],
      creator: "@convertallnow",
      site: "@convertallnow",
    },
    alternates: {
      canonical: `${siteUrl}/pdf-to-jpg`,
    }
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PdfToJpgSEO' });

  const schemaData = {
      "@context": "https://schema.org" as const,
      "@type": "WebApplication" as const,
      "name": t('title'),
      "description": t('description'),
      "applicationCategory": "Multimedia" as const,
      "operatingSystem": "Web" as const,
  };

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

import ProtectPdf from '@/components/sections/ProtectPdf';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProtectPdfSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: ['protect pdf', 'add pdf password', 'encrypt pdf', 'pdf password protector', 'free pdf encryptor'],
    openGraph: {
      title,
      description,
      url: `${siteUrl}/protect-pdf`,
      siteName: 'FastSave',
      locale,
      type: 'website',
      images: [
        {
          url: "/images/protect-pdf.png",
          width: 1200,
          height: 630,
          alt: title,
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
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProtectPdfSEO' });

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
          <ProtectPdf />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

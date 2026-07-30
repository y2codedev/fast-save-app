import { Metadata } from 'next';
import React from 'react';
import SchemaMarkup from '@/components/sections/SchemaMarkup';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import BgRemover from '@/components/sections/BgRemover';
import { getTranslations } from 'next-intl/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://convertallnow.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BgRemoverSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/bg-remover`,
      siteName: 'ConvertAllNow',
      locale: locale === 'en' ? 'en_US' : locale,
      type: 'website',
      images: [
        {
          url: '/images/home-og.png',
          width: 1200,
          height: 630,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/home-og.png'],
      site: '@convertallnow',
      creator: '@convertallnow',
    },
    alternates: {
      canonical: `${siteUrl}/bg-remover`,
    }
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BgRemoverSEO' });
  
  const schemaData = {
      '@context': 'https://schema.org' as const,
      '@type': 'WebApplication' as const,
      'name': 'Remove Background',
      'description': t('description'),
      'applicationCategory': 'Multimedia' as const,
      'operatingSystem': 'Web' as const,
  };

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <ToolLayoutWithAds>
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <BgRemover />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;
import DownloadForm from '@/components/sections/DownloadForm';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IgDownloaderSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['ig-downloader'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/ig-downloader'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: "/images/insta.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image", title, description,
      images: ["/images/insta.png"],
      site: "@convertallnow", creator: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/ig-downloader'),
      languages: getAlternateLanguages('/ig-downloader'),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IgDownloaderSEO' });
  const guidance = await getTranslations({ locale, namespace: 'SiteGuidance' });
  return (
    <ToolLayoutWithAds relatedTools={RELATED_TOOLS['ig-downloader']}>
      <div className="max-w-5xl mx-auto space-y-8 px-4 py-8">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <DownloadForm />
        <section className="space-y-4 rounded-2xl bg-white dark:bg-gray-800 p-6">
          <h2 className="text-2xl font-bold">{guidance('limitsTitle')}</h2>
          <p className="leading-relaxed">{guidance('limits')}</p>
        </section>

        {/* Transparency & Non-Affiliation Disclaimer */}
        <div className="rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 p-5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <p className="font-semibold text-amber-900 dark:text-amber-300">
            Important Notice &amp; Disclaimer
          </p>
          <p>
            ConvertAllNow is an independent utility platform and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Instagram, Meta Platforms, Inc., or any of their subsidiaries.
          </p>
          <p>
            This tool resolves public media streams for personal, offline reference only. Users are solely responsible for ensuring they have the legal right or copyright holder permission to download and access the requested media.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Privacy: When you submit a URL, that link is communicated to an external service solely to resolve media download URLs. No user media is permanently retained on our servers.
          </p>
        </div>
      </div>
    </ToolLayoutWithAds>
  );
}

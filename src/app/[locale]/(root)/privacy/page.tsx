import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';
import WebPageSchema from '@/components/seo/WebPageSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  const title = `${t('title')} - ConvertAllNow`;
  const description = t('s1Desc');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/privacy'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/privacy'),
      languages: getAlternateLanguages('/privacy'),
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  const guidance = await getTranslations({ locale, namespace: 'SiteGuidance' });
  
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <>
      <WebPageSchema
        title="Privacy Policy – ConvertAllNow"
        description="How ConvertAllNow handles user privacy, local processing, and data protection."
        path="/privacy"
        locale={locale}
        breadcrumb={breadcrumbItems}
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="w-full min-h-screen bg-slate-50 dark:bg-gray-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <VisualBreadcrumb items={breadcrumbItems} className="mb-4 sm:mb-8" />
        
        <main className="max-w-4xl mx-auto space-y-10">
          <header className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {t('title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Last modified: September 11, 2026. How ConvertAllNow protects your privacy and data.
            </p>
          </header>

          <article className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-gray-800 space-y-8 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed shadow-xs">
            <section className="space-y-4 pb-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{guidance('privacyTitle')}</h2>
              <p>{guidance('privacy')}</p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{guidance('cookiesTitle')}</h2>
              <p>{guidance('cookies')}</p>
              <div className="flex flex-wrap gap-4 pt-2 text-sm font-medium">
                <a className="underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-700" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
                  Google: Privacy &amp; Terms
                </a>
                <a className="underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-700" href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">
                  Google My Ad Center
                </a>
                <a className="underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-700" href="mailto:support@y2code.com">
                  support@y2code.com
                </a>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('s1Title')}</h2>
              <p>{t('s1Desc')}</p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>{t('s1L1')}</li>
                <li>{t('s1L2')}</li>
                <li>{t('s1L3')}</li>
                <li>{t('s1L4')}</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('s2Title')}</h2>
              <p>{t('s2Desc')}</p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>{t('s2L1')}</li>
                <li>{t('s2L2')}</li>
                <li>{t('s2L3')}</li>
                <li>{t('s2L4')}</li>
                <li>{t('s2L5')}</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('s3Title')}</h2>
              <p>{t('s3Desc')}</p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>{t('s3L1')}</li>
                <li>{t('s3L2')}</li>
                <li>{t('s3L3')}</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('s4Title')}</h2>
              <p>{t('s4Desc')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('s5Title')}</h2>
              <p>{t('s5Desc')}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('s6Title')}</h2>
              <p>{t('s6Desc')}</p>
            </section>
          </article>
        </main>
      </div>
    </>
  );
}
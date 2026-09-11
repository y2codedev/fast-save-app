import React from 'react';
import { Metadata } from 'next';
import { Target, Users, Zap, Shield, Heart } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';
import WebPageSchema from '@/components/seo/WebPageSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  const title = `${t('titleMain')} ${t('titleHighlight')} - ConvertAllNow`;
  const description = t('subtitle');
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/about'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/about'),
      languages: getAlternateLanguages('/about'),
    }
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
  ];
  
  return (
    <>
      <WebPageSchema
        title={`${t('titleMain')} ${t('titleHighlight')} – ConvertAllNow`}
        description={t('subtitle')}
        path="/about"
        locale={locale}
        breadcrumb={breadcrumbItems}
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="w-full min-h-screen bg-slate-50 dark:bg-gray-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <VisualBreadcrumb items={breadcrumbItems} className="mb-4 sm:mb-8" />

        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {t('titleMain')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{t('titleHighlight')}</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Our Story */}
          <div className="bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-xs border border-gray-200/80 dark:border-gray-700/80 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Heart className="w-6 h-6 text-rose-500" />
              <span>{t('storyTitle')}</span>
            </h2>
            <div className="space-y-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>{t('storyP1')}</p>
              <p>{t('storyP2')}</p>
            </div>
          </div>

          {/* What Users Can Do */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200/80 dark:border-gray-700/80 space-y-3">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('whatTitle')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('whatDesc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200/80 dark:border-gray-700/80 space-y-3">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('promiseTitle')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('promiseDesc')}
              </p>
            </div>
          </div>

          {/* Mission & Team */}
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-6">
            <Target className="w-12 h-12 text-indigo-200 mx-auto" />
            <div className="space-y-3 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{t('missionTitle')}</h2>
              <p className="text-indigo-100 text-base sm:text-lg leading-relaxed">
                {t('missionDesc')}
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold">
                <Users className="w-4 h-4" />
                <span>{t('badgeText')}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

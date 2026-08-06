import React from 'react';
import { Metadata } from 'next';
import { Target, Users, Zap, Shield, Heart } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, RELATED_TOOLS, getAlternateLanguages, getOgLocale } from '@/lib/seo';

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
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            {t('titleMain')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{t('titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose-500" />
            {t('storyTitle')}
          </h2>
          <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{t('storyP1')}</p>
            <p>{t('storyP2')}</p>
          </div>
        </div>

        {/* What Users Can Do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('whatTitle')}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('whatDesc')}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('promiseTitle')}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('promiseDesc')}
            </p>
          </div>
        </div>

        {/* Mission & Team */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 md:p-12 text-white shadow-xl text-center">
          <Target className="w-12 h-12 text-indigo-200 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">{t('missionTitle')}</h2>
          <p className="text-indigo-100 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {t('missionDesc')}
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium">
            <Users className="w-4 h-4" />
            {t('badgeText')}
          </div>
        </div>

      </div>
    </div>
  );
}

import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { getCanonicalUrl, RELATED_TOOLS, getAlternateLanguages, getOgLocale, getSiteUrl } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  const title = `${t('title')} - ConvertAllNow`;
  const description = `Privacy Policy for ConvertAllNow download tools`;

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
  const title = "Online Tool";

  

  const t = await getTranslations({ locale, namespace: 'Privacy' });
  
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 py-8">
      <main className="max-w-7xl mx-auto px-4 lg:px-8 bg-white dark:bg-gray-900 ">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">{t('title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t('lastUpdated')}: {new Date().toLocaleDateString()}</p>
        </header>

        <article className="prose dark:prose-invert prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('s1Title')}</h2>
            <p>{t('s1Desc')}</p>
            <ul className="list-disc ps-6 mt-2 space-y-1">
              <li>{t('s1L1')}</li>
              <li>{t('s1L2')}</li>
              <li>{t('s1L3')}</li>
              <li>{t('s1L4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('s2Title')}</h2>
            <p>{t('s2Desc')}</p>
            <ul className="list-disc ps-6 mt-2 space-y-1">
              <li>{t('s2L1')}</li>
              <li>{t('s2L2')}</li>
              <li>{t('s2L3')}</li>
              <li>{t('s2L4')}</li>
              <li>{t('s2L5')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('s3Title')}</h2>
            <p>{t('s3Desc')}</p>
            <ul className="list-disc ps-6 mt-2 space-y-1">
              <li>{t('s3L1')}</li>
              <li>{t('s3L2')}</li>
              <li>{t('s3L3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('s4Title')}</h2>
            <p>
              {t('s4Desc')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('s5Title')}</h2>
            <p>
              {t('s5Desc')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('s6Title')}</h2>
            <p>
              {t('s6Desc')}
            </p>
          </section>
        </article>
      </main>
    </div>
  )
}
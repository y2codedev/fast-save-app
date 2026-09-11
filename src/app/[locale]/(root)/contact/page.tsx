import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';
import WebPageSchema from '@/components/seo/WebPageSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import ContactSection from '@/components/sections/ContactSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  const title = `${t('title')} ${t('titleHighlight')} - ConvertAllNow Support`;
  const description = t('subtitle');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/contact'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/contact'),
      languages: getAlternateLanguages('/contact'),
    },
  };
}

const FAQS = [
  {
    question: 'Are my uploaded files ever stored or viewed on your servers?',
    answer: 'No, absolutely not. ConvertAllNow tools process your files directly inside your web browser using WebAssembly and client-side JavaScript. Your files never leave your device, ensuring total confidentiality and privacy.'
  },
  {
    question: 'Why did my file conversion fail or freeze?',
    answer: 'Because processing happens entirely on your device, conversions rely on your available system RAM and browser performance. If a file is unusually large or the browser is low on memory, try closing other heavy browser tabs and re-running the conversion.'
  },
  {
    question: 'Is ConvertAllNow completely free to use?',
    answer: 'Yes! All 50+ file conversion, compression, and editing tools on ConvertAllNow are 100% free for both personal and commercial use. No account creation, payment, or watermark is ever required.'
  },
  {
    question: 'How do I request support for a new file format?',
    answer: 'Select "New Tool Request" above and send us an email specifying the input and desired output formats. We constantly evaluate user requests when expanding our tool suite.'
  }
];

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: `${t('title')} ${t('titleHighlight')}`, href: '/contact' },
  ];

  const translations = {
    title: t('title'),
    titleHighlight: t('titleHighlight'),
    subtitle: t('subtitle'),
    emailSupport: t('emailSupport'),
    emailDesc: t('emailDesc'),
    responseTime: t('responseTime'),
    responseDesc: t('responseDesc'),
    company: t('company'),
    companyName: t('companyName'),
    companyDesc: t('companyDesc'),
    ctaBtn: t('ctaBtn'),
    ctaTitle: t('ctaTitle'),
  };

  return (
    <>
      <WebPageSchema
        title={`${t('title')} ${t('titleHighlight')} – ConvertAllNow Support`}
        description={t('subtitle')}
        path="/contact"
        locale={locale}
        breadcrumb={breadcrumbItems}
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />
      <FAQSchema faqs={FAQS} />

      <div className="w-full min-h-screen bg-slate-50 dark:bg-gray-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <VisualBreadcrumb items={breadcrumbItems} className="mb-4 sm:mb-8" />
        <ContactSection translations={translations} />
      </div>
    </>
  );
}

import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import HowToSchema from '@/components/seo/HowToSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import ToolContentSection from '@/components/sections/ToolContentSection';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getCanonicalUrl, getAlternateLanguages, CATEGORY_TOOLS, RELATED_TOOLS } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Sitemap — All Tools & Pages | ConvertAllNow';
  const description = 'Browse all free online tools and pages on ConvertAllNow: PDF tools, image tools, video tools, archive tools, and more.';

  return {
    title, description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: getCanonicalUrl(locale, '/sitemap'),
      languages: getAlternateLanguages('/sitemap'),
    },
  };
}

const categories = [
  {
    name: 'PDF Tools',
    path: '/pdf-tools',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/10',
    border: 'border-red-100 dark:border-red-800/20',
    tools: CATEGORY_TOOLS.pdf,
  },
  {
    name: 'Image Tools',
    path: '/image-tools',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    border: 'border-purple-100 dark:border-purple-800/20',
    tools: CATEGORY_TOOLS.image,
  },
  {
    name: 'Video & Audio Tools',
    path: '/video-tools',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-100 dark:border-blue-800/20',
    tools: CATEGORY_TOOLS.video,
  },
  {
    name: 'Archive & ZIP Tools',
    path: '/archive-tools',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/10',
    border: 'border-orange-100 dark:border-orange-800/20',
    tools: CATEGORY_TOOLS.archive,
  },
];

const staticPages = [
  { name: 'Home', path: '/', desc: 'ConvertAllNow homepage with all tools overview' },
  { name: 'About Us', path: '/about', desc: 'Learn about ConvertAllNow and our mission' },
  { name: 'Contact', path: '/contact', desc: 'Get in touch with the ConvertAllNow team' },
  { name: 'Privacy Policy', path: '/privacy', desc: 'How we handle your data and privacy' },
  { name: 'Terms of Service', path: '/terms', desc: 'Terms and conditions for using ConvertAllNow' },
];

import { getTranslations } from 'next-intl/server';

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const t = await getTranslations({ locale, namespace: 'Sitemap' });

  
const faqs = [
  { question: 'Is this tool free to use?', answer: 'Yes, this tool is 100% free with no hidden fees or signups required.' },
  { question: 'Are my files uploaded to a server?', answer: 'No. All processing happens locally in your web browser. Your files never leave your device, ensuring total privacy.' },
  { question: 'Is there a file size limit?', answer: 'Since processing happens in your browser, the limit depends on your device RAM, usually supporting files up to several hundred megabytes.' },
  { question: 'Does this work on mobile devices?', answer: 'Yes! The tool works seamlessly on both desktop and mobile browsers.' },
  { question: 'What browsers are supported?', answer: 'We support all modern browsers including Chrome, Safari, Firefox, and Edge.' },
];

const howToSteps = [
  { name: 'Upload File', text: 'Select or drag and drop your file into the tool.' },
  { name: 'Process', text: 'Click the action button to begin processing. Wait a few moments.' },
  { name: 'Download', text: 'Once completed, download your newly processed file directly to your device.' },
];

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Sitemap', href: '/sitemap' },
  ];
  const relatedTools = RELATED_TOOLS['sitemap'] || [];

  return (
    <>
      
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/sitemap" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="Online Tools"
        categoryPath="/"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <div className="space-y-12 pt-2 pb-8">
            {categories.map((cat) => (
              <div key={cat.path} className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {cat.name}
                  </h2>
                  <Link href={cat.path} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    View Category →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.tools?.map((tool) => (
                    <Link
                      key={tool.path}
                      href={tool.path}
                      className="group p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200/80 dark:border-gray-700/50 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1.5">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                          {tool.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="space-y-4 pt-6">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight border-b border-gray-200 dark:border-gray-700 pb-3">
                General Pages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {staticPages.map((page) => (
                  <Link
                    key={page.path}
                    href={page.path}
                    className="group p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200/80 dark:border-gray-700/50 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1.5">
                        {page.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {page.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <ToolContentSection
            toolName={t('title')}
            introduction={
              <>
                <p>
                  {t('title')} is a free online tool to process your files securely in your browser. Our tool ensures your data remains private while delivering fast results. No installation or registration is required.
                </p>
                <p className="mt-3">
                  This tool operates entirely on your device using advanced web technologies. This means your files are never uploaded to our servers, eliminating privacy risks and avoiding file size limits typically imposed by cloud services.
                </p>
              </>
            }
            features={[
              { title: '100% Free & Unlimited', description: 'Use the tool as many times as you want without any restrictions or fees.' },
              { title: 'Private & Secure', description: 'All processing happens locally in your browser. Your files never leave your device.' },
              { title: 'No Installation', description: 'Works directly in Chrome, Safari, Firefox, and Edge on any device.' },
              { title: 'Fast Processing', description: 'Leverages your device\'s hardware for near-instant results.' },
            ]}
            howToSteps={howToSteps}
            faqs={faqs}
            supportedFormats="Supports all standard formats."
            privacyNote="Your files are completely safe. All processing happens in your browser and files are never uploaded to any server."
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
}

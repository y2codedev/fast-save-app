import ProtectPdf from '@/components/sections/ProtectPdf';
import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import ToolContentSection from '@/components/sections/ToolContentSection';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProtectPdfSEO' });
  const title = t('title');
  const description = t('description');

  return {
    title, description,
    keywords: TOOL_KEYWORDS['protect-pdf'],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/protect-pdf'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
      images: [{ url: '/images/protect-pdf.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: ['/images/protect-pdf.png'],
      site: '@convertallnow', creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/protect-pdf'),
      languages: getAlternateLanguages('/protect-pdf'),
    },
  };
}

const faqs = [
  { question: 'What encryption is used to protect the PDF?', answer: 'We use AES-128 encryption, which is the standard for PDF security and widely supported by all PDF readers including Adobe Acrobat, Preview, and browser PDF viewers.' },
  { question: 'Can I set printing and copying restrictions?', answer: 'Yes. In addition to an open password, you can set owner-level permissions to restrict printing, copying text, editing, and annotations.' },
  { question: 'Will the protected PDF work in all PDF readers?', answer: 'Yes. The password-protected PDF is a standard PDF file and works in Adobe Acrobat, Apple Preview, Foxit, Chrome, Firefox, and all major PDF viewers.' },
  { question: 'Are my PDF files uploaded to a server?', answer: 'No. Password protection is applied entirely in your browser using JavaScript. Your files never leave your device.' },
  { question: 'Can I protect multiple PDFs at once?', answer: 'Currently the tool processes one PDF at a time. Upload, set a password, and download. Batch protection is planned for a future update.' },
  { question: 'How do I remove the password later?', answer: 'Use our Unlock PDF tool. Enter the same password you set and remove the protection when needed.' },
  { question: 'What happens if I forget the password?', answer: 'We do not store any passwords or files. If you forget the password, you will not be able to open the PDF. Always keep a record of your password.' },
];

const howToSteps = [
  { name: 'Upload PDF', text: 'Click the upload area or drag and drop your PDF file.' },
  { name: 'Set Password', text: 'Enter your desired password. Choose a strong password with letters, numbers, and symbols.' },
  { name: 'Set Permissions (Optional)', text: 'Optionally restrict printing, copying, or editing in the permissions settings.' },
  { name: 'Protect & Download', text: 'Click "Protect PDF". The encrypted PDF downloads to your device instantly.' },
];

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const t = await getTranslations({ locale, namespace: 'ProtectPdfSEO' });

  const schemaData = createToolSchema({
    name: t('title'), description: t('description'),
    path: '/protect-pdf', locale,
    featureList: ['AES-128 encryption', 'Permission controls', 'Browser-based', 'No file upload'],
    screenshot: '/images/protect-pdf.png',
  });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'PDF Tools', href: '/pdf-tools' },
    { name: 'Protect PDF' },
  ];

  const relatedTools = RELATED_TOOLS['protect-pdf'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${t('title')}`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/protect-pdf" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related PDF Tools"
        categoryName="PDF Tools"
        categoryPath="/pdf-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems.slice(1)} />
          <ProtectPdf />
          <ToolContentSection
            toolName="Protect PDF"
            introduction={
              <>
                <p>
                  Protect PDF is a free, highly secure tool that encrypts your PDF documents with a strong password. Whether you are sending confidential financial records, personal health information, or proprietary business data, adding password protection ensures only authorized individuals can open your file.
                </p>
                <p className="mt-3">
                  We utilize industry-standard encryption algorithms natively within your browser. Because the encryption process happens locally on your machine, your unencrypted original file and your chosen password are never transmitted over the internet, providing true end-to-end security.
                </p>
              </>
            }
            features={[
              { title: 'Strong Encryption', description: 'Applies standard encryption to prevent unauthorized access.' },
              { title: 'Password Security', description: 'Require a custom password to open and view the document.' },
              { title: 'Local Processing', description: 'Encryption happens offline in your browser for maximum safety.' },
              { title: 'No File Size Limits', description: 'Secure large documents without hitting server limits.' },
            ]}
            howToSteps={howToSteps}
            useCases={[
              'Protecting legal contracts before sharing with clients',
              'Securing financial reports and confidential business documents',
              'Protecting personal identification documents for digital storage',
              'Restricting printing of proprietary materials or exam papers',
              'Securing research papers and academic dissertations',
              'Protecting copyrighted content from unauthorized editing',
            ]}
            supportedFormats={['PDF 1.4', 'PDF 1.5', 'PDF 1.6', 'PDF 1.7', 'PDF 2.0']}
            privacyNote="PDF encryption is performed entirely in your browser. Your PDF content and password are never transmitted to our servers. ConvertAllNow has zero access to your documents or the passwords you set."
            tips={[
              'Use a strong password combining uppercase, lowercase, numbers, and symbols.',
              'Store your password in a secure password manager — we cannot recover it if lost.',
              'For documents shared with multiple people, consider setting different user and owner passwords.',
              'After protecting, test the PDF by opening it in a different application to verify the password works.',
            ]}
            faqs={faqs}
          />
        </div>
      </ToolLayoutWithAds>
    </>
  );
};

export default Page;

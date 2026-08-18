import PdfToHtmlConverter from '@/components/sections/PdfToHtmlConverter';
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
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, RELATED_TOOLS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = "Free PDF to HTML Converter Online - 100% Private & Client-Side | ConvertAllNow";
  const description = "Convert PDF documents to clean, structured HTML5 web pages instantly inside your browser with interactive live preview and zero uploads.";

  return {
    title,
    description,
    keywords: ["pdf to html", "convert pdf to html free", "pdf to webpage", "private pdf html converter", "in browser pdf converter", "pdf code extractor"],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/pdf-to-html'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [{ url: '/images/pdf-to-html.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ['/images/pdf-to-html.png'],
      creator: "@convertallnow",
      site: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/pdf-to-html'),
      languages: getAlternateLanguages('/pdf-to-html'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const title = "PDF to HTML Converter";
  const description = "Convert multi-page PDF files into structured HTML5 webpages locally in your browser with real-time web preview.";

  const schemaData = createToolSchema({
    name: title,
    description: description,
    path: '/pdf-to-html',
    locale,
    featureList: ['Convert PDF to clean HTML5 webpage format', 'Interactive Live Web Preview & Source Code Viewer', '100% browser-based local execution', 'Zero server data uploads'],
    screenshot: '/images/og-default.png',
  });

  
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
    { name: 'PDF Tools', href: '/pdf-tools' },
    { name: 'PDF to HTML', href: '/pdf-to-html' },
  ];
  const relatedTools = RELATED_TOOLS['pdf-to-html'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${title}`} description={description} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={description} path="/pdf-to-html" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="PDF Tools"
        categoryPath="/pdf-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <PdfToHtmlConverter />
          <ToolContentSection
            toolName={title}
            introduction={
              <>
                <p>
                  PDF to HTML Converter is an innovative browser-based tool that transforms static PDF documents into responsive, web-ready HTML5 pages. This is perfect for web developers, publishers, and marketers who want to embed PDF content directly into their websites without forcing users to download a file or use a PDF viewer.
                </p>
                <p className="mt-3">
                  The conversion extracts text, images, and layout information to generate clean HTML and CSS code. Best of all, the entire extraction process runs locally. You can convert massive reports or private newsletters into web code instantly without any data leaving your local environment.
                </p>
              </>
            }
            features={[
              { title: 'Web-Ready Output', description: 'Generates clean HTML5 and CSS for easy web embedding.' },
              { title: 'Extracts Text & Images', description: 'Pulls out text and assets to recreate the document for the web.' },
              { title: 'No Server Required', description: 'Converts securely inside your browser using JavaScript.' },
              { title: 'Improves SEO', description: 'HTML content is crawlable by search engines, unlike flat PDFs.' },
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
};

export default Page;

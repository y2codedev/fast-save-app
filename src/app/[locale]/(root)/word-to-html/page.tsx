import WordToHtmlConverter from '@/components/sections/WordToHtmlConverter';
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
  const title = "Free Word to HTML Converter Online - 100% Private & Client-Side | ConvertAllNow";
  const description = "Convert Microsoft Word documents (.docx, .doc) into clean, responsive HTML webpages instantly inside your browser with live preview and zero uploads.";

  return {
    title,
    description,
    keywords: ["word to html", "docx to html", "convert word to html free", "clean word html converter", "private docx to html online", "doc to web page"],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/word-to-html'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
      images: [{ url: '/images/word-to-html.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ['/images/word-to-html.png'],
      creator: "@convertallnow",
      site: "@convertallnow",
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/word-to-html'),
      languages: getAlternateLanguages('/word-to-html'),
    },
  };
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const title = "Word to HTML Converter";
  const description = "Convert Word documents into clean, publish-ready HTML5 code locally in your browser with interactive web preview.";

  const schemaData = createToolSchema({
    name: title,
    description: description,
    path: '/word-to-html',
    locale,
    featureList: ['Convert DOCX and DOC to clean HTML5 code', 'Interactive Live Web Preview & Source Code Viewer', '100% browser-based private conversion', 'Zero server file storage'],
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
    { name: 'Word to HTML', href: '/word-to-html' },
  ];
  const relatedTools = RELATED_TOOLS['word-to-html'] || [];

  return (
    <>
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={`How to ${title}`} description={description} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={description} path="/word-to-html" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="PDF Tools"
        categoryPath="/pdf-tools"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          <WordToHtmlConverter />
          <ToolContentSection
            toolName={title}
            introduction={
              <>
                <p>
                  Word to HTML Converter is a developer-friendly utility that translates your Microsoft Word (DOCX) documents into clean, semantic HTML5 code. This tool is specifically designed for content managers, bloggers, and web developers who need to move document content onto the web without carrying over messy, proprietary Word formatting.
                </p>
                <p className="mt-3">
                  The conversion extracts paragraphs, headings, bold/italic styles, lists, and tables, stripping out the hidden XML bloat that Word typically generates. Everything runs in your browser, meaning your proprietary business documents are never uploaded to our servers, ensuring your data remains strictly confidential.
                </p>
              </>
            }
            features={[
              { title: "Clean Semantic Code", description: "Produces W3C-compliant HTML5 without inline style bloat." },
              { title: "Preserves Structure", description: "Intelligently maps Word headings (H1-H6) and lists to HTML tags." },
              { title: "Browser-Based Parsing", description: "Uses local processing to extract content safely." },
              { title: "Instant Output", description: "Copy the HTML code or download the file instantly." },
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

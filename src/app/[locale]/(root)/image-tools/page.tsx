import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, CATEGORY_TOOLS } from '@/lib/seo';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { ArrowRightIcon, PhotoIcon } from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Free Image Tools Online — Compress, Edit, Convert & Remove Background';
  const description =
    'Professional free image tools: compress images, remove backgrounds, convert formats, edit and resize photos. No signup. 100% browser-based.';

  return {
    title, description,
    keywords: [
      'image tools online free', 'compress image', 'remove background', 'image converter',
      'resize image online', 'crop image', 'photo editor free', 'webp to jpg', 'png to jpg',
      'image compressor no signup', 'background remover free',
    ],
    openGraph: {
      title, description,
      url: getCanonicalUrl(locale, '/image-tools'),
      siteName: 'ConvertAllNow', locale: getOgLocale(locale), type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, site: '@convertallnow', creator: '@convertallnow' },
    alternates: {
      canonical: getCanonicalUrl(locale, '/image-tools'),
      languages: getAlternateLanguages('/image-tools'),
    },
  };
}

const faqs = [
  {
    question: 'What image formats are supported?',
    answer: 'Our tools support JPG, JPEG, PNG, WebP, GIF, BMP, TIFF, AVIF, and more. Specific format support varies by tool and is noted on each tool\'s page.',
  },
  {
    question: 'Does compressing an image reduce its quality?',
    answer: 'Our Image Compressor uses smart compression algorithms. You can adjust the quality slider — typically 75-85% quality is visually identical to the original but significantly smaller in file size.',
  },
  {
    question: 'How does AI background removal work?',
    answer: 'Our Remove Background tool uses on-device AI models to detect the subject in your image and remove the surrounding background, creating a transparent PNG in seconds.',
  },
  {
    question: 'Can I batch convert multiple images at once?',
    answer: 'Yes! Our Image Converter and Image Compressor both support batch processing — upload multiple files and convert or compress them all at once.',
  },
  {
    question: 'Are images uploaded to a server?',
    answer: 'No. All image processing happens entirely in your browser using JavaScript and WebAssembly. Your images never leave your device.',
  },
  {
    question: 'What is the maximum image size I can process?',
    answer: 'There is no strict limit, but very large images (100MB+) may be slower depending on your device\'s memory and processing power.',
  },
];

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free Image Tools Online',
  description: 'Collection of free browser-based image tools including compress, convert, edit, and background removal.',
  url: 'https://convertallnow.com/image-tools',
  hasPart: CATEGORY_TOOLS.image.map(tool => ({
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: `https://convertallnow.com${tool.path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  })),
};

export default async function ImageToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHub = await getTranslations({ locale, namespace: 'CategoryHubs' });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema locale={locale} items={[{ name: 'Image Tools' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <VisualBreadcrumb items={[{ name: 'Image Tools' }]} className="px-0 py-2 mb-2" />

        <div className="text-center py-10 md:py-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-4">
            <PhotoIcon className="h-3.5 w-3.5" />
            Image Tools
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            {tHub('imageTitle')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {tHub('imageSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {CATEGORY_TOOLS.image.map(tool => (
            <Link
              key={tool.path}
              href={tool.path}
              className="group flex flex-col gap-2 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  {tool.name}
                </span>
                <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-purple-500 transition-all group-hover:translate-x-1" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>

        <div className="space-y-10 mb-16">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Image Editing Tools — Free & Browser-Based
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
              <p>
                Image optimization and editing are fundamental requirements in today's visual-first digital world. Whether you're a photographer optimizing images for web, a designer creating marketing materials, a developer optimizing page load times, or someone simply wanting to clean up photos before sharing — having the right image tools makes all the difference.
              </p>
              <p>
                ConvertAllNow's image tools suite covers every common image processing task: <Link href="/image-compressor" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">compressing images</Link> without visible quality loss, <Link href="/bg-remover" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">removing backgrounds</Link> using AI, <Link href="/photo" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">converting between image formats</Link> like JPG, PNG, WebP, GIF, and AVIF, and <Link href="/image-editor" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">editing images</Link> with crop, resize, rotate, and filter tools.
              </p>
              <p>
                All tools run entirely in your web browser using modern Web APIs and WebAssembly — meaning your images are processed locally on your device. Nothing is uploaded to our servers, making these tools ideal for sensitive or confidential imagery. There are no file size restrictions tied to server storage limits.
              </p>
              <p>
                For web performance optimization, our Image Compressor typically achieves 60-80% file size reduction while maintaining visual quality indistinguishable from the original. This makes it invaluable for improving Core Web Vitals scores and page load speeds.
              </p>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-45 transition-transform inline-block">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

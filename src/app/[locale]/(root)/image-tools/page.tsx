import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, CATEGORY_TOOLS } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { 
  ArrowRightIcon, 
  PhotoIcon, 
  SparklesIcon, 
  ArrowsRightLeftIcon, 
  ScissorsIcon, 
  AdjustmentsHorizontalIcon,
  ShieldCheckIcon,
  BoltIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  DocumentDuplicateIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Free Image Tools Online — Compress, Convert, Edit & Remove Background | ConvertAllNow';
  const description =
    'Professional free browser-based image tools: compress images, convert formats (JPG, PNG, WebP), edit photos, and remove backgrounds with zero uploads.';

  return {
    title,
    description,
    keywords: [
      'image tools online free', 'compress image', 'remove background', 'image converter',
      'resize image online', 'crop image', 'photo editor free', 'webp to jpg', 'png to jpg',
      'image compressor no signup', 'background remover free', 'private photo editor',
    ],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/image-tools'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@convertallnow',
      creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/image-tools'),
      languages: getAlternateLanguages('/image-tools'),
    },
  };
}

const COMPRESS_TOOLS = [
  {
    name: 'Image Compressor',
    path: '/image-compressor',
    desc: 'Reduce JPG, PNG, and WebP file sizes by up to 80% without noticeable quality loss. Ideal for website optimization and email attachments.',
    badge: 'Flagship Tool',
  },
];

const CONVERT_TOOLS = [
  {
    name: 'Image Converter',
    path: '/photo',
    desc: 'Convert single or batch images between JPG, PNG, WebP, GIF, BMP, and TIFF formats right in your browser.',
    badge: 'Batch Support',
  },
  {
    name: 'PDF to JPG',
    path: '/pdf-to-jpg',
    desc: 'Extract full-resolution images and convert every document page from PDF files into independent JPG photos.',
    badge: 'High Res',
  },
];

const EDIT_TOOLS = [
  {
    name: 'Resize Image',
    path: '/resize-image',
    desc: 'Change image pixel dimensions or scale by percentage while locking aspect ratio. Fast in-browser canvas rendering.',
    badge: 'Popular',
  },
  {
    name: 'Pro Image Editor',
    path: '/image-editor',
    desc: 'Crop, resize, rotate, flip, and apply fine adjustments (brightness, contrast, saturation, filters) to any photo in seconds.',
    badge: 'Full Suite',
  },
];

const BG_TOOLS = [
  {
    name: 'Remove Background',
    path: '/bg-remover',
    desc: 'Instant background isolation powered by on-device AI. Remove cluttered backgrounds from portraits and product shots to create transparent PNGs.',
    badge: 'AI Powered',
  },
];

const PDF_IMAGE_TOOLS = [
  {
    name: 'Image to PDF',
    path: '/image-to-pdf',
    desc: 'Arrange and combine multiple JPG, PNG, and WebP images into a single, polished PDF file with customized page size and margins.',
    badge: 'Document Ready',
  },
];

const faqs = [
  {
    question: 'What image formats can I convert and edit?',
    answer: 'Our tools support all standard modern image formats, including JPG/JPEG, PNG, WebP, GIF, SVG, BMP, and TIFF. Specific capabilities (such as transparency preservation in PNG and WebP) are handled automatically by each tool.',
  },
  {
    question: 'Does compressing an image degrade visual clarity?',
    answer: 'Our Image Compressor uses smart quantization algorithms that analyze color palettes to strip redundant metadata and imperceptible image data. When compressed at 75–85% quality, the file size drops dramatically with virtually zero human-visible degradation.',
  },
  {
    question: 'How does the on-device AI background remover work?',
    answer: 'Our background remover tool downloads a compact, client-side segmentation model directly into your browser memory. The model separates foreground subjects from background scenes entirely on your GPU/CPU without sending your photo to any external server.',
  },
  {
    question: 'Can I batch-process multiple pictures at once?',
    answer: 'Yes! Both our Image Converter and Image Compressor support batch processing. You can drag and drop multiple pictures, configure your settings once, and download all processed images in a single session.',
  },
  {
    question: 'Are my private photos uploaded to ConvertAllNow servers?',
    answer: 'No. Every image operation uses standard HTML5 Canvas, WebAssembly, and local JavaScript APIs. Your photos never leave your computer or phone, ensuring 100% privacy for private photos, receipts, or confidential design assets.',
  },
  {
    question: 'What is the maximum image resolution or file size allowed?',
    answer: 'There is no artificial file size limitation. Your browser’s available memory is the only limit. Standard high-resolution photos (20MP–50MP+) from DSLR cameras or modern smartphones process smoothly on modern devices.',
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
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const tHub = await getTranslations({ locale, namespace: 'CategoryHubs' });
  const title = tHub('imageTitle');
  const heading = tHub('imageHeading');
  const subtitle = tHub('imageSubtitle');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Image Tools', href: '/image-tools' },
  ];
  const relatedTools = RELATED_TOOLS['image-tools'] || [];

  return (
    <>
      
      <HowToSchema name={`How to ${title}`} description={description} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={description} path="/image-tools" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="bg-gradient-to-b from-indigo-50/40 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          <VisualBreadcrumb items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl shadow-sm mb-2">
              <PhotoIcon className="w-9 h-9" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {heading}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Section 1: Compress Images */}
          <section className="space-y-6" aria-labelledby="compress-images-hub">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <SparklesIcon className="w-6 h-6 text-blue-500" />
              <h2 id="compress-images-hub" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('imageCompressTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COMPRESS_TOOLS.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Compress Images Free</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 2: Convert Image Formats */}
          <section className="space-y-6" aria-labelledby="convert-image-formats">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <ArrowsRightLeftIcon className="w-6 h-6 text-blue-500" />
              <h2 id="convert-image-formats" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('imageConvertTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {CONVERT_TOOLS.map((tool) => (
                <Link
                  key={tool.path + tool.name}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-normal">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Convert Images</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: Edit & Enhance Images */}
          <section className="space-y-6" aria-labelledby="edit-images-hub">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <AdjustmentsHorizontalIcon className="w-6 h-6 text-blue-500" />
              <h2 id="edit-images-hub" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('imageEditTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EDIT_TOOLS.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Open Editor</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 4: Remove Backgrounds */}
          <section className="space-y-6" aria-labelledby="bg-removal-hub">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <ScissorsIcon className="w-6 h-6 text-blue-500" />
              <h2 id="bg-removal-hub" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('imageBgTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BG_TOOLS.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Remove Background Free</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 5: Create PDFs from Images */}
          <section className="space-y-6" aria-labelledby="image-pdf-hub">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <DocumentDuplicateIcon className="w-6 h-6 text-blue-500" />
              <h2 id="image-pdf-hub" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('imagePdfTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PDF_IMAGE_TOOLS.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Create PDF from Images</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 6: Why Our Image Tools Are Private */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6" aria-labelledby="image-privacy-breakdown">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-2xl">
                <ShieldExclamationIcon className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h2 id="image-privacy-breakdown" className="text-2xl font-bold text-white">
                  {tHub('imagePrivacyTitle')}
                </h2>
                <p className="text-gray-300 text-sm">
                  100% on-device image processing using modern web browser standards.
                </p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                When you edit, compress, or convert pictures on ConvertAllNow, your photos never upload to remote servers. All pixel rendering, format encoding, and dimension scaling occur directly on your computer, tablet, or smartphone.
              </p>
              <p>
                We use browser-native APIs including HTML5 Canvas, WebGL acceleration, and WebAssembly modules. For example, our <Link href="/image-compressor" className="text-blue-400 hover:underline">Image Compressor</Link> executes quantization algorithms inside your local CPU thread, and our <Link href="/bg-remover" className="text-blue-400 hover:underline">Remove Background</Link> tool evaluates machine learning tensors locally in WebAssembly.
              </p>
              <p>
                This ensures that your private family photos, confidential identity documents, medical scans, or trade graphics stay entirely under your control. When you close the browser tab, all memory buffers are wiped immediately.
              </p>
            </div>
          </section>

          {/* Section 7: FAQs */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Frequently Asked Questions About Image Tools
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ToolLayoutWithAds>
    </>
  );
}

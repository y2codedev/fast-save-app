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
  ArchiveBoxIcon, 
  SparklesIcon, 
  ArrowsRightLeftIcon, 
  LockClosedIcon, 
  FolderPlusIcon,
  ShieldExclamationIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Free Archive & ZIP Tools Online — Create, Extract, Convert ZIP Files | ConvertAllNow';
  const description =
    'Free browser-based archive tools: create ZIP files, extract ZIP, convert RAR/7Z/TAR to ZIP, and password-protect archives. 100% in-browser with zero server uploads.';

  return {
    title,
    description,
    keywords: [
      'zip tools online free', 'create zip file', 'extract zip', 'unzip online',
      'rar to zip', '7z to zip', 'tar to zip', 'zip converter', 'archive tools',
      'password protect zip', 'zip file online free', 'private zip extractor',
    ],
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/archive-tools'),
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
      canonical: getCanonicalUrl(locale, '/archive-tools'),
      languages: getAlternateLanguages('/archive-tools'),
    },
  };
}

const CREATE_EXTRACT_TOOLS = [
  {
    name: 'Create ZIP',
    path: '/create-zip',
    desc: 'Compress multiple files and folders into a single organized .zip archive directly in your browser.',
    badge: 'Popular',
  },
  {
    name: 'Unzip ZIP',
    path: '/unzip-zip',
    desc: 'Extract and download all files or individual items from any ZIP archive without installing software.',
    badge: 'Fast',
  },
  {
    name: 'View ZIP',
    path: '/view-zip',
    desc: 'Inspect, browse, and search the internal folder hierarchy of a ZIP file without decompressing it.',
    badge: 'Inspection',
  },
];

const MANAGE_SECURITY_TOOLS = [
  {
    name: 'Protect ZIP',
    path: '/protect-zip',
    desc: 'Add AES-256 password protection to your ZIP archives to keep sensitive files safe from unauthorized access.',
    badge: 'AES-256',
  },
  {
    name: 'Unlock ZIP',
    path: '/unlock-zip-file',
    desc: 'Decrypt password-protected ZIP archives when you know the password, producing an unlocked archive.',
    badge: 'Decryption',
  },
  {
    name: 'Edit ZIP',
    path: '/edit-zip',
    desc: 'Add new files, delete obsolete items, or rename contents within an existing ZIP archive in-place.',
    badge: 'Modifier',
  },
  {
    name: 'Merge ZIP',
    path: '/merge-zip',
    desc: 'Combine multiple ZIP archive packages into a single consolidated archive package.',
    badge: 'Joiner',
  },
  {
    name: 'Split ZIP',
    path: '/split-zip',
    desc: 'Divide large ZIP archives into smaller multi-part volumes for easy email sending or cloud storage.',
    badge: 'Splitter',
  },
];

const CONVERT_ARCHIVE_TOOLS = [
  {
    name: 'RAR to ZIP',
    path: '/rar-to-zip',
    desc: 'Convert WinRAR .rar archives into universal standard .zip files that open natively on Mac, Windows, and mobile.',
    badge: 'Most Popular',
  },
  {
    name: '7Z to ZIP',
    path: '/7z-to-zip',
    desc: 'Convert 7-Zip (.7z) compressed archives into standard .zip archives with zero software installation.',
    badge: 'Fast',
  },
  {
    name: 'TAR to ZIP',
    path: '/tar-to-zip',
    desc: 'Convert Unix TAR tarball archives into standard ZIP format for Windows and macOS users.',
    badge: 'Unix/Linux',
  },
  {
    name: 'TAR.GZ to ZIP',
    path: '/tar-gz-to-zip',
    desc: 'Convert Gzipped TAR archives (.tar.gz / .tgz) directly into standard ZIP format in your browser.',
    badge: 'Developer',
  },
  {
    name: 'GZ to ZIP',
    path: '/gz-to-zip',
    desc: 'Convert single GZ compressed files into standard ZIP format.',
    badge: 'Utility',
  },
  {
    name: 'ZIP to 7Z',
    path: '/zip-to-7z',
    desc: 'Convert ZIP archives to high-compression 7-Zip (.7z) format for maximum file size reduction.',
    badge: 'High Ratio',
  },
  {
    name: 'ZIP to TAR.GZ',
    path: '/zip-to-tar-gz',
    desc: 'Convert standard ZIP archives into Unix .tar.gz format for Linux server deployments.',
    badge: 'DevOps',
  },
];

const faqs = [
  {
    question: 'What archive formats can I convert and extract?',
    answer: 'ConvertAllNow supports ZIP, RAR, 7Z, TAR, TAR.GZ (TGZ), TAR.BZ2, TAR.XZ, GZ, BZ2, and XZ formats across our specialized archive tools.',
  },
  {
    question: 'How do browser-based archive tools work without uploading files?',
    answer: 'Our tools use client-side JavaScript and WebAssembly compiled versions of standard compression engines (such as JSZip and libarchive). Your computer reads and writes archive streams directly in local RAM memory without sending any archive contents to remote servers.',
  },
  {
    question: 'Can I create a password-protected ZIP on Mac or mobile without third-party software?',
    answer: 'Yes! Our Protect ZIP tool runs directly in your browser on macOS Safari, iOS, Android, or Windows. It applies standard AES-256 encryption that can be opened by any standard unzipping software worldwide.',
  },
  {
    question: 'What is the maximum archive size I can create or extract?',
    answer: 'Because processing runs in your browser, the only practical constraint is your device’s available RAM memory. Most modern laptops and smartphones handle archives up to 500MB to 1GB smoothly.',
  },
  {
    question: 'Can I convert RAR files without installing WinRAR?',
    answer: 'Yes. WinRAR files can be decompressed and converted to standard ZIP format directly in your browser using our RAR to ZIP tool. You do not need to install WinRAR or any desktop software.',
  },
  {
    question: 'Can I edit the contents of a ZIP file without extracting everything?',
    answer: 'Yes. Our Edit ZIP tool lets you open an existing ZIP archive, view its contents, add new files, remove unwanted items, or rename files, then save the updated archive in one click.',
  },
];

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free Archive & ZIP Tools Online',
  description: 'Collection of free browser-based archive tools including ZIP creation, extraction, conversion, and security.',
  url: 'https://convertallnow.com/archive-tools',
  hasPart: CATEGORY_TOOLS.archive.slice(0, 10).map(tool => ({
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: `https://convertallnow.com${tool.path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  })),
};

export default async function ArchiveToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = "Online Tool";
  const description = "Free online tool.";

  
  

  const tHub = await getTranslations({ locale, namespace: 'CategoryHubs' });
  const title = tHub('archiveTitle');
  const heading = tHub('archiveHeading');
  const subtitle = tHub('archiveSubtitle');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Archive Tools', href: '/archive-tools' },
  ];
  const relatedTools = RELATED_TOOLS['archive-tools'] || [];

  return (
    <>
      
      <HowToSchema name={`How to ${title}`} description={description} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={title} description={description} path="/archive-tools" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="bg-gradient-to-b from-amber-50/40 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          <VisualBreadcrumb items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl shadow-sm mb-2">
              <ArchiveBoxIcon className="w-9 h-9" />
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

          {/* Section 1: Create & Extract Archives */}
          <section className="space-y-6" aria-labelledby="create-extract-hub">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <FolderPlusIcon className="w-6 h-6 text-orange-500" />
              <h2 id="create-extract-hub" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('archiveCreateTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {CREATE_EXTRACT_TOOLS.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/5 dark:hover:shadow-orange-500/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform">
                    <span>Open Tool</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 2: Manage & Secure Archives */}
          <section className="space-y-6" aria-labelledby="manage-secure-hub">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <LockClosedIcon className="w-6 h-6 text-orange-500" />
              <h2 id="manage-secure-hub" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('archiveManageTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {MANAGE_SECURITY_TOOLS.map((tool) => (
                <Link
                  key={tool.path + tool.name}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
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
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform">
                    <span>Manage Archive</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: Popular Archive Converters */}
          <section className="space-y-6" aria-labelledby="convert-archives-hub">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <ArrowsRightLeftIcon className="w-6 h-6 text-orange-500" />
              <h2 id="convert-archives-hub" className="text-2xl font-bold text-gray-900 dark:text-white">
                {tHub('archiveConvertTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {CONVERT_ARCHIVE_TOOLS.map((tool) => (
                <Link
                  key={tool.path + tool.name}
                  href={tool.path}
                  className="group relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
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
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform">
                    <span>Convert Archive</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 4: Why Our Archive Tools Are Private */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6" aria-labelledby="archive-privacy-breakdown">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500/20 border border-orange-500/30 rounded-2xl">
                <ShieldExclamationIcon className="w-7 h-7 text-orange-400" />
              </div>
              <div>
                <h2 id="archive-privacy-breakdown" className="text-2xl font-bold text-white">
                  {tHub('archivePrivacyTitle')}
                </h2>
                <p className="text-gray-300 text-sm">
                  Full client-side decompression and encryption without remote file transfers.
                </p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                ZIP and compressed archive files frequently contain collections of private documents, sensitive business backups, code repositories, or personal memories. Traditional web converters upload the entire archive to remote servers where it must be extracted and repacked.
              </p>
              <p>
                ConvertAllNow executes all archive operations directly inside your web browser. Utilizing optimized JavaScript engines and compiled WebAssembly compression libraries, your device parses the archive file structure, uncompresses data chunks, and creates output archives locally in your browser memory.
              </p>
              <p>
                No archive files, file names, or uncompressed contents are ever uploaded to our servers. Your data remains strictly on your device.
              </p>
            </div>
          </section>

          {/* Section 5: FAQs */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Frequently Asked Questions About Archive & ZIP Tools
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

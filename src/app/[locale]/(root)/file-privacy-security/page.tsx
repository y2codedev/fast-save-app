import React from 'react';
import { Metadata } from 'next';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import WebPageSchema from '@/components/seo/WebPageSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { Link } from '@/i18n/routing';
import {
  ShieldCheckIcon,
  CpuChipIcon,
  ServerStackIcon,
  EyeSlashIcon,
  TrashIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'File Privacy & Security – How ConvertAllNow Processes Your Files | ConvertAllNow';
  const description =
    'Detailed transparency report on how ConvertAllNow processes and protects your files: client-side processing, zero server uploads, data retention policies, and cookies.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/file-privacy-security'),
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
      canonical: getCanonicalUrl(locale, '/file-privacy-security'),
      languages: getAlternateLanguages('/file-privacy-security'),
    },
  };
}

export default async function FilePrivacySecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'File Privacy & Security', href: '/file-privacy-security' },
  ];

  const processingMatrix = [
    {
      category: 'PDF Tools',
      examples: 'Merge PDF, PDF to JPG, Image to PDF, Protect PDF, Unlock PDF',
      location: '100% In-Browser (Local)',
      uploaded: false,
      retention: '0 Seconds (Cleared on tab close)',
      tech: 'WebAssembly / pdf-lib / PDF.js',
    },
    {
      category: 'Image Tools',
      examples: 'Image Compressor, Image Converter, Pro Image Editor, Remove Background',
      location: '100% In-Browser (Local)',
      uploaded: false,
      retention: '0 Seconds (Cleared on tab close)',
      tech: 'HTML5 Canvas / WebGL / On-Device AI',
    },
    {
      category: 'Video & Audio Tools',
      examples: 'Video Compressor, Video Trimmer, Video to GIF, Audio Converter, Audio Trimmer',
      location: '100% In-Browser (Local)',
      uploaded: false,
      retention: '0 Seconds (Cleared on tab close)',
      tech: 'FFmpeg WebAssembly (Local CPU/GPU)',
    },
    {
      category: 'Archive & ZIP Tools',
      examples: 'Create ZIP, Unzip ZIP, Edit ZIP, Merge ZIP, Format Converters',
      location: '100% In-Browser (Local)',
      uploaded: false,
      retention: '0 Seconds (Cleared on tab close)',
      tech: 'Client JSZip & Libarchive WASM',
    },
    {
      category: 'Social Media Downloaders',
      examples: 'Instagram Downloader, Facebook Video, Snapchat',
      location: 'URL Resolution via Server API',
      uploaded: false,
      retention: 'Zero File Retention (Media streams directly)',
      tech: 'Public URL Resolution / Direct Stream',
    },
  ];

  return (
    <>
      <WebPageSchema
        title="File Privacy & Security – How ConvertAllNow Processes Your Files"
        description="Detailed transparency report on how ConvertAllNow processes and protects your files."
        path="/file-privacy-security"
        locale={locale}
        breadcrumb={breadcrumbItems}
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="min-h-screen bg-slate-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <VisualBreadcrumb items={breadcrumbItems} />

          {/* Hero Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl shadow-sm mb-2">
              <ShieldCheckIcon className="w-10 h-10" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              File Privacy & Security
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              How ConvertAllNow handles your files, privacy, cookies, and data across our suite of online tools.
            </p>
          </div>

          {/* Summary Callout Card */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 font-bold text-lg">
              <LockClosedIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Our Core Privacy Principle</span>
            </div>
            <p className="text-emerald-900/90 dark:text-emerald-200/90 text-sm sm:text-base leading-relaxed">
              The vast majority of ConvertAllNow tools process your files <strong>entirely inside your web browser</strong> using modern client-side technologies (WebAssembly, HTML5 Canvas, and JavaScript). Your files are not uploaded to our servers, not stored in any cloud storage, and never accessed by any human.
            </p>
          </div>

          {/* Tool Processing Location Matrix */}
          <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
                <CpuChipIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span>Tool Processing Architecture</span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A clear, transparent breakdown of where your data is computed for every tool category.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
                    <th className="py-3.5 px-4 font-semibold">Tool Category</th>
                    <th className="py-3.5 px-4 font-semibold">Processing Location</th>
                    <th className="py-3.5 px-4 font-semibold">File Uploaded to Server?</th>
                    <th className="py-3.5 px-4 font-semibold">File Retention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {processingMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                        <div>{row.category}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-normal mt-0.5">{row.examples}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">{row.location}</span>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{row.tech}</div>
                      </td>
                      <td className="py-4 px-4">
                        {row.uploaded ? (
                          <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                            <CheckCircleIcon className="w-4 h-4" /> Yes (Temporary)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                            <XCircleIcon className="w-4 h-4" /> No (Zero Upload)
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                        {row.retention}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Client-Side vs Server Processing Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center">
                <ShieldCheckIcon className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                How In-Browser Tools Work
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                When you drag a file into our <Link href="/pdf-tools" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">PDF Tools</Link>, <Link href="/image-compressor" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Image Compressor</Link>, or <Link href="/video-tools" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Video Tools</Link>, the file binary is read locally by your web browser using HTML5 File API and WebAssembly.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                <li>Files remain inside your computer or smartphone RAM buffer.</li>
                <li>No network packet containing your file content is sent across the internet.</li>
                <li>When you close the browser tab, the browser immediately wipes the allocated memory.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center">
                <ServerStackIcon className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Social Video Downloaders
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Our social media download tools (such as Instagram Reels, Facebook Video, and Snapchat downloaders) require resolving public links:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                <li>You provide a public URL; that link is sent to an API to discover media streaming streams.</li>
                <li>We do not store or mirror downloaded videos on our web servers.</li>
                <li>Downloaded files stream directly to your device storage.</li>
              </ul>
            </div>
          </section>

          {/* Section: Metadata, Analytics, & File Retention */}
          <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
              <EyeSlashIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span>What Data We Collect & What We Do Not</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-2">
                <h3 className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                  What We Never Collect
                </h3>
                <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1.5 list-disc list-inside">
                  <li>Your file names, document text, or document images.</li>
                  <li>Contents of PDF contracts, receipts, or medical records.</li>
                  <li>Uncompressed or compressed photo pixels.</li>
                  <li>Passwords entered into Protect PDF or Unlock PDF.</li>
                  <li>Personal identity profiles or credit card numbers.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-2">
                <h3 className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                  <CpuChipIcon className="w-5 h-5 text-blue-600" />
                  What We May Collect (Aggregated Only)
                </h3>
                <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1.5 list-disc list-inside">
                  <li>Anonymous page view counts and tool execution counters.</li>
                  <li>Browser type and operating system (to debug WASM compatibility).</li>
                  <li>Performance telemetry (e.g. compression success vs out-of-memory errors).</li>
                  <li>Approximate country-level geographic region via IP address.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Advertising & Cookies */}
          <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Cookies & Advertising Disclosure
            </h2>
            <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-400 space-y-3 leading-relaxed">
              <p>
                ConvertAllNow provides all tools completely free of charge. To cover infrastructure hosting, domain maintenance, and ongoing development costs, we display third-party advertisements via Google AdSense.
              </p>
              <p>
                Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to ConvertAllNow or other websites. Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
              </p>
              <p>
                Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://myadcenter.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline font-medium"
                >
                  Google My Ad Center
                </a>{' '}
                or review Google’s privacy practices at{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline font-medium"
                >
                  How Google uses information from sites or apps that use our services
                </a>.
              </p>
              <p>
                ConvertAllNow itself sets only functional local browser cookies and local storage tokens, such as remembering whether you prefer Dark Mode or Light Mode.
              </p>
            </div>
          </section>

          {/* Section: Contact & Vulnerability Reporting */}
          <section className="bg-gradient-to-br from-indigo-900 to-violet-950 text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="w-8 h-8 text-indigo-300" />
              <h2 className="text-2xl font-bold">Security Inquiries & Vulnerability Reporting</h2>
            </div>
            <p className="text-indigo-100 text-sm sm:text-base leading-relaxed max-w-2xl">
              We take privacy and software security seriously. If you have questions about how a specific tool functions, or if you believe you have found a potential security vulnerability in our client-side code, please contact our engineering team directly:
            </p>
            <div className="pt-2">
              <a
                href="mailto:support@y2code.com"
                className="inline-flex items-center gap-2 bg-white text-indigo-900 font-bold px-6 py-3 rounded-full hover:bg-indigo-50 transition-colors shadow-sm text-sm"
              >
                <span>Email Security Team: support@y2code.com</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

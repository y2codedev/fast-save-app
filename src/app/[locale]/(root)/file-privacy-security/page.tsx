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
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  PhotoIcon,
  FilmIcon,
  FolderIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'File Privacy & Processing | ConvertAllNow';
  const description =
    'Learn how ConvertAllNow handles files during conversion and how processing methods may differ between supported tools.';

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
    { name: 'File Privacy & Processing', href: '/file-privacy-security' },
  ];

  const processingMatrix = [
    {
      category: 'PDF Tools',
      examples: 'Merge PDF, PDF to JPG, Image to PDF, Protect PDF, Unlock PDF, Split PDF',
      location: 'Local Browser Sandbox (Client-Side)',
      uploaded: false,
      retention: '0 Seconds (Transient device RAM only)',
      tech: 'pdf-lib / PDF.js / WebAssembly',
    },
    {
      category: 'Image Tools',
      examples: 'Image Compressor, Resize Image, Image Editor, Background Remover',
      location: 'Local Browser Sandbox (Client-Side)',
      uploaded: false,
      retention: '0 Seconds (Transient device RAM only)',
      tech: 'HTML5 Canvas / WebGL / On-Device Neural Model',
    },
    {
      category: 'Video & Audio Tools',
      examples: 'Video Compressor, Video Trimmer, Video to GIF, Audio Converter, Audio Trimmer',
      location: 'Local Browser Sandbox (Client-Side)',
      uploaded: false,
      retention: '0 Seconds (Transient device RAM only)',
      tech: 'FFmpeg WebAssembly (Local CPU / Multi-threading)',
    },
    {
      category: 'Archive & ZIP Tools',
      examples: 'Create ZIP, Unzip ZIP, Edit ZIP, Merge ZIP, 7Z / TAR / GZ / BZ2 / XZ Converters',
      location: 'Local Browser Sandbox (Client-Side)',
      uploaded: false,
      retention: '0 Seconds (Transient device RAM only)',
      tech: 'Client JSZip / Libarchive WebAssembly',
    },
    {
      category: 'Social Media Downloaders',
      examples: 'Instagram Downloader, Facebook Video, Snapchat',
      location: 'URL Resolution API / Direct Stream',
      uploaded: false,
      retention: 'Zero User File Storage (Streams from source)',
      tech: 'Public URL Resolution / Direct CDN Stream',
    },
  ];

  const faqs = [
    {
      question: 'Are my confidential documents uploaded to ConvertAllNow servers?',
      answer:
        'No. For all file conversion and editing tools (PDF, image, audio, video, and archive utilities), the source files are read directly into your web browser using HTML5 File APIs. The conversion calculations happen entirely within your local hardware memory (RAM). No copy of your file is transmitted over the network to our servers.',
    },
    {
      question: 'Can any ConvertAllNow staff or engineers view my files?',
      answer:
        'No. Because your files never leave your device during conversion, neither our team, our hosting providers, nor any automated cloud storage system has access to your document text, photos, video frames, or archive contents.',
    },
    {
      question: 'How do I erase my processed files from temporary memory?',
      answer:
        'All client-side file data exists solely in transient browser heap memory while the tab is open. As soon as you navigate away, reload the page, or close the browser tab, your web browser automatically releases and reclaims the allocated memory.',
    },
    {
      question: 'How do social media downloader tools differ from file converters?',
      answer:
        'Social media downloaders do not convert local private files. Instead, you provide a publicly accessible link. Our server API queries external platform endpoints to discover the direct media streaming URL, which is returned to your browser. ConvertAllNow does not store, archive, or host downloaded videos on its servers.',
    },
    {
      question: 'Why do very large files sometimes fail to convert?',
      answer:
        'Because processing is executed directly on your device rather than a cloud server farm, available memory is bounded by your device hardware (RAM) and browser memory limits. Very large 4K videos or massive multi-gigabyte archives may exhaust available browser memory. If this happens, your browser simply halts the task without saving any residual data.',
    },
    {
      question: 'Where can I read about cookies, website analytics, and advertising?',
      answer:
        'Information regarding website-level telemetry, Google Analytics, Google AdSense cookies, and user privacy rights is detailed in our dedicated Privacy Policy. File content is strictly segregated from website usage telemetry.',
    },
  ];

  return (
    <>
      <WebPageSchema
        title="File Privacy & Processing | ConvertAllNow"
        description="Learn how ConvertAllNow handles files during conversion and how processing methods may differ between supported tools."
        path="/file-privacy-security"
        locale={locale}
        dateModified="2026-09-25"
        breadcrumb={breadcrumbItems}
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="w-full min-h-screen bg-slate-50 dark:bg-gray-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <VisualBreadcrumb items={breadcrumbItems} className="mb-4 sm:mb-8" />
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Hero Header */}
          <header className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl shadow-xs mb-2">
              <ShieldCheckIcon className="w-10 h-10" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              File Privacy &amp; Processing at ConvertAllNow
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              A transparent, technical explanation of how ConvertAllNow handles your documents, media, and archives during conversion across our suite of online tools.
            </p>
          </header>

          {/* Core Principle Callout */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 font-bold text-lg">
              <LockClosedIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <h2>Client-Side Processing Architecture</h2>
            </div>
            <p className="text-emerald-900/90 dark:text-emerald-200/90 text-sm sm:text-base leading-relaxed">
              Traditional online converters require uploading your confidential files to remote cloud servers for conversion. ConvertAllNow is built on a different model: our file conversion, image manipulation, audio/video transcoding, and archive tools run <strong>directly inside your web browser</strong> using modern client-side technologies (WebAssembly, HTML5 Canvas, and JavaScript). Your files stay on your device and are not uploaded to our servers.
            </p>
          </div>

          {/* Section 1: How File Processing Works */}
          <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
              <CpuChipIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span>How File Processing Works</span>
            </h2>
            <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
              <p>
                When you use a ConvertAllNow file converter, the entire computational workflow executes locally within your web browser sandbox. Here is the operational cycle:
              </p>
              <ol className="list-decimal ps-6 space-y-2">
                <li>
                  <strong>Local File Selection:</strong> When you drag and drop or select a file, the browser uses the standardized HTML5 File API to read the file into your device’s local memory (RAM) as a binary buffer.
                </li>
                <li>
                  <strong>Client-Side Engine Execution:</strong> Rather than sending that buffer over an HTTP network request, client-side libraries compiled to WebAssembly or native JavaScript process the data directly on your device CPU or GPU.
                </li>
                <li>
                  <strong>Local Output Creation:</strong> The resulting converted file is assembled into an in-memory <code>Blob</code> object, assigned a temporary local object URL (<code>blob:</code>), and downloaded directly to your device storage.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 2: Tool Processing Architecture Matrix */}
          <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
                <DocumentTextIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span>Processing Methods by Tool Category</span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                How different converter categories execute conversions and manage file lifecycle.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Execution Location</th>
                    <th className="py-3.5 px-4 font-semibold">Server Upload?</th>
                    <th className="py-3.5 px-4 font-semibold">Data Retention</th>
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
                            <CheckCircleIcon className="w-4 h-4" /> Yes
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

          {/* Section 3: Deep Dive into Technologies */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 space-y-3 shadow-xs">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center">
                <DocumentTextIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">PDF &amp; Document Processing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Our <Link href="/pdf-tools" className="text-indigo-600 dark:text-indigo-400 underline font-medium">PDF Tools</Link> (such as Merge PDF, Protect PDF, and Unlock PDF) utilize client-side engines including <code>pdf-lib</code> and <code>PDF.js</code>. The document structure, text, form fields, and embedded fonts are manipulated purely in your browser’s JavaScript engine without transmitting any document bytes to remote servers.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 space-y-3 shadow-xs">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center">
                <PhotoIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Image Manipulation &amp; Optimization</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Tools like <Link href="/image-compressor" className="text-indigo-600 dark:text-indigo-400 underline font-medium">Image Compressor</Link>, Resize Image, and Background Remover render your graphic files into HTML5 Canvas and WebGL contexts. Color transforms, compression adjustments, and AI background isolation execute locally on your device’s hardware.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 space-y-3 shadow-xs">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                <FilmIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Video &amp; Audio Transcoding</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Media conversion in our <Link href="/video-tools" className="text-indigo-600 dark:text-indigo-400 underline font-medium">Video &amp; Audio Tools</Link> is powered by WebAssembly builds of FFmpeg. Multi-threaded audio and video re-encoding runs inside an isolated browser Web Worker, using your device CPU and SharedArrayBuffer memory.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 space-y-3 shadow-xs">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center">
                <FolderIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Archive &amp; Compression Utilities</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Our <Link href="/archive-tools" className="text-indigo-600 dark:text-indigo-400 underline font-medium">Archive Tools</Link> handle ZIP, 7Z, TAR, GZ, and BZ2 archives using client-side JSZip and WebAssembly ports of libarchive. Files are unpacked or compressed directly within your device memory buffers.
              </p>
            </div>
          </section>

          {/* Section 4: Server-Side and Third-Party Interaction */}
          <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
              <ServerStackIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span>Server-Side Interaction &amp; Downloader Tools</span>
            </h2>
            <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
              <p>
                We clearly separate our client-side file converters from our social media download utilities:
              </p>
              <ul className="list-disc ps-6 space-y-2">
                <li>
                  <strong>File Converters (No Server Involvement):</strong> Tools for PDF, images, audio, video, archives, Markdown, and formatted data do not send your files or documents to any server. The server solely delivers the web application bundle (HTML, CSS, JS, and WASM binary assets) when you load the page.
                </li>
                <li>
                  <strong>Social Media Downloaders (URL Resolution Only):</strong> When using utilities such as Instagram Downloader or Facebook Video, you paste a public web link. That link is sent to an API endpoint solely to resolve public media stream URLs. ConvertAllNow does not store, archive, or cache downloaded video files on its servers; the stream delivers directly to your browser.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Practical Walkthrough Examples */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
                <ArrowPathIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span>Practical Processing Walkthroughs</span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Step-by-step technical examples showing what happens under the hood during conversions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Example 1: PDF */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                  <DocumentTextIcon className="w-5 h-5" />
                  <span>Example 1: Merging Two PDF Documents</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2.5">
                  <p>
                    <strong>1. File Selection:</strong> You choose two PDF files (<code>doc1.pdf</code> and <code>doc2.pdf</code>).
                  </p>
                  <p>
                    <strong>2. Binary Read:</strong> The browser reads both files into <code>Uint8Array</code> buffers allocated in your device RAM.
                  </p>
                  <p>
                    <strong>3. Local Composition:</strong> The <code>pdf-lib</code> engine parses document cross-reference tables, combines page objects, and writes a unified PDF document structure in memory.
                  </p>
                  <p>
                    <strong>4. Local Download:</strong> The browser creates a temporary local <code>blob:</code> URL. You click download, saving the merged PDF directly to disk. At no point did any network upload take place.
                  </p>
                </div>
              </div>

              {/* Example 2: Image */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold">
                  <PhotoIcon className="w-5 h-5" />
                  <span>Example 2: Compressing a JPEG Photo</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2.5">
                  <p>
                    <strong>1. File Selection:</strong> You select a 12 MB camera photo from your local disk.
                  </p>
                  <p>
                    <strong>2. Canvas Drawing:</strong> The browser decodes the image bitmap and draws it onto an off-screen HTML5 <code>&lt;canvas&gt;</code> element in device memory.
                  </p>
                  <p>
                    <strong>3. Client Re-encoding:</strong> The browser calls <code>canvas.toBlob()</code> with your chosen quality setting, applying discrete cosine transform compression locally.
                  </p>
                  <p>
                    <strong>4. Instant Download:</strong> The compressed 1.8 MB JPEG is exported directly from the canvas buffer to your downloads folder without sending any pixel data over the internet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Security Boundaries & Hardware Considerations */}
          <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
              <ExclamationTriangleIcon className="w-6 h-6 text-amber-500" />
              <span>Technical Boundaries &amp; Hardware Considerations</span>
            </h2>
            <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
              <p>
                While client-side processing guarantees that your files remain private on your device, it is governed by device-side hardware boundaries:
              </p>
              <ul className="list-disc ps-6 space-y-2">
                <li>
                  <strong>Device Memory (RAM) Limitations:</strong> Web browsers impose strict per-tab memory quotas (typically between 500 MB and 2 GB depending on your device and browser architecture). Very large files may cause browser tabs to display an out-of-memory error.
                </li>
                <li>
                  <strong>CPU &amp; Battery Usage:</strong> Complex conversions (such as high-definition video compression via FFmpeg WebAssembly) utilize your device’s local CPU cores. This may temporarily increase CPU utilization and fan activity during intensive processing.
                </li>
                <li>
                  <strong>Web Sandbox Security:</strong> All scripts execute strictly within standard browser security sandbox boundaries. Scripts cannot access arbitrary folders or read any files on your hard drive other than the specific files you select.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7: File Privacy FAQ */}
          <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
                <QuestionMarkCircleIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span>Frequently Asked Questions</span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Direct answers to common technical questions about file privacy.
              </p>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-5 first:pt-0 last:pb-0 space-y-2">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">{faq.question}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cross-Linking & Contact Footer */}
          <section className="bg-gradient-to-br from-indigo-900 to-violet-950 text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-lg">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Related Policies &amp; Inquiries</h2>
              <p className="text-indigo-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                This page explains technical file processing mechanics. For broader data handling practices or service terms, explore our related legal resources:
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 bg-white text-indigo-900 font-bold px-5 py-2.5 rounded-full hover:bg-indigo-50 transition-colors text-sm shadow-xs"
              >
                <span>Privacy Policy (Cookies &amp; Data)</span>
              </Link>
              <Link
                href="/terms"
                className="inline-flex items-center gap-2 bg-indigo-800/80 text-white font-bold px-5 py-2.5 rounded-full hover:bg-indigo-700/80 transition-colors text-sm border border-indigo-700/60"
              >
                <span>Terms of Use (Usage Rules)</span>
              </Link>
              <a
                href="mailto:support@y2code.com"
                className="inline-flex items-center gap-2 bg-transparent text-indigo-200 font-medium px-4 py-2.5 rounded-full hover:text-white transition-colors text-sm"
              >
                <EnvelopeIcon className="w-4 h-4" />
                <span>Contact Engineering: support@y2code.com</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

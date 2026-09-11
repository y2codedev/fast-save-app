'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Archive, 
  ChevronDown, 
  ArrowRight,
  Lock,
  Cpu,
  CheckCircle2
} from 'lucide-react';

const CORE_BENEFITS = [
  {
    icon: ShieldCheck,
    title: '100% Private & In-Browser',
    description: 'Files process locally on your device via WebAssembly. Your sensitive documents and photos are never uploaded or stored on any server.',
    color: 'emerald',
    badge: 'Zero Uploads'
  },
  {
    icon: Zap,
    title: 'Instant Local Speed',
    description: 'No waiting on slow cloud queues or uploading large files over the internet. Conversions happen at the full speed of your computer or phone.',
    color: 'indigo',
    badge: 'Hardware Accelerated'
  },
  {
    icon: Sparkles,
    title: 'Completely Free & Open',
    description: 'Enjoy unrestricted access to all 50+ file tools without creating an account, paying for subscriptions, or getting watermarks on your files.',
    color: 'purple',
    badge: 'No Watermarks'
  }
];

const CATEGORY_SHOWCASE = [
  {
    icon: FileText,
    title: 'PDF Tools',
    path: '/pdf-tools',
    description: 'Merge, split, protect, and convert PDF files directly to Word, JPG, and HTML.',
    popular: ['Merge PDF', 'PDF to Word', 'Split PDF', 'Protect PDF'],
    accent: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/40 border-red-200/60 dark:border-red-800/40'
  },
  {
    icon: ImageIcon,
    title: 'Image Tools',
    path: '/image-tools',
    description: 'Compress photo sizes, resize dimensions, remove backgrounds, and convert formats.',
    popular: ['Compress Image', 'Resize Image', 'Remove Background', 'Image to PDF'],
    accent: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200/60 dark:border-indigo-800/40'
  },
  {
    icon: Film,
    title: 'Video & Audio',
    path: '/video-tools',
    description: 'Trim clips, compress video sizes, convert to GIF, and extract audio effortlessly.',
    popular: ['Video Compressor', 'Video Trimmer', 'Video to GIF', 'Audio Trimmer'],
    accent: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200/60 dark:border-blue-800/40'
  },
  {
    icon: Archive,
    title: 'Archive Tools',
    path: '/archive-tools',
    description: 'Create, unzip, edit, and convert between ZIP, 7Z, TAR, GZ, and RAR archives.',
    popular: ['Create ZIP', 'Unzip ZIP', '7Z to ZIP', 'Protect ZIP'],
    accent: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200/60 dark:border-amber-800/40'
  }
];

const HOMEPAGE_FAQS = [
  {
    question: 'How do ConvertAllNow tools work without uploading my files?',
    answer: 'ConvertAllNow leverages modern browser standards including WebAssembly (WASM), Web Workers, and HTML5 Canvas. These technologies run compiled processing engines directly inside your web browser. Your data stays entirely in your device’s local memory (RAM) and is cleared the moment you close the tab.'
  },
  {
    question: 'Is there a limit on how many files I can convert?',
    answer: 'No. There are no daily conversion caps, rate limits, or paywalls. You can process as many files as your device hardware comfortably handles.'
  },
  {
    question: 'Are the tools compatible with mobile phones and tablets?',
    answer: 'Yes. All tools are fully responsive and work seamlessly on modern mobile browsers (Safari on iOS, Chrome on Android) without installing any third-party apps.'
  },
  {
    question: 'Why does conversion speed vary between different devices?',
    answer: 'Because processing happens on-device rather than in a cloud server farm, processing speed is tied to your device’s processor (CPU) and available memory (RAM). Newer computers and phones will convert files in seconds.'
  }
];

export default function HomeSEOContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* 3 Core Pillars */}
      <div className="space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Why Choose ConvertAllNow?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Engineered for speed, privacy, and simplicity. All file processing happens locally on your computer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORE_BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={i}
                className="bg-white dark:bg-gray-800/90 rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-gray-700/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {benefit.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Showcase Grid */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/80 dark:border-gray-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Explore Our Tool Suites
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Select a category to view specialized tools for your workflow
            </p>
          </div>
          <Link
            href="/sitemap"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
          >
            <span>View All 50+ Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_SHOWCASE.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-gray-800/90 rounded-3xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${cat.accent}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      Popular:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.popular.map((pop, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                          {pop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-gray-100 dark:border-gray-700/60">
                  <Link
                    href={cat.path}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
                  >
                    <span>Browse {cat.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white dark:bg-gray-800/90 rounded-3xl p-6 sm:p-10 border border-gray-200/80 dark:border-gray-700/80 shadow-xs space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Clear answers about file safety, performance, and supported formats.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {HOMEPAGE_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200/80 dark:border-gray-700/80 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

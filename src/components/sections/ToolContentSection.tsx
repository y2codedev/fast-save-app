'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from '@/i18n/routing';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface RelatedLink {
  label: string;
  href: string;
  context: string; // e.g. "After merging, you may want to..."
}

export interface ToolContentSectionProps {
  /** Primary tool name (H2 intro heading) */
  toolName: string;
  /** ~300+ word introduction paragraph(s) */
  introduction: React.ReactNode;
  /** Key features list */
  features?: FeatureItem[];
  /** Step-by-step how it works */
  howToSteps?: HowToStep[];
  /** Use cases */
  useCases?: string[];
  /** Contextual internal links within content */
  relatedLinks?: RelatedLink[];
  /** FAQs for accordion */
  faqs?: FAQItem[];
  /** Supported formats list */
  supportedFormats?: string[];
  /** Author / last updated meta */
  lastUpdated?: string;
  /** Tips / pro tips */
  tips?: string[];
  /** Privacy notes */
  privacyNote?: string;
}

function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            id={`faq-btn-${i}`}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <span>{faq.question}</span>
            <ChevronDownIcon
              className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-btn-${i}`}
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? 'max-h-96 pb-4' : 'max-h-0'
            }`}
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ToolContentSection({
  toolName,
  introduction,
  features,
  howToSteps,
  useCases,
  relatedLinks,
  faqs,
  supportedFormats,
  lastUpdated,
  tips,
  privacyNote,
}: ToolContentSectionProps) {
  const today = lastUpdated || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-4 space-y-8">

      {/* Author / Last Updated EEAT signal */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700/50 pb-4">
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span>By <strong className="text-gray-700 dark:text-gray-300">ConvertAllNow Team</strong></span>
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Updated: <time dateTime={today}>{today}</time></span>
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-green-600 dark:text-green-400 font-medium">100% Free · No Signup · Browser-Based</span>
        </span>
      </div>

      {/* Introduction */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          What is {toolName}?
        </h2>
        <div className="prose prose-sm sm:prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          {introduction}
        </div>
        {relatedLinks && relatedLinks.length > 0 && (
          <div className="mt-4 space-y-1.5">
            {relatedLinks.map((link, i) => (
              <p key={i} className="text-sm text-gray-600 dark:text-gray-400">
                {link.context}{' '}
                <Link
                  href={link.href}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  {link.label} →
                </Link>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      {features && features.length > 0 && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  {feature.icon || (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{feature.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How It Works */}
      {howToSteps && howToSteps.length > 0 && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h2>
          <ol className="space-y-4">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{step.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Use Cases + Supported Formats (side by side on desktop) */}
      {(useCases || supportedFormats) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases && useCases.length > 0 && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Common Use Cases</h2>
              <ul className="space-y-2">
                {useCases.map((uc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-0.5 text-indigo-500 flex-shrink-0">▸</span>
                    {uc}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {supportedFormats && supportedFormats.length > 0 && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Supported Formats</h2>
              <div className="flex flex-wrap gap-2">
                {supportedFormats.map((fmt, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Privacy & Security */}
      {privacyNote && (
        <div className="flex gap-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700/30 rounded-2xl p-5">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">Privacy & Security</h3>
            <p className="text-sm text-green-700 dark:text-green-400">{privacyNote}</p>
          </div>
        </div>
      )}

      {/* Tips */}
      {tips && tips.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
            <span>💡</span> Pro Tips
          </h2>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400">
                <span className="flex-shrink-0 mt-0.5">▸</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQ Accordion */}
      {faqs && faqs.length > 0 && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Common questions about {toolName}
          </p>
          <FAQAccordion faqs={faqs} />
        </div>
      )}
    </section>
  );
}

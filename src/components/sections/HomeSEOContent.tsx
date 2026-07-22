'use client';

import React, { useState } from 'react';
import { ShieldCheck, Zap, Sparkles, Lock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Is FastSave completely free to use?",
    answer: "Yes! All our tools including PDF editors, Video downloaders, and Image converters are 100% free to use. There are no hidden fees, subscriptions, or premium tiers."
  },
  {
    question: "Do you store my files on your servers?",
    answer: "Absolutely not. Your privacy and security are our top priorities. Most of our tools process your files directly inside your browser. For tools that require server processing, files are automatically and permanently deleted immediately after processing."
  },
  {
    question: "Can I use these tools on my mobile phone?",
    answer: "Yes, FastSave is fully optimized for all devices. Whether you are using a smartphone (iOS or Android), tablet, or desktop computer, our tools work seamlessly right in your mobile browser without installing any apps."
  },
  {
    question: "Are there any file size limits?",
    answer: "To ensure fast and stable performance for all users, some video and PDF tools have reasonable file size limits (usually up to 100MB). However, this is sufficient for 99% of everyday media tasks."
  },
  {
    question: "Do downloaded videos have watermarks?",
    answer: "No. Our social media downloaders (like Instagram Reels Downloader) extract the highest quality video available completely watermark-free."
  }
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    description: "Time is valuable. Our tools are optimized for maximum speed, leveraging your device's native browser capabilities to convert, compress, and edit files in seconds."
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "Your files are yours alone. We employ advanced encryption and strict no-logging policies. What happens on FastSave, stays on your device."
  },
  {
    icon: Sparkles,
    title: "Premium Quality Output",
    description: "Free doesn't mean low quality. Our advanced algorithms ensure that your compressed images, converted PDFs, and trimmed videos retain the highest possible resolution."
  }
];

export default function HomeSEOContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 space-y-24">
      
      {/* Why Choose Us Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Why Choose FastSave?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We built FastSave to be the only media suite you'll ever need. Here is why users around the world trust our platform for their daily tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Privacy Banner */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 pointer-events-none">
          <ShieldCheck className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-8 h-8 text-indigo-200" />
            <h2 className="text-2xl md:text-3xl font-bold">Your Privacy is 100% Guaranteed</h2>
          </div>
          <p className="text-indigo-100 text-lg leading-relaxed mb-6">
            Unlike other platforms that keep copies of your documents, FastSave is built on a privacy-first architecture. 
            When you use tools like our PDF to JPG converter or Video Compressor, the processing happens directly inside your own web browser. 
            No files are uploaded to our servers, ensuring your sensitive data never leaves your device.
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Got questions? We have answers. Here is everything you need to know about using FastSave.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-indigo-600' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

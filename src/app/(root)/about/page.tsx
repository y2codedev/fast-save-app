import React from 'react';
import { Metadata } from 'next';
import { Target, Users, Zap, Shield, Heart } from 'lucide-react';

const title = 'About FastSave - Our Mission & Story';
const description = 'Learn more about FastSave, our mission to make premium media tools accessible to everyone, and the team behind the platform.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${siteUrl}/about`,
    siteName: 'FastSave',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">FastSave</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are on a mission to democratize media editing. We believe everyone deserves access to fast, secure, and professional-grade tools without paying for expensive software.
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose-500" />
            Why We Built FastSave
          </h2>
          <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              The internet is filled with media tools, but we noticed a persistent problem: they are either too expensive, overly complicated, or they compromise user privacy by forcing you to upload sensitive files to remote servers.
            </p>
            <p>
              We built FastSave to solve this. By leveraging modern web technologies like WebAssembly (Wasm) and client-side processing, we created a suite of tools that run directly in your web browser. This means your files stay on your device, processing is incredibly fast, and you don't need to install any heavy software.
            </p>
          </div>
        </div>

        {/* What Users Can Do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">What You Can Do</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              FastSave offers over 20+ specialized tools. You can compress heavy videos, trim audio files, remove backgrounds from images with AI, merge PDF documents, and even download your favorite social media content—all from one unified dashboard.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Promise</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We promise to keep our core tools 100% free forever. We also promise to never compromise your privacy. If a tool requires server-side processing, we guarantee that your files are automatically deleted the moment processing is complete.
            </p>
          </div>
        </div>

        {/* Mission & Team */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 md:p-12 text-white shadow-xl text-center">
          <Target className="w-12 h-12 text-indigo-200 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-indigo-100 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            To empower creators, students, and professionals around the world with a reliable, safe, and lightning-fast digital toolkit. We are a dedicated team of independent developers (Fast Save Apps) passionate about making the web a more productive place.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium">
            <Users className="w-4 h-4" />
            Built by creators, for creators.
          </div>
        </div>

      </div>
    </div>
  );
}

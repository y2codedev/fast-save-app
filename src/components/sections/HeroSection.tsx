'use client';

import { AdsenseAd, FEATURES, TopText, DownloadForm } from '@/constants';
import { Zap, Shield, Globe, Smartphone, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;
  
  return (
    <div className="relative px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent dark:from-indigo-900/20"></div>
      
      <div className='relative py-12 md:py-20'>
        {/* Dynamic Title */}
        <TopText />
        
        {/* Form Container */}
        <div className="mx-auto max-w-4xl mt-10">
          <DownloadForm />
        </div>
        
        {/* Ad Section */}
        <div className='mx-auto max-w-7xl pt-16'>
          <AdsenseAd height="h-[280px]" slot={adsenseSlotId} className="rounded-2xl shadow-lg" />
        </div>
      </div>

      {/* Premium Tool Grid (iLoveIMG Style) */}
      <div className="relative mx-auto max-w-7xl pb-16 pt-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            Every tool you need for media editing
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400">
            100% free online tools to edit, convert, and download media. No installation needed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Card 1: AI Background Remover */}
          <a href="/bg-remover" className="group flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="mb-5 text-indigo-500 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-14 w-14" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Remove Background</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Instantly remove backgrounds from images with high-precision AI.</p>
          </a>

          {/* Card 2: Image Compressor */}
          <a href="/image-compressor" className="group flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="mb-5 text-emerald-500 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-14 w-14" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Compress Image</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Reduce image file size while maintaining excellent quality.</p>
          </a>

          {/* Card 3: SVG Converter */}
          <a href="/photo" className="group flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="mb-5 text-rose-500 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-14 w-14" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Convert to SVG</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Transform your JPG or PNG images into scalable SVG vectors.</p>
          </a>

          {/* Card 4: Audio Extractor */}
          <a href="/audio" className="group flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="mb-5 text-amber-500 group-hover:scale-110 transition-transform duration-300">
              <Globe className="h-14 w-14" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Video to MP3</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Extract high-quality audio from any video instantly.</p>
          </a>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { icon: Zap, value: '10M+', label: 'Downloads' },
            { icon: Shield, value: '100%', label: 'Secure' },
            { icon: Globe, value: '150+', label: 'Countries' },
            { icon: Smartphone, value: '24/7', label: 'Available' },
          ].map((stat, index) => (
            <div key={index} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl">
              <stat.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
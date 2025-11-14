'use client';

import { AdsenseAd, FEATURES, TopText } from '@/constants';
import { Zap, Shield, Globe, Smartphone } from 'lucide-react';

export default function HeroSection() {
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;
  
  return (
    <div className="relative px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent"></div>
      
      <div className='relative py-20'>
        <TopText />
        
        {/* Ad Section */}
        <div className='mx-auto max-w-7xl pt-12'>
          <AdsenseAd height="h-[280px]" slot={adsenseSlotId} className="rounded-2xl shadow-lg" />
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative mx-auto max-w-7xl pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Powerful Features for
            <span className="block text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
              Content Creators
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to download, edit, and enhance your social media content
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES?.map((feature, index) => (
            <div 
              key={feature?.id} 
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/20 dark:border-gray-700/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-xl shadow-lg">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {feature?.name}
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
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
              <stat.icon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
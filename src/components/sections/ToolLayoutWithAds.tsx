'use client';

import React, { ReactNode } from 'react';
import AdsenseAd from '@/components/AdsenseAd';
import ExploreOtherTools from '@/components/sections/ExploreOtherTools';

interface ToolLayoutWithAdsProps {
  children: ReactNode;
}

export default function ToolLayoutWithAds({ children }: ToolLayoutWithAdsProps) {
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;

  return (
    <div className="flex flex-col min-h-screen py-4 md:py-8">
      <div className="mx-auto w-full max-w-[1600px] px-2 sm:px-4 flex flex-col xl:flex-row gap-4 lg:gap-6 flex-1">
        
        {/* Left Sidebar (Desktop Only) */}
        <aside className="hidden xl:block w-[160px] 2xl:w-[200px] flex-shrink-0">
          <div className="pt-4">
            <AdsenseAd height="h-[600px]" slot={adsenseSlotId} className="rounded-xl shadow-sm border border-gray-200 dark:border-gray-800" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 w-full">
          {children}
        </main>

        {/* Right Sidebar (Desktop Only) */}
        <aside className="hidden xl:block w-[160px] 2xl:w-[200px] flex-shrink-0">
          <div className="pt-4">
            <AdsenseAd height="h-[600px]" slot={adsenseSlotId} className="rounded-xl shadow-sm border border-gray-200 dark:border-gray-800" />
          </div>
        </aside>
      </div>

      {/* Multiplex Ad / Pre-Footer Ad */}
      <div className="mx-auto w-full max-w-7xl px-4 mt-16 mb-4">
         <div className="text-center text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Advertisement</div>
         <AdsenseAd height="h-[250px] sm:h-[300px]" slot={adsenseSlotId} className="rounded-2xl shadow-md border border-gray-200 dark:border-gray-800" />
      </div>
      {/* Explore Other Tools Section */}
      <ExploreOtherTools />
    </div>
  );
}

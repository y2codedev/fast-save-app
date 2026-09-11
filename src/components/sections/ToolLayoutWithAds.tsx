'use client';

import React, { ReactNode } from 'react';
import { usePathname } from '@/i18n/routing';
import { canShowAds } from '@/lib/advertising';
import AdsenseAd from '@/components/AdsenseAd';
import RelatedTools from '@/components/sections/RelatedTools';

interface RelatedTool {
  name: string;
  path: string;
  desc: string;
}

interface ToolLayoutWithAdsProps {
  children: ReactNode;
  relatedTools?: RelatedTool[];
  relatedToolsTitle?: string;
  categoryName?: string;
  categoryPath?: string;
}

export default function ToolLayoutWithAds({
  children,
  relatedTools,
  relatedToolsTitle = 'Related Tools',
  categoryName,
  categoryPath,
}: ToolLayoutWithAdsProps) {
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;

  const showAds = canShowAds(usePathname()) && !!adsenseSlotId;

  return (
    <div suppressHydrationWarning className="flex flex-col py-4 sm:py-6">
      <div suppressHydrationWarning className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-6 lg:gap-8 flex-1">

        {/* Left Sidebar (Desktop Only) */}
        {showAds && <aside className="hidden xl:block w-[160px] 2xl:w-[180px] flex-shrink-0">
          <div className="pt-4 sticky top-24">
            <AdsenseAd height="h-[600px]" slot={adsenseSlotId} className="rounded-2xl shadow-xs border border-gray-200 dark:border-gray-800" />
          </div>
        </aside>}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 w-full">
          {children}
        </main>

        {/* Right Sidebar (Desktop Only) */}
        {showAds && <aside className="hidden xl:block w-[160px] 2xl:w-[180px] flex-shrink-0">
          <div className="pt-4 sticky top-24">
            <AdsenseAd height="h-[600px]" slot={adsenseSlotId} className="rounded-2xl shadow-xs border border-gray-200 dark:border-gray-800" />
          </div>
        </aside>}
      </div>

      {/* Multiplex Ad / Pre-Footer Ad */}
      {showAds && (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 mb-4">
          <div className="text-center text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Advertisement</div>
          <AdsenseAd height="h-[250px] sm:h-[300px]" slot={adsenseSlotId} className="rounded-2xl shadow-xs border border-gray-200 dark:border-gray-800" />
        </div>
      )}

      {/* Related Tools Section */}
      {relatedTools && relatedTools.length > 0 && (
        <RelatedTools
          tools={relatedTools}
          title={relatedToolsTitle}
          categoryName={categoryName}
          categoryPath={categoryPath}
        />
      )}
    </div>
  );
}

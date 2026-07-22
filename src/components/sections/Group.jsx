"use client";

import HeroSection from "@/components/sections/HeroSection";
import DownloadSteps from "@/components/sections/DownloadSteps";
import DownloadForm from "@/components/sections/DownloadForm";
import HomeSEOContent from "@/components/sections/HomeSEOContent";
import AdsenseAd from "@/components/AdsenseAd";
import { usePathname } from "next/navigation";

const Group = () => {
    const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID;
    const pathName = usePathname();
    const isHome = pathName === '/';
    return (
        <main>
            <HeroSection>
                {!isHome && <DownloadForm />}
            </HeroSection>

            {/* Top Display Ad for Home Page (Above the Fold) */}
            {isHome && (
                <div className="mx-auto max-w-7xl px-4 mt-8">
                    <AdsenseAd slot={adsenseSlotId} height="min-h-[100px] md:h-[280px]" className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700/50" />
                </div>
            )}

            {!isHome && <DownloadSteps />}
            {isHome && <HomeSEOContent />}
            
            {/* Bottom Display Ad */}
            <div className="mx-auto max-w-7xl px-4 py-8 mt-4">
                <AdsenseAd slot={adsenseSlotId} height="min-h-[100px] md:h-[280px]" className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700/50" />
            </div>
        </main>
    )
}

export default Group
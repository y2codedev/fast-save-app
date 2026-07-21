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
            {!isHome && <DownloadSteps />}
            {isHome && <HomeSEOContent />}
            <div className="mx-auto max-w-7xl px-4 py-8">
                <AdsenseAd slot={adsenseSlotId} className="mb-0 rounded-2xl overflow-hidden shadow-sm" />
            </div>
        </main>
    )
}

export default Group
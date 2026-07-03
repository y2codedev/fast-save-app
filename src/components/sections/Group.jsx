"use client";

import { HeroSection, DownloadSteps, AdsenseAd } from "@/constants";

const Group = () => {
    const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID;
    return (
        <main>
            <HeroSection />
            <DownloadSteps />
            <div className="mx-auto max-w-7xl px-4 py-8">
                <AdsenseAd slot={adsenseSlotId} className="mb-0 rounded-2xl overflow-hidden shadow-sm" />
            </div>
        </main>
    )
}

export default Group
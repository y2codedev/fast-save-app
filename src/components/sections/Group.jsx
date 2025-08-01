"use client";

import { HeroSection, DownloadSteps, LegalDisclaimer, AdsenseAd } from "@/constants";
const Group = () => {
    const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID;
    return (
        <main>
            <HeroSection />
            <DownloadSteps />
            <LegalDisclaimer />
            <AdsenseAd slot={adsenseSlotId} className="mb-0" />
        </main>
    )
}

export default Group
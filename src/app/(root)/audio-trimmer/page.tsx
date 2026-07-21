import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import AudioTrimmer from "@/components/sections/AudioTrimmer";
import ToolLayoutWithAds from "@/components/sections/ToolLayoutWithAds";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "Audio Trimmer - Cut MP3 Online & Make Ringtones";
    const description = "Trim and cut audio files like MP3 online directly in your browser. Create ringtones instantly with no uploads or wait times. Free audio cutter tool.";

    const keywords = [
        "Audio Trimmer",
        "Cut MP3 Online",
        "Ringtone Maker",
        "Free Audio Cutter",
        "Trim MP3",
        "Online Audio Editor",
        "Cut Audio Files",
        "FastSave Audio Trimmer",
        "No Upload Audio Trimmer",
        "Browser Audio Editor",
    ];

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"),
        other: {
            "google-adsense-account": "ca-pub-1504999187644497",
        },
        title,
        description,
        keywords,

        authors: [{ name: "FastSave", url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/audio-trimmer` }],
        publisher: "FastSave",
        creator: "FastSave",
        robots: {
            index: true,
            follow: true,
            nocache: false,
            "max-image-preview": "large",
            "max-video-preview": "-1",
        },

        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/audio-trimmer`,
            types: {
                "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/feed.xml`,
                "application/atom+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/feed.xml`,
            },
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/audio-trimmer`,
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/audio-trimmer.png", // Reusing audio image for now, can be updated later if needed
                    width: 1200,
                    height: 630,
                    alt: "FastSave Audio Trimmer",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/audio-trimmer.png"],
            creator: "@fastsaveapp",
            site: "@fastsaveapp",
            creatorId: "fastsaveapp",
            siteId: "fastsaveapp",
        },
        category: "Technology",
        applicationName: "FastSave - Audio Trimmer",
    };
};

export default function Page() {
    return (
        <ToolLayoutWithAds>
            <NoSSRWrapper>
                <AudioTrimmer />
            </NoSSRWrapper>
        </ToolLayoutWithAds>
    );
}

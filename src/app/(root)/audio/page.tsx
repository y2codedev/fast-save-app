import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import AudioSections from "@/components/sections/AudioSections";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "Audio Downloader – Extract MP3 from Any Video";
    const description = "Convert videos to MP3 in high-quality with FastSave Audio Converter. Free, fast, and supports YouTube, Instagram, Facebook & more. No watermark.";

    const keywords = [
        "Audio Converter",
        "MP3 Downloader",
        "Video to MP3",
        "Online MP3 Converter",
        "Convert YouTube to MP3",
        "Instagram Audio Download",
        "Fast MP3 Download",
        "No Watermark Audio",
        "Audio to MP3 Tool",
        "FastSave Audio",
    ];

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}`),
        other: {
            "google-adsense-account": "ca-pub-1504999187644497",
        },
        title,
        description,
        keywords,

        authors: [{ name: "FastSave", url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/audio` }],
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
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/audio`,
            types: {
                "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/feed.xml`,
                "application/atom+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/feed.xml`,
            },
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/audio`,
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/audio.png",
                    width: 1200,
                    height: 630,
                    alt: "FastSave Audio Downloader",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/audio.png",],
            creator: "@fastsaveapp",
            site: "@fastsaveapp",
            creatorId: "fastsaveapp",
            siteId: "fastsaveapp",
        },
        category: "Technology",
        applicationName: "FastSave - Audio Converter",
    };
};

export default function Page() {
    return (
        <main className="min-h-screen py-8">
            <NoSSRWrapper>
                <AudioSections />
            </NoSSRWrapper>
        </main>
    );
}
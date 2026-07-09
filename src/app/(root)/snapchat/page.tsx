
import { DownloadForm, Group } from "@/constants";

import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "Snapchat Story Saver – Download Snaps Online";

    const description =
        "Download Snapchat videos in HD with FastSave. Save snaps, stories, and videos quickly. No watermark, no login, no app needed. Free and works on all devices.";

    const keywords = [
        "Snapchat Video Downloader",
        "Download Snapchat Videos",
        "Snapchat Story Saver",
        "Save Snap Videos",
        "HD Snapchat Downloader",
        "Download Snaps Without Watermark",
        "Snapchat Video Converter",
        "Online Snapchat Downloader",
        "Free Snapchat Video Download",
        "Snapchat Downloader for Android",
    ];

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}`),
        other: {
            "google-adsense-account": "ca-pub-1504999187644497",
        },
        title,
        description,
        keywords,

        authors: [{ name: "FastSave", url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/snapchat` }],
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
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/snapchat`,
            types: {
                "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/feed.xml`,
                "application/atom+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/feed.xml`,
            },
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/snapchat`,
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/snap.webp",
                    width: 1200,
                    height: 630,
                    alt: "FastSave Snapchat Video Downloader",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/snap.webp"],
            creator: "@fastsaveapp",
            site: "@fastsaveapp",
            creatorId: "fastsaveapp",
            siteId: "fastsaveapp",
        },
        category: "Technology",
        applicationName: "FastSave - Snapchat Video Downloader",
    };
};

export default function page() {

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-gray-900">
            <Group />
        </main>
    );
}
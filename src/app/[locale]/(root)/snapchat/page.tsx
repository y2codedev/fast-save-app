
import { DownloadForm, Group } from "@/constants";

import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "Snapchat Story Saver – Download Snaps Online";

    const description =
        "Download Snapchat videos in HD with ConvertAllNow. Save snaps, stories, and videos quickly. No watermark, no login, no app needed. Free and works on all devices.";

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
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}`),
        other: {
            "google-adsense-account": "ca-pub-1504999187644497",
        },
        title,
        description,
        keywords,

        authors: [{ name: "ConvertAllNow", url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}/snapchat` }],
        publisher: "ConvertAllNow",
        creator: "ConvertAllNow",
        robots: {
            index: true,
            follow: true,
            nocache: false,
            "max-image-preview": "large",
            "max-video-preview": "-1",
        },

        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}/snapchat`,
            types: {
                "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}/feed.xml`,
                "application/atom+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}/feed.xml`,
            },
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}/snapchat`,
            siteName: "ConvertAllNow",
            locale: "en_IN",
            images: [
                {
                    url: "/images/snap.webp",
                    width: 1200,
                    height: 630,
                    alt: "ConvertAllNow Snapchat Video Downloader",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/snap.webp"],
            creator: "@convertallnow",
            site: "@convertallnow",
            creatorId: "convertallnow",
            siteId: "convertallnow",
        },
        category: "Technology",
        applicationName: "ConvertAllNow - Snapchat Video Downloader",
    };
};

export default function page() {

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-gray-900">
            <Group />
        </main>
    );
}
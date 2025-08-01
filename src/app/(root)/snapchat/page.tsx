
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
        metadataBase: new URL("https://fast-save.vercel.app/snapchat"),
        other: {
            "google-site-verification": "tDnK8wGpDutxTfAN-cFdlLdL0AZxiNnDkkvqH08TAIA",
        },
        title,
        description,
        keywords,

         authors: [{ name: "FastSave", url: "https://fast-save.vercel.app/snapchat" }],
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
            canonical: "https://fast-save.vercel.app/snapchat",
            types: {
                "application/rss+xml": "https://fast-save.vercel.app/feed.xml",
                "application/atom+xml": "https://fast-save.vercel.app/feed.xml",
            },
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: "https://fast-save.vercel.app/snapchat",
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

export default function Home() {

    return (
        <main className=" bg-white dark:bg-gray-900">
            <DownloadForm />
            <Group />
        </main>
    );
}
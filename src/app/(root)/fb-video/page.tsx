import { DownloadForm, Group } from "@/constants";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Facebook Video Downloader – Download FB Videos in HD";

    const description =
        "Download Facebook videos in HD quickly and free with FastSave. No watermark, no login needed. Save reels, feeds, pages & private videos on all devices.";

    const keywords = [
        "Facebook Video Downloader",
        "Download Facebook Videos",
        "FB Video Download",
        "Save Facebook Videos",
        "FB HD Video Downloader",
        "Download Facebook Reels",
        "Facebook Private Video Download",
        "FB MP4 Download",
        "Free Facebook Video Downloader",
        "Online FB Video Download",
        "No Watermark Facebook Download",
        "Facebook Story Download",
        "Facebook Video Saver",
    ];

    return {
        metadataBase: new URL("https://fast-save.vercel.app/fb-video"),
        other: {
            "google-site-verification": "tDnK8wGpDutxTfAN-cFdlLdL0AZxiNnDkkvqH08TAIA",
        },
        title,
        description,
        keywords,

        authors: [{ name: "FastSave", url: "https://fast-save.vercel.app/fb-video" }],
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
            canonical: "https://fast-save.vercel.app/fb-video",
            types: {
                "application/rss+xml": "https://fast-save.vercel.app/feed.xml",
                "application/atom+xml": "https://fast-save.vercel.app/feed.xml",
            },
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: "https://fast-save.vercel.app/fb-video",
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/facebook.webp",
                    width: 1200,
                    height: 630,
                    alt: "FastSave Facebook Video Downloader",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/facebook.webp"],
            creator: "@fastsaveapp",
            site: "@fastsaveapp",
            creatorId: "fastsaveapp",
            siteId: "fastsaveapp",
        },
        category: "Technology",
        applicationName: "FastSave - Facebook Video Downloader",
    };
};

export default function page() {

    return (
        <main className=" bg-white dark:bg-gray-900">
            <DownloadForm />
            <Group />
        </main>
    );
}
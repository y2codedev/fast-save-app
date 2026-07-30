import { DownloadForm, Group } from "@/constants";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "Facebook Video Downloader – Save Videos Online Free";

    const description =
        "Download Facebook videos in HD quickly and free with ConvertAllNow. No watermark, no login needed. Save reels, feeds, pages & private videos on all devices.";

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
        "Facebook Video Saver",
    ];

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}`),
        other: {
            "google-adsense-account": "ca-pub-1504999187644497",
        },
        title,
        description,
        keywords,

        authors: [{ name: "ConvertAllNow", url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}/fb-video` }],
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
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}/fb-video`,
            types: {
                "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}/feed.xml`,
                "application/atom+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}/feed.xml`,
            },
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com"}/fb-video`,
            siteName: "ConvertAllNow",
            locale: "en_IN",
            images: [
                {
                    url: "/images/facebook.png",
                    width: 1200,
                    height: 630,
                    alt: "ConvertAllNow Facebook Video Downloader",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/facebook.png"],
            creator: "@convertallnow",
            site: "@convertallnow",
            creatorId: "convertallnow",
            siteId: "convertallnow",
        },
        category: "Technology",
        applicationName: "ConvertAllNow - Facebook Video Downloader",
    };
};

export default function page() {

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-gray-900">
            <Group />
        </main>
    );
}
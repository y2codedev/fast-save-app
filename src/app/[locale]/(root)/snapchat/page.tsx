
import { DownloadForm, Group } from "@/constants";
import type { Metadata } from "next";
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const title = "Snapchat Story Saver – Download Snaps Online";

    const description =
        "Download Snapchat videos in HD with ConvertAllNow. Save snaps, stories, and videos quickly. No watermark, no login, no app needed. Free and works on all devices.";

    return {
        title,
        description,
        keywords: TOOL_KEYWORDS['snapchat'],

        authors: [{ name: "ConvertAllNow", url: getCanonicalUrl(locale, '/snapchat') }],
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
            canonical: getCanonicalUrl(locale, '/snapchat'),
            languages: getAlternateLanguages('/snapchat'),
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: getCanonicalUrl(locale, '/snapchat'),
            siteName: "ConvertAllNow",
            locale: getOgLocale(locale),
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
        },
        category: "Technology",
        applicationName: "ConvertAllNow - Snapchat Video Downloader",
    };
}

export default function page() {

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-gray-900">
            <Group />
        </main>
    );
}

import { DownloadForm, Group } from "@/constants";
import type { Metadata } from "next";
import { getCanonicalUrl, RELATED_TOOLS, getAlternateLanguages, getOgLocale, TOOL_KEYWORDS } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const title = "Facebook Video Downloader – Save Videos Online Free";

    const description =
        "Download Facebook videos in HD quickly and free with ConvertAllNow. No watermark, no login needed. Save reels, feeds, pages & private videos on all devices.";

    return {
        title,
        description,
        keywords: TOOL_KEYWORDS['fb-video'],

        authors: [{ name: "ConvertAllNow", url: getCanonicalUrl(locale, '/fb-video') }],
        publisher: "ConvertAllNow",
        creator: "ConvertAllNow",
        robots: {
            index: false,
            follow: false,
        },

        alternates: {
            canonical: getCanonicalUrl(locale, '/fb-video'),
            languages: getAlternateLanguages('/fb-video'),
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: getCanonicalUrl(locale, '/fb-video'),
            siteName: "ConvertAllNow",
            locale: getOgLocale(locale),
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
        },
        category: "Technology",
        applicationName: "ConvertAllNow - Facebook Video Downloader",
    };
}

export default function page() {

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-gray-900">
            <Group />
        </main>
    );
}
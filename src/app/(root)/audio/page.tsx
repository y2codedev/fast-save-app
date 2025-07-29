import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import AudioSections from "@/components/sections/AudioSections";
import { Group } from "@/constants";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Audio Converter – Convert Video to MP3 in HD";
    const description = "Convert videos to MP3 in high-quality with FastSave Audio Converter. Free, fast, and supports YouTube, Instagram, Facebook & more. No watermark.";

    const keywords = [
        "Audio Converter", "MP3 Downloader", "Video to MP3",
        "Online MP3 Converter", "Extract Audio", "Free Audio Converter",
        "Convert YouTube to MP3", "Instagram Audio Download",
        "Fast MP3 Download", "No Watermark Audio", "Audio to MP3 Tool",
        "FastSave Audio", "Social Media Audio Downloader"
    ];

    return {
        metadataBase: new URL("https://fast-save.vercel.app"),
        other: {
            "google-site-verification": "tDnK8wGpDutxTfAN-cFdlLdL0AZxiNnDkkvqH08TAIA",
        },
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: "website",
            url: "https://fast-save.vercel.app",
            images: [
                {
                    url: "/images/audio.webp",
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
            images: ["/images/audio.webp",],
        },
    };
};

export default function Page() {
    return <div className="bg-white dark:bg-gray-900">
        <NoSSRWrapper>
            <AudioSections />
            <Group />
        </NoSSRWrapper>
    </div>
}

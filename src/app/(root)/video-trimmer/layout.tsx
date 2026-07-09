import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "Free Video Trimmer – Cut Videos Online";

    const description =
        "Cut and trim MP4, AVI, and MOV video files instantly in your browser. No watermark, 100% free, and completely secure video cutter tool.";

    const keywords = [
        "Video Trimmer",
        "Cut Video Free",
        "Online Video Cutter",
        "Trim MP4",
        "Split Video",
        "FastSave Video Trimmer",
        "Browser Video Cutter",
        "No Watermark Video Editor",
    ];

    return {
        metadataBase: new URL("https://fast-save.vercel.app"),
        title,
        description,
        keywords,
        authors: [{ name: "FastSave", url: "https://fast-save.vercel.app/video-trimmer" }],
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
            canonical: "https://fast-save.vercel.app/video-trimmer",
        },
        openGraph: {
            title,
            description,
            type: "website",
            url: "https://fast-save.vercel.app/video-trimmer",
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/video-trimmer.png", 
                    width: 1200,
                    height: 630,
                    alt: "FastSave Video Trimmer",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/video-trimmer.png"],
            creator: "@fastsaveapp",
            site: "@fastsaveapp",
        },
        category: "Technology",
        applicationName: "FastSave - Video Trimmer",
    };
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

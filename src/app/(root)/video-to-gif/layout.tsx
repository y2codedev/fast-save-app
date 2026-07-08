import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "Video to GIF Converter – Free Online Tool";

    const description =
        "Convert MP4, MOV, and AVI videos to high-quality animated GIFs instantly. 100% free, fast, and secure in-browser processing with no watermark.";

    const keywords = [
        "Video to GIF",
        "MP4 to GIF",
        "GIF Converter",
        "Create GIF",
        "Animated GIF Maker",
        "Convert Video to GIF Free",
        "FastSave Video to GIF",
        "No Watermark GIF Maker",
        "Browser Video Converter",
    ];

    return {
        metadataBase: new URL("https://fast-save.vercel.app"),
        title,
        description,
        keywords,
        authors: [{ name: "FastSave", url: "https://fast-save.vercel.app/video-to-gif" }],
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
            canonical: "https://fast-save.vercel.app/video-to-gif",
        },
        openGraph: {
            title,
            description,
            type: "website",
            url: "https://fast-save.vercel.app/video-to-gif",
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/bg-remover.png", // Reusing an image or placeholder
                    width: 1200,
                    height: 630,
                    alt: "FastSave Video to GIF Converter",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/bg-remover.png"],
            creator: "@fastsaveapp",
            site: "@fastsaveapp",
        },
        category: "Technology",
        applicationName: "FastSave - Video to GIF Converter",
    };
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

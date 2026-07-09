import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "Free Video Compressor – Reduce Video Size Online";

    const description =
        "Compress MP4, AVI, and MOV video files directly in your browser without losing quality. 100% free, fast, and secure video size reducer with no file size limits.";

    const keywords = [
        "Video Compressor",
        "Compress Video Free",
        "Reduce Video Size",
        "MP4 Compressor",
        "Online Video Compressor",
        "Shrink Video",
        "FastSave Video Compressor",
        "Browser Video Compressor",
        "Compress Video for Discord",
    ];

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}`),
        title,
        description,
        keywords,
        authors: [{ name: "FastSave", url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/video-compressor` }],
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
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/video-compressor`,
        },
        openGraph: {
            title,
            description,
            type: "website",
            url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/video-compressor`,
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/video-compressor.png", 
                    width: 1200,
                    height: 630,
                    alt: "FastSave Video Compressor",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/video-compressor.png"],
            creator: "@fastsaveapp",
            site: "@fastsaveapp",
        },
        category: "Technology",
        applicationName: "FastSave - Video Compressor",
    };
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

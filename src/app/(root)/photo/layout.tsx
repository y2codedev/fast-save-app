import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "Image Converter – Convert PNG, JPG, WebP & More Instantly";

    const description =
        "Convert PNG, JPG, WebP, SVG, and more quickly with FastSave Image Converter. Free, fast, secure, no watermarks. Supports batch conversion and all major formats.";

    const keywords = [
        "Image Converter",
        "PNG to JPG",
        "JPG to PNG",
        "Convert WebP to PNG",
        "JPEG to PNG",
        "Image to WebP",
        "Convert SVG to PNG",
        "Free Photo Converter",
        "High-Quality Image Conversion",
    ];

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}`),
        other: {
            "google-adsense-account": "ca-pub-1504999187644497",
        },
        title,
        description,
        keywords,

        authors: [{ name: "FastSave", url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/photo` }],
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
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/photo`,
            types: {
                "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/feed.xml`,
                "application/atom+xml": `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/feed.xml`,
            },
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/photo`,
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/photo-converter.png",
                    width: 1200,
                    height: 630,
                    alt: "FastSave Photo Converter",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/photo-converter.png"],
            creator: "@fastsaveapp",
            site: "@fastsaveapp",
            creatorId: "fastsaveapp",
            siteId: "fastsaveapp",
        },
        category: "Technology",
        applicationName: "FastSave - Image Converter",
    };
};

export default function NestedLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}

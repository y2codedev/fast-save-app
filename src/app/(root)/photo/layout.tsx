import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Image Converter – Convert PNG, JPG, WebP & More Instantly";

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
        "Online Image Format Converter",
        "Fast Image Converter",
        "Batch Image Converter",
        "High-Quality Image Conversion",
        "Transparent PNG Converter",
    ];

    return {
        metadataBase: new URL("https://fast-save.vercel.app/photo"),
        other: {
            "google-site-verification": "tDnK8wGpDutxTfAN-cFdlLdL0AZxiNnDkkvqH08TAIA",
        },
        title,
        description,
        keywords,

        authors: [{ name: "FastSave", url: "https://fast-save.vercel.app/photo" }],
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
            canonical: "https://fast-save.vercel.app/photo",
            types: {
                "application/rss+xml": "https://fast-save.vercel.app/feed.xml",
                "application/atom+xml": "https://fast-save.vercel.app/feed.xml",
            },
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: "https://fast-save.vercel.app/photo",
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/photo.webp",
                    width: 1200,
                    height: 630,
                    alt: "FastSave Image Format Converter",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/photo.webp"],
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

import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Image Compressor – Compress Images Without Quality Loss";

    const description =
        "Compress JPEG, PNG, WebP images online with FastSave Image Compressor. Fast, free, watermark-free, secure. Perfect for web, email & social sharing. No signup needed.";

    const keywords = [
        "Image Compressor",
        "Compress Images Online",
        "JPEG Compressor",
        "PNG Compressor",
        "WebP Compression",
        "Reduce Image Size",
        "Online Image Optimizer",
        "Free Image Compressor",
        "Lossless Compression Tool",
        "Photo Compressor",
    ];

    return {
        metadataBase: new URL("https://fast-save.vercel.app/image-compressor"),
        other: {
            "google-site-verification": "tDnK8wGpDutxTfAN-cFdlLdL0AZxiNnDkkvqH08TAIA",
        },
        title,
        description,
        keywords,

        authors: [{ name: "FastSave", url: "https://fast-save.vercel.app/image-compressor" }],
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
            canonical: "https://fast-save.vercel.app/image-compressor",
            types: {
                "application/rss+xml": "https://fast-save.vercel.app/feed.xml",
                "application/atom+xml": "https://fast-save.vercel.app/feed.xml",
            },
        },


        openGraph: {
            title,
            description,
            type: "website",
            url: "https://fast-save.vercel.app/image-compressor",
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/image-compressor.webp",
                    width: 1200,
                    height: 630,
                    alt: "FastSave Image Compressor",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/image-compressor.webp"],
            creator: "@fastsaveapp",
            site: "@fastsaveapp",
            creatorId: "fastsaveapp",
            siteId: "fastsaveapp",
        },
        category: "Technology",
        applicationName: "FastSave - Image Compressor",
    };
};

export default function NestedLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}


import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "Background Remover – Erase Image Background Online";

    const description =
        "Remove backgrounds instantly with FastSave Background Remover. AI-powered, free, no watermark, high-res transparent PNGs for photos, products, and more.";

    const keywords = [
        "Background Remover",
        "Remove Background Online",
        "AI Background Removal",
        "Transparent PNG Generator",
        "Remove Background Free",
        "No Watermark Background Remover",
        "Product Image Background Remover",
        "Online Background Remover",
        "Background Eraser for E-commerce",
        "Bulk Background Remover",
        "HD Transparent Background",
        "Auto Remove Image Background",
        "One-click Background Removal",
    ];

    return {
        metadataBase: new URL("https://fast-save.vercel.app/bg-remover"),
        other: {
            "google-site-verification": "tDnK8wGpDutxTfAN-cFdlLdL0AZxiNnDkkvqH08TAIA",
        },
        title,
        description,
        keywords,

        authors: [{ name: "FastSave", url: "https://fast-save.vercel.app/bg-remover" }],
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
            canonical: "https://fast-save.vercel.app/bg-remover",
            types: {
                "application/rss+xml": "https://fast-save.vercel.app/feed.xml",
                "application/atom+xml": "https://fast-save.vercel.app/feed.xml",
            },
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: "https://fast-save.vercel.app/bg-remover",
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/bg-remover.png",
                    width: 1200,
                    height: 630,
                    alt: "FastSave Background Remover",
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
            creatorId: "fastsaveapp",
            siteId: "fastsaveapp",
        },
        category: "Technology",
        applicationName: "FastSave - Background Remover",
    };
};

export default function NestedLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}


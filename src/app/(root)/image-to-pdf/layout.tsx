import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "Image to PDF Converter – Convert JPG, PNG to PDF";
    const description = "Convert multiple images (JPG, PNG) into a single PDF document instantly. Free, secure, and fast client-side conversion. No watermarks.";
    
    const keywords = [
        "Image to PDF",
        "JPG to PDF",
        "PNG to PDF",
        "Convert Images to PDF",
        "Free PDF Converter",
        "Online Image to PDF",
        "FastSave Image to PDF",
        "No Watermark PDF Converter"
    ];

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}`),
        other: {
            "google-adsense-account": "ca-pub-1504999187644497",
        },
        title,
        description,
        keywords,
        authors: [{ name: "FastSave", url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/image-to-pdf` }],
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
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/image-to-pdf`,
        },
        openGraph: {
            title,
            description,
            type: "website",
            url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app"}/image-to-pdf`,
            siteName: "FastSave",
            locale: "en_IN",
            images: [
                {
                    url: "/images/image-to-pdf.png",
                    width: 1200,
                    height: 630,
                    alt: "FastSave Image to PDF Converter",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/image-to-pdf.png"],
            creator: "@fastsaveapp",
            site: "@fastsaveapp",
            creatorId: "fastsaveapp",
            siteId: "fastsaveapp",
        },
        category: "Productivity",
        applicationName: "FastSave - Image to PDF",
    };
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

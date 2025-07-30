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
        "Image Resizer",
        "Photo Compressor",
        "Batch Image Compression",
        "FastSave Photo Optimizer",
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
        },
    };
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    )
}

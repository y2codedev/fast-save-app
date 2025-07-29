import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Image Converter – Convert PNG, JPG, WebP, SVG & More Instantly";
    const description =
        "Convert images between PNG, JPG, JPEG, WebP, BMP, SVG, AVIF, and more with FastSave Image Converter. 100% free, fast, and secure — no watermarks or quality loss. Supports batch conversion, transparent backgrounds, and all major formats.";

    const keywords = [
        "Image Converter", "PNG to JPG", "JPG to PNG", "Convert WebP to PNG",
        "JPEG to PNG", "Image to WebP", "Convert SVG to PNG", "AVIF to JPG",
        "Free Photo Converter", "Online Image Format Converter", "Fast Image Converter",
        "Batch Image Converter", "High-Quality Image Conversion", "Convert Images Without Losing Quality",
        "FastSave Converter Tool", "Image Format Changer", "Transparent PNG Converter",
        "Online WebP Converter", "Convert Photos Online", "Photo File Format Converter",
        "Convert Image to JPG", "Convert Image to PNG", "Convert PNG to WebP",
        "Convert WebP to JPG", "SVG to JPG Converter", "Image File Conversion Online",
        "Quick Image Converter", "Convert HEIC to JPG", "Free Online Image Converter",
        "Fast Image Format Tool", "Universal Image Converter"
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
                    url: "/images/logo.svg",
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
            images: ["/images/logo.svg"],
        },
    };
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

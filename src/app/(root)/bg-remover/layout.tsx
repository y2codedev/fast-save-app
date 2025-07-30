import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Background Remover – Remove Image Backgrounds Instantly";

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

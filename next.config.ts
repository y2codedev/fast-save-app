import type { NextConfig } from "next";
const siteUrl = "https://fast-save.vercel.app";
const nextConfig: NextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
   async redirects() {
    return [
      {
        source: '/',
        destination: '/',
        permanent: true, 
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

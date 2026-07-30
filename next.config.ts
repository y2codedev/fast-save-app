import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
   typescript: {
    ignoreBuildErrors: true,  
  },
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@/constants', 'lucide-react', 'react-icons', '@heroicons/react'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default withNextIntl(nextConfig);

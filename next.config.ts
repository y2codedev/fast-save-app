import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

// Automatically ensure 7z-wasm binary files are in public/wasm for runtime browser loading
try {
  const wasmDestDir = path.join(process.cwd(), 'public', 'wasm');
  if (!fs.existsSync(wasmDestDir)) {
    fs.mkdirSync(wasmDestDir, { recursive: true });
  }
  const sevenZipDir = path.dirname(require.resolve('7z-wasm'));
  if (fs.existsSync(sevenZipDir)) {
    const allFiles = fs.readdirSync(sevenZipDir);
    allFiles.filter(f => f.endsWith('.wasm') || f.endsWith('.js')).forEach(file => {
      const src = path.join(sevenZipDir, file);
      const dst = path.join(wasmDestDir, file);
      if (!fs.existsSync(dst) || fs.statSync(src).mtimeMs > fs.statSync(dst).mtimeMs) {
        fs.copyFileSync(src, dst);
        console.log(`[NextConfig] Auto-copied ${file} to public/wasm/`);
      }
    });
  }
} catch (e) {
  console.warn('[NextConfig] Note: 7z-wasm asset copy skipped or not found:', e);
}

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
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
   typescript: {
    ignoreBuildErrors: true,  
  },
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@/constants', 'lucide-react', 'react-icons', '@heroicons/react'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        module: false,
        fs: false,
        path: false,
        crypto: false,
        os: false,
        buffer: false,
        stream: false,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);

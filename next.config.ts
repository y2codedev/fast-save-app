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
    // Only apply COOP/COEP to routes that need SharedArrayBuffer (FFmpeg WASM, 7z-wasm)
    const coopCoepRoutes = [
      '/video-trimmer',
      '/video-compressor',
      '/video-to-gif',
      '/audio',
      '/audio-trimmer',
      // Archive tools using 7z-wasm
      '/create-zip', '/unzip-zip', '/edit-zip', '/merge-zip', '/split-zip',
      '/view-zip', '/protect-zip', '/unlock-zip-file',
      '/rar-to-zip', '/7z-to-zip', '/tar-to-zip', '/tar-gz-to-zip',
      '/tar-bz2-to-zip', '/tar-xz-to-zip', '/gz-to-zip', '/bz2-to-zip',
      '/xz-to-zip', '/iso-to-zip',
      '/zip-to-rar', '/zip-to-7z', '/zip-to-tar', '/zip-to-tar-gz',
      '/zip-to-tar-bz2', '/zip-to-tar-xz', '/zip-to-gz', '/zip-to-bz2',
      '/zip-to-xz', '/zip-to-iso',
    ];
    const coopCoepHeaders = [
      { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    ];
    const coopHeaders = coopCoepRoutes.flatMap(route => [
      { source: route, headers: coopCoepHeaders },
      { source: `/:locale(ar|de|es|fr|id|pt|ru|tr|zh)${route}`, headers: coopCoepHeaders },
    ]);
    return [
      ...coopHeaders,
      // Webpack emits dedicated workers into this directory. Their responses must
      // opt into COEP too, otherwise isolated pages cannot start the workers.
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
        ],
      },
      {
        source: '/wasm/:path*',
        headers: [
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
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

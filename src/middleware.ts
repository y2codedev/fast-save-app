import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// WASM routes that require SharedArrayBuffer (FFmpeg and 7z-wasm)
const wasmRoutePattern = /^\/([a-z]{2}\/)?(video-trimmer|video-compressor|video-to-gif|audio-trimmer|audio|create-zip|unzip-zip|edit-zip|merge-zip|split-zip|view-zip|protect-zip|unlock-zip-file|[a-z0-9\.]+-to-zip|zip-to-[a-z0-9\.]+)(\/.*)?$/;

export default function middleware(request: NextRequest) {
  // 1. Redirect www to non-www (301 Permanent Redirect)
  const host = request.headers.get('host') || '';
  if (host.startsWith('www.')) {
    const nonWwwHost = host.replace(/^www\./, '');
    const url = request.nextUrl.clone();
    url.host = nonWwwHost;
    url.protocol = 'https';
    return NextResponse.redirect(url, { status: 301 });
  }

  // 2. Internationalization routing
  const response = intlMiddleware(request);

  // 3. Apply COOP/COEP headers ONLY to routes that require SharedArrayBuffer (WASM/FFmpeg)
  if (wasmRoutePattern.test(request.nextUrl.pathname)) {
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/(en|es|fr|ar|zh|pt|id|ru|de|tr)/:path*',
    '/((?!api|wasm|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ],
};
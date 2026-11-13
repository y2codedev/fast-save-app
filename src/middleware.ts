import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { legacyLocales, routing } from './i18n/routing';
import { NOINDEX_TOOLS } from './lib/constants';

const intlMiddleware = createMiddleware(routing);
const retiredDownloaderPattern = /^\/(?:[a-z]{2}\/)?(?:ig-downloader|fb-video|snapchat)\/?$/;
const legacyLocalePattern = new RegExp(`^/(${legacyLocales.join('|')})(?=/|$)`);
const noindexToolPaths = new Set(NOINDEX_TOOLS);

// WASM routes that require SharedArrayBuffer (FFmpeg and 7z-wasm)
const wasmRoutePattern = /^\/([a-z]{2}\/)?(video-trimmer|video-compressor|video-to-gif|audio-trimmer|audio|create-zip|unzip-zip|edit-zip|merge-zip|split-zip|view-zip|protect-zip|unlock-zip-file|[a-z0-9\.]+-to-zip|zip-to-[a-z0-9\.]+)(\/.*)?$/;

export default function middleware(request: NextRequest) {
  // Retired downloaders have no close replacement. A real 410 prevents these
  // old URLs from becoming soft 404s or misleading redirects.
  if (retiredDownloaderPattern.test(request.nextUrl.pathname)) {
    return new NextResponse(
      '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><title>Tool retired | ConvertAllNow</title></head><body><main><h1>This tool has been retired</h1><p>The requested social-media download tool is no longer available.</p><p><a href="/">Browse current ConvertAllNow tools</a></p></main></body></html>',
      {
        status: 410,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=86400',
          'X-Robots-Tag': 'noindex, follow',
        },
      }
    );
  }

  // 1. Redirect www to non-www (301 Permanent Redirect)
  const host = request.headers.get('host') || '';
  if (host.startsWith('www.')) {
    const nonWwwHost = host.replace(/^www\./, '').split(':')[0];
    const url = request.nextUrl.clone();
    url.host = nonWwwHost;
    url.port = '';
    url.protocol = 'https';
    return NextResponse.redirect(url, { status: 301 });
  }

  // 2. Consolidate unfinished locale variants into the reviewed English page.
  // Query parameters are preserved so shared links continue to work.
  if (legacyLocalePattern.test(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = request.nextUrl.pathname.replace(legacyLocalePattern, '') || '/';
    return NextResponse.redirect(url, { status: 308 });
  }

  // 3. Internationalization routing
  const response = intlMiddleware(request);

  // 4. Apply COOP/COEP headers ONLY to routes that require SharedArrayBuffer (WASM/FFmpeg)
  if (wasmRoutePattern.test(request.nextUrl.pathname)) {
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  }

  const normalizedPath = request.nextUrl.pathname.replace(/\/$/, '') || '/';
  if (noindexToolPaths.has(normalizedPath)) {
    response.headers.set('X-Robots-Tag', 'noindex, follow');
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

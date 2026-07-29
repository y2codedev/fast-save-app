import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: any) {
  const response = intlMiddleware(request);

  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

  return response;
}

export const config = {
  matcher: [
    '/',
    '/(en|es|fr|ar|zh|pt|id|ru|de|tr)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ],
};
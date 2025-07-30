import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const theme = request.cookies.get('theme')?.value;
  const response = NextResponse.next();

  if (theme && !request.cookies.get('fastsave-theme')) {
    response.cookies.set('fastsave-theme', theme);
  }

  return response;
}
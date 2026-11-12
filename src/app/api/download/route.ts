import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { error: 'This social-media download endpoint has been retired.' },
    {
      status: 410,
      headers: { 'Cache-Control': 'public, max-age=86400' },
    }
  );
}

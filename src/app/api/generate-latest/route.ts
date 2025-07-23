import { NextRequest, NextResponse } from 'next/server';

let latestImageUrl: string | null = null;

export async function POST(req: NextRequest) {
  const { imageUrl } = await req.json();
  latestImageUrl = imageUrl;
  return NextResponse.json({ message: 'Saved latest image URL' });
}

export async function GET() {
  return NextResponse.json({ imageUrl: latestImageUrl });
}

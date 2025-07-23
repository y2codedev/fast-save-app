import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  try {

    const apiResponse = await fetch(`${process.env.API_URL}?url=${encodeURIComponent(url)}`);

    if (!apiResponse.ok) {
      throw new Error(`API request failed with status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch reel' },
      { status: 500 }
    );
  }
}
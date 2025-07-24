// app/api/snapchat-download/route.ts

import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing Snapchat URL' }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const videoSrc = await page.evaluate(() => {
      const video = document.querySelector('video');
      return video?.getAttribute('src') || null;
    });

    const title = await page.title();

    await browser.close();

    if (!videoSrc) {
      return NextResponse.json({ error: 'No video found' }, { status: 404 });
    }

    return NextResponse.json({ videoUrl: videoSrc, title });
  } catch (error: any) {
    console.error('Puppeteer error:', error.message);
    return NextResponse.json({ error: 'Failed to scrape video' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const inputUrl = searchParams.get('url');

  if (!inputUrl) {
    return NextResponse.json({ error: 'Missing Pinterest URL' }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
    );

    await page.goto(inputUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const finalUrl = page.url();

    if (!finalUrl.includes('/pin/')) {
      await browser.close();
      return NextResponse.json(
        { error: 'Final URL is not a valid Pinterest pin page' },
        { status: 400 }
      );
    }

    await page.goto(finalUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    const data = await page.evaluate(() => {
      const getContent = (prop: string) =>
        document.querySelector(`meta[property="${prop}"]`)?.getAttribute('content') || null;

      const videoUrl = getContent('og:video:secure_url') ||
        getContent('og:video') ||
        (document.querySelector('video')?.src || null);

      if (!videoUrl) {
        return { error: 'No video found' };
      }

      const title = getContent('og:title') || document.title;
      const description = getContent('og:description');

      return {
        videoUrl,
        title,
        description,
      };
    });

    await browser.close();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      sourceUrl: finalUrl,
      videoUrl: data.videoUrl,
      title: data.title,
      description: data.description,
    });
  } catch (error: any) {
    console.error('Pinterest Puppeteer error:', error.message || error);
    return NextResponse.json(
      { error: 'Failed to scrape Pinterest content' },
      { status: 500 }
    );
  }
}
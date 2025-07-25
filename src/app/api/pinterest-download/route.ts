import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import ytdl from 'ytdl-core';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Constants
const MOBILE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1";

const PLATFORMS = {
   PINTEREST: {
    domains: ["pinterest.com", "pin.it"], 
    selector: 'meta[property="og:video"], video',
  },
  YOUTUBE: {
    domains: ["youtube.com", "youtu.be"],
    selector: 'meta[property="og:video"]',
  }
};

const detectPlatform = (url: string) => {
  for (const [platform, data] of Object.entries(PLATFORMS)) {
    for (const domain of data.domains) {
      if (url.includes(domain)) {
        return platform;
      }
    }
  }
  return null;
};

const execWithTimeout = (command: string, timeout: number) => {
  return new Promise((resolve, reject) => {
    const child = exec(command, (error, stdout, stderr) => {
      clearTimeout(timer);
      if (error) {
        reject(new Error(stderr || error.message));
      } else {
        resolve({ stdout, stderr });
      }
    });

    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`Command timed out after ${timeout}ms`));
    }, timeout);
  });
};

const downloadYouTubeVideo = async (url: string) => {
  try {
    const videoId = ytdl.getURLVideoID(url);
    const info = await ytdl.getInfo(url);
    
    return {
      success: true,
      platform: "YouTube",
      sourceUrl: url,
      videoUrl: info.formats.find(f => f.hasVideo && f.hasAudio)?.url || info.formats[0].url,
      videoInfo: {
        title: info.videoDetails.title,
        channel: info.videoDetails.author.name,
        duration: info.videoDetails.lengthSeconds,
        thumbnail: info.videoDetails.thumbnails[0].url,
        viewCount: info.videoDetails.viewCount,
        uploadDate: info.videoDetails.uploadDate,
        videoId: info.videoDetails.videoId,
      },
    };
  } catch (error: any) {
    throw new Error(`YouTube download failed: ${error.message}`);
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL is required' },
      { status: 400 }
    );
  }

  const platform = detectPlatform(url);
  
  if (!platform) {
    return NextResponse.json(
      { error: 'Unsupported platform. Supported: Pinterest, YouTube' },
      { status: 400 }
    );
  }

  try {
    // Handle YouTube separately
    if (platform === 'YOUTUBE') {
      const result = await downloadYouTubeVideo(url);
      return NextResponse.json(result);
    }

    // Pinterest handling
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setUserAgent(MOBILE_UA);
    await page.setViewport({ width: 375, height: 812, isMobile: true });

    try {
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      const isPinPage = await page.evaluate(() => {
        return window.location.pathname.includes('/pin/');
      });

      if (!isPinPage) {
        throw new Error('URL is not a Pinterest pin');
      }

      const videoData = await page.evaluate(() => {
        const getMetaContent = (property: string) => {
          const meta = document.querySelector(`meta[property="${property}"]`);
          return meta ? meta.getAttribute('content') : null;
        };

        const videoUrl = 
          getMetaContent('og:video:secure_url') || 
          getMetaContent('og:video') || 
          (document.querySelector('video')?.src || null);

        if (!videoUrl) {
          return { error: 'No video found' };
        }

        return {
          videoUrl,
          title: getMetaContent('og:title') || document.title,
          description: getMetaContent('og:description'),
          thumbnail: getMetaContent('og:image'),
          sourceUrl: window.location.href
        };
      });

      if (videoData.error) {
        throw new Error(videoData.error);
      }

      return NextResponse.json({
        success: true,
        platform: 'Pinterest',
        ...videoData
      });

    } finally {
      await browser.close();
    }

  } catch (error: any) {
    console.error('Download error:', error.message);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to download video'
      },
      { status: 500 }
    );
  }
}
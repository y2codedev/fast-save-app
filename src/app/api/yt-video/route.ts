import ytdl from 'ytdl-core';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url || !ytdl.validateURL(url)) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {

    const info = await ytdl.getInfo(url);
    const videoFormat = ytdl.filterFormats(info.formats, 'videoonly');
    const format = ytdl.chooseFormat(videoFormat, {quality: 'highest'});
    const fileName = `${info.videoDetails.title}.${format.container}`;
    const responseHeader = { 'Content-Disposition': `attachment; filename="${fileName}"` };

    return NextResponse.json({ format, responseHeader, fileName });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch video info' }, { status: 500 });
  }

}
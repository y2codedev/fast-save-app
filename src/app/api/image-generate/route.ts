import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt;

    const data = JSON.stringify({
      prompt: prompt || "Transform this image in the style of Studio Ghibli.",
      filesUrl: [
        'https://pub-0dd8640310f144e1b975d2e26148a50e.r2.dev/ghibli/source/ghibli_source_1745083896468.png'
      ],
      size: '1:1'
    });

    const options = {
      method: 'POST',
      hostname: 'ghibli-image-generator-api-open-ai-4o-image-generation-free.p.rapidapi.com',
      path: '/aaaaaaaaaaaaaaaaaiimagegenerator/ghibli/generate.php',
      headers: {
        'x-rapidapi-key': '5da58acae9mshaca9e06ba0032afp175489jsn9e4219e979ab',
        'x-rapidapi-host': 'ghibli-image-generator-api-open-ai-4o-image-generation-free.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    };

    const responseBody: string = await new Promise((resolve, reject) => {
      const apiReq = https.request(options, (apiRes) => {
        let data = '';
        apiRes.on('data', (chunk) => (data += chunk));
        apiRes.on('end', () => resolve(data));
      });

      apiReq.on('error', reject);
      apiReq.write(data);
      apiReq.end();
    });

    const json = JSON.parse(responseBody);
    return NextResponse.json(json);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Server Error', error }, { status: 500 });
  }
}

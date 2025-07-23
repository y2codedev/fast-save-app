import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }

    try {
        const url = 'https://full-downloader-social-media.p.rapidapi.com'
        const response = await axios.get(url, {
            params: { url: query },
            headers: {
                'X-RapidAPI-Key': '5da58acae9mshaca9e06ba0032afp175489jsn9e4219e979ab',
                'X-RapidAPI-Host': 'full-downloader-social-media.p.rapidapi.com'
            }
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || 'Error fetching video data' }, { status: 500 });
    }
}

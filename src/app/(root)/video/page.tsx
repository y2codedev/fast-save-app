'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button, Group, InputField, Toast } from '@/constants';
import { SocialMediaResponse } from '@/constants/types';

export default function SocialMediaDownloader() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<SocialMediaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchMedia = async () => {
    if (!url) {
      Toast('error', 'Please enter a valid social media URL');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
          'x-rapidapi-key': '5da58acae9mshaca9e06ba0032afp175489jsn9e4219e979ab',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch media');
      }

      const transformedData: SocialMediaResponse = {
        success: true,
        platform: data.source || 'unknown',
        title: data.title,
        thumbnail: data.thumbnail,
        author: data.author,
        duration: data.duration,
        medias: data.medias?.map((item: any) => ({
          url: item.url,
          type: item.type || 'video',
          quality: item.quality,
          label: item.label,
          width: item.width,
          height: item.height,
          ext: item.ext,
          bitrate: item.bitrate,
          fps: item.fps,
        })) || [],
      };

      setResult(transformedData);
    } catch (err) {
      console.error('Error:', err);
      Toast('error', err instanceof Error ? err.message : 'Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (downloadUrl: string) => {
    console.log(downloadUrl, "downloadUrl");

    setIsSaving(true);
    try {
      const response = await fetch(downloadUrl, {
        headers: {
          Referer: "https://www.youtube.com/",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "video.mp4";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      Toast('error', 'Download failed. URL may be expired or restricted.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDuration = (seconds: number | undefined) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900  px-4 pt-10 ">
        <div className="max-w-5xl mx-auto sm:p-10 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <InputField
            label='Enter Video URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste social media URL here"
          />

          <div className='mt-4'>
            <Button
              onClick={fetchMedia}
              isProcessing={loading}
              labal='Get Media'
            />
          </div>

          {result && (
            <div className="mt-6 bg-transparent dark:bg-transparent rounded-xl overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Media Preview</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden">
                    {result?.thumbnail ? (
                      <Image
                        src={result?.thumbnail}
                        alt={result?.title || 'Media thumbnail'}
                        fill
                        className="object-cover"
                        quality={80}
                        priority={true}
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">No thumbnail available</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1  space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</h4>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {result.title || 'Untitled Media'}
                      </p>
                    </div>

                    {result.author && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Author</h4>
                        <p className="text-base text-gray-900 dark:text-white">
                          {result.author}
                        </p>
                      </div>
                    )}

                    {result.duration && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</h4>
                        <p className="text-base text-gray-900 dark:text-white">
                          {formatDuration(result.duration)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {result.medias[0] && (
                  <div className="mb-6">
                    <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-4">
                      <div className="w-full  h-96">
                        {result.medias[0].type === 'video' && (
                          <video
                            controls
                            className="w-full h-full rounded-lg object-cover mb-4"
                            src={result.medias[0].url}
                            poster={result.thumbnail}
                          />
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {result.medias[0].label || `Quality`}
                          </h4>
                          <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                            {result.medias[0].width && result.medias[0].height && (
                              <span>{result.medias[0].width}x{result.medias[0].height}</span>
                            )}
                            {result.medias[0].bitrate && (
                              <span>{Math.round(result.medias[0].bitrate / 1000)}kbps</span>
                            )}
                            {result.medias[0].fps && (
                              <span>{result.medias[0].fps}fps</span>
                            )}
                            {result.medias[0].ext && (
                              <span className="uppercase">{result.medias[0].ext}</span>
                            )}
                          </div>
                        </div>

                        <div className='mt-4'>
                          <Button
                            onClick={() => handleDownload(result.medias[0].url)}
                            isProcessing={isSaving}
                            labal='Download'
                            icon={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                <p>Platform: {result.platform}</p>
                <p className="mt-1">Note: Downloaded content is for personal use only. Respect copyright laws.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Group />
    </>
  );
}
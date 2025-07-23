'use client';

import { Link as LinkIcon, Image as ImageIcon, Film } from 'lucide-react';
import { Button, Group, InputField, ResetButton, usePinterestDownloader } from '@/constants';
import Link from 'next/link';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
const PinterestDownloader = () => {
  const { pinterestUrl, mediaItems, isLoading, handleUrlChange, fetchPinterestData, resetForm } = usePinterestDownloader();

  return (
    <>
      <div className="bg-white dark:bg-gray-900  px-4  ">
        <div className='pt-10'>
          <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <div className="">
              <InputField
                label='Enter Pinterest URL'
                type="url"
                id="pinterest-url"
                value={pinterestUrl}
                onChange={handleUrlChange}
                placeholder="https://www.pinterest.com/pin/123456789/"
              />
              <div className="flex flex-col py-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Works with pins, boards, and profile URLs
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              <Button
                onClick={fetchPinterestData}
                isProcessing={isLoading}
                labal='Fetch Media'
              />

              {pinterestUrl && (
                <ResetButton
                  onClick={resetForm}
                  isProcessing={isLoading}
                  labal='Reset'
                />
              )}
            </div>

            {mediaItems.length > 0 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-3">
                    Downloadable Media
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {mediaItems.length} item{mediaItems.length !== 1 ? 's' : ''} found
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {mediaItems?.map((item, index) => (
                    <div
                      key={`${index}`}
                      className="bg-white dark:bg-gray-800 rounded-lg  overflow-hidden border border-gray-200 dark:border-gray-600"
                    >
                      <div className="p-4">
                        {item.title && (
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                        )}
                        <div className="relative">
                          {item.type === 'image' ? (
                            <div className="flex justify-center bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                              <img
                                src={item.url}
                                alt={item.title || `Pinterest image ${index + 1}`}
                                className="max-h-96 object-contain"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div className="flex justify-center bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                              <video
                                src={item.url}
                                className="max-h-96"
                                controls
                                playsInline
                              />
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            {item.type === 'image' ? (
                              <ImageIcon className="h-4 w-4 mr-1" />
                            ) : (
                              <Film className="h-4 w-4 mr-1" />
                            )}
                            <span>{item.type.toUpperCase()}</span>
                            {item.width && item.height && (
                              <span className="ml-2">
                                {item.width}×{item.height}
                              </span>
                            )}
                          </div>

                          <Link
                            href={item.url}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />  Download
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mediaItems.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
                  <LinkIcon className="w-full h-full" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                  No media fetched yet
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Enter a Pinterest URL and click "Fetch Media" to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Group />
    </>
  );
};

export default PinterestDownloader;
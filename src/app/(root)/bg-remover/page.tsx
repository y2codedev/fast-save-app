'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  UploadCloud,
  Link as LinkIcon,
  Image as ImageIcon,
} from 'lucide-react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Group,
  InputField,
  Loader,
  ResetButton,
  useBackgroundRemover,
} from '@/constants';

const BackgroundRemover = () => {
  const {
    mode,
    setMode,
    imageFile,
    imageUrl,
    resultImage,
    isProcessing,
    fileInputRef,
    handleFileChange,
    handleUrlChange,
    removeBackground,
    resetForm,
  } = useBackgroundRemover();

  return (
    <>
      <div className="bg-white dark:bg-gray-900 px-4 pt-10">
        <div className="max-w-5xl mx-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Background Remover
          </h2>

          <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setMode('upload')}
              className={`flex-1 py-2 font-medium text-center ${mode === 'upload'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-500 dark:text-gray-400'
                }`}
            >
              <UploadCloud className="inline-block mr-2 h-5 w-5" />
              Upload Image
            </button>
            <button
              onClick={() => setMode('url')}
              className={`flex-1 py-2 font-medium text-center ${mode === 'url'
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'text-gray-500 dark:text-gray-400'
                }`}
            >
              <LinkIcon className="inline-block mr-2 h-5 w-5" />
              Image URL
            </button>
          </div>

          <div className="mb-6">
            {mode === 'upload' ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select an image file
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex-1 cursor-pointer rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 px-6 py-10 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <UploadCloud className="h-12 w-12 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {imageFile
                          ? imageFile.name
                          : 'Click to select an image file'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <InputField
                  label="Enter image URL"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Original</h3>
              <div className="relative w-full h-80 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {(mode === 'upload' && imageFile) ? (
                  <Image
                    src={URL.createObjectURL(imageFile)}
                    alt="Original"
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={80}
                    priority
                  />
                ) : (mode === 'url' && imageUrl) ? (
                  <Image
                    src={imageUrl}
                    alt="Original"
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={80}
                    priority
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <ImageIcon className="h-12 w-12 mb-2" />
                    <span>No image selected</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Result</h3>
              <div className="relative w-full h-80 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {resultImage ? (
                  <img
                    src={resultImage}
                    alt="Background removed"
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <Loader />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="h-12 w-12 mb-2" />
                        <span>Result will appear here</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={removeBackground}
              isProcessing={isProcessing}
              labal="Remove Background"
            />

            {(imageFile || imageUrl) && (
              <ResetButton
                onClick={resetForm}
                isProcessing={isProcessing}
                labal="Reset"
              />
            )}

            {resultImage && (
              <Link
                href={resultImage}
                download
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Download Result
              </Link>
            )}
          </div>
        </div>
      </div>
      <Group />
    </>
  );
};

export default BackgroundRemover;

'use client'

import { Button, FileUploadArea, Group, Loader, ResetButton } from "@/constants"
import { removeBackground } from "@imgly/background-removal"
import Image from "next/image"
import { useState, useRef } from 'react'
import { FiUpload, FiDownload, FiImage, FiCheckCircle, FiLoader } from 'react-icons/fi'

export default function BackgroundRemovalPage() {
  const [image, setImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (file: File) => {
    setError(null)

    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Max size is 5MB.')
      return
    }

    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPEG, PNG, WEBP)')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveBackground = async () => {
    if (!image) return

    try {
      setIsProcessing(true)
      setError(null)
      setResultImage(null)

      const blob = await removeBackground(image)
      const url = URL.createObjectURL(blob)
      setResultImage(url)

    } catch (err) {
      console.error('Error removing background:', err)
      setError('Failed to remove background. Please try another image.')
    } finally {
      setIsProcessing(false)
    }
  }

  const resetAll = () => {
    setImage(null)
    setResultImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900 pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 h-fit rounded-xl sm:rounded-2xl overflow-hidden">
              <div className="p-4 sm:p-6">
                <h2 className="text-sm sm:text-base text-gray-800 dark:text-white mb-6 flex items-center">
                  <FiUpload className="mr-2" /> Upload File
                </h2>

                <FileUploadArea
                  onFileUpload={handleFileUpload}
                  loading={isProcessing}
                />

                {image && (
                  <div className="mt-4 relative group">
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 z-10">
                      <FiCheckCircle className="h-4 w-4" />
                    </div>
                    <div className="relative bg-gray-100 dark:bg-gray-700 h-48 rounded-lg overflow-hidden border-2 border-green-500">
                      <Image
                        src={image}
                        alt="Uploaded preview"
                        fill
                        className="object-cover p-2"
                      />
                    </div>
                    <p className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center">
                      <FiCheckCircle className="mr-1" />
                      Image selected and ready for processing
                    </p>
                  </div>
                )}

                <div className="mt-6 flex  gap-4">
                  <Button
                    onClick={handleRemoveBackground}
                    isProcessing={isProcessing}
                    labal={'Remove Background'}
                  />

                  {image && !isProcessing && (
                    <ResetButton
                      onClick={resetAll}
                      labal="Reset All"
                    />
                  )}
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm rounded-lg flex items-start gap-2">
                    <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 h-[540px] rounded-xl sm:rounded-2xl overflow-hidden">
              <div className="p-4 sm:p-6">
                <h2 className="text-sm sm:text-base text-gray-800 dark:text-white mb-6 flex items-center">
                  <FiImage className="mr-2" /> Result
                </h2>

                <div className="bg-gray-50 dark:bg-gray-800 h-96 border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center">
                  {isProcessing ? (
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 ">
                        <Loader />
                        <p className="text-gray-600 dark:text-gray-300 font-medium">Removing background...</p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        This may take a few moments depending on image size
                      </p>
                    </div>
                  ) : resultImage ? (
                    <div className="w-full h-full space-y-6">
                      <div className="relative h-[calc(100%-10px)]">
                        <Image
                          src={resultImage}
                          alt="Background removed"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width): 1024px 50vw, 33vw"
                          className="object-cover "
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href={resultImage}
                          download="background-removed.png"
                          className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
                        >
                          <FiDownload className="mr-2" />
                          Download Image
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="mx-auto h-40 w-40 text-gray-300 dark:text-gray-600 flex items-center justify-center">
                        <FiImage className="h-16 w-16" />
                      </div>
                      <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
                        {image ? 'Click "Remove Background" to process' : 'Upload an image to remove its background'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Group />
    </>
  )
}
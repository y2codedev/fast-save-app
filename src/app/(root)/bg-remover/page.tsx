'use client'

import { Button, FileUploadArea, Group, ResetButton } from "@/constants"
import { removeBackground } from "@imgly/background-removal"
import Image from "next/image"
import { useState, useRef } from 'react'
import { FiUpload, FiDownload, FiImage } from 'react-icons/fi'

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
      <div className="min-h-screen bg-whit dark:bg-gray-900 pt-12 px-4 sm:px-6 lg:px-8">
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

                <div className="mt-6">
                  <Button
                    onClick={handleRemoveBackground}
                    isProcessing={isProcessing}
                    labal={'Remove Background'}
                  />
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

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden">
              <div className="p-4 sm:p-6">
                <h2 className="text-sm sm:text-base text-gray-800 dark:text-white mb-6 flex items-center">
                  <FiImage className="mr-2" /> Result
                </h2>

                {resultImage ? (
                  <div className="space-y-6">
                    <div className="relative bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <Image
                        src={resultImage}
                        alt="Background removed"
                        width={500}
                        height={300}
                        className="w-full h-auto object-contain mx-auto max-h-64"
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
                      <ResetButton
                        onClick={resetAll}
                        labal="Reset All"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800 h-96 border border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                    <div className="mx-auto h-40 w-40 text-gray-300 dark:text-gray-600 flex items-center justify-center">
                      <FiImage className="h-16 w-16" />
                    </div>
                    <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
                      Upload an image to remove its background
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Group />
    </>
  )
}
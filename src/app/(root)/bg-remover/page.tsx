'use client';

import { Button, ErrorMessage, FileUploadArea, Loader, ResetButton } from "@/constants"
import { removeBackground } from "@imgly/background-removal"
import Image from "next/image"
import { useState, useRef } from 'react'
import { FiUpload, FiDownload, FiImage, FiCheckCircle, FiTrash2, FiZap } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkle } from "lucide-react";

export default function BackgroundRemovalPage() {
  const [image, setImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (file: File) => {
    setError(null)
    setResultImage(null)

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
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const features = [
    {
      icon: FiZap,
      title: "AI Powered",
      description: "Advanced AI technology for perfect background removal"
    },
    {
      icon: FiDownload,
      title: "Instant Download",
      description: "Get your transparent PNG image instantly"
    },
    {
      icon: Sparkle,
      title: "High Quality",
      description: "Preserves all details with clean edges"
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200 dark:border-gray-700">
            <Sparkle className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI Background Remover
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-violet-600 dark:from-white dark:via-purple-200 dark:to-violet-400 bg-clip-text text-transparent mb-6">
            Remove Background
            <span className="block text-purple-600 dark:text-purple-400">Like Magic</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Instantly remove backgrounds from your images with AI-powered precision. 
            Perfect for product photos, portraits, and creative projects.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Main Converter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Panel */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-lg opacity-30"></div>
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-xl shadow-lg">
                  <FiUpload className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Upload Image
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Upload your image to remove the background
                  </p>
                </div>
              </div>

              <FileUploadArea
                onFileUpload={handleFileUpload}
                loading={isProcessing}
              />

              <AnimatePresence>
                {image && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6"
                  >
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-green-800 dark:text-green-200">
                            Image Ready for Processing
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                            Click the button below to remove the background
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 relative group">
                      <div className="relative bg-gray-100 dark:bg-gray-700 w-full aspect-[4/3] rounded-xl overflow-hidden border-2 border-green-500">
                        <Image
                          src={image}
                          alt="Uploaded preview"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleRemoveBackground}
                  isProcessing={isProcessing}
                  labal={isProcessing ? "Removing Background..." : "Remove Background"}
                  className="flex-1 justify-center"
                  disabled={!image || isProcessing}
                />

                {image && !isProcessing && (
                  <ResetButton
                    onClick={resetAll}
                    labal="Reset All"
                    variant="outline"
                    className="flex-1 justify-center"
                  />
                )}
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4"
                  >
                    <ErrorMessage message={error} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Result Panel */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-30"></div>
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl shadow-lg">
                  <FiImage className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Result
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Your image with background removed
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600 h-96 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isProcessing ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center p-8"
                    >
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                          <Loader />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkle className="h-6 w-6 text-purple-600 animate-pulse" />
                          </div>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            AI is Working Its Magic
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-sm">
                            Our AI is carefully removing the background from your image...
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : resultImage ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full h-full p-4 space-y-6"
                    >
                      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 rounded-xl overflow-hidden">
                        <Image
                          src={resultImage}
                          alt="Background removed"
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href={resultImage}
                          download="background-removed.png"
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex-1"
                        >
                          <FiDownload className="h-5 w-5" />
                          Download PNG
                        </a>
                        <button
                          onClick={resetAll}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-300 flex-1"
                        >
                          <FiTrash2 className="h-5 w-5" />
                          New Image
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center p-8"
                    >
                      <div className="mx-auto h-32 w-32 text-gray-300 dark:text-gray-600 flex items-center justify-center mb-4">
                        <FiImage className="h-20 w-20" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                        {image ? 'Ready to Remove Background' : 'Upload an Image to Start'}
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                        {image ? 'Click the button to see magic happen!' : 'Your processed image will appear here'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tips Section */}
              {!resultImage && !isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
                >
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Pro Tips for Best Results:
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Use high-contrast images for better detection</li>
                    <li>• Ensure good lighting on your subject</li>
                    <li>• Avoid complex backgrounds with similar colors to subject</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Images?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Remove backgrounds instantly with our AI-powered tool. Perfect for e-commerce, 
              social media, creative projects, and professional use.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">No Watermark</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">High Quality</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Instant Processing</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Free to Use</span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
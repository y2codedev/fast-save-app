'use client';

import { Button, ErrorMessage, FileUploadArea, Loader, ResetButton, AdsenseAd } from "@/constants"
import Image from "next/image"
import { useState, useRef, useEffect } from 'react'
import { FiUpload, FiDownload, FiImage, FiCheckCircle, FiTrash2, FiZap } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkle } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function BgRemover() {
  const t = useTranslations('BgRemover');
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;
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

    setIsProcessing(true)
    setError(null)
    setResultImage(null)

    try {
      // Dynamic import to avoid SSR issues with heavy WASM libraries
      const { removeBackground } = await import('@imgly/background-removal')
      
      const blob = await removeBackground(image)
      const url = URL.createObjectURL(blob)
      setResultImage(url)
    } catch (err: any) {
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
      title: t('feature1Title'),
      description: t('feature1Desc')
    },
    {
      icon: FiDownload,
      title: t('feature2Title'),
      description: t('feature2Desc')
    },
    {
      icon: Sparkle,
      title: t('feature3Title'),
      description: t('feature3Desc')
    }
  ]

  return (
    <>
      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200 dark:border-gray-700">
            <Sparkle className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('titleBadge')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-6">
            {t('titleMain')}
            <span className="block text-indigo-600 dark:text-indigo-400">{t('titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
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
                <div className="bg-gradient-to-br from-indigo-500 to-violet-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
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
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-white/20 dark:border-gray-700/50 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500 p-3 rounded-xl shadow-lg">
                  <FiUpload className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('uploadTitle')}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('uploadDesc')}
                  </p>
                </div>
              </div>

              {!image ? (
                <FileUploadArea
                  onFileUpload={handleFileUpload}
                  loading={isProcessing}
                  subtitle={t('uploadSubtitle')}
                  titleText={t('uploadTitleText')}
                  dragText={t('uploadDragText')}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full"
                >
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <FiCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-green-800 dark:text-green-200">
                          {t('readyTitle')}
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          {t('readyDesc')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="relative bg-gray-100 dark:bg-gray-700 w-full aspect-[4/3] rounded-xl overflow-hidden border-2 border-green-500">
                      <Image
                        src={image}
                        alt="Uploaded preview"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleRemoveBackground}
                  isProcessing={isProcessing}
                  label={isProcessing ? t('removingBtn') : t('removeBtn')}
                  className="flex-1 w-full justify-center text-center"
                  disabled={!image || isProcessing}
                />

                {image && !isProcessing && (
                  <ResetButton
                    onClick={resetAll}
                    label={t('resetAll')}
                    variant="outline"
                    className="flex-1 w-full justify-center text-center"
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
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-white/20 dark:border-gray-700/50 p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500 p-3 rounded-xl shadow-lg">
                  <FiImage className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('resultTitle')}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('resultDesc')}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600 h-96 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isProcessing ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full h-full p-4 flex flex-col items-center justify-center"
                    >
                      {image ? (
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100/50 dark:bg-gray-800/50 border-2 border-indigo-500/30">
                          <Image
                            src={image}
                            alt="Processing"
                            fill
                            className="object-contain opacity-40 blur-[2px]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          {/* Scanning laser line */}
                          <motion.div
                            className="absolute left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,1)] z-10"
                            animate={{
                              top: ['0%', '100%', '0%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          {/* Scanning overlay gradient effect */}
                          <motion.div
                            className="absolute left-0 right-0 top-0 bg-gradient-to-b from-indigo-500/0 to-indigo-500/20 z-0"
                            animate={{
                              bottom: ['100%', '0%', '100%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          
                          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-8 py-5 rounded-2xl shadow-2xl flex flex-col items-center border border-indigo-100 dark:border-indigo-900">
                              <Sparkle className="h-8 w-8 text-indigo-600 animate-pulse mb-3" />
                              <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                {t('aiWorking')}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center max-w-[200px]">
                                {t('aiWorkingDesc')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-4">
                          <Loader />
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {t('aiWorking')}
                          </p>
                        </div>
                      )}
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
                          {t('downloadPng')}
                        </a>
                        <button
                          onClick={resetAll}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-300 flex-1"
                        >
                          <FiTrash2 className="h-5 w-5" />
                          {t('newImage')}
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
                        {image ? t('readyToRemove') : t('uploadToStart')}
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                        {image ? t('clickToSee') : t('willAppearHere')}
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
                    {t('proTips')}
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>{t('tip1')}</li>
                    <li>{t('tip2')}</li>
                    <li>{t('tip3')}</li>
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
              {t('ctaTitle')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{t('tagNoWatermark')}</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{t('tagHighQuality')}</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{t('tagInstant')}</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{t('tagFree')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

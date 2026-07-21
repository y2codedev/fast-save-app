'use client'

import { useRef, useState, useEffect } from 'react'
// browser-image-compression is dynamically imported for performance
import { Button, ErrorMessage, FileUploadArea, ImagePreview, Loader, ResetButton, StatsDisplay, AdsenseAd } from '@/constants'
import { FiUpload, FiImage, FiDownload, FiZap, FiSave, FiBarChart2 } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds'

type ImageData = {
    src: string;
    size: number;
    file?: File;
    width?: number;
    height?: number;
} | undefined;

export default function Home() {
    const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;
    const fileRef = useRef<HTMLInputElement>(null)
    const [original, setOriginal] = useState<ImageData>()
    const [compressed, setCompressed] = useState<ImageData>()
    const [loading, setLoading] = useState(false)
    const [compressionRatio, setCompressionRatio] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [targetWidth, setTargetWidth] = useState<string>('')
    const [targetHeight, setTargetHeight] = useState<string>('')

    useEffect(() => {
        return () => {
            if (original?.src) URL.revokeObjectURL(original.src)
        }
    }, [original?.src])

    useEffect(() => {
        return () => {
            if (compressed?.src) URL.revokeObjectURL(compressed.src)
        }
    }, [compressed?.src])

    const handleFileChange = async (droppedFile?: File | React.ChangeEvent<HTMLInputElement>) => {
        // Handle both File objects (from drag & drop) and ChangeEvents (just in case)
        let file: File | undefined = undefined;
        
        if (droppedFile instanceof File) {
            file = droppedFile;
        } else {
            file = fileRef.current?.files?.[0];
        }

        if (!file) return

        if (original?.src) URL.revokeObjectURL(original.src)
        if (compressed?.src) URL.revokeObjectURL(compressed.src)

        setOriginal(undefined)
        setCompressed(undefined)
        setCompressionRatio(null)
        setError(null)

        if (!file.type.match('image.*')) {
            setError('Please select an image file (JPG, PNG, WEBP)')
            return
        }

        if (file.size > 100 * 1024 * 1024) {
            setError('File size exceeds 100MB limit')
            return
        }

        setLoading(true) // Briefly show loader while parsing image

        // Load image to get dimensions
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        
        img.onload = () => {
            setTargetWidth(img.width.toString());
            setTargetHeight(img.height.toString());
            setOriginal({
                src: objectUrl,
                size: file.size,
                file: file,
                width: img.width,
                height: img.height
            })
            setLoading(false)
        }
        img.onerror = () => {
            setError('Failed to load image. Please try another file.')
            setLoading(false)
        }
        img.src = objectUrl;
    }

    const handleCompress = async () => {
        if (!original?.file) return;
        
        setLoading(true)
        setError(null)
        setCompressed(undefined)
        setCompressionRatio(null)

        try {
            let processedFile = original.file;

            if (targetWidth && targetHeight) {
                const width = parseInt(targetWidth);
                const height = parseInt(targetHeight);
                if (!isNaN(width) && !isNaN(height)) {
                    processedFile = (await new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = width;
                            canvas.height = height;
                            const ctx = canvas.getContext('2d');
                            ctx?.drawImage(img, 0, 0, width, height);
                            canvas.toBlob((blob) => {
                                resolve(new File([blob as Blob], original.file!.name, { type: original.file!.type }));
                            }, original.file!.type);
                        };
                        img.src = original.src;
                    })) as File;
                }
            }

            const imageCompression = (await import('browser-image-compression')).default
            
            const compressedFile = await imageCompression(processedFile, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                fileType: processedFile.type.includes('png') ? 'image/png' : 'image/jpeg',
            })

            const compressedSize = compressedFile.size
            const ratio = Math.round((1 - compressedSize / original.size) * 100)

            setCompressed({
                src: URL.createObjectURL(compressedFile),
                size: compressedSize,
                file: compressedFile
            })

            setCompressionRatio(ratio)
        } catch (error) {
            console.error('Compression failed:', error)
            setError('Image compression failed. Please try another image.')
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = () => {
        if (!compressed?.src) return

        const link = document.createElement('a')
        link.href = compressed.src
        link.download = `compressed-${fileRef.current?.files?.[0]?.name || 'image'}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const resetAll = () => {
        if (original?.src) URL.revokeObjectURL(original.src)
        if (compressed?.src) URL.revokeObjectURL(compressed.src)

        setOriginal(undefined)
        setCompressed(undefined)
        setCompressionRatio(null)
        setError(null)
        setTargetWidth('')
        setTargetHeight('')
        if (fileRef.current) {
            fileRef.current.value = ''
        }
    }

    const features = [
        {
            icon: FiZap,
            title: "Lightning Fast",
            description: "Compress images in seconds with optimized algorithms"
        },
        {
            icon: FiSave,
            title: "Save Space",
            description: "Reduce file size without noticeable quality loss"
        },
        {
            icon: FiBarChart2,
            title: "Smart Compression",
            description: "AI-powered compression maintains image clarity"
        }
    ]

    return (
        <ToolLayoutWithAds>
            <div className="py-8 px-4 sm:px-6 lg:px-8">

            <div className="relative max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200 dark:border-gray-700">
                        <FiZap className="h-5 w-5 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            AI Image Compressor
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-6">
                        Compress Images
                        <span className="block text-indigo-600 dark:text-indigo-400">Without Losing Quality</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Reduce image file sizes by up to 90% while maintaining excellent quality. 
                        Perfect for websites, social media, and storage optimization.
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

                {/* Stats Display */}
                <AnimatePresence>
                    {compressionRatio !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mb-8"
                        >
                            <StatsDisplay 
                                compressionRatio={compressionRatio} 
                                originalSize={original?.size}
                                compressedSize={compressed?.size}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Compressor Grid */}
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
                                        Upload Image
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Upload your image to compress it
                                    </p>
                                </div>
                            </div>

                            <FileUploadArea
                                ref={fileRef}
                                onFileUpload={handleFileChange}
                                loading={loading}
                                subtitle="PNG, JPG, or WEBP (Max. 100MB)"
                            />

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

                            {/* Editor Mode Options */}
                            <AnimatePresence>
                                {original && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-6 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
                                    >
                                        <div className="mb-6 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                                            {/* Image Preview */}
                                            <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                                <img 
                                                    src={original.src} 
                                                    alt="Original Preview" 
                                                    className="object-contain h-full w-full"
                                                />
                                            </div>
                                            
                                            {/* File Info & Dimensions */}
                                            <div className="p-4 bg-gray-800 text-white flex flex-col items-center">
                                                <p className="text-sm font-semibold truncate w-full text-center mb-3">
                                                    {original.file?.name || "image.jpg"}
                                                </p>
                                                <div className="flex items-center gap-3 text-sm font-medium">
                                                    <span className="bg-gray-700 px-3 py-1 rounded-md text-gray-300">
                                                        {original.width} x {original.height}
                                                    </span>
                                                    <span className="text-gray-400">→</span>
                                                    <span className="bg-indigo-500 px-3 py-1 rounded-md text-white shadow-sm">
                                                        {targetWidth || original.width} x {targetHeight || original.height}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                                            <FiZap className="w-4 h-4 text-indigo-500" />
                                            Adjust Dimensions
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 mb-5">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Target Width (px)</label>
                                                <input 
                                                    type="number" 
                                                    value={targetWidth}
                                                    onChange={(e) => setTargetWidth(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Target Height (px)</label>
                                                <input 
                                                    type="number" 
                                                    value={targetHeight}
                                                    onChange={(e) => setTargetHeight(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            onClick={handleCompress}
                                            isProcessing={loading}
                                            label={compressed ? 'Re-Compress Image' : 'Apply & Compress Image'}
                                            className="w-full justify-center py-3 text-lg"
                                            icon={<FiSave className="h-5 w-5" />}
                                        />
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
                                        Compressed Result
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Your optimized image ready for download
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600 min-h-[400px] flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    {loading ? (
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
                                                        <FiZap className="h-6 w-6 text-indigo-600 animate-pulse" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        Compressing Your Image
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-sm">
                                                        Optimizing your image for the best quality and size balance...
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : compressed ? (
                                        <motion.div
                                            key="result"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="w-full h-full p-4 space-y-6"
                                        >
                                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                                <ImagePreview
                                                    imageSrc={compressed?.src}
                                                    size={compressed?.size}
                                                    label="Compressed Image"
                                                />
                                            </div>
                                            
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <Button
                                                    onClick={handleDownload}
                                                    isProcessing={loading}
                                                    label={'Download Compressed Image'}
                                                    className="flex-1 justify-center"
                                                    icon={<FiDownload className="h-5 w-5" />}
                                                />

                                                <ResetButton
                                                    onClick={resetAll}
                                                    label="Compress Another"
                                                    variant="outline"
                                                    className="flex-1 justify-center"
                                                />
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
                                                {original ? 'Compressing Your Image...' : 'Upload an Image to Start'}
                                            </p>
                                            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                                                {original ? 'Your compressed image will appear here!' : 'Your compressed image will appear here'}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Compression Tips */}
                            {!compressed && !loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4"
                                >
                                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                                        Best Practices:
                                    </h4>
                                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                                        <li>• Works best with JPG, PNG, and WEBP formats</li>
                                        <li>• Ideal for photos up to 100MB</li>
                                        <li>• Maintains quality while reducing file size</li>
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Ad Section */}
                <motion.div 
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className='mx-auto max-w-4xl'>
                        <AdsenseAd height="min-h-[100px] md:h-[280px]" slot={adsenseSlotId} className="rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700/50" />
                    </div>
                </motion.div>

                {/* Comparison Section */}
                <AnimatePresence>
                    {original && compressed && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/50">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
                                    Before & After Comparison
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="text-center">
                                        <h4 className="font-semibold text-red-600 dark:text-red-400 mb-4">Original Image</h4>
                                        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border-2 border-red-200 dark:border-red-800">
                                            <ImagePreview
                                                imageSrc={original.src}
                                                size={original.size}
                                                label="Original"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-4">Compressed Image</h4>
                                        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border-2 border-green-200 dark:border-green-800">
                                            <ImagePreview
                                                imageSrc={compressed.src}
                                                size={compressed.size}
                                                label="Compressed"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CTA Section */}
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/50">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Optimize Your Images Today!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                            Reduce loading times, save storage space, and improve website performance 
                            with our advanced image compression technology.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">No Quality Loss</span>
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Fast Processing</span>
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Free to Use</span>
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">All Formats</span>
                        </div>
                    </div>
                </motion.div>
            </div>
          </div>
        </ToolLayoutWithAds>
    )
}
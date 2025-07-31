'use client'

import { useRef, useState, useEffect } from 'react'
import imageCompression from 'browser-image-compression'
import { Button, ErrorMessage, FileUploadArea, Group, ImagePreview, Loader, ResetButton, StatsDisplay } from '@/constants'
import { FiUpload, FiImage } from 'react-icons/fi'

type ImageData = {
    src: string;
    size: number;
} | undefined;

export default function Home() {
    const fileRef = useRef<HTMLInputElement>(null)
    const [original, setOriginal] = useState<ImageData>()
    const [compressed, setCompressed] = useState<ImageData>()
    const [loading, setLoading] = useState(false)
    const [compressionRatio, setCompressionRatio] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        return () => {
            if (original?.src) URL.revokeObjectURL(original.src)
            if (compressed?.src) URL.revokeObjectURL(compressed.src)
        }
    }, [original, compressed])

    const handleFileChange = async () => {
        const file = fileRef.current?.files?.[0]
        if (!file) return

        setLoading(true)
        if (original?.src) URL.revokeObjectURL(original.src)
        if (compressed?.src) URL.revokeObjectURL(compressed.src)

        setOriginal(undefined)
        setCompressed(undefined)
        setCompressionRatio(null)
        setError(null)

        if (!file.type.match('image.*')) {
            setError('Please select an image file (JPG, PNG, WEBP)')
            setLoading(false)
            return
        }

        if (file.size > 100 * 1024 * 1024) {
            setError('File size exceeds 100MB limit')
            setLoading(false)
            return
        }

        try {
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                fileType: file.type.includes('png') ? 'image/png' : 'image/jpeg',
            })

            const originalSize = file.size
            const compressedSize = compressedFile.size
            const ratio = Math.round((1 - compressedSize / originalSize) * 100)

            setOriginal({
                src: URL.createObjectURL(file),
                size: originalSize,
            })

            setCompressed({
                src: URL.createObjectURL(compressedFile),
                size: compressedSize,
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
        if (fileRef.current) {
            fileRef.current.value = ''
        }
    }

    return (
        <>
            <main className="bg-white dark:bg-gray-900 pt-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {compressionRatio !== null && (
                        <StatsDisplay compressionRatio={compressionRatio} />
                    )}
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                            <div className="bg-gray-50 dark:bg-gray-800 h-fit rounded-xl sm:rounded-2xl overflow-hidden">
                                <div className="p-4 sm:p-6">
                                    <h2 className="text-sm sm:text-base text-gray-800 dark:text-white mb-6 flex items-center">
                                        <FiUpload className="mr-2" /> Upload File
                                    </h2>

                                    <FileUploadArea
                                        ref={fileRef}
                                        onFileUpload={handleFileChange}
                                        loading={loading}
                                    />
                                    {error && <ErrorMessage message={error} />}
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800  rounded-xl sm:rounded-2xl overflow-hidden">
                                <div className="p-4 sm:p-6">
                                    <h2 className="text-sm sm:text-base text-gray-800 dark:text-white mb-6 flex items-center">
                                        <FiImage className="mr-2" /> Your Image Preview Will Appear Here
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-800  border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center">
                                        {loading ? (
                                            <div className='flex items-center justify-center h-full w-full p-8'>
                                                <div className="flex-col">
                                                    <div className="flex items-center justify-center space-x-2 ">
                                                        <Loader />
                                                        <p className="text-gray-600 dark:text-gray-300 font-medium">Compressing image...</p>
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                        This may take a few moments depending on image size
                                                    </p>
                                                </div>
                                            </div>
                                        ) : compressed ? (
                                            <div className="w-full ">
                                                <div className="relative h-full  rounded-lg overflow-hidden">
                                                    <ImagePreview
                                                        imageSrc={compressed?.src}
                                                        size={compressed?.size}
                                                        label="Compressed Image"
                                                    />
                                                    <div className="flex items-center gap-3 px-4 pb-4 ">
                                                        <Button
                                                            onClick={handleDownload}
                                                            isProcessing={loading}
                                                            labal={'Download Image'}
                                                            icon={true}
                                                        />

                                                        {compressed && !loading && (
                                                            <ResetButton
                                                                onClick={resetAll}
                                                                labal="Reset All"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className=" p-6">
                                                <div className="h-40 w-40 mx-auto text-gray-300 dark:text-gray-600 flex items-center justify-center">
                                                    <FiImage className="h-16 w-16" />
                                                </div>
                                                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm text-center">
                                                    {original ? 'Click "Compress Image" to process' : 'Upload an image to compress it'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Group />
        </>
    )
}
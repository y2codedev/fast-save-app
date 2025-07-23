'use client'

import { useRef, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { Button, Group, ImagePreview, Loader, StatsDisplay } from '@/constants'

export default function Home() {
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [original, setOriginal] = useState<{ src: string; size: number }>()
    const [compressed, setCompressed] = useState<{ src: string; size: number }>()
    const [loading, setLoading] = useState(false)
    const [compressionRatio, setCompressionRatio] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = async () => {
        const file = fileRef.current?.files?.[0]
        if (!file) return

        setLoading(true)
        setOriginal(undefined)
        setCompressed(undefined)
        setCompressionRatio(null)
        setError(null)

        if (!file.type.match('image.*')) {
            setError('Please select an image file (JPG, PNG, WEBP)')
            setLoading(false)
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('File size exceeds 10MB limit')
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

    return (
        <>
            <main className="bg-white dark:bg-gray-900  sm:pt-12 pt-0  px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-transparent  pt-6">
                        <div className="flex flex-col items-center">
                            <label
                                htmlFor="file-upload"
                                className={`relative cursor-pointer ${loading ? 'bg-indigo-400 dark:bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700'} text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center`}
                            >
                                {loading ? (
                                    <>
                                        <Loader /> <span className='ml-2'>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Choose an Image
                                    </>
                                )}
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    ref={fileRef}
                                    onChange={handleFileChange}
                                    className="sr-only"
                                    disabled={loading}
                                />
                            </label>
                            <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                                Supports JPG, PNG, WEBP (Max: 10MB)
                            </p>
                        </div>

                        {error && (
                            <div className="mt-4 text-center text-red-500 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {loading && (
                            <div className="mt-6 flex flex-col items-center">
                                <Loader />
                                <p className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium">
                                    Compressing your image...
                                </p>
                            </div>
                        )}
                    </div>

                    {compressionRatio !== null && (
                        <StatsDisplay compressionRatio={compressionRatio} />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {original && (
                            <ImagePreview
                                imageSrc={original.src}
                                size={original.size}
                                label="Original Image"
                            />
                        )}
                        {compressed && (
                            <ImagePreview
                                imageSrc={compressed.src}
                                size={compressed.size}
                                label="Compressed Image"
                            />
                        )}
                    </div>

                    {compressed?.src && (
                        <div className="mt-8 flex justify-center">
                            <Button
                                onClick={handleDownload}
                                isProcessing={false}
                                labal='Download Image'
                                icon={true}
                            />
                        </div>
                    )}
                </div>
            </main>
            <Group />
        </>
    )
}
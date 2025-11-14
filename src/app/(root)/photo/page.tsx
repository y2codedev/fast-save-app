"use client";

import Dropzone from '@/components/image-converter/dropzone'
import ImageToSVG from '@/components/sections/ImageToSVG'
import React, { useState } from 'react'
import { FiImage, FiUpload, FiCode, FiZap, FiDownload, FiCheck } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const Page = () => {
    const [activeTab, setActiveTab] = useState('dropzone');

    const tabs = [
        {
            id: 'dropzone',
            label: 'Image Upload',
            icon: FiUpload,
            description: 'Upload and manage your images'
        },
        {
            id: 'svg',
            label: 'SVG Converter',
            icon: FiCode,
            description: 'Convert images to SVG format'
        }
    ];

    const features = [
        {
            icon: FiZap,
            title: "Lightning Fast",
            description: "Convert images in seconds with our optimized processing engine"
        },
        {
            icon: FiDownload,
            title: "Multiple Formats",
            description: "Support for JPG, PNG, WEBP, and more to SVG conversion"
        },
        {
            icon: FiCheck,
            title: "High Quality",
            description: "Maintain image quality with vector-based SVG output"
        }
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200 dark:border-gray-700">
                        <FiImage className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Professional Image Tools
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-violet-600 dark:from-white dark:via-purple-200 dark:to-violet-400 bg-clip-text text-transparent mb-6">
                        Image Converter
                        <span className="block text-purple-600 dark:text-purple-400">Pro Studio</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Convert, optimize, and transform your images with our powerful suite of tools. 
                        From SVG conversion to format optimization, we've got you covered.
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

                {/* Main Converter Card */}
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-lg opacity-30"></div>
                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                        
                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <div className="flex p-4 gap-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                                            activeTab === tab.id
                                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <tab.icon className="h-5 w-5" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6 md:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeTab === 'dropzone' && (
                                        <div className="space-y-6">
                                            <div className="text-center mb-6">
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                    Upload Your Images
                                                </h2>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Drag and drop your images or click to browse. Supports JPG, PNG, WEBP, and more.
                                                </p>
                                            </div>
                                            <Dropzone />
                                        </div>
                                    )}
                                    
                                    {activeTab === 'svg' && (
                                        <div className="space-y-6">
                                            <div className="text-center mb-6">
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                    Convert to SVG
                                                </h2>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Transform your raster images into scalable vector graphics with perfect quality.
                                                </p>
                                            </div>
                                            <ImageToSVG />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Additional Tools Section */}
                <motion.div 
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/50">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            More Image Tools Coming Soon
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                            We're constantly expanding our toolkit. Stay tuned for background removal, 
                            image compression, batch processing, and more advanced features.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Background Remover</span>
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Image Compressor</span>
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Batch Processor</span>
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">AI Enhancer</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}

export default Page;
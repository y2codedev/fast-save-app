'use client';

import Dropzone from '@/components/image-converter/dropzone'
import ImageToSVG from '@/components/sections/ImageToSVG'
import React, { useState } from 'react'
import { FiImage, FiUpload, FiCode } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl';
import PrivacyBadge from '@/components/ui/PrivacyBadge';

export default function ImageConverter() {
    const t = useTranslations('ImageConverter');
    const [activeTab, setActiveTab] = useState('dropzone');

    const tabs = [
        {
            id: 'dropzone',
            label: t('tabUpload'),
            icon: FiUpload,
            description: 'Upload and manage your images'
        },
        {
            id: 'svg',
            label: t('tabSvg'),
            icon: FiCode,
            description: 'Convert images to SVG format'
        }
    ];

    return (
        <div className="relative max-w-6xl mx-auto py-2">
            {/* Header Section */}
            <motion.div 
                className="text-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="inline-flex items-center whitespace-nowrap gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-3 border border-gray-200 dark:border-gray-700">
                    <FiImage className="h-4 w-4 text-indigo-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('titleBadge')}
                    </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-3">
                    {t('titleMain')}
                    <span className="block text-indigo-600 dark:text-indigo-400">{t('titleHighlight')}</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    {t('subtitle')}
                </p>
                <PrivacyBadge className="mt-4" />
            </motion.div>

            {/* Main Converter Card */}
            <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 overflow-hidden">
                    
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <div className="flex p-4 gap-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg'
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
                                                {t('uploadTitle')}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {t('uploadDesc')}
                                            </p>
                                        </div>
                                        <Dropzone />
                                    </div>
                                )}
                                
                                {activeTab === 'svg' && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                {t('svgTitle')}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {t('svgDesc')}
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
        </div>
    )
}

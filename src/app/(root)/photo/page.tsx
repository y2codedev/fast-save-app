"use client";

import Dropzone from '@/components/image-converter/dropzone'
import ImageToSVG from '@/components/sections/ImageToSVG'
import { Group } from '@/constants';
import React, { useState } from 'react'

const Page = () => {
    const [activeTab, setActiveTab] = useState('dropzone');

    return (
        <>
            <main className="bg-white dark:bg-gray-900 px-4 pt-10">
                <div className="max-w-5xl mx-auto overflow-hidden p-4 md:p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <p className="font-medium text-sm sm:text-lg text-gray-700  dark:text-gray-300 mb-6">
                        Free Unlimited File Converter
                    </p>
                    <div className="flex  gap-4  dark:border-gray-700 mb-6">
                        <button
                            className={`py-2 px-4 text-sm  ${activeTab === 'dropzone' ? 'text-sm font-medium rounded-[8px] text-white bg-indigo-600 hover:bg-indigo-700' : ' bg-gray-200 text-sm font-medium rounded-[8px]  dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white  transition-all'}`}
                            onClick={() => setActiveTab('dropzone')}
                        >
                            Dropzone
                        </button>
                        <button
                            className={`py-2 px-4 text-sm  ${activeTab === 'svg' ? 'text-sm font-medium rounded-[8px] text-white bg-indigo-600 hover:bg-indigo-700' : ' bg-gray-200 text-sm font-medium rounded-[8px]  dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white  transition-all'}`}
                            onClick={() => setActiveTab('svg')}
                        >
                            Converter
                        </button>
                    </div>

                    {activeTab === 'dropzone' && (
                        <Dropzone />
                    )}
                    {activeTab === 'svg' && (
                        <ImageToSVG />
                    )}
                </div>
            </main>
            <Group />
        </>
    )
}

export default Page;

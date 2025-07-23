"use client";

import { TopHeader_Item } from '@/constants/data';
import { usePathname } from 'next/navigation'
import React from 'react'
const TopText = () => {
    const pathName = usePathname();
    const content = TopHeader_Item.find(item => item.path === pathName) || TopHeader_Item.find(item => item.path === '')!;
    return (
        <div className="mx-auto max-w-7xl px-4 text-center ">
            <h1 className="text-md font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                {content?.title.split(content.highlight || '')[0]}
                {content?.highlight && (
                    <span className="text-indigo-600 ml-2 ">
                        {content?.highlight}
                    </span>
                )}
                {content?.title.split(content?.highlight || '')[1]}
            </h1>
            <p className="mt-6 sm:text-lg text-xs leading-8 text-gray-600 dark:text-gray-300">
                {content?.description}
            </p>
        </div>
    )
}

export default TopText
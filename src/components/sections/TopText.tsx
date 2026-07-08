"use client";

import { TopHeader_Item } from '@/constants/data';
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion';

const TopText = () => {
    const pathName = usePathname();
    const content = TopHeader_Item.find(item => item.path === pathName) || TopHeader_Item.find(item => item.path === '')!;
    
    return (
        <motion.div 
            className="mx-auto max-w-4xl px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {content?.title.split(content.highlight || '')[0]}
                {content?.highlight && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 mx-2">
                        {content?.highlight}
                    </span>
                )}
                {content?.title.split(content?.highlight || '')[1]}
            </h1>
            <motion.p 
                className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                {content?.description}
            </motion.p>
        </motion.div>
    )
}

export default TopText
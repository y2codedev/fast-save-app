"use client";

import { TopHeader_Item } from '@/constants/data';
import { usePathname } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const TopText = () => {
    const pathName = usePathname();
    const content = TopHeader_Item.find(item => item.path === pathName) || TopHeader_Item.find(item => item.path === '')!;
    const t = useTranslations('TopHeader');
    
    return (
        <motion.div 
            className="mx-auto max-w-4xl px-4 text-center"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {t.rich(content.titleKey, {
                    highlight: (chunks) => (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 mx-1 sm:mx-2">
                            {chunks}
                        </span>
                    )
                })}
            </h1>
            <motion.p 
                className="mt-3 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                {t(content.descriptionKey)}
            </motion.p>
        </motion.div>
    )
}

export default TopText
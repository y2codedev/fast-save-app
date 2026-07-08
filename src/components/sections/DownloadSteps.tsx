'use client';

import { STEP, TopHeader_Item } from "@/constants/data";
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion';
import { ArrowRight } from "lucide-react";

export default function DownloadSteps() {
    const pathName = usePathname();
    const urlPath = TopHeader_Item?.find(item => item?.path === pathName) || TopHeader_Item?.find(item => item.path === '')!;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="relative py-24">
            <div className="relative mx-auto max-w-7xl px-4">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full px-4 py-2 mb-6 border border-indigo-100 dark:border-indigo-800">
                        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                            Simple Process
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                        How to Download
                        <span className="block text-indigo-600 mt-2">
                            {urlPath?.highlight} Videos
                        </span>
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Our streamlined process makes it incredibly easy to download your favorite media in just a few clicks.
                    </p>
                </motion.div>

                <motion.div 
                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {STEP?.map((step, index) => (
                        <motion.div 
                            key={step?.id} 
                            variants={itemVariants}
                            className="relative group"
                        >
                            <div className="h-full relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                {/* Large Watermark Number */}
                                <div className="absolute -right-4 -top-6 text-9xl font-black text-slate-50 dark:text-gray-700/30 select-none group-hover:text-indigo-50 dark:group-hover:text-indigo-900/20 transition-colors duration-300">
                                    {step?.id}
                                </div>
                                
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                        <step.icon className="h-7 w-7" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                        {step?.name}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm flex-grow">
                                        {step?.description}
                                    </p>
                                </div>
                            </div>

                            {/* Arrow Indicator (only visible on desktop between cards) */}
                            {index < STEP.length - 1 && (
                                <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 text-gray-400">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div 
                    className="text-center mt-16 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-10 md:p-12 border border-indigo-100 dark:border-gray-700">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to save your media?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                            Join millions of users who trust our platform for fast, secure, and high-quality downloads.
                        </p>
                        <a 
                            href="#download-section" 
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:-translate-y-1"
                        >
                            Start Downloading
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
'use client';

import { STEP, TopHeader_Item } from "@/constants/data";
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion';

export default function DownloadSteps() {
    const pathName = usePathname();
    const urlPath = TopHeader_Item?.find(item => item?.path === pathName) || TopHeader_Item?.find(item => item.path === '')!;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="relative py-20 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.1) 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200 dark:border-gray-700">
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                            Simple Process
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        How to Download
                        <span className="block text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                            {urlPath?.highlight} Videos
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Our streamlined process makes it incredibly easy to download your favorite videos in just a few clicks.
                    </p>
                </motion.div>

                <motion.div 
                   className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {STEP?.map((step) => (
                        <motion.div 
                            key={step?.id} 
                            variants={itemVariants}
                            className="group relative"
                        >
                            {/* Connection Line */}
                            {step.id < STEP.length && (
                                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-gray-700 dark:to-gray-700 -z-10"></div>
                            )}
                            
                            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-white/20 dark:border-gray-700/50">
                                {/* Step Number */}
                                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                    {step?.id}
                                </div>
                                
                                <div className="flex flex-col items-center text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <step.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                        {step?.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {step?.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/50">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to Download Your Videos?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Join millions of users who trust our platform for fast and secure video downloads.
                        </p>
                        <a 
                            href="#download-section" 
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            Start Downloading Now
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
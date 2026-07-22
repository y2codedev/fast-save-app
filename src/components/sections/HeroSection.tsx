'use client';

import AdsenseAd from '@/components/AdsenseAd';
import TopText from '@/components/sections/TopText';
import DownloadForm from '@/components/sections/DownloadForm';
import { Zap, Shield, Globe, Smartphone, Sparkles, Scissors, Shrink, Film, Music, Instagram, Facebook, FileImage, FileText, Layers, ImagePlus, Unlock, Lock, Image as ImageIcon } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

import { usePathname } from 'next/navigation';

export default function HeroSection({ children }: { children?: React.ReactNode }) {
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;
  const pathName = usePathname();
  const isHome = pathName === '/';
  
  return (
    <div className="relative px-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent dark:from-indigo-900/20 -z-10 pointer-events-none"></div>
      
      <div className='relative py-12 md:py-20'>
        {/* Dynamic Title */}
        <div className="mt-8 mb-4">
          <TopText />
        </div>
        
        {children && (
          <div className="mx-auto max-w-4xl mt-10 relative z-20">
            {children}
          </div>
        )}
        
        {/* Ad Section - Top */}
        {/* <div className='mx-auto max-w-5xl pt-12 md:pt-16'>
          <AdsenseAd height="h-[100px] md:h-[280px]" slot={adsenseSlotId} className="rounded-2xl shadow-lg" />
        </div> */}
      </div>

      {/* Premium Tool Grid */}
      <div className="relative mx-auto max-w-7xl pb-16 pt-4">
        {!isHome && (
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              Explore more free tools
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400">
              100% free online tools to edit, convert, and download media. No installation needed.
            </p>
          </div>
        )}

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            // {
            //   href: "/fb-video",
            //   icon: Facebook,
            //   title: "FB Downloader",
            //   description: "Save public Facebook videos directly to your device.",
            //   color: "cyan"
            // },
            // {
            //   href: "/snapchat",
            //   icon: Smartphone,
            //   title: "Snapchat Downloader",
            //   description: "Download Snapchat Spotlight and Stories easily.",
            //   color: "amber"
            // },
            {
              href: "/ig-downloader",
              icon: Instagram,
              title: "IG Downloader",
              description: "Download HD Photos and Reels from Instagram.",
              color: "pink"
            },
            {
              href: "/bg-remover",
              icon: Sparkles,
              title: "Remove Background",
              description: "Instantly remove backgrounds from images with high-precision AI.",
              color: "indigo"
            },
            {
              href: "/image-compressor",
              icon: Zap,
              title: "Compress Image",
              description: "Reduce image file size while maintaining excellent quality.",
              color: "emerald"
            },
            {
              href: "/image-to-pdf",
              icon: FileImage,
              title: "Image to PDF",
              description: "Convert multiple images into a single PDF document easily.",
              color: "amber"
            },
             {
              href: "/md-converter",
              icon: FileText,
              title: "MD to PDF & Word",
              description: "Convert Markdown files to PDF or DOCX format securely.",
              color: "indigo"
            },
            {
              href: "/pdf-to-jpg",
              icon: ImagePlus,
              title: "PDF to JPG",
              description: "Extract high-quality JPG images from any PDF document.",
              color: "cyan"
            },
            {
              href: "/merge-pdf",
              icon: Layers,
              title: "Merge PDF",
              description: "Combine multiple PDF files into one single document.",
              color: "rose"
            },
            {
              href: "/unlock-pdf",
              icon: Unlock,
              title: "Unlock PDF",
              description: "Remove passwords from your PDF files securely.",
              color: "violet"
            },
            {
              href: "/protect-pdf",
              icon: Lock,
              title: "Protect PDF",
              description: "Add password protection to your PDF files.",
              color: "indigo"
            },
            {
              href: "/audio",
              icon: Music,
              title: "Video to Audio",
              description: "Extract high-quality audio from any video instantly.",
              color: "fuchsia"
            },
            {
              href: "/audio-trimmer",
              icon: Scissors,
              title: "Audio Trimmer",
              description: "Cut and trim audio files instantly.",
              color: "cyan"
            },
            {
              href: "/video-to-gif",
              icon: Film,
              title: "Video to GIF",
              description: "Convert any video into an animated looping GIF.",
              color: "blue"
            },
            {
              href: "/video-trimmer",
              icon: Scissors,
              title: "Video Trimmer",
              description: "Cut and trim video clips instantly without losing quality.",
              color: "rose"
            },
            {
              href: "/video-compressor",
              icon: Shrink,
              title: "Video Compressor",
              description: "Reduce video file size while maintaining quality.",
              color: "emerald"
            },
            {
              href: "/image-editor",
              icon: Sparkles,
              title: "Pro Image Editor",
              description: "Resize, crop, rotate, and edit images with ease.",
              color: "pink"
            },
            {
              href: "/photo",
              icon: ImageIcon,
              title: "Image Converter",
              description: "Convert images between PNG, JPG, WebP and more.",
              color: "amber"
            },
          ].map((tool, index) => {
            // Map colors to tailwind classes
            const colorClasses: Record<string, any> = {
              indigo: { gradient: "from-indigo-500/5 to-violet-500/5", bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-400" },
              emerald: { gradient: "from-emerald-500/5 to-teal-500/5", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
              rose: { gradient: "from-rose-500/5 to-orange-500/5", bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-400" },
              amber: { gradient: "from-amber-500/5 to-yellow-500/5", bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400" },
              blue: { gradient: "from-blue-500/5 to-cyan-500/5", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
              fuchsia: { gradient: "from-fuchsia-500/5 to-purple-500/5", bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30", text: "text-fuchsia-600 dark:text-fuchsia-400" },
              pink: { gradient: "from-pink-500/5 to-rose-500/5", bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-600 dark:text-pink-400" },
              cyan: { gradient: "from-cyan-500/5 to-teal-500/5", bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-600 dark:text-cyan-400" },
              violet: { gradient: "from-violet-500/5 to-purple-500/5", bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-400" },
            };
            const c = colorClasses[tool.color];

            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex"
              >
                <Link
                  href={tool.href} 
                  className="relative group flex flex-col w-full items-center text-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-white/40 dark:border-gray-700/50 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className={`relative z-10 mb-5 ${c.text} group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 ${c.bg} p-4 rounded-2xl`}>
                    <tool.icon className="h-10 w-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="relative z-10 text-lg font-bold text-gray-900 dark:text-white mb-2">{tool.title}</h3>
                  <p className="relative z-10 text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            { icon: Zap, value: 'Lightning Fast', label: 'Processing' },
            { icon: Shield, value: '100% Secure', label: 'Private & Safe' },
            { icon: Globe, value: 'Browser Based', label: 'No Install' },
            { icon: Smartphone, value: 'Forever Free', label: 'No Watermark' },
          ].map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/40 dark:border-gray-700/50 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-white/60 dark:bg-gray-700/60 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4">
                <stat.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
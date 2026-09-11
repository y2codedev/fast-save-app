'use client';

import TopText from '@/components/sections/TopText';
import { Link, usePathname } from '@/i18n/routing';
import { Archive, ArrowRight, Code, FileImage, FileText, Film, Image as ImageIcon, ImagePlus, Layers, Lock, Music, Scissors, Search, Shrink, Sparkles, Unlock, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useGetT } from '@/hooks/useGetT';

type ToolCategory = 'all' | 'pdf' | 'image' | 'media' | 'archive' | 'developer';

const categories: Array<{ id: ToolCategory; label: string }> = [
  { id: 'all', label: 'All Tools' },
  { id: 'pdf', label: 'PDF Tools' },
  { id: 'image', label: 'Image Tools' },
  { id: 'media', label: 'Video & Audio Tools' },
  { id: 'archive', label: 'Archive & ZIP Tools' },
  { id: 'developer', label: 'Dev Tools' },
];

const tools = [
  { href: '/image-compressor', icon: Zap, title: 'Compress Image', description: 'Reduce image file size while maintaining excellent quality', category: 'image', keywords: 'reduce shrink optimize jpg png webp' },
  { href: '/resize-image', icon: ImageIcon, title: 'Resize Image', description: 'Change image dimensions while preserving quality', category: 'image', keywords: 'dimensions scale width height photo' },
  { href: '/bg-remover', icon: Sparkles, title: 'Remove Background', description: 'Remove image backgrounds and download a transparent PNG', category: 'image', keywords: 'transparent png cutout erase' },
  { href: '/photo', icon: ImageIcon, title: 'Image Converter', description: 'Convert images between PNG, JPG, WebP and more', category: 'image', keywords: 'jpg jpeg png webp bmp tiff format' },
  { href: '/image-editor', icon: Sparkles, title: 'Pro Image Editor', description: 'Resize, crop, rotate, and edit images with ease', category: 'image', keywords: 'crop rotate filter photo' },
  { href: '/image-to-pdf', icon: FileImage, title: 'Image to PDF', description: 'Convert multiple images into a single PDF document easily', category: 'pdf', keywords: 'jpg png photos document' },
  { href: '/merge-pdf', icon: Layers, title: 'Merge PDF', description: 'Combine multiple PDF files into one document', category: 'pdf', keywords: 'join combine document' },
  { href: '/split-pdf', icon: Scissors, title: 'Split PDF', description: 'Extract pages or split a PDF into separate files', category: 'pdf', keywords: 'extract pages divide document' },
  { href: '/pdf-to-jpg', icon: ImagePlus, title: 'PDF to JPG', description: 'Convert PDF pages into high-quality JPG images', category: 'pdf', keywords: 'extract image document jpeg' },
  { href: '/pdf-to-docx', icon: FileText, title: 'PDF to Word', description: 'Convert PDF documents to editable Word files', category: 'pdf', keywords: 'doc docx document' },
  { href: '/word-to-pdf', icon: FileText, title: 'Word to PDF', description: 'Convert Word documents into PDF files in your browser', category: 'pdf', keywords: 'doc docx document' },
  { href: '/md-converter', icon: FileText, title: 'MD to PDF & Word', description: 'Convert Markdown files to PDF or DOCX', category: 'pdf', keywords: 'markdown md docx document' },
  { href: '/protect-pdf', icon: Lock, title: 'Protect PDF', description: 'Add password protection to PDF files', category: 'pdf', keywords: 'encrypt password secure' },
  { href: '/unlock-pdf', icon: Unlock, title: 'Unlock PDF', description: 'Remove a known password from a PDF file', category: 'pdf', keywords: 'decrypt password' },
  { href: '/video-compressor', icon: Shrink, title: 'Video Compressor', description: 'Reduce video file size while maintaining quality', category: 'media', keywords: 'mp4 reduce shrink optimize' },
  { href: '/video-trimmer', icon: Scissors, title: 'Video Trimmer', description: 'Cut and trim video clips in your browser', category: 'media', keywords: 'cut mp4 clip' },
  { href: '/video-to-gif', icon: Film, title: 'Video to GIF', description: 'Convert a video clip into an animated GIF', category: 'media', keywords: 'animation mp4' },
  { href: '/audio', icon: Music, title: 'Video to Audio', description: 'Extract audio from a video file', category: 'media', keywords: 'mp3 extract sound' },
  { href: '/audio-trimmer', icon: Scissors, title: 'Audio Trimmer', description: 'Cut and trim audio files in your browser', category: 'media', keywords: 'mp3 sound clip' },
  { href: '/archive-tools', icon: Archive, title: 'Archive Tools', description: 'Create, extract, convert, and manage ZIP archives', category: 'archive', keywords: 'zip rar 7z tar gzip unzip compress' },
  { href: '/data-formatter', icon: Code, title: 'Data Formatter', description: 'Format and convert JSON, XML, YAML, and CSV', category: 'developer', keywords: 'validate developer code' },
] as const;

export default function HeroSection({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const t = useTranslations('Hero');
  const getT = useGetT();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ToolCategory>('all');

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = category === 'all' || tool.category === category;
      const searchableText = `${tool.title} ${tool.description} ${tool.keywords}`.toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [category, query]);

  const displayedTools = isHome ? filteredTools : tools;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent dark:from-indigo-900/20 -z-10 pointer-events-none" />
      <div className="relative py-6 md:py-10">
        <div className="mt-2 mb-3"><TopText /></div>
        {children && <div className="mx-auto max-w-4xl mt-6 relative z-20">{children}</div>}
      </div>

      <section className="relative w-full pb-10 pt-2" aria-labelledby="tool-grid-title">
        {isHome ? (
          <div className="mb-7 space-y-4">
            <div className="mx-auto max-w-3xl">
              <label htmlFor="tool-search" className="sr-only">Search tools</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <input id="tool-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools (e.g. resize image, merge PDF, video compressor)…" className="min-h-12 w-full rounded-2xl border border-gray-300 bg-white px-12 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white" />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2" aria-label="Tool categories">
              {categories.map((item) => (
                <button key={item.id} type="button" onClick={() => setCategory(item.id)} aria-pressed={category === item.id} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition ${category === item.id ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm' : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-400 hover:text-indigo-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200'}`}>
                  {getT(item.label)}
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400" aria-live="polite">{filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found</p>
          </div>
        ) : (
          <div className="text-center mb-6">
            <h2 id="tool-grid-title" className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{t('Explore more free tools')}</h2>
            <p className="text-base text-gray-500 dark:text-gray-400">{t('Explore subtitle')}</p>
          </div>
        )}

        {isHome && <h2 id="tool-grid-title" className="sr-only">Available tools</h2>}
        {displayedTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {displayedTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group flex min-h-56 flex-col rounded-2xl border border-gray-200 bg-white/90 p-5 text-left shadow-sm transition hover:border-indigo-500/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 dark:border-gray-800 dark:bg-gray-900/80">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300"><tool.icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" /></div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{getT(tool.title)}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{getT(tool.description)}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Use tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900/60">
            <p className="font-semibold text-gray-900 dark:text-white">No tools match your search.</p>
            <button type="button" onClick={() => { setQuery(''); setCategory('all'); }} className="mt-3 min-h-11 rounded-xl px-4 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/40">Clear filters</button>
          </div>
        )}
      </section>
    </div>
  );
}

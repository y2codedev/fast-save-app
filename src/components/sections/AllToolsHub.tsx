'use client';

import React, { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { Search, Sparkles, Filter, CheckCircle2, ShieldCheck, ArrowRight, Layers, FileText, Image as ImageIcon, Video, Archive, FileCode } from 'lucide-react';

interface ToolItem {
  name: string;
  path: string;
  category: 'pdf' | 'image' | 'video' | 'archive' | 'general';
  categoryLabel: string;
  task: 'convert' | 'compress' | 'edit' | 'merge' | 'extract' | 'protect';
  taskLabel: string;
  desc: string;
  isPopular?: boolean;
  isNew?: boolean;
  processingType: 'local' | 'hybrid';
}

const TOOLS_DATABASE: ToolItem[] = [
  // PDF Tools
  {
    name: 'Merge PDF',
    path: '/merge-pdf',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    task: 'merge',
    taskLabel: 'Merge',
    desc: 'Combine multiple PDF files into one single document in any custom order.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'Split PDF',
    path: '/split-pdf',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    task: 'extract',
    taskLabel: 'Extract',
    desc: 'Extract specific page ranges or save all pages as separate PDF files.',
    isNew: true,
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'PDF to JPG',
    path: '/pdf-to-jpg',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Extract pages from PDF documents into high-resolution JPG images.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'Image to PDF',
    path: '/image-to-pdf',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Convert JPG, PNG, and WebP images into a single multi-page PDF document.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'PDF to Word',
    path: '/pdf-to-docx',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Convert text-based PDF documents into editable Microsoft Word (.docx) files.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'Word to PDF',
    path: '/word-to-pdf',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Convert Microsoft Word (.docx) documents into clean PDF documents.',
    processingType: 'local',
  },
  {
    name: 'Protect PDF',
    path: '/protect-pdf',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    task: 'protect',
    taskLabel: 'Protect',
    desc: 'Add strong password protection and encryption to sensitive PDF documents.',
    processingType: 'local',
  },
  {
    name: 'Unlock PDF',
    path: '/unlock-pdf',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    task: 'protect',
    taskLabel: 'Protect',
    desc: 'Decrypt and remove password security from protected PDF files.',
    processingType: 'local',
  },
  {
    name: 'Markdown to PDF',
    path: '/md-converter',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Render GitHub-flavored Markdown text into styled PDF documents.',
    processingType: 'local',
  },
  {
    name: 'PDF to HTML',
    path: '/pdf-to-html',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Convert PDF document pages into structured HTML web markup.',
    processingType: 'local',
  },
  {
    name: 'Word to HTML',
    path: '/word-to-html',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Transform Word documents into clean, semantic HTML code.',
    processingType: 'local',
  },

  // Image Tools
  {
    name: 'Image Compressor',
    path: '/image-compressor',
    category: 'image',
    categoryLabel: 'Image Tools',
    task: 'compress',
    taskLabel: 'Compress',
    desc: 'Significantly reduce JPG, PNG, and WebP image file sizes with custom quality control.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'Resize Image',
    path: '/resize-image',
    category: 'image',
    categoryLabel: 'Image Tools',
    task: 'edit',
    taskLabel: 'Edit',
    desc: 'Change image dimensions in pixels or percentage while locking aspect ratio.',
    isNew: true,
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'Remove Background',
    path: '/bg-remover',
    category: 'image',
    categoryLabel: 'Image Tools',
    task: 'edit',
    taskLabel: 'Edit',
    desc: 'AI-powered background removal running locally in your browser for transparent PNGs.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'Pro Image Editor',
    path: '/image-editor',
    category: 'image',
    categoryLabel: 'Image Tools',
    task: 'edit',
    taskLabel: 'Edit',
    desc: 'Crop, resize, rotate, and adjust brightness, contrast, and color balance.',
    processingType: 'local',
  },
  {
    name: 'Image Converter',
    path: '/photo',
    category: 'image',
    categoryLabel: 'Image Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Batch convert between JPG, PNG, WebP, GIF, and BMP image formats.',
    isPopular: true,
    processingType: 'local',
  },
  // Video & Audio Tools
  {
    name: 'Video Compressor',
    path: '/video-compressor',
    category: 'video',
    categoryLabel: 'Video & Audio',
    task: 'compress',
    taskLabel: 'Compress',
    desc: 'Reduce video file size with smart CRF encoding powered by FFmpeg WebAssembly.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'Video Trimmer',
    path: '/video-trimmer',
    category: 'video',
    categoryLabel: 'Video & Audio',
    task: 'edit',
    taskLabel: 'Edit',
    desc: 'Cut and trim video clips in your browser without re-encoding quality loss.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'Video to MP3 / Audio Converter',
    path: '/audio',
    category: 'video',
    categoryLabel: 'Video & Audio',
    task: 'extract',
    taskLabel: 'Extract',
    desc: 'Extract high-bitrate MP3 or WAV audio tracks from any video file.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'Audio Trimmer',
    path: '/audio-trimmer',
    category: 'video',
    categoryLabel: 'Video & Audio',
    task: 'edit',
    taskLabel: 'Edit',
    desc: 'Trim audio files, create ringtones, and cut music clips with interactive waveforms.',
    processingType: 'local',
  },
  {
    name: 'Video to GIF',
    path: '/video-to-gif',
    category: 'video',
    categoryLabel: 'Video & Audio',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Convert any video clip into a looping, animated GIF file.',
    processingType: 'local',
  },
  {
    name: 'Instagram Downloader',
    path: '/ig-downloader',
    category: 'video',
    categoryLabel: 'Social Downloader',
    task: 'extract',
    taskLabel: 'Extract',
    desc: 'Download public Instagram Reels and Stories for personal offline reference.',
    processingType: 'hybrid',
  },

  // Archive & ZIP Tools
  {
    name: 'Create ZIP',
    path: '/create-zip',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'compress',
    taskLabel: 'Compress',
    desc: 'Bundle and compress multiple files into a standard ZIP archive.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'Unzip ZIP',
    path: '/unzip-zip',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'extract',
    taskLabel: 'Extract',
    desc: 'Open and extract files from ZIP archives directly in your browser.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: 'Merge ZIP',
    path: '/merge-zip',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'merge',
    taskLabel: 'Merge',
    desc: 'Combine multiple ZIP archives into one unified archive.',
    processingType: 'local',
  },
  {
    name: 'Split ZIP',
    path: '/split-zip',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'extract',
    taskLabel: 'Extract',
    desc: 'Split large ZIP archives into smaller, manageable chunks.',
    processingType: 'local',
  },
  {
    name: 'Protect ZIP',
    path: '/protect-zip',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'protect',
    taskLabel: 'Protect',
    desc: 'Encrypt and password-protect your ZIP files locally.',
    processingType: 'local',
  },
  {
    name: 'Unlock ZIP',
    path: '/unlock-zip-file',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'protect',
    taskLabel: 'Protect',
    desc: 'Remove password protection from encrypted ZIP archives.',
    processingType: 'local',
  },
  {
    name: 'View ZIP',
    path: '/view-zip',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'extract',
    taskLabel: 'Extract',
    desc: 'Inspect file contents inside any ZIP archive without extracting them.',
    processingType: 'local',
  },
  {
    name: 'Edit ZIP',
    path: '/edit-zip',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'edit',
    taskLabel: 'Edit',
    desc: 'Add, delete, or rename files directly inside an existing ZIP archive.',
    processingType: 'local',
  },
  {
    name: 'RAR to ZIP',
    path: '/rar-to-zip',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Convert RAR compressed archives into standard, universally supported ZIP format.',
    isPopular: true,
    processingType: 'local',
  },
  {
    name: '7Z to ZIP',
    path: '/7z-to-zip',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Convert 7-Zip (.7z) archives into standard ZIP files directly in your browser.',
    processingType: 'local',
  },
  {
    name: 'TAR to ZIP',
    path: '/tar-to-zip',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Convert Linux / Unix TAR archive tarballs into standard ZIP archives.',
    processingType: 'local',
  },
  {
    name: 'TAR.GZ to ZIP',
    path: '/tar-gz-to-zip',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Convert compressed .tar.gz and .tgz packages into ZIP format.',
    processingType: 'local',
  },
  {
    name: 'ZIP to 7Z',
    path: '/zip-to-7z',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Convert standard ZIP files into high-compression 7-Zip (.7z) format.',
    processingType: 'local',
  },
  {
    name: 'ZIP to TAR.GZ',
    path: '/zip-to-tar-gz',
    category: 'archive',
    categoryLabel: 'Archive Tools',
    task: 'convert',
    taskLabel: 'Convert',
    desc: 'Convert ZIP files into Unix-standard .tar.gz compressed tarballs.',
    processingType: 'local',
  },
];

const TASKS = [
  { id: 'all', label: 'All Tasks' },
  { id: 'convert', label: 'Convert' },
  { id: 'compress', label: 'Compress' },
  { id: 'edit', label: 'Edit' },
  { id: 'merge', label: 'Merge' },
  { id: 'extract', label: 'Extract' },
  { id: 'protect', label: 'Protect' },
] as const;

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'pdf', label: 'PDF Tools', path: '/pdf-tools' },
  { id: 'image', label: 'Image Tools', path: '/image-tools' },
  { id: 'video', label: 'Video & Audio', path: '/video-tools' },
  { id: 'archive', label: 'Archive Tools', path: '/archive-tools' },
] as const;

export default function AllToolsHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterSpecial, setFilterSpecial] = useState<'all' | 'popular' | 'new'>('all');

  const filteredTools = useMemo(() => {
    return TOOLS_DATABASE.filter((tool) => {
      // Search text match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesDesc = tool.desc.toLowerCase().includes(q);
        const matchesCategory = tool.categoryLabel.toLowerCase().includes(q);
        const matchesTask = tool.taskLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesTask) {
          return false;
        }
      }

      // Task match
      if (selectedTask !== 'all' && tool.task !== selectedTask) {
        return false;
      }

      // Category match
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // Special badge match
      if (filterSpecial === 'popular' && !tool.isPopular) return false;
      if (filterSpecial === 'new' && !tool.isNew) return false;

      return true;
    });
  }, [searchQuery, selectedTask, selectedCategory, filterSpecial]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search & Filter Controls */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200/80 dark:border-gray-700/80 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools by name, format, or task (e.g. compress, pdf, mp3, zip, resize)..."
            className="w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
        </div>

        {/* Browse by Task Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Browse by Task:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterSpecial(filterSpecial === 'popular' ? 'all' : 'popular')}
                className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors ${
                  filterSpecial === 'popular'
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100'
                }`}
              >
                ★ Popular Tools
              </button>
              <button
                onClick={() => setFilterSpecial(filterSpecial === 'new' ? 'all' : 'new')}
                className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors ${
                  filterSpecial === 'new'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                }`}
              >
                ● New Tools
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {TASKS.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTask(t.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedTask === t.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700/60">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Filter by Category:
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Available Online Tools ({filteredTools.length})
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            All tools run client-side in your browser for absolute confidentiality.
          </p>
        </div>

        {/* Category hub shortcuts */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/pdf-tools"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:underline"
          >
            PDF Hub →
          </Link>
          <Link
            href="/image-tools"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:underline"
          >
            Image Hub →
          </Link>
          <Link
            href="/video-tools"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:underline"
          >
            Video Hub →
          </Link>
          <Link
            href="/archive-tools"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 hover:underline"
          >
            Archive Hub →
          </Link>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredTools.map((tool) => (
            <Link
              key={tool.path}
              href={tool.path}
              className="group relative bg-white dark:bg-gray-800/80 p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-700/70 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.name}
                  </h3>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {tool.isPopular && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                        Popular
                      </span>
                    )}
                    {tool.isNew && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                        New
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-medium">
                  <span>{tool.categoryLabel}</span>
                  <span>•</span>
                  <span>{tool.taskLabel}</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 space-y-4">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            No tools matched &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Try clearing your search or task filter to browse all available conversion utilities.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTask('all');
              setSelectedCategory('all');
              setFilterSpecial('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

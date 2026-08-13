import { locales, defaultLocale } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://convertallnow.com';

/**
 * OG locale mapping (ISO 639-1 → OpenGraph locale format)
 */
const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  zh: 'zh_CN',
  pt: 'pt_BR',
  id: 'id_ID',
  ru: 'ru_RU',
  de: 'de_DE',
  tr: 'tr_TR',
  ar: 'ar_SA',
};

/**
 * Returns the correct canonical URL for a given locale and path.
 * Default locale ('en') uses no prefix: https://convertallnow.com/merge-pdf
 * Other locales use prefix: https://convertallnow.com/es/merge-pdf
 */
export function getCanonicalUrl(locale: string, path: string = ''): string {
  const cleanPath = (path === '' || path === '/') ? '' : (path.startsWith('/') ? path : `/${path}`);
  if (locale === defaultLocale) {
    return `${SITE_URL}${cleanPath}`;
  }
  return `${SITE_URL}/${locale}${cleanPath}`;
}

/**
 * Returns hreflang alternate links for all locales.
 * Used in metadata `alternates.languages`.
 */
export function getAlternateLanguages(path: string = ''): Record<string, string> {
  const cleanPath = (path === '' || path === '/') ? '' : (path.startsWith('/') ? path : `/${path}`);
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    if (locale === defaultLocale) {
      languages[locale] = `${SITE_URL}${cleanPath}`;
    } else {
      languages[locale] = `${SITE_URL}/${locale}${cleanPath}`;
    }
  }

  // x-default points to the default locale version
  languages['x-default'] = `${SITE_URL}${cleanPath}`;

  return languages;
}

/**
 * Converts locale code to OpenGraph locale format.
 */
export function getOgLocale(locale: string): string {
  return OG_LOCALE_MAP[locale] || 'en_US';
}

/**
 * Returns the site URL constant.
 */
export function getSiteUrl(): string {
  return SITE_URL;
}

/**
 * Per-tool keyword research data.
 * Each tool has primary + secondary + long-tail keywords.
 */
export const TOOL_KEYWORDS: Record<string, string[]> = {
  'merge-pdf': [
    'merge pdf online free', 'combine pdf files', 'join pdf', 'pdf merger',
    'merge pdf without signup', 'free pdf combiner', 'combine pdf no watermark',
    'merge multiple pdf files online', 'pdf joiner free', 'merge pdf documents',
  ],
  'image-to-pdf': [
    'image to pdf converter', 'jpg to pdf', 'png to pdf', 'convert image to pdf',
    'photo to pdf', 'picture to pdf converter free', 'multiple images to pdf',
    'image to pdf online free no watermark', 'convert photos to pdf document',
  ],
  'pdf-to-jpg': [
    'pdf to jpg converter', 'pdf to image', 'convert pdf to jpg free',
    'pdf to png online', 'extract images from pdf', 'pdf to jpg high quality',
    'pdf to jpg converter free online no watermark', 'pdf page to image',
  ],
  'md-converter': [
    'markdown to pdf', 'md to pdf converter', 'markdown to word', 'md to docx',
    'convert markdown to pdf online', 'markdown editor online', 'md to pdf free',
    'markdown to pdf converter online free', 'browser markdown to pdf',
  ],
  'unlock-pdf': [
    'unlock pdf', 'remove pdf password', 'decrypt pdf online', 'pdf password remover',
    'unlock pdf free', 'remove pdf restriction', 'pdf unlocker online free',
    'remove password from pdf without software',
  ],
  'protect-pdf': [
    'protect pdf', 'add password to pdf', 'encrypt pdf online', 'pdf password protector',
    'password protect pdf free', 'secure pdf with password', 'pdf encryptor online',
    'add password to pdf online free',
  ],
  'pdf-to-docx': [
    'pdf to word', 'pdf to docx', 'convert pdf to word online', 'convert pdf to docx free',
    'pdf to word converter', 'editable word document from pdf', 'free pdf to word converter',
    'convert pdf to word without losing formatting',
  ],
  'video-compressor': [
    'compress video online', 'video compressor free', 'reduce video size',
    'compress video without losing quality', 'online video compressor',
    'compress video for whatsapp', 'reduce video file size online free',
  ],
  'video-to-gif': [
    'video to gif converter', 'convert video to gif', 'mp4 to gif',
    'video to gif online free', 'make gif from video', 'create gif from video',
    'video to animated gif converter online', 'video to gif no watermark',
  ],
  'video-trimmer': [
    'trim video online', 'cut video online free', 'video cutter',
    'video trimmer free', 'crop video online', 'trim video without losing quality',
    'online video trimmer no watermark', 'cut video clip online free',
  ],
  'audio': [
    'video to audio converter', 'video to mp3', 'extract audio from video',
    'convert video to audio online', 'mp4 to mp3 converter', 'video to mp3 free',
    'extract audio from video online free', 'convert video to mp3 no download',
  ],
  'audio-trimmer': [
    'trim audio online', 'audio cutter online', 'cut mp3 online',
    'audio trimmer free', 'trim mp3 file', 'online audio cutter free',
    'cut audio file online no download', 'trim audio online free',
  ],
  'bg-remover': [
    'remove background from image', 'background remover', 'bg remover',
    'remove background online free', 'background eraser', 'transparent background maker',
    'remove background from image free no watermark', 'ai background remover',
  ],
  'image-compressor': [
    'compress image online', 'image compressor', 'reduce image size',
    'compress jpg online', 'compress png online', 'image size reducer',
    'compress image without losing quality', 'reduce image file size online free',
  ],
  'image-editor': [
    'edit image online free', 'online image editor', 'photo editor free',
    'resize image online', 'crop image online', 'rotate image online',
    'free online photo editor no download', 'image editor no watermark',
  ],
  'photo': [
    'image converter online', 'convert png to jpg', 'convert jpg to png',
    'image format converter', 'webp to jpg converter', 'photo converter free',
    'convert image format online free', 'bulk image converter online',
  ],
  'ig-downloader': [
    'instagram reels downloader', 'download instagram reels', 'ig reels to mp4',
    'save instagram reels', 'instagram video downloader', 'download reels without watermark',
    'instagram reels downloader hd no watermark', 'save instagram reels to phone',
  ],
  'fb-video': [
    'facebook video downloader', 'download facebook videos', 'fb video download',
    'save facebook videos', 'fb hd video downloader', 'download facebook reels',
    'free facebook video downloader', 'facebook video saver online',
  ],
  'snapchat': [
    'snapchat video downloader', 'download snapchat videos', 'snapchat story saver',
    'save snap videos', 'hd snapchat downloader', 'download snaps without watermark',
    'free snapchat video download', 'snapchat downloader online',
  ],
  'create-zip': [
    'create zip file online', 'zip file creator', 'make zip file free',
    'online zip creator', 'create zip archive', 'compress files to zip online',
  ],
  'unzip-zip': [
    'unzip file online', 'extract zip file', 'unzip online free',
    'open zip file online', 'zip extractor', 'extract zip archive online free',
  ],
  'edit-zip': [
    'edit zip file online', 'modify zip archive', 'zip file editor',
    'add files to zip online', 'remove files from zip', 'edit zip contents online free',
  ],
  'merge-zip': [
    'merge zip files online', 'combine zip files', 'join zip archives',
    'merge multiple zip files', 'zip merger online free', 'combine zip archives online',
  ],
  'split-zip': [
    'split zip file online', 'divide zip archive', 'zip splitter',
    'split large zip file', 'break zip into parts', 'split zip file online free',
  ],
  'view-zip': [
    'view zip file online', 'zip file viewer', 'inspect zip contents',
    'open zip file without extracting', 'zip viewer online free', 'browse zip archive',
  ],
  'protect-zip': [
    'password protect zip file', 'encrypt zip file online', 'add password to zip',
    'zip password protector', 'secure zip file online free', 'protect zip archive',
  ],
  'unlock-zip-file': [
    'unlock zip file', 'remove zip password', 'zip password remover',
    'decrypt zip file online', 'unlock zip archive free', 'remove password from zip file',
  ],
  'rar-to-zip': [
    'rar to zip converter', 'convert rar to zip online', 'rar to zip free',
    'change rar to zip format', 'rar to zip online converter free', 'rar archive to zip',
  ],
  '7z-to-zip': [
    '7z to zip converter', 'convert 7z to zip online', '7z to zip free',
    'change 7z to zip format', '7z to zip online converter free', '7zip to zip',
  ],
  'tar-to-zip': [
    'tar to zip converter', 'convert tar to zip online', 'tar to zip free',
    'change tar to zip format', 'tar to zip online converter free', 'tar archive to zip',
  ],
  'tar-gz-to-zip': [
    'tar gz to zip converter', 'convert tar.gz to zip', 'tgz to zip online',
    'tar.gz to zip free', 'extract tar gz to zip', 'tar gz to zip online converter free',
  ],
  'tar-bz2-to-zip': [
    'tar bz2 to zip converter', 'convert tar.bz2 to zip', 'tbz2 to zip online',
    'tar.bz2 to zip free', 'extract tar bz2 to zip', 'tar bz2 to zip online converter free',
  ],
  'tar-xz-to-zip': [
    'tar xz to zip converter', 'convert tar.xz to zip', 'txz to zip online',
    'tar.xz to zip free', 'extract tar xz to zip', 'tar xz to zip online converter free',
  ],
  'gz-to-zip': [
    'gz to zip converter', 'convert gz to zip online', 'gzip to zip free',
    'change gz to zip format', 'gz to zip online converter free', 'gzip archive to zip',
  ],
  'bz2-to-zip': [
    'bz2 to zip converter', 'convert bz2 to zip online', 'bzip2 to zip free',
    'change bz2 to zip format', 'bz2 to zip online converter free', 'bzip2 archive to zip',
  ],
  'xz-to-zip': [
    'xz to zip converter', 'convert xz to zip online', 'xz to zip free',
    'change xz to zip format', 'xz to zip online converter free', 'xz archive to zip',
  ],
  'iso-to-zip': [
    'iso to zip converter', 'convert iso to zip online', 'iso to zip free',
    'extract iso to zip', 'iso to zip online converter free', 'iso image to zip archive',
  ],
  'zip-to-rar': [
    'zip to rar converter', 'convert zip to rar online', 'zip to rar free',
    'change zip to rar format', 'zip to rar online converter free',
  ],
  'zip-to-7z': [
    'zip to 7z converter', 'convert zip to 7z online', 'zip to 7zip free',
    'change zip to 7z format', 'zip to 7z online converter free',
  ],
  'zip-to-tar': [
    'zip to tar converter', 'convert zip to tar online', 'zip to tar free',
    'change zip to tar format', 'zip to tar online converter free',
  ],
  'zip-to-tar-gz': [
    'zip to tar gz converter', 'convert zip to tar.gz', 'zip to tgz online',
    'zip to tar.gz free', 'zip to tar gz online converter free',
  ],
  'zip-to-tar-bz2': [
    'zip to tar bz2 converter', 'convert zip to tar.bz2', 'zip to tbz2 online',
    'zip to tar.bz2 free', 'zip to tar bz2 online converter free',
  ],
  'zip-to-tar-xz': [
    'zip to tar xz converter', 'convert zip to tar.xz', 'zip to txz online',
    'zip to tar.xz free', 'zip to tar xz online converter free',
  ],
  'zip-to-gz': [
    'zip to gz converter', 'convert zip to gzip online', 'zip to gz free',
    'change zip to gz format', 'zip to gzip online converter free',
  ],
  'zip-to-bz2': [
    'zip to bz2 converter', 'convert zip to bzip2 online', 'zip to bz2 free',
    'change zip to bz2 format', 'zip to bzip2 online converter free',
  ],
  'zip-to-xz': [
    'zip to xz converter', 'convert zip to xz online', 'zip to xz free',
    'change zip to xz format', 'zip to xz online converter free',
  ],
  'zip-to-iso': [
    'zip to iso converter', 'convert zip to iso online', 'zip to iso free',
    'create iso from zip', 'zip to iso online converter free',
  ],
};

/**
 * Sitemap priority mapping by route type.
 */
export function getSitemapPriority(path: string): number {
  if (path === '' || path === '/') return 1.0;
  if (['/pdf-tools', '/image-tools', '/video-tools', '/archive-tools'].includes(path)) return 0.9;
  if (['/about', '/privacy', '/terms', '/contact', '/sitemap'].includes(path)) return 0.5;
  return 0.8; // Tool pages
}

/**
 * Per-tool related tools list (max 10). Used by RelatedTools component.
 * Curated by category proximity and user journey.
 */
export const RELATED_TOOLS: Record<string, { name: string; path: string; desc: string }[]> = {
  'merge-pdf': [
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract images from PDF' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF' },
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to editable Word' },
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word docs to PDF' },
    { name: 'Unlock PDF', path: '/unlock-pdf', desc: 'Remove PDF password' },
    { name: 'Protect PDF', path: '/protect-pdf', desc: 'Add password to PDF' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
    { name: 'Markdown to PDF', path: '/md-converter', desc: 'Markdown to PDF converter' },
  ],
  'pdf-to-jpg': [
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF' },
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Compress images online' },
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Unlock PDF', path: '/unlock-pdf', desc: 'Remove PDF password' },
    { name: 'Pro Image Editor', path: '/image-editor', desc: 'Edit and resize images' },
    { name: 'Remove Background', path: '/bg-remover', desc: 'AI background removal' },
    { name: 'Image Converter', path: '/photo', desc: 'Convert image formats' },
  ],
  'image-to-pdf': [
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract images from PDF' },
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image file size' },
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Pro Image Editor', path: '/image-editor', desc: 'Resize, crop images' },
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word to PDF' },
    { name: 'Protect PDF', path: '/protect-pdf', desc: 'Add password to PDF' },
    { name: 'Image Converter', path: '/photo', desc: 'Convert image formats' },
  ],
  'unlock-pdf': [
    { name: 'Protect PDF', path: '/protect-pdf', desc: 'Add password to PDF' },
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract images from PDF' },
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF' },
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word to PDF' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
    { name: 'Unlock ZIP', path: '/unlock-zip-file', desc: 'Remove ZIP password' },
  ],
  'protect-pdf': [
    { name: 'Unlock PDF', path: '/unlock-pdf', desc: 'Remove PDF password' },
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract images from PDF' },
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF' },
    { name: 'Protect ZIP', path: '/protect-zip', desc: 'Add password to ZIP' },
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word to PDF' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
  ],
  'pdf-to-docx': [
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs' },
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word to PDF' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract images from PDF' },
    { name: 'Word to HTML', path: '/word-to-html', desc: 'Convert Word to HTML' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
    { name: 'Unlock PDF', path: '/unlock-pdf', desc: 'Remove PDF password' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF' },
    { name: 'Markdown to PDF', path: '/md-converter', desc: 'Markdown to PDF' },
  ],
  'word-to-pdf': [
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs' },
    { name: 'Word to HTML', path: '/word-to-html', desc: 'Convert Word to HTML' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract images from PDF' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF' },
    { name: 'Protect PDF', path: '/protect-pdf', desc: 'Add password to PDF' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
    { name: 'Markdown to PDF', path: '/md-converter', desc: 'Markdown to PDF' },
  ],
  'image-compressor': [
    { name: 'Pro Image Editor', path: '/image-editor', desc: 'Resize, crop, edit images' },
    { name: 'Remove Background', path: '/bg-remover', desc: 'AI background removal' },
    { name: 'Image Converter', path: '/photo', desc: 'Convert between formats' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract images from PDF' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Reduce video file size' },
    { name: 'Image to SVG', path: '/image-to-svg', desc: 'Convert image to SVG' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Create GIFs from videos' },
  ],
  'image-editor': [
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image file size' },
    { name: 'Remove Background', path: '/bg-remover', desc: 'AI background removal' },
    { name: 'Image Converter', path: '/photo', desc: 'Convert image formats' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract images from PDF' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Create GIFs from videos' },
    { name: 'Image to SVG', path: '/image-to-svg', desc: 'Convert image to SVG' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Reduce video size' },
  ],
  'bg-remover': [
    { name: 'Pro Image Editor', path: '/image-editor', desc: 'Resize, crop, edit images' },
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image file size' },
    { name: 'Image Converter', path: '/photo', desc: 'Convert between formats' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Images to PDF' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract images from PDF' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Create GIFs from videos' },
    { name: 'Image to SVG', path: '/image-to-svg', desc: 'Convert image to SVG' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Reduce video size' },
  ],
  'photo': [
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image file size' },
    { name: 'Pro Image Editor', path: '/image-editor', desc: 'Resize and crop images' },
    { name: 'Remove Background', path: '/bg-remover', desc: 'AI background removal' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract images from PDF' },
    { name: 'Image to SVG', path: '/image-to-svg', desc: 'Convert image to SVG' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Create GIFs from videos' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Reduce video size' },
  ],
  'video-compressor': [
    { name: 'Video Trimmer', path: '/video-trimmer', desc: 'Cut and trim videos' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Create GIFs from video' },
    { name: 'Audio Converter', path: '/audio', desc: 'Extract audio from video' },
    { name: 'Audio Trimmer', path: '/audio-trimmer', desc: 'Cut audio files' },
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image size' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Convert video to GIF' },
    { name: 'IG Downloader', path: '/ig-downloader', desc: 'Download Instagram videos' },
    { name: 'Create ZIP', path: '/create-zip', desc: 'Compress files to ZIP' },
  ],
  'video-trimmer': [
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Reduce video file size' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Create GIFs from video' },
    { name: 'Audio Converter', path: '/audio', desc: 'Extract audio from video' },
    { name: 'Audio Trimmer', path: '/audio-trimmer', desc: 'Cut audio files' },
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image size' },
    { name: 'IG Downloader', path: '/ig-downloader', desc: 'Download Instagram videos' },
    { name: 'Remove Background', path: '/bg-remover', desc: 'AI background removal' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Convert video to GIF' },
  ],
  'video-to-gif': [
    { name: 'Video Trimmer', path: '/video-trimmer', desc: 'Cut and trim videos' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Reduce video size' },
    { name: 'Audio Converter', path: '/audio', desc: 'Extract audio from video' },
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image size' },
    { name: 'Pro Image Editor', path: '/image-editor', desc: 'Edit images online' },
    { name: 'Audio Trimmer', path: '/audio-trimmer', desc: 'Cut audio files' },
    { name: 'Remove Background', path: '/bg-remover', desc: 'AI background removal' },
    { name: 'IG Downloader', path: '/ig-downloader', desc: 'Download Instagram videos' },
  ],
  'audio': [
    { name: 'Audio Trimmer', path: '/audio-trimmer', desc: 'Cut audio files' },
    { name: 'Video Trimmer', path: '/video-trimmer', desc: 'Cut and trim videos' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Reduce video size' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Create GIFs from video' },
    { name: 'IG Downloader', path: '/ig-downloader', desc: 'Download Instagram reels' },
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image size' },
    { name: 'Create ZIP', path: '/create-zip', desc: 'Compress files to ZIP' },
    { name: 'Data Formatter', path: '/data-formatter', desc: 'Format JSON, XML, YAML' },
  ],
  'audio-trimmer': [
    { name: 'Audio Converter', path: '/audio', desc: 'Extract audio from video' },
    { name: 'Video Trimmer', path: '/video-trimmer', desc: 'Cut and trim videos' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Reduce video size' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Create GIFs from video' },
    { name: 'IG Downloader', path: '/ig-downloader', desc: 'Download Instagram reels' },
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image size' },
    { name: 'Create ZIP', path: '/create-zip', desc: 'Compress files to ZIP' },
    { name: 'Remove Background', path: '/bg-remover', desc: 'AI background removal' },
  ],
  'create-zip': [
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'Edit ZIP', path: '/edit-zip', desc: 'Modify ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP into parts' },
    { name: 'Protect ZIP', path: '/protect-zip', desc: 'Add password to ZIP' },
    { name: 'RAR to ZIP', path: '/rar-to-zip', desc: 'Convert RAR to ZIP' },
    { name: '7Z to ZIP', path: '/7z-to-zip', desc: 'Convert 7Z to ZIP' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
  ],
  'unzip-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create new ZIP archive' },
    { name: 'Edit ZIP', path: '/edit-zip', desc: 'Modify ZIP contents' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP into parts' },
    { name: 'Protect ZIP', path: '/protect-zip', desc: 'Add password to ZIP' },
    { name: 'Unlock ZIP', path: '/unlock-zip-file', desc: 'Remove ZIP password' },
    { name: 'RAR to ZIP', path: '/rar-to-zip', desc: 'Convert RAR to ZIP' },
  ],
  'ig-downloader': [
    { name: 'Video Trimmer', path: '/video-trimmer', desc: 'Cut and trim videos' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Reduce video size' },
    { name: 'Audio Converter', path: '/audio', desc: 'Extract audio from video' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Convert video to GIF' },
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image size' },
    { name: 'Remove Background', path: '/bg-remover', desc: 'AI background removal' },
    { name: 'Audio Trimmer', path: '/audio-trimmer', desc: 'Cut audio files' },
    { name: 'Create ZIP', path: '/create-zip', desc: 'Compress files to ZIP' },
  ],
  'md-converter': [
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs' },
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word to PDF' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Images to PDF' },
  ],

  'word-to-html': [
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word to PDF' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Markdown to PDF', path: '/md-converter', desc: 'Markdown to PDF' },
  ],
  'pdf-to-html': [
    { name: 'Word to HTML', path: '/word-to-html', desc: 'Convert Word to HTML' },
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word to PDF' },
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs' },
  ],
  'data-formatter': [
    { name: 'Markdown to PDF', path: '/md-converter', desc: 'Markdown to PDF' },
    { name: 'Word to HTML', path: '/word-to-html', desc: 'Convert Word to HTML' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
  ],
  'image-to-svg': [
    { name: 'Image Converter', path: '/photo', desc: 'Convert image formats' },
    { name: 'Remove Background', path: '/bg-remover', desc: 'AI background removal' },
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image size' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF' },
  ],
  'fb-video': [
    { name: 'IG Downloader', path: '/ig-downloader', desc: 'Download Instagram videos' },
    { name: 'Snapchat Downloader', path: '/snapchat', desc: 'Download Snapchat videos' },
    { name: 'Video Trimmer', path: '/video-trimmer', desc: 'Cut and trim videos' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Compress videos' },
  ],
  'snapchat': [
    { name: 'IG Downloader', path: '/ig-downloader', desc: 'Download Instagram videos' },
    { name: 'FB Video Downloader', path: '/fb-video', desc: 'Download Facebook videos' },
    { name: 'Video Trimmer', path: '/video-trimmer', desc: 'Cut and trim videos' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Compress videos' },
  ],
  'edit-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],
  'merge-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Edit ZIP', path: '/edit-zip', desc: 'Modify ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
  ],
  'split-zip': [
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'Edit ZIP', path: '/edit-zip', desc: 'Modify ZIP contents' },
  ],
  'view-zip': [
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'Edit ZIP', path: '/edit-zip', desc: 'Modify ZIP contents' },
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Protect ZIP', path: '/protect-zip', desc: 'Add password to ZIP' },
  ],
  'protect-zip': [
    { name: 'Unlock ZIP', path: '/unlock-zip-file', desc: 'Remove ZIP password' },
    { name: 'Protect PDF', path: '/protect-pdf', desc: 'Add password to PDF' },
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
  ],
  'unlock-zip-file': [
    { name: 'Protect ZIP', path: '/protect-zip', desc: 'Add password to ZIP' },
    { name: 'Unlock PDF', path: '/unlock-pdf', desc: 'Remove PDF password' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
  ],
  'rar-to-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
  ],
  'zip-to-rar': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],
  '7z-to-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
  ],
  'zip-to-7z': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],
  'tar-to-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
  ],
  'zip-to-tar': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],
  'tar-gz-to-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
  ],
  'zip-to-tar-gz': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],
  'tar-bz2-to-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
  ],
  'zip-to-tar-bz2': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],
  'tar-xz-to-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
  ],
  'zip-to-tar-xz': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],
  'gz-to-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
  ],
  'zip-to-gz': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],
  'bz2-to-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
  ],
  'zip-to-bz2': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],
  'xz-to-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
  ],
  'zip-to-xz': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],
  'iso-to-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
  ],
  'zip-to-iso': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],
};

/**
 * Maps each tool path to its category hub page.
 */
export const TOOL_CATEGORY_MAP: Record<string, { name: string; path: string }> = {
  '/merge-pdf': { name: 'PDF Tools', path: '/pdf-tools' },
  '/pdf-to-jpg': { name: 'PDF Tools', path: '/pdf-tools' },
  '/image-to-pdf': { name: 'PDF Tools', path: '/pdf-tools' },
  '/unlock-pdf': { name: 'PDF Tools', path: '/pdf-tools' },
  '/protect-pdf': { name: 'PDF Tools', path: '/pdf-tools' },
  '/pdf-to-docx': { name: 'PDF Tools', path: '/pdf-tools' },
  '/word-to-pdf': { name: 'PDF Tools', path: '/pdf-tools' },
  '/word-to-html': { name: 'PDF Tools', path: '/pdf-tools' },
  '/pdf-to-html': { name: 'PDF Tools', path: '/pdf-tools' },
  '/md-converter': { name: 'PDF Tools', path: '/pdf-tools' },
  '/image-compressor': { name: 'Image Tools', path: '/image-tools' },
  '/image-editor': { name: 'Image Tools', path: '/image-tools' },
  '/bg-remover': { name: 'Image Tools', path: '/image-tools' },
  '/photo': { name: 'Image Tools', path: '/image-tools' },
  '/image-to-svg': { name: 'Image Tools', path: '/image-tools' },
  '/video-compressor': { name: 'Video & Audio Tools', path: '/video-tools' },
  '/video-trimmer': { name: 'Video & Audio Tools', path: '/video-tools' },
  '/video-to-gif': { name: 'Video & Audio Tools', path: '/video-tools' },
  '/audio': { name: 'Video & Audio Tools', path: '/video-tools' },
  '/audio-trimmer': { name: 'Video & Audio Tools', path: '/video-tools' },
  '/ig-downloader': { name: 'Video & Audio Tools', path: '/video-tools' },
  '/create-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/unzip-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/edit-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/merge-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/split-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/view-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/protect-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/unlock-zip-file': { name: 'Archive Tools', path: '/archive-tools' },
  '/rar-to-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/7z-to-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/tar-to-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/tar-gz-to-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/tar-bz2-to-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/tar-xz-to-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/gz-to-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/bz2-to-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/xz-to-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/iso-to-zip': { name: 'Archive Tools', path: '/archive-tools' },
  '/zip-to-rar': { name: 'Archive Tools', path: '/archive-tools' },
  '/zip-to-7z': { name: 'Archive Tools', path: '/archive-tools' },
  '/zip-to-tar': { name: 'Archive Tools', path: '/archive-tools' },
  '/zip-to-tar-gz': { name: 'Archive Tools', path: '/archive-tools' },
  '/zip-to-tar-bz2': { name: 'Archive Tools', path: '/archive-tools' },
  '/zip-to-tar-xz': { name: 'Archive Tools', path: '/archive-tools' },
  '/zip-to-gz': { name: 'Archive Tools', path: '/archive-tools' },
  '/zip-to-bz2': { name: 'Archive Tools', path: '/archive-tools' },
  '/zip-to-xz': { name: 'Archive Tools', path: '/archive-tools' },
  '/zip-to-iso': { name: 'Archive Tools', path: '/archive-tools' },
};

/**
 * All tools grouped by category (used on category hub pages).
 */
export const CATEGORY_TOOLS: Record<string, { name: string; path: string; desc: string }[]> = {
  pdf: [
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDF files into one document online for free' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract and convert PDF pages to high-quality JPG images' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert JPG, PNG, and other images to a PDF document' },
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF files to editable Microsoft Word documents' },
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word DOCX files to PDF with perfect formatting' },
    { name: 'Word to HTML', path: '/word-to-html', desc: 'Convert Word documents to clean HTML markup' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF files to HTML web pages' },
    { name: 'Unlock PDF', path: '/unlock-pdf', desc: 'Remove password and restrictions from protected PDFs' },
    { name: 'Protect PDF', path: '/protect-pdf', desc: 'Add password protection and encrypt PDF files' },
    { name: 'Markdown to PDF', path: '/md-converter', desc: 'Convert Markdown files to PDF documents online' },
  ],
  image: [
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Compress JPG, PNG, WebP images without losing quality' },
    { name: 'Pro Image Editor', path: '/image-editor', desc: 'Resize, crop, rotate, and edit images in your browser' },
    { name: 'Remove Background', path: '/bg-remover', desc: 'AI-powered background removal for any image' },
    { name: 'Image Converter', path: '/photo', desc: 'Convert between JPG, PNG, WebP, GIF, and more formats' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF documents online' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract images from PDF pages' },
  ],
  video: [
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Compress MP4, WebM, and MOV videos in your browser' },
    { name: 'Video Trimmer', path: '/video-trimmer', desc: 'Cut and trim video clips online without re-encoding' },
    { name: 'Video to GIF', path: '/video-to-gif', desc: 'Convert any video clip to an animated GIF' },
    { name: 'Audio Converter', path: '/audio', desc: 'Extract audio from video and convert to MP3, WAV, and more' },
    { name: 'Audio Trimmer', path: '/audio-trimmer', desc: 'Cut and trim audio files online for free' },
    { name: 'IG Downloader', path: '/ig-downloader', desc: 'Download Instagram Reels, Stories, and photos' },
  ],
  archive: [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives from multiple files online' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP file contents in your browser' },
    { name: 'Edit ZIP', path: '/edit-zip', desc: 'Add, remove, or rename files inside a ZIP archive' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine multiple ZIP files into one archive' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split large ZIP archives into smaller parts' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect and browse ZIP file contents without extracting' },
    { name: 'Protect ZIP', path: '/protect-zip', desc: 'Add password protection to ZIP archives' },
    { name: 'Unlock ZIP', path: '/unlock-zip-file', desc: 'Remove password protection from ZIP files' },
    { name: 'RAR to ZIP', path: '/rar-to-zip', desc: 'Convert RAR archives to ZIP format' },
    { name: '7Z to ZIP', path: '/7z-to-zip', desc: 'Convert 7-Zip archives to ZIP format' },
    { name: 'TAR to ZIP', path: '/tar-to-zip', desc: 'Convert TAR archives to ZIP format' },
    { name: 'TAR.GZ to ZIP', path: '/tar-gz-to-zip', desc: 'Convert TAR.GZ archives to ZIP' },
    { name: 'GZ to ZIP', path: '/gz-to-zip', desc: 'Convert GZ files to ZIP format' },
    { name: 'ZIP to RAR', path: '/zip-to-rar', desc: 'Convert ZIP archives to RAR format' },
    { name: 'ZIP to 7Z', path: '/zip-to-7z', desc: 'Convert ZIP archives to 7-Zip format' },
    { name: 'ZIP to TAR.GZ', path: '/zip-to-tar-gz', desc: 'Convert ZIP to TAR.GZ format' },
  ],
};


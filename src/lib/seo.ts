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
  'protect-pdf': [
    'protect pdf', 'add password to pdf', 'encrypt pdf online', 'pdf password protector',
    'password protect pdf free', 'secure pdf with password', 'pdf encryptor online',
    'add password to pdf online free',
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
  if (['/about', '/privacy', '/terms', '/contact'].includes(path)) return 0.5;
  return 0.8; // Tool pages
}

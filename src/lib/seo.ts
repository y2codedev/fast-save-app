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
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) {
    return `${SITE_URL}${cleanPath || '/'}`;
  }
  return `${SITE_URL}/${locale}${cleanPath || '/'}`;
}

/**
 * Returns hreflang alternate links for all locales.
 * Used in metadata `alternates.languages`.
 */
export function getAlternateLanguages(path: string = ''): Record<string, string> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    if (locale === defaultLocale) {
      languages[locale] = `${SITE_URL}${cleanPath || '/'}`;
    } else {
      languages[locale] = `${SITE_URL}/${locale}${cleanPath || '/'}`;
    }
  }

  // x-default points to the default locale version
  languages['x-default'] = `${SITE_URL}${cleanPath || '/'}`;

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
};

/**
 * Sitemap priority mapping by route type.
 */
export function getSitemapPriority(path: string): number {
  if (path === '' || path === '/') return 1.0;
  if (['/about', '/privacy', '/terms', '/contact'].includes(path)) return 0.5;
  return 0.8; // Tool pages
}

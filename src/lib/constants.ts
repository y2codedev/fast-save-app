export const ALL_TOOLS = [
  { name: 'Online File Converter', path: '/' },
  { name: 'Background Remover', path: '/bg-remover' },
  { name: 'Video Trimmer', path: '/video-trimmer' },
  { name: 'Image Compressor', path: '/image-compressor' },
  { name: 'Image Converter', path: '/photo' },
  { name: 'Markdown to PDF', path: '/md-converter' },
  { name: 'Video to GIF', path: '/video-to-gif' },
  { name: 'Audio Converter', path: '/audio' },
  { name: 'Audio Trimmer', path: '/audio-trimmer' },
  { name: 'Image to PDF', path: '/image-to-pdf' },
  { name: 'Video Compressor', path: '/video-compressor' },
  { name: 'PDF to JPG', path: '/pdf-to-jpg' },
  { name: 'Merge PDF', path: '/merge-pdf' },
  { name: 'PDF to Word', path: '/pdf-to-docx' },
  { name: 'Word to PDF', path: '/word-to-pdf' },
  { name: 'Word to HTML', path: '/word-to-html' },
  { name: 'PDF to HTML', path: '/pdf-to-html' },
  { name: 'Data Formatter', path: '/data-formatter' },
  { name: 'Unlock PDF', path: '/unlock-pdf' },
  { name: 'Pro Image Editor', path: '/image-editor' },
  { name: 'IG Downloader', path: '/ig-downloader' },
  // PDF tools
  { name: 'Split PDF', path: '/split-pdf' },
  { name: 'Protect PDF', path: '/protect-pdf' },
  // Image tools
  { name: 'Resize Image', path: '/resize-image' },
  // ZIP tools
  { name: 'Create ZIP', path: '/create-zip' },
  { name: 'Unzip ZIP', path: '/unzip-zip' },
  { name: 'Edit ZIP', path: '/edit-zip' },
  { name: 'Merge ZIP', path: '/merge-zip' },
  { name: 'Split ZIP', path: '/split-zip' },
  { name: 'View ZIP', path: '/view-zip' },
  { name: 'Protect ZIP', path: '/protect-zip' },
  { name: 'Unlock ZIP', path: '/unlock-zip-file' },
  // Archive to ZIP converters
  { name: 'RAR to ZIP', path: '/rar-to-zip' },
  { name: '7Z to ZIP', path: '/7z-to-zip' },
  { name: 'TAR to ZIP', path: '/tar-to-zip' },
  { name: 'TAR.GZ to ZIP', path: '/tar-gz-to-zip' },
  { name: 'TAR.BZ2 to ZIP', path: '/tar-bz2-to-zip' },
  { name: 'TAR.XZ to ZIP', path: '/tar-xz-to-zip' },
  { name: 'GZ to ZIP', path: '/gz-to-zip' },
  { name: 'BZ2 to ZIP', path: '/bz2-to-zip' },
  { name: 'XZ to ZIP', path: '/xz-to-zip' },
  { name: 'ISO to ZIP', path: '/iso-to-zip' },
  // ZIP to other format converters
  { name: 'ZIP to 7Z', path: '/zip-to-7z' },
  { name: 'ZIP to TAR', path: '/zip-to-tar' },
  { name: 'ZIP to TAR.GZ', path: '/zip-to-tar-gz' },
  { name: 'ZIP to TAR.BZ2', path: '/zip-to-tar-bz2' },
  { name: 'ZIP to TAR.XZ', path: '/zip-to-tar-xz' },
  { name: 'ZIP to GZ', path: '/zip-to-gz' },
  { name: 'ZIP to BZ2', path: '/zip-to-bz2' },
  { name: 'ZIP to XZ', path: '/zip-to-xz' },
];

/**
 * Low-volume, pairwise thin archive conversion tools that are set to noindex
 * to protect the site against doorway page and thin content penalties.
 */
export const NOINDEX_TOOLS = [
  '/tar-bz2-to-zip',
  '/tar-xz-to-zip',
  '/gz-to-zip',
  '/bz2-to-zip',
  '/xz-to-zip',
  '/iso-to-zip',
  '/zip-to-tar',
  '/zip-to-tar-bz2',
  '/zip-to-tar-xz',
  '/zip-to-gz',
  '/zip-to-bz2',
  '/zip-to-xz',
];


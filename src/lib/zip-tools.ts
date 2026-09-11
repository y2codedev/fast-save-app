export interface ZipToolConfig {
  slug: string;
  toolName: string;
  description: string;
  fromFormat: string;
  toFormat: string;
  acceptMime: Record<string, string[]>;
  color: string;
}

export const ZIP_TOOL_CONFIGS: Record<string, ZipToolConfig> = {
  'create-zip': { slug: 'create-zip', toolName: 'Create ZIP', description: 'Create a new ZIP archive from your files', fromFormat: 'Files', toFormat: 'ZIP', acceptMime: {}, color: 'indigo' },
  'unzip-zip': { slug: 'unzip-zip', toolName: 'Unzip ZIP', description: 'Extract files from a ZIP archive', fromFormat: 'ZIP', toFormat: 'Files', acceptMime: { 'application/zip': ['.zip'] }, color: 'emerald' },
  'edit-zip': { slug: 'edit-zip', toolName: 'Edit ZIP', description: 'Modify contents of a ZIP archive', fromFormat: 'ZIP', toFormat: 'ZIP', acceptMime: { 'application/zip': ['.zip'] }, color: 'amber' },
  'merge-zip': { slug: 'merge-zip', toolName: 'Merge ZIP', description: 'Combine multiple ZIP archives into one', fromFormat: 'ZIP', toFormat: 'ZIP', acceptMime: { 'application/zip': ['.zip'] }, color: 'rose' },
  'split-zip': { slug: 'split-zip', toolName: 'Split ZIP', description: 'Divide a ZIP archive into smaller parts', fromFormat: 'ZIP', toFormat: 'ZIP', acceptMime: { 'application/zip': ['.zip'] }, color: 'cyan' },
  'view-zip': { slug: 'view-zip', toolName: 'View ZIP', description: 'Inspect the contents of a ZIP archive', fromFormat: 'ZIP', toFormat: 'View', acceptMime: { 'application/zip': ['.zip'] }, color: 'violet' },
  'protect-zip': { slug: 'protect-zip', toolName: 'Protect ZIP', description: 'Add password protection to your ZIP file', fromFormat: 'ZIP', toFormat: 'ZIP', acceptMime: { 'application/zip': ['.zip'] }, color: 'red' },
  'unlock-zip-file': { slug: 'unlock-zip-file', toolName: 'Unlock ZIP', description: 'Remove password from a protected ZIP', fromFormat: 'ZIP', toFormat: 'ZIP', acceptMime: { 'application/zip': ['.zip'] }, color: 'green' },
  'rar-to-zip': { slug: 'rar-to-zip', toolName: 'RAR to ZIP', description: 'Convert RAR archives to ZIP format', fromFormat: 'RAR', toFormat: 'ZIP', acceptMime: { 'application/x-rar-compressed': ['.rar'] }, color: 'orange' },
  '7z-to-zip': { slug: '7z-to-zip', toolName: '7Z to ZIP', description: 'Convert 7Z archives to ZIP format', fromFormat: '7Z', toFormat: 'ZIP', acceptMime: { 'application/x-7z-compressed': ['.7z'] }, color: 'teal' },
  'tar-to-zip': { slug: 'tar-to-zip', toolName: 'TAR to ZIP', description: 'Convert TAR archives to ZIP format', fromFormat: 'TAR', toFormat: 'ZIP', acceptMime: { 'application/x-tar': ['.tar'] }, color: 'sky' },
  'tar-gz-to-zip': { slug: 'tar-gz-to-zip', toolName: 'TAR-GZ to ZIP', description: 'Convert TAR.GZ archives to ZIP format', fromFormat: 'TAR.GZ', toFormat: 'ZIP', acceptMime: { 'application/gzip': ['.tar.gz', '.tgz'] }, color: 'purple' },
  'tar-bz2-to-zip': { slug: 'tar-bz2-to-zip', toolName: 'TAR-BZ2 to ZIP', description: 'Convert TAR.BZ2 archives to ZIP format', fromFormat: 'TAR.BZ2', toFormat: 'ZIP', acceptMime: { 'application/x-bzip2': ['.tar.bz2', '.tbz2'] }, color: 'fuchsia' },
  'tar-xz-to-zip': { slug: 'tar-xz-to-zip', toolName: 'TAR-XZ to ZIP', description: 'Convert TAR.XZ archives to ZIP format', fromFormat: 'TAR.XZ', toFormat: 'ZIP', acceptMime: { 'application/x-xz': ['.tar.xz', '.txz'] }, color: 'pink' },
  'gz-to-zip': { slug: 'gz-to-zip', toolName: 'GZ to ZIP', description: 'Convert GZ archives to ZIP format', fromFormat: 'GZ', toFormat: 'ZIP', acceptMime: { 'application/gzip': ['.gz'] }, color: 'lime' },
  'bz2-to-zip': { slug: 'bz2-to-zip', toolName: 'BZ2 to ZIP', description: 'Convert BZ2 archives to ZIP format', fromFormat: 'BZ2', toFormat: 'ZIP', acceptMime: { 'application/x-bzip2': ['.bz2'] }, color: 'yellow' },
  'xz-to-zip': { slug: 'xz-to-zip', toolName: 'XZ to ZIP', description: 'Convert XZ archives to ZIP format', fromFormat: 'XZ', toFormat: 'ZIP', acceptMime: { 'application/x-xz': ['.xz'] }, color: 'stone' },
  'iso-to-zip': { slug: 'iso-to-zip', toolName: 'ISO to ZIP', description: 'Convert ISO images to ZIP format', fromFormat: 'ISO', toFormat: 'ZIP', acceptMime: { 'application/x-iso9660-image': ['.iso'] }, color: 'slate' },
  'zip-to-rar': { slug: 'zip-to-rar', toolName: 'ZIP to RAR', description: 'Convert ZIP archives to RAR format', fromFormat: 'ZIP', toFormat: 'RAR', acceptMime: { 'application/zip': ['.zip'] }, color: 'orange' },
  'zip-to-7z': { slug: 'zip-to-7z', toolName: 'ZIP to 7Z', description: 'Convert ZIP archives to 7Z format', fromFormat: 'ZIP', toFormat: '7Z', acceptMime: { 'application/zip': ['.zip'] }, color: 'teal' },
  'zip-to-tar': { slug: 'zip-to-tar', toolName: 'ZIP to TAR', description: 'Convert ZIP archives to TAR format', fromFormat: 'ZIP', toFormat: 'TAR', acceptMime: { 'application/zip': ['.zip'] }, color: 'sky' },
  'zip-to-tar-gz': { slug: 'zip-to-tar-gz', toolName: 'ZIP to TAR-GZ', description: 'Convert ZIP archives to TAR.GZ format', fromFormat: 'ZIP', toFormat: 'TAR.GZ', acceptMime: { 'application/zip': ['.zip'] }, color: 'purple' },
  'zip-to-tar-bz2': { slug: 'zip-to-tar-bz2', toolName: 'ZIP to TAR-BZ2', description: 'Convert ZIP archives to TAR.BZ2 format', fromFormat: 'ZIP', toFormat: 'TAR.BZ2', acceptMime: { 'application/zip': ['.zip'] }, color: 'fuchsia' },
  'zip-to-tar-xz': { slug: 'zip-to-tar-xz', toolName: 'ZIP to TAR-XZ', description: 'Convert ZIP archives to TAR.XZ format', fromFormat: 'ZIP', toFormat: 'TAR.XZ', acceptMime: { 'application/zip': ['.zip'] }, color: 'pink' },
  'zip-to-gz': { slug: 'zip-to-gz', toolName: 'ZIP to GZ', description: 'Convert ZIP archives to GZ format', fromFormat: 'ZIP', toFormat: 'GZ', acceptMime: { 'application/zip': ['.zip'] }, color: 'lime' },
  'zip-to-bz2': { slug: 'zip-to-bz2', toolName: 'ZIP to BZ2', description: 'Convert ZIP archives to BZ2 format', fromFormat: 'ZIP', toFormat: 'BZ2', acceptMime: { 'application/zip': ['.zip'] }, color: 'yellow' },
  'zip-to-xz': { slug: 'zip-to-xz', toolName: 'ZIP to XZ', description: 'Convert ZIP archives to XZ format', fromFormat: 'ZIP', toFormat: 'XZ', acceptMime: { 'application/zip': ['.zip'] }, color: 'stone' },
  'zip-to-iso': { slug: 'zip-to-iso', toolName: 'ZIP to ISO', description: 'Convert ZIP archives to ISO format', fromFormat: 'ZIP', toFormat: 'ISO', acceptMime: { 'application/zip': ['.zip'] }, color: 'slate' },
};

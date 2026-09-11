// Ad delivery is opt-in. Ownership verification remains in metadata and ads.txt.
// Enable only after the account's consent configuration and page review are complete.
export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
export const ADS_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID || 'ca-pub-1504999187644497';

// Explicit inventory prevents ads appearing on contact, legal, downloader and error pages.
export const AD_PATHS = ['/', '/merge-pdf', '/image-compressor', '/image-to-pdf'];
export function canShowAds(pathname: string) {
  return ADS_ENABLED && AD_PATHS.includes(pathname);
}

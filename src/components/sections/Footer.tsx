'use client';

import { Link } from '@/i18n/routing';
import { FooterProps, DEFAULT_SOCIAL_LINKS, DEFAULT_LEGAL_LINKS } from '@/constants';
import AppLogo from '@/components/AppLogo';
import { useTranslations, useLocale } from 'next-intl';
import { useGetT } from '@/hooks/useGetT';

const CATEGORY_LINKS = [
  { href: '/pdf-tools', label: 'PDF Tools' },
  { href: '/image-tools', label: 'Image Tools' },
  { href: '/video-tools', label: 'Video & Audio Tools' },
  { href: '/archive-tools', label: 'Archive Tools' },
  { href: '/sitemap', label: 'All Tools' },
];

const Footer = ({
  year = new Date().getFullYear(),
  socialLinks = DEFAULT_SOCIAL_LINKS,
  legalLinks = DEFAULT_LEGAL_LINKS
}: FooterProps) => {
  const t = useTranslations('Footer');
  const getT = useGetT();
  const locale = useLocale();

  return (
    <footer suppressHydrationWarning className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 mt-auto">
      <div suppressHydrationWarning className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Category Tool Links */}
        <div suppressHydrationWarning className="py-6 border-b border-gray-100 dark:border-gray-700/50">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 text-center">
            {getT('Tool Categories')}
          </p>
          <nav className="flex flex-wrap justify-center gap-3" aria-label="Tool categories">
            {CATEGORY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700"
              >
                {getT(link.label)}
              </Link>
            ))}
          </nav>
        </div>

        <div suppressHydrationWarning className="py-8 md:flex md:items-center md:justify-between">
          <div suppressHydrationWarning className="flex flex-col items-center md:flex-row md:items-center space-y-2 md:space-y-0">
            <Link href="/" className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 mb-2 md:mb-0">
              <AppLogo showText={false} iconClassName="w-12 h-12 md:w-16 md:h-16" className="flex-shrink-0" />
              <div className="font-black tracking-tight text-base md:text-lg leading-none">
                <span className="text-gray-900 dark:text-white">Convert</span>
                <span className="bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] bg-clip-text text-transparent">AllNow</span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 md:ms-4">
              &copy; {year} ConvertAllNow {t('All rights reserved.')}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 md:gap-6">
            {socialLinks?.map((social) => (
              <Link
                key={social?.id}
                href={social?.href}
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-600 transition-colors duration-200"
                aria-label={social?.ariaLabel}
              >
                <social.icon className="h-5 w-5 hover:scale-150 duration-200 transition-transform" />
              </Link>
            ))}
          </div>
        </div>

        <div className="py-4 border-t border-gray-100 dark:border-gray-700">
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6" aria-label="Legal links">
            {legalLinks?.map((link) => (
              <Link
                key={link?.id}
                href={link?.href}
                className="text-sm text-gray-500 underline transition-colors duration-200"
              >
                {t(link?.label)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
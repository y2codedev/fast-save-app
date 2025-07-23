'use client';

import Link from 'next/link';
import { FooterProps, DEFAULT_SOCIAL_LINKS, DEFAULT_LEGAL_LINKS } from '@/constants';

const Footer = ({
  year = new Date().getFullYear(),
  socialLinks = DEFAULT_SOCIAL_LINKS,
  legalLinks = DEFAULT_LEGAL_LINKS
}: FooterProps) => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="flex flex-col items-center md:flex-row md:items-baseline space-y-2 md:space-y-0">
            <Link href="/" className="flex flex-col md:flex-row items-center md:items-baseline">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Fast<span className="text-indigo-600 dark:text-indigo-600">Save</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 md:ml-4">
              &copy; {year} FastSave All rights reserved.
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
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {legalLinks?.map((link) => (
              <Link
                key={link?.id}
                href={link?.href}
                className="text-sm text-gray-500 underline transition-colors duration-200"
              >
                {link?.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
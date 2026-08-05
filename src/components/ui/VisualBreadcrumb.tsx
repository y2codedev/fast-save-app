'use client';

import React from 'react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Link } from '@/i18n/routing';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface VisualBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function VisualBreadcrumb({ items, className = '' }: VisualBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <li className="flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="Home"
          >
            <HomeIcon className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRightIcon className="h-3.5 w-3.5 flex-shrink-0 text-gray-400 dark:text-gray-600" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate max-w-[160px] sm:max-w-none"
              >
                {item.name}
              </Link>
            ) : (
              <span
                className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[160px] sm:max-w-none"
                aria-current="page"
              >
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

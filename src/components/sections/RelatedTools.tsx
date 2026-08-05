'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface RelatedTool {
  name: string;
  path: string;
  desc: string;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
  title?: string;
  categoryName?: string;
  categoryPath?: string;
}

import { useTranslations } from 'next-intl';

export default function RelatedTools({
  tools,
  title,
  categoryName,
  categoryPath,
}: RelatedToolsProps) {
  const t = useTranslations('RelatedTools');
  if (!tools || tools.length === 0) return null;

  const displayTitle = title || t('title');

  return (
    <section
      aria-label={displayTitle}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-4"
    >
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {displayTitle}
          </h2>
          {categoryName && categoryPath && (
            <Link
              href={categoryPath}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              {t('viewAll', { category: categoryName })}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              href={tool.path}
              className="group flex flex-col gap-1 bg-gray-50 dark:bg-gray-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                {tool.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {tool.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

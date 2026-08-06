'use client';

import React from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useGetT } from '@/hooks/useGetT';

import { ALL_TOOLS } from '@/lib/constants';

export default function ExploreOtherTools() {
  const pathname = usePathname();
  const toolsToShow = ALL_TOOLS.filter(t => t.path !== pathname);
  const t = useTranslations('Explore');
  const getT = useGetT();

  return (
    <div className="text-center mt-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('Explore More Tools')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('Explore subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
              {toolsToShow.map(tool => (
                  <Link key={tool.name} href={tool.path} className=" inline-flex items-center whitespace-nowrap gap-2 bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm border border-gray-200 dark:border-gray-600 hover:border-indigo-300 hover:-translate-y-1">
                      {getT(tool.name)}
                  </Link>
              ))}
          </div>
      </div>
    </div>
  );
}

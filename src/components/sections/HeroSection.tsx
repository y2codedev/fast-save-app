'use client';

import { FEATURES, TopText } from '@/constants';
export default function HeroSection() {
  return (
    <div className="bg-white dark:bg-gray-900 px-4  ">
      <div className='md:py-20 py-10'>
        <TopText />
      </div>
      <div className="mx-auto max-w-7xl pb-6  sm:pb-24 ">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES?.map((feature) => (
            <div key={feature?.id} className="bg-gray-50 hover:bg-indigo-50  dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                  <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <h2 className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{feature?.name}</h2>
              </div>
              <p className="mt-2  md:text-sm text-xs  text-gray-600 dark:text-gray-400">{feature?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
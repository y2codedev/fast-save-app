'use client';

import { FaShareAlt, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { NAVITEMS } from '@/constants/data';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { ChevronRightIcon } from 'lucide-react';
import { ShareDialog } from '@/constants';
import { useState, useEffect } from 'react'
import Image from "next/image";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return (
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={36}
      height={36}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
    />
  )

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700  transition-colors duration-300">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div
              className="sm:hidden  rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FaBars className="h-5 w-5" />
            </div>

            <Link
              href="/"
              className="sm:flex hidden items-center space-x-2 cursor-pointer rounded-md ml-2 sm:ml-0"
              aria-label="FastSave Home"
            >
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Fast<span className="text-indigo-600 dark:text-indigo-600">Save</span>
              </span>
            </Link>
          </div>

          <ul className="hidden sm:flex gap-3 text-sm whitespace-nowrap font-medium">
            {NAVITEMS?.map((item) => (
              <li key={item.id} className="shrink-0">
                <Link href={item.href} className="group">
                  <div className="flex flex-col hover:bg-gray-200  dark:text-white text-gray-600 hover:text-gray-900 dark:hover:bg-gray-800  px-3 py-2 rounded-md items-center  gap-1 transition-colors duration-200  ">
                    <span >
                      {item?.ariaLabel}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            <div
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white bg-gray-100 hover:bg-white dark:bg-gray-800 transition-all duration-200 cursor-pointer"
            >
              {resolvedTheme === 'dark' ? (
                <FaSun className="h-5 w-5" />
              ) : (
                <FaMoon className="h-5 w-5" />
              )}
            </div>

            <div
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-full text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 transition-all duration-200 cursor-pointer"
            >
              <FaShareAlt className="h-5 w-5" />
            </div>
          </div>
        </div>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="sm:hidden fixed inset-0 z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/30  backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 left-0 w-2/3 bg-white  dark:bg-gray-900 transition-transform duration-300 transform translate-x-0 sm:translate-x-full">
            <div className="flex h-full flex-col overflow-y-auto  dark:border-gray-700 px-4 py-6">
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  className="flex items-center space-x-2 cursor-pointer rounded-md"
                  aria-label="FastSave Home"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Fast<span className="text-indigo-600 dark:text-indigo-600">Save</span>
                  </span>
                </Link>
                <div
                  className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaTimes className="h-4 w-4" />
                </div>
              </div>

              <ul className="space-y-4">
                {NAVITEMS?.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3  py-3 px-3 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-medium">{item.ariaLabel}</span>
                      <ChevronRightIcon className="h-4 w-4 ml-auto text-gray-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </DialogPanel>
        </Dialog>
      </nav>
      <ShareDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </header>
  );
};

export default Navbar;
'use client';

import { FaShareAlt, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { NAVITEMS } from '@/constants/data';
import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { ChevronRightIcon, Sparkles, Download, Image, Music, Zap } from 'lucide-react';
import { ShareDialog } from '@/constants';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ElementType } = {
      Sparkles,
      Download,
      Image,
      Music,
      Zap
    };
    return icons[iconName] || Download;
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            {/* Skeleton loader */}
            <div className="flex items-center space-x-4">
              <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </nav>
      </header>
    );
  }

return (
  <>
    {/* --- FIXED FULLY RESPONSIVE NAVBAR --- */}

    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
          : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-700/30"
      }`}
    >
      <nav className="mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button — show below 1024px */}
          <button
            className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <span className="text-xl font-bold">FastSave</span>
              <p className="text-xs text-gray-500">All-in-One Media Tools</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {NAVITEMS?.map((item,index) => {
              const IconComponent = item.icon;
              return (
                <motion.li 
                  key={item.id} 
                  className="shrink-0"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href} className="group">
                    <motion.div 
                      className="flex items-center gap-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2.5 rounded-xl transition-all duration-200 border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <IconComponent className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold">{item?.ariaLabel}</span>
                    </motion.div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>

        {/* Mobile + Tablet Menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden fixed inset-0 z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

          <DialogPanel className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-xl">
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex h-full flex-col overflow-y-auto border-r border-gray-200 dark:border-gray-700 px-6 py-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <Link
                  href="/"
                  className="flex items-center space-x-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gray-800 dark:text-white">
                      Fast<span className="text-purple-600 dark:text-purple-400">Save</span>
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Media Tools
                    </p>
                  </div>
                </Link>

                <button
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <ul className="space-y-3 flex-1">
                {NAVITEMS?.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 py-4 px-4 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>

                        <div className="flex-1">
                          <span className="font-semibold text-lg">
                            {item.ariaLabel}
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Footer */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>v1.0.0</span>
                  <span>All Tools Free</span>
                </div>
              </div>
            </motion.div>
          </DialogPanel>
        </Dialog>
      </nav>

      <ShareDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  </>
);

};

export default Navbar;
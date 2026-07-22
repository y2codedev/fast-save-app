'use client';

import { FaShareAlt, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { MEGA_MENU_ITEMS } from '@/constants/data';
import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { ChevronDownIcon, Sparkles } from 'lucide-react';
import ShareDialog from '@/components/ui/ShareDialog';
import AppLogo from '@/components/AppLogo';
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenuCategory = ({ category, pathname, setMobileMenuOpen }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActiveCat = category.items.some((t: any) => t.path === pathname);
  
  // Auto-open if active on mount
  useEffect(() => {
    if (isActiveCat) setIsOpen(true);
  }, [isActiveCat]);
  
  return (
    <div className="mb-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold transition-colors ${isActiveCat ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
      >
        {category.category}
        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.ul 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-1 pl-4 mt-1"
          >
            {category.items.map((tool: any, i: number) => {
              const Icon = tool.icon;
              const isActive = pathname === tool.path;
              return (
                <li key={i}>
                  <Link
                    href={tool.path}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-colors ${isActive ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 font-medium'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tool.name}</span>
                  </Link>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 items-center justify-between">
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
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
            : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-700/30"
        }`}
      >
        <nav className="mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 items-center justify-between">


            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <AppLogo showText={false} iconClassName="w-8 h-8 sm:w-10 sm:h-10" className="flex-shrink-0" />
              <div className="flex flex-col">
                <div className="font-black tracking-tight text-xl sm:text-2xl leading-none">
                  <span className="text-gray-900 dark:text-white">Fast</span>
                  <span className="bg-gradient-to-r from-[#6C5CE7] to-[#4A90E2] bg-clip-text text-transparent">Save</span>
                </div>
                <p className="hidden sm:block text-[10px] text-gray-500 dark:text-gray-400 leading-tight uppercase font-bold tracking-widest mt-0.5">All-in-One Tools</p>
              </div>
            </Link>

            {/* Desktop Mega Menu Navigation */}
            <ul className="hidden lg:flex items-center gap-2">
              {MEGA_MENU_ITEMS.map((category, index) => {
                const isActiveCat = category.items.some(t => t.path === pathname);
                return (
                  <li key={index} className="relative group">
                    <button className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-colors font-bold text-sm ${isActiveCat ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                      {category.category}
                      <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180 opacity-70" />
                    </button>
                    
                    {/* Hover Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="w-[520px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2 relative">
                        {/* Decorative Top Arrow */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-900 border-t border-l border-gray-200/60 dark:border-gray-700/60 rotate-45" />
                        
                        {category.items.map((tool, i) => {
                          const Icon = tool.icon;
                          const isActive = pathname === tool.path;
                          return (
                            <Link key={i} href={tool.path} className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group/item ${isActive ? 'bg-indigo-50/80 dark:bg-indigo-900/20 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'}`}>
                              <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 group-hover/item:bg-indigo-100 dark:group-hover/item:bg-indigo-900/50 text-gray-600 dark:text-gray-300 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400'}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="pt-0.5">
                                <div className={`font-bold mb-0.5 text-sm ${isActive ? 'text-indigo-900 dark:text-indigo-200' : 'text-gray-900 dark:text-white group-hover/item:text-indigo-700 dark:group-hover/item:text-indigo-300'}`}>
                                  {tool.name}
                                </div>
                                <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                                  {tool.desc}
                                </div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* Actions & Mobile Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 sm:p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-colors text-gray-600 dark:text-gray-300"
              >
                {theme === "dark" ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-colors text-gray-600 dark:text-gray-300"
              >
                <FaShareAlt className="w-4 h-4" />
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                onClick={() => setMobileMenuOpen(true)}
              >
                <FaBars className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Slide-out Menu */}
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden fixed inset-0 z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

            <DialogPanel className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-2xl">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="flex h-full flex-col overflow-y-auto px-4 py-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pl-2">
                  <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                    <AppLogo showText={false} iconClassName="w-10 h-10" className="flex-shrink-0" />
                    <div>
                      <div className="font-black tracking-tight text-xl leading-none">
                        <span className="text-gray-900 dark:text-white">Fast</span>
                        <span className="bg-gradient-to-r from-[#6C5CE7] to-[#4A90E2] bg-clip-text text-transparent">Save</span>
                      </div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-0.5">All-in-One Tools</p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-gray-50 dark:bg-gray-800/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>

                {/* Accordion Categories */}
                <div className="flex-1">
                  {MEGA_MENU_ITEMS.map((category, index) => (
                    <MobileMenuCategory 
                      key={index} 
                      category={category} 
                      pathname={pathname} 
                      setMobileMenuOpen={setMobileMenuOpen} 
                    />
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                    <span>v1.0.0</span>
                    <span className="text-indigo-500 dark:text-indigo-400">100% Free</span>
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
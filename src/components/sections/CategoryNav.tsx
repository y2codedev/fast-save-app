'use client'

import { NAVITEMS } from "@/constants/data";
import Link from "next/link";
import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { BiSolidCategory } from "react-icons/bi";

export default function CategoryNav() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const renderDesktopNav = () => (
        <div className="hidden sm:flex justify-center w-full">
            <ul className="flex gap-3 text-sm whitespace-nowrap font-medium">
                {NAVITEMS?.map((item) => (
                    <li key={item.id} className="shrink-0">
                        <Link href={item.href} className="group">
                            <div className="flex flex-col items-center gap-1 transition-colors duration-200 text-gray-900 hover:text-indigo-700">
                                <span className="dark:text-white text-xs mt-1">
                                    {item.ariaLabel}
                                </span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderMobileNavItem = (item: typeof NAVITEMS[0]) => (
        <li key={item.id} className="w-full shrink-0">
            <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-3 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-900 hover:text-indigo-700"
            >
                <div className="flex items-center gap-3">
                    <span className="bg-gray-200 rounded-full size-10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 stroke-2" />
                    </span>
                    <span className="dark:text-white">{item.ariaLabel}</span>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </Link>
        </li>
    );

    return (
        <nav className="w-full  px-4">
            <button
                onClick={() => setMobileOpen(true)}
                className="sm:hidden flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <BiSolidCategory className="size-5" />
                <span>Categories</span>
            </button>

            {renderDesktopNav()}

            <Dialog open={mobileOpen} onClose={setMobileOpen} className="relative z-50 sm:hidden">
                <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
                <div className="fixed inset-0 overflow-hidden">
                    <DialogPanel className="fixed inset-y-0 left-0 w-screen max-w-xs bg-white shadow-xl transition-transform duration-500 ease-in-out data-closed:-translate-x-full">
                        <div className="flex h-full flex-col">
                            <div className="flex items-center justify-between p-4 border-b">
                                <DialogTitle className="text-base font-semibold text-gray-800">Categories</DialogTitle>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                                >
                                    <XMarkIcon className="size-5 text-gray-600" />
                                </button>
                            </div>
                            <ul className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
                                {NAVITEMS?.map(renderMobileNavItem)}
                            </ul>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </nav>
    );
}
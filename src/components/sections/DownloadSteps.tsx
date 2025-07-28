'use client';

import { STEP, TopHeader_Item } from "@/constants/data";
import { usePathname } from "next/navigation";
export default function DownloadSteps() {
    const pathName = usePathname();
    const urlPath = TopHeader_Item?.find(item => item?.path === pathName) || TopHeader_Item?.find(item => item.path === '')!;
    return (
        <div className="bg-white  dark:bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-50 max-w-7xl  rounded-xl dark:bg-gray-800 mx-4 py-10">
                <div className="mx-auto  px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">How it works</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Download {urlPath?.highlight} in 4 Easy Steps
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Our process is designed to be simple and fast, with no technical knowledge required.
                        </p>
                    </div>
                    <div className="mt-16">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {STEP?.map((step) => (
                                <div key={step?.id} className="relative bg-gray-50 dark:bg-gray-800 p-2 rounded-xl">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                            <step.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-600" aria-hidden="true" />
                                        </div>
                                        <h3 className="mt-6 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <span className="absolute inset-0" />
                                            Step {step?.id} : {step?.name}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{step?.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
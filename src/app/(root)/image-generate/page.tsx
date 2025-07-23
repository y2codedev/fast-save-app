import GenerateForm from '@/components/sections/GenerateForm';
import ImageCard from '@/components/sections/ImageCard';
import { Group } from '@/constants';

export default function HomePage() {
    return (
        <main className="py-12  bg-white dark:bg-gray-900 min-h-screen">
            <div className='max-w-7xl mx-auto px-4 bg-white dark:bg-gray-900'>
                <div className=" text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        AI Image Generator
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Transform your imagination into stunning visuals
                    </p>
                </div>
                <div className="space-y-10">
                    <GenerateForm />
                    <ImageCard />
                </div>
            </div>
            <Group />
        </main>
    );
}

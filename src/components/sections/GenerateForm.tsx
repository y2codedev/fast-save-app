'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import { Toast } from '@/constants';

export default function GenerateForm() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            Toast('error', 'Please enter a prompt');
            return;
        }
        setIsGenerating(true);
        setError('');

        try {
            const response = await fetch('/api/image-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) throw new Error('Failed generation');
            const { imageUrl } = await response.json();

            await fetch('/api/generate-latest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl }),
            });

            Toast('success', 'Image generated!');
            router.refresh();
        } catch (err) {
            console.error(err);
            setError('Failed to generate image');
            Toast('error', 'Failed to generate image');
        } finally {
            setIsGenerating(false);
        }
    };

    if (error) {
        Toast("error", error)
        return
    }

    return (
        <div className="w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    id="prompt"
                    rows={4}
                    className="w-full p-3 border rounded-lg bg-transparent"
                    placeholder="A futuristic city at night..."
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                />
                <Button isProcessing={isGenerating} labal="Create Artwork" />
            </form>
        </div>
    );
}

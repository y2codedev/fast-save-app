"use client";

import { useState, useRef, ChangeEvent } from 'react';
import { Toast } from '@/constants';

const useBackgroundRemover = () => {
    const [mode, setMode] = useState<'upload' | 'url'>('upload');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [resultImage, setResultImage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '5da58acae9mshaca9e06ba0032afp175489jsn9e4219e979ab';

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImageUrl('');
        }
    };

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
        setImageFile(null);
    };

    const removeBackground = async () => {

        const isValidImageUrl = (url: string) => {
            try {
                const parsedUrl = new URL(url);
                return /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(parsedUrl.pathname);
            } catch {
                return false;
            }
        };

        setIsProcessing(true);
        setResultImage('');

        try {

            if ((mode === 'upload' && !imageFile) || (mode === 'url' && !imageUrl)) {
                Toast("error", mode === 'upload' ? 'Please select an image file' : 'Please enter a valid image URL');
                return;
            }

            if (mode === 'url' && (!imageUrl || !isValidImageUrl(imageUrl))) {
                Toast("error", 'Please enter a valid image URL');
                return;
            }


            let body: FormData | URLSearchParams;
            const headers: Record<string, string> = {
                'x-rapidapi-host': 'remove-background18.p.rapidapi.com',
                'x-rapidapi-key': RAPIDAPI_KEY,
            };

            if (mode === 'upload' && imageFile) {
                body = new FormData();
                body.append('image_file', imageFile);
            } else {
                body = new URLSearchParams();
                body.append('image_url', imageUrl);
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }

            const response = await fetch(
                'https://remove-background18.p.rapidapi.com/public/remove-background',
                {
                    method: 'POST',
                    headers,
                    body,
                    cache: "no-store"
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `API error: ${response.status}`);
            }

            const data = await response.json();
            const resultUrl = data.url || (data.result && data.result.image_url);

            if (!resultUrl) {
                throw new Error('No result image URL returned from API');
            }

            setResultImage(resultUrl);
            Toast('success', 'Background removed successfully!');
        } catch (error) {
            console.error('Background removal failed:', error);
            Toast("error", 'You have exceeded the MONTHLY quota');
        } finally {
            setIsProcessing(false);
        }
    };

    const resetForm = () => {
        setImageFile(null);
        setImageUrl('');
        setResultImage('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return {
        mode,
        setMode,
        imageFile,
        imageUrl,
        resultImage,
        isProcessing,
        fileInputRef,
        handleFileChange,
        handleUrlChange,
        removeBackground,
        resetForm
    };
};

export default useBackgroundRemover;
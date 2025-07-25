// app/components/AdvancedBackgroundRemover.tsx
"use client";

import { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';
import { Button } from '@/components/bg-ui/button';
import { Input } from '@/components/bg-ui/input';
import { Slider } from '@/components/bg-ui/slider';
import { Progress } from '@/components/bg-ui/progress';
import { DownloadIcon, ResetIcon, UploadIcon } from '@radix-ui/react-icons';

type ModelType = bodyPix.BodyPix | null;

export default function AdvancedBackgroundRemover() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [model, setModel] = useState<ModelType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    segmentationThreshold: 100,
    edgeBlurAmount: 10,
    transparency: true,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  type BodyPixModelConfig = {
    architecture: 'MobileNetV1' | 'ResNet50';
    outputStride: 8 | 16 | 32;
    multiplier?: 0.5 | 0.75 | 1.0;
    quantBytes?: 1 | 2 | 4;
    progressCallback?: (percent: number) => void;
  };


  useEffect(() => {
    let isMounted = true;

    const loadModel = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Initialize TF.js with progress tracking
        tf.env().set('WEBGL_CPU_FORWARD', false);

        // Show progress for model loading
        const progressCallback = (p: number) => {
          if (isMounted) setProgress(Math.floor(p * 100));
        };

        // Updated: Include progressCallback inside modelConfig
        const modelConfig: BodyPixModelConfig = {
          architecture: 'MobileNetV1',
          outputStride: 16,
          multiplier: 0.75,
          quantBytes: 2,
          progressCallback, // <-- Progress callback is now part of config
        };

        const loadedModel = await bodyPix.load(modelConfig); // <-- Only pass modelConfig

        if (isMounted) {
          setModel(loadedModel);
          setProgress(100);
          setTimeout(() => setProgress(0), 1000);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load AI model. Please refresh the page or check your connection.');
          console.error('Model loading error:', err);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadModel();

    return () => {
      isMounted = false;
      // Clean up
      if (model) {
        model.dispose();
      }
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate image size
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setProcessedImage(null);
    };
    reader.onerror = () => {
      setError('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  const removeBackground = async () => {
    if (!image || !model || !canvasRef.current) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const canvas = canvasRef.current;
      const img = new Image();

      img.onload = async () => {
        // Calculate dimensions while maintaining aspect ratio
        const maxDimension = 1024;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          const ratio = Math.min(maxDimension / width, maxDimension / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        // Draw the original image
        ctx.drawImage(img, 0, 0, width, height);
        setProgress(20);

        // Get segmentation mask
        const segmentation = await model.segmentPerson(img, {
          flipHorizontal: false,
          internalResolution: 'high',
          segmentationThreshold: settings.segmentationThreshold,
        });
        setProgress(60);

        // Create mask (1-bit per pixel)
        const foregroundColor = { r: 255, g: 255, b: 255, a: 255 };
        const backgroundColor = { r: 0, g: 0, b: 0, a: 0 };
        const mask = bodyPix.toMask(segmentation, foregroundColor, backgroundColor);

        // Convert to RGBA (4 bytes per pixel)
        const rgbaData = new Uint8ClampedArray(width * height * 4);
        for (let i = 0; i < mask.data.length; i++) {
          const val = mask.data[i];
          rgbaData[i * 4] = val;     // R
          rgbaData[i * 4 + 1] = val; // G
          rgbaData[i * 4 + 2] = val; // B
          rgbaData[i * 4 + 3] = val; // A
        }

        // Apply mask
        const maskImageData = new ImageData(rgbaData, width, height);
        ctx.putImageData(maskImageData, 0, 0);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(canvas, 0, 0);

        // Final result
        const format = settings.transparency ? 'png' : 'jpeg';
        const result = canvas.toDataURL(`image/${format}`, 0.95);

        setProcessedImage(result);
        setProgress(100);
      };

      img.src = image;
    } catch (err) {
      console.error('Background removal error:', err);
      setError('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  const reset = () => {
    setImage(null);
    setProcessedImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = () => {
    if (processedImage && downloadLinkRef.current) {
      downloadLinkRef.current.href = processedImage;
      downloadLinkRef.current.download = `background-removed-${Date.now()}.${settings.transparency ? 'png' : 'jpg'}`;
      downloadLinkRef.current.click();
    }
  };

  return (
    <div id="download-section" className="bg-white dark:bg-gray-900 py-10 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gray-50 shadow-sm dark:bg-gray-800 p-6 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Advanced Background Remover</h1>
            <p className="text-muted-foreground">
              Remove backgrounds from images using AI - 100% private processing in your browser
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Settings Panel */}
            <div className="bg-card rounded-lg border p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Segmentation Threshold: {settings.segmentationThreshold.toFixed(1)}
                  </label>
                  <Slider
                    min={0.1}
                    max={0.9}
                    step={0.1}
                    value={[settings.segmentationThreshold]}
                    onValueChange={(val) => setSettings({ ...settings, segmentationThreshold: val[0] })}
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Higher values make the AI more selective about what to keep
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Edge Blur: {settings.edgeBlurAmount}px
                  </label>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={[settings.edgeBlurAmount]}
                    onValueChange={(val) => setSettings({ ...settings, edgeBlurAmount: val[0] })}
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Smoothes the edges of the cutout
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="transparency"
                    checked={settings.transparency}
                    onChange={(e) => setSettings({ ...settings, transparency: e.target.checked })}
                    className="h-4 w-4"
                    disabled={isProcessing}
                  />
                  <label htmlFor="transparency" className="text-sm font-medium">
                    Transparent Background
                  </label>
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium mb-2">Upload Image</label>
                  <div className="flex flex-col gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      disabled={isLoading || isProcessing}
                      className="cursor-pointer"
                    />

                    {image && (
                      <div className="flex gap-2">
                        <Button
                          onClick={removeBackground}
                          disabled={isLoading || isProcessing || !image}
                          className="flex-1"
                        >
                          {isProcessing ? (
                            <span className="flex items-center gap-2">
                              <span className="animate-spin">⏳</span>
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <UploadIcon className="h-4 w-4" />
                              Remove Background
                            </span>
                          )}
                        </Button>
                        <Button
                          onClick={reset}
                          variant="outline"
                          disabled={isProcessing}
                        >
                          <ResetIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress indicator */}
              {(isLoading || isProcessing) && progress > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>
                      {isLoading ? 'Loading AI model...' : 'Processing image...'}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {/* Error display */}
              {error && (
                <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Image Preview Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Image */}
                <div className="border rounded-lg overflow-hidden bg-muted/50">
                  <div className="p-4 border-b">
                    <h3 className="font-medium">Original Image</h3>
                  </div>
                  <div className="p-4 flex items-center justify-center min-h-64">
                    {image ? (
                      <img
                        src={image}
                        alt="Original"
                        className="max-w-full max-h-[400px] object-contain rounded"
                      />
                    ) : (
                      <div className="text-muted-foreground text-center py-12">
                        <UploadIcon className="mx-auto h-8 w-8 mb-2" />
                        <p>No image uploaded</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Processed Image */}
                <div className="border rounded-lg overflow-hidden bg-muted/50">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-medium">Result</h3>
                    {processedImage && (
                      <Button
                        size="sm"
                        onClick={handleDownload}
                        className="gap-1"
                      >
                        <DownloadIcon className="h-4 w-4" />
                        Download
                      </Button>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-center min-h-64">
                    {processedImage ? (
                      <div className="relative">
                        <img
                          src={processedImage}
                          alt="Processed"
                          className="max-w-full max-h-[400px] object-contain rounded"
                        />
                        {settings.transparency && (
                          <div className="absolute inset-0 border-4 border-dashed border-muted-foreground/30 pointer-events-none rounded"></div>
                        )}
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-center py-12">
                        {image ? (
                          <>
                            <div className="mx-auto h-8 w-8 mb-2 animate-pulse">✨</div>
                            <p>Process image to see result</p>
                          </>
                        ) : (
                          <>
                            <div className="mx-auto h-8 w-8 mb-2">←</div>
                            <p>Upload an image first</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-muted/50 p-4 rounded-lg border">
                <h3 className="font-medium mb-2">Tips for Best Results</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Use high-contrast images for best accuracy</li>
                  <li>• For complex backgrounds, increase the threshold</li>
                  <li>• Add edge blur to smooth jagged edges</li>
                  <li>• PNG format preserves transparency</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hidden elements */}
          <canvas ref={canvasRef} className="hidden" />
          <a ref={downloadLinkRef} className="hidden" />
        </div>
      </div>
    </div>
  );
}
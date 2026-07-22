'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Crop as CropIcon, Image as ImageIcon, Maximize, FlipHorizontal, FlipVertical,
  RotateCw, RotateCcw, Download, ArrowLeft, Sliders, Palette, Zap, Undo, 
  Settings2, ImagePlus, Upload
} from 'lucide-react';

type Tool = 'resize' | 'crop' | 'mirror' | 'rotate' | 'compress' | 'convert' | 'filter';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export default function AdvancedImageEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [activeTool, setActiveTool] = useState<Tool>('resize');
  const imageRef = useRef<HTMLImageElement>(null);

  // Resize State
  const [resizeW, setResizeW] = useState<number>(0);
  const [resizeH, setResizeH] = useState<number>(0);
  const [keepAspect, setKeepAspect] = useState<boolean>(true);

  // Crop State
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  // Output State (for compress & convert)
  const [outFormat, setOutFormat] = useState<string>('image/jpeg');
  const [quality, setQuality] = useState<number>(80);

  // Load image
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      loadFile(e.target.files[0]);
    }
  };

  const loadFile = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result?.toString() || '');
      setUndoStack([]);
    });
    reader.readAsDataURL(f);
  };

  const saveState = () => {
    setUndoStack(prev => [...prev, imageSrc]);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const prev = undoStack[undoStack.length - 1];
      setImageSrc(prev);
      setUndoStack(undoStack.slice(0, -1));
      setResizeW(0); // Force resize inputs to update on next image load
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (activeTool === 'resize' && resizeW === 0) {
      setResizeW(e.currentTarget.naturalWidth);
      setResizeH(e.currentTarget.naturalHeight);
    }
  };

  const handleResizeWChange = (val: number) => {
    setResizeW(val);
    if (keepAspect && imageRef.current) {
      const aspect = imageRef.current.naturalWidth / imageRef.current.naturalHeight;
      setResizeH(Math.round(val / aspect));
    }
  };

  const handleResizeHChange = (val: number) => {
    setResizeH(val);
    if (keepAspect && imageRef.current) {
      const aspect = imageRef.current.naturalWidth / imageRef.current.naturalHeight;
      setResizeW(Math.round(val * aspect));
    }
  };

  const applyResize = () => {
    if (!imageRef.current) return;
    saveState();
    const canvas = document.createElement('canvas');
    canvas.width = resizeW;
    canvas.height = resizeH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(imageRef.current, 0, 0, resizeW, resizeH);
    setImageSrc(canvas.toDataURL(outFormat, quality / 100));
  };

  const applyCrop = () => {
    if (!imageRef.current || !completedCrop) return;
    saveState();
    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(
      imageRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0, 0, canvas.width, canvas.height
    );
    setImageSrc(canvas.toDataURL(outFormat, quality / 100));
    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  const applyFlip = (horizontal: boolean, vertical: boolean) => {
    if (!imageRef.current) return;
    saveState();
    const canvas = document.createElement('canvas');
    canvas.width = imageRef.current.naturalWidth;
    canvas.height = imageRef.current.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.translate(horizontal ? canvas.width : 0, vertical ? canvas.height : 0);
    ctx.scale(horizontal ? -1 : 1, vertical ? -1 : 1);
    ctx.drawImage(imageRef.current, 0, 0);
    setImageSrc(canvas.toDataURL(outFormat, quality / 100));
  };

  const applyRotate = (angle: number) => {
    if (!imageRef.current) return;
    saveState();
    const canvas = document.createElement('canvas');
    const rad = (angle * Math.PI) / 180;
    
    if (angle === 90 || angle === 270) {
      canvas.width = imageRef.current.naturalHeight;
      canvas.height = imageRef.current.naturalWidth;
    } else {
      canvas.width = imageRef.current.naturalWidth;
      canvas.height = imageRef.current.naturalHeight;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.drawImage(imageRef.current, -imageRef.current.naturalWidth / 2, -imageRef.current.naturalHeight / 2);
    setImageSrc(canvas.toDataURL(outFormat, quality / 100));
  };

  const applyFilter = (filterType: string) => {
    if (!imageRef.current) return;
    saveState();
    const canvas = document.createElement('canvas');
    canvas.width = imageRef.current.naturalWidth;
    canvas.height = imageRef.current.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (filterType === 'grayscale') {
      ctx.filter = 'grayscale(100%)';
      ctx.drawImage(imageRef.current, 0, 0);
    } else if (filterType === 'pixelate') {
      const size = 10;
      const w = canvas.width;
      const h = canvas.height;
      // draw scaled down
      canvas.width = w / size;
      canvas.height = h / size;
      ctx.drawImage(imageRef.current, 0, 0, w / size, h / size);
      // scale back up
      ctx.imageSmoothingEnabled = false;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tCtx = tempCanvas.getContext('2d');
      tCtx!.imageSmoothingEnabled = false;
      tCtx!.drawImage(canvas, 0, 0, w, h);
      setImageSrc(tempCanvas.toDataURL(outFormat, quality / 100));
      return;
    }
    
    setImageSrc(canvas.toDataURL(outFormat, quality / 100));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `edited_image.${outFormat.split('/')[1]}`;
    link.href = imageSrc;
    link.click();
  };

  // Tools Configuration
  const tools = [
    { id: 'resize', icon: Maximize, label: 'Resize' },
    { id: 'crop', icon: CropIcon, label: 'Crop' },
    { id: 'mirror', icon: FlipHorizontal, label: 'Mirror' },
    { id: 'rotate', icon: RotateCw, label: 'Rotate' },
    { id: 'filter', icon: Palette, label: 'Filters' },
    { id: 'compress', icon: Zap, label: 'Compress' },
    { id: 'convert', icon: ImageIcon, label: 'Convert' },
  ] as const;

  const renderHowToUse = () => (
    <div className="text-center mb-12 mt-16 max-w-4xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">How to use the Pro Image Editor</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Upload Image</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Select any image from your device to open it in our secure, browser-based editor.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Edit & Adjust</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Use the sidebar tools to resize, crop, rotate, flip, compress, or apply filters.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Save & Download</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Choose your output format (JPG/PNG/WEBP) and instantly download the final image.</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!file || !imageSrc ? (
        <div className="max-w-3xl mx-auto py-12 px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Pro Image Editor</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">A complete browser-based image editing suite. Resize, crop, filter, and compress your images easily and privately.</p>
          </div>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-12 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer relative mb-16">
            <input 
              type="file" 
              accept="image/*" 
              onChange={onFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Upload an Image</h3>
            <p className="text-gray-500 dark:text-gray-400">Click or drag and drop to start editing</p>
          </div>
          {renderHowToUse()}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-900 py-8 px-4 w-full">
          <div className="max-w-[1400px] mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row h-[85vh]">
            
            {/* Left Sidebar - Tools */}
            <div className="w-full md:w-24 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex md:flex-col overflow-x-auto md:overflow-y-auto shrink-0">
              <div className="p-4 flex md:flex-col gap-2">
                {tools.map((t) => {
                  const Icon = t.icon;
                  const isActive = activeTool === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTool(t.id as Tool)}
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl transition-all min-w-[70px] ${
                        isActive 
                          ? 'bg-indigo-600 text-white shadow-md' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Middle Panel - Settings */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col shrink-0 overflow-y-auto">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-indigo-500" />
                {tools.find(t => t.id === activeTool)?.label} Settings
              </h2>

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {activeTool === 'resize' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Width (px)</label>
                        <input type="number" value={resizeW} onChange={e => handleResizeWChange(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Height (px)</label>
                        <input type="number" value={resizeH} onChange={e => handleResizeHChange(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={keepAspect} onChange={e => setKeepAspect(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Keep Aspect Ratio</span>
                      </label>
                      <button onClick={applyResize} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-md hover:shadow-lg">
                        Apply Resize
                      </button>
                    </motion.div>
                  )}

                  {activeTool === 'crop' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Drag on the image to select the area you want to keep.</p>
                      <button onClick={applyCrop} disabled={!completedCrop} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl transition shadow-md hover:shadow-lg">
                        Apply Crop
                      </button>
                    </motion.div>
                  )}

                  {activeTool === 'mirror' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                      <button onClick={() => applyFlip(true, false)} className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl transition">
                        <FlipHorizontal className="w-5 h-5" /> Flip Horizontal
                      </button>
                      <button onClick={() => applyFlip(false, true)} className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl transition">
                        <FlipVertical className="w-5 h-5" /> Flip Vertical
                      </button>
                    </motion.div>
                  )}

                  {activeTool === 'rotate' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                      <button onClick={() => applyRotate(90)} className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl transition">
                        <RotateCw className="w-5 h-5" /> Rotate 90° CW
                      </button>
                      <button onClick={() => applyRotate(270)} className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl transition">
                        <RotateCcw className="w-5 h-5" /> Rotate 90° CCW
                      </button>
                    </motion.div>
                  )}

                  {activeTool === 'filter' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                      <button onClick={() => applyFilter('grayscale')} className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl transition">
                        Grayscale (B&W)
                      </button>
                      <button onClick={() => applyFilter('pixelate')} className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl transition">
                        Pixelate
                      </button>
                    </motion.div>
                  )}

                  {(activeTool === 'compress' || activeTool === 'convert') && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Output Format</label>
                        <select value={outFormat} onChange={e => setOutFormat(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white cursor-pointer">
                          <option value="image/jpeg">JPG</option>
                          <option value="image/png">PNG</option>
                          <option value="image/webp">WEBP</option>
                        </select>
                      </div>
                      
                      {outFormat !== 'image/png' && (
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Quality</label>
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{quality}%</span>
                          </div>
                          <input 
                            type="range" min="1" max="100" value={quality} 
                            onChange={e => setQuality(Number(e.target.value))} 
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
                          />
                          <p className="text-xs text-gray-500 mt-2">Adjust quality to reduce file size. Applied upon downloading.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="mt-8 space-y-3">
                <button 
                  onClick={undo}
                  disabled={undoStack.length === 0}
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Undo className="w-5 h-5" /> Undo Change
                </button>
                <button 
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-4 px-4 rounded-xl transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" /> Download Image
                </button>
                <button 
                  onClick={() => { setFile(null); setImageSrc(''); }}
                  className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-800 dark:hover:text-white font-semibold py-2 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Upload
                </button>
              </div>
            </div>

            {/* Right Canvas - Preview */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
              {/* Transparent Checkered Background Pattern for images with transparency */}
              <div 
                className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" 
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), repeating-linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)',
                  backgroundPosition: '0 0, 10px 10px',
                  backgroundSize: '20px 20px'
                }}
              />
              
              <div className="relative z-10 max-w-full max-h-full flex items-center justify-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                {activeTool === 'crop' ? (
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                  >
                    <img ref={imageRef} src={imageSrc} onLoad={onImageLoad} alt="Preview" className="max-w-full max-h-[70vh] object-contain" />
                  </ReactCrop>
                ) : (
                  <img ref={imageRef} src={imageSrc} onLoad={onImageLoad} alt="Preview" className="max-w-full max-h-[70vh] object-contain drop-shadow-md" />
                )}
              </div>
            </div>
          </div>
          {renderHowToUse()}
        </div>
      )}
    </>
  );
}

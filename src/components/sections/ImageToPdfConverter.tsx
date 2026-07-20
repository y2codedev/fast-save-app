"use client";

import { useState, useRef } from "react";
import { FiUpload, FiDownload, FiFileText, FiImage, FiCheck, FiTrash2, FiLayers, FiX, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AdsenseAd } from "@/constants";
import { jsPDF } from "jspdf";
import { DndContext, closestCenter, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type PdfImage = {
  id: string;
  file: File;
  preview: string;
};

function SortableImageItem({ img, index, removeImage }: { img: PdfImage, index: number, removeImage: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: img.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative w-full aspect-[3/4] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing group ${isDragging ? 'shadow-2xl scale-105' : ''}`}
      {...attributes}
      {...listeners}
    >
      <button 
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
        className="absolute top-2 right-2 z-20 bg-white/90 dark:bg-gray-800/90 text-gray-500 hover:text-red-500 p-1.5 rounded-full shadow-sm hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
      >
        <FiX className="w-4 h-4" />
      </button>
      
      <div className="w-full h-full p-2 pb-8 flex items-center justify-center pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.preview} alt={`Page ${index + 1}`} className="max-w-full max-h-full object-contain drop-shadow-sm" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-2 pointer-events-none">
        <span className="text-white text-xs font-semibold drop-shadow-md">Page {index + 1}</span>
      </div>
    </div>
  );
}

export default function ImageToPdfConverter() {
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;
  const [pdfImages, setPdfImages] = useState<PdfImage[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversionStep, setConversionStep] = useState<'upload' | 'convert' | 'complete'>('upload');
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PDF Settings State
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'legal'>('a4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState<number>(14);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPdfImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const validImages = selectedFiles.filter(file => file.type.startsWith('image/'));
      
      const MAX_IMAGES = 30;
      const spaceLeft = MAX_IMAGES - pdfImages.length;
      
      if (spaceLeft <= 0) {
        alert("You have reached the maximum limit of 30 images per PDF.");
        return;
      }
      
      let imagesToAdd = validImages;
      if (validImages.length > spaceLeft) {
        alert(`You can only add ${spaceLeft} more image(s). Only the first ${spaceLeft} images will be added.`);
        imagesToAdd = validImages.slice(0, spaceLeft);
      }

      const newPdfImages: PdfImage[] = [];
      
      for (const file of imagesToAdd) {
        const preview = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        
        newPdfImages.push({
          id: Math.random().toString(36).substring(7),
          file,
          preview
        });
      }
      
      setPdfImages(prev => [...prev, ...newPdfImages]);
      setConversionStep('convert');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragActive) setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Create a mock event object to reuse handleFileChange
      const mockEvent = {
        target: { files: e.dataTransfer.files }
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(mockEvent);
    }
  };

  const removeImage = (idToRemove: string) => {
    const updated = pdfImages.filter(img => img.id !== idToRemove);
    setPdfImages(updated);
    if (updated.length === 0) {
      setConversionStep('upload');
    }
  };

  const generatePDF = async () => {
    if (pdfImages.length === 0) return;
    
    setIsGenerating(true);
    try {
      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: pageSize,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pdfImages.length; i++) {
        if (i > 0) pdf.addPage();

        const imgData = pdfImages[i].preview;
        
        const img = new Image();
        img.src = imgData;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const availableWidth = pageWidth - (margin * 2);
        const availableHeight = pageHeight - (margin * 2);

        const imgRatio = img.width / img.height;
        const pageRatio = availableWidth / availableHeight;

        let finalWidth = availableWidth;
        let finalHeight = availableHeight;

        if (imgRatio > pageRatio) {
          finalWidth = availableWidth;
          finalHeight = availableWidth / imgRatio;
        } else {
          finalHeight = availableHeight;
          finalWidth = availableHeight * imgRatio;
        }

        const x = margin + (availableWidth - finalWidth) / 2;
        const y = margin + (availableHeight - finalHeight) / 2;

        pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
      }

      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setConversionStep('complete');
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetConverter = () => {
    setPdfImages([]);
    setPdfUrl(null);
    setConversionStep('upload');
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200 dark:border-gray-700">
            <FiFileText className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Image to PDF Converter
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-6">
            Convert Images into
            <span className="block text-indigo-600 dark:text-indigo-400">PDF Documents</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Merge multiple JPG, PNG, or WEBP images into a single PDF file instantly. Drag and drop to rearrange pages.
          </p>
        </motion.div>

        {/* Conversion Steps */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:border-gray-700/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              {[
                { step: 'upload', label: 'Select Images', icon: FiImage },
                { step: 'convert', label: 'Generate PDF', icon: FiLayers },
                { step: 'complete', label: 'Download', icon: FiDownload },
              ].map(({ step, label, icon: Icon }, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    conversionStep === step 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : conversionStep === 'complete' && step === 'complete'
                      ? 'bg-green-500 border-green-500 text-white'
                      : index === 0 || (conversionStep === 'convert' && step === 'convert') || (conversionStep === 'complete')
                      ? 'bg-indigo-100 border-indigo-600 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-400 dark:text-indigo-400'
                      : 'bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-700 dark:border-gray-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`font-medium ${
                    conversionStep === step || (conversionStep === 'complete' && step === 'complete')
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {label}
                  </span>
                  {index < 2 && (
                    <div className="hidden sm:block w-12 h-[2px] bg-gray-200 dark:bg-gray-700 ml-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          {/* Left Panel: Upload & Manage Images */}
          <motion.div 
            className="relative h-full lg:col-span-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-white/20 dark:border-gray-700/50 p-6 sm:p-8 min-h-[400px] h-full flex flex-col">
              
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
                
              {pdfImages.length === 0 ? (
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer flex-1 flex flex-col items-center justify-center min-h-[300px] ${
                    isDragActive 
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10' 
                      : 'border-gray-300 hover:border-indigo-500 bg-gray-50 hover:bg-indigo-50 dark:border-gray-600 dark:bg-gray-800/50'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-full shadow-sm mb-4 inline-block">
                    <FiUpload className="h-8 w-8 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select Images</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">JPG, PNG, or WEBP. You can select multiple files.</p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
                      <FiImage className="h-5 w-5" />
                      <span>{pdfImages.length} images selected</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Each image = 1 PDF page</span>
                  </div>

                  {/* Draggable Grid */}
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar -mr-2">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={pdfImages.map(img => img.id)} strategy={rectSortingStrategy}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                          {pdfImages.map((img, idx) => (
                            <SortableImageItem key={img.id} img={img} index={idx} removeImage={removeImage} />
                          ))}

                          {/* Add More Box */}
                          <div
                            className="relative w-full aspect-[3/4] rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <FiPlus className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm font-medium text-gray-500">Add more</span>
                          </div>
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Panel: Generate & Preview */}
          <motion.div 
            className="relative lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-white/20 dark:border-gray-700/50 p-6 flex flex-col">
              
              {!pdfUrl ? (
                 <div className="flex flex-col">
                  {/* PDF Settings Header */}
                  <div className="flex items-center gap-3 mb-6 text-gray-900 dark:text-white font-bold text-lg border-b border-gray-100 dark:border-gray-700/50 pb-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-lg">
                      <FiFileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    PDF Settings
                  </div>

                  {/* Page Size */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <FiLayers className="h-4 w-4 text-gray-400" /> Page Size
                    </label>
                    <select 
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value as any)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white cursor-pointer"
                    >
                      <option value="a4">A4 (210 × 297mm)</option>
                      <option value="letter">Letter (216 × 279mm)</option>
                      <option value="legal">Legal (216 × 356mm)</option>
                    </select>
                  </div>

                  {/* Orientation */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <FiImage className="h-4 w-4 text-gray-400" /> Orientation
                    </label>
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setOrientation('portrait')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${orientation === 'portrait' ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                      >
                        Portrait
                      </button>
                      <button
                        onClick={() => setOrientation('landscape')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${orientation === 'landscape' ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                      >
                        Landscape
                      </button>
                    </div>
                  </div>

                  {/* Margin */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <span className="text-gray-400">⤢</span> Margin
                      </label>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">{margin}mm</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                      <span>No margin</span>
                      <span>50mm</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={generatePDF}
                    disabled={pdfImages.length === 0 || isGenerating}
                    className={`w-full inline-flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg ${
                      pdfImages.length > 0 
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white hover:-translate-y-1'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 shadow-none'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FiLayers className="h-5 w-5" />
                        Convert to PDF
                      </>
                    )}
                  </button>
                 </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-center gap-3 mb-6 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 py-3 px-4 rounded-xl border border-green-200 dark:border-green-800">
                    <FiCheck className="w-5 h-5" />
                    <span className="font-medium">Success! Your PDF is ready.</span>
                  </div>
                  
                  <div className="w-full aspect-[4/5] bg-gray-100 dark:bg-gray-900 rounded-xl mb-6 overflow-hidden border border-gray-200 dark:border-gray-700 flex items-center justify-center relative">
                    <iframe src={`${pdfUrl}#toolbar=0`} className="w-full h-full" title="PDF Preview" />
                    <div className="absolute bottom-4 right-4 text-xs font-medium bg-black/60 text-white px-3 py-1 rounded-full backdrop-blur-md">Preview</div>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    <a
                      href={pdfUrl}
                      download="Converted_Images.pdf"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <FiDownload className="h-5 w-5" />
                      Download PDF
                    </a>
                    <button
                      onClick={resetConverter}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3.5 px-6 rounded-xl transition-all duration-300"
                    >
                      Create Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            {
              icon: FiLayers,
              title: "Merge Multiple Images",
              description: "Select unlimited images and combine them into a single PDF document instantly."
            },
            {
              icon: FiCheck,
              title: "100% Client-Side",
              description: "Everything happens in your browser. Your images are never uploaded to any server."
            },
            {
              icon: FiImage,
              title: "Perfect Quality",
              description: "Images are scaled perfectly to fit A4 size pages without losing their original clarity."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-violet-500 p-3 rounded-xl">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Ad Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className='mx-auto max-w-4xl'>
            <AdsenseAd height="min-h-[100px] md:h-[280px]" slot={adsenseSlotId} className="rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700/50" />
          </div>
        </motion.div>

        {/* Try Other Features */}
        <motion.div 
          className="text-center mt-12 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Try Other Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/image-compressor" 
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium flex items-center gap-2 shadow-sm"
            >
              <FiImage className="w-4 h-4" />
              Image Compressor
            </Link>
            <Link 
              href="/bg-remover" 
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium flex items-center gap-2 shadow-sm"
            >
              <FiImage className="w-4 h-4" />
              Background Remover
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

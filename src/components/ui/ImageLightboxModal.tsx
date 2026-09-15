import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Tag, Info } from 'lucide-react';

export interface LightboxImage {
  url: string;
  caption?: string;
  tag?: string;
  title?: string;
}

interface ImageLightboxModalProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (newIndex: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const currentImage = images[currentIndex];

  const handleNext = useCallback(() => {
    if (!images || images.length <= 1) return;
    const nextIdx = (currentIndex + 1) % images.length;
    if (onNavigate) onNavigate(nextIdx);
  }, [currentIndex, images, onNavigate]);

  const handlePrev = useCallback(() => {
    if (!images || images.length <= 1) return;
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    if (onNavigate) onNavigate(prevIdx);
  }, [currentIndex, images, onNavigate]);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-4 md:p-6 select-none animate-in fade-in duration-200">
        
        {/* Top Header Bar */}
        <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2.5">
            {currentImage.tag && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-dpc-gold-500/20 text-dpc-gold-300 border border-dpc-gold-500/40 backdrop-blur-sm">
                <Tag className="w-3 h-3 text-dpc-gold-400" />
                {currentImage.tag}
              </span>
            )}
            {images.length > 1 && (
              <span className="text-xs font-semibold text-slate-300 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                {currentIndex + 1} of {images.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              aria-label="Close full screen viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Previous Navigation Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-6 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-dpc-gold-500 text-white hover:text-dpc-navy-950 border border-white/20 hover:border-dpc-gold-400 flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-md hover:scale-110 active:scale-95 group"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Next Navigation Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-6 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-dpc-gold-500 text-white hover:text-dpc-navy-950 border border-white/20 hover:border-dpc-gold-400 flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-md hover:scale-110 active:scale-95 group"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Center Image Container */}
        <div
          className="relative max-w-5xl w-full max-h-[82vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentImage.url}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative flex items-center justify-center max-h-[72vh] sm:max-h-[75vh]"
          >
            <img
              src={currentImage.url}
              alt={currentImage.caption || currentImage.title || 'Church Event Photo'}
              className="max-h-[70vh] sm:max-h-[75vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-2xl shadow-2xl border border-white/15"
            />
          </motion.div>

          {/* Bottom Caption Overlay Card */}
          {(currentImage.caption || currentImage.title) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3.5 max-w-2xl w-full px-4 py-2.5 rounded-xl bg-dpc-navy-950/85 backdrop-blur-md border border-dpc-gold-500/30 text-center shadow-xl"
            >
              {currentImage.title && (
                <p className="text-xs sm:text-sm font-bold text-dpc-gold-300 mb-0.5">
                  {currentImage.title}
                </p>
              )}
              {currentImage.caption && (
                <p className="text-xs sm:text-sm text-slate-200 font-light leading-snug">
                  “{currentImage.caption}”
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Click backdrop helper indicator on desktop */}
        <div className="absolute bottom-3 right-4 hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 pointer-events-none">
          <Info className="w-3.5 h-3.5" />
          <span>Press ESC or click outside to close • Arrow keys to navigate</span>
        </div>

      </div>
    </AnimatePresence>
  );
};

export default ImageLightboxModal;

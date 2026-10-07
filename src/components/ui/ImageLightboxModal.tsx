import { useDialogAccessibility } from "./useDialogAccessibility";
import { useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

export const ImageLightboxModal = ({ images, currentIndex, isOpen, onClose, onNavigate }: ImageLightboxModalProps) => {
  const index = Math.max(0, Math.min(currentIndex, images.length - 1));
  const currentImage = images[index];
  const dialogRef = useDialogAccessibility(isOpen && Boolean(currentImage), onClose);
  const reducedMotion = useReducedMotion();
  const canNavigate = images.length > 1 && Boolean(onNavigate);
  const handleNext = useCallback(() => {
    if (canNavigate) onNavigate?.((index + 1) % images.length);
  }, [index, images.length, canNavigate, onNavigate]);
  const handlePrev = useCallback(() => {
    if (canNavigate) onNavigate?.((index - 1 + images.length) % images.length);
  }, [index, images.length, canNavigate, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      const dialogs = document.querySelectorAll('[role="dialog"]');
      if (dialogs[dialogs.length - 1] !== dialogRef.current) return;
      if (event.key === "ArrowRight") { event.preventDefault(); handleNext(); }
      if (event.key === "ArrowLeft") { event.preventDefault(); handlePrev(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, dialogRef]);

  if (!isOpen || !currentImage) return null;
  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Ministry photo viewer" tabIndex={-1} className="photo-viewer" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <header className="photo-viewer-header">
        <div><p className="eyebrow">{currentImage.tag || "LIFE TOGETHER AT DPC"}</p><span className="photo-viewer-count" role="status">Photo {index + 1} of {images.length}</span></div>
        <button type="button" className="photo-viewer-close" onClick={onClose} aria-label="Close full screen viewer"><X size={22} /></button>
      </header>
      <div className="photo-viewer-stage" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
        <figure className="photo-viewer-figure">
          <motion.div className="photo-viewer-image" key={currentImage.url} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.18 }}>
            <img src={currentImage.url} alt={currentImage.caption || currentImage.title || "Church event photo"} decoding="async" />
          </motion.div>
          {(currentImage.title || currentImage.caption) && <figcaption className="photo-viewer-caption" aria-live="polite">
            {currentImage.title && <h2>{currentImage.title}</h2>}
            {currentImage.caption && <p>{currentImage.caption}</p>}
          </figcaption>}
        </figure>
      </div>
      <footer className="photo-viewer-footer">
        <p className="photo-viewer-help">Esc to close{canNavigate ? " · Arrow keys to browse" : ""}</p>
        {canNavigate && <nav aria-label="Photo navigation" className="photo-viewer-navigation">
          <button type="button" onClick={handlePrev} aria-label="Previous photo"><ChevronLeft size={20} /><span>Previous</span></button>
          <button type="button" onClick={handleNext} aria-label="Next photo"><span>Next</span><ChevronRight size={20} /></button>
        </nav>}
      </footer>
    </div>
  );
};
export default ImageLightboxModal;

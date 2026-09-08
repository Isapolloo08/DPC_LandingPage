import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface ScriptureRevealProps {
  quote: string;
  reference?: string;
  version?: string;
  className?: string;
  quoteClassName?: string;
  referenceClassName?: string;
  staggerDelay?: number;
  initialDelay?: number;
  showQuoteMarks?: boolean;
  highlightWords?: string[];
  align?: 'left' | 'center' | 'right';
  variant?: 'gold' | 'white' | 'subtle';
}

export const ScriptureReveal: React.FC<ScriptureRevealProps> = ({
  quote,
  reference,
  version = 'ESV',
  className = '',
  quoteClassName = '',
  referenceClassName = '',
  staggerDelay = 0.045,
  initialDelay = 0.15,
  showQuoteMarks = true,
  highlightWords = [],
  align = 'left',
  variant = 'gold',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  // Split the quote into clean words while preserving trailing punctuation
  const words = quote.trim().split(/\s+/);

  // Container animation configuration
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  // Individual word animation (100% GPU-accelerated: opacity, translateY, scale)
  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Reference badge animation
  const referenceVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: initialDelay + words.length * staggerDelay + 0.1,
        ease: 'easeOut',
      },
    },
  };

  const alignClass =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  const defaultQuoteColors = {
    gold: 'text-slate-100 font-serif',
    white: 'text-white font-serif',
    subtle: 'text-slate-200 font-serif',
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col ${alignClass} ${className}`}
      aria-label={`${quote} - ${reference || ''}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative"
      >
        <blockquote
          className={`relative italic leading-relaxed text-sm sm:text-base md:text-lg ${defaultQuoteColors[variant]} ${quoteClassName}`}
          aria-hidden="true"
        >
          {showQuoteMarks && (
            <span className="text-dpc-gold-400/80 mr-1 not-italic font-serif select-none">
              “
            </span>
          )}

          {words.map((word, idx) => {
            const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const isHighlighted = highlightWords.some(
              (hw) => hw.toLowerCase() === cleanWord
            );

            return (
              <span
                key={idx}
                className="inline-block whitespace-nowrap overflow-visible mr-[0.28em] last:mr-0"
              >
                <motion.span
                  variants={wordVariants}
                  style={{ willChange: 'transform, opacity' }}
                  className={`inline-block ${
                    isHighlighted
                      ? 'text-dpc-gold-300 font-medium'
                      : ''
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}

          {showQuoteMarks && (
            <span className="text-dpc-gold-400/80 ml-1 not-italic font-serif select-none">
              ”
            </span>
          )}
        </blockquote>

        {/* Optional Reference Footer with Elegant Gold Flourish */}
        {reference && (
          <motion.div
            variants={referenceVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={`flex items-center gap-2.5 mt-2.5 ${
              align === 'center'
                ? 'justify-center'
                : align === 'right'
                ? 'justify-end'
                : 'justify-start'
            } ${referenceClassName}`}
          >
            <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent via-dpc-gold-400/60 to-transparent" />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-dpc-navy-900/90 border border-dpc-gold-500/40 text-[10px] sm:text-xs font-bold font-serif uppercase tracking-widest text-dpc-gold-300 shadow-sm">
              <span>{reference}</span>
              {version && (
                <span className="text-[9px] text-dpc-gold-500 font-sans opacity-75">
                  ({version})
                </span>
              )}
            </span>
            <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent via-dpc-gold-400/60 to-transparent" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

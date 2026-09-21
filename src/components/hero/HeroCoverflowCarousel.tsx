import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import real authentic photos from ministry folders
import streamKinder from '@/assets/Kinder Ministry/516368798_4004060663255125_3940156298598136062_n.jpg';
import streamElem from '@/assets/Elementary Ministry/480577141_481392148377786_6333824624822562519_n.jpg';
import streamHs from '@/assets/High School Ministry/680044493_935616212628115_2898471636377619378_n.jpg';
import streamYouthCamp from '@/assets/Youth Ministry/656680392_958771106489110_8611197159791022889_n.jpg';
import streamYouthPraise from '@/assets/Youth Ministry/714759264_1015627274136826_7581065074620186600_n.jpg';
import streamYA from '@/assets/Young Adult Ministry/505320113_661118810260117_450252600683907860_n.jpg';
import streamCouples from '@/assets/Junior Adult Minitry/615576920_889621683718381_8998977265371590367_n.jpg';

export interface CoverflowSlide {
  id: string;
  src: string;
  alt: string;
  tag: string;
  title: string;
}

export const HERO_GALLERY_SLIDES: CoverflowSlide[] = [
  {
    id: 'church-sanctuary',
    src: '/images/church-building.jpg',
    alt: 'Daet Presbyterian Church sanctuary building and Camarines Norte Youth Center',
    tag: 'Sanctuary',
    title: 'Our Church Home & Worship Sanctuary',
  },
  {
    id: 'youth-praise',
    src: streamYouthPraise,
    alt: 'Youth and music ministry team leading congregational praise during Sunday worship',
    tag: 'Worship',
    title: 'Christ-Centered Congregational Praise',
  },
  {
    id: 'youth-fellowship',
    src: streamYouthCamp,
    alt: 'Youth group raising hands together in joyful worship during annual discipleship camp',
    tag: 'Discipleship',
    title: 'Youth & Student Discipleship Camp',
  },
  {
    id: 'children-sunday-school',
    src: streamKinder,
    alt: 'Seeds of Grace kindergarten children listening attentively to Sunday school Bible lesson',
    tag: 'Children',
    title: 'Seeds of Grace Children Sunday School',
  },
  {
    id: 'high-school-ministry',
    src: streamHs,
    alt: 'Ignite Teens high school department gathering for small-group prayer and Bible study',
    tag: 'Teens',
    title: 'Ignite Teens Fellowship & Bible Circle',
  },
  {
    id: 'young-adults',
    src: streamYA,
    alt: 'Young adult professionals and college students gathered for roundtable fellowship and mentoring',
    tag: 'Young Adults',
    title: 'Ambassadors for Christ Young Adults',
  },
  {
    id: 'couples-family',
    src: streamCouples,
    alt: 'Church families and couples enjoying dinner and encouragement during covenant fellowship',
    tag: 'Family',
    title: 'Pillars of Faith Family Fellowship',
  },
];

interface HeroCoverflowCarouselProps {
  className?: string;
}

export const HeroCoverflowCarousel: React.FC<HeroCoverflowCarouselProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const slides = HERO_GALLERY_SLIDES;
  const totalSlides = slides.length;

  // Media query listeners
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay handler (5 seconds, disabled on reduced motion)
  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, reducedMotion, goToNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

  // Touch swipe support for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (deltaX > minSwipeDistance) {
      goToNext();
    } else if (deltaX < -minSwipeDistance) {
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Church life and worship photo gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn(
        'relative w-full select-none outline-none focus-visible:ring-2 focus-visible:ring-dpc-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dpc-navy-950 rounded-2xl py-2',
        className
      )}
    >
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {totalSlides}: {slides[currentIndex].title}. {slides[currentIndex].alt}
      </div>

      {/* Main Carousel Display Area */}
      <div className="relative h-[220px] xs:h-[250px] sm:h-[280px] md:h-[310px] lg:h-[330px] w-full flex items-center justify-center overflow-hidden">
        {reducedMotion ? (
          /* Reduced Motion Fallback: Simple Crossfade, Zero 3D Movement */
          <div className="relative w-full max-w-xl h-full rounded-2xl overflow-hidden shadow-2xl border border-dpc-gold-500/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[currentIndex].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative w-full h-full"
              >
                <img
                  src={slides[currentIndex].src}
                  alt={slides[currentIndex].alt}
                  width={800}
                  height={500}
                  loading={currentIndex === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  {...(currentIndex === 0 ? ({ fetchpriority: 'high' } as any) : {})}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dpc-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-dpc-navy-950/90 border border-dpc-gold-500/40 text-[11px] font-semibold text-dpc-gold-300">
                    {slides[currentIndex].tag}
                  </span>
                  <span className="text-xs text-white/90 font-medium drop-shadow-md">
                    {slides[currentIndex].title}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : isMobile ? (
          /* Mobile Horizontal Swipe Carousel with slight peek */
          <div className="w-full flex items-center justify-center px-4">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={slides[currentIndex].id}
                initial={{ opacity: 0.6, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.6, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-full max-w-[340px] xs:max-w-[380px] h-[210px] xs:h-[240px] rounded-2xl overflow-hidden shadow-xl border border-dpc-gold-500/40 bg-dpc-navy-900"
              >
                <img
                  src={slides[currentIndex].src}
                  alt={slides[currentIndex].alt}
                  width={800}
                  height={500}
                  loading={currentIndex === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  {...(currentIndex === 0 ? ({ fetchpriority: 'high' } as any) : {})}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dpc-navy-950/85 via-dpc-navy-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-dpc-navy-950/90 border border-dpc-gold-500/50 text-[10px] font-bold text-dpc-gold-300">
                    {slides[currentIndex].tag}
                  </span>
                  <p className="text-[11px] text-slate-100 font-medium truncate max-w-[190px]">
                    {slides[currentIndex].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Desktop Coverflow 3D Carousel: Calm 16deg rotation, subtle scaling */
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: 1100, transformStyle: 'preserve-3d' }}
          >
            {slides.map((slide, index) => {
              // Calculate relative distance from current index (-2, -1, 0, 1, 2)
              let diff = index - currentIndex;
              if (diff > totalSlides / 2) diff -= totalSlides;
              if (diff < -totalSlides / 2) diff += totalSlides;

              const isCenter = diff === 0;
              const isAdjacent = Math.abs(diff) === 1;
              const isOuter = Math.abs(diff) === 2;
              const isVisible = Math.abs(diff) <= 2;

              if (!isVisible) return null;

              // Geometric coverflow parameters (calm, elegant, not busy)
              const rotateY = isCenter ? 0 : diff > 0 ? -18 : 18;
              const translateX = isCenter ? 0 : diff * 240; // Card offset
              const translateZ = isCenter ? 40 : isAdjacent ? -70 : -140;
              const scale = isCenter ? 1 : isAdjacent ? 0.85 : 0.72;
              const opacity = isCenter ? 1 : isAdjacent ? 0.75 : 0.35;
              const zIndex = isCenter ? 30 : isAdjacent ? 20 : 10;

              return (
                <motion.div
                  key={slide.id}
                  onClick={() => goToIndex(index)}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  style={{
                    zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  className={cn(
                    'absolute w-[360px] md:w-[420px] lg:w-[470px] h-[210px] md:h-[250px] lg:h-[280px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-shadow duration-300',
                    isCenter
                      ? 'border-2 border-dpc-gold-400/80 shadow-gold-glow'
                      : 'border border-white/10 hover:border-dpc-gold-500/40 hover:opacity-90'
                  )}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    width={800}
                    height={500}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    {...(index === 0 ? ({ fetchpriority: 'high' } as any) : {})}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out"
                  />

                  {/* Dark navy scrim at the bottom for crisp contrast without covering photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dpc-navy-950/90 via-dpc-navy-950/15 to-transparent pointer-events-none" />

                  {/* Small card label pill */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md bg-dpc-navy-950/90 border border-dpc-gold-500/40 text-[11px] font-bold text-dpc-gold-300 shadow-sm backdrop-blur-sm">
                      {slide.tag}
                    </span>
                    <span className="text-xs text-white/95 font-medium drop-shadow-md truncate max-w-[240px]">
                      {slide.title}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation Controls: Arrows & Dot Indicators */}
      <div className="flex items-center justify-between max-w-xl mx-auto px-4 mt-2 sm:mt-3">
        {/* Prev Arrow Button */}
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous photo"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-dpc-navy-900/90 border border-dpc-gold-500/40 hover:border-dpc-gold-400 text-dpc-gold-300 hover:text-dpc-gold-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-dpc-gold-400 cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.tag}`}
                aria-current={isActive ? 'true' : 'false'}
                className={cn(
                  'h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-dpc-gold-400 cursor-pointer',
                  isActive
                    ? 'w-6 sm:w-8 bg-gradient-to-r from-dpc-gold-400 to-dpc-gold-300 shadow-gold-glow'
                    : 'w-2 bg-white/25 hover:bg-white/45'
                )}
              />
            );
          })}
        </div>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={goToNext}
          aria-label="Next photo"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-dpc-navy-900/90 border border-dpc-gold-500/40 hover:border-dpc-gold-400 text-dpc-gold-300 hover:text-dpc-gold-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-dpc-gold-400 cursor-pointer shadow-md"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Small Eyebrow Caption below the Carousel (Not a large H2) */}
      <div className="text-center mt-2.5">
        <p className="text-[11px] sm:text-xs font-display font-medium tracking-wider uppercase text-dpc-gold-400/90">
          Witness God’s Faithfulness in Motion
        </p>
      </div>
    </section>
  );
};

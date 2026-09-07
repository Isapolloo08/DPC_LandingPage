"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  name: string;
  designation?: string;
  quote: string;
  src: string;
  tag?: string;
}

export interface CircularTestimonialsProps {
  testimonials: TestimonialItem[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

export function CircularTestimonials({
  testimonials,
  autoplay = false,
  autoplayInterval = 6000,
  className,
}: CircularTestimonialsProps) {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;
    const interval = setInterval(handleNext, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, handleNext, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[active];

  // Stable rotation degrees for background cards
  const getRotation = (index: number) => {
    const offsets = [0, -6, 5, -8, 7];
    return offsets[index % offsets.length];
  };

  return (
    <div
      className={cn(
        "w-full rounded-3xl bg-dpc-navy-900/90 border border-dpc-gold-500/30 p-5 sm:p-7 shadow-2xl relative overflow-hidden",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
        
        {/* LEFT COLUMN: Stacked Rotating Cards */}
        <div className="md:col-span-5 flex items-center justify-center relative min-h-[260px] sm:min-h-[300px]">
          <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[4/4.5] sm:aspect-square">
            <AnimatePresence mode="popLayout">
              {testimonials.map((item, index) => {
                const isActive = index === active;
                const isNext = (index - active + testimonials.length) % testimonials.length === 1;
                const isSecondNext = (index - active + testimonials.length) % testimonials.length === 2;
                
                // Only render active and top 2 stack cards for performance
                if (!isActive && !isNext && !isSecondNext) return null;

                const zIndex = isActive ? 30 : isNext ? 20 : 10;
                const scale = isActive ? 1 : isNext ? 0.94 : 0.88;
                const rotate = isActive ? 0 : isNext ? getRotation(index) : getRotation(index) * 1.5;
                const yOffset = isActive ? 0 : isNext ? 10 : 20;
                const opacity = isActive ? 1 : isNext ? 0.85 : 0.5;

                return (
                  <motion.div
                    key={item.src + index}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: getRotation(index) * 2,
                      y: 30,
                    }}
                    animate={{
                      opacity,
                      scale,
                      rotate,
                      y: yOffset,
                      zIndex,
                      transition: {
                        duration: 0.45,
                        ease: [0.23, 1, 0.32, 1],
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                      rotate: -getRotation(index) * 2,
                      y: -25,
                      transition: {
                        duration: 0.35,
                        ease: "easeInOut",
                      },
                    }}
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-dpc-gold-500/40 bg-dpc-navy-950"
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover object-center select-none pointer-events-none"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dpc-navy-950/80 via-black/20 to-transparent pointer-events-none"></div>

                    {/* Tag badge on image */}
                    {item.tag && (
                      <div className="absolute top-3 left-3 z-20">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-dpc-navy-950/90 text-dpc-gold-300 border border-dpc-gold-500/50 backdrop-blur-md shadow-md">
                          {item.tag}
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: Animated Text & Controls */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-3"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
                  {current.name}
                </h3>
                {current.designation && (
                  <p className="text-xs sm:text-sm font-semibold text-dpc-gold-400 mt-0.5">
                    {current.designation}
                  </p>
                )}
              </div>

              <blockquote className="text-sm sm:text-base text-slate-200 font-light leading-relaxed italic border-l-2 border-dpc-gold-500/40 pl-3.5 sm:pl-4 py-1">
                “{current.quote}”
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls & Pagination Counter */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    active === i ? "w-6 bg-dpc-gold-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-dpc-navy-950 border border-dpc-gold-500/40 text-dpc-gold-300 hover:text-white hover:bg-dpc-gold-500/20 flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                aria-label="Previous event"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-dpc-gold-500 to-dpc-gold-400 text-dpc-navy-950 flex items-center justify-center font-bold transition-all cursor-pointer shadow-gold-glow hover:scale-105 active:scale-95"
                aria-label="Next event"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CircularTestimonials;

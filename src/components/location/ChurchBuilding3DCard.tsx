import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, Clock, Users, Sparkles, Compass } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';
import { MINISTRIES_DATA } from '../../data/ministriesData';

export const ChurchBuilding3DCard: React.FC = () => {
  // 3D Tilt, Flip & Mouse Tracking State
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return; // Keep level when reading the back side
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt angles (max ~6 degrees)
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[500px] flex items-center justify-center">
      {/* Ambient Multi-layer Backlight Glow */}
      <div className="absolute -inset-3 sm:-inset-5 bg-gradient-to-tr from-dpc-gold-500/20 via-blue-600/15 to-dpc-gold-400/20 rounded-[2.5rem] blur-xl -z-10 pointer-events-none opacity-50" />

      {/* 3D Perspective Flip Card Container */}
      <div
        onClick={toggleFlip}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full min-h-[460px] sm:min-h-[500px] rounded-3xl group cursor-pointer"
        style={{ perspective: 1200 }}
      >
        {/* ========================================================= */}
        {/* FRONT SIDE: Sanctuary & Youth Center Photo with 3D Tilt   */}
        {/* ========================================================= */}
        <motion.div
          animate={{
            rotateY: isFlipped ? 180 : tilt.rotateY,
            rotateX: isFlipped ? 0 : tilt.rotateX,
            scale: isHovered && !isFlipped ? 1.015 : 1,
            opacity: isFlipped ? 0 : 1,
            pointerEvents: isFlipped ? 'none' : 'auto',
          }}
          transition={{
            rotateY: { duration: 0.65, ease: [0.25, 1, 0.5, 1] },
            rotateX: { type: 'spring', stiffness: 280, damping: 22 },
            opacity: { duration: 0.3 },
          }}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-dpc-navy-950 border border-dpc-gold-500/40 hover:border-dpc-gold-400 shadow-2xl transition-colors duration-300"
        >
          <img
            src="/images/church-building.jpg"
            alt="Daet Presbyterian Church & Camarines Norte Youth Center Building"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Bottom shadow vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-dpc-navy-950/95 via-dpc-navy-950/25 to-transparent pointer-events-none" />

          {/* Interactive Dynamic Glare */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 350px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.15), transparent 70%)`,
            }}
          />

          {/* Front Bottom Card Overlay Info */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 pointer-events-none">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dpc-navy-950/90 border border-dpc-gold-500/40 text-[10px] sm:text-[11px] font-bold text-dpc-gold-300 backdrop-blur-md mb-1.5 shadow-sm">
                <Sparkles className="w-3 h-3 text-dpc-gold-400" />
                <span>Sanctuary & Youth Center</span>
              </div>
              <p className="text-sm sm:text-base font-serif font-bold text-white drop-shadow-md">
                Daet Presbyterian Church
              </p>
              <p className="text-[11px] text-slate-300 drop-shadow">
                Purok 2, Cobangbang, Daet, Camarines Norte
              </p>
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-dpc-gold-500/20 border border-dpc-gold-400/50 text-[11px] font-bold text-dpc-gold-300 backdrop-blur-md shrink-0 group-hover:bg-dpc-gold-500/30 transition-colors shadow-sm">
              <span>Click to Flip</span>
              <span>↺</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* BACK SIDE: Church Information & Quick Facts               */}
        {/* ========================================================= */}
        <motion.div
          initial={{ rotateY: -180, opacity: 0 }}
          animate={{
            rotateY: isFlipped ? 0 : -180,
            opacity: isFlipped ? 1 : 0,
            pointerEvents: isFlipped ? 'auto' : 'none',
          }}
          transition={{
            rotateY: { duration: 0.65, ease: [0.25, 1, 0.5, 1] },
            opacity: { duration: 0.3 },
          }}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
          className="absolute inset-0 w-full h-full rounded-3xl overflow-y-auto no-scrollbar p-5 sm:p-6 bg-[#071324] border border-dpc-gold-500/60 flex flex-col justify-between shadow-2xl text-left"
        >
          {/* Back Top Header */}
          <div>
            <div className="flex items-center justify-between border-b border-white/15 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-dpc-gold-500/20 border border-dpc-gold-500/40 flex items-center justify-center text-dpc-gold-400 shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-white tracking-wide">
                    Church Quick Facts
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-dpc-gold-300 font-semibold">
                    Established in {CHURCH_INFO.foundedYear} • Daet, Camarines Norte
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-dpc-gold-500/20 border border-dpc-gold-400/40 text-[11px] font-bold text-dpc-gold-300">
                <span>Flip Back</span>
                <span>↺</span>
              </div>
            </div>

            {/* Information Cards Grid */}
            <div className="space-y-2.5 text-xs sm:text-sm">
              {/* Location & Landmark */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#0c1a2e] border border-white/10 space-y-1">
                <p className="text-dpc-gold-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                  <span>Location & Landmark</span>
                </p>
                <p className="text-white text-xs leading-relaxed font-medium">
                  {CHURCH_INFO.address.street}, {CHURCH_INFO.address.barangay}, {CHURCH_INFO.address.municipality}
                </p>
                <p className="text-[11px] text-slate-300 italic">
                  Landmark: {CHURCH_INFO.address.landmark}
                </p>
              </div>

              {/* Worship Schedule Summary */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#0c1a2e] border border-white/10 space-y-2">
                <p className="text-dpc-gold-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                  <span>Lord's Day Gatherings</span>
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#081220] p-2 rounded-lg border border-dpc-gold-500/40 shadow-sm">
                    <p className="font-bold text-white text-[11px]">Main Worship</p>
                    <p className="text-[11px] text-dpc-gold-300 font-bold">9:40 AM – 11:30 AM</p>
                    <p className="text-[10px] text-slate-300">All Ages / Families</p>
                  </div>
                  <div className="bg-[#081220] p-2 rounded-lg border border-white/10">
                    <p className="font-bold text-white text-[11px]">Sunday School</p>
                    <p className="text-[11px] text-dpc-gold-300 font-bold">8:00 AM – 9:30 AM</p>
                    <p className="text-[10px] text-slate-300">Kids, Youth & Adults</p>
                  </div>
                </div>
              </div>

              {/* Generational Ministries Showcase */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#0c1a2e] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-dpc-gold-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                    <span>Generational Ministries</span>
                  </p>
                  <a
                    href="#ministries"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] text-dpc-gold-300 hover:text-dpc-gold-200 font-bold underline underline-offset-2 transition-colors"
                  >
                    Explore all →
                  </a>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {MINISTRIES_DATA.slice(0, 7).map((m, idx) => {
                    const tagColors = [
                      'bg-amber-500/20 border-amber-500/40 text-amber-200',
                      'bg-emerald-500/20 border-emerald-500/40 text-emerald-200',
                      'bg-sky-500/20 border-sky-500/40 text-sky-200',
                      'bg-indigo-500/20 border-indigo-500/40 text-indigo-200',
                      'bg-blue-500/20 border-blue-500/40 text-blue-200',
                      'bg-rose-500/20 border-rose-500/40 text-rose-200',
                      'bg-purple-500/20 border-purple-500/40 text-purple-200',
                    ];
                    const colorClass = tagColors[idx % tagColors.length];

                    return (
                      <span
                        key={m.id || idx}
                        className={`px-2 py-0.5 rounded-md border text-[10px] font-semibold tracking-wide ${colorClass}`}
                      >
                        {m.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Back Footer Link */}
          <div className="pt-2.5 mt-2 border-t border-white/15">
            <a
              href="#what-to-expect"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-2.5 px-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/20 transition-all cursor-pointer text-center"
            >
              <Compass className="w-3.5 h-3.5 text-dpc-gold-300 shrink-0" />
              <span>What to Expect First-Time Visitors ↓</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

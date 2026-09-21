import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Compass, Church, Calendar, Sparkles, MapPin, ArrowRight, RotateCw } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';
import { ExpandMap } from '@/components/ui/expand-map';

interface LocationMapSectionProps {
  onPlanVisitClick: () => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({ onPlanVisitClick }) => {
  // 3D Tilt, Flip & Mouse Tracking State
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return; // Keep completely level when reading information on the back
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth 3D tilt angles (max ~6 degrees)
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
    <section id="location" className="py-20 bg-dpc-navy-950 px-4 sm:px-6 lg:px-8 relative border-t border-white/5 section-render-opt">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-3 shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>Visit Us in Camarines Norte</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
            Location, Sanctuary & Map
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-light">
            Conveniently situated in the provincial capital of Daet, easily accessible by tricycle, jeepney, or private vehicle.
          </p>
        </div>

        {/* Main 2-Column Split: 3D Flip Card Container (Left) & Expandable Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* ========================================================================= */}
          {/* LEFT: Full-Fit 3D Interactive Flip Card (Front: Full Photo | Back: Info)  */}
          {/* ========================================================================= */}
          <div
            className="lg:col-span-5 relative w-full h-full min-h-[580px] sm:min-h-[620px] lg:min-h-[640px]"
            style={{ perspective: 1200 }}
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-dpc-gold-500/20 via-blue-600/15 to-dpc-gold-400/20 rounded-[2.5rem] blur-xl -z-10 pointer-events-none opacity-50" />

            {/* Interactive Flip Container */}
            <div
              onClick={toggleFlip}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-full min-h-[580px] sm:min-h-[620px] lg:min-h-[640px] rounded-3xl group cursor-pointer"
              style={{ perspective: 1200 }}
            >
              {/* ------------------------------------------------------------- */}
              {/* FRONT SIDE: Full-Fit Church Sanctuary Building Photo & 3D Tilt */}
              {/* ------------------------------------------------------------- */}
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
                className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-dpc-navy-950 border border-dpc-gold-500/40 hover:border-dpc-gold-400 shadow-2xl transition-colors duration-300 flex flex-col justify-end p-5 sm:p-7"
              >
                {/* Full-Fit Background Photo */}
                <img
                  src="/images/church-building.jpg"
                  alt="Daet Presbyterian Church and Camarines Norte Youth Center Building"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambient Scrim Vignette for crisp text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-dpc-navy-950 via-dpc-navy-950/40 to-transparent pointer-events-none" />

                {/* Dynamic Specular Light Glare */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle 350px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.2), transparent 70%)`,
                  }}
                />

                {/* Top Badge: Flip Prompt */}
                <div className="absolute top-5 right-5 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dpc-navy-950/90 border border-dpc-gold-400/60 text-xs font-bold text-dpc-gold-300 shadow-gold-glow backdrop-blur-md">
                    <span>Click to View Info</span>
                    <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                  </div>
                </div>

                {/* Bottom Overlay Content on the Photo */}
                <div className="relative z-10 space-y-2 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dpc-navy-950/90 border border-dpc-gold-500/40 text-[11px] font-bold text-dpc-gold-300 backdrop-blur-md shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-dpc-gold-400" />
                    <span>Sanctuary & Camarines Norte Youth Center</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                    {CHURCH_INFO.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-dpc-gold-300 font-semibold drop-shadow">
                    {CHURCH_INFO.centerName}
                  </p>

                  <p className="text-xs text-slate-200 leading-relaxed font-light drop-shadow">
                    📍 {CHURCH_INFO.address.street}, {CHURCH_INFO.address.barangay}, {CHURCH_INFO.address.municipality}
                  </p>

                  <div className="pt-2">
                    <div className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 text-dpc-navy-950 font-bold text-xs flex items-center justify-center gap-2 shadow-gold-glow">
                      <span>Click Card to Open Gathering Schedule & Details</span>
                      <span>↺</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* BACK SIDE: Complete Physical Address, Schedule & Connect Info */}
              {/* ------------------------------------------------------------- */}
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
                className="absolute inset-0 w-full h-full rounded-3xl overflow-y-auto no-scrollbar p-5 sm:p-7 md:p-8 bg-[#071324] border border-dpc-gold-500/60 shadow-2xl flex flex-col justify-between text-left"
              >
                <div className="space-y-4 sm:space-y-5">
                  {/* Back Header with Flip Back Button */}
                  <div className="flex items-center justify-between border-b border-white/15 pb-3">
                    <div className="flex items-center gap-2">
                      <Church className="w-4 h-4 text-dpc-gold-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-dpc-gold-400">
                        Church Details & Gatherings
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlip();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dpc-gold-500/20 border border-dpc-gold-400/50 text-[11px] font-bold text-dpc-gold-300 hover:bg-dpc-gold-500/30 transition-colors cursor-pointer"
                    >
                      <span>Flip to Photo</span>
                      <span>↺</span>
                    </button>
                  </div>

                  {/* Physical Address Section */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
                      {CHURCH_INFO.name}
                    </h3>
                    <p className="text-xs text-dpc-gold-300 font-semibold mb-1">
                      {CHURCH_INFO.centerName}
                    </p>
                    <p className="text-xs text-slate-200 leading-relaxed font-light">
                      {CHURCH_INFO.address.street}, {CHURCH_INFO.address.barangay}, {CHURCH_INFO.address.municipality}, {CHURCH_INFO.address.province} {CHURCH_INFO.address.zipCode}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 italic">
                      📍 Landmark: {CHURCH_INFO.address.landmark}
                    </p>
                  </div>

                  {/* Gathering Schedule */}
                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-dpc-gold-400 text-xs font-bold uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>Gathering Schedule</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Open for All
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {/* Main Sunday Worship */}
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-start justify-between gap-2">
                        <div>
                          <span className="text-white font-semibold block text-[11px] sm:text-[12px]">Sunday Main Worship Service</span>
                          <span className="text-slate-400 text-[10px]">Expository Preaching & Praise</span>
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-dpc-gold-300 bg-dpc-gold-500/15 border border-dpc-gold-500/30 px-2 py-1 rounded-lg shrink-0">
                          9:40 AM – 11:30 AM
                        </span>
                      </div>

                      {/* Sunday School & Bible Study */}
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-start justify-between gap-2">
                        <div>
                          <span className="text-white font-semibold block text-[11px] sm:text-[12px]">Sunday School & Bible Study</span>
                          <span className="text-slate-400 text-[10px]">Kids, Youth, Adults & Discipleship</span>
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 px-2 py-1 rounded-lg shrink-0">
                          8:00 AM – 9:30 AM
                        </span>
                      </div>

                      {/* Midweek Prayer */}
                      <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[11px] text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-dpc-gold-400" />
                          <span>Midweek Wednesday Prayer</span>
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">Wed 5:30 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Digital Connect & Social Channels */}
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                        <span className="text-[11px] text-slate-400">Email:</span>
                        <a
                          href={`mailto:${CHURCH_INFO.contact.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-white hover:text-dpc-gold-300 text-xs font-medium truncate"
                        >
                          {CHURCH_INFO.contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {/* Facebook Messenger Button */}
                      <a
                        href="https://m.me/DaetPresbyterianChurch"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#0084FF]/20 hover:bg-[#0084FF]/35 border border-[#0084FF]/40 text-xs font-bold text-white transition-all shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5 fill-current text-[#0084FF] shrink-0" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.454 5.512 3.737 7.18V22l3.415-1.874c.904.25 1.86.386 2.848.386 5.523 0 10-4.145 10-9.254C22 6.145 17.523 2 12 2zm1.066 12.453l-2.673-2.852-5.215 2.852 5.736-6.09 2.74 2.852 5.148-2.852-5.736 6.09z" />
                        </svg>
                        <span>Messenger</span>
                      </a>

                      {/* YouTube Live Button */}
                      <a
                        href={CHURCH_INFO.contact.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/35 border border-red-500/40 text-xs font-bold text-white transition-all shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5 text-red-500 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span>YouTube</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Plan a Visit Button on Back */}
                <div className="pt-4 mt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlanVisitClick();
                    }}
                    className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow text-center cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Plan a Visit to DPC</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: Interactive Expandable Google Map Container                       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[580px] sm:min-h-[620px] lg:min-h-[640px]">
            <ExpandMap
              label="CURRENT LOCATION & DIRECTIONS"
              title={CHURCH_INFO.name}
              subtitle={CHURCH_INFO.centerName}
              location="Daet, Camarines Norte"
              address={`${CHURCH_INFO.address.street}, ${CHURCH_INFO.address.barangay}, ${CHURCH_INFO.address.municipality}, ${CHURCH_INFO.address.province} ${CHURCH_INFO.address.zipCode}`}
              landmark={CHURCH_INFO.address.landmark}
              googleMapsUrl={CHURCH_INFO.address?.mapCoordinates?.googleMapsUrl ?? "https://maps.google.com/?q=14.108300,122.959450"}
              mapEmbedUrl={CHURCH_INFO.address?.mapCoordinates?.embedUrl ?? "https://maps.google.com/maps?q=14.108300,122.959450&t=&z=18&ie=UTF8&iwloc=&output=embed"}
              lat={CHURCH_INFO.address.mapCoordinates.lat}
              lng={CHURCH_INFO.address.mapCoordinates.lng}
              coordinates={`${CHURCH_INFO.address.mapCoordinates.lat.toFixed(4)}° N, ${CHURCH_INFO.address.mapCoordinates.lng.toFixed(4)}° E`}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default LocationMapSection;

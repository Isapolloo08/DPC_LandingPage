import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ShieldCheck, BookOpen, Clock, MapPin, Compass, Phone, Users } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';
import { MINISTRIES_DATA } from '../../data/ministriesData';
import { Ministry } from '../../types/church';
import { fetchMinistries } from '../../services/api';
import { ScriptureReveal } from '../ui/ScriptureReveal';

interface HeroBannerProps {
  onPlanVisitClick: () => void;
}

// Smooth Animated Number Counter for Stats Strip
const AnimatedCounter: React.FC<{
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}> = ({ target, suffix = '', prefix = '', duration = 1.6 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const HeroBanner: React.FC<HeroBannerProps> = ({ onPlanVisitClick }) => {
  // 3D Tilt, Flip & Mouse Tracking State for the Hero Image
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Live Ministries from Backend Database (with graceful local fallback)
  const [ministries, setMinistries] = useState<Ministry[]>(MINISTRIES_DATA);
  const [isLiveMinistries, setIsLiveMinistries] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function loadMinistries() {
      const res = await fetchMinistries();
      if (isMounted && res.data && res.data.length > 0) {
        setMinistries(res.data);
        setIsLiveMinistries(res.isLive);
      }
    }
    loadMinistries();
    return () => { isMounted = false; };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return; // Keep level when reading the back side
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

  // Animation variants for Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 25 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero-pattern pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[500px] sm:w-[700px] h-[400px] radial-cross-glow blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] radial-blue-glow blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute inset-0 bg-church-grid opacity-25 pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col">
        {/* Main 2-Column Split: Content Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT SIDE: Text, Badges, Scripture, and CTAs (Staggered Animation) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-start text-left space-y-6"
          >
            {/* Top Badges */}
            <motion.div variants={itemVariants} className="inline-flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-dpc-navy-800/90 border border-dpc-gold-500/40 text-[11px] sm:text-xs md:text-sm font-medium text-dpc-gold-300 shadow-gold-glow">
                <span className="w-2 h-2 rounded-full bg-dpc-gold-400 animate-ping"></span>
                <span>Daet, Camarines Norte, Philippines</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs md:text-sm text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span>Reformed • Presbyterian • Evangelical</span>
              </div>
            </motion.div>

            {/* Main Title Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold font-serif tracking-tight text-white leading-tight">
                Daet Presbyterian Church
              </h1>

              {/* Secondary Subheading */}
              <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                <span className="h-px w-6 sm:w-14 bg-gradient-to-r from-dpc-gold-400 to-transparent"></span>
                <p className="text-xs sm:text-base md:text-lg lg:text-xl font-display font-semibold gold-shimmer uppercase tracking-wider sm:tracking-widest">
                  {CHURCH_INFO.centerName}
                </p>
                <span className="h-px w-6 sm:w-14 bg-gradient-to-l from-dpc-gold-400 to-transparent"></span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-base lg:text-lg text-slate-300 font-light leading-relaxed max-w-xl"
            >
              A loving gospel-centered family in Bicol dedicated to the glory of God, the expository proclamation of Scripture, vibrant youth discipleship, and Christ-like community.
            </motion.p>

            {/* Featured Scripture Card with Word-by-Word Reveal (Romans 12:5) */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-xl glass-panel-gold rounded-2xl p-3.5 sm:p-5 text-left relative overflow-hidden group border-dpc-gold-500/30 hover:border-dpc-gold-400/60 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-dpc-gold-500/5 rounded-full blur-xl group-hover:bg-dpc-gold-500/15 transition-all pointer-events-none"></div>

              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-dpc-gold-500/10 border border-dpc-gold-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4 text-dpc-gold-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-dpc-gold-400">
                      Our Uniting Theme Verse
                    </p>
                    <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded bg-dpc-navy-950/90 border border-dpc-gold-500/40 text-[10px] sm:text-[11px] font-bold font-serif text-dpc-gold-300 shrink-0">
                      {CHURCH_INFO.verseRef}
                    </span>
                  </div>
                  
                  {/* Storytelling Word-by-Word Scripture Reveal */}
                  <ScriptureReveal
                    quote={CHURCH_INFO.verseText}
                    showQuoteMarks={false}
                    highlightWords={['body', 'Christ', 'one', 'members']}
                    quoteClassName="text-xs sm:text-sm italic text-slate-100 font-serif leading-relaxed"
                    staggerDelay={0.035}
                    initialDelay={0.25}
                  />
                </div>
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 w-full sm:w-auto pt-2"
            >
              <button
                onClick={onPlanVisitClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-dpc-navy-950 shrink-0" />
                <span>Plan Your First Visit</span>
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-100 bg-dpc-navy-900/90 hover:bg-dpc-navy-800 border border-dpc-gold-500/40 hover:border-dpc-gold-400 shadow-lg shadow-black/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                <Clock className="w-4 h-4 text-dpc-gold-400 shrink-0" />
                <span>Worship Times & Schedule</span>
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Church Building Image with Interactive 3D Flip Card */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 relative w-full flex items-center justify-center mt-6 lg:mt-0"
            style={{ perspective: 1200 }}
          >
            {/* Ambient Multi-layer Backlight Glow */}
            <div className="absolute -inset-3 sm:-inset-5 bg-gradient-to-tr from-dpc-gold-500/20 via-blue-600/15 to-dpc-gold-400/20 rounded-[2.5rem] blur-2xl -z-10 pointer-events-none animate-pulse"></div>

            {/* 3D Perspective Flip Card Container */}
            <div
              onClick={toggleFlip}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-[460px] xs:h-[500px] sm:h-[520px] lg:h-[540px] xl:h-[580px] rounded-3xl group cursor-pointer"
              style={{ perspective: 1200 }}
            >
              {/* FRONT SIDE: Sanctuary & Youth Center Photo */}
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
                className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-dpc-navy-950 border border-white/10 hover:border-dpc-gold-400/60 shadow-2xl transition-colors duration-300"
              >
                <img
                  src="/images/church-building.jpg"
                  alt="Daet Presbyterian Church & Camarines Norte Youth Center Building"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle bottom shadow vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-dpc-navy-950/95 via-dpc-navy-950/20 to-transparent pointer-events-none" />

                {/* Interactive Dynamic Glare */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle 350px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.15), transparent 70%)`,
                  }}
                />
              </motion.div>

              {/* BACK SIDE: Church Information & Quick Facts (100% Razor Sharp Vector Text) */}
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
                className="absolute inset-0 w-full h-full rounded-3xl overflow-y-auto no-scrollbar p-4 sm:p-6 bg-[#071324] border border-dpc-gold-500/60 flex flex-col justify-between shadow-2xl text-left"
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
                        <span>Lord's Day & Weekly Gatherings</span>
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        <div className="bg-[#081220] p-2 rounded-lg border border-dpc-gold-500/40 shadow-sm">
                          <p className="font-bold text-white text-[11px]">Main Worship</p>
                          <p className="text-[11px] text-dpc-gold-300 font-bold">9:40 AM – 11:30 AM</p>
                          <p className="text-[10px] text-slate-300">All Ages / Adults</p>
                        </div>
                        <div className="bg-[#081220] p-2 rounded-lg border border-white/10">
                          <p className="font-bold text-white text-[11px]">Adult Bible Study</p>
                          <p className="text-[11px] text-dpc-gold-300 font-bold">8:00 AM – 9:30 AM</p>
                          <p className="text-[10px] text-slate-300">Junior & Old Adults</p>
                        </div>
                        <div className="bg-[#081220] p-2 rounded-lg border border-white/10">
                          <p className="font-bold text-white text-[11px]">High School Service</p>
                          <p className="text-[11px] text-dpc-gold-300 font-bold">8:00 AM – 11:30 AM</p>
                          <p className="text-[10px] text-slate-300">Worship + Study</p>
                        </div>
                        <div className="bg-[#081220] p-2 rounded-lg border border-white/10">
                          <p className="font-bold text-white text-[11px]">Kids Sunday School</p>
                          <p className="text-[11px] text-dpc-gold-300 font-bold">8:00 AM – 11:30 AM</p>
                          <p className="text-[10px] text-slate-300">Study + Play/Movie</p>
                        </div>
                        <div className="bg-[#081220] p-2 rounded-lg border border-white/10">
                          <p className="font-bold text-white text-[11px]">Prayer Meeting</p>
                          <p className="text-[11px] text-dpc-gold-300 font-bold">Wed • 5:30 PM</p>
                          <p className="text-[10px] text-slate-300">Corporate Prayer</p>
                        </div>
                        <div className="bg-[#081220] p-2 rounded-lg border border-white/10">
                          <p className="font-bold text-white text-[11px]">Youth Discipleship</p>
                          <p className="text-[11px] text-dpc-gold-300 font-bold">Weekly Groups</p>
                          <p className="text-[10px] text-slate-300">Campus / YP Circles</p>
                        </div>
                      </div>
                    </div>

                    {/* Generational Ministries Showcase (From Live Database) */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#0c1a2e] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <p className="text-dpc-gold-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                            <span>{ministries.length} Generational Ministries</span>
                          </p>
                        </div>
                        <a
                          href="#ministries"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] text-dpc-gold-300 hover:text-dpc-gold-200 font-bold underline underline-offset-2 transition-colors"
                        >
                          Explore all →
                        </a>
                      </div>

                      <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto no-scrollbar">
                        {ministries.map((m, idx) => {
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

                {/* Back Footer In-Page Quick Navigation */}
                <div className="pt-2.5 mt-2 border-t border-white/15 flex flex-col xs:flex-row items-stretch xs:items-center gap-2">
                  <a
                    href="#location"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 text-dpc-navy-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-gold-glow cursor-pointer text-center"
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>View Interactive Map ↓</span>
                  </a>

                  <a
                    href="#what-to-expect"
                    onClick={(e) => e.stopPropagation()}
                    className="py-2.5 px-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/20 transition-all cursor-pointer text-center"
                  >
                    <Compass className="w-3.5 h-3.5 text-dpc-gold-300 shrink-0" />
                    <span>What to Expect ↓</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM FULL-WIDTH STATS STRIP (With Animated Counters & Hover Glow) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 w-full mt-10 sm:mt-16"
        >
          <div className="glass-panel rounded-2xl p-3 sm:p-4 text-center border-white/5 hover:border-dpc-gold-500/40 hover:bg-white/[0.04] transition-all hover:-translate-y-1 duration-300 group shadow-lg">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-dpc-gold-300 group-hover:text-dpc-gold-200 transition-colors">
              <AnimatedCounter target={19} suffix="+ Yrs" />
            </p>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 mt-1 font-medium">Years of Gospel Ministry</p>
          </div>

          <div className="glass-panel rounded-2xl p-3 sm:p-4 text-center border-white/5 hover:border-dpc-gold-500/40 hover:bg-white/[0.04] transition-all hover:-translate-y-1 duration-300 group shadow-lg">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-dpc-gold-300 group-hover:text-dpc-gold-200 transition-colors">
              <AnimatedCounter target={7} />
            </p>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 mt-1 font-medium">Generational Ministries</p>
          </div>

          <div className="glass-panel rounded-2xl p-3 sm:p-4 text-center border-white/5 hover:border-dpc-gold-500/40 hover:bg-white/[0.04] transition-all hover:-translate-y-1 duration-300 group shadow-lg">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-dpc-gold-300 group-hover:text-dpc-gold-200 transition-colors">
              <AnimatedCounter target={3} />
            </p>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 mt-1 font-medium">Weekly Gatherings</p>
          </div>

          <div className="glass-panel rounded-2xl p-3 sm:p-4 text-center border-white/5 hover:border-dpc-gold-500/40 hover:bg-white/[0.04] transition-all hover:-translate-y-1 duration-300 group shadow-lg">
            <div className="flex items-center justify-center gap-1.5 text-xl sm:text-2xl md:text-3xl font-bold font-serif text-dpc-gold-300 group-hover:text-dpc-gold-200 transition-colors">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-dpc-gold-400 animate-pulse shrink-0" />
              <span>9:40 AM</span>
            </div>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 mt-1 font-medium">Sunday Worship Service</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

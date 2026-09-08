import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ShieldCheck, BookOpen, Clock } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';

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
  // 3D Tilt & Mouse Tracking State for the Hero Image
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dpc-navy-800/90 border border-dpc-gold-500/40 text-xs sm:text-sm font-medium text-dpc-gold-300 shadow-gold-glow">
                <span className="w-2 h-2 rounded-full bg-dpc-gold-400 animate-ping"></span>
                <span>Daet, Camarines Norte, Philippines</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Reformed • Presbyterian • Evangelical</span>
              </div>
            </motion.div>

            {/* Main Title Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold font-serif tracking-tight text-white leading-tight">
                Daet Presbyterian Church
              </h1>

              {/* Secondary Subheading */}
              <div className="flex items-center gap-3 mt-3">
                <span className="h-px w-8 sm:w-14 bg-gradient-to-r from-dpc-gold-400 to-transparent"></span>
                <p className="text-sm sm:text-lg md:text-xl font-display font-semibold gold-shimmer uppercase tracking-widest">
                  {CHURCH_INFO.centerName}
                </p>
                <span className="h-px w-8 sm:w-14 bg-gradient-to-l from-dpc-gold-400 to-transparent"></span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base lg:text-lg text-slate-300 font-light leading-relaxed max-w-xl"
            >
              A loving gospel-centered family in Bicol dedicated to the glory of God, the expository proclamation of Scripture, vibrant youth discipleship, and Christ-like community.
            </motion.p>

            {/* Featured Scripture Card (Romans 12:5) */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-xl glass-panel-gold rounded-2xl p-4 sm:p-5 text-left relative overflow-hidden group border-dpc-gold-500/30 hover:border-dpc-gold-400/60 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-dpc-gold-500/5 rounded-full blur-xl group-hover:bg-dpc-gold-500/15 transition-all"></div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-dpc-gold-500/10 border border-dpc-gold-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4 text-dpc-gold-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-dpc-gold-400">
                      Our Uniting Theme Verse
                    </p>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-dpc-navy-950/90 border border-dpc-gold-500/40 text-[11px] font-bold font-serif text-dpc-gold-300 shrink-0">
                      {CHURCH_INFO.verseRef}
                    </span>
                  </div>
                  <blockquote className="text-xs sm:text-sm italic text-slate-100 font-serif leading-relaxed">
                    “{CHURCH_INFO.verseText}”
                  </blockquote>
                </div>
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2"
            >
              <button
                onClick={onPlanVisitClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-dpc-navy-950" />
                <span>Plan Your First Visit</span>
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-100 bg-dpc-navy-900/90 hover:bg-dpc-navy-800 border border-dpc-gold-500/40 hover:border-dpc-gold-400 shadow-lg shadow-black/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Clock className="w-4 h-4 text-dpc-gold-400" />
                <span>Worship Times & Schedule</span>
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Church Building Image with Interactive 3D Tilt & Lighting */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 relative w-full flex items-center justify-center mt-6 lg:mt-0"
          >
            {/* Ambient Multi-layer Backlight Glow */}
            <div className="absolute -inset-3 sm:-inset-5 bg-gradient-to-tr from-dpc-gold-500/20 via-blue-600/15 to-dpc-gold-400/20 rounded-[2.5rem] blur-2xl -z-10 pointer-events-none animate-pulse"></div>

            {/* 3D Perspective Tilt Card */}
            <motion.div
              animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                scale: isHovered ? 1.015 : 1,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              style={{ transformPerspective: 1000, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] xl:h-[580px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-white/10 hover:border-dpc-gold-400/50 transition-colors duration-500 bg-dpc-navy-950"
            >
              {/* Church Building Image */}
              <img
                src="/images/church-building.jpg"
                alt="Daet Presbyterian Church & Camarines Norte Youth Center Building"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Interactive Dynamic Glare / Light Reflection */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle 350px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.15), transparent 70%)`,
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* BOTTOM FULL-WIDTH STATS STRIP (With Animated Counters & Hover Glow) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full mt-12 sm:mt-16"
        >
          <div className="glass-panel rounded-2xl p-4 text-center border-white/5 hover:border-dpc-gold-500/40 hover:bg-white/[0.04] transition-all hover:-translate-y-1 duration-300 group shadow-lg">
            <p className="text-2xl sm:text-3xl font-bold font-serif text-dpc-gold-300 group-hover:text-dpc-gold-200 transition-colors">
              <AnimatedCounter target={40} suffix="+ Yrs" />
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Faithful Gospel Witness</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 text-center border-white/5 hover:border-dpc-gold-500/40 hover:bg-white/[0.04] transition-all hover:-translate-y-1 duration-300 group shadow-lg">
            <p className="text-2xl sm:text-3xl font-bold font-serif text-dpc-gold-300 group-hover:text-dpc-gold-200 transition-colors">
              <AnimatedCounter target={7} />
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Generational Ministries</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 text-center border-white/5 hover:border-dpc-gold-500/40 hover:bg-white/[0.04] transition-all hover:-translate-y-1 duration-300 group shadow-lg">
            <p className="text-2xl sm:text-3xl font-bold font-serif text-dpc-gold-300 group-hover:text-dpc-gold-200 transition-colors">
              <AnimatedCounter target={100} suffix="%" />
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Christ-Centered Fellowship</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 text-center border-white/5 hover:border-dpc-gold-500/40 hover:bg-white/[0.04] transition-all hover:-translate-y-1 duration-300 group shadow-lg">
            <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-bold font-serif text-dpc-gold-300 group-hover:text-dpc-gold-200 transition-colors">
              <Clock className="w-5 h-5 text-dpc-gold-400 animate-pulse" />
              <span>9:00 AM</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Sunday Divine Worship</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

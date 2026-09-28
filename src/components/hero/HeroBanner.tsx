import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, MapPin, BookOpen, ArrowRight } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';
import { ImageStreamHero, StreamImage } from '@/components/ui/image-stream-hero';

// Import real authentic photos from ministry folders
import streamKinder from '@/assets/Kinder Ministry/516368798_4004060663255125_3940156298598136062_n.jpg';
import streamElem from '@/assets/Elementary Ministry/480577141_481392148377786_6333824624822562519_n.jpg';
import streamHs from '@/assets/High School Ministry/680044493_935616212628115_2898471636377619378_n.jpg';
import streamYouthCamp from '@/assets/Youth Ministry/656680392_958771106489110_8611197159791022889_n.jpg';
import streamYouthPraise from '@/assets/Youth Ministry/714759264_1015627274136826_7581065074620186600_n.jpg';
import streamYA from '@/assets/Young Adult Ministry/505320113_661118810260117_450252600683907860_n.jpg';
import streamCouples from '@/assets/Junior Adult Minitry/615576920_889621683718381_8998977265371590367_n.jpg';
import streamSeniors from '@/assets/Old Adult Ministry/722769534_122172250904944863_7045558778597727105_n.jpg';

// Curated church photos
const HERO_STREAM_IMAGES: StreamImage[] = [
  {
    src: '/images/church-building.jpg',
    alt: 'Daet Presbyterian Church sanctuary building and Camarines Norte Youth Center',
  },
  {
    src: streamYouthPraise,
    alt: 'DPC Sanctuary Acoustic Praise & Band Exaltation Team',
  },
  {
    src: streamYouthCamp,
    alt: 'Camarines Norte Youth Camp & Retreat Gathering',
  },
  {
    src: streamKinder,
    alt: 'Seeds of Grace Sunday School & Children Bible Storytelling',
  },
  {
    src: streamHs,
    alt: 'Ignite Teens High School Fellowship & Discipleship',
  },
  {
    src: streamElem,
    alt: 'Covenant Kids Elementary Sunday School & Vacation Bible School',
  },
  {
    src: streamYA,
    alt: 'Ambassadors for Christ Young Adults Roundtable & Fellowship',
  },
  {
    src: streamCouples,
    alt: 'Pillars of Faith Couples & Family Covenant Retreat',
  },
  {
    src: streamSeniors,
    alt: 'Golden Heritage Senior Saints Morning Devotions & Prayer',
  },
];

interface HeroBannerProps {
  onPlanVisitClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onPlanVisitClick }) => {
  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative min-h-[95vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-dpc-navy-950 pt-20 sm:pt-24 pb-8">
      
      {/* ========================================================================= */}
      {/* 3D MOVING IMAGE STREAM CORRIDOR (Flanking Perspective Rails)              */}
      {/* ========================================================================= */}
      <ImageStreamHero
        images={HERO_STREAM_IMAGES}
        speed={22}
        cards={8}
        axis={50}
        path={{
          perspective: 32,
          cardWidth: 17,
          cardHeight: 24,
          railBirth: -4,
          railExit: 48,
          fan: 2.8,
        }}
        className="min-h-[75vh] sm:min-h-[80vh] w-full flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Deep Atmospheric Gradient Layers for Clean Contrast & Sacred Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-dpc-navy-950 via-dpc-navy-950/70 to-dpc-navy-950/90 pointer-events-none z-0" />
        <div className="absolute inset-y-0 left-0 w-32 sm:w-64 bg-gradient-to-r from-dpc-navy-950 via-dpc-navy-950/80 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-y-0 right-0 w-32 sm:w-64 bg-gradient-to-l from-dpc-navy-950 via-dpc-navy-950/80 to-transparent pointer-events-none z-0" />
        
        {/* Soft Golden Ambient Rim Light in Center Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[500px] bg-radial-gradient from-dpc-gold-500/10 via-dpc-navy-950/90 to-dpc-navy-950 pointer-events-none z-0 rounded-full blur-3xl" />

        {/* ========================================================================= */}
        {/* CENTER CONTENT: Refined Editorial Church Hero                             */}
        {/* ========================================================================= */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col items-center text-center my-auto">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center space-y-6 sm:space-y-7 w-full"
          >
            {/* 1. Refined Location & Tradition Pill Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-dpc-navy-900/90 border border-dpc-gold-500/30 text-xs sm:text-sm font-medium text-slate-200 backdrop-blur-md shadow-lg shadow-black/40">
                <MapPin className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                <span>Daet, Camarines Norte</span>
                <span className="text-white/20">/</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-dpc-gold-300 font-semibold">Reformed Presbyterian</span>
              </div>
            </motion.div>

            {/* 2. Main Title Heading (H1) with Gold Accent & Tagline */}
            <motion.div variants={itemVariants} className="space-y-3 max-w-3xl">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white leading-[1.1] drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]">
                Daet Presbyterian <span className="text-transparent bg-clip-text bg-gradient-to-r from-dpc-gold-300 via-amber-200 to-dpc-gold-400">Church</span>
              </h1>

              {/* Tagline Motto */}
              <p className="text-xs sm:text-sm md:text-base font-display font-medium tracking-[0.2em] text-dpc-gold-300 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                {CHURCH_INFO.tagline}
              </p>
            </motion.div>

            {/* 3. Single Concise Supporting Sentence */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-200/90 font-light leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            >
              A loving, gospel-centered family in Bicol dedicated to Biblical truth, Christ-exalting worship, and warm fellowship.
            </motion.p>

            {/* 4. Primary Action Button & Worship Times CTA */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto pt-2"
            >
              <button
                type="button"
                id="hero-primary-cta"
                onClick={onPlanVisitClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-dpc-navy-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_4px_24px_rgba(234,179,8,0.3)] hover:shadow-[0_6px_32px_rgba(234,179,8,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
              >
                <span>Plan Your First Visit</span>
                <ArrowRight className="w-4 h-4 text-dpc-navy-950 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                id="hero-services-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-sm sm:text-base font-semibold text-slate-100 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-amber-400/50 shadow-lg shadow-black/40 backdrop-blur-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                <Clock className="w-4 h-4 text-dpc-gold-400 shrink-0" />
                <span>Worship Times & Schedule</span>
              </a>
            </motion.div>

          </motion.div>
        </div>
      </ImageStreamHero>

      {/* ========================================================================= */}
      {/* SCRIPTURE ANCHOR DOCK (Our Uniting Theme Verse)                             */}
      {/* Positioned gracefully at the bottom transition into Service Times          */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 mt-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-dpc-navy-900/90 via-dpc-navy-900/80 to-dpc-navy-900/90 border border-dpc-gold-500/30 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dpc-gold-400/50 to-transparent" />
          
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-dpc-gold-500/15 border border-dpc-gold-500/40 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-dpc-gold-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-dpc-gold-400">Our Uniting Verse</p>
                <p className="text-xs font-serif font-bold text-slate-200">{CHURCH_INFO.verseRef}</p>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm font-serif italic text-slate-200/95 leading-relaxed sm:border-l sm:border-white/15 sm:pl-4">
              "{CHURCH_INFO.verseText}"
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroBanner;

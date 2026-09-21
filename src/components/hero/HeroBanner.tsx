import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Clock, MapPin, BookOpen } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';
import { ImageStreamHero, StreamImage } from '@/components/ui/image-stream-hero';
import { ScriptureReveal } from '../ui/ScriptureReveal';

// Import real authentic photos from ministry folders
import streamKinder from '@/assets/Kinder Ministry/516368798_4004060663255125_3940156298598136062_n.jpg';
import streamElem from '@/assets/Elementary Ministry/480577141_481392148377786_6333824624822562519_n.jpg';
import streamHs from '@/assets/High School Ministry/680044493_935616212628115_2898471636377619378_n.jpg';
import streamYouthCamp from '@/assets/Youth Ministry/656680392_958771106489110_8611197159791022889_n.jpg';
import streamYouthPraise from '@/assets/Youth Ministry/714759264_1015627274136826_7581065074620186600_n.jpg';
import streamYA from '@/assets/Young Adult Ministry/505320113_661118810260117_450252600683907860_n.jpg';
import streamCouples from '@/assets/Junior Adult Minitry/615576920_889621683718381_8998977265371590367_n.jpg';
import streamSeniors from '@/assets/Old Adult Ministry/722769534_122172250904944863_7045558778597727105_n.jpg';

// Curated church photos with the church sanctuary building included prominently
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
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center overflow-hidden bg-dpc-navy-950 pt-20 sm:pt-24 pb-8">
      
      {/* ========================================================================= */}
      {/* 3D MOVING IMAGE STREAM CORRIDOR (Full-Width Animated Perspective Tunnel)   */}
      {/* ========================================================================= */}
      <ImageStreamHero
        images={HERO_STREAM_IMAGES}
        speed={20}
        cards={8}
        axis={50}
        className="min-h-[85vh] sm:min-h-[90vh] w-full flex items-center justify-center relative overflow-hidden"
      >
        {/* Dark Vignettes & Deep Overlays for 100% WCAG AA Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-dpc-navy-950 via-dpc-navy-950/40 to-dpc-navy-950/80 pointer-events-none z-0" />
        <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-dpc-navy-950 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-dpc-navy-950 to-transparent pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-radial-gradient from-dpc-navy-950/90 via-dpc-navy-950/70 to-transparent pointer-events-none z-0 rounded-full blur-2xl" />

        {/* ========================================================================= */}
        {/* CENTER CONTENT: Floating Typography, Scripture & Action Buttons          */}
        {/* ========================================================================= */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center text-center">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center space-y-4 sm:space-y-5"
          >
            {/* Top Badges / Chips */}
            <motion.div variants={itemVariants} className="inline-flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-dpc-navy-900/90 border border-dpc-gold-500/40 text-[11px] sm:text-xs font-semibold text-dpc-gold-300 shadow-gold-glow backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-dpc-gold-400 animate-ping" />
                <MapPin className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                <span>Daet, Camarines Norte, Philippines</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-dpc-navy-900/80 border border-white/10 text-[11px] sm:text-xs text-slate-300 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Reformed • Presbyterian • Evangelical</span>
              </div>
            </motion.div>

            {/* Main Title Heading (H1) */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tight text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                {CHURCH_INFO.name}
              </h1>

              {/* Tagline */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 pt-1">
                <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent via-dpc-gold-400 to-transparent" />
                <p className="text-xs sm:text-base md:text-lg font-display font-semibold gold-shimmer uppercase tracking-wider sm:tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  {CHURCH_INFO.centerName}
                </p>
                <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent via-dpc-gold-400 to-transparent" />
              </div>
            </motion.div>

            {/* Short Description */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            >
              A loving gospel-centered family in Bicol dedicated to the glory of God, the expository proclamation of Scripture, vibrant youth discipleship, and Christ-like community.
            </motion.p>

            {/* Featured Scripture Card with Word-by-Word Storytelling Reveal */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-2xl glass-panel-gold rounded-2xl p-4 sm:p-5 text-left relative overflow-hidden group border-dpc-gold-500/40 shadow-2xl backdrop-blur-lg"
            >
              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-dpc-gold-500/10 border border-dpc-gold-500/30 flex items-center justify-center shrink-0 mt-0.5">
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
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto pt-2"
            >
              <button
                type="button"
                onClick={onPlanVisitClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-dpc-navy-950 shrink-0" />
                <span>Plan Your First Visit</span>
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-100 bg-dpc-navy-900/90 hover:bg-dpc-navy-800 border border-dpc-gold-500/40 hover:border-dpc-gold-400 shadow-lg shadow-black/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center backdrop-blur-md"
              >
                <Clock className="w-4 h-4 text-dpc-gold-400 shrink-0" />
                <span>Worship Times & Schedule</span>
              </a>
            </motion.div>

          </motion.div>
        </div>
      </ImageStreamHero>
    </section>
  );
};

export default HeroBanner;

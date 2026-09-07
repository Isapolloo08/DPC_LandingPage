import React from 'react';
import { Sparkles, ShieldCheck, BookOpen, Clock, MapPin, Church } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';

interface HeroBannerProps {
  onPlanVisitClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onPlanVisitClick }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-hero-pattern pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[500px] sm:w-[700px] h-[400px] radial-cross-glow blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] radial-blue-glow blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute inset-0 bg-church-grid opacity-25 pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col">

        {/* Main 2-Column Split: Content Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT SIDE: Text, Badges, Scripture, and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

            {/* Top Badges */}
            <div className="inline-flex flex-wrap items-center gap-2 animate-float-slow">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dpc-navy-800/90 border border-dpc-gold-500/40 text-xs sm:text-sm font-medium text-dpc-gold-300 shadow-gold-glow">
                <span className="w-2 h-2 rounded-full bg-dpc-gold-400 animate-ping"></span>
                <span>Daet, Camarines Norte, Philippines</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Reformed • Presbyterian • Evangelical</span>
              </div>
            </div>

            {/* Main Title Heading */}
            <div>
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
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
              A loving gospel-centered family in Bicol dedicated to the glory of God, the expository proclamation of Scripture, vibrant youth discipleship, and Christ-like community.
            </p>

            {/* Featured Scripture Card (Romans 12:5) */}
            <div className="w-full max-w-xl glass-panel-gold rounded-2xl p-4 sm:p-5 text-left relative overflow-hidden group border-dpc-gold-500/30">
              <div className="absolute top-0 right-0 w-28 h-28 bg-dpc-gold-500/5 rounded-full blur-xl group-hover:bg-dpc-gold-500/15 transition-all"></div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-dpc-gold-500/10 border border-dpc-gold-500/30 flex items-center justify-center shrink-0 mt-0.5">
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
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
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
            </div>

          </div>

          {/* RIGHT SIDE: Church Building Image with 5 Surrounding Facility Feature Callouts */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center justify-center mt-8 lg:mt-0">

            {/* Ambient Backlight Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-dpc-gold-500/25 via-dpc-navy-700/40 to-dpc-gold-500/15 rounded-3xl blur-3xl transform scale-95 pointer-events-none -z-10"></div>

            {/* Main Interactive Building Stage */}
            <div className="relative w-full max-w-lg lg:max-w-none group rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-dpc-gold-500/40 via-white/10 to-dpc-navy-900/90 border border-dpc-gold-500/40 hero-image-glow backdrop-blur-md transition-all duration-500 hover:border-dpc-gold-400">

              {/* Corner Brass/Tech Accents */}
              <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-dpc-gold-400 rounded-tl pointer-events-none z-20"></div>
              <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-dpc-gold-400 rounded-tr pointer-events-none z-20"></div>
              <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-dpc-gold-400 rounded-bl pointer-events-none z-20"></div>
              <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-dpc-gold-400 rounded-br pointer-events-none z-20"></div>

              {/* Photo Frame Container */}
              <div className="relative w-full h-84 sm:h-96 lg:h-[430px] rounded-2xl overflow-hidden shadow-2xl bg-dpc-navy-950">
                <img
                  src="/images/church-building.jpg"
                  alt="Daet Presbyterian Church & Camarines Norte Youth Center Building"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Cinematic Vignette & Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dpc-navy-950/90 via-black/15 to-black/30 pointer-events-none"></div>

                {/* --- Interactive Hotspot Radar Pins on the Photo --- */}

                {/* 1. Hotspot: Rooftop Cross & Tower */}
                <div className="absolute top-[8%] left-[34%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dpc-gold-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-dpc-gold-500/90 border border-white items-center justify-center text-[9px] font-bold text-dpc-navy-950 shadow-gold-glow">1</span>
                  </span>
                </div>

                {/* 2. Hotspot: Upper Worship Sanctuary (Arched Windows) */}
                <div className="absolute top-[34%] right-[28%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border border-white items-center justify-center text-[9px] font-bold text-white shadow-lg">2</span>
                  </span>
                </div>

                {/* 3. Hotspot: Camarines Norte Youth Center (CNYC Wing) */}
                <div className="absolute top-[48%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-500 border border-white items-center justify-center text-[9px] font-bold text-white shadow-lg">3</span>
                  </span>
                </div>

                {/* 4. Hotspot: Main Foyer & Gate Entrance */}
                <div className="absolute bottom-[28%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 border border-white items-center justify-center text-[9px] font-bold text-dpc-navy-950 shadow-lg">4</span>
                  </span>
                </div>

                {/* 5. Hotspot: Gated Courtyard & Parking */}
                <div className="absolute bottom-[24%] right-[32%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-cyan-500 border border-white items-center justify-center text-[9px] font-bold text-dpc-navy-950 shadow-lg">5</span>
                  </span>
                </div>

                {/* Bottom Center Building Label Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 flex items-end justify-between bg-gradient-to-t from-dpc-navy-950 via-dpc-navy-950/90 to-transparent">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-dpc-gold-400 bg-dpc-navy-900/90 px-2 py-0.5 rounded border border-dpc-gold-500/30 inline-block mb-1">
                      Daet, Camarines Norte • F. Pimentel Ave.
                    </span>
                    <h3 className="text-sm sm:text-base font-bold font-serif text-white tracking-wide drop-shadow-md">
                      Daet Presbyterian Church Facility
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-dpc-navy-900/90 border border-dpc-gold-500/50 flex items-center justify-center text-dpc-gold-400 shadow-gold-glow shrink-0">
                    <Church className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* --- FLOATING FACILITY CALLOUT BADGES (SURROUNDING) --- */}
              {/* ========================================================= */}

              {/* 1. TOP CALLOUT (Cross & Prayer Tower) */}
              <div className="hidden sm:flex absolute -top-5 left-1/2 -translate-x-1/2 glass-panel-gold py-1.5 px-3.5 rounded-full border border-dpc-gold-500/50 shadow-2xl items-center gap-2 animate-float-badge z-30">
                <span className="w-4 h-4 rounded-full bg-dpc-gold-500/30 border border-dpc-gold-400 text-dpc-gold-300 flex items-center justify-center text-[10px] font-bold">1</span>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-white tracking-tight flex items-center gap-1">
                    ✝️ Soli Deo Gloria Cross Tower
                  </span>
                </div>
              </div>

              {/* 2. TOP-RIGHT CALLOUT (Main Worship Sanctuary) */}
              <div className="hidden sm:flex absolute -top-3 -right-3 lg:-right-6 glass-panel py-2 px-3 rounded-xl border border-emerald-500/40 shadow-xl items-center gap-2.5 animate-float-badge-delayed z-30 max-w-[190px]">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-400 text-emerald-300 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <div className="text-left leading-tight">
                  <p className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider">Upper Levels</p>
                  <p className="text-[11px] font-bold text-white">Main Worship Sanctuary</p>
                  <p className="text-[9px] text-slate-300 font-light">Air-conditioned 300+ seats</p>
                </div>
              </div>

              {/* 3. LEFT CALLOUT (Camarines Norte Youth Center) */}
              <div className="hidden sm:flex absolute top-1/2 -left-4 lg:-left-7 -translate-y-1/2 glass-panel py-2 px-3 rounded-xl border border-blue-500/40 shadow-xl items-center gap-2.5 animate-float-badge z-30 max-w-[185px]">
                <span className="w-5 h-5 rounded-full bg-blue-950 border border-blue-400 text-blue-300 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                <div className="text-left leading-tight">
                  <p className="text-[9px] uppercase font-bold text-blue-400 tracking-wider">Education Wing</p>
                  <p className="text-[11px] font-bold text-white">CNYC Youth Center</p>
                  <p className="text-[9px] text-slate-300 font-light">Sunday School & Library</p>
                </div>
              </div>

              {/* 4. BOTTOM-LEFT CALLOUT (Foyer & Welcome Gate) */}
              <div className="hidden sm:flex absolute -bottom-4 -left-3 lg:-left-6 glass-panel-gold py-2 px-3 rounded-xl border border-amber-500/40 shadow-xl items-center gap-2.5 animate-float-badge-delayed z-30 max-w-[180px]">
                <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-400 text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0">4</span>
                <div className="text-left leading-tight">
                  <p className="text-[9px] uppercase font-bold text-amber-400 tracking-wider">Ground Floor</p>
                  <p className="text-[11px] font-bold text-white">Welcome Foyer & Gate</p>
                  <p className="text-[9px] text-slate-300 font-light">Visitor & Kids Check-in</p>
                </div>
              </div>

              {/* 5. BOTTOM-RIGHT CALLOUT (Courtyard & Fellowship) */}
              <div className="hidden sm:flex absolute -bottom-4 -right-3 lg:-right-6 glass-panel py-2 px-3 rounded-xl border border-cyan-500/40 shadow-xl items-center gap-2.5 animate-float-badge z-30 max-w-[185px]">
                <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 flex items-center justify-center text-[10px] font-bold shrink-0">5</span>
                <div className="text-left leading-tight">
                  <p className="text-[9px] uppercase font-bold text-cyan-400 tracking-wider">Facility Grounds</p>
                  <p className="text-[11px] font-bold text-white">Gated Courtyard</p>
                  <p className="text-[9px] text-slate-300 font-light">Secure Parking & Fellowship</p>
                </div>
              </div>

            </div>

            {/* Mobile-Friendly Facility Pills Grid (Shown cleanly below image on small screens) */}
            <div className="sm:hidden grid grid-cols-2 gap-2 mt-4 w-full">
              <div className="p-2 rounded-xl bg-dpc-navy-900/90 border border-dpc-gold-500/30 text-left">
                <span className="text-[10px] text-dpc-gold-400 font-bold block">1. Rooftop</span>
                <span className="text-xs font-semibold text-white">Cross & Prayer Tower</span>
              </div>
              <div className="p-2 rounded-xl bg-dpc-navy-900/90 border border-emerald-500/30 text-left">
                <span className="text-[10px] text-emerald-400 font-bold block">2. Upper Floors</span>
                <span className="text-xs font-semibold text-white">Main Sanctuary</span>
              </div>
              <div className="p-2 rounded-xl bg-dpc-navy-900/90 border border-blue-500/30 text-left">
                <span className="text-[10px] text-blue-400 font-bold block">3. Center Wing</span>
                <span className="text-xs font-semibold text-white">CNYC Youth Center</span>
              </div>
              <div className="p-2 rounded-xl bg-dpc-navy-900/90 border border-amber-500/30 text-left">
                <span className="text-[10px] text-amber-400 font-bold block">4. Entrance</span>
                <span className="text-xs font-semibold text-white">Welcome Foyer</span>
              </div>
              <div className="col-span-2 p-2 rounded-xl bg-dpc-navy-900/90 border border-cyan-500/30 text-center">
                <span className="text-[10px] text-cyan-400 font-bold inline mr-1">5. Grounds:</span>
                <span className="text-xs font-semibold text-white">Gated Parking & Fellowship Area</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM FULL-WIDTH STATS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full mt-12 sm:mt-16">
          <div className="glass-panel rounded-2xl p-4 text-center border-white/5 hover:border-dpc-gold-500/30 transition-all hover:-translate-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-serif text-dpc-gold-300">40+ Yrs</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Faithful Gospel Witness</p>
          </div>
          <div className="glass-panel rounded-2xl p-4 text-center border-white/5 hover:border-dpc-gold-500/30 transition-all hover:-translate-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-serif text-dpc-gold-300">7</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Generational Ministries</p>
          </div>
          <div className="glass-panel rounded-2xl p-4 text-center border-white/5 hover:border-dpc-gold-500/30 transition-all hover:-translate-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-serif text-dpc-gold-300">100%</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Christ-Centered Fellowship</p>
          </div>
          <div className="glass-panel rounded-2xl p-4 text-center border-white/5 hover:border-dpc-gold-500/30 transition-all hover:-translate-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-serif text-dpc-gold-300">9:00 AM</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Sunday Divine Worship</p>
          </div>
        </div>

      </div>
    </section>
  );
};

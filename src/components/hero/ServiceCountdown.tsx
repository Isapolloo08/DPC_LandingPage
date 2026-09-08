import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Bell, MapPin, Sparkles, AlertCircle, Users } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';
import { ScriptureReveal } from '../ui/ScriptureReveal';

export const ServiceCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isHappeningNow: false,
  });

  useEffect(() => {
    const calculateTimeUntilSunday = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Check if it's currently Sunday morning service (e.g. 9:00 AM - 11:30 AM)
      if (currentDay === 0 && (currentHour > 9 || (currentHour === 9 && currentMinute >= 0)) && (currentHour < 11 || (currentHour === 11 && currentMinute <= 30))) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isHappeningNow: true });
        return;
      }

      // Calculate next Sunday 9:00 AM
      const nextSunday = new Date(now);
      let daysUntilSunday = (7 - currentDay) % 7;
      if (daysUntilSunday === 0 && (currentHour > 11 || (currentHour === 11 && currentMinute > 30))) {
        daysUntilSunday = 7;
      }

      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(9, 0, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isHappeningNow: false });
    };

    calculateTimeUntilSunday();
    const interval = setInterval(calculateTimeUntilSunday, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="services" className="relative py-16 bg-gradient-to-b from-dpc-navy-950 via-dpc-navy-900 to-dpc-navy-950 px-4 sm:px-6 lg:px-8 border-y border-dpc-gold-500/10">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Weekly Gatherings & Liturgy</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            Service Times & Live Countdown
          </h2>
          <div className="max-w-2xl mx-auto mt-3">
            <ScriptureReveal
              quote="I was glad when they said to me, ‘Let us go to the house of the LORD!’"
              reference="Psalm 122:1"
              version="ESV"
              showQuoteMarks={false}
              highlightWords={['glad', 'house', 'LORD']}
              quoteClassName="text-sm sm:text-base text-slate-200 font-serif italic leading-relaxed"
              referenceClassName="!mt-1.5"
              align="center"
              staggerDelay={0.04}
              initialDelay={0.15}
            />
          </div>
        </div>

        {/* Live Countdown Clock Banner */}
        <div className="max-w-4xl mx-auto glass-panel-gold rounded-3xl p-6 sm:p-8 mb-14 text-center relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-dpc-gold-500/20 border border-dpc-gold-500/40 flex items-center justify-center text-dpc-gold-300">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-serif">
                  Next Lord’s Day Worship Service
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Every Sunday at 9:40 AM • Sanctuary & Youth Center
                </p>
              </div>
            </div>

            {timeLeft.isHappeningNow ? (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 text-xs font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                SERVICE IS CURRENTLY LIVE
              </span>
            ) : (
              null
            )}
          </div>

          {/* Time Digits Ticker */}
          <div className="grid grid-cols-4 gap-1.5 xs:gap-2.5 sm:gap-4 max-w-xl mx-auto">
            <div className="flex flex-col items-center justify-center p-2.5 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-dpc-navy-950/90 border border-dpc-gold-500/30 shadow-inner">
              <span className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif text-dpc-gold-300 tracking-wider">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5 sm:mt-1">
                Days
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2.5 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-dpc-navy-950/90 border border-dpc-gold-500/30 shadow-inner">
              <span className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif text-dpc-gold-300 tracking-wider">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5 sm:mt-1">
                Hours
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2.5 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-dpc-navy-950/90 border border-dpc-gold-500/30 shadow-inner">
              <span className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif text-dpc-gold-300 tracking-wider">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5 sm:mt-1">
                Minutes
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2.5 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-dpc-navy-950/90 border border-dpc-gold-500/30 shadow-inner">
              <span className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif text-dpc-gold-300 tracking-wider">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5 sm:mt-1">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHURCH_INFO.services.map((service, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative group ${service.isMainWorship
                ? 'glass-panel-gold border-dpc-gold-500/60 shadow-gold-glow'
                : 'glass-panel border-white/10 hover:border-dpc-gold-500/40 hover:-translate-y-1'
                }`}
            >
              {service.badge && (
                <div className="mb-3">
                  <span
                    className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${service.isMainWorship
                      ? 'bg-dpc-gold-500 text-dpc-navy-950'
                      : 'bg-dpc-navy-800 text-dpc-gold-300 border border-dpc-gold-500/30'
                      }`}
                  >
                    {service.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-white font-serif mb-1 group-hover:text-dpc-gold-300 transition-colors">
                  {service.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-dpc-gold-400 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{service.day}</span>
                  <span className="text-slate-500">•</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{service.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                  <span>{service.targetAudience}</span>
                </span>

                <span className="text-[11px] font-semibold text-dpc-gold-400/90 bg-dpc-gold-500/10 px-2 py-0.5 rounded-md border border-dpc-gold-500/20">
                  Open to All
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

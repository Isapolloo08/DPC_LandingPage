import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Bell, Sparkles, PlusCircle } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';

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
      // Target next Sunday 9:00 AM
      const nextSunday = new Date(now);
      const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      
      let daysUntilSunday = (7 - currentDay) % 7;
      
      // If today is Sunday
      if (currentDay === 0) {
        const worshipStart = new Date(now);
        worshipStart.setHours(9, 0, 0, 0);
        const worshipEnd = new Date(now);
        worshipEnd.setHours(11, 30, 0, 0);

        if (now >= worshipStart && now <= worshipEnd) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isHappeningNow: true });
          return;
        }

        if (now > worshipEnd) {
          daysUntilSunday = 7;
        }
      }

      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(9, 0, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isHappeningNow: false });
        return;
      }

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

  const createGoogleCalendarUrl = (title: string, details: string, location: string) => {
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', title);
    url.searchParams.append('details', details);
    url.searchParams.append('location', location);
    return url.toString();
  };

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
          <p className="text-sm sm:text-base text-slate-300 mt-3 font-light">
            We warmly invite you, your family, and friends to worship with us in the heart of Daet, Camarines Norte.
          </p>
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
                  Next Lord’s Day Divine Worship
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Every Sunday at 9:00 AM • Sanctuary & Youth Center
                </p>
              </div>
            </div>

            {timeLeft.isHappeningNow ? (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 text-xs font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                SERVICE IS CURRENTLY LIVE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dpc-navy-950/80 border border-dpc-gold-500/30 text-xs text-dpc-gold-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Counting down to Sunday
              </span>
            )}
          </div>

          {/* Time Digits Ticker */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-dpc-navy-950/90 border border-dpc-gold-500/30 shadow-inner">
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif text-dpc-gold-300 tracking-wider">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
                Days
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-dpc-navy-950/90 border border-dpc-gold-500/30 shadow-inner">
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif text-dpc-gold-300 tracking-wider">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
                Hours
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-dpc-navy-950/90 border border-dpc-gold-500/30 shadow-inner">
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif text-dpc-gold-300 tracking-wider">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
                Minutes
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-dpc-navy-950/90 border border-dpc-gold-500/30 shadow-inner">
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif text-dpc-gold-300 tracking-wider">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
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
              className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative group ${
                service.isMainWorship
                  ? 'glass-panel-gold border-dpc-gold-500/60 shadow-gold-glow'
                  : 'glass-panel border-white/10 hover:border-dpc-gold-500/40 hover:-translate-y-1'
              }`}
            >
              {service.badge && (
                <div className="mb-3">
                  <span
                    className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      service.isMainWorship
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
                <span className="text-[11px] text-slate-400 font-medium">
                  {service.targetAudience}
                </span>
                
                <a
                  href={createGoogleCalendarUrl(
                    `${CHURCH_INFO.name}: ${service.name}`,
                    `${service.description} - Held at ${CHURCH_INFO.address.street}, Daet, Camarines Norte`,
                    `${CHURCH_INFO.address.street}, ${CHURCH_INFO.address.municipality}, ${CHURCH_INFO.address.province}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-dpc-gold-400 hover:text-dpc-gold-200 font-semibold transition-colors"
                  title="Add this service schedule to your Google Calendar"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Calendar</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

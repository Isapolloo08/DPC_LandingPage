import React, { useState, useEffect } from 'react';
import { Menu, X, UserCheck, Church, Sparkles } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';

interface StickyNavbarProps {
  onPlanVisitClick: () => void;
}

export const StickyNavbar: React.FC<StickyNavbarProps> = ({
  onPlanVisitClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Worship Times', href: '#services' },
    { label: 'What to Expect', href: '#what-to-expect' },
    { label: '7 Ministries', href: '#ministries' },
    { label: 'Media & Events', href: '#events' },
    { label: 'Find Us', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-dpc-navy-950/90 backdrop-blur-xl py-3 border-b border-dpc-gold-500/25 shadow-xl shadow-black/60'
          : 'bg-transparent backdrop-blur-md py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.pushState(null, '', window.location.pathname);
            }}
            className="flex items-center gap-2 sm:gap-3 group min-w-0"
          >
            {/* Custom Styled Celtic Reformed Cross Emblem */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-dpc-navy-800 to-dpc-navy-950 border border-dpc-gold-500/50 p-1.5 sm:p-2 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-dpc-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Church className="w-5 h-5 sm:w-6 sm:h-6 text-dpc-gold-400 group-hover:text-dpc-gold-300 transition-colors" />
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif font-bold text-xs xs:text-sm sm:text-base md:text-lg tracking-wide text-white group-hover:text-dpc-gold-300 transition-colors whitespace-nowrap">
                  {CHURCH_INFO.name}
                </span>
                <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-dpc-gold-500"></span>
                <span className="hidden md:inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 bg-dpc-gold-500/10 px-2 py-0.5 rounded border border-dpc-gold-500/30">
                  Reformed
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-300 font-medium tracking-tight truncate max-w-[170px] xs:max-w-[230px] sm:max-w-none">
                Daet, Camarines Norte, Philippines
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs xl:text-sm font-medium text-slate-200 hover:text-dpc-gold-300 hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onPlanVisitClick}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 rounded-lg shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
            >
              <Sparkles className="w-4 h-4 text-dpc-navy-950 shrink-0" />
              <span>Plan a Visit</span>
            </button>
          </div>

          {/* Mobile & Tablet Toggle Controls */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onPlanVisitClick}
              className="hidden xs:inline-flex sm:hidden items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 to-dpc-gold-300 hover:from-dpc-gold-300 hover:to-dpc-gold-200 rounded-lg shadow-sm cursor-pointer transition-all shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visit</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 xs:p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer border border-white/10 flex items-center justify-center shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel mt-2.5 border-t border-dpc-gold-500/20 px-4 sm:px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200 shadow-2xl max-w-7xl mx-auto rounded-b-2xl">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-xs">
            <span className="text-[11px] uppercase tracking-wider font-bold text-dpc-gold-400">
              Navigation Menu
            </span>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-dpc-gold-500/10 text-dpc-gold-300 border border-dpc-gold-500/30">
              Reformed • Presbyterian
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-dpc-gold-300 hover:bg-white/5 rounded-lg border border-white/5 hover:border-dpc-gold-500/30 transition-all text-center sm:text-left"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPlanVisitClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 rounded-xl shadow-gold-glow cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 text-dpc-navy-950" />
              <span>Plan Your First Visit This Sunday</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


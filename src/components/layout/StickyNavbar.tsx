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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Worship Times', href: '#services' },
    { label: 'What to Expect', href: '#what-to-expect' },
    { label: '7 Ministries', href: '#ministries' },
    { label: 'Events & News', href: '#events' },
    { label: 'Find Us', href: '#location' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3 shadow-lg shadow-black/40'
          : 'bg-dpc-navy-950/90 backdrop-blur-md py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Custom Styled Celtic Reformed Cross Emblem */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-dpc-navy-800 to-dpc-navy-950 border border-dpc-gold-500/50 p-2 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 rounded-xl bg-dpc-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Church className="w-6 h-6 text-dpc-gold-400 group-hover:text-dpc-gold-300 transition-colors" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-white group-hover:text-dpc-gold-300 transition-colors">
                  {CHURCH_INFO.shortName}
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-dpc-gold-500"></span>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 bg-dpc-gold-500/10 px-2 py-0.5 rounded border border-dpc-gold-500/30">
                  {CHURCH_INFO.centerShort}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium tracking-tight">
                Daet Presbyterian Church & Youth Center
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

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Plan a Visit CTA */}
            <button
              onClick={onPlanVisitClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 rounded-lg shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-dpc-navy-950" />
              <span>Plan a Visit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onPlanVisitClick}
              className="px-2.5 py-1.5 text-xs font-bold text-dpc-navy-950 bg-dpc-gold-400 rounded-md cursor-pointer"
            >
              Visit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel mt-3 border-t border-dpc-gold-500/20 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-medium text-slate-200 hover:text-dpc-gold-300 hover:bg-white/5 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPlanVisitClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 to-dpc-gold-300 rounded-lg shadow-gold-glow cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan Your First Visit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

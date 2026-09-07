import React from 'react';
import { Church, ShieldCheck, ArrowUp } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';

interface FooterProps {
  onPlanVisitClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onPlanVisitClick,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dpc-navy-950 text-slate-300 border-t border-dpc-gold-500/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-dpc-navy-800 border border-dpc-gold-500/40 flex items-center justify-center text-dpc-gold-400 shadow-gold-glow">
                <Church className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-serif tracking-wide">
                  {CHURCH_INFO.name}
                </h3>
                <p className="text-xs text-dpc-gold-400 font-semibold uppercase tracking-wider">
                  {CHURCH_INFO.centerName}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              Proclaiming the sovereign grace of God in Christ Jesus, edifying the saints, and raising the next generation of Christian leaders in Camarines Norte and beyond.
            </p>

            <div className="pt-2">
              <blockquote className="text-xs italic text-dpc-gold-300 font-serif border-l-2 border-dpc-gold-400 pl-3">
                “{CHURCH_INFO.verseText}” — <span className="font-bold">{CHURCH_INFO.verseRef}</span>
              </blockquote>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Gatherings & Life
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" className="hover:text-dpc-gold-300 transition-colors">Sunday Worship (9:00 AM)</a>
              </li>
              <li>
                <a href="#services" className="hover:text-dpc-gold-300 transition-colors">Sunday School (8:00 AM)</a>
              </li>
              <li>
                <a href="#what-to-expect" className="hover:text-dpc-gold-300 transition-colors">First-Time Visitor Guide</a>
              </li>
              <li>
                <a href="#ministries" className="hover:text-dpc-gold-300 transition-colors">The 7 Age Ministries</a>
              </li>
              <li>
                <a href="#events" className="hover:text-dpc-gold-300 transition-colors">Events & Youth Camps</a>
              </li>
              <li>
                <a href="#location" className="hover:text-dpc-gold-300 transition-colors">Directions & Location</a>
              </li>
            </ul>
          </div>

          {/* Ministries & Fellowship */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Ministries
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>Seeds of Grace (Kinder 3–5)</li>
              <li>Covenant Kids (Elem 6–12)</li>
              <li>Ignite Teens (High School 13–16)</li>
              <li>CNYC Youth (Collegiate 17–21)</li>
              <li>Ambassadors (Young Adults 22–35)</li>
              <li>Pillars of Faith (Couples 36–55)</li>
              <li>Golden Heritage (Seniors 56+)</li>
            </ul>
          </div>

          {/* Welcome & Contact Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              First Time Here?
            </h4>
            <div className="space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                We'd love to connect and welcome you to our family this Sunday.
              </p>
              <button
                onClick={onPlanVisitClick}
                className="w-full py-2.5 px-3 text-xs font-bold text-dpc-navy-950 bg-dpc-gold-400 hover:bg-dpc-gold-300 rounded-lg transition-colors text-center cursor-pointer"
              >
                Plan a Visit
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {CHURCH_INFO.name} & {CHURCH_INFO.centerName}. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-dpc-gold-400" />
              <span>Soli Deo Gloria</span>
            </span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-dpc-gold-400 hover:text-dpc-gold-300 transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

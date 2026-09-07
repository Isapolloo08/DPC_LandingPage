import React from 'react';
import { Radio, Calendar, ChevronRight } from 'lucide-react';

interface TopAnnouncementBarProps {
  onPlanVisitClick: () => void;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({ onPlanVisitClick }) => {
  return (
    <div className="bg-gradient-to-r from-dpc-navy-900 via-dpc-navy-800 to-dpc-navy-900 text-xs sm:text-sm text-slate-300 border-b border-dpc-gold-500/20 py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-950/80 text-red-400 border border-red-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <Radio className="w-3 h-3" />
            THIS SUNDAY
          </span>
          <span className="text-slate-200 font-medium">
            Lord’s Day Divine Worship at 9:00 AM • F. Pimentel Ave., Daet
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-1.5 text-dpc-gold-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>Sunday School at 8:00 AM</span>
          </div>
          <button
            onClick={onPlanVisitClick}
            className="inline-flex items-center gap-1 text-dpc-gold-400 hover:text-dpc-gold-300 font-medium transition-colors group"
          >
            <span>First time visiting Daet? Plan your visit</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Baby, Sparkles, Flame, Zap, Compass, Shield, Crown, 
  ArrowRight, Users, CheckCircle2 
} from 'lucide-react';
import { MINISTRIES_DATA } from '../../data/ministriesData';
import { Ministry } from '../../types/church';

interface MinistriesSectionProps {
  onSelectMinistry: (ministry: Ministry) => void;
}

export const MinistriesSection: React.FC<MinistriesSectionProps> = ({ onSelectMinistry }) => {
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const getMinistryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Baby': return Baby;
      case 'Sparkles': return Sparkles;
      case 'Flame': return Flame;
      case 'Zap': return Zap;
      case 'Compass': return Compass;
      case 'Shield': return Shield;
      case 'Crown': return Crown;
      default: return Users;
    }
  };

  const filteredMinistries = selectedTab === 'all' 
    ? MINISTRIES_DATA 
    : MINISTRIES_DATA.filter(m => m.id === selectedTab);

  return (
    <section id="ministries" className="py-20 bg-gradient-to-b from-dpc-navy-950 via-dpc-navy-900 to-dpc-navy-950 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Generational Discipleship</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            The 7 Age-Bracket Ministries
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 font-light">
            From our covenant toddlers to venerable senior saints, every generation in Camarines Norte has a gospel home and tailored discipleship pathway at DPC.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedTab === 'all'
                ? 'bg-dpc-gold-400 text-dpc-navy-950 shadow-gold-glow'
                : 'bg-dpc-navy-800 text-slate-300 hover:text-white hover:bg-dpc-navy-700 border border-white/10'
            }`}
          >
            All 7 Ministries
          </button>
          {MINISTRIES_DATA.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedTab(m.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedTab === m.id
                  ? 'bg-dpc-gold-400 text-dpc-navy-950 shadow-gold-glow font-bold'
                  : 'bg-dpc-navy-800 text-slate-300 hover:text-white hover:bg-dpc-navy-700 border border-white/10'
              }`}
            >
              {m.ageBracket}
            </button>
          ))}
        </div>

        {/* Ministry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMinistries.map((ministry) => {
            const Icon = getMinistryIcon(ministry.iconName);
            return (
              <div
                key={ministry.id}
                className="glass-panel rounded-3xl p-6 sm:p-7 border-white/10 hover:border-dpc-gold-500/50 hover:shadow-gold-glow transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Subtle Gradient Light */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${ministry.color} opacity-10 rounded-full blur-xl group-hover:opacity-25 transition-opacity`}></div>

                <div>
                  {/* Top Meta Header */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-dpc-navy-800 border border-dpc-gold-500/30 flex items-center justify-center text-dpc-gold-400 shadow-md group-hover:scale-105 group-hover:text-dpc-gold-300 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-dpc-gold-500/10 text-dpc-gold-300 border border-dpc-gold-500/30">
                      {ministry.ageRange}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white font-serif group-hover:text-dpc-gold-300 transition-colors mb-1">
                    {ministry.name}
                  </h3>
                  <p className="text-xs font-medium text-dpc-gold-400/90 mb-3">
                    {ministry.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-5 line-clamp-3">
                    {ministry.description}
                  </p>

                  {/* Quick Features List */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-white/5">
                    {ministry.activities.slice(0, 2).map((act, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                        <span className="truncate">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer / Trigger */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div className="text-[11px] text-slate-400">
                    <span className="font-semibold text-white">{ministry.stats.membersCount}+</span> Members
                  </div>

                  <button
                    onClick={() => onSelectMinistry(ministry)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-dpc-gold-400 group-hover:text-dpc-gold-300 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>View Ministry Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

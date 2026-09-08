import React, { useState, useEffect } from 'react';
import {
  Sprout, BookOpen, Flame, GraduationCap, Compass, Shield, Award,
  ArrowRight, Users, CheckCircle2, Database, RefreshCw
} from 'lucide-react';
import { MINISTRIES_DATA } from '../../data/ministriesData';
import { Ministry } from '../../types/church';
import { fetchMinistries } from '../../services/api';

interface MinistriesSectionProps {
  onSelectMinistry: (ministry: Ministry) => void;
}

export const MinistriesSection: React.FC<MinistriesSectionProps> = ({ onSelectMinistry }) => {
  const [ministries, setMinistries] = useState<Ministry[]>(MINISTRIES_DATA);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [isLive, setIsLive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const res = await fetchMinistries();
      if (isMounted) {
        setMinistries(res.data);
        setIsLive(res.isLive);
        setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  const getMinistryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
      case 'Baby':
        return Sprout;
      case 'BookOpen':
      case 'Sparkles':
        return BookOpen;
      case 'Flame':
        return Flame;
      case 'GraduationCap':
      case 'Zap':
        return GraduationCap;
      case 'Compass':
        return Compass;
      case 'Shield':
        return Shield;
      case 'Award':
      case 'Crown':
        return Award;
      default:
        return Users;
    }
  };

  const filteredMinistries = selectedTab === 'all'
    ? ministries
    : ministries.filter(m => m.id === selectedTab || m.ageBracket.toLowerCase() === selectedTab.toLowerCase());

  return (
    <section id="ministries" className="py-20 bg-gradient-to-b from-dpc-navy-950 via-dpc-navy-900 to-dpc-navy-950 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            The 7 Ministries
          </h2>
          <div className="max-w-2xl mx-auto mt-3">
            <p className="text-sm sm:text-base text-slate-200 font-serif italic leading-relaxed">
              “One generation shall commend Your works to another, and shall declare Your mighty acts.”
            </p>
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <span className="h-px w-6 bg-gradient-to-r from-transparent via-dpc-gold-400 to-transparent" />
              <span className="text-[11px] font-bold tracking-widest text-dpc-gold-400 uppercase font-serif">
                Psalm 145:4
              </span>
              <span className="h-px w-6 bg-gradient-to-r from-transparent via-dpc-gold-400 to-transparent" />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${selectedTab === 'all'
              ? 'bg-dpc-gold-400 text-dpc-navy-950 shadow-gold-glow'
              : 'bg-dpc-navy-800 text-slate-300 hover:text-white hover:bg-dpc-navy-700 border border-white/10'
              }`}
          >
            All {ministries.length} Ministries
          </button>
          {ministries.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedTab(m.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${selectedTab === m.id
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
                    <span className="font-semibold text-white">{ministry.stats.membersCount}</span> {ministry.stats.membersCount === 1 ? 'Active Member' : 'Active Members'}
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

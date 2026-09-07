import React, { useState } from 'react';
import { BookOpen, MapPin, Calendar, User, Phone, CheckCircle, Search } from 'lucide-react';
import { LIFE_GROUPS_DATA } from '../../data/lifeGroupsData';
import { DiscipleshipBooks } from './DiscipleshipBooks';

export const LifeGroupsSection: React.FC = () => {
  const [selectedTown, setSelectedTown] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [joinedGroup, setJoinedGroup] = useState<string | null>(null);

  const towns = ['all', 'Daet', 'Vinzons', 'Talisay', 'Basud', 'Online / Zoom'];

  const filteredGroups = LIFE_GROUPS_DATA.filter((group) => {
    const matchesTown = selectedTown === 'all' || group.locationTown.toLowerCase() === selectedTown.toLowerCase();
    const matchesSearch = 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.demographic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.currentBook.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.specificArea.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTown && matchesSearch;
  });

  return (
    <section id="discipleship" className="py-20 bg-dpc-navy-950 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Community Discipleship</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            Discipleship Life Groups
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 font-light">
            Church is more than Sunday morning. Connect in authentic, midweek small group fellowships across Camarines Norte studying sound doctrine and encouraging one another.
          </p>
        </div>

        {/* Current Discipleship Books Showcase */}
        <DiscipleshipBooks />

        {/* Search & Filter Controls */}
        <div className="mt-16 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-dpc-navy-900/80 p-4 rounded-2xl border border-white/10">
          
          {/* Town Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline-block">
              Location:
            </span>
            {towns.map((town) => (
              <button
                key={town}
                onClick={() => setSelectedTown(town)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedTown === town
                    ? 'bg-dpc-gold-400 text-dpc-navy-950 font-bold shadow-gold-glow'
                    : 'bg-dpc-navy-800 text-slate-300 hover:text-white hover:bg-dpc-navy-700'
                }`}
              >
                {town === 'all' ? 'All Locations' : town}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, leader, town..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-dpc-navy-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-dpc-gold-400"
            />
          </div>
        </div>

        {/* Life Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => {
            const isJoined = joinedGroup === group.id;
            return (
              <div
                key={group.id}
                className="glass-panel rounded-2xl p-6 border-white/10 hover:border-dpc-gold-500/40 hover:shadow-gold-glow transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-dpc-gold-500/10 text-dpc-gold-300 border border-dpc-gold-500/30">
                      {group.demographic}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      group.format === 'In-person' 
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                        : group.format === 'Hybrid'
                        ? 'bg-blue-950/80 text-blue-400 border border-blue-500/30'
                        : 'bg-purple-950/80 text-purple-400 border border-purple-500/30'
                    }`}>
                      {group.format}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-serif mb-1">
                    {group.name}
                  </h3>

                  <div className="space-y-2 mt-4 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                      <span>{group.specificArea} ({group.locationTown})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                      <span>{group.meetingSchedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                      <span className="text-slate-200">
                        Studying: <strong className="text-dpc-gold-300">{group.currentBook}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                      <span>Leader: {group.leader}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={`tel:${group.contactNumber}`}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-dpc-gold-400" />
                    <span>Inquire</span>
                  </a>

                  {isJoined ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Joined!</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setJoinedGroup(group.id)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-dpc-navy-950 bg-dpc-gold-400 hover:bg-dpc-gold-300 transition-colors shadow-sm cursor-pointer"
                    >
                      Connect with Group
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

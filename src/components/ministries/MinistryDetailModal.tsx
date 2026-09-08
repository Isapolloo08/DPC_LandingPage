import React, { useState } from 'react';
import { X, Calendar, MapPin, User, BookOpen, CheckCircle2, Send, Sparkles, Camera } from 'lucide-react';
import { Ministry } from '../../types/church';
import { CircularTestimonials, TestimonialItem } from '@/components/ui/circular-testimonials';

interface MinistryDetailModalProps {
  ministry: Ministry | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MinistryDetailModal: React.FC<MinistryDetailModalProps> = ({
  ministry,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [joinedSuccess, setJoinedSuccess] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  if (!isOpen || !ministry) return null;

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinedSuccess(true);
  };

  const handleResetAndClose = () => {
    setJoinedSuccess(false);
    setIsScrolled(false);
    setName('');
    setContact('');
    onClose();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 10);
  };

  const ministryStories: TestimonialItem[] = ministry.eventPhotos
    ? ministry.eventPhotos.map((photo) => ({
      name: photo.tag || `${ministry.name} Event`,
      designation: `${ministry.ageBracket} • ${ministry.name}`,
      quote: photo.caption,
      src: photo.url,
      tag: photo.tag || 'Live Event',
    }))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0c192c] rounded-2xl sm:rounded-3xl shadow-2xl border border-dpc-gold-500/50 max-h-[94vh] sm:max-h-[90vh] flex flex-col overflow-hidden">

        {/* Sticky Modal Header with Smooth Scroll Transition */}
        <div
          className={`sticky top-0 z-30 px-4 py-3.5 sm:px-8 sm:py-5 flex items-start justify-between gap-3 transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0c192c]/95 backdrop-blur-md border-b border-white/15 shadow-lg shadow-black/40'
              : 'bg-[#0c192c] border-b border-transparent shadow-none'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-dpc-gold-500/20 text-dpc-gold-300 border border-dpc-gold-500/30">
                {ministry.ageBracket} ({ministry.ageRange})
              </span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">
                {ministry.stats.membersCount} {ministry.stats.membersCount === 1 ? 'Active Member' : 'Active Members'} • {ministry.stats.activeGroups} Small Groups
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white leading-tight">
              {ministry.name}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-dpc-gold-400 mt-0.5">
              {ministry.tagline}
            </p>
          </div>

          {/* Sticky Close button */}
          <button
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-5 sm:p-8 custom-scrollbar space-y-6"
        >

          {/* ========================================================= */}
          {/* --- ANIMATED CIRCULAR / STACKED CARDS TESTIMONIALS --- */}
          {/* ========================================================= */}
          {ministryStories.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-dpc-gold-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-dpc-gold-400" />
                  <span>Ministry Events & Live Moments</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-light">
                  Click arrows to browse stories
                </span>
              </div>

              <CircularTestimonials
                testimonials={ministryStories}
                autoplay={true}
                autoplayInterval={5000}
              />
            </div>
          )}

          {/* Overview Description */}
          <p className="text-sm text-slate-200 leading-relaxed font-light mb-6">
            {ministry.description}
          </p>

          {/* Key Scripture Quote */}
          <div className="bg-dpc-navy-950/90 rounded-2xl p-4 sm:p-5 border border-dpc-gold-500/30 mb-6">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-dpc-gold-400 shrink-0 mt-0.5" />
              <div>
                <blockquote className="text-xs sm:text-sm italic text-slate-100 font-serif leading-relaxed">
                  “{ministry.keyVerse}”
                </blockquote>
                <span className="text-xs font-bold text-dpc-gold-400 mt-1 block">
                  — {ministry.keyVerseRef}
                </span>
              </div>
            </div>
          </div>

          {/* Logistical Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <Calendar className="w-4 h-4 text-dpc-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Schedule</p>
                <p className="text-xs font-medium text-white">{ministry.schedule}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-dpc-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Location</p>
                <p className="text-xs font-medium text-white">{ministry.location}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 sm:col-span-2">
              <User className="w-4 h-4 text-dpc-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ministry Leadership</p>
                <p className="text-xs font-medium text-white">
                  {ministry.leader} <span className="text-slate-400">({ministry.leaderTitle})</span>
                </p>
              </div>
            </div>
          </div>

          {/* Activities List */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Regular Programs & Activities
            </h4>
            <div className="space-y-2">
              {ministry.activities.map((act, index) => (
                <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Join / Connect Form */}
          <div className="pt-6 border-t border-white/10">
            {joinedSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-center animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">Thank You for Connecting!</p>
                <p className="text-xs text-slate-300 mt-1">
                  {ministry.leader} or a ministry coordinator will reach out to you shortly via SMS/Call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-dpc-gold-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interested in joining or inquiring for {ministry.name}?</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3.5 py-2 text-xs rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-dpc-gold-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Mobile / Email"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="px-3.5 py-2 text-xs rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-dpc-gold-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 to-dpc-gold-300 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Connection Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

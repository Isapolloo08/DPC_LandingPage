import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, BellRing, Pin, Megaphone, CheckCircle2, Tv } from 'lucide-react';
import { EVENTS_DATA } from '../../data/eventsData';
import { ChurchEvent, Ministry } from '../../types/church';
import { MINISTRIES_DATA } from '../../data/ministriesData';
import { fetchAnnouncements, fetchEvents, BackendAnnouncement } from '../../services/api';
import { ChurchVideoHub } from '../video/ChurchVideoHub';

interface AnnouncementsSectionProps {
  onSelectEvent: (event: ChurchEvent) => void;
  onPlanVisitClick?: () => void;
  onSelectMinistry?: (ministry: Ministry) => void;
}

/**
 * Check if an event date is upcoming/active (hides finished events automatically)
 */
function isEventActive(event: ChurchEvent): boolean {
  const dateStr = event.date.trim();

  // Recurring events are always active/upcoming
  if (
    dateStr.toLowerCase().includes('every') ||
    dateStr.toLowerCase().includes('weekly') ||
    dateStr.toLowerCase().includes('monthly')
  ) {
    return true;
  }

  try {
    let parseableDate = dateStr;

    // Handle date ranges like "April 10 – 12, 2026" or "May 20 - 22, 2026"
    if (dateStr.includes('–') || dateStr.includes('-')) {
      const parts = dateStr.split(/[–-]/);
      const endPart = parts[parts.length - 1].trim();

      if (!isNaN(Date.parse(endPart))) {
        parseableDate = endPart;
      } else {
        // e.g. Extract starting month like "April" and combine with "12, 2026"
        const monthMatch = parts[0].trim().match(/^[A-Za-z]+/);
        if (monthMatch) {
          parseableDate = `${monthMatch[0]} ${endPart}`;
        }
      }
    }

    const timestamp = Date.parse(parseableDate);
    if (!isNaN(timestamp)) {
      // Event remains visible until the end of its date (23:59:59)
      const eventEnd = new Date(timestamp);
      eventEnd.setHours(23, 59, 59, 999);
      return eventEnd.getTime() >= Date.now();
    }
  } catch {
    return true; // Fallback to keeping it if parsing is complex
  }

  return true;
}

/**
 * Check if an announcement / bulletin is active (hides finished/expired announcements automatically)
 */
function isAnnouncementActive(ann: BackendAnnouncement): boolean {
  // Pinned announcements always stay active
  if (ann.is_pinned) return true;

  const now = Date.now();

  // 1. Explicit expiration date
  if (ann.expires_at) {
    const expDate = new Date(ann.expires_at);
    if (!isNaN(expDate.getTime())) {
      expDate.setHours(23, 59, 59, 999);
      return expDate.getTime() >= now;
    }
  }

  // 2. Check if title or body contains a specific date
  const text = `${ann.title} ${ann.body}`;
  const dateRegex = /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?(?:\s*,?\s*\d{4})?/gi;
  const matches = text.match(dateRegex);

  if (matches && matches.length > 0) {
    for (const matchStr of matches) {
      const cleanMatch = matchStr.replace(/(st|nd|rd|th)/gi, '');
      const parsed = Date.parse(cleanMatch.includes('202') ? cleanMatch : `${cleanMatch}, ${new Date().getFullYear()}`);
      if (!isNaN(parsed)) {
        const d = new Date(parsed);
        d.setHours(23, 59, 59, 999);
        // If the date in announcement text has passed, hide it
        if (d.getTime() < now) {
          return false;
        }
      }
    }
  }

  // 3. Birthday or celebratory greetings expire after 5 days
  const isGreeting = /birthday|bday|happy\s+birthday|hbd|congrat/i.test(text);
  if (ann.created_at) {
    const createdDate = new Date(ann.created_at);
    if (!isNaN(createdDate.getTime())) {
      const diffDays = (now - createdDate.getTime()) / (1000 * 60 * 60 * 24);
      if (isGreeting && diffDays > 5) {
        return false;
      }
      // General non-pinned bulletins expire after 7 days
      if (diffDays > 7) {
        return false;
      }
    }
  }

  return true;
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  onSelectEvent,
  onPlanVisitClick,
  onSelectMinistry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [events, setEvents] = useState<ChurchEvent[]>(EVENTS_DATA);
  const [announcements, setAnnouncements] = useState<BackendAnnouncement[]>([]);
  const [isLiveEvents, setIsLiveEvents] = useState(false);
  const [isLiveAnnouncements, setIsLiveAnnouncements] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const [eventsRes, annRes] = await Promise.all([
        fetchEvents(),
        fetchAnnouncements(),
      ]);
      if (isMounted) {
        setEvents(eventsRes.data);
        setIsLiveEvents(eventsRes.isLive);
        setAnnouncements(annRes.data);
        setIsLiveAnnouncements(annRes.isLive);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  const categories = ['all', 'Youth', 'Worship', 'Discipleship', 'Outreach', 'Fellowship'];

  // Filter out finished/past events automatically
  const activeEvents = events.filter(isEventActive);

  // Filter out finished/expired bulletins automatically
  const activeAnnouncements = announcements.filter(isAnnouncementActive);

  const filteredEvents = selectedCategory === 'all'
    ? activeEvents
    : activeEvents.filter((e) => e.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="events" className="py-12 sm:py-16 bg-gradient-to-b from-dpc-navy-950 via-dpc-navy-900 to-dpc-navy-950 relative overflow-hidden section-render-opt">
      {/* --- 1. VIRTUAL CINEMA & MINISTRY VIDEO ORIENTATION HUB --- */}
      <ChurchVideoHub
        onPlanVisitClick={onPlanVisitClick || (() => { })}
        onSelectMinistryModal={(ministryId) => {
          const match = MINISTRIES_DATA.find((m) => m.id === ministryId);
          if (match && onSelectMinistry) {
            onSelectMinistry(match);
          }
        }}
      />

      {/* ========================================================= */}
      {/* --- 3. LIVE ANNOUNCEMENTS & UPCOMING EVENTS CALENDAR --- */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 pt-12 border-t border-white/10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-3">
              <BellRing className="w-3.5 h-3.5" />
              <span>Upcoming Gatherings & Calendar</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
              Live Announcements & Events
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 font-light">
              Upcoming youth camps, theological symposiums, family retreats, and community gospel missions.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${selectedCategory === cat
                  ? 'bg-dpc-gold-400 text-dpc-navy-950 font-bold shadow-gold-glow'
                  : 'bg-dpc-navy-800 text-slate-300 hover:text-white border border-white/10'
                  }`}
              >
                {cat === 'all' ? 'All Events' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Live Church Announcements from Database */}
        {activeAnnouncements.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Megaphone className="w-4 h-4 text-dpc-gold-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-dpc-gold-300">
                Official Ministry Bulletins ({activeAnnouncements.length})
              </h3>
              {isLiveAnnouncements && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Connected
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeAnnouncements.map((ann) => (
                <div
                  key={ann.id}
                  className="glass-panel rounded-2xl p-5 border-dpc-gold-500/30 hover:border-dpc-gold-400 transition-all flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {ann.is_pinned && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-500/40">
                          <Pin className="w-3 h-3" />
                          Pinned
                        </span>
                      )}
                      {ann.ministry_name && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-dpc-navy-800 text-dpc-gold-300 border border-dpc-gold-500/30">
                          {ann.ministry_name}
                        </span>
                      )}
                    </div>
                    {ann.created_at && (
                      <span className="text-[11px] text-slate-400">
                        {new Date(ann.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-white font-serif mb-1 group-hover:text-dpc-gold-300 transition-colors">
                    {ann.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-3">
                    {ann.body}
                  </p>
                  {ann.author_name && (
                    <div className="text-[11px] text-slate-400 pt-2 border-t border-white/5">
                      Posted by <span className="text-slate-200 font-medium">{ann.author_name}</span> {ann.author_role ? `(${ann.author_role})` : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={`rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${event.featured
                  ? 'glass-panel-gold border-dpc-gold-500/50 shadow-gold-glow'
                  : 'glass-panel border-white/10 hover:border-dpc-gold-500/40 hover:-translate-y-1'
                  }`}
              >
                <div>
                  {/* Meta Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-dpc-navy-800 text-dpc-gold-300 border border-dpc-gold-500/30">
                      {event.category}
                    </span>

                    {event.badge && (
                      <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-dpc-gold-500/20 text-dpc-gold-300 border border-dpc-gold-500/40">
                        {event.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white font-serif group-hover:text-dpc-gold-300 transition-colors mb-3 leading-snug">
                    {event.title}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                      <span className="font-medium text-slate-200">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6 line-clamp-3">
                    {event.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div className="text-[11px] text-slate-400">
                    {event.currentRsvp && (
                      <span><strong>{event.currentRsvp}</strong> Attending</span>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectEvent(event)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-dpc-navy-950 bg-dpc-gold-400 hover:bg-dpc-gold-300 shadow-sm transition-all cursor-pointer"
                  >
                    <span>{event.registrationOpen ? 'RSVP / Details' : 'View Details'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6 rounded-3xl glass-panel border border-white/10 max-w-xl mx-auto">
            <Calendar className="w-10 h-10 text-dpc-gold-400 mx-auto mb-3 opacity-80" />
            <h4 className="text-base font-bold text-white font-serif mb-1">
              No Upcoming Events in this Category
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              All past activities have concluded. Check back soon for new announcements or join our weekly Lord's Day worship!
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

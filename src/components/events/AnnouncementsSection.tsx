import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, BellRing, Pin, Megaphone, CheckCircle2, Tv, } from 'lucide-react';
import { EVENTS_DATA } from '../../data/eventsData';
import { ChurchEvent, Ministry } from '../../types/church';
import { MINISTRIES_DATA } from '../../data/ministriesData';
import { ImageStreamHero, StreamImage } from '@/components/ui/image-stream-hero';
import { fetchAnnouncements, fetchEvents, BackendAnnouncement } from '../../services/api';
import { ChurchVideoHub } from '../video/ChurchVideoHub';
import { ScriptureReveal } from '../ui/ScriptureReveal';


interface AnnouncementsSectionProps {
  onSelectEvent: (event: ChurchEvent) => void;
  onPlanVisitClick?: () => void;
  onSelectMinistry?: (ministry: Ministry) => void;
}

// Import real authentic photos from each ministry folder in src/assets
import streamKinder from '@/assets/Kinder Ministry/516368798_4004060663255125_3940156298598136062_n.jpg';
import streamElem from '@/assets/Elementary Ministry/480577141_481392148377786_6333824624822562519_n.jpg';
import streamHs from '@/assets/High School Ministry/680044493_935616212628115_2898471636377619378_n.jpg';
import streamYouthCamp from '@/assets/Youth Ministry/656680392_958771106489110_8611197159791022889_n.jpg';
import streamYouthPraise from '@/assets/Youth Ministry/714759264_1015627274136826_7581065074620186600_n.jpg';
import streamYA from '@/assets/Young Adult Ministry/505320113_661118810260117_450252600683907860_n.jpg';
import streamYAMission from '@/assets/Young Adult Ministry/690603367_927892950249367_8826331412381259866_n.jpg';
import streamCouples from '@/assets/Junior Adult Minitry/615576920_889621683718381_8998977265371590367_n.jpg';
import streamSeniors from '@/assets/Old Adult Ministry/722769534_122172250904944863_7045558778597727105_n.jpg';
import streamSeniorsAgape from '@/assets/Old Adult Ministry/724408784_122172253130944863_6588021141249655795_n.jpg';

// Curated church event and ministry gathering photographs from real DPC community
const CHURCH_EVENT_STREAM_IMAGES: StreamImage[] = [
  {
    src: streamYouthCamp,
    alt: 'Camarines Norte Youth Camp & Retreat Gathering',
  },
  {
    src: streamKinder,
    alt: 'Seeds of Grace Sunday School & Children Bible Storytelling',
  },
  {
    src: streamHs,
    alt: 'Ignite Teens High School Fellowship & Discipleship',
  },
  {
    src: streamElem,
    alt: 'Covenant Kids Elementary Sunday School & Vacation Bible School',
  },
  {
    src: streamYouthPraise,
    alt: 'DPC Sanctuary Acoustic Praise & Band Exaltation Team',
  },
  {
    src: streamYA,
    alt: 'Ambassadors for Christ Young Adults Roundtable & Fellowship',
  },
  {
    src: streamCouples,
    alt: 'Pillars of Faith Couples & Family Covenant Retreat',
  },
  {
    src: streamYAMission,
    alt: 'Daet Community Gospel Outreach & Medical Mission',
  },
  {
    src: streamSeniors,
    alt: 'Golden Heritage Senior Saints Morning Devotions & Prayer',
  },
  {
    src: streamSeniorsAgape,
    alt: 'Churchwide Thanksgiving & Agape Fellowship Gathering',
  },
];

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

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter((e) => e.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="events" className="py-16 sm:py-20 bg-gradient-to-b from-dpc-navy-950 via-dpc-navy-900 to-dpc-navy-950 relative overflow-hidden section-render-opt">

      {/* ========================================================= */}
      {/* --- FULL-WIDTH EDGE-TO-EDGE 3D IMAGE STREAM CORRIDOR --- */}
      {/* ========================================================= */}
      <div className="w-full relative overflow-hidden">
        <ImageStreamHero
          images={CHURCH_EVENT_STREAM_IMAGES}
          speed={22}
          cards={8}
          axis={52}
          className="h-[340px] sm:h-[420px] md:h-[500px] w-full border-0 bg-transparent overflow-hidden relative"
        >
          {/* Subtle Ambient Vignettes & Vertical Fades */}
          <div className="absolute inset-0 bg-gradient-to-t from-dpc-navy-950 via-dpc-navy-950/20 to-dpc-navy-950/50 pointer-events-none z-0"></div>
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-dpc-navy-950 to-transparent pointer-events-none z-0"></div>
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-dpc-navy-950 to-transparent pointer-events-none z-0"></div>

          {/* Centered Floating Overlay Content - No Box */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center py-6 sm:py-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pointer-events-none">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif text-white tracking-tight [text-shadow:_0_4px_20px_rgb(0_0_0_/_95%)]">
                Witness God’s Faithfulness <br className="hidden sm:inline" />
                <span className="gold-shimmer">In Motion</span>
              </h2>

              {/* Floating Verse with Word-by-Word Reveal */}
              <div className="max-w-2xl mx-auto pt-1">
                <ScriptureReveal
                  quote="God is Spirit, and those who worship Him must worship in spirit and truth."
                  reference="John 4:24"
                  version="ESV"
                  showQuoteMarks={true}
                  highlightWords={['Spirit', 'truth', 'worship']}
                  quoteClassName="text-sm sm:text-base md:text-lg text-white font-serif italic leading-relaxed tracking-wide [text-shadow:_0_2px_12px_rgb(0_0_0_/_95%)]"
                  referenceClassName="!mt-2"
                  align="center"
                  staggerDelay={0.04}
                  initialDelay={0.2}
                />
              </div>
            </div>
          </div>
        </ImageStreamHero>
      </div>

      {/* ========================================================= */}
      {/* --- 2. VIRTUAL CINEMA & MINISTRY VIDEO ORIENTATION HUB --- */}
      {/* ========================================================= */}
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
        {announcements.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Megaphone className="w-4 h-4 text-dpc-gold-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-dpc-gold-300">
                Official Ministry Bulletins ({announcements.length})
              </h3>
              {isLiveAnnouncements && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Connected
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {announcements.map((ann) => (
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

      </div>
    </section>
  );
};

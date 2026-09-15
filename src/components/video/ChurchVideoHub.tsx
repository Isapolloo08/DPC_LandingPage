import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Film,
  Clock,
  Users,
  CheckCircle2,
  Compass,
  ArrowRight,
  Tv,
  Share2,
  Check,
  RotateCcw,
  Church,
  GraduationCap,
  Sparkles,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { VIDEO_ORIENTATIONS_DATA } from '../../data/videoOrientationsData';
import { VideoOrientation, VideoChapter, Ministry } from '../../types/church';
import { ScriptureReveal } from '../ui/ScriptureReveal';
import { fetchMinistries } from '../../services/api';
import { MINISTRIES_DATA } from '../../data/ministriesData';

interface ChurchVideoHubProps {
  onPlanVisitClick: () => void;
  onSelectMinistryModal?: (ministryId: string) => void;
}

export const ChurchVideoHub: React.FC<ChurchVideoHubProps> = ({
  onPlanVisitClick,
  onSelectMinistryModal,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoOrientation>(
    VIDEO_ORIENTATIONS_DATA[0]
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [ministriesMap, setMinistriesMap] = useState<Record<string, Ministry>>({});
  const [isBackendLive, setIsBackendLive] = useState<boolean>(false);

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  // Fetch live ministries and coordinators from backend on mount
  useEffect(() => {
    let isMounted = true;
    async function loadMinistryData() {
      try {
        const { data, isLive } = await fetchMinistries();
        if (!isMounted) return;
        setIsBackendLive(isLive);
        const map: Record<string, Ministry> = {};
        (data && data.length > 0 ? data : MINISTRIES_DATA).forEach((m) => {
          map[m.id] = m;
        });
        setMinistriesMap(map);
      } catch (err) {
        console.warn('Could not fetch live ministries for Video Hub, using local data:', err);
        const map: Record<string, Ministry> = {};
        MINISTRIES_DATA.forEach((m) => {
          map[m.id] = m;
        });
        setMinistriesMap(map);
      }
    }
    loadMinistryData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to get enriched live ministry for a video
  const getLiveMinistry = (ministryId?: string): Ministry | undefined => {
    if (!ministryId) return undefined;
    return ministriesMap[ministryId] || MINISTRIES_DATA.find((m) => m.id === ministryId);
  };

  // Filter categories
  const categories = [
    { id: 'all', label: `All Orientations (${VIDEO_ORIENTATIONS_DATA.length})`, icon: Film },
    { id: 'general', label: 'General & CNYC Tour (2)', icon: Church },
    { id: 'children-youth', label: 'Children & Youth (4)', icon: GraduationCap },
    { id: 'adults', label: 'Adults & Seniors (3)', icon: Users },
  ];

  const filteredVideos = VIDEO_ORIENTATIONS_DATA.filter((v) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'general') return v.category === 'general' || v.category === 'facilities';
    if (selectedCategory === 'children-youth')
      return (
        v.ministryId === 'kinder' ||
        v.ministryId === 'elementary' ||
        v.ministryId === 'high-school' ||
        v.ministryId === 'youth'
      );
    if (selectedCategory === 'adults')
      return (
        v.ministryId === 'young-adult' ||
        v.ministryId === 'junior-adult' ||
        v.ministryId === 'old-adult'
      );
    return true;
  });

  // Switch active video
  const handleSelectVideo = (video: VideoOrientation) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    setActiveChapter(null);

    // Smooth scroll to video viewport on smaller screens
    if (window.innerWidth < 1024 && playerContainerRef.current) {
      playerContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Jump to specific chapter timestamp
  const handleSeekChapter = (chapter: VideoChapter, index: number) => {
    setActiveChapter(index);
    setIsPlaying(true);
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = chapter.timeSeconds;
      videoElementRef.current.play().catch(() => {});
    }
  };

  // Share / Copy Link
  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}#videos?id=${selectedVideo.id}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const activeMinistry = getLiveMinistry(selectedVideo.ministryId);

  return (
    <div
      id="videos"
      ref={playerContainerRef}
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[180px] sm:h-[320px] bg-dpc-gold-500/10 blur-2xl sm:blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[240px] sm:w-[400px] h-[180px] sm:h-[300px] bg-cyan-500/5 blur-2xl sm:blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-3 shadow-sm">
            <Tv className="w-3.5 h-3.5" />
            <span>Virtual Cinema & Orientation Hub</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
            Watch Our Church Life & <span className="gold-shimmer">Ministry Orientations</span>
          </h2>

          <div className="max-w-2xl mx-auto mt-3">
            <ScriptureReveal
              quote="Come and see what God has done: He is awesome in His deeds toward the children of man."
              reference="Psalm 66:5"
              version="ESV"
              showQuoteMarks={false}
              highlightWords={['Come', 'see', 'awesome', 'deeds']}
              quoteClassName="text-sm sm:text-base text-slate-200 font-serif italic leading-relaxed"
              referenceClassName="!mt-1.5"
              align="center"
              staggerDelay={0.04}
              initialDelay={0.15}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-dpc-gold-400 text-dpc-navy-950 shadow-gold-glow scale-[1.02]'
                    : 'bg-dpc-navy-800/80 hover:bg-dpc-navy-700 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* --- MAIN CINEMA THEATER VIEWPORT --- */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Main Video Viewport (16:9 Screen) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border border-dpc-gold-500/30 shadow-2xl group">
              
              {isPlaying ? (
                /* Active Video Player */
                <div className="w-full h-full relative bg-black flex items-center justify-center">
                  {selectedVideo.videoUrl ? (
                    <video
                      ref={videoElementRef}
                      src={selectedVideo.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0 absolute inset-0"
                    />
                  )}
                  
                  {/* Floating Stop/Reset Button */}
                  <button
                    onClick={() => {
                      if (videoElementRef.current) {
                        videoElementRef.current.pause();
                      }
                      setIsPlaying(false);
                    }}
                    className="absolute top-3 right-3 z-30 p-2 rounded-xl bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-lg"
                    title="Close Video / Return to Poster"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Close Player</span>
                  </button>
                </div>
              ) : (
                /* Poster Thumbnail with Glowing Play Trigger */
                <div
                  onClick={() => setIsPlaying(true)}
                  className="w-full h-full relative cursor-pointer flex items-center justify-center"
                >
                  {/* Background High-res Poster */}
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />

                  {/* Dark Cinema Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 group-hover:via-black/30 transition-colors" />

                  {/* Top Tags */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dpc-gold-500/20 border border-dpc-gold-500/40 backdrop-blur-md text-dpc-gold-300 text-xs font-bold uppercase tracking-wider">
                      <Film className="w-3.5 h-3.5" />
                      <span>{selectedVideo.categoryLabel}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-white font-mono text-xs backdrop-blur-md">
                      <Clock className="w-3.5 h-3.5 text-dpc-gold-400" />
                      <span>{selectedVideo.duration}</span>
                    </span>
                  </div>

                  {/* Center Glowing Big Play Button */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <span className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dpc-gold-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-tr from-dpc-gold-500 via-dpc-gold-400 to-amber-300 items-center justify-center text-dpc-navy-950 shadow-[0_0_30px_rgba(212,175,55,0.9)] group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
                      </span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/80 border border-white/20 text-white text-xs font-bold backdrop-blur-md shadow-md">
                      Click to Play Orientation Video
                    </span>
                  </div>

                  {/* Bottom Video Headline Overlay */}
                  <div className="absolute bottom-4 inset-x-4 z-10 text-left">
                    <h3 className="text-base sm:text-xl font-bold font-serif text-white drop-shadow-md leading-tight">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light drop-shadow-sm line-clamp-1 mt-0.5">
                      {selectedVideo.subtitle}
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Video Chapter Timestamps */}
            {selectedVideo.chapters && selectedVideo.chapters.length > 0 && (
              <div className="mt-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-[11px] font-bold uppercase tracking-wider text-dpc-gold-400 shrink-0 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Chapters:</span>
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {selectedVideo.chapters.map((ch, idx) => (
                    <button
                      key={ch.timeLabel}
                      onClick={() => handleSeekChapter(ch, idx)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                        activeChapter === idx
                          ? 'bg-dpc-gold-400 text-dpc-navy-950 font-bold shadow-sm'
                          : 'bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10'
                      }`}
                    >
                      <span className="font-mono text-[11px] font-semibold text-dpc-gold-300">
                        {ch.timeLabel}
                      </span>
                      <span>{ch.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Video Metadata & Live Database Coordinator Card */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl glass-panel-gold p-6 sm:p-7 border-dpc-gold-500/40 shadow-2xl space-y-6">
            <div className="space-y-4">
              
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dpc-gold-500/15 border border-dpc-gold-500/30 text-xs font-bold uppercase text-dpc-gold-400">
                  <Film className="w-3.5 h-3.5" />
                  <span>{selectedVideo.categoryLabel}</span>
                </span>

                <span className="text-xs font-mono text-slate-400">
                  ⏱️ {selectedVideo.duration}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-bold font-serif text-white leading-snug">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-dpc-gold-200/90 mt-1 font-light">
                  {selectedVideo.subtitle}
                </p>
              </div>

              {/* Orientation Description */}
              <div className="p-3.5 rounded-2xl bg-dpc-navy-950/80 border border-white/10">
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {selectedVideo.description}
                </p>
              </div>

              {/* Live Target Audience & Ministry Coordinator from Backend */}
              <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs text-slate-300">
                {selectedVideo.targetAudience && (
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-dpc-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-bold">Target Demographic / Age:</span>
                      <span className="text-white font-medium">
                        {activeMinistry ? `${activeMinistry.ageBracket} (${activeMinistry.ageRange})` : selectedVideo.targetAudience}
                      </span>
                    </div>
                  </div>
                )}

                {/* Coordinator / Leader (Fetched dynamically from Database) */}
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-bold">
                        Ministry Coordinator / Faculty:
                      </span>
                      {isBackendLive && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Live DB
                        </span>
                      )}
                    </div>
                    <p className="text-white font-semibold">
                      {activeMinistry ? activeMinistry.leader : selectedVideo.leader}
                      {activeMinistry?.leaderTitle && (
                        <span className="text-slate-400 font-normal text-[11px] block">
                          {activeMinistry.leaderTitle}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Schedule & Location (If mapped to a ministry) */}
                {activeMinistry?.schedule && (
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-dpc-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-bold">Regular Schedule:</span>
                      <span className="text-white font-medium">{activeMinistry.schedule}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Key Highlights */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  What You'll Discover in this Orientation:
                </span>
                <ul className="space-y-1.5">
                  {selectedVideo.keyHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <span className="text-dpc-gold-400 font-bold mt-0.5">✦</span>
                      <span className="leading-snug">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              {/* If mapped to a ministry, allow opening ministry details modal */}
              {selectedVideo.ministryId && onSelectMinistryModal && (
                <button
                  onClick={() => onSelectMinistryModal(selectedVideo.ministryId!)}
                  className="w-full py-2.5 px-3 rounded-xl bg-dpc-gold-500/20 hover:bg-dpc-gold-500/30 text-dpc-gold-300 border border-dpc-gold-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.01]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-dpc-gold-400" />
                  <span>View Full Ministry Gallery & Connect</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                </button>
              )}

              <button
                onClick={onPlanVisitClick}
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow text-center cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <span>Plan a Visit This Sunday</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleShare}
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Orientation Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-dpc-gold-400" />
                    <span>Share This Orientation Reel</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* --- MINISTRY & TOUR PLAYLIST CAROUSEL / GRID --- */}
        {/* ========================================================= */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-dpc-gold-400" />
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                Select a Ministry Orientation or Tour Reel to Watch
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Showing {filteredVideos.length} orientation reels
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVideos.map((video) => {
              const isSelected = selectedVideo.id === video.id;
              const liveMin = getLiveMinistry(video.ministryId);
              const coordinator = liveMin ? liveMin.leader : video.leader;

              return (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-dpc-navy-900 border-dpc-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-[1.02]'
                      : 'bg-dpc-navy-900/60 hover:bg-dpc-navy-900/90 border-white/10 hover:border-dpc-gold-500/40'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Duration Badge */}
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 border border-white/20 text-[10px] font-mono font-bold text-white backdrop-blur-sm">
                      {video.duration}
                    </span>

                    {/* Active State / Soundwave Pill */}
                    {isSelected ? (
                      <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-dpc-gold-400 text-dpc-navy-950 text-[10px] font-extrabold shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-dpc-navy-950 animate-ping" />
                        <span>NOW PLAYING</span>
                      </div>
                    ) : (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-dpc-gold-300 backdrop-blur-sm">
                        {video.categoryLabel}
                      </span>
                    )}

                    {/* Hover Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-10 h-10 rounded-full bg-dpc-gold-400 text-dpc-navy-950 flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </span>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className={`text-xs sm:text-sm font-bold line-clamp-1 ${
                        isSelected ? 'text-dpc-gold-300' : 'text-white group-hover:text-dpc-gold-200'
                      }`}>
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-slate-300 font-light line-clamp-2 mt-1 leading-snug">
                        {video.subtitle}
                      </p>
                    </div>

                    <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="truncate max-w-[140px] font-medium text-slate-300">
                        👤 {coordinator || 'Ministry Coordinator'}
                      </span>
                      <span className="text-dpc-gold-400 font-semibold group-hover:underline">
                        Watch Reel ↗
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChurchVideoHub;

import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Film,
  Sparkles,
  Clock,
  Users,
  CheckCircle2,
  Maximize2,
  Volume2,
  Compass,
  ArrowRight,
  Tv,
  Share2,
  Check,
  RotateCcw,
  Church,
  GraduationCap,
} from 'lucide-react';
import { VIDEO_ORIENTATIONS_DATA } from '../../data/videoOrientationsData';
import { VideoOrientation, VideoChapter } from '../../types/church';
import { ScriptureReveal } from '../ui/ScriptureReveal';

interface ChurchVideoHubProps {
  onPlanVisitClick: () => void;
  onSelectMinistryModal?: (ministryId: string) => void;
}

export const ChurchVideoHub: React.FC<ChurchVideoHubProps> = ({
  onPlanVisitClick,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoOrientation>(
    VIDEO_ORIENTATIONS_DATA[0]
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);

  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Filter videos based on category
  const categories = [
    { id: 'all', label: 'All Orientations (8)', icon: Film },
    { id: 'general', label: 'General Sanctuary Tour', icon: Church },
    { id: 'youth-kids', label: 'Youth & Children (4)', icon: GraduationCap },
    { id: 'adults', label: 'Adults & Seniors (3)', icon: Users },
  ];

  const filteredVideos = VIDEO_ORIENTATIONS_DATA.filter((v) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'general') return v.category === 'general';
    if (selectedCategory === 'youth-kids')
      return (
        v.id === 'seeds-of-grace' ||
        v.id === 'covenant-kids' ||
        v.id === 'cyc-youth' ||
        v.id === 'koinonia-ya'
      );
    if (selectedCategory === 'adults')
      return (
        v.id === 'men-of-grace' ||
        v.id === 'titus-2-women' ||
        v.id === 'calebs-generation'
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
  };

  // Share / Copy Link
  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}#videos?id=${selectedVideo.id}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      id="videos"
      ref={playerContainerRef}
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-dpc-gold-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

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
        {/* --- MAIN CINEMA THEATER VIEWPORT (Option 1) --- */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Main Video Viewport (16:9 Screen) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border border-dpc-gold-500/30 shadow-2xl group">
              
              {isPlaying ? (
                /* Active Video Player Iframe */
                <div className="w-full h-full relative bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0 absolute inset-0"
                  />
                  
                  {/* Floating Stop/Reset Button */}
                  <button
                    onClick={() => setIsPlaying(false)}
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
                      Click to Play Orientation
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

            {/* Video Chapter Timestamps (If present) */}
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

          {/* Video Metadata & Connection Panel */}
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

              {/* Target Audience & Ministry Leader */}
              <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-slate-300">
                {selectedVideo.targetAudience && (
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-dpc-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Target Age / Audience:</span>
                      <span className="text-white font-medium">{selectedVideo.targetAudience}</span>
                    </div>
                  </div>
                )}

                {selectedVideo.leader && (
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Ministry Faculty / Leadership:</span>
                      <span className="text-white font-medium">{selectedVideo.leader}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Key Highlights */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Key Highlights in This Video:
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
                    <span className="text-emerald-400">Video Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-dpc-gold-400" />
                    <span>Share This Video Orientation</span>
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
                Select a Ministry or Tour Video to Watch
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Showing {filteredVideos.length} orientation reels
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVideos.map((video) => {
              const isSelected = selectedVideo.id === video.id;

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
                        {video.leader || 'DPC Ministry'}
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

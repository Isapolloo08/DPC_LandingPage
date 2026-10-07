import { responsiveImage } from "../../lib/responsiveImages";
import { useRef, useState } from "react";
import { ArrowRight, Play, RotateCcw } from "lucide-react";
import { VIDEO_ORIENTATIONS_DATA } from "../../data/videoOrientationsData";
import { VideoOrientation } from "../../types/church";
import { ScrollReveal } from "../ui/ScrollReveal";

interface ChurchVideoHubProps {
  onPlanVisitClick: () => void;
  onSelectMinistryModal?: (ministryId: string) => void;
}

export const ChurchVideoHub = ({
  onPlanVisitClick,
  onSelectMinistryModal,
}: ChurchVideoHubProps) => {
  const [selected, setSelected] = useState<VideoOrientation>(
    VIDEO_ORIENTATIONS_DATA[3] || VIDEO_ORIENTATIONS_DATA[0],
  );
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const chooseVideo = (video: VideoOrientation) => {
    setSelected(video);
    setPlaying(false);
    setFailed(false);

    // The playlist sits below the player at this layout breakpoint.
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    requestAnimationFrame(() => {
      const player = playerRef.current;
      if (!player) return;
      player.querySelector<HTMLButtonElement>(".video-poster")?.focus({ preventScroll: true });
      const header = document.querySelector<HTMLElement>(".site-header");
      const headerBottom = Math.max(0, header?.getBoundingClientRect().bottom ?? 0);
      window.scrollTo({
        top: Math.max(0, window.scrollY + player.getBoundingClientRect().top - headerBottom - 16),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    });
  };
  return (
    <section id="videos" className="video-section">
      <div className="page-container">
        <ScrollReveal className="section-heading">
          <div>
            <h2>
              Real people.
              <br />
              <em>Faith in everyday life.</em>
            </h2>
          </div>
          <p className="section-description">
            Meet our ministries before you visit. Discover the people and
            moments that make DPC a family.
          </p>
        </ScrollReveal>
        <ScrollReveal className="video-grid" delay={0.08}>
          <div ref={playerRef} className="video-player">
            {!playing ? (
              <button
                className="video-poster"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${selected.title}`}
              >
                <img
                  {...responsiveImage(selected.thumbnail, "(max-width: 900px) calc(100vw - 40px), 60vw")}
                  alt={selected.categoryLabel + " community"}
                  loading="lazy"
                />
                <span className="video-play-icon">
                  <Play size={24} fill="currentColor" />
                </span>
                <span className="video-poster-caption">
                  <small>MEET THE COMMUNITY</small>
                  <strong>{selected.categoryLabel}</strong>
                </span>
                <span className="video-duration">{selected.duration}</span>
              </button>
            ) : failed ? (
              <div className="video-error">
                <p>This video couldn’t be loaded.</p>
                <button
                  className="button button-gold"
                  onClick={() => {
                    setFailed(false);
                    setPlaying(false);
                  }}
                >
                  Try again <RotateCcw size={16} />
                </button>
              </div>
            ) : selected.videoUrl ? (
              <video
                key={selected.id}
                ref={videoRef}
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={selected.thumbnail}
                onError={() => setFailed(true)}
              >
                <source src={selected.videoUrl} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            ) : selected.youtubeId ? (
              <iframe
                title={selected.title}
                src={`https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1`}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <div className="video-error">
                <p>This ministry video is coming soon.</p>
                <button
                  className="button button-gold"
                  onClick={onPlanVisitClick}
                >
                  Meet us in person <ArrowRight size={16} />
                </button>
              </div>
            )}
            <div className="video-details">
              <h3>{selected.title}</h3>
              <p>{selected.subtitle}</p>
              {playing && !failed && selected.videoUrl && selected.chapters && (
                <div className="video-chapters" aria-label="Video chapters">
                  {selected.chapters.map((chapter) => (
                    <button
                      key={chapter.timeSeconds}
                      onClick={() => {
                        if (videoRef.current)
                          videoRef.current.currentTime = chapter.timeSeconds;
                      }}
                    >
                      {chapter.timeLabel} · {chapter.title}
                    </button>
                  ))}
                </div>
              )}
              {selected.ministryId && onSelectMinistryModal && (
                <button
                  className="text-link"
                  onClick={() => onSelectMinistryModal(selected.ministryId!)}
                >
                  Explore this ministry <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>
          <div className="video-playlist">
            <span className="eyebrow">FIND YOUR PEOPLE</span>
            {VIDEO_ORIENTATIONS_DATA.map((video) => (
              <button
                key={video.id}
                className={selected.id === video.id ? "active" : ""}
                onClick={() => chooseVideo(video)}
                aria-pressed={selected.id === video.id}
              >
                <img {...responsiveImage(video.thumbnail, "68px")} alt="" loading="lazy" />
                <span>
                  <strong>{video.categoryLabel}</strong>
                  <small>{video.duration} · Ministry introduction</small>
                </span>
                <Play size={15} />
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

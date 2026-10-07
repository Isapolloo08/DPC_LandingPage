import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { CHURCH_PHOTOS } from "@/data/churchPhotos";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const ChurchPhotoStream = () => {
  const [paused, setPaused] = useState(false);
  return (
    <figure
      className="church-photo-stream"
      aria-label="Photo carousel of life in our church family"
    >
      <ScrollReveal className="church-stream-frame" effect="reveal">
        <ImageStreamHero
          images={CHURCH_PHOTOS}
          speed={28}
          cards={12}
          paused={paused}
          axis={50}
          path={{
            cardWidth: 23,
            cardHeight: 25,
            birthHeight: 8,
            exitHeight: 38,
            railBirth: -8,
            railExit: 48,
            fan: 2.8,
            cardRadius: 0.8,
          }}
          className="church-stream"
        >
          <div className="church-stream-fade" />
        </ImageStreamHero>
      </ScrollReveal>
      <figcaption className="page-container church-stream-caption">
        <div>
          <span className="eyebrow">LIFE TOGETHER AT DPC</span>
          <p>Every generation. One church family.</p>
        </div>
      </figcaption>
    </figure>
  );
};

export default ChurchPhotoStream;

import { useRef, type FC } from "react";
import { Clock, MapPin, ArrowRight, ArrowDown } from "lucide-react";
import { ChurchModelHero } from "./ChurchModelHero";
import { useCinematicHero } from "./useCinematicHero";
import { useHeroEntrance } from "./useHeroEntrance";
interface HeroBannerProps {
  onPlanVisitClick: () => void;
}
export const HeroBanner: FC<HeroBannerProps> = ({ onPlanVisitClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  useHeroEntrance(heroRef);
  useCinematicHero(heroRef);
  return (
    <section ref={heroRef} id="home" className="hero-section">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="page-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" /> A REFORMED CHURCH. A WELCOMING
            FAMILY.
          </p>
          <h1>
            <span className="hero-title-line">Rooted in grace.</span>
            <br />
            <span className="hero-title-line">Growing in faith.</span>
            <br />
            <span className="hero-title-line">
              <em>United in Christ.</em>
            </span>
          </h1>
          <div className="hero-details-entrance">
            <p className="hero-description">
              Welcome to Daet Presbyterian Church. A loving, gospel-centered
              family in Bicol, sharing life through Biblical truth,
              Christ-exalting worship, and warm fellowship.
            </p>
            <div className="hero-actions">
              <button className="button button-navy" onClick={onPlanVisitClick}>
                Plan your first visit <ArrowRight size={16} />
              </button>
              <a className="text-link" href="#services">
                <Clock size={15} /> Sunday worship times
              </a>
            </div>
            <p className="hero-location">
              <MapPin size={14} /> Cobangbang, Daet · Camarines Norte
            </p>
          </div>
        </div>
        <ChurchModelHero />
      </div>
      <div className="page-container hero-bottom">
        <span>Biblical truth. Meaningful worship. Warm fellowship.</span>
        <a href="#about">
          GET TO KNOW US <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
};
export default HeroBanner;

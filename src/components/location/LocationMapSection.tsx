import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, Mail, MapPin, RotateCw } from "lucide-react";
import { CHURCH_INFO } from "../../data/churchInfo";
import { ExpandMap } from "@/components/ui/expand-map";
import { ScrollReveal } from "../ui/ScrollReveal";

interface LocationMapSectionProps {
  onPlanVisitClick: () => void;
}
export const LocationMapSection = ({
  onPlanVisitClick,
}: LocationMapSectionProps) => {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const flippedByUser = useRef(false);
  useEffect(() => {
    if (!flippedByUser.current) return;
    (flipped ? backButton : frontButton).current?.focus({ preventScroll: true });
  }, [flipped]);
  const reducedMotion = useReducedMotion();
  const address = CHURCH_INFO.address;
  const handleTilt = (event: MouseEvent<HTMLDivElement>) => {
    if (
      flipped ||
      reducedMotion ||
      window.matchMedia("(pointer: coarse)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: -((event.clientY - rect.top) / rect.height - 0.5) * 8,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 8,
    });
  };
  return (
    <section id="location" className="location-section">
      <ScrollReveal className="page-container location-grid interactive-location-grid">
        <div className="location-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" /> COME AS YOU ARE
          </p>
          <h2>
            A place to worship.
            <br />
            <em>A place to belong.</em>
          </h2>
          <p className="section-description">
            You'll find us in Cobangbang, Daet. Whether you're coming from
            across town or visiting Bicol, we'd love to welcome you.
          </p>
          <div
            className="sanctuary-card"
            onMouseMove={handleTilt}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <motion.div
              className="sanctuary-card-inner"
              animate={{
                rotateY: flipped ? 180 : tilt.y,
                rotateX: flipped ? 0 : tilt.x,
              }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 100, damping: 20 }
              }
            >
              <button
                ref={frontButton}
                type="button"
                className="sanctuary-front"
                aria-label="View church visiting information"
                aria-expanded={flipped}
                tabIndex={flipped ? -1 : 0}
                aria-hidden={flipped}
                onClick={() => {
                  setTilt({ x: 0, y: 0 });
                  flippedByUser.current = true;
                  setFlipped(true);
                }}
              >
                <img
                  src="/images/church-building.webp"
                  alt="Daet Presbyterian Church and Camarines Norte Youth Center building"
                  loading="lazy"
                />
                <span className="sanctuary-flip-hint">
                  <RotateCw size={13} /> View visiting information
                </span>
                <span className="sanctuary-caption">
                  <small>OUR CHURCH HOME</small>
                  <strong>
                    Room for you.
                    <br />
                    Room to grow.
                  </strong>
                </span>
              </button>
              <div
                className="sanctuary-back"
                aria-hidden={!flipped}
                inert={!flipped}
              >
                <p className="eyebrow">WE'LL SAVE YOU A SEAT</p>
                <h3>Your Sunday starts here.</h3>
                <p className="sanctuary-service">
                  <Clock size={17} />
                  <span>
                    <strong>Sunday worship</strong>10:00 AM – 11:30 AM
                  </span>
                </p>
                <p className="sanctuary-service">
                  <MapPin size={17} />
                  <span>
                    <strong>Cobangbang, Daet</strong>Near Mary's Bright
                    Montessori
                  </span>
                </p>
                <a
                  href={"mailto:" + CHURCH_INFO.contact.email}
                  className="location-email"
                >
                  <Mail size={15} />
                  {CHURCH_INFO.contact.email}
                </a>
                <div className="sanctuary-back-actions">
                  <button
                    className="button button-navy"
                    onClick={onPlanVisitClick}
                  >
                    Plan a visit <ArrowRight size={15} />
                  </button>
                  <button
                    ref={backButton}
                    className="text-link"
                    onClick={() => setFlipped(false)}
                  >
                    <RotateCw size={14} />
                    Back to photo
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="location-actions">
            <button className="text-link" onClick={onPlanVisitClick}>
              Let us know you're coming <ArrowRight size={15} />
            </button>
          </div>
        </div>
        <ExpandMap
          title={CHURCH_INFO.name}
          address={
            address.street +
            ", " +
            address.barangay +
            ", " +
            address.municipality +
            ", " +
            address.province +
            " " +
            address.zipCode
          }
          landmark="In front of Bicol CATV, near Mary's Bright Montessori"
          lat={address.mapCoordinates.lat}
          lng={address.mapCoordinates.lng}
        />
      </ScrollReveal>
    </section>
  );
};
export default LocationMapSection;

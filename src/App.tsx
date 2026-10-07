import { useState } from "react";
import "./landing.css";
import { StickyNavbar } from "./components/layout/StickyNavbar";
import { HeroBanner } from "./components/hero/HeroBanner";
import { ServiceCountdown } from "./components/hero/ServiceCountdown";
import { WhatToExpectSection } from "./components/visitor/WhatToExpectSection";
import { PlanVisitModal } from "./components/visitor/PlanVisitModal";
import { MinistriesSection } from "./components/ministries/MinistriesSection";
import { MinistryDetailModal } from "./components/ministries/MinistryDetailModal";
import { AnnouncementsSection } from "./components/events/AnnouncementsSection";
import { EventRsvpModal } from "./components/events/EventRsvpModal";
import { LocationMapSection } from "./components/location/LocationMapSection";
import { Footer } from "./components/layout/Footer";
import { CHURCH_INFO } from "./data/churchInfo";
import { Ministry, ChurchEvent } from "./types/church";
import { ScrollReveal } from "./components/ui/ScrollReveal";

export const App = () => {
  const [isPlanVisitOpen, setIsPlanVisitOpen] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(
    null,
  );
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const openVisit = () => setIsPlanVisitOpen(true);
  return (
    <div className="landing-page">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <StickyNavbar onPlanVisitClick={openVisit} />
      <main id="main-content">
        <HeroBanner onPlanVisitClick={openVisit} />
        <ServiceCountdown />
        <WhatToExpectSection onPlanVisitClick={openVisit} />
        <MinistriesSection onSelectMinistry={setSelectedMinistry} />
        <section className="scripture-section">
          <ScrollReveal className="page-container">
            <span className="scripture-symbol" aria-hidden="true">
              “
            </span>
            <blockquote>{CHURCH_INFO.verseText}</blockquote>
            <p>
              {CHURCH_INFO.verseRef} <span>·</span> ONE BODY. MANY MEMBERS.
            </p>
          </ScrollReveal>
        </section>
        <AnnouncementsSection
          onSelectEvent={setSelectedEvent}
          onPlanVisitClick={openVisit}
          onSelectMinistry={setSelectedMinistry}
        />
        <LocationMapSection onPlanVisitClick={openVisit} />
      </main>
      <Footer onPlanVisitClick={openVisit} />
      <PlanVisitModal
        isOpen={isPlanVisitOpen}
        onClose={() => setIsPlanVisitOpen(false)}
      />
      <MinistryDetailModal
        key={selectedMinistry?.id || "closed-ministry"}
        ministry={selectedMinistry}
        isOpen={!!selectedMinistry}
        onClose={() => setSelectedMinistry(null)}
      />
      <EventRsvpModal
        key={selectedEvent?.id || "closed-event"}
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};
export default App;

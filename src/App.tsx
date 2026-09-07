import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Domain Components
import { TopAnnouncementBar } from './components/layout/TopAnnouncementBar';
import { StickyNavbar } from './components/layout/StickyNavbar';
import { HeroBanner } from './components/hero/HeroBanner';
import { ServiceCountdown } from './components/hero/ServiceCountdown';
import { WhatToExpectSection } from './components/visitor/WhatToExpectSection';
import { PlanVisitModal } from './components/visitor/PlanVisitModal';
import { MinistriesSection } from './components/ministries/MinistriesSection';
import { MinistryDetailModal } from './components/ministries/MinistryDetailModal';
import { AnnouncementsSection } from './components/events/AnnouncementsSection';
import { EventRsvpModal } from './components/events/EventRsvpModal';
import { LocationMapSection } from './components/location/LocationMapSection';
import { Footer } from './components/layout/Footer';

import { Ministry, ChurchEvent } from './types/church';

export const App: React.FC = () => {
  // Modal states
  const [isPlanVisitOpen, setIsPlanVisitOpen] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);

  // GSAP Animations with Clean Lifecycle & Compositor Performance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Section Entrances using GPU-accelerated transforms & opacity
      const animatedSections = [
        '#services',
        '#what-to-expect',
        '#ministries',
        '#events',
        '#location',
      ];

      animatedSections.forEach((selector) => {
        const el = document.querySelector(selector);
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0.85, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }
      });
    }, mainRef);

    return () => ctx.revert(); // GSAP context cleanup on unmount
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen flex flex-col bg-dpc-navy-950 text-slate-100 selection:bg-dpc-gold-500 selection:text-dpc-navy-950">
      
      {/* 1. Top Announcement Marquee */}
      <TopAnnouncementBar onPlanVisitClick={() => setIsPlanVisitOpen(true)} />

      {/* 2. Sticky Header & Navigation */}
      <StickyNavbar
        onPlanVisitClick={() => setIsPlanVisitOpen(true)}
      />

      <main className="flex-1">
        {/* 3. Hero Banner with Romans 12:5 & Call to Action */}
        <HeroBanner
          onPlanVisitClick={() => setIsPlanVisitOpen(true)}
        />

        {/* 4. Service Times & Live Calculating Countdown */}
        <ServiceCountdown />

        {/* 5. "What to Expect" First-Time Visitor Guide */}
        <WhatToExpectSection onPlanVisitClick={() => setIsPlanVisitOpen(true)} />

        {/* 6. The 7 Age-Bracket Ministries Showcase */}
        <MinistriesSection onSelectMinistry={(m) => setSelectedMinistry(m)} />

        {/* 7. Live Announcements & Upcoming Events */}
        <AnnouncementsSection onSelectEvent={(e) => setSelectedEvent(e)} />

        {/* 8. Location, Directions, Map & Socials */}
        <LocationMapSection
          onPlanVisitClick={() => setIsPlanVisitOpen(true)}
        />
      </main>

      {/* 9. Footer */}
      <Footer
        onPlanVisitClick={() => setIsPlanVisitOpen(true)}
      />

      {/* --- Interactive Modals --- */}
      
      {/* Plan a Visit Modal */}
      <PlanVisitModal
        isOpen={isPlanVisitOpen}
        onClose={() => setIsPlanVisitOpen(false)}
      />

      {/* Ministry Deep Dive & Connection Modal */}
      <MinistryDetailModal
        ministry={selectedMinistry}
        isOpen={!!selectedMinistry}
        onClose={() => setSelectedMinistry(null)}
      />

      {/* Event RSVP & Ticket Modal */}
      <EventRsvpModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

    </div>
  );
};

export default App;

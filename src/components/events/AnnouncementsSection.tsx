import React, { useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight, Megaphone } from "lucide-react";
import { motion } from "framer-motion";
import { EVENTS_DATA } from "../../data/eventsData";
import { ChurchEvent, Ministry } from "../../types/church";
import { MINISTRIES_DATA } from "../../data/ministriesData";
import {
  fetchAnnouncements,
  fetchEvents,
  BackendAnnouncement,
} from "../../services/api";
import { ChurchVideoHub } from "../video/ChurchVideoHub";
import { ScrollReveal, scrollItemVariants } from "../ui/ScrollReveal";

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
    dateStr.toLowerCase().includes("every") ||
    dateStr.toLowerCase().includes("weekly") ||
    dateStr.toLowerCase().includes("monthly")
  ) {
    return true;
  }

  try {
    let parseableDate = dateStr;

    // Handle date ranges like "April 10 – 12, 2026" or "May 20 - 22, 2026"
    if (dateStr.includes("–") || dateStr.includes("-")) {
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
  const dateRegex =
    /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?(?:\s*,?\s*\d{4})?/gi;
  const matches = text.match(dateRegex);

  if (matches && matches.length > 0) {
    for (const matchStr of matches) {
      const cleanMatch = matchStr.replace(/(st|nd|rd|th)/gi, "");
      const parsed = Date.parse(
        cleanMatch.includes("202")
          ? cleanMatch
          : `${cleanMatch}, ${new Date().getFullYear()}`,
      );
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
  const [category, setCategory] = useState("all");
  const [events, setEvents] = useState<ChurchEvent[]>(EVENTS_DATA);
  const [announcements, setAnnouncements] = useState<BackendAnnouncement[]>([]);
  useEffect(() => {
    let active = true;
    Promise.all([fetchEvents(), fetchAnnouncements()]).then(
      ([eventResult, announcementResult]) => {
        if (active) {
          setEvents(eventResult.data);
          setAnnouncements(announcementResult.data);
        }
      },
    );
    return () => {
      active = false;
    };
  }, []);
  const activeEvents = events.filter(isEventActive);
  const filtered = activeEvents.filter(
    (event) => category === "all" || event.category === category,
  );
  const categories = [
    "all",
    ...Array.from(new Set(activeEvents.map((event) => event.category))),
  ];
  const activeAnnouncements = announcements.filter(isAnnouncementActive);
  return (
    <>
      <ChurchVideoHub
        onPlanVisitClick={onPlanVisitClick || (() => {})}
        onSelectMinistryModal={(id) => {
          const ministry = MINISTRIES_DATA.find((item) => item.id === id);
          if (ministry && onSelectMinistry) onSelectMinistry(ministry);
        }}
      />
      <section id="events" className="events-section">
        <div className="page-container">
          <ScrollReveal className="section-heading">
            <div>
              <h2>
                More moments.
                <br />
                <em>More connection.</em>
              </h2>
            </div>
            <p className="section-description">
              Gather around the table, grow in God’s Word, and make memories
              with your church family.
            </p>
          </ScrollReveal>
          {activeAnnouncements.length > 0 && (
            <div className="bulletin-list">
              {activeAnnouncements.map((announcement) => (
                <article key={announcement.id}>
                  <Megaphone size={20} />
                  <div>
                    <small>
                      {announcement.is_pinned
                        ? "CHURCH NOTICE"
                        : "FROM OUR COMMUNITY"}
                    </small>
                    <h3>{announcement.title}</h3>
                    <p>{announcement.body}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div
            className="event-filters"
            role="group"
            aria-label="Filter events"
          >
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item === "all" ? "All gatherings" : item}
              </button>
            ))}
          </div>
          <ScrollReveal className="event-list" delay={0.04} stagger>
            {filtered.map((event) => (
              <motion.button
                variants={scrollItemVariants}
                data-reveal-item
                className="event-row"
                key={event.id}
                onClick={() => onSelectEvent(event)}
                aria-label={`View ${event.title}`}
              >
                <span className="event-date">
                  <Calendar size={21} />
                  <span>{event.date}</span>
                </span>
                <span className="event-summary">
                  <small>{event.badge || event.category}</small>
                  <h3>{event.title}</h3>
                  <span>
                    <Clock size={13} />
                    {event.time}
                  </span>
                </span>
                <span className="event-action">
                  View gathering <ArrowRight size={17} />
                </span>
              </motion.button>
            ))}
          </ScrollReveal>
          {filtered.length === 0 && (
            <div className="empty-message">
              <p>There are no upcoming gatherings listed here yet.</p>
              <p>
                Join us for Sunday worship or follow our church community for
                new announcements.
              </p>
              {onPlanVisitClick && (
                <button className="text-link" onClick={onPlanVisitClick}>
                  Join us this Sunday <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

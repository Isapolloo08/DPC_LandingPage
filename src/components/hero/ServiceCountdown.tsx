import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Clock, HeartHandshake } from "lucide-react";
import { CHURCH_INFO } from "../../data/churchInfo";

// The church schedule follows Philippine time, regardless of the visitor's timezone.
export function getWorshipCountdown(now = new Date()) {
  const local = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const day = local.getUTCDay();
  const minute = local.getUTCHours() * 60 + local.getUTCMinutes();
  if (day === 0 && minute >= 580 && minute < 690)
    return { live: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const next = new Date(local);
  next.setUTCDate(
    local.getUTCDate() + ((7 - day) % 7 || (minute >= 690 ? 7 : 0)),
  );
  next.setUTCHours(9, 40, 0, 0);
  const seconds = Math.max(
    0,
    Math.floor((next.getTime() - local.getTime()) / 1000),
  );
  return {
    live: false,
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  };
}

export const ServiceCountdown = () => {
  const [countdown, setCountdown] = useState(getWorshipCountdown);
  const [showSchedule, setShowSchedule] = useState(false);
  useEffect(() => {
    const interval = window.setInterval(
      () => setCountdown(getWorshipCountdown()),
      1000,
    );
    return () => window.clearInterval(interval);
  }, []);
  return (
    <section id="services" className="services-section">
      <div className="page-container service-strip">
        <div className="service-item">
          <Clock />
          <div>
            <span className="eyebrow">SUNDAY WORSHIP</span>
            <strong>9:40 AM – 11:30 AM</strong>
            <small>A Sunday morning for the whole family.</small>
          </div>
        </div>
        <div className="service-item">
          <BookOpen />
          <div>
            <span className="eyebrow">SUNDAY SCHOOL & BIBLE STUDY</span>
            <strong>8:00 AM – 9:30 AM</strong>
            <small>Growing in God’s Word, at every age.</small>
          </div>
        </div>
        <div className="service-item">
          <HeartHandshake />
          <div>
            <span className="eyebrow">MIDWEEK PRAYER · WEDNESDAY</span>
            <strong>5:30 PM</strong>
            <small>Come pray with your church family.</small>
          </div>
        </div>
      </div>
      <div className="page-container service-next">
        <span className="next-service">
          <span className="status-dot" />
          {countdown.live ? (
            "Sunday worship is happening now. You’re welcome to join us."
          ) : (
            <>
              Next Sunday worship in{" "}
              <strong>
                {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
                {countdown.seconds}s
              </strong>
            </>
          )}
        </span>
        <button
          className="text-link"
          onClick={() => setShowSchedule(!showSchedule)}
          aria-expanded={showSchedule}
          aria-controls="full-schedule"
        >
          {showSchedule ? "Close full schedule" : "View full schedule"}{" "}
          <ArrowRight size={15} />
        </button>
      </div>
      {showSchedule && (
        <div id="full-schedule" className="page-container full-schedule">
          {CHURCH_INFO.services.map((service) => (
            <article key={service.name}>
              <h3>{service.name}</h3>
              <p>
                {service.day} · {service.time}
              </p>
              <small>{service.description}</small>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

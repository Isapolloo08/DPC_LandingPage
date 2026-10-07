import { responsiveImage } from "../../lib/responsiveImages";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MINISTRIES_DATA } from "../../data/ministriesData";
import { fetchMinistries } from "../../services/api";
import { Ministry } from "../../types/church";
import { ScrollReveal } from "../ui/ScrollReveal";

const filters = ["Everyone", "Children", "Students", "Adults"] as const;
type Filter = (typeof filters)[number];
const belongsTo = (ministry: Ministry, filter: Filter) => {
  const bracket = ministry.ageBracket.toLowerCase();
  const children = /kinder|elementary/.test(bracket);
  const students = /high school|youth|college/.test(bracket);
  return (
    filter === "Everyone" ||
    (filter === "Children" && children) ||
    (filter === "Students" && students) ||
    (filter === "Adults" && !children && !students)
  );
};

export const MinistriesSection = ({
  onSelectMinistry,
}: {
  onSelectMinistry: (ministry: Ministry) => void;
}) => {
  const reducedMotion = useReducedMotion();
  const [ministries, setMinistries] = useState(MINISTRIES_DATA);
  const [filter, setFilter] = useState<Filter>("Everyone");
  useEffect(() => {
    let active = true;
    fetchMinistries().then((result) => {
      if (active) setMinistries(result.data);
    });
    return () => {
      active = false;
    };
  }, []);
  const filtered = ministries.filter((ministry) => belongsTo(ministry, filter));
  return (
    <section id="ministries" className="ministries-section">
      <div className="page-container">
        <ScrollReveal className="section-heading">
          <div>
            <h2>
              Every season of life.
              <br />
              <em>A community for you.</em>
            </h2>
          </div>
          <p className="section-description">
            From little first steps to a lifetime of faith, our ministries help
            every generation connect, learn, and serve.
          </p>
        </ScrollReveal>
        <div
          className="ministry-filters"
          role="group"
          aria-label="Filter ministries by life stage"
        >
          {filters.map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
          <span role="status" aria-live="polite">{filtered.length} ministries · One church family</span>
        </div>
        <ScrollReveal delay={0.04}>
        <motion.div key={filter} className="ministry-grid"
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.22 }}>
          {filtered.map((ministry) => (
            <button
              className="ministry-card"
              key={ministry.id}
              onClick={() => onSelectMinistry(ministry)}
              aria-label={`Explore ${ministry.name}`}
            >
              <div className="ministry-photo">
                <img
                  {...responsiveImage(ministry.eventPhotos?.[0]?.url || "/images/church-building.webp")}
                  alt={
                    ministry.eventPhotos?.[0]?.caption || ministry.ageBracket
                  }
                  loading="lazy"
                />
                <span>{ministry.ageRange}</span>
              </div>
              <div className="ministry-card-copy">
                <small>{ministry.ageBracket}</small>
                <h3>{ministry.name}</h3>
                <p>{ministry.tagline}</p>
                <span className="ministry-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </div>
            </button>
          ))}
        </motion.div>
        </ScrollReveal>
        {filtered.length === 0 && (
          <p className="empty-message">
            No ministries are listed for this life stage yet. Explore everyone
            to find your community.
          </p>
        )}
      </div>
    </section>
  );
};

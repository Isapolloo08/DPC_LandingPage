import { useEffect, useRef, useState } from "react";
import { ArrowRight, Church, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useIsPresent } from "framer-motion";

const MobileNavigation = ({ children, reducedMotion }: { children: React.ReactNode; reducedMotion: boolean | null }) => {
  const present = useIsPresent();
  return (
    <motion.nav
      id="mobile-navigation" className="mobile-nav page-container" aria-label="Mobile navigation"
      inert={!present} aria-hidden={!present}
      initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
      transition={{ duration: reducedMotion ? 0 : 0.18 }}
    >{children}</motion.nav>
  );
};

export const StickyNavbar = ({
  onPlanVisitClick,
}: {
  onPlanVisitClick: () => void;
}) => {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  const links = [
    { label: "Our church", href: "#about" },
    { label: "Your first visit", href: "#what-to-expect" },
    { label: "Ministries", href: "#ministries" },
    { label: "Church life", href: "#events" },
    { label: "Find us", href: "#location" },
  ];
  return (
    <header className={`site-header${hasScrolled ? " is-scrolled" : ""}`}>
      <div className="page-container nav-inner">
        <a
          href="#home"
          className="church-brand"
        >
          <span className="brand-mark">
            <Church size={28} strokeWidth={1.4} />
          </span>
          <span>
            <strong>
              Daet Presbyterian<span>Church</span>
            </strong>
            <small>ROOTED IN GRACE · UNITED IN CHRIST</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="button button-navy nav-visit"
            onClick={onPlanVisitClick}
          >
            Plan a visit <ArrowRight size={15} />
          </button>
          <button
            ref={toggleRef}
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
      {menuOpen && (
        <MobileNavigation reducedMotion={reducedMotion}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              <ArrowRight size={16} />
            </a>
          ))}
          <button
            className="button button-navy"
            onClick={() => {
              setMenuOpen(false);
              onPlanVisitClick();
            }}
          >
            Plan your first visit <ArrowRight size={16} />
          </button>
        </MobileNavigation>
      )}
      </AnimatePresence>
    </header>
  );
};

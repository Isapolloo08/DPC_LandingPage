import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** GSAP owns scroll layers; the inner model and cards keep their ambient motion. */
export function mountCinematicHero(hero: HTMLElement) {
  const page = hero.closest(".landing-page");
  const services = page?.querySelector<HTMLElement>("#services");
  const header = page?.querySelector<HTMLElement>(".nav-inner");
  const stage = hero.querySelector<HTMLElement>(".hero-model-stage");
  if (!page || !services || !header || !stage) return () => {};

  const headerSpace = Math.max(header.offsetHeight, header.getBoundingClientRect().bottom);
  const pinned = window.innerWidth >= 1024 && window.innerHeight >= 820
    && hero.offsetHeight + headerSpace <= window.innerHeight;
  const compact = window.innerWidth < 641;
  const animationContext = gsap.context(() => {
    const select = gsap.utils.selector(hero);
    const headerOffset = () => header.getBoundingClientRect().bottom + 1;
    hero.classList.add("has-hero-scroll-motion");
    if (pinned) {
      hero.classList.add("is-cinematic");
      page.classList.add("has-cinematic-hero");
    }

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "church-hero",
        trigger: pinned ? hero : stage,
        start: compact ? "top 75%" : () => `top ${headerOffset()}px`,
        end: pinned
          ? () => `+=${Math.round(Math.min(window.innerHeight * 0.42, 440))}`
          : () => `bottom ${headerOffset()}px`,
        pin: pinned,
        pinSpacing: pinned,
        scrub: 0.45,
        anticipatePin: pinned ? 1 : 0,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(select(".hero-atmosphere"), { opacity: 1, duration: 1 }, 0)
      .to(select(".hero-model-arch"), { y: -8, opacity: 0.72, duration: 1 }, 0)
      .to(select(".hero-model-reveal"), {
        y: compact ? -12 : -24,
        x: compact ? 0 : -12,
        scale: 0.955,
        transformOrigin: "50% 80%",
        duration: 1,
      }, 0)
      // Move the cards away from the roof and gate as the model takes focus.
      .to(select(".model-service-scroll"), {
        y: compact ? -40 : -76,
        x: compact ? 0 : 12,
        duration: 1,
      }, 0)
      .to(select(".model-welcome-scroll"), {
        y: compact ? 40 : 76,
        x: compact ? 0 : -12,
        duration: 1,
      }, 0)
      .to(select(".hero-model-caption"), { y: compact ? 40 : 76, duration: 1 }, 0)
      .to(select(".hero-model-caption"), { opacity: 0.65, duration: 0.6 }, 0.4)
      .to(select(".hero-bottom"), { opacity: 0, y: -12, duration: 0.4 }, 0.5);

    const copyMotion = pinned ? timeline : gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "church-hero-copy",
        trigger: hero,
        start: () => `top ${headerOffset()}px`,
        end: () => `+=${Math.round(window.innerHeight * 0.42)}`,
        scrub: 0.45,
        invalidateOnRefresh: true,
      },
    });
    copyMotion
      .to(select(".hero-copy"), { y: compact ? -16 : -32, duration: 1 }, 0)
      .to(select(".hero-description, .hero-location"), {
        opacity: pinned ? 0.38 : 0.65, duration: 0.65,
      }, 0.35);

    const serviceItems = services.querySelectorAll(".service-item");
    const serviceTimes = services.querySelectorAll(".service-item strong");
    const scheduleTransition = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "church-schedule",
        trigger: services,
        start: "top 95%",
        end: "top 30%",
        scrub: 0.35,
        invalidateOnRefresh: true,
      },
    });
    scheduleTransition
      .fromTo(serviceItems, { opacity: 0.7, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.025 }, 0)
      .fromTo(serviceTimes, { scale: 0.94 },
        { scale: 1.08, duration: 0.55 }, 0)
      .to(serviceTimes, { scale: 1, duration: 0.45 }, 0.55);
  }, hero);

  return () => {
    animationContext.revert();
    hero.classList.remove("has-hero-scroll-motion", "is-cinematic");
    page.classList.remove("has-cinematic-hero");
  };
}

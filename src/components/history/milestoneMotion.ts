import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Only own this section's triggers; the hero retains its existing scroll behavior. */
export function mountMilestoneMotion(section: HTMLElement) {
  const triggers: ScrollTrigger[] = [];
  const context = gsap.context(() => {}, section);
  try {
    context.add(() => {
      const track = section.querySelector<HTMLElement>(".milestone-spine");
      const progress = section.querySelector<HTMLElement>(".milestone-progress");
      if (track && progress) {
        const fill = gsap.fromTo(progress, { scaleY: 0 }, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: track, start: "top 75%", end: "bottom 75%", scrub: 0.35, invalidateOnRefresh: true },
        });
        if (fill.scrollTrigger) triggers.push(fill.scrollTrigger);
      }
      section.querySelectorAll<HTMLElement>(".milestone-row").forEach(row => {
        const branch = row.querySelector(".milestone-branch");
        const year = row.querySelector(".milestone-year");
        const details = row.querySelectorAll(".milestone-content > h3, .milestone-content > p");
        const photo = row.querySelector(".milestone-photo, .milestone-photo-placeholder");
        const reveal = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 75%", toggleActions: "play none none reverse", invalidateOnRefresh: true },
        });
        reveal.fromTo(branch, { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power2.out" })
          .fromTo(year, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.12)
          .fromTo(details, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out" }, 0.25);
        if (photo) reveal.fromTo(photo, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.4);
        if (reveal.scrollTrigger) triggers.push(reveal.scrollTrigger);
      });
    });
  } catch (error) {
    context.revert();
    throw error;
  }
  return {
    refresh: () => triggers.forEach(trigger => trigger.refresh()),
    revert: () => context.revert(),
  };
}

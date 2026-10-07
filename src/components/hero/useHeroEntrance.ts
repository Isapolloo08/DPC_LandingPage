import { useLayoutEffect, type RefObject } from "react";

/** One opening sequence; its layers are separate from scroll and ambient motion. */
export function useHeroEntrance(heroRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const hero = heroRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // A restored scroll position should show its content immediately.
    if (!hero || reducedMotion.matches || window.scrollY > 8) return;

    const animations = new Set<Animation>();
    let interrupted = false;
    const stop = () => {
      interrupted = true;
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    const reveal = (selector: string, delay: number, duration = 700, scale = 1) => {
      if (interrupted || reducedMotion.matches) return;
      hero.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        const animation = element.animate([
          { opacity: 0, transform: `translateY(20px) scale(${scale})` },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ], {
          duration,
          delay: delay + index * 90,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          // Nothing stays hidden or retains animation styles after completion.
          fill: "backwards",
        });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    };

    reveal(".hero-copy > .eyebrow", 0, 600);
    reveal(".hero-title-line", 70, 800);
    reveal(".hero-details-entrance", 280);
    reveal(".hero-bottom > span, .hero-bottom > a", 500, 600);

    const revealVisual = () => {
      // Animate individual translate, leaving the cards' floating/tilted
      // CSS transform untouched. GSAP owns only their surrounding layers.
      hero.querySelectorAll<HTMLElement>(".model-service-card, .model-welcome-card")
        .forEach((element, index) => {
          if (interrupted || reducedMotion.matches) return;
          const animation = element.animate([
            { opacity: 0, translate: "0 16px" },
            { opacity: 1, translate: "0 0" },
          ], {
            duration: 650, delay: 430 + index * 100,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards",
          });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      reveal(".hero-model-caption > div, .model-motion-toggle", 520, 600);
    };
    const image = hero.querySelector<HTMLImageElement>(".hero-model-image");
    const revealModel = () => reveal(".hero-model-entrance", 0, 900, 0.97);
    if (!image || image.complete) reveal(".hero-model-entrance", 150, 900, 0.97);
    else image.addEventListener("load", revealModel, { once: true });
    revealVisual();

    // Scrolling or using the page takes priority over finishing the intro.
    window.addEventListener("scroll", stop, { once: true, passive: true });
    hero.addEventListener("focusin", stop);
    const motionChanged = () => { if (reducedMotion.matches) stop(); };
    reducedMotion.addEventListener("change", motionChanged);
    return () => {
      stop();
      window.removeEventListener("scroll", stop);
      hero.removeEventListener("focusin", stop);
      image?.removeEventListener("load", revealModel);
      reducedMotion.removeEventListener("change", motionChanged);
    };
  }, [heroRef]);
}

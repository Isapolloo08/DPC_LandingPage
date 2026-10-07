import { useEffect, type RefObject } from "react";

/** Use native scroll on smaller screens and pin only when the hero fits. */
export function useCinematicHero(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let generation = 0;
    let revert: (() => void) | undefined;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const update = async () => {
      const currentGeneration = ++generation;
      if (reducedMotion.matches) {
        revert?.();
        revert = undefined;
        return;
      }

      // A failed optional download leaves the fully visible page scrolling normally.
      const animation = await import("./cinematicHero").catch(() => undefined);
      if (!animation || disposed || currentGeneration !== generation || !heroRef.current) return;
      revert?.();
      revert = animation.mountCinematicHero(heroRef.current);
    };

    void update();
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => void update(), 180);
    };
    window.addEventListener("resize", handleResize);
    reducedMotion.addEventListener("change", update);
    return () => {
      disposed = true;
      generation++;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      reducedMotion.removeEventListener("change", update);
      revert?.();
    };
  }, [heroRef]);
}

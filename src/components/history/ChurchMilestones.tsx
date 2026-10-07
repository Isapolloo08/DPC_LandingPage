import { useEffect, useId, useRef } from "react";
import { ImageIcon } from "lucide-react";
import { CHURCH_MILESTONES_PREVIEW, type ChurchMilestone } from "../../data/churchMilestones";

export default function ChurchMilestones({ milestones = CHURCH_MILESTONES_PREVIEW }: { milestones?: ChurchMilestone[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleId = "milestones-" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const hasDrafts = milestones.some(milestone => milestone.isDraft);

  useEffect(() => {
    const section = sectionRef.current;
    const list = section?.querySelector<HTMLOListElement>(".milestone-list");
    const spine = section?.querySelector<HTMLElement>(".milestone-spine");
    if (!section || !list || !spine) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let generation = 0;
    let frame = 0;
    let animation: { refresh: () => void; revert: () => void } | undefined;
    const measure = () => {
      const branches = list.querySelectorAll<HTMLElement>(".milestone-branch");
      if (branches.length < 2) return;
      const top = list.getBoundingClientRect().top;
      const first = branches[0].getBoundingClientRect();
      const last = branches[branches.length - 1].getBoundingClientRect();
      spine.style.top = `${first.top + first.height / 2 - top}px`;
      spine.style.height = `${last.top + last.height / 2 - first.top - first.height / 2}px`;
      animation?.refresh();
    };
    const updateMotion = async () => {
      const current = ++generation;
      animation?.revert();
      animation = undefined;
      measure();
      if (reduced.matches) return;
      const motion = await import("./milestoneMotion").catch(() => undefined);
      if (!motion || disposed || current !== generation) return;
      try {
        animation = motion.mountMilestoneMotion(section);
        measure();
      } catch {
        // The default CSS keeps every entry readable if optional animation fails.
      }
    };
    const resize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(list);
    section.addEventListener("load", resize, true);
    reduced.addEventListener("change", updateMotion);
    void updateMotion();
    return () => {
      disposed = true;
      generation++;
      cancelAnimationFrame(frame);
      observer.disconnect();
      section.removeEventListener("load", resize, true);
      reduced.removeEventListener("change", updateMotion);
      animation?.revert();
    };
  }, [milestones]);

  if (milestones.length === 0) return null;
  return (
    <section ref={sectionRef} className="church-milestones page-container" aria-labelledby={titleId}>
      <header className="milestone-heading">
        <p className="eyebrow">OUR STORY · SINCE 2007</p>
        <h2 id={titleId}>God’s faithfulness.<br /><em>Through the years.</em></h2>
        {hasDrafts && <p className="milestone-preview-note"><strong>Timeline preview</strong> · Historical entries are drafts. Years, events, and photos are awaiting confirmation.</p>}
      </header>
      <div className="milestone-track">
        <div className="milestone-spine" aria-hidden="true"><span className="milestone-progress" /></div>
      <ol className="milestone-list">
        {milestones.map(milestone => (
          <li key={milestone.id} className={"milestone-row" + (milestone.isDraft ? " is-draft" : "")}>
            <span className="milestone-branch" aria-hidden="true" />
            <article className="milestone-content">
              <div className="milestone-year">{milestone.isPresent ? "Today" : milestone.year !== null ? <time dateTime={String(milestone.year)}>{milestone.year}</time> : "Year to confirm"}{milestone.isDraft && <span className="milestone-draft-label">Draft</span>}</div>
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
              {milestone.photo ? <figure className="milestone-photo"><img src={milestone.photo.src} alt={milestone.photo.alt} loading="lazy" decoding="async" />{milestone.photo.caption && <figcaption>{milestone.photo.caption}</figcaption>}</figure> : milestone.isDraft && <div className="milestone-photo-placeholder"><ImageIcon size={24} strokeWidth={1.3} aria-hidden="true" /><span>Historical photo to be added</span></div>}
            </article>
          </li>
        ))}
      </ol>
      </div>
    </section>
  );
}

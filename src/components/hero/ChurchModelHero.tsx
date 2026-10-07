import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { motion, useInView, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Clock, HeartHandshake, Pause, Play } from "lucide-react";
import churchModel from "@/assets/model-dpc-1448.webp";
import churchModelSmall from "@/assets/model-dpc-640.webp";
import churchModelMedium from "@/assets/model-dpc-960.webp";

export const ChurchModelHero = () => {
  const modelRef = useRef<HTMLElement>(null);
  const inView = useInView(modelRef, { margin: "100px" });
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const ringPathId = "church-ring-" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const rotateX = useSpring(0, { stiffness: 90, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 90, damping: 22 });
  const motionEnabled = !reducedMotion && !paused && inView;

  useEffect(() => {
    if (!motionEnabled) {
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [motionEnabled, rotateX, rotateY]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!motionEnabled || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 5);
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
  };

  return (
    <figure
      ref={modelRef}
      className="hero-church-model"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      data-motion-running={motionEnabled}
    >
      <div className="hero-model-stage">
        <div className="hero-model-arch" aria-hidden="true" />
        <div className="hero-model-reveal">
          <div className="hero-model-entrance">
            <div
              className="hero-model-shadow"
              aria-hidden="true"
              style={{ animationPlayState: motionEnabled ? "running" : "paused" }}
            />
            <motion.div className="hero-model-tilt" style={{ rotateX, rotateY }}>
              <div
                className="hero-model-float"
                style={{
                  animationPlayState: motionEnabled ? "running" : "paused",
                }}
              >
                <img
                  className="hero-model-image"
                  src={churchModel}
                  srcSet={`${churchModelSmall} 640w, ${churchModelMedium} 960w, ${churchModel} 1448w`}
                  sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1450px) 45vw, 620px"
                  alt="Architectural illustration of Daet Presbyterian Church, with its cross, arched windows, and entrance gate"
                  width={1448}
                  height={1086}
                  fetchPriority="high"
                  draggable={false}
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div
          className="model-brand-ring"
          aria-hidden="true"
          style={{ animationPlayState: motionEnabled ? "running" : "paused" }}
        >
          <svg viewBox="0 0 100 100">
            <defs>
              <path
                id={ringPathId}
                d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
              />
            </defs>
            <text>
              <textPath href={"#" + ringPathId} textLength="224">
                ROOTED IN GRACE · UNITED IN CHRIST ·{" "}
              </textPath>
            </text>
          </svg>
          <span>✝</span>
        </div>
        <div className="model-card-scroll model-service-scroll">
          <a
            className="model-service-card"
            href="#services"
            aria-label="Sunday worship at 9:40 AM — view service times"
            style={{ animationPlayState: motionEnabled ? "running" : "paused" }}
          >
            <span className="model-service-icon">
              <Clock size={18} strokeWidth={1.5} />
            </span>
            <span className="model-card-label">SUNDAY WORSHIP</span>
            <strong>
              9:40 <span>AM</span>
            </strong>
            <span className="model-service-footer">
              Every Sunday <ArrowUpRight size={13} />
            </span>
          </a>
        </div>
        <div className="model-card-scroll model-welcome-scroll">
          <a
            className="model-welcome-card"
            href="#what-to-expect"
            aria-label="Come as you are — see what to expect on your first Sunday"
            style={{ animationPlayState: motionEnabled ? "running" : "paused" }}
          >
            <span className="model-welcome-top">
              <span className="model-card-label">YOUR FIRST SUNDAY</span>
              <HeartHandshake size={19} strokeWidth={1.3} />
            </span>
            <strong>Come as you are.</strong>
            <span className="model-welcome-description">
              A seat for you. A family in Christ.
            </span>
            <span className="model-welcome-footer">
              What to expect <ArrowUpRight size={14} />
            </span>
          </a>
        </div>
      </div>
      <figcaption className="hero-model-caption">
        <div>
          <span className="eyebrow">COBANGBANG, DAET · CAMARINES NORTE</span>
          <a className="text-link" href="#location">
            Explore our church home <ArrowUpRight size={14} />
          </a>
        </div>
        {!reducedMotion && (
          <button
            type="button"
            className="model-motion-toggle"
            aria-label={
              paused ? "Play church animation" : "Pause church animation"
            }
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        )}
      </figcaption>
    </figure>
  );
};

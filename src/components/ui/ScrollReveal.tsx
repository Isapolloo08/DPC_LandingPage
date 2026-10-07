import { useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  effect?: "zoom" | "morph" | "reveal";
  stagger?: boolean;
}

const softEase = [0.22, 1, 0.36, 1] as const;

export const scrollItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: softEase },
  },
};

/** Reveal a block once; reserve continuous scroll motion for the hero. */
export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  effect = "reveal",
  stagger = false,
}: ScrollRevealProps) => {
  const reducedMotion = useReducedMotion();
  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  const immediate = reducedMotion || keyboardRevealed;
  const variants: Variants = {
    hidden: stagger ? {} : {
      opacity: 0,
      y: effect === "morph" ? 0 : 28,
      scale: effect === "reveal" ? 1 : 0.985,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: stagger
        ? { staggerChildren: immediate ? 0 : 0.045, delayChildren: immediate ? 0 : delay }
        : { duration: immediate ? 0 : 0.65, delay: immediate ? 0 : delay, ease: softEase },
    },
  };

  return (
    <motion.div
      className={"scroll-reveal " + className}
      data-scroll-effect={stagger ? "stagger" : effect}
      variants={variants}
      initial={reducedMotion ? false : "hidden"}
      animate={immediate ? "visible" : undefined}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -24px 0px" }}
      onFocusCapture={() => setKeyboardRevealed(true)}
    >
      {children}
    </motion.div>
  );
};

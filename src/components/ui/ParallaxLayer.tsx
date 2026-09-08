import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // negative moves slower/upwards, positive moves downwards
  className?: string;
  rotateRange?: [number, number];
  scaleRange?: [number, number];
  opacityRange?: [number, number];
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.2,
  className = '',
  rotateRange,
  scaleRange,
  opacityRange,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * -100, speed * 100]
  );

  const rotate = rotateRange
    ? useTransform(scrollYProgress, [0, 1], rotateRange)
    : undefined;

  const scale = scaleRange
    ? useTransform(scrollYProgress, [0, 1], scaleRange)
    : undefined;

  const opacity = opacityRange
    ? useTransform(scrollYProgress, [0, 1], opacityRange)
    : undefined;

  return (
    <div ref={targetRef} className={`overflow-visible ${className}`}>
      <motion.div
        style={{
          y,
          rotate,
          scale,
          opacity,
          willChange: 'transform',
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

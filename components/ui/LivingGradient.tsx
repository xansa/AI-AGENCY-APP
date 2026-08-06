"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps gradient-"bulb" markup and makes it feel alive: a slow, organic ambient
 * drift plus a subtle mouse-parallax that follows the cursor over the parent
 * section. Only `transform` is animated (GPU-cheap, never repaints the blur).
 *
 * Drop it in place of a static `absolute inset-0` bulb layer and pass the bulbs
 * as children. It listens for pointer moves on its nearest positioned ancestor
 * (the section), so that ancestor must be `position: relative`.
 *
 * Respects `prefers-reduced-motion`: renders a plain static layer.
 */
type LivingGradientProps = {
  children: ReactNode;
  /** Outer layer classes (positioning + clipping). */
  className?: string;
  /** Peak ambient drift in px. */
  amplitude?: number;
  /** Peak mouse-follow offset in px (cursor at section edge). */
  parallax?: number;
  /** Seconds for one full ambient drift cycle. */
  duration?: number;
};

export function LivingGradient({
  children,
  className = "absolute inset-0 overflow-hidden pointer-events-none",
  amplitude = 20,
  parallax = 40,
  duration = 19,
}: LivingGradientProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Normalized cursor position within the section (-0.5 .. 0.5).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 20, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 55, damping: 20, mass: 0.7 });
  const px = useTransform(sx, (v) => v * parallax);
  const py = useTransform(sy, (v) => v * parallax);

  useEffect(() => {
    if (reduce) return;
    const section = ref.current?.parentElement;
    if (!section) return;

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const settle = () => {
      mx.set(0);
      my.set(0);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", settle);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", settle);
    };
  }, [reduce, mx, my]);

  if (reduce) {
    return (
      <div className={className} aria-hidden="true">
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {/* Mouse-parallax layer */}
      <motion.div className="absolute inset-0" style={{ x: px, y: py }}>
        {/* Ambient drift layer */}
        <motion.div
          className="absolute inset-0"
          animate={{
            x: [0, amplitude, -amplitude * 0.6, 0],
            y: [0, -amplitude * 0.85, amplitude * 0.5, 0],
            scale: [1, 1.05, 0.97, 1],
          }}
          transition={{
            duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

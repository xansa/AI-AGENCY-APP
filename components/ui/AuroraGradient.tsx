"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * A multi-hue "aurora" mesh gradient that feels alive: each blob drifts on its
 * own slow phase (so the mesh shimmers), and the whole mesh parallaxes toward
 * the cursor over the parent section. Only `transform` is animated (GPU-cheap;
 * the blurred bulbs are never repainted).
 *
 * Pass the bulbs as `blobs` — each `className` is a positioned radial-gradient
 * div (with its own blur). The component wraps them in a mouse-parallax layer
 * and gives each blob an independent ambient-drift `motion.div` parent, so the
 * blob's own `-translate` centering never clashes with the animated transform.
 *
 * Listens for pointer moves on its nearest positioned ancestor (the section),
 * which must be `position: relative`. Respects `prefers-reduced-motion`
 * (renders a plain static mesh).
 */
export type AuroraBlob = {
  /** The bulb: absolute positioning + radial-gradient background + blur. */
  className: string;
  /** Peak ambient drift in px (default 26). */
  amplitude?: number;
  /** Seconds per drift cycle (default 16). Vary per blob for shimmer. */
  duration?: number;
  /** Start delay in seconds (default 0). Vary per blob to desync. */
  delay?: number;
  /** Drift direction sign (default alternates by index). */
  dir?: number;
};

type AuroraGradientProps = {
  blobs: AuroraBlob[];
  /** Outer layer classes (positioning + clipping). */
  className?: string;
  /** Peak mouse-follow offset in px (cursor at section edge). */
  parallax?: number;
};

export function AuroraGradient({
  blobs,
  className = "absolute inset-0 overflow-hidden pointer-events-none",
  parallax = 60,
}: AuroraGradientProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });
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
        {blobs.map((b, i) => (
          <div key={i} className={b.className} />
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {/* Mouse-parallax layer (whole mesh) */}
      <motion.div className="absolute inset-0" style={{ x: px, y: py }}>
        {blobs.map((b, i) => {
          const amp = b.amplitude ?? 26;
          const dir = b.dir ?? (i % 2 ? -1 : 1);
          return (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{
                x: [0, amp * dir, -amp * 0.5 * dir, 0],
                y: [0, -amp * 0.7, amp * 0.5, 0],
                scale: [1, 1.06, 0.96, 1],
              }}
              transition={{
                duration: b.duration ?? 16,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: b.delay ?? 0,
              }}
            >
              <div className={b.className} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

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
 * own slow phase (so the mesh shimmers) AND parallaxes toward the cursor at its
 * own depth — near blobs move much more than far ones, so the mesh visibly
 * reshuffles under the pointer instead of sliding as one flat sheet. Only
 * `transform` is animated (GPU-cheap; the blurred bulbs are never repainted).
 *
 * Pass the bulbs as `blobs` — each `className` is a positioned radial-gradient
 * div (with its own blur) and a `depth` (0 far … 2 near). Listens for pointer
 * moves on its nearest positioned ancestor (the section), which must be
 * `position: relative`. Respects `prefers-reduced-motion`.
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
  /** Parallax depth: 0 = far (moves least), 1 = mid, 2 = near (moves most). */
  depth?: 0 | 1 | 2;
};

type AuroraGradientProps = {
  blobs: AuroraBlob[];
  /** Outer layer classes (positioning + clipping). */
  className?: string;
  /** Base mouse-follow offset in px (scaled per blob depth). */
  parallax?: number;
};

export function AuroraGradient({
  blobs,
  className = "absolute inset-0 overflow-hidden pointer-events-none",
  parallax = 110,
}: AuroraGradientProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 16, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 90, damping: 16, mass: 0.5 });

  // Three fixed parallax depths (far / mid / near).
  const f0x = useTransform(sx, (v) => v * parallax * 0.55);
  const f0y = useTransform(sy, (v) => v * parallax * 0.55);
  const f1x = useTransform(sx, (v) => v * parallax * 1.0);
  const f1y = useTransform(sy, (v) => v * parallax * 1.0);
  const f2x = useTransform(sx, (v) => v * parallax * 1.65);
  const f2y = useTransform(sy, (v) => v * parallax * 1.65);
  const depths = [
    { x: f0x, y: f0y },
    { x: f1x, y: f1y },
    { x: f2x, y: f2y },
  ];

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
      {blobs.map((b, i) => {
        const amp = b.amplitude ?? 26;
        const dir = b.dir ?? (i % 2 ? -1 : 1);
        const d = depths[b.depth ?? 1];
        return (
          // Per-blob parallax layer (depth-scaled follow)
          <motion.div key={i} className="absolute inset-0" style={{ x: d.x, y: d.y }}>
            {/* Ambient drift layer */}
            <motion.div
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
          </motion.div>
        );
      })}
    </div>
  );
}

"use client";

import { AuroraGradient } from "./AuroraGradient";

/**
 * Subpage hero background: the same living aurora mesh + film grain as the
 * homepage, but a calmer preset (fewer, softer blobs, lower grain) so it reads
 * as a refined accent rather than the homepage showcase. Drop it in as a direct
 * child of a `position: relative` hero `<section>`, replacing the old static
 * gradient-bulb layer. Centralised here so the whole site re-tunes in one place.
 */
export function HeroAura({ grain = true }: { grain?: boolean }) {
  return (
    <>
      <AuroraGradient
        className="absolute inset-0 overflow-hidden pointer-events-none"
        parallax={110}
        blobs={[
          // Indigo core (mid depth)
          {
            className:
              "absolute left-[40%] top-[40%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[135%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.18),transparent_68%)] blur-3xl",
            amplitude: 28,
            duration: 18,
            delay: 0,
            dir: 1,
            depth: 1,
          },
          // Cyan (near, moves most)
          {
            className:
              "absolute left-[66%] top-[32%] -translate-x-1/2 -translate-y-1/2 w-[50%] h-[115%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.13),transparent_66%)] blur-3xl",
            amplitude: 32,
            duration: 15,
            delay: 1,
            dir: -1,
            depth: 2,
          },
          // Violet bridge (near)
          {
            className:
              "absolute left-[52%] top-[26%] -translate-x-1/2 -translate-y-1/2 w-[42%] h-[95%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(147,170,255,0.15),transparent_66%)] blur-3xl",
            amplitude: 24,
            duration: 21,
            delay: 1.9,
            dir: -1,
            depth: 2,
          },
          // Warm cream whisper (far)
          {
            className:
              "absolute left-[28%] top-[22%] -translate-x-1/2 -translate-y-1/2 w-[46%] h-[95%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(246,224,206,0.52),transparent_62%)] blur-2xl",
            amplitude: 18,
            duration: 23,
            delay: 1.6,
            dir: 1,
            depth: 0,
          },
        ]}
      />
      {grain && (
        <div
          className="absolute inset-0 grain opacity-[0.4] mix-blend-multiply pointer-events-none"
          aria-hidden="true"
        />
      )}
    </>
  );
}

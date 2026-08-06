"use client";

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, TrendingUp, Sparkles } from "lucide-react";
import { AuroraGradient } from "@/components/ui/AuroraGradient";

// Editorial hero: oversized serif pitch (no category overline — the headline IS the
// eye-catcher, per moodboard). Right side is the hybrid centerpiece: one large chalky
// illustration (Jasper "person centered") + two proof-widgets (Steep). The whole
// centerpiece reacts to the cursor — illustration lifts subtly, widgets parallax more
// with a slight tilt — while the aurora mesh keeps its ambient shimmer + grain.

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroV2() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const rise = (delay: number) => ({
    initial: reduce ? false : { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  const pop = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  // Cursor tracking for the centerpiece (normalized -0.5..0.5 over the section).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 70, damping: 18, mass: 0.5 });

  // Depths: the illustration is the anchor (moves least); widgets pop more + tilt.
  const illoX = useTransform(sx, (v) => v * 20);
  const illoY = useTransform(sy, (v) => v * 16);
  const w1X = useTransform(sx, (v) => v * 46);
  const w1Y = useTransform(sy, (v) => v * 34);
  const w1R = useTransform(sx, (v) => v * 3.5);
  const w2X = useTransform(sx, (v) => v * -40);
  const w2Y = useTransform(sy, (v) => v * 30);
  const w2R = useTransform(sx, (v) => v * -3);

  useEffect(() => {
    if (reduce) return;
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const settle = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", settle);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", settle);
    };
  }, [reduce, mx, my]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream pt-32 pb-24 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 overflow-hidden"
    >
      {/* ── Living aurora mesh: blue-dominant, warm whisper, each blob shimmers on its own phase + parallaxes to the cursor ── */}
      <AuroraGradient
        className="absolute inset-0 overflow-hidden pointer-events-none"
        parallax={110}
        blobs={[
          {
            className:
              "absolute left-[38%] top-[24%] -translate-x-1/2 -translate-y-1/2 w-[62%] h-[72%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.22),rgba(37,99,235,0.06)_45%,transparent_70%)] blur-3xl",
            amplitude: 30,
            duration: 17,
            delay: 0,
            dir: 1,
            depth: 1,
          },
          {
            className:
              "absolute left-[70%] top-[30%] -translate-x-1/2 -translate-y-1/2 w-[52%] h-[66%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_66%)] blur-3xl",
            amplitude: 34,
            duration: 15,
            delay: 1.2,
            dir: -1,
            depth: 2,
          },
          {
            className:
              "absolute left-[52%] top-[54%] -translate-x-1/2 -translate-y-1/2 w-[48%] h-[56%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.13),transparent_66%)] blur-3xl",
            amplitude: 28,
            duration: 19,
            delay: 0.6,
            dir: 1,
            depth: 2,
          },
          {
            className:
              "absolute left-[46%] top-[14%] -translate-x-1/2 -translate-y-1/2 w-[44%] h-[50%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(147,170,255,0.17),transparent_66%)] blur-3xl",
            amplitude: 24,
            duration: 21,
            delay: 2,
            dir: -1,
            depth: 0,
          },
          {
            className:
              "absolute left-[28%] top-[10%] -translate-x-1/2 -translate-y-1/2 w-[48%] h-[48%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(246,224,206,0.6),transparent_62%)] blur-2xl",
            amplitude: 20,
            duration: 23,
            delay: 1.5,
            dir: 1,
            depth: 0,
          },
        ]}
      />
      {/* Film grain over the mesh (echoes the chalk illustrations' risograph grain) */}
      <div className="absolute inset-0 grain opacity-[0.4] mix-blend-multiply pointer-events-none" aria-hidden="true" />
      {/* Faint canvas grid for texture */}
      <div className="absolute inset-x-0 top-0 h-[80%] canvas-grid opacity-[0.35] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        {/* Full-width slogan, two lines — the pitch, the eye-catcher */}
        <motion.h1
          {...rise(0.04)}
          className="font-serif font-medium text-display text-slate-ink tracking-tight leading-[1.04]"
        >
          Jouw digitale afdeling,<br />
          <em className="italic font-normal text-slate-ink/90">zonder de overhead</em>
          <span className="text-arka">.</span>
        </motion.h1>

        {/* Copy (left) + illustration centerpiece with proof-widgets (right) */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 min-w-0">
            <motion.p
              {...rise(0.12)}
              className="text-[17px] md:text-lg leading-relaxed text-slate-muted max-w-xl text-pretty"
            >
              Websites, SEO, AI chatbots, dashboards en lead generation. Alles onder een dak, geleverd door dezelfde persoon die je offerte schrijft. Geen account managers, geen doorlooptijden van weken.
            </motion.p>

            <motion.div {...rise(0.2)} className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-ink-light transition-colors"
              >
                Plan kennismaking
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent text-slate-ink ring-1 ring-slate-950/15 text-sm font-semibold hover:bg-slate-950/5 transition-colors"
              >
                Bekijk werk
              </Link>
            </motion.div>

            <motion.div
              {...rise(0.28)}
              className="mt-9 md:mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12.5px] tracking-wide text-slate-meta uppercase font-semibold"
            >
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-arka" />
                Reactie binnen 24 uur
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-ink/60" />
                Gevestigd in Dordrecht
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-ink/60" />
                Solo founder, geen tussenlagen
              </span>
            </motion.div>
          </div>

          {/* ── Hybrid centerpiece: big chalky illustration + 2 proof-widgets, cursor-reactive (lg+) ── */}
          <div className="hidden lg:block lg:col-span-6 relative min-h-[30rem]">
            {/* Illustration — anchor, slightly left-biased so widgets frame it instead of covering the face */}
            <motion.div style={reduce ? undefined : { x: illoX, y: illoY }} className="absolute inset-0">
              <motion.div {...pop(0.2)} className="relative w-full h-full">
                <Image
                  src="/illustrations/hero.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 0px, 620px"
                  className="object-contain object-[42%_center]"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Widget: organic traffic (+212%) — top-right corner, clear of the figure's face */}
            <motion.div
              style={reduce ? undefined : { x: w1X, y: w1Y, rotate: w1R }}
              className="absolute -top-3 -right-2 w-52 z-20"
              aria-hidden="true"
            >
              <motion.div
                {...pop(0.35)}
                className="rounded-2xl bg-white/90 backdrop-blur ring-1 ring-slate-950/8 shadow-[0_24px_60px_-30px_rgba(11,18,32,0.35)] p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-meta">
                    Organisch verkeer
                  </span>
                  <TrendingUp className="w-4 h-4 text-arka" strokeWidth={2} />
                </div>
                <div className="flex items-end gap-2 mb-3">
                  <span className="font-serif text-[2.25rem] leading-none font-medium text-slate-ink tracking-tight">
                    +212%
                  </span>
                  <span className="text-[11px] text-slate-meta mb-1">3 mnd</span>
                </div>
                <div className="flex items-end gap-1 h-9">
                  {[35, 45, 40, 60, 72, 88, 100].map((h, i) => (
                    <span key={i} className="flex-1 rounded-sm bg-arka/25" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Widget: new lead toast — bottom-left corner, pops the other way */}
            <motion.div
              style={reduce ? undefined : { x: w2X, y: w2Y, rotate: w2R }}
              className="absolute -bottom-2 -left-3 w-60 z-30"
              aria-hidden="true"
            >
              <motion.div
                {...pop(0.5)}
                className="rounded-2xl bg-ink text-cream shadow-[0_24px_60px_-28px_rgba(11,18,32,0.55)] p-4 flex items-center gap-3"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-cream/10 shrink-0">
                  <Sparkles className="w-4 h-4 text-arka-glow" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold leading-tight">Nieuwe aanvraag</div>
                  <div className="text-[11px] text-cream/55 mt-0.5">via de website · 2 min geleden</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

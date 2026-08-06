"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, Sparkles, Search } from "lucide-react";
import { AuroraGradient } from "@/components/ui/AuroraGradient";

// Editorial hero: the oversized serif slogan runs full-width on two lines, with a soft
// brand-tinted gradient wash and small floating product-widgets clustered to the right
// (moodboard: steep-style "calm but lively"). Widgets carry real numbers, drift smoothly,
// lift on hover.

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroV2() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  // Smooth, roomy drift (large enough amplitude to avoid sub-pixel stutter).
  const drift = (i: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -22, 0], rotate: [0, i % 2 ? 0.6 : -0.6, 0] },
          transition: {
            duration: 12 + i * 1.6,
            ease: "easeInOut" as const,
            repeat: Infinity,
            repeatType: "loop" as const,
            delay: i * 0.5,
          },
        };

  // Entrance for a widget card.
  const pop = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <section className="relative bg-cream pt-32 pb-24 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* ── Living aurora mesh: blue-dominant, warm whisper, each blob shimmers on its own phase + parallaxes to the cursor ── */}
      <AuroraGradient
        className="absolute inset-0 overflow-hidden pointer-events-none"
        parallax={120}
        blobs={[
          // Indigo core behind the headline
          {
            className:
              "absolute left-[38%] top-[24%] -translate-x-1/2 -translate-y-1/2 w-[62%] h-[72%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.22),rgba(37,99,235,0.06)_45%,transparent_70%)] blur-3xl",
            amplitude: 30,
            duration: 17,
            delay: 0,
            dir: 1,
          },
          // Bright blue behind the widget cluster
          {
            className:
              "absolute left-[70%] top-[30%] -translate-x-1/2 -translate-y-1/2 w-[52%] h-[66%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_66%)] blur-3xl",
            amplitude: 34,
            duration: 15,
            delay: 1.2,
            dir: -1,
          },
          // Cyan lower-center for the vibrant hue shift
          {
            className:
              "absolute left-[52%] top-[54%] -translate-x-1/2 -translate-y-1/2 w-[48%] h-[56%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.13),transparent_66%)] blur-3xl",
            amplitude: 28,
            duration: 19,
            delay: 0.6,
            dir: 1,
          },
          // Violet bridge between blue and warm
          {
            className:
              "absolute left-[46%] top-[14%] -translate-x-1/2 -translate-y-1/2 w-[44%] h-[50%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(147,170,255,0.17),transparent_66%)] blur-3xl",
            amplitude: 24,
            duration: 21,
            delay: 2,
            dir: -1,
          },
          // Warm peach/cream whisper, upper-left
          {
            className:
              "absolute left-[28%] top-[10%] -translate-x-1/2 -translate-y-1/2 w-[48%] h-[48%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(246,224,206,0.55),transparent_62%)] blur-2xl",
            amplitude: 20,
            duration: 23,
            delay: 1.5,
            dir: 1,
          },
        ]}
      />
      {/* Film grain over the mesh (echoes the chalk illustrations' risograph grain) */}
      <div className="absolute inset-0 grain opacity-[0.09] mix-blend-multiply pointer-events-none" aria-hidden="true" />
      {/* Faint canvas grid for texture */}
      <div className="absolute inset-x-0 top-0 h-[80%] canvas-grid opacity-[0.35] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        {/* Overline */}
        <motion.div {...rise(0)} className="mb-7 md:mb-9">
          <p className="text-overline uppercase text-slate-meta font-semibold inline-flex items-center gap-3">
            <span className="inline-block w-6 border-t border-slate-meta/60" />
            Digital studio, Dordrecht
          </p>
        </motion.div>

        {/* Full-width slogan, two lines */}
        <motion.h1
          {...rise(0.08)}
          className="font-serif font-medium text-display text-slate-ink tracking-tight leading-[1.04]"
        >
          Jouw digitale afdeling,<br />
          <em className="italic font-normal text-slate-ink/90">zonder de overhead</em>
          <span className="text-arka">.</span>
        </motion.h1>

        {/* Copy (left) + widget cluster (right) */}
        <div className="mt-12 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 min-w-0">
            <motion.p
              {...rise(0.16)}
              className="text-[17px] md:text-lg leading-relaxed text-slate-muted max-w-xl text-pretty"
            >
              Websites, SEO, AI chatbots, dashboards en lead generation. Alles onder een dak, geleverd door dezelfde persoon die je offerte schrijft. Geen account managers, geen doorlooptijden van weken.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
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
              {...rise(0.32)}
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

          {/* ── Floating widget cluster (lg+ only) ── */}
          <div className="hidden lg:block lg:col-span-6 relative min-h-[24rem]" aria-hidden="true">
            {/* Traffic / metric card */}
            <motion.div {...pop(0.3)} className="absolute top-0 right-4 w-60 z-20">
              <motion.div
                {...drift(0)}
                className="rounded-2xl bg-white/90 backdrop-blur ring-1 ring-slate-950/8 shadow-[0_24px_60px_-30px_rgba(11,18,32,0.35)] p-5 hover:-translate-y-1 transition-transform duration-300"
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

            {/* Google position ring */}
            <motion.div {...pop(0.45)} className="absolute top-[8.5rem] left-2 w-52 z-10">
              <motion.div
                {...drift(1)}
                className="rounded-2xl bg-white/90 backdrop-blur ring-1 ring-slate-950/8 shadow-[0_24px_60px_-30px_rgba(11,18,32,0.35)] p-5 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="relative w-12 h-12 shrink-0">
                  <div
                    className="w-12 h-12 rounded-full"
                    style={{ background: "conic-gradient(#2563EB 0deg 300deg, rgba(37,99,235,0.14) 300deg 360deg)" }}
                  />
                  <div className="absolute inset-[3px] rounded-full bg-white flex items-center justify-center">
                    <Search className="w-4 h-4 text-arka" strokeWidth={2} />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-[1.4rem] leading-none font-medium text-slate-ink">Top 3</div>
                  <div className="text-[11px] text-slate-meta mt-1">Google-positie</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Lead notification toast */}
            <motion.div {...pop(0.6)} className="absolute top-[13rem] right-0 w-64 z-30">
              <motion.div
                {...drift(2)}
                className="rounded-2xl bg-ink text-cream shadow-[0_24px_60px_-28px_rgba(11,18,32,0.55)] p-4 flex items-center gap-3 hover:-translate-y-1 transition-transform duration-300"
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

            {/* Chat / assistant input pill */}
            <motion.div {...pop(0.75)} className="absolute bottom-0 left-6 w-64 z-20">
              <motion.div
                {...drift(3)}
                className="rounded-full bg-white/90 backdrop-blur ring-1 ring-slate-950/8 shadow-[0_20px_50px_-28px_rgba(11,18,32,0.4)] pl-5 pr-2 py-2 flex items-center gap-3 hover:-translate-y-1 transition-transform duration-300"
              >
                <span className="text-[13px] text-slate-muted truncate">Vraag het de assistent…</span>
                <span className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-ink shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-cream" />
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

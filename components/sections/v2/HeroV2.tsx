"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, Sparkles, Search } from "lucide-react";

// Editorial hero: oversized serif headline as the anchor, with a soft brand-tinted
// gradient wash and small floating product-widgets scattered around it (moodboard:
// steep-style "calm but lively"). Widgets carry real numbers, drift gently, lift on hover.

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroV2() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  // Gentle infinite drift for a widget (visual liveliness, not text motion).
  const float = (delay: number, distance = 10) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -distance, 0] },
          transition: {
            duration: 7 + delay,
            ease: "easeInOut" as const,
            repeat: Infinity,
            delay,
          },
        };

  return (
    <section className="relative bg-cream pt-32 pb-24 md:pt-40 md:pb-28 lg:pt-44 lg:pb-36 overflow-hidden">
      {/* ── Soft gradient "bulb" wash ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 right-[-6%] w-[46rem] h-[46rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10),transparent_62%)] blur-2xl" />
        <div className="absolute top-10 left-[-8%] w-[40rem] h-[40rem] rounded-full bg-[radial-gradient(circle,rgba(243,239,231,0.9),transparent_60%)] blur-2xl" />
        <div className="absolute top-[38%] right-[22%] w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06),transparent_60%)] blur-3xl" />
      </div>
      {/* Faint canvas grid for texture */}
      <div className="absolute inset-x-0 top-0 h-[80%] canvas-grid opacity-[0.35] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ── Left: headline + copy ── */}
          <div className="lg:col-span-7 min-w-0">
            <motion.div {...rise(0)} className="mb-8 md:mb-10">
              <p className="text-overline uppercase text-slate-meta font-semibold inline-flex items-center gap-3">
                <span className="inline-block w-6 border-t border-slate-meta/60" />
                Digital studio, Dordrecht
              </p>
            </motion.div>

            <motion.h1
              {...rise(0.08)}
              className="font-serif font-medium text-display text-slate-ink tracking-tight leading-[1.02] text-balance"
            >
              Jouw digitale afdeling,<br />
              <em className="italic font-normal text-slate-ink/90">zonder de overhead</em>
              <span className="text-arka">.</span>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-8 text-[17px] md:text-lg leading-relaxed text-slate-muted max-w-xl text-pretty"
            >
              Websites, SEO, AI chatbots, dashboards en lead generation. Alles onder een dak, geleverd door dezelfde persoon die je offerte schrijft. Geen account managers, geen doorlooptijden van weken.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap items-center gap-3">
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
              className="mt-10 md:mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12.5px] tracking-wide text-slate-meta uppercase font-semibold"
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

          {/* ── Right: floating widget cluster (lg+ only) ── */}
          <div className="hidden lg:block lg:col-span-5 relative h-[26rem]" aria-hidden="true">
            {/* Traffic / metric card */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="absolute top-0 right-6 w-60 z-20"
            >
              <motion.div
                {...float(0.2, 12)}
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
                    <span
                      key={i}
                      className="flex-1 rounded-sm bg-arka/25"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Google position ring */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
              className="absolute top-[8.5rem] left-0 w-52 z-10"
            >
              <motion.div
                {...float(1.1, 9)}
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
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
              className="absolute top-[13.5rem] right-2 w-64 z-30"
            >
              <motion.div
                {...float(0.6, 11)}
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
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
              className="absolute bottom-0 left-8 w-64 z-20"
            >
              <motion.div
                {...float(1.6, 8)}
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

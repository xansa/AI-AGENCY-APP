"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Editorial hero with oversized serif headline and asymmetric grid.
// Star of the show: the H1. Everything else supports it.
export function HeroV2() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section className="relative bg-cream pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Decorative canvas grid background, subtle */}
      <div className="absolute inset-x-0 top-0 h-[70%] canvas-grid opacity-[0.45] pointer-events-none" />
      {/* Soft gradient wash from top */}
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-cream-deep/80 to-transparent pointer-events-none" />

      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        {/* Overline label */}
        <motion.div {...rise(0)} className="mb-8 md:mb-10">
          <p className="text-overline uppercase text-slate-meta font-semibold inline-flex items-center gap-3">
            <span className="inline-block w-6 border-t border-slate-meta/60" />
            Digital studio, Dordrecht
          </p>
        </motion.div>

        {/* Oversized serif H1 */}
        <motion.h1
          {...rise(0.08)}
          className="font-serif font-medium text-display text-slate-ink tracking-tight leading-[1.02] max-w-5xl text-balance"
        >
          Jouw digitale afdeling,<br />
          <em className="italic font-normal text-slate-ink/90">zonder de overhead</em>
          <span className="text-arka">.</span>
        </motion.h1>

        {/* Sub + CTA row, editorial asymmetric */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
          <motion.div {...rise(0.16)} className="lg:col-span-7 min-w-0">
            <p className="text-[17px] md:text-lg leading-relaxed text-slate-muted max-w-xl text-pretty">
              Websites, SEO, AI chatbots, dashboards en lead generation. Alles onder een dak, geleverd door dezelfde persoon die je offerte schrijft. Geen account managers, geen doorlooptijden van weken.
            </p>
          </motion.div>

          <motion.div {...rise(0.24)} className="lg:col-span-5 flex flex-wrap items-center gap-3 lg:justify-end">
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
        </div>

        {/* Meta row under CTA */}
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
    </section>
  );
}

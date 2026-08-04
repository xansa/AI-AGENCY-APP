"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, User } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const chips = ["6 disciplines", "1 aanspreekpunt", "0 tussenlagen"];

// Human-centered "meet the maker" band (moodboard: jasper big-visual + color contrast).
// Reinforces the solo-founder positioning with the real founder photo.
export function FounderV2() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <section className="relative bg-cream-deep py-24 md:py-32 overflow-hidden">
      {/* soft brand-tinted wash */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-[-10%] left-[-6%] w-[38rem] h-[38rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.07),transparent_62%)] blur-3xl" />
      </div>

      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Visual ── */}
          <motion.div {...reveal()} className="lg:col-span-5 relative">
            {/* offset accent block (color contrast) */}
            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl bg-arka/90 hidden sm:block" aria-hidden="true" />
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-slate-950/10 shadow-[0_30px_70px_-40px_rgba(11,18,32,0.5)]">
              <Image
                src="/founder.png"
                alt="Kaan Arslan, oprichter van Arka"
                width={1536}
                height={1024}
                className="w-full h-auto aspect-[4/3] object-cover"
                priority={false}
              />
            </div>

            {/* floating stat chip (ties to hero widgets) */}
            <div className="absolute -bottom-5 right-4 sm:right-6 rounded-2xl bg-white/95 backdrop-blur ring-1 ring-slate-950/8 shadow-[0_20px_50px_-28px_rgba(11,18,32,0.4)] px-5 py-3.5 flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-arka/10 shrink-0">
                <User className="w-4 h-4 text-arka" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-slate-ink leading-tight">Kaan Arslan</div>
                <div className="text-[11px] text-slate-meta">Oprichter · bouwt alles zelf</div>
              </div>
            </div>
          </motion.div>

          {/* ── Copy ── */}
          <motion.div {...reveal(0.1)} className="lg:col-span-6 lg:col-start-7 min-w-0">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              De persoon achter Arka
            </p>
            <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight leading-[1.06] text-balance">
              Je werkt direct met de bouwer.{" "}
              <em className="italic">Geen tussenlagen.</em>
            </h2>
            <p className="mt-7 text-[17px] leading-relaxed text-slate-muted max-w-xl text-pretty">
              Geen account manager die je brief doorspeelt aan een junior. De persoon die je offerte schrijft, is dezelfde die je website bouwt, je SEO doet en je chatbot traint. Kortere lijnen, snellere beslissingen, en iemand die je bedrijf echt kent.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {chips.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full ring-1 ring-slate-950/10 bg-cream text-[12.5px] font-semibold text-slate-ink/80"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-9">
              <Link
                href="/over-ons"
                className="group inline-flex items-center gap-2 text-[14px] font-semibold text-slate-ink"
              >
                Leer Kaan kennen
                <ArrowUpRight className="w-4 h-4 text-arka transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Differentiator-sectie: de AI-assistent als "digitale medewerker" die kosten en
// tijd bespaart. Zet Arka apart van "iedereen genereert een AI-website". Crème,
// als lichte breuk na de donkere ShowcaseV2. Copy hardcoded NL (zoals de v2-buren).

const stats = [
  { value: "10+ uur", label: "per maand bespaard" },
  { value: "€825", label: "teruggewonnen per maand" },
  { value: "< 2 mnd", label: "terugverdientijd" },
];

export function AiAssistentV2() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.65, ease: EASE, delay },
  });

  return (
    <section className="relative bg-cream py-24 md:py-32 overflow-hidden">
      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Copy ── */}
          <motion.div {...reveal(0)} className="lg:col-span-7 min-w-0">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              Wat ons anders maakt
            </p>
            <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight leading-[1.06] text-balance">
              Niet zomaar een website. Een <em className="italic text-arka">digitale medewerker</em>.
            </h2>
            <p className="mt-6 text-slate-muted text-[17px] leading-relaxed max-w-xl text-pretty">
              Iedereen bouwt tegenwoordig een website. Wij gaan verder: een AI-assistent die 24/7 je inbox sorteert, je agenda beheert, research doet en klantcontact afhandelt. Het werk van meerdere medewerkers, voor de prijs van één maandsalaris. Zo bespaar je kosten en tijd, en houd jij je handen vrij voor het echte werk.
            </p>

            {/* ── ROI stats ── */}
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg">
              {stats.map((s, i) => (
                <motion.div key={s.value} {...reveal(0.1 + i * 0.08)}>
                  <div className="font-serif text-[1.75rem] md:text-[2rem] font-medium text-arka leading-none tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[12.5px] text-slate-meta leading-snug">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── CTA ── */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/ai-assistent"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-arka text-white text-[14px] font-semibold hover:bg-arka-hover transition-colors"
              >
                Ontdek de AI-assistent
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="text-[14px] font-semibold text-slate-ink hover:text-arka transition-colors"
              >
                Plan kennismaking
              </Link>
            </div>
          </motion.div>

          {/* ── Visual ── */}
          <motion.div {...reveal(0.12)} className="lg:col-span-5 relative order-first lg:order-last">
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-arka/8 hidden sm:block" aria-hidden="true" />
            <div className="relative rounded-2xl bg-cream-deep/50 ring-1 ring-slate-950/5 px-6 py-8 sm:px-10 sm:py-12">
              <div className="relative mx-auto w-[72%] sm:w-[62%] lg:w-[78%] max-w-[320px] aspect-[4/5]">
                <Image
                  src="/illustrations/ai-assistent-home.png"
                  alt="AI-assistent voor MKB"
                  fill
                  sizes="(max-width: 1024px) 62vw, 320px"
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

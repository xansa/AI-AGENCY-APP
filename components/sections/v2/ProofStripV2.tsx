"use client";

import { motion, useReducedMotion } from "framer-motion";

// Three hard numbers from real cases, horizontal editorial strip.
// No carousel, no slider, no animated counters beyond a single fade-in.
const stats = [
  {
    value: "+285%",
    label: "Organisch verkeer",
    meta: "Horeca case, 3 maanden",
  },
  {
    value: "24u → 2 min",
    label: "Respons via chatbot",
    meta: "Consultancy case",
  },
  {
    value: "Top 3",
    label: "Google positie",
    meta: "Lokale zoekwoorden",
  },
];

export function ProofStripV2() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-cream py-16 md:py-20">
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="hairline pt-12 md:pt-16">
          <div className="flex items-center justify-between mb-10">
            <p className="text-overline uppercase text-slate-meta font-semibold">
              Resultaten van echte klanten
            </p>
            <div className="hidden sm:block text-[11px] text-slate-meta font-mono">
              001 / 010
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={reduce ? false : { y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0"
              >
                <div className="font-serif text-[clamp(2.75rem,5vw,4.25rem)] leading-[0.95] font-medium text-slate-ink tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-3 text-base font-semibold text-slate-ink/85 break-words">
                  {stat.label}
                </div>
                <div className="mt-1 text-[12.5px] text-slate-meta">
                  {stat.meta}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

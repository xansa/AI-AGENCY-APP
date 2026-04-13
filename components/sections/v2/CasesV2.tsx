"use client";

import { cases as allCases } from "@/content/cases";
import { useTranslation, l, la } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Homepage only shows REAL cases. Example/fake cases (isExample=true) are filtered out.
export function CasesV2() {
  const { locale } = useTranslation();
  const reduce = useReducedMotion();
  const realCases = allCases.filter((c) => !c.isExample).slice(0, 2);

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              Geselecteerd werk
            </p>
            <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight text-balance">
              Concrete resultaten, <em className="italic">echte</em> klanten.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-6 flex lg:justify-end lg:items-end">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-ink group"
            >
              Alle cases bekijken
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-arka" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {realCases.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 group flex flex-col bg-cream-deep rounded-2xl ring-1 ring-slate-950/8 p-8 md:p-10 hover:ring-slate-950/15 transition-all duration-300"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-[11px] font-mono text-slate-meta uppercase tracking-wider">
                  {l(c, "industry", locale)} &middot; {c.package}
                </span>
                <span className="text-[11px] font-mono text-slate-meta">
                  {String(i + 1).padStart(2, "0")} / {String(realCases.length).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-serif text-[2rem] md:text-[2.25rem] leading-[1.05] font-medium text-slate-ink tracking-tight mb-5 break-words">
                {c.client}
              </h3>

              <p className="text-[14.5px] leading-relaxed text-slate-muted line-clamp-3 min-h-[4.5em] text-pretty">
                {l(c, "challenge", locale)}
              </p>

              {/* Metrics row, parallel alignment enforced */}
              <div className="mt-8 pt-8 border-t border-slate-950/8 grid grid-cols-3 gap-4">
                {c.results.slice(0, 3).map((r) => (
                  <div key={r.metric} className="min-w-0">
                    <div className="font-serif text-[1.25rem] md:text-[1.5rem] leading-none font-medium text-slate-ink tracking-tight break-all hyphens-auto">
                      {r.value}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-meta uppercase tracking-wide line-clamp-2">
                      {l(r, "metric", locale)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-8 font-serif italic text-[17px] leading-snug text-slate-ink/85 text-pretty line-clamp-4">
                &ldquo;{l(c.testimonial, "quote", locale)}&rdquo;
              </blockquote>
              <div className="mt-3 text-[12px] text-slate-meta">
                {c.testimonial.author} &middot; {l(c.testimonial, "role", locale)}
              </div>

              <div className="flex-1" />

              <Link
                href="/offerte"
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-slate-ink group/cta"
              >
                Vergelijkbaar resultaat behalen?
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 text-arka" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

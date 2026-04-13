"use client";

import { cases as allCases } from "@/content/cases";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslation, l } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";

export function CasesContent() {
  const { t, locale } = useTranslation();
  const reduce = useReducedMotion();

  // Filter out example cases for the public cases page
  const realCases = allCases.filter((c) => !c.isExample);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-8">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            {t("cases.label")}
          </p>
          <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] max-w-4xl text-balance">
            {t("casesPage.heading")}
          </h1>
          <p className="mt-8 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-2xl text-pretty">
            {t("casesPage.description")}
          </p>
        </div>
      </section>

      {/* Cases editorial stack */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10 space-y-10">
          {realCases.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: i * 0.08 }}
              className="rounded-2xl ring-1 ring-slate-950/8 bg-cream-deep p-8 md:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 min-w-0">
                  <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-slate-meta mb-6">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span className="w-8 border-t border-slate-meta/60" />
                    <span>{l(c, "industry", locale)}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-meta/60" />
                    <span>{c.package}</span>
                  </div>

                  <h2 className="font-serif text-[2.25rem] md:text-[2.75rem] leading-[1.05] font-medium text-slate-ink tracking-tight mb-5 break-words">
                    {c.client}
                  </h2>

                  <p className="text-[14.5px] leading-relaxed text-slate-muted text-pretty mb-8">
                    {l(c, "challenge", locale)}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {c.results.map((r, j) => (
                      <div key={j} className="min-w-0">
                        <div className="font-serif text-[1.25rem] md:text-[1.75rem] leading-none font-medium text-slate-ink tracking-tight break-words hyphens-auto">
                          {r.value}
                        </div>
                        <div className="mt-2 text-[11px] text-slate-meta uppercase tracking-wide line-clamp-2">
                          {l(r, "metric", locale)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <blockquote className="font-serif italic text-[18px] md:text-[20px] leading-snug text-slate-ink/85 text-pretty border-l-2 border-arka/40 pl-5">
                    &ldquo;{l(c.testimonial, "quote", locale)}&rdquo;
                    <footer className="mt-3 text-[12px] text-slate-meta not-italic font-sans">
                      {c.testimonial.author} &middot; {l(c.testimonial, "role", locale)}
                    </footer>
                  </blockquote>
                </div>

                <div className="lg:col-span-5 min-w-0 space-y-6">
                  <div className="p-6 bg-cream rounded-xl ring-1 ring-slate-950/8">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-meta mb-3">
                      {t("casesPage.aanpak")}
                    </p>
                    <p className="text-[14px] leading-relaxed text-slate-muted text-pretty">
                      {l(c, "approach", locale)}
                    </p>
                  </div>
                  <div className="p-6 bg-cream rounded-xl ring-1 ring-slate-950/8 grid grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-meta mb-1">
                        {t("casesPage.looptijd")}
                      </p>
                      <p className="text-[14px] font-semibold text-slate-ink break-words">
                        {l(c, "duration", locale)}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-meta mb-1">
                        Package
                      </p>
                      <p className="text-[14px] font-semibold text-slate-ink break-words">
                        {c.package}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/offerte"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-ink group"
                  >
                    {locale === "nl" ? "Vergelijkbaar resultaat behalen?" : "Achieve similar results?"}
                    <ArrowUpRight className="w-4 h-4 text-arka group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative bg-ink text-cream py-24 md:py-32">
        <div className="absolute inset-0 canvas-grid opacity-[0.035] pointer-events-none" />
        <div className="relative max-w-narrow mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="font-serif font-medium text-h1 text-cream tracking-tight leading-[1.05] text-balance">
            {t("casesPage.ctaHeading")}
          </h2>
          <p className="mt-6 text-cream/60 text-[17px] leading-relaxed max-w-xl mx-auto text-pretty">
            {t("casesPage.ctaDescription")}
          </p>
          <div className="mt-10">
            <Link
              href="/offerte"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-arka text-white text-sm font-semibold hover:bg-arka-hover transition-colors"
            >
              {t("packages.offerteAanvragen")}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

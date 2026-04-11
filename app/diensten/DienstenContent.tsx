"use client";

import { services } from "@/content/services";
import Link from "next/link";
import {
  ArrowUpRight,
  Globe,
  Search,
  Bot,
  BarChart3,
  Target,
  Palette,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useTranslation, l } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Search,
  Bot,
  BarChart3,
  Target,
  Palette,
};

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min";

export function DienstenContent() {
  const { t, locale } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-8">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            {t("dienstenPage.badge")}
          </p>
          <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] max-w-4xl text-balance">
            {t("dienstenPage.heading")}
          </h1>
          <p className="mt-8 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-2xl text-pretty">
            {t("dienstenPage.description")}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-line rounded-2xl overflow-hidden ring-1 ring-slate-950/8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap;
              return (
                <motion.div
                  key={service.slug}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
                  className="min-w-0"
                >
                  <Link
                    href={`/diensten/${service.slug}`}
                    className="group flex flex-col h-full bg-cream p-8 md:p-10 hover:bg-cream-deep transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-11 h-11 rounded-xl bg-slate-950/5 ring-1 ring-slate-950/8 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-ink" strokeWidth={1.5} />
                      </div>
                      <span className="text-[11px] font-mono text-slate-meta">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="font-serif text-[1.65rem] leading-[1.1] font-medium text-slate-ink tracking-tight mb-3 break-words">
                      {l(service, "title", locale)}
                    </h2>
                    <p className="text-[13px] uppercase tracking-wide text-slate-meta font-semibold mb-4 line-clamp-2 min-h-[2.4em]">
                      {l(service, "tagline", locale)}
                    </p>
                    <p className="text-[14.5px] leading-relaxed text-slate-muted line-clamp-3 min-h-[4.5em]">
                      {l(service, "description", locale)}
                    </p>
                    <div className="flex-1" />
                    <div className="mt-8 pt-6 border-t border-slate-950/8 flex items-center justify-between">
                      <span className="text-[12.5px] font-semibold text-slate-ink tracking-wide">
                        {t("dienstenPage.meerLezen")}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-muted group-hover:text-arka group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative bg-ink text-cream py-24 md:py-32">
        <div className="absolute inset-0 canvas-grid opacity-[0.035] pointer-events-none" />
        <div className="relative max-w-narrow mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="font-serif font-medium text-h1 text-cream tracking-tight leading-[1.05] text-balance">
            {t("dienstenPage.ctaHeading")}
          </h2>
          <p className="mt-6 text-cream/60 text-[17px] leading-relaxed max-w-xl mx-auto text-pretty">
            {t("dienstenPage.ctaDescription")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/offerte"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-arka text-white text-sm font-semibold hover:bg-arka-hover transition-colors"
            >
              {t("packages.offerteAanvragen")}
            </Link>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent text-cream ring-1 ring-cream/20 text-sm font-semibold hover:bg-cream/5 transition-colors"
            >
              {t("dienstenPage.planKennismaking")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Mail,
  Calendar,
  Clock,
  HardDrive,
  Inbox,
  Users,
  MessagesSquare,
  ListChecks,
  ListTodo,
  FileText,
  Calculator,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { aiAssistent } from "@/content/ai-assistent";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Mail,
  Calendar,
  HardDrive,
  Inbox,
  Users,
  MessagesSquare,
  ListChecks,
  ListTodo,
  FileText,
  Calculator,
  Receipt,
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function AiAssistentContent() {
  const { locale } = useTranslation();
  const c = aiAssistent[locale];
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.65, ease: EASE, delay },
  });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-cream pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[70%] canvas-grid opacity-[0.45] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-cream-deep/80 to-transparent pointer-events-none" />

        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div {...rise(0)} className="mb-8">
            <p className="text-overline uppercase text-slate-meta font-semibold inline-flex items-center gap-3">
              <span className="inline-block w-6 border-t border-slate-meta/60" />
              {c.hero.overline}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 min-w-0">
              <motion.h1
                {...rise(0.08)}
                className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] text-balance"
              >
                {c.hero.titleLead}{" "}
                <em className="italic font-normal text-slate-ink/90">
                  {c.hero.titleEm}
                </em>
                <span className="text-arka">.</span>
              </motion.h1>

              <motion.p
                {...rise(0.16)}
                className="mt-8 text-[17px] md:text-lg leading-relaxed text-slate-muted max-w-xl text-pretty"
              >
                {c.hero.subtitle}
              </motion.p>

              <motion.div
                {...rise(0.24)}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-ink-light transition-colors"
                >
                  {c.hero.primaryCta}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a
                  href="#hoe-het-werkt"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent text-slate-ink ring-1 ring-slate-950/15 text-sm font-semibold hover:bg-slate-950/5 transition-colors"
                >
                  {c.hero.secondaryCta}
                </a>
              </motion.div>
            </div>

            {/* Morning Brief mockup card */}
            <motion.div
              {...rise(0.32)}
              className="lg:col-span-5 min-w-0"
            >
              <div className="relative rounded-2xl bg-white ring-1 ring-slate-950/8 shadow-[0_12px_40px_-28px_rgba(11,18,32,0.25)] p-6 md:p-7">
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-arka" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-meta">
                      {c.hero.briefLabel}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-meta">08:00</span>
                </div>
                <p className="font-serif text-[1.35rem] leading-snug text-slate-ink font-medium tracking-tight mb-5">
                  {c.hero.briefGreeting}
                </p>
                <ul className="space-y-3">
                  {c.hero.briefItems.map((item, i) => {
                    const Icon = [Mail, Calendar, Clock][i] ?? Mail;
                    return (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-[14px] text-slate-ink/80"
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cream-deep ring-1 ring-slate-950/6 flex-shrink-0">
                          <Icon className="w-4 h-4 text-arka" strokeWidth={2} aria-hidden="true" />
                        </span>
                        <span className="break-words">{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Wat het is ───────────────────────────────────────── */}
      <section className="relative bg-cream py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <motion.div {...reveal()} className="lg:col-span-5">
              <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
                <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                <span className="mr-2 opacity-70">{c.wat.kicker}</span>
                {c.wat.overline}
              </p>
              <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight leading-[1.05] text-balance">
                {c.wat.titleLead}{" "}
                <em className="italic">{c.wat.titleEm}</em>
                <span className="text-arka">.</span>
              </h2>
            </motion.div>
            <motion.div {...reveal(0.1)} className="lg:col-span-6 lg:col-start-7 lg:pt-3">
              <p className="text-[17px] md:text-lg leading-relaxed text-slate-muted text-pretty">
                {c.wat.body}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Hoe het werkt ────────────────────────────────────── */}
      <section
        id="hoe-het-werkt"
        className="relative bg-cream pb-24 md:pb-32 scroll-mt-24"
      >
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div {...reveal()} className="max-w-3xl mb-16 md:mb-20">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              <span className="mr-2 opacity-70">{c.hoe.kicker}</span>
              {c.hoe.overline}
            </p>
            <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight leading-[1.08] text-balance">
              {c.hoe.titleLead}{" "}
              <em className="italic">{c.hoe.titleEm}</em>
              <span className="text-arka">.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {c.hoe.steps.map((step, i) => (
              <motion.div
                key={step.n}
                {...reveal((i % 2) * 0.08)}
                className={cn(
                  "flex gap-6 items-start pt-8 border-t border-slate-950/10",
                  // asymmetric editorial offset: nudge the right column down
                  i % 2 === 1 && "md:mt-10"
                )}
              >
                <span className="font-serif text-[2.75rem] leading-none font-medium text-slate-ink/25 tracking-tight flex-shrink-0">
                  {step.n}
                </span>
                <div className="min-w-0 pt-1">
                  <h3 className="font-serif text-[1.5rem] leading-tight font-medium text-slate-ink tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate-muted text-pretty">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Investering / pricing (het navy accent-blok) ─────── */}
      <section className="relative bg-ink text-cream py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 canvas-grid opacity-[0.035] pointer-events-none" />

        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div {...reveal()} className="max-w-3xl mb-14 md:mb-16">
            <p className="text-overline uppercase text-cream/40 font-semibold mb-6">
              <span className="inline-block w-6 border-t border-cream/30 mr-3 align-middle" />
              <span className="mr-2 opacity-70">{c.pricing.kicker}</span>
              {c.pricing.overline}
            </p>
            <h2 className="font-serif font-medium text-h1 text-cream tracking-tight leading-[1.05] text-balance">
              {c.pricing.titleLead}{" "}
              <em className="italic">{c.pricing.titleEm}</em>
              <span className="text-arka">.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl">
            {c.pricing.tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                {...reveal(i * 0.08)}
                className={cn(
                  "relative min-w-0 flex flex-col rounded-2xl p-8 md:p-10 ring-1 transition-all duration-300",
                  tier.highlighted
                    ? "bg-cream text-ink ring-arka/40"
                    : "bg-cream/[0.035] text-cream ring-cream/10 hover:ring-cream/20"
                )}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-arka text-white text-[11px] font-semibold tracking-wide uppercase">
                    {tier.badge}
                  </div>
                )}

                <h3
                  className={cn(
                    "font-serif text-[1.75rem] leading-none font-medium tracking-tight mb-5",
                    tier.highlighted ? "text-ink" : "text-cream"
                  )}
                >
                  {tier.name}
                </h3>

                <div
                  className={cn(
                    "mb-8 pb-6 border-b flex items-baseline gap-2",
                    tier.highlighted ? "border-ink/10" : "border-cream/10"
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-[2.5rem] leading-none font-medium tracking-tight",
                      tier.highlighted ? "text-ink" : "text-cream"
                    )}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={cn(
                      "text-[12px] uppercase tracking-wide font-semibold",
                      tier.highlighted ? "text-ink/50" : "text-cream/40"
                    )}
                  >
                    {tier.priceNote}
                  </span>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {tier.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-[14px] leading-snug min-w-0"
                    >
                      <Check
                        className="w-4 h-4 mt-0.5 flex-shrink-0 text-arka"
                        strokeWidth={2}
                      />
                      <span
                        className={cn(
                          "break-words",
                          tier.highlighted ? "text-ink/80" : "text-cream/75"
                        )}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/offerte"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-[13px] font-semibold transition-colors",
                    tier.highlighted
                      ? "bg-arka text-white hover:bg-arka-hover"
                      : "bg-cream text-ink hover:bg-cream-deep"
                  )}
                >
                  {tier.cta}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...reveal(0.1)}
            className="mt-8 text-[13px] text-cream/45 max-w-4xl text-pretty"
          >
            {c.pricing.footnote}
          </motion.p>
        </div>
      </section>

      {/* ── De rekensom / ROI ────────────────────────────────── */}
      <section className="relative bg-cream py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-16">
            <motion.div {...reveal()} className="lg:col-span-7">
              <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
                <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                <span className="mr-2 opacity-70">{c.roi.kicker}</span>
                {c.roi.overline}
              </p>
              <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight leading-[1.08] text-balance">
                {c.roi.titleLead}{" "}
                <em className="italic">{c.roi.titleEm}</em>
                {c.roi.titleTail ? ` ${c.roi.titleTail}` : ""}
                <span className="text-arka">.</span>
              </h2>
            </motion.div>
            <motion.div {...reveal(0.1)} className="lg:col-span-5 lg:pt-3">
              <p className="text-[17px] leading-relaxed text-slate-muted text-pretty">
                {c.roi.body}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-slate-950/10">
            {c.roi.stats.map((stat, i) => (
              <motion.div key={i} {...reveal(i * 0.08)} className="min-w-0">
                <div className="font-serif text-[clamp(2.75rem,5vw,3.75rem)] leading-none font-medium text-arka tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-3 text-[13px] uppercase tracking-wide font-semibold text-slate-meta">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Koppelingen ──────────────────────────────────────── */}
      <section className="relative bg-cream pb-24 md:pb-32">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div {...reveal()} className="max-w-3xl mb-12 md:mb-14">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              <span className="mr-2 opacity-70">{c.integraties.kicker}</span>
              {c.integraties.overline}
            </p>
            <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight leading-[1.08] text-balance">
              {c.integraties.titleLead}{" "}
              <em className="italic">{c.integraties.titleEm}</em>
              <span className="text-arka">.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {c.integraties.items.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Mail;
              return (
                <motion.div
                  key={item.name}
                  {...reveal((i % 4) * 0.05)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl ring-1 ring-slate-950/8 bg-cream-deep min-w-0"
                >
                  <Icon
                    className="w-4 h-4 text-slate-ink/70 flex-shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="text-[13.5px] font-medium text-slate-ink/85 break-words">
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            {...reveal(0.1)}
            className="mt-6 text-[14px] text-slate-muted text-pretty"
          >
            {c.integraties.zapier}
          </motion.p>
        </div>
      </section>

      {/* ── Slot-CTA ─────────────────────────────────────────── */}
      <section className="relative bg-cream py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div {...reveal()} className="hairline-strong pt-16 md:pt-20 text-center">
            <h2 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] text-balance max-w-3xl mx-auto">
              {c.cta.titleLead}{" "}
              <em className="italic">{c.cta.titleEm}</em>
              <span className="text-arka">{c.cta.titleTail}</span>
            </h2>
            <p className="mt-6 text-slate-muted text-[17px] leading-relaxed max-w-xl mx-auto text-pretty">
              {c.cta.body}
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-ink-light transition-colors"
              >
                {c.cta.button}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

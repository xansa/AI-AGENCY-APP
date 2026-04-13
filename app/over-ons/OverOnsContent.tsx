"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Layers, Target, Shield, Handshake, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min";

export function OverOnsContent() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const principles = [
    { titleKey: "overOns.p1.title" as const, descKey: "overOns.p1.desc" as const, icon: MessageCircle },
    { titleKey: "overOns.p2.title" as const, descKey: "overOns.p2.desc" as const, icon: Layers },
    { titleKey: "overOns.p3.title" as const, descKey: "overOns.p3.desc" as const, icon: Target },
    { titleKey: "overOns.p4.title" as const, descKey: "overOns.p4.desc" as const, icon: Shield },
    { titleKey: "overOns.p5.title" as const, descKey: "overOns.p5.desc" as const, icon: Handshake },
  ];

  const steps = [
    { number: "01", titleKey: "overOns.stap1Title" as const, descKey: "overOns.stap1Desc" as const },
    { number: "02", titleKey: "overOns.stap2Title" as const, descKey: "overOns.stap2Desc" as const },
    { number: "03", titleKey: "overOns.stap3Title" as const, descKey: "overOns.stap3Desc" as const },
  ];

  return (
    <>
      {/* Editorial hero */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-8">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            {t("overOns.badge")}
          </p>
          <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] max-w-4xl text-balance">
            {t("overOns.heading")}
          </h1>
          <p className="mt-8 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-2xl text-pretty">
            {t("overOns.description")}
          </p>
        </div>
      </section>

      {/* Founder section */}
      <section className="relative bg-cream py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto lg:mx-0 w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden ring-1 ring-slate-950/10">
                <Image
                  src="/founder.png"
                  alt="Kaan Arslan, oprichter van Arka"
                  width={768}
                  height={512}
                  className="w-full h-full object-cover object-[55%_15%]"
                  priority
                />
              </div>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 min-w-0"
            >
              <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
                <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                De founder
              </p>
              <h2 className="font-serif font-medium text-h2 text-slate-ink tracking-tight mb-6 text-balance">
                {t("overOns.heyKaan")}
              </h2>
              <div className="space-y-5 text-[16px] leading-relaxed text-slate-muted text-pretty">
                <p>{t("overOns.kaanDesc1")}</p>
                <p>{t("overOns.kaanDesc2")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why + how */}
      <section className="relative bg-cream-deep py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 min-w-0">
              <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
                <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                Waarom Arka
              </p>
              <h2 className="font-serif font-medium text-h2 text-slate-ink tracking-tight mb-8 text-balance">
                {t("overOns.waaromArka")}
              </h2>
              <div className="space-y-5 text-[16px] leading-relaxed text-slate-muted text-pretty max-w-xl">
                <p>{t("overOns.waaromDesc1")}</p>
                <p>{t("overOns.waaromDesc2")}</p>
                <p>{t("overOns.waaromDesc3")}</p>
              </div>
            </div>

            <div className="lg:col-span-5 min-w-0">
              <div className="p-8 bg-cream rounded-2xl ring-1 ring-slate-950/8">
                <h3 className="font-serif text-[1.5rem] font-medium text-slate-ink mb-6 tracking-tight">
                  {t("overOns.hoeArkaWerkt")}
                </h3>
                <div className="space-y-5">
                  {steps.map((step) => (
                    <div key={step.number} className="flex items-start gap-4 min-w-0">
                      <span className="font-serif text-[1.25rem] font-medium text-arka flex-shrink-0 w-7">
                        {step.number}
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-ink text-[14px] mb-1 break-words">
                          {t(step.titleKey)}
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-muted text-pretty">
                          {t(step.descKey)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles grid */}
      <section className="relative bg-cream py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="mb-14">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              Principes
            </p>
            <h2 className="font-serif font-medium text-h2 text-slate-ink tracking-tight text-balance max-w-2xl">
              {t("overOns.principes")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-line rounded-2xl overflow-hidden ring-1 ring-slate-950/8">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="min-w-0 bg-cream p-8 md:p-10 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-950/5 ring-1 ring-slate-950/8 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-ink" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-mono text-slate-meta">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-serif text-[1.35rem] leading-[1.15] font-medium text-slate-ink tracking-tight mb-3 break-words">
                    {t(p.titleKey)}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-slate-muted text-pretty">
                    {t(p.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achtergrond */}
      <section className="relative bg-cream-deep py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 min-w-0"
            >
              <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
                <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                {t("overOns.achtergrondBadge")}
              </p>
              <h2 className="font-serif font-medium text-h2 text-slate-ink tracking-tight mb-8 text-balance">
                {t("overOns.achtergrondHeading")}
              </h2>
              <div className="space-y-5 text-[16px] leading-relaxed text-slate-muted text-pretty max-w-xl">
                <p>{t("overOns.achtergrondDesc1")}</p>
                <p>{t("overOns.achtergrondDesc2")}</p>
                <p>{t("overOns.achtergrondDesc3")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bewezen resultaten */}
      <section className="relative bg-cream py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="mb-14">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              {t("overOns.resultatenBadge")}
            </p>
            <h2 className="font-serif font-medium text-h2 text-slate-ink tracking-tight text-balance max-w-2xl">
              {t("overOns.resultatenHeading")}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-muted max-w-xl text-pretty">
              {t("overOns.resultatenDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1: Display-pallets.nl */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="p-8 rounded-2xl ring-1 ring-slate-950/8 bg-cream-deep flex flex-col min-w-0"
            >
              <span className="font-serif text-[2rem] font-medium text-arka mb-3 leading-none">
                {t("overOns.case1Metric")}
              </span>
              <h3 className="font-serif text-[1.35rem] font-medium text-slate-ink tracking-tight mb-3">
                {t("overOns.case1Title")}
              </h3>
              <p className="text-[14px] leading-relaxed text-slate-muted text-pretty flex-1 mb-6">
                {t("overOns.case1Desc")}
              </p>
              <Link
                href="/cases/display-pallets"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-ink hover:text-arka transition-colors"
              >
                {t("overOns.case1Link")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
            {/* Case 2: De Palletleverancier BV */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="p-8 rounded-2xl ring-1 ring-slate-950/8 bg-cream-deep flex flex-col min-w-0"
            >
              <span className="font-serif text-[2rem] font-medium text-arka mb-3 leading-none">
                {t("overOns.case2Metric")}
              </span>
              <h3 className="font-serif text-[1.35rem] font-medium text-slate-ink tracking-tight mb-3">
                {t("overOns.case2Title")}
              </h3>
              <p className="text-[14px] leading-relaxed text-slate-muted text-pretty flex-1 mb-6">
                {t("overOns.case2Desc")}
              </p>
              <Link
                href="/cases/de-palletleverancier"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-ink hover:text-arka transition-colors"
              >
                {t("overOns.case2Link")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Direct contact */}
      <section className="relative bg-cream-deep py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 min-w-0"
            >
              <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
                <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                {t("overOns.contactBadge")}
              </p>
              <h2 className="font-serif font-medium text-h2 text-slate-ink tracking-tight mb-6 text-balance">
                {t("overOns.contactHeading")}
              </h2>
              <p className="text-[16px] leading-relaxed text-slate-muted text-pretty max-w-md">
                {t("overOns.contactDesc")}
              </p>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 lg:col-start-8 min-w-0"
            >
              <div className="p-8 rounded-2xl ring-1 ring-slate-950/8 bg-cream space-y-5">
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-meta">
                    {t("overOns.contactEmail")}
                  </span>
                  <a
                    href="mailto:info@arkadigital.nl"
                    className="text-[15px] font-medium text-slate-ink hover:text-arka transition-colors break-all"
                  >
                    info@arkadigital.nl
                  </a>
                </div>
                <div className="w-full h-px bg-line" />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-meta">
                    {t("overOns.contactPhone")}
                  </span>
                  <a
                    href="tel:+31646140986"
                    className="text-[15px] font-medium text-slate-ink hover:text-arka transition-colors"
                  >
                    +31 6 46140986
                  </a>
                </div>
                <div className="w-full h-px bg-line" />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-meta">
                    {t("overOns.contactLinkedIn")}
                  </span>
                  <a
                    href="https://www.linkedin.com/in/kaanarslan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[15px] font-medium text-slate-ink hover:text-arka transition-colors"
                  >
                    linkedin.com/in/kaanarslan
                    <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative bg-ink text-cream py-24 md:py-32">
        <div className="absolute inset-0 canvas-grid opacity-[0.035] pointer-events-none" />
        <div className="relative max-w-narrow mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="font-serif font-medium text-h1 text-cream tracking-tight leading-[1.05] text-balance">
            {t("overOns.ctaHeading")}
          </h2>
          <p className="mt-6 text-cream/60 text-[17px] leading-relaxed max-w-xl mx-auto text-pretty">
            {t("overOns.ctaDescription")}
          </p>
          <div className="mt-10">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-arka text-white text-sm font-semibold hover:bg-arka-hover transition-colors"
            >
              {t("overOns.gesprekPlannen")}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

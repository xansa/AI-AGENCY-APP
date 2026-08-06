"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Layers, Target, Shield, Handshake, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { HeroAura } from "@/components/ui/HeroAura";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function OverOnsContent() {
  const { t, locale } = useTranslation();
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.65, ease: EASE, delay },
  });

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

  const chips =
    locale === "en"
      ? ["6 disciplines", "1 point of contact", "0 middlemen"]
      : ["6 disciplines", "1 aanspreekpunt", "0 tussenlagen"];

  return (
    <>
      {/* Editorial hero */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <HeroAura />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10"
        >
          <p className="text-overline uppercase text-slate-meta font-semibold mb-8">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            {t("overOns.badge")}
          </p>
          <h1 className="font-serif font-medium text-[clamp(3rem,8vw,7rem)] text-slate-ink tracking-tight leading-[0.98] max-w-5xl text-balance">
            {t("overOns.heading")}
          </h1>
          <p className="mt-8 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-2xl text-pretty">
            {t("overOns.description")}
          </p>
        </motion.div>
      </section>

      {/* Founder — human moment */}
      <section className="relative bg-cream py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
            <motion.div {...reveal()} className="lg:col-span-5 relative">
              <div className="relative mx-auto lg:mx-0 max-w-[320px]">
                <div className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl bg-arka/90 hidden sm:block" aria-hidden="true" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-slate-950/10 shadow-[0_30px_70px_-40px_rgba(11,18,32,0.5)]">
                  <Image
                    src="/founder.png"
                    alt="Kaan Arslan, oprichter van Arka"
                    fill
                    sizes="(max-width: 1024px) 80vw, 320px"
                    className="object-cover object-[50%_20%]"
                    priority
                  />
                </div>
                <div className="absolute -bottom-5 right-4 sm:right-6 rounded-2xl bg-white/95 backdrop-blur ring-1 ring-slate-950/8 shadow-[0_20px_50px_-28px_rgba(11,18,32,0.4)] px-5 py-3">
                  <div className="text-[13px] font-semibold text-slate-ink leading-tight">Kaan Arslan</div>
                </div>
              </div>
            </motion.div>

            <motion.div {...reveal(0.1)} className="lg:col-span-7 min-w-0">
              <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
                <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                {locale === "en" ? "The founder" : "De founder"}
              </p>
              <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight mb-6 text-balance">
                {t("overOns.heyKaan")}
              </h2>
              <div className="space-y-5 text-[16px] md:text-[17px] leading-relaxed text-slate-muted text-pretty max-w-xl">
                <p>{t("overOns.kaanDesc1")}</p>
                <p>{t("overOns.kaanDesc2")}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full ring-1 ring-slate-950/10 bg-cream-deep text-[12.5px] font-semibold text-slate-ink/80"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why + how */}
      <section className="relative bg-cream py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] h-[88%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.06),transparent_66%)] blur-3xl" />
        </div>
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div {...reveal()} className="lg:col-span-7 min-w-0">
              <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
                <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                {locale === "en" ? "Why Arka" : "Waarom Arka"}
              </p>
              <h2 className="font-serif font-medium text-h2 text-slate-ink tracking-tight mb-8 text-balance">
                {t("overOns.waaromArka")}
              </h2>
              <div className="space-y-5 text-[16px] leading-relaxed text-slate-muted text-pretty max-w-xl">
                <p>{t("overOns.waaromDesc1")}</p>
                <p>{t("overOns.waaromDesc2")}</p>
                <p>{t("overOns.waaromDesc3")}</p>
              </div>
            </motion.div>

            <motion.div {...reveal(0.1)} className="lg:col-span-5 min-w-0">
              <div className="p-8 bg-cream-deep rounded-2xl ring-1 ring-slate-950/8">
                <h3 className="font-serif text-[1.5rem] font-medium text-slate-ink mb-7 tracking-tight">
                  {t("overOns.hoeArkaWerkt")}
                </h3>
                <div className="relative space-y-6">
                  <span
                    className="absolute left-[13px] top-2 bottom-2 w-px bg-slate-950/10 hidden sm:block"
                    aria-hidden="true"
                  />
                  {steps.map((step) => (
                    <div key={step.number} className="relative flex items-start gap-4 min-w-0">
                      <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-arka text-white font-mono text-[11px] font-semibold flex-shrink-0">
                        {step.number}
                      </span>
                      <div className="min-w-0 pt-0.5">
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principles grid */}
      <section className="relative bg-cream py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="mb-14">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              {locale === "en" ? "Principles" : "Principes"}
            </p>
            <h2 className="font-serif font-medium text-h2 text-slate-ink tracking-tight text-balance max-w-2xl">
              {t("overOns.principes")}
            </h2>
          </div>
          <div className="border-t border-slate-950/8">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
                  className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-8 md:py-9 border-b border-slate-950/8"
                >
                  <div className="flex items-center gap-4 md:w-[44%] shrink-0 min-w-0">
                    <span className="font-mono text-[12px] text-slate-meta w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-arka/8 ring-1 ring-arka/15 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-arka/15">
                      <Icon className="w-5 h-5 text-arka" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-serif text-[1.4rem] leading-[1.1] font-medium text-slate-ink tracking-tight min-w-0 break-words">
                      {t(p.titleKey)}
                    </h3>
                  </div>
                  <p className="text-[15px] leading-relaxed text-slate-muted text-pretty min-w-0 md:pt-1.5">
                    {t(p.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achtergrond — dark story break with pull-quote */}
      <section className="relative bg-ink text-cream py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 canvas-grid opacity-[0.04] pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[85%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.14),transparent_66%)] blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div {...reveal()} className="max-w-3xl">
            <p className="text-overline uppercase text-cream/40 font-semibold mb-6">
              <span className="inline-block w-6 border-t border-cream/30 mr-3 align-middle" />
              {t("overOns.achtergrondBadge")}
            </p>
            <h2 className="font-serif font-medium text-h1 text-cream tracking-tight leading-[1.05] mb-8 text-balance">
              {t("overOns.achtergrondHeading")}
            </h2>
            <p className="font-serif italic text-[22px] md:text-[27px] leading-snug text-cream/95 text-pretty border-l-2 border-arka/50 pl-6 mb-8">
              {t("overOns.achtergrondDesc1")}
            </p>
            <div className="space-y-5 text-[16px] md:text-[17px] leading-relaxed text-cream/65 text-pretty max-w-2xl">
              <p>{t("overOns.achtergrondDesc2")}</p>
              <p>{t("overOns.achtergrondDesc3")}</p>
            </div>
          </motion.div>
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
              {...reveal()}
              whileHover={reduce ? undefined : { y: -4 }}
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
              {...reveal(0.1)}
              whileHover={reduce ? undefined : { y: -4 }}
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
            <motion.div {...reveal()} className="lg:col-span-6 min-w-0">
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
            <motion.div {...reveal(0.1)} className="lg:col-span-5 lg:col-start-8 min-w-0">
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

      {/* Brand-signature closing (Noira-style, single CTA lives in the footer) */}
      <section className="relative bg-ink text-cream pt-20 md:pt-28 pb-14 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 canvas-grid opacity-[0.035] pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[85%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_66%)] blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <p className="text-overline uppercase text-cream/40 font-semibold mb-4">
            {locale === "en" ? "Your digital department" : "Jouw digitale afdeling"}
          </p>
          <div className="select-none pointer-events-none" aria-hidden="true">
            <span className="arka-wordmark block leading-[0.8] text-[clamp(5rem,25vw,20rem)]">
              Arka<span className="text-arka">.</span>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import { packages } from "@/content/packages";
import { useTranslation, l } from "@/lib/i18n";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Search,
  Bot,
  Palette,
  BarChart3,
  Target,
  ArrowUpRight,
  Check,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

// Six disciplines, ordered bottom→top of the isometric tower. minTier = the package
// index (0 Starter, 1 Professional, 2 Enterprise) at which the block first appears.
type Block = { label: string; label_en: string; icon: LucideIcon; minTier: number; pos: { left: number; top: number } };
const BLOCKS: Block[] = [
  { label: "Websites & Webshops", label_en: "Websites & Webshops", icon: Globe, minTier: 0, pos: { left: 74, top: 210 } },
  { label: "SEO & Content", label_en: "SEO & Content", icon: Search, minTier: 0, pos: { left: 158, top: 180 } },
  { label: "AI Chatbots", label_en: "AI Chatbots", icon: Bot, minTier: 1, pos: { left: 74, top: 150 } },
  { label: "Branding & Design", label_en: "Branding & Design", icon: Palette, minTier: 1, pos: { left: 158, top: 120 } },
  { label: "Dashboards & Data", label_en: "Dashboards & Data", icon: BarChart3, minTier: 2, pos: { left: 74, top: 90 } },
  { label: "Lead Generation", label_en: "Lead Generation", icon: Target, minTier: 2, pos: { left: 158, top: 60 } },
];

function IsoTile({ Icon, highlight }: { Icon: LucideIcon; highlight: boolean }) {
  return (
    <div className="relative w-[104px] h-[72px] flex items-center justify-center">
      {/* thickness / shadow face */}
      <div
        className={cn(
          "absolute left-1/2 top-[calc(50%+7px)] -translate-x-1/2 -translate-y-1/2 w-[62px] h-[62px] rotate-45 scale-y-[0.6] rounded-[10px]",
          highlight ? "bg-arka/60" : "bg-arka/25"
        )}
      />
      {/* top face */}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[62px] h-[62px] rotate-45 scale-y-[0.6] rounded-[10px] ring-1",
          highlight ? "bg-white ring-arka/40" : "bg-cream ring-slate-950/10"
        )}
      />
      <Icon className={cn("relative w-5 h-5", highlight ? "text-arka" : "text-slate-ink/70")} strokeWidth={2} />
    </div>
  );
}

export function PackagesShowcaseV2() {
  const { locale } = useTranslation();
  const reduce = useReducedMotion();
  const [tier, setTier] = useState(1); // default: Professional
  const [billing, setBilling] = useState<"monthly" | "onetime">("monthly");

  const pkg = packages[tier];
  const visible = BLOCKS.filter((b) => b.minTier <= tier);

  return (
    <section className="relative bg-ink text-cream py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] h-[85%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.13),transparent_66%)] blur-3xl" />
      </div>

      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* ── Left: selector + details ── */}
          <div className="lg:col-span-6 min-w-0">
            <p className="text-overline uppercase text-cream/40 font-semibold mb-6">
              <span className="inline-block w-6 border-t border-cream/30 mr-3 align-middle" />
              Investering
            </p>
            <h2 className="font-serif font-medium text-h1 text-cream tracking-tight leading-[1.05] text-balance">
              Drie paden, <em className="italic">een</em> doel.
            </h2>
            <p className="mt-6 text-cream/60 text-[16px] leading-relaxed max-w-md text-pretty">
              Kies het pakket dat past bij je groeifase, of vergelijk maandelijks met eenmalig. De toren rechts laat zien welke disciplines je krijgt.
            </p>

            {/* billing toggle */}
            <div className="mt-8 inline-flex items-center p-1 rounded-full bg-cream/5 ring-1 ring-cream/10">
              {(["monthly", "onetime"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  aria-pressed={billing === b}
                  className={cn(
                    "px-5 py-2 text-[13px] font-semibold rounded-full transition-all duration-200",
                    billing === b ? "bg-cream text-ink" : "text-cream/60 hover:text-cream"
                  )}
                >
                  {b === "monthly" ? "Maandelijks" : "Eenmalig"}
                </button>
              ))}
            </div>

            {/* tier selector */}
            <div className="mt-8 space-y-2.5">
              {packages.map((p, i) => {
                const active = i === tier;
                const p_price = billing === "monthly" ? p.monthlyInvestment : l(p, "onetimePrice", locale);
                return (
                  <button
                    key={p.id}
                    onClick={() => setTier(i)}
                    className={cn(
                      "w-full text-left rounded-2xl p-4 md:p-5 ring-1 transition-all duration-300 flex items-start sm:items-center gap-4",
                      active ? "bg-cream text-ink ring-arka/40" : "bg-cream/[0.04] text-cream ring-cream/10 hover:ring-cream/25"
                    )}
                    aria-pressed={active}
                  >
                    <span className={cn("font-mono text-[11px] shrink-0 mt-1.5 sm:mt-0", active ? "text-ink/40" : "text-cream/40")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <span className="min-w-0 flex-1">
                        <span className={cn("font-serif text-[1.4rem] leading-none font-medium block", active ? "text-ink" : "text-cream")}>
                          {p.name}
                        </span>
                        <span className={cn("text-[12.5px] block mt-1", active ? "text-ink/60" : "text-cream/50")}>
                          {l(p, "tagline", locale)}
                        </span>
                      </span>
                      <span className={cn("font-serif text-[1.25rem] font-medium shrink-0 mt-1.5 sm:mt-0 sm:text-right", active ? "text-arka" : "text-cream/70")}>
                        {p_price}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/offerte"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-arka text-white text-sm font-semibold hover:bg-arka-hover transition-colors"
              >
                Start met {pkg.name}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/packages"
                className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cream/70 hover:text-cream transition-colors"
              >
                Bekijk volledige specificaties
                <ArrowUpRight className="w-3.5 h-3.5 text-arka transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* ── Right: isometric assembling tower ── */}
          <div className="lg:col-span-6 min-w-0">
            <div className="relative mx-auto w-[300px] h-[320px]" aria-hidden="true">
              {BLOCKS.map((b) => {
                const show = b.minTier <= tier;
                const highlight = b.minTier === tier; // the blocks this tier adds
                return (
                  <AnimatePresence key={b.label}>
                    {show && (
                      <motion.div
                        key={b.label}
                        initial={reduce ? false : { opacity: 0, y: 44, scale: 0.7 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 44, scale: 0.7 }}
                        transition={{ duration: reduce ? 0 : 0.55, ease: EASE, delay: reduce ? 0 : (b.minTier === tier ? (b.pos.top < 150 ? 0.08 : 0) : 0) }}
                        className="absolute"
                        style={{ left: b.pos.left, top: b.pos.top }}
                      >
                        <IsoTile Icon={b.icon} highlight={highlight} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              })}
            </div>

            {/* included disciplines list, animated per tier */}
            <div className="mt-2 max-w-xs mx-auto">
              <div className="text-[11px] uppercase tracking-wide text-cream/40 font-semibold mb-3 text-center">
                {visible.length} van 6 disciplines
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <AnimatePresence mode="popLayout">
                  {visible.map((b) => (
                    <motion.span
                      key={b.label}
                      layout
                      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream/[0.06] ring-1 ring-cream/10 text-[12px] text-cream/80"
                    >
                      <Check className="w-3 h-3 text-arka" strokeWidth={2.5} />
                      {locale === "en" ? b.label_en : b.label}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

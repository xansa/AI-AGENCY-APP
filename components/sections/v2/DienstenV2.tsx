"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";
import { useTranslation, l } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  Globe,
  Search,
  Bot,
  BarChart3,
  Target,
  Palette,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Gecombineerde diensten-sectie (vervangt ServicesV2 + ShowcaseV2 + de losse
// AI-assistent-sectie). Links een verticale rij-lijst (patroon uit PackagesShowcaseV2),
// rechts een crossfade-panel met de illustratie + copy + CTA van de selectie.
// AI-assistent is item 0 en auto-selected: de differentiator staat vooraan.

const iconMap: Record<string, LucideIcon> = {
  "websites-webshops": Globe,
  "seo-content": Search,
  "ai-chatbots-automatisering": Bot,
  "dashboards-data": BarChart3,
  "lead-generation": Target,
  "branding-design": Palette,
};

export function DienstenV2() {
  const { locale } = useTranslation();
  const reduce = useReducedMotion();
  const [sel, setSel] = useState(0);

  const aiItem = {
    slug: "ai-assistent",
    Icon: Sparkles,
    title: "AI-assistent",
    tagline: locale === "nl" ? "Een digitale medewerker, 24/7" : "A digital employee, 24/7",
    body:
      locale === "nl"
        ? "Iedereen bouwt tegenwoordig een website. Wij gaan verder: een AI-assistent die je inbox, agenda, research en klantcontact 24/7 overneemt. Het werk van meerdere mensen, voor de prijs van één maandsalaris."
        : "Everyone builds a website these days. We go further: an AI assistant that takes over your inbox, calendar, research and customer contact 24/7. The work of several people, for the price of one salary.",
    img: "/illustrations/ai-assistent-home.png",
    href: "/ai-assistent",
    cta: locale === "nl" ? "Ontdek de AI-assistent" : "Discover the AI assistant",
    featured: true,
  };

  const serviceItems = services.map((s) => ({
    slug: s.slug,
    Icon: iconMap[s.slug] ?? Globe,
    title: l(s, "title", locale),
    tagline: l(s, "tagline", locale),
    body: l(s, "description", locale),
    img: `/illustrations/${s.slug}.png`,
    href: `/diensten/${s.slug}`,
    cta: locale === "nl" ? "Meer bekijken" : "Learn more",
    featured: false,
  }));

  const items = [aiItem, ...serviceItems];
  const active = items[sel];

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.65, ease: EASE, delay },
  });

  return (
    <section className="relative bg-cream py-24 md:py-32 overflow-hidden">
      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div {...reveal(0)} className="max-w-2xl mb-12 md:mb-16">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            Wat we doen
          </p>
          <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight leading-[1.06] text-balance">
            Alles onder één dak. <em className="italic text-arka">Eén</em> aanspreekpunt.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ── Links: rij-lijst ── */}
          <motion.div {...reveal(0.05)} className="lg:col-span-6 min-w-0 space-y-2.5">
            {items.map((it, i) => {
              const on = i === sel;
              const Icon = it.Icon;
              return (
                <button
                  key={it.slug}
                  onClick={() => setSel(i)}
                  aria-pressed={on}
                  className={cn(
                    "w-full text-left rounded-2xl p-4 md:p-[18px] ring-1 transition-all duration-300 flex items-center gap-4",
                    on
                      ? "bg-white ring-arka/40 shadow-[0_20px_50px_-32px_rgba(11,18,32,0.35)]"
                      : "bg-white/50 ring-slate-950/8 hover:ring-slate-950/20 hover:bg-white/80",
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center w-11 h-11 rounded-xl shrink-0 transition-colors",
                      on ? "bg-arka/10" : "bg-slate-950/5",
                    )}
                  >
                    <Icon
                      className={cn("w-5 h-5", on ? "text-arka" : "text-slate-ink")}
                      strokeWidth={1.75}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold text-slate-ink truncate">
                        {it.title}
                      </span>
                      {it.featured && (
                        <span className="text-[9.5px] font-semibold uppercase tracking-wider text-arka bg-arka/10 rounded-full px-2 py-0.5 shrink-0">
                          Uitgelicht
                        </span>
                      )}
                    </div>
                    <div className="text-[13px] text-slate-meta truncate">{it.tagline}</div>
                  </div>
                  <ArrowUpRight
                    className={cn(
                      "w-4 h-4 shrink-0 transition-all",
                      on ? "text-arka opacity-100" : "text-slate-meta opacity-0",
                    )}
                  />
                </button>
              );
            })}
          </motion.div>

          {/* ── Rechts: crossfade-panel ── */}
          <motion.div {...reveal(0.12)} className="lg:col-span-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="lg:pl-4"
              >
                <div className="relative mx-auto w-[58%] sm:w-[46%] lg:w-[76%] max-w-[380px] aspect-[4/5]">
                  <Image
                    src={active.img}
                    alt={active.title}
                    fill
                    sizes="(max-width: 1024px) 46vw, 380px"
                    className="object-contain"
                  />
                </div>
                <div className="mt-6 lg:mt-8 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                  <h3 className="font-serif text-[1.5rem] md:text-[1.75rem] font-medium text-slate-ink tracking-tight">
                    {active.title}
                  </h3>
                  <p className="mt-3 text-slate-muted text-[15.5px] leading-relaxed text-pretty">
                    {active.body}
                  </p>
                  <Link
                    href={active.href}
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-arka text-white text-[13.5px] font-semibold hover:bg-arka-hover transition-colors"
                  >
                    {active.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

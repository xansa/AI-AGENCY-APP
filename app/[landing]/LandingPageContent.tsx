"use client";

import type { LandingPage } from "@/content/landing-pages";
import Link from "next/link";
import { MapPin, Check, ArrowUpRight } from "lucide-react";
import { useTranslation, l } from "@/lib/i18n";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min";

const CITY_MAP: Record<string, string> = {
  dordrecht: "Dordrecht",
  drechtsteden: "Drechtsteden",
  rotterdam: "Rotterdam",
  amsterdam: "Amsterdam",
  "den-haag": "Den Haag",
  utrecht: "Utrecht",
  eindhoven: "Eindhoven",
  breda: "Breda",
  tilburg: "Tilburg",
  arnhem: "Arnhem",
  leiden: "Leiden",
  groningen: "Groningen",
};

function extractCity(slug: string): string {
  const parts = slug.split("-");
  const lastTwo = parts.slice(-2).join("-");
  if (CITY_MAP[lastTwo]) return CITY_MAP[lastTwo];
  const last = parts[parts.length - 1];
  return CITY_MAP[last] ?? "Dordrecht";
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-slate-ink font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function LandingPageContent({ page }: { page: LandingPage }) {
  const { t, locale } = useTranslation();

  const body = l(page, "body", locale);
  const cta = l(page, "cta", locale);

  return (
    <>
      {/* Editorial hero */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-8 inline-flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-arka" />
            {extractCity(page.slug)}
          </p>
          <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] max-w-4xl text-balance">
            {l(page, "h1", locale)}
          </h1>
          <p className="mt-8 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-2xl text-pretty">
            {l(page, "subtitle", locale)}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/offerte"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-ink-light transition-colors"
            >
              {t("packages.offerteAanvragen")}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent text-slate-ink ring-1 ring-slate-950/15 text-sm font-semibold hover:bg-slate-950/5 transition-colors"
            >
              {cta}
            </a>
          </div>
        </div>
      </section>

      {/* Body content */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="max-w-narrow mx-auto px-6 sm:px-8 lg:px-10">
          {body.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h2
                  key={i}
                  className="font-serif text-[1.75rem] md:text-[2rem] leading-tight font-medium text-slate-ink mt-12 mb-4 tracking-tight"
                >
                  {paragraph.replace(/\*\*/g, "")}
                </h2>
              );
            }
            if (paragraph.startsWith("\u2022 ") || paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="space-y-3 my-6">
                  {paragraph.split("\n").map((line, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-[15.5px] leading-relaxed text-slate-muted min-w-0"
                    >
                      <Check className="w-4 h-4 text-arka flex-shrink-0 mt-1" strokeWidth={2.25} />
                      <span className="break-words">
                        <RichText text={line.replace(/^[\u2022\-] /, "")} />
                      </span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-[15.5px] leading-[1.75] text-slate-muted mb-5 text-pretty">
                <RichText text={paragraph} />
              </p>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-ink text-cream py-24 md:py-32">
        <div className="absolute inset-0 canvas-grid opacity-[0.035] pointer-events-none" />
        <div className="relative max-w-narrow mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="font-serif font-medium text-h1 text-cream tracking-tight leading-[1.05] text-balance">
            {locale === "nl" ? "Klaar om te starten?" : "Ready to get started?"}
          </h2>
          <p className="mt-6 text-cream/60 text-[17px] leading-relaxed max-w-xl mx-auto text-pretty">
            {locale === "nl"
              ? "Plan een gratis kennismakingsgesprek of vraag direct een offerte aan. Reactie binnen 24 uur."
              : "Schedule a free introductory meeting or request a quote directly. Response within 24 hours."}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/offerte"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-arka text-white text-sm font-semibold hover:bg-arka-hover transition-colors"
            >
              {t("packages.offerteAanvragen")}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent text-cream ring-1 ring-cream/20 text-sm font-semibold hover:bg-cream/5 transition-colors"
            >
              {cta}
            </a>
          </div>
          <p className="text-cream/40 text-[12.5px] mt-8">
            info@arkadigital.nl &middot; +31 6 46140986
          </p>
        </div>
      </section>
    </>
  );
}

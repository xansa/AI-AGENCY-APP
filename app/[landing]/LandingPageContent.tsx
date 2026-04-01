"use client";

import type { LandingPage } from "@/content/landing-pages";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Check, ArrowRight } from "lucide-react";
import { useTranslation, l } from "@/lib/i18n";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min";

function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="text-dark-800">{part}</strong> : <span key={i}>{part}</span>
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
      {/* Hero */}
      <section className="bg-dark-950 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="brand" className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4">
            <MapPin className="w-3.5 h-3.5 mr-1.5" />
            Dordrecht &middot; Drechtsteden
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {l(page, "h1", locale)}
          </h1>
          <p className="text-dark-400 max-w-2xl leading-relaxed text-lg mb-8">
            {l(page, "subtitle", locale)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/offerte" size="lg">
              {t("packages.offerteAanvragen")}
            </Button>
            <Button href={CALENDLY_URL} external size="lg" variant="outline" className="border-dark-600 text-white hover:bg-dark-800">
              {cta}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Body content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {body.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h2 key={i} className="text-2xl font-bold text-dark-900 mt-12 mb-4">
                  {paragraph.replace(/\*\*/g, "")}
                </h2>
              );
            }
            if (paragraph.startsWith("\u2022 ") || paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="space-y-3 my-6">
                  {paragraph.split("\n").map((line, j) => (
                    <li key={j} className="flex items-start gap-3 text-dark-600">
                      <Check className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                      <span><RichText text={line.replace(/^[\u2022\-] /, "")} /></span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith("Dit omvat:") || paragraph.startsWith("This includes:")) {
              return <p key={i} className="text-dark-600 leading-relaxed mb-2"><RichText text={paragraph} /></p>;
            }
            return (
              <p key={i} className="text-dark-600 leading-relaxed mb-4">
                <RichText text={paragraph} />
              </p>
            );
          })}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {locale === "nl" ? "Klaar om te starten?" : "Ready to get started?"}
          </h2>
          <p className="text-brand-200 mb-8 text-lg">
            {locale === "nl"
              ? "Plan een gratis kennismakingsgesprek of vraag direct een offerte aan. Reactie binnen 24 uur."
              : "Schedule a free introductory meeting or request a quote directly. Response within 24 hours."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/offerte" size="lg" className="bg-white text-brand-700 hover:bg-brand-50 border-white">
              {t("packages.offerteAanvragen")}
            </Button>
            <Button
              href={CALENDLY_URL}
              external
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
            >
              {cta}
            </Button>
          </div>
          <p className="text-brand-300 text-sm mt-6">
            info@arkadigital.nl &middot; +31 6 46140986
          </p>
        </div>
      </section>
    </>
  );
}

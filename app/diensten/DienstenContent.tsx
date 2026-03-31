"use client";

import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ArrowRight, Globe, Search, Bot, BarChart3, Target, Palette, Zap } from "lucide-react";
import { useTranslation, l } from "@/lib/i18n";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Search, Bot, BarChart3, Target, Palette,
};

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min";

export function DienstenContent() {
  const { t, locale } = useTranslation();

  return (
    <>
      <section className="bg-dark-950 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="brand" className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4">
            {t("dienstenPage.badge")}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white max-w-2xl">
            {t("dienstenPage.heading")}
          </h1>
          <p className="mt-4 text-dark-400 max-w-xl leading-relaxed">
            {t("dienstenPage.description")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon] ?? Zap;
              return (
                <Link
                  key={service.slug}
                  href={`/diensten/${service.slug}`}
                  className="group block p-8 rounded-2xl border border-dark-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-brand-50 group-hover:bg-brand-100 rounded-xl flex items-center justify-center mb-6 transition-colors">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h2 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {l(service, "title", locale)}
                  </h2>
                  <p className="text-dark-500 text-sm mb-4">{l(service, "tagline", locale)}</p>
                  <p className="text-dark-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {l(service, "description", locale)}
                  </p>
                  <div className="flex items-center text-brand-600 text-sm font-medium">
                    {t("dienstenPage.meerLezen")}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-dark-900 mb-4">
            {t("dienstenPage.ctaHeading")}
          </h2>
          <p className="text-dark-500 mb-8">
            {t("dienstenPage.ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/offerte" size="lg">{t("packages.offerteAanvragen")}</Button>
            <Button href={CALENDLY_URL} external size="lg" variant="outline">
              {t("dienstenPage.planKennismaking")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

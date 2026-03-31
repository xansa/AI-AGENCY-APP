"use client";

import type { Service } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, ArrowLeft } from "lucide-react";
import { useTranslation, l, la } from "@/lib/i18n";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min";

export function DienstDetailContent({ service }: { service: Service }) {
  const { t, locale } = useTranslation();

  return (
    <>
      <section className="bg-dark-950 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/diensten" className="inline-flex items-center gap-2 text-dark-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("dienstDetail.terug")}
          </a>
          <Badge variant="brand" className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4 mt-4">
            {l(service, "title", locale)}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {l(service, "tagline", locale)}
          </h1>
          <p className="text-dark-400 max-w-2xl leading-relaxed">{l(service, "description", locale)}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-dark-900 mb-6">{t("dienstDetail.watJeKrijgt")}</h2>
                <ul className="space-y-3">
                  {la(service, "deliverables", locale).map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                      <span className="text-dark-700">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-dark-900 mb-6">{t("dienstDetail.watJeKuntVerwachten")}</h2>
                <ul className="space-y-3">
                  {la(service, "results", locale).map((r, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-brand-50 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                      <span className="text-dark-700">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-dark-100 bg-dark-50">
                <h3 className="font-bold text-dark-900 mb-3">{t("dienstDetail.voorWie")}</h3>
                <p className="text-dark-600 text-sm leading-relaxed">{l(service, "forWho", locale)}</p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-600 text-white">
                <h3 className="font-bold mb-3">{t("dienstDetail.interesse")}</h3>
                <p className="text-brand-200 text-sm mb-6">{t("dienstDetail.interesseDesc")}</p>
                <div className="space-y-3">
                  <Button href="/offerte" size="sm" className="w-full bg-white text-brand-700 hover:bg-brand-50 border-white">
                    {t("packages.offerteAanvragen")}
                  </Button>
                  <Button
                    href={CALENDLY_URL}
                    external
                    size="sm"
                    variant="outline"
                    className="w-full border-white/40 text-white hover:bg-white/10"
                  >
                    {t("dienstDetail.planIntake")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

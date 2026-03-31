"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MessageCircle, Layers, Target, Shield, Handshake } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min";

export function OverOnsContent() {
  const { t } = useTranslation();

  const principles = [
    { titleKey: "overOns.p1.title" as const, descKey: "overOns.p1.desc" as const, icon: MessageCircle },
    { titleKey: "overOns.p2.title" as const, descKey: "overOns.p2.desc" as const, icon: Layers },
    { titleKey: "overOns.p3.title" as const, descKey: "overOns.p3.desc" as const, icon: Target },
    { titleKey: "overOns.p4.title" as const, descKey: "overOns.p4.desc" as const, icon: Shield },
    { titleKey: "overOns.p5.title" as const, descKey: "overOns.p5.desc" as const, icon: Handshake },
  ];

  return (
    <>
      <section className="bg-dark-950 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="brand" className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4">
            {t("overOns.badge")}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl">
            {t("overOns.heading")}
          </h1>
          <p className="text-dark-400 max-w-2xl leading-relaxed text-lg">
            {t("overOns.description")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-dark-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative mx-auto w-44 h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden ring-2 ring-white/10">
              <Image
                src="/founder.png"
                alt="Kaan, oprichter van Arka"
                width={768}
                height={512}
                className="w-full h-full object-cover object-[55%_15%]"
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">{t("overOns.heyKaan")}</h2>
              <div className="space-y-4 text-dark-400 leading-relaxed">
                <p>{t("overOns.kaanDesc1")}</p>
                <p>{t("overOns.kaanDesc2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-dark-900 mb-4">{t("overOns.waaromArka")}</h2>
              <div className="space-y-4 text-dark-600 leading-relaxed">
                <p>{t("overOns.waaromDesc1")}</p>
                <p>{t("overOns.waaromDesc2")}</p>
                <p>{t("overOns.waaromDesc3")}</p>
              </div>
            </div>

            <div className="p-8 bg-dark-50 rounded-2xl h-fit">
              <h3 className="font-bold text-dark-900 mb-6">{t("overOns.hoeArkaWerkt")}</h3>
              <div className="space-y-4 text-sm text-dark-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-600 font-bold text-xs">1</span>
                  </div>
                  <p><strong className="text-dark-900">{t("overOns.stap1Title")}</strong> &middot; {t("overOns.stap1Desc")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-600 font-bold text-xs">2</span>
                  </div>
                  <p><strong className="text-dark-900">{t("overOns.stap2Title")}</strong> &middot; {t("overOns.stap2Desc")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-600 font-bold text-xs">3</span>
                  </div>
                  <p><strong className="text-dark-900">{t("overOns.stap3Title")}</strong> &middot; {t("overOns.stap3Desc")}</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-dark-900 mb-8">{t("overOns.principes")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.slice(0, 3).map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="p-6 rounded-2xl border border-dark-100">
                  <Icon className="w-5 h-5 text-brand-500 mb-3" />
                  <h3 className="font-bold text-dark-900 mb-2">{t(p.titleKey)}</h3>
                  <p className="text-dark-500 text-sm">{t(p.descKey)}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center md:max-w-[calc(66.666%+0.75rem)] md:mx-auto">
            {principles.slice(3).map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i + 3} className="flex-1 p-6 rounded-2xl border border-dark-100">
                  <Icon className="w-5 h-5 text-brand-500 mb-3" />
                  <h3 className="font-bold text-dark-900 mb-2">{t(p.titleKey)}</h3>
                  <p className="text-dark-500 text-sm">{t(p.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t("overOns.ctaHeading")}</h2>
          <p className="text-brand-200 mb-8">{t("overOns.ctaDescription")}</p>
          <Button
            href={CALENDLY_URL}
            external
            size="lg"
            className="bg-white text-brand-700 hover:bg-brand-50 border-white"
          >
            {t("overOns.gesprekPlannen")}
          </Button>
        </div>
      </section>
    </>
  );
}

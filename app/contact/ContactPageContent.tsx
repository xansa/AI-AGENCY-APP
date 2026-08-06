"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { HeroAura } from "@/components/ui/HeroAura";

export function ContactPageContent() {
  const { t, locale } = useTranslation();

  return (
    <>
      <section className="relative bg-cream pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <HeroAura />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <div className="lg:col-span-7 min-w-0">
              <p className="text-overline uppercase text-slate-meta font-semibold mb-8">
                <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                {t("contact.badge")}
              </p>
              <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] text-balance">
                {t("contact.heading")}
              </h1>
              <p className="mt-6 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-xl text-pretty">
                {t("contact.description")}
              </p>
            </div>
            <div className="lg:col-span-5 relative order-first lg:order-last">
              <div className="relative mx-auto w-full max-w-[320px] lg:max-w-[380px] aspect-square">
                <Image
                  src="/illustrations/contact.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 320px, 380px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-cream pb-24 md:pb-32">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4.5 h-4.5 text-slate-ink" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-meta mb-1">Email</p>
                <a href="mailto:info@arkadigital.nl" className="text-[15px] font-semibold text-slate-ink hover:text-arka transition-colors">
                  info@arkadigital.nl
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4.5 h-4.5 text-slate-ink" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-meta mb-1">
                  {locale === "nl" ? "Telefoon" : "Phone"}
                </p>
                <a href="tel:+31646140986" className="text-[15px] font-semibold text-slate-ink hover:text-arka transition-colors">
                  +31 6 46140986
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4.5 h-4.5 text-slate-ink" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-meta mb-1">
                  {locale === "nl" ? "Locatie" : "Location"}
                </p>
                <p className="text-[15px] font-semibold text-slate-ink">Dordrecht, Nederland</p>
                <p className="text-[12.5px] text-slate-meta mt-0.5">KVK 42000761</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

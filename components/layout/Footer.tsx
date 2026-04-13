"use client";

import { useTranslation } from "@/lib/i18n";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    [t("footer.diensten")]: [
      { href: "/diensten/websites-webshops", label: "Websites & Webshops" },
      { href: "/diensten/seo-content", label: "SEO & Content" },
      { href: "/diensten/ai-chatbots-automatisering", label: "AI Chatbots & Automatisering" },
      { href: "/diensten/dashboards-data", label: "Dashboards & Data" },
      { href: "/diensten/lead-generation", label: "Lead Generation" },
      { href: "/diensten/branding-design", label: "Branding & Design" },
    ],
    [t("footer.bedrijf")]: [
      { href: "/over-ons", label: t("footer.overOns") },
      { href: "/cases", label: "Cases" },
      { href: "/packages", label: "Packages" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/offerte", label: t("footer.offerte") },
    ],
  };

  return (
    <footer className="relative bg-ink text-cream/70 overflow-hidden">
      <div className="absolute inset-0 canvas-grid opacity-[0.035] pointer-events-none" />

      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10 pt-24 pb-12">
        {/* Editorial closing statement */}
        <div className="mb-16 max-w-2xl">
          <p className="text-overline uppercase text-cream/40 mb-5">
            <span className="inline-block w-6 border-t border-cream/30 mr-3 align-middle" />
            Laten we praten
          </p>
          <h2 className="font-serif text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05] text-cream font-medium tracking-tight">
            Klaar om te bouwen wat je al lang <em className="italic text-cream/80">uitstelt</em>?
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-arka text-white text-sm font-semibold hover:bg-arka-hover transition-colors"
            >
              Plan kennismaking
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent text-cream ring-1 ring-cream/20 text-sm font-semibold hover:bg-cream/5 transition-colors"
            >
              Bekijk werk
            </Link>
          </div>
        </div>

        <div className="hairline border-cream/10 pt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-[10px] overflow-hidden flex-shrink-0">
                <svg viewBox="0 0 512 512" className="w-8 h-8">
                  <rect width="512" height="512" rx="112" fill="#0F172A" />
                  <path d="M256 80 L390 400 H310 L256 240 L202 400 H122 Z" fill="#3B82F6" />
                  <path d="M256 300 L214 400 H298 Z" fill="#0F172A" />
                </svg>
              </div>
              <span className="arka-wordmark text-lg text-cream">
                Arka<span className="text-arka">.</span>
              </span>
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.tagline")}
            </p>
            <div className="space-y-2.5 text-sm">
              <a href="mailto:info@arkadigital.nl" className="flex items-center gap-2.5 text-cream/70 hover:text-cream transition-colors">
                <Mail className="w-4 h-4 text-arka flex-shrink-0" />
                info@arkadigital.nl
              </a>
              <a href="tel:+31646140986" className="flex items-center gap-2.5 text-cream/70 hover:text-cream transition-colors">
                <Phone className="w-4 h-4 text-arka flex-shrink-0" />
                +31 6 46140986
              </a>
              <div className="flex items-center gap-2.5 text-cream/70">
                <MapPin className="w-4 h-4 text-arka flex-shrink-0" />
                <span>Dordrecht, Nederland</span>
              </div>
              <a
                href="https://www.linkedin.com/company/arka-nl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-cream/70 hover:text-cream transition-colors"
              >
                <Linkedin className="w-4 h-4 text-arka flex-shrink-0" />
                LinkedIn
              </a>
              <div className="pt-3 space-y-1">
                <p className="text-[11px] text-cream/35 tracking-wide">KVK 42000761 &middot; BTW NL005424960B92</p>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="min-w-0">
              <h3 className="text-overline uppercase text-cream/40 mb-5">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/70 hover:text-cream transition-colors break-words"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cream/10 mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-cream/40">
          <p>&copy; {currentYear} Arka &middot; Dordrecht, Nederland</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-cream/70 transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/algemene-voorwaarden" className="hover:text-cream/70 transition-colors">
              {t("footer.voorwaarden")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

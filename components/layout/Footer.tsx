"use client";

import { useTranslation } from "@/lib/i18n";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
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
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                <svg viewBox="0 0 512 512" className="w-8 h-8">
                  <rect width="512" height="512" rx="112" fill="#0F172A"/>
                  <path d="M256 80 L390 400 H310 L256 240 L202 400 H122 Z" fill="#3B82F6"/>
                  <path d="M256 300 L214 400 H298 Z" fill="#0F172A"/>
                </svg>
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Arka<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.tagline")}
            </p>
            <div className="space-y-2.5 text-sm">
              <a href="mailto:info@arkadigital.nl" className="flex items-center gap-2.5 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-accent group-hover:text-accent-light flex-shrink-0" />
                info@arkadigital.nl
              </a>
              <a href="tel:+31646140986" className="flex items-center gap-2.5 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-accent group-hover:text-accent-light flex-shrink-0" />
                +31 6 46140986
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Dordrecht, Nederland</span>
              </div>
              <a href="https://www.linkedin.com/company/arka-nl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white transition-colors group">
                <Linkedin className="w-4 h-4 text-accent group-hover:text-accent-light flex-shrink-0" />
                LinkedIn
              </a>
              <div className="pt-2 space-y-1">
                <p className="text-xs text-slate-600">KVK: 42000761</p>
                <p className="text-xs text-slate-600">BTW: NL005424960B92</p>
              </div>
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>
            &copy; {currentYear} Arka &middot; Dordrecht, Nederland
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/algemene-voorwaarden" className="hover:text-slate-300 transition-colors">
              {t("footer.voorwaarden")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

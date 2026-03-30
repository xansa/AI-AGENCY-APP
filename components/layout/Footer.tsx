"use client";

import { useTranslation } from "@/lib/i18n";
import { Zap, Mail, Phone, MapPin } from "lucide-react";
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
    <footer className="bg-dark-950 text-dark-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Arka<span className="text-brand-500">.</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.tagline")}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500" />
                <a href="mailto:info@arkadigital.nl" className="hover:text-white transition-colors">
                  info@arkadigital.nl
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-500" />
                <a href="tel:+31646140986" className="hover:text-white transition-colors">
                  +31 6 46140986
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>Dordrecht, Nederland</span>
              </div>
              <p className="text-xs text-dark-500 mt-3">KVK: 42000761</p>
              <p className="text-xs text-dark-500">BTW: NL005424960B92</p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-2">
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

        <div className="border-t border-dark-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>
            &copy; {currentYear} Arka &middot; Dordrecht, Nederland
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/algemene-voorwaarden" className="hover:text-white transition-colors">
              {t("footer.voorwaarden")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

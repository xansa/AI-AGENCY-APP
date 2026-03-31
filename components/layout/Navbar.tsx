"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useLanguage, useTranslation, type TranslationKey } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks: { href: string; key: TranslationKey }[] = [
  { href: "/diensten", key: "nav.diensten" },
  { href: "/packages", key: "nav.packages" },
  { href: "/cases", key: "nav.cases" },
  { href: "/blog", key: "nav.blog" },
  { href: "/over-ons", key: "nav.overOns" },
  { href: "/faq", key: "nav.faq" },
  { href: "/contact", key: "nav.contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();
  const { locale, setLocale } = useLanguage();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-dark-100 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center group-hover:opacity-90 transition-opacity overflow-hidden">
                <svg viewBox="0 0 512 512" className="w-8 h-8">
                  <rect width="512" height="512" rx="112" fill="#0F172A"/>
                  <path d="M256 80 L390 400 H310 L256 240 L202 400 H122 Z" fill="#3B82F6"/>
                  <path d="M256 300 L214 400 H298 Z" fill="#0F172A"/>
                </svg>
              </div>
              <span className={cn(
                "font-bold text-lg tracking-tight transition-colors",
                scrolled ? "text-dark-900" : "text-white"
              )}>
                Arka<span className="text-brand-600">.</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? scrolled ? "text-brand-600 bg-brand-50" : "text-white bg-white/10"
                      : scrolled ? "text-dark-600 hover:text-dark-900 hover:bg-dark-50" : "text-dark-300 hover:text-white hover:bg-white/10"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            {/* Language toggle + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center text-sm font-medium">
                <button
                  onClick={() => setLocale("nl")}
                  className={cn(
                    "px-1.5 py-1 rounded transition-colors",
                    locale === "nl"
                      ? scrolled ? "text-brand-600" : "text-white"
                      : scrolled ? "text-dark-400 hover:text-dark-600" : "text-dark-500 hover:text-dark-300"
                  )}
                >
                  NL
                </button>
                <span className={cn("text-xs", scrolled ? "text-dark-300" : "text-dark-600")}>|</span>
                <button
                  onClick={() => setLocale("en")}
                  className={cn(
                    "px-1.5 py-1 rounded transition-colors",
                    locale === "en"
                      ? scrolled ? "text-brand-600" : "text-white"
                      : scrolled ? "text-dark-400 hover:text-dark-600" : "text-dark-500 hover:text-dark-300"
                  )}
                >
                  EN
                </button>
              </div>
              <Button href="/offerte" size="md" variant="primary">
                {t("nav.offerte")}
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                scrolled ? "text-dark-600 hover:text-dark-900 hover:bg-dark-50" : "text-dark-300 hover:text-white hover:bg-white/10"
              )}
              aria-label={t("nav.menuOpen")}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-16 lg:hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {/* Mobile language toggle */}
              <div className="flex items-center gap-2 px-4 py-2 mb-2">
                <button
                  onClick={() => setLocale("nl")}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                    locale === "nl" ? "bg-brand-50 text-brand-600" : "text-dark-500 hover:text-dark-700"
                  )}
                >
                  NL
                </button>
                <button
                  onClick={() => setLocale("en")}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                    locale === "en" ? "bg-brand-50 text-brand-600" : "text-dark-500 hover:text-dark-700"
                  )}
                >
                  EN
                </button>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-xl transition-colors",
                    pathname === link.href
                      ? "text-brand-600 bg-brand-50"
                      : "text-dark-700 hover:text-dark-900 hover:bg-dark-50"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="pt-4">
                <Button href="/offerte" size="lg" className="w-full">
                  {t("nav.offerte")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

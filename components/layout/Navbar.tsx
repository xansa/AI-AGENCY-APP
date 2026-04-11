"use client";

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
  { href: "/contact", key: "nav.contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();
  const { locale, setLocale } = useLanguage();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed z-50 transition-all duration-300",
          "top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4",
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-content rounded-2xl transition-all duration-300",
            "backdrop-blur-xl",
            scrolled
              ? "bg-cream/85 ring-1 ring-slate-950/8 shadow-[0_1px_0_0_rgba(15,23,42,0.04),0_12px_32px_-18px_rgba(15,23,42,0.18)]"
              : "bg-cream/60 ring-1 ring-slate-950/5"
          )}
        >
          <div className="px-4 sm:px-5 lg:px-6">
            <div className="flex items-center justify-between h-14 lg:h-16">
              {/* Logo - NEVER TOUCH per feedback_never_touch_logo */}
              <Link href="/" className="flex items-center gap-2.5 group" aria-label="Arka home">
                <div className="w-8 h-8 rounded-[10px] overflow-hidden flex-shrink-0">
                  <svg viewBox="0 0 512 512" className="w-8 h-8">
                    <rect width="512" height="512" rx="112" fill="#0F172A" />
                    <path d="M256 80 L390 400 H310 L256 240 L202 400 H122 Z" fill="#3B82F6" />
                    <path d="M256 300 L214 400 H298 Z" fill="#0F172A" />
                  </svg>
                </div>
                <span className="arka-wordmark text-lg text-slate-ink">
                  Arka<span className="text-arka">.</span>
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-0.5">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "px-3.5 py-2 text-[13.5px] font-medium rounded-full transition-colors duration-200",
                        active
                          ? "text-slate-ink bg-slate-950/8"
                          : "text-slate-muted hover:text-slate-ink hover:bg-slate-950/5"
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  );
                })}
              </nav>

              {/* Language toggle + CTA */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex items-center text-[12px] font-semibold tracking-wide">
                  <button
                    onClick={() => setLocale("nl")}
                    className={cn(
                      "px-2 py-1 rounded transition-colors",
                      locale === "nl" ? "text-slate-ink" : "text-slate-meta hover:text-slate-muted"
                    )}
                  >
                    NL
                  </button>
                  <span className="text-slate-meta/50 select-none">/</span>
                  <button
                    onClick={() => setLocale("en")}
                    className={cn(
                      "px-2 py-1 rounded transition-colors",
                      locale === "en" ? "text-slate-ink" : "text-slate-meta hover:text-slate-muted"
                    )}
                  >
                    EN
                  </button>
                </div>

                <Link
                  href="/offerte"
                  className="inline-flex items-center px-5 py-2 rounded-full text-[13.5px] font-semibold bg-ink text-cream hover:bg-ink-light transition-colors"
                >
                  {t("nav.offerte")}
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-muted hover:text-slate-ink hover:bg-slate-950/5 transition-colors"
                aria-label={t("nav.menuOpen")}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-cream pt-24 lg:hidden"
          >
            <div className="px-6 py-6 space-y-1">
              <div className="flex items-center gap-2 px-2 py-2 mb-4">
                <button
                  onClick={() => setLocale("nl")}
                  className={cn(
                    "px-4 py-1.5 text-sm font-semibold rounded-full transition-colors",
                    locale === "nl" ? "bg-ink text-cream" : "text-slate-muted hover:text-slate-ink"
                  )}
                >
                  NL
                </button>
                <button
                  onClick={() => setLocale("en")}
                  className={cn(
                    "px-4 py-1.5 text-sm font-semibold rounded-full transition-colors",
                    locale === "en" ? "bg-ink text-cream" : "text-slate-muted hover:text-slate-ink"
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
                    "block px-4 py-4 text-xl font-serif rounded-2xl transition-colors",
                    pathname === link.href
                      ? "text-slate-ink bg-slate-950/5"
                      : "text-slate-muted hover:text-slate-ink"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="pt-6 px-2">
                <Link
                  href="/offerte"
                  className="flex items-center justify-center w-full px-6 py-4 rounded-full bg-ink text-cream font-semibold text-base hover:bg-ink-light transition-colors"
                >
                  {t("nav.offerte")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

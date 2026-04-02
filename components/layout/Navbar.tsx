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
  const [isHeroSection, setIsHeroSection] = useState(true);
  const pathname = usePathname();
  const { t } = useTranslation();
  const { locale, setLocale } = useLanguage();

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Hero is dark (~92vh), transition to light after that
      setIsHeroSection(y < window.innerHeight * 0.7);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // On non-homepage pages, always show scrolled (light) state
  const isHomepage = pathname === "/";
  const showDark = isHomepage && isHeroSection && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || !isHomepage
            ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm"
            : isHeroSection && isHomepage
            ? "bg-slate-900/60 backdrop-blur-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                <svg viewBox="0 0 512 512" className="w-8 h-8">
                  <rect width="512" height="512" rx="112" fill="#0F172A"/>
                  <path d="M256 80 L390 400 H310 L256 240 L202 400 H122 Z" fill="#3B82F6"/>
                  <path d="M256 300 L214 400 H298 Z" fill="#0F172A"/>
                </svg>
              </div>
              <span className={cn(
                "font-bold text-lg tracking-tight transition-colors",
                showDark ? "text-white" : "text-slate-900"
              )}>
                Arka<span className="text-accent">.</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? showDark
                        ? "text-white bg-white/10"
                        : "text-accent bg-accent/8"
                      : showDark
                      ? "text-slate-300 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            {/* Language toggle + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language toggle */}
              <div className="flex items-center text-sm font-medium">
                <button
                  onClick={() => setLocale("nl")}
                  className={cn(
                    "px-2 py-1 rounded transition-colors",
                    locale === "nl"
                      ? showDark ? "text-white" : "text-accent font-semibold"
                      : showDark ? "text-slate-400 hover:text-slate-200" : "text-slate-400 hover:text-slate-700"
                  )}
                >
                  NL
                </button>
                <span className={cn("text-xs", showDark ? "text-slate-600" : "text-slate-300")}>|</span>
                <button
                  onClick={() => setLocale("en")}
                  className={cn(
                    "px-2 py-1 rounded transition-colors",
                    locale === "en"
                      ? showDark ? "text-white" : "text-accent font-semibold"
                      : showDark ? "text-slate-400 hover:text-slate-200" : "text-slate-400 hover:text-slate-700"
                  )}
                >
                  EN
                </button>
              </div>

              {/* CTA pill */}
              <Link
                href="/offerte"
                className={cn(
                  "inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                  showDark
                    ? "bg-accent text-white hover:bg-accent-dark shadow-lg shadow-accent/20"
                    : "bg-accent text-white hover:bg-accent-dark shadow-sm"
                )}
              >
                {t("nav.offerte")}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                showDark
                  ? "text-slate-300 hover:text-white hover:bg-white/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
              aria-label={t("nav.menuOpen")}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-16 lg:hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {/* Language toggle */}
              <div className="flex items-center gap-2 px-4 py-2 mb-3">
                <button
                  onClick={() => setLocale("nl")}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
                    locale === "nl" ? "bg-accent/10 text-accent font-semibold" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  NL
                </button>
                <button
                  onClick={() => setLocale("en")}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
                    locale === "en" ? "bg-accent/10 text-accent font-semibold" : "text-slate-500 hover:text-slate-700"
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
                    "block px-4 py-3.5 text-base font-medium rounded-xl transition-colors",
                    pathname === link.href
                      ? "text-accent bg-accent/8"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="pt-4 px-0">
                <Link
                  href="/offerte"
                  className="flex items-center justify-center w-full px-6 py-3.5 rounded-full bg-accent text-white font-semibold text-base hover:bg-accent-dark transition-colors"
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

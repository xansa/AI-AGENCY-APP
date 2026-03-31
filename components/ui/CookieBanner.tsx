"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";

export function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("arka-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("arka-cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("arka-cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
      <div className="max-w-xl mx-auto bg-dark-900 border border-dark-700 rounded-2xl p-5 shadow-2xl">
        <p className="text-sm text-dark-300 leading-relaxed mb-4">
          {t("cookie.message")}{" "}
          <Link href="/privacy" className="underline text-brand-400 hover:text-brand-300">
            {t("cookie.learnMore")}
          </Link>
        </p>
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {t("cookie.accept")}
          </button>
          <button
            onClick={decline}
            className="flex-1 bg-dark-700 hover:bg-dark-600 text-dark-200 text-sm font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {t("cookie.decline")}
          </button>
        </div>
      </div>
    </div>
  );
}

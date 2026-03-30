"use client";

import { useLanguage } from "./LanguageContext";
import { translations, type TranslationKey } from "./translations";

export function useTranslation() {
  const { locale } = useLanguage();

  function t(key: TranslationKey): string {
    const entry = translations[key];
    return entry?.[locale] ?? entry?.nl ?? key;
  }

  return { t, locale };
}

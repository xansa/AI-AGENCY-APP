import type { Locale } from "./LanguageContext";

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Pick the localized string from an object with `field` (NL) and `field_en` keys */
export function l(item: any, field: string, locale: Locale): string {
  if (locale === "en") {
    const en = item[`${field}_en`];
    if (typeof en === "string" && en) return en;
  }
  return item[field] as string;
}

/** Pick the localized string array from an object with `field` (NL) and `field_en` keys */
export function la(item: any, field: string, locale: Locale): string[] {
  if (locale === "en") {
    const en = item[`${field}_en`];
    if (Array.isArray(en) && en.length > 0) return en;
  }
  return item[field] as string[];
}

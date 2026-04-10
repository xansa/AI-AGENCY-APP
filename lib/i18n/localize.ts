import type { Locale } from "./LanguageContext";

/**
 * Pick the localized string from an object with `field` (NL) and `field_en` keys.
 *
 * Uses `keyof T` constraint so TypeScript verifies the base field exists on the item,
 * while using a runtime lookup for the `_en` variant.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function l(item: any, field: string, locale: Locale): string {
  if (locale === "en") {
    const en = item[`${field}_en`];
    if (typeof en === "string" && en) return en;
  }
  return item[field] as string;
}

/**
 * Pick the localized string array from an object with `field` (NL) and `field_en` keys.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function la(item: any, field: string, locale: Locale): string[] {
  if (locale === "en") {
    const en = item[`${field}_en`];
    if (Array.isArray(en) && en.length > 0) return en;
  }
  return item[field] as string[];
}

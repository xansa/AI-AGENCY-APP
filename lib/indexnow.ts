import { getPublishedPosts } from "@/content/blog";
import { services } from "@/content/services";
import { landingPages } from "@/content/landing-pages";

const HOST = "arkadigital.nl";
const KEY = "d68736090a7be1288ebe9f4880d1d74a";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const BASE = `https://${HOST}`;

const STATIC_PATHS = [
  "/",
  "/diensten",
  "/packages",
  "/cases",
  "/blog",
  "/faq",
  "/over-ons",
  "/contact",
  "/offerte",
  "/ai-assistent",
];

/** Bouwt de volledige lijst met canonieke, publiek-geïndexeerde URLs. */
export function buildUrlList(): string[] {
  const urls = new Set<string>();
  for (const p of STATIC_PATHS) urls.add(`${BASE}${p}`);
  for (const s of services) urls.add(`${BASE}/diensten/${s.slug}`);
  for (const p of getPublishedPosts()) urls.add(`${BASE}/blog/${p.slug}`);
  for (const l of landingPages) urls.add(`${BASE}/${l.slug}`);
  return Array.from(urls);
}

/**
 * Meldt URLs aan bij IndexNow (Bing, Yandex, Naver, Seznam).
 * Faalt stil: IndexNow is een aanvulling, nooit een blokkade voor de aanroeper.
 */
export async function pingIndexNow(urlList?: string[]): Promise<{ ok: boolean; count: number; status?: number }> {
  const list = urlList && urlList.length ? urlList : buildUrlList();
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: list,
      }),
    });
    return { ok: res.ok, count: list.length, status: res.status };
  } catch {
    return { ok: false, count: list.length };
  }
}

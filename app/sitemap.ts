import { services } from "@/content/services";
import { getPublishedPosts } from "@/content/blog";
import { landingPages } from "@/content/landing-pages";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkadigital.nl";

  const staticPages = [
    "",
    "/diensten",
    "/packages",
    "/cases",
    "/over-ons",
    "/faq",
    "/contact",
    "/offerte",
    "/blog",
    "/privacy",
    "/algemene-voorwaarden",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/diensten/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = getPublishedPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const landingPageEntries = landingPages.map((lp) => ({
    url: `${baseUrl}/${lp.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...landingPageEntries, ...servicePages, ...blogPages];
}

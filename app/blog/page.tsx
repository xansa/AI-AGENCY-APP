import { Metadata } from "next";
import { getPublishedPosts } from "@/content/blog";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktische inzichten over websites, SEO, AI en digitale groei voor MKB-bedrijven.",
  alternates: { canonical: "https://arkadigital.nl/blog" },
  openGraph: {
    title: "Blog | Arka",
    description: "Praktische inzichten over websites, SEO, AI en digitale groei voor MKB-bedrijven.",
    url: "https://arkadigital.nl/blog",
  },
  twitter: {
    title: "Blog | Arka",
    description: "Praktische inzichten over websites, SEO, AI en digitale groei voor MKB-bedrijven.",
  },
};

export const revalidate = 3600; // revalidate every hour

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://arkadigital.nl" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://arkadigital.nl/blog" },
  ],
};

export default function BlogPage() {
  const blogPosts = getPublishedPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Editorial hero */}
      <section className="relative bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-8">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            Journal
          </p>
          <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] max-w-3xl text-balance">
            Inzichten &amp; <em className="italic">artikelen</em>
          </h1>
          <p className="mt-8 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-xl text-pretty">
            Praktische tips over websites, SEO, AI en digitale groei. Geschreven voor ondernemers, niet voor developers.
          </p>
        </div>
      </section>

      {/* Posts list, editorial stack with hairlines */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="max-w-4xl mx-auto">
            {blogPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group border-t border-slate-950/10 last:border-b py-10 md:py-12 transition-colors hover:bg-cream-deep/40"
              >
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start">
                  <span className="text-[11px] font-mono text-slate-meta md:pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-meta bg-slate-950/5 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-serif text-[1.75rem] md:text-[2rem] leading-[1.1] font-medium text-slate-ink tracking-tight mb-3 break-words group-hover:text-arka transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[14.5px] leading-relaxed text-slate-muted text-pretty line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-[11.5px] text-slate-meta">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("nl-NL", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="hidden md:block w-5 h-5 text-slate-meta group-hover:text-arka group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 md:mt-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

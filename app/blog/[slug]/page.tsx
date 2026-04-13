import { Metadata } from "next";
import { blogPosts, getPublishedPosts } from "@/content/blog";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkadigital.nl";

export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

function renderContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("**") && block.endsWith("**")) {
      return (
        <h2
          key={i}
          className="font-serif text-[1.75rem] md:text-[2rem] leading-tight font-medium text-slate-ink mt-12 mb-4 tracking-tight"
        >
          {block.replace(/\*\*/g, "")}
        </h2>
      );
    }

    const renderInline = (text: string) =>
      text.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={j} className="text-slate-ink font-semibold">
              {part.replace(/\*\*/g, "")}
            </strong>
          );
        }
        return part;
      });

    if (block.startsWith("\u2022")) {
      const items = block.split("\n").filter(Boolean);
      return (
        <ul key={i} className="space-y-2.5 my-5">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-[16px] leading-relaxed text-slate-muted">
              <span className="text-arka mt-2 text-[8px] flex-shrink-0">▸</span>
              <span>{renderInline(item.replace(/^\u2022\s*/, ""))}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="text-[16px] leading-[1.75] text-slate-muted my-5 text-pretty">
        {renderInline(block)}
      </p>
    );
  });
}

export default function BlogPostPage({ params }: Props) {
  const published = getPublishedPosts();
  const post = published.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const wordCount = post.content.split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${baseUrl}/blog/${post.slug}` },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}/brand/cover-dark.png`,
    author: {
      "@type": "Person",
      name: "Kaan Arslan",
      url: `${baseUrl}/over-ons`,
      sameAs: "https://www.linkedin.com/in/kaanarslan",
    },
    publisher: {
      "@type": "Organization",
      name: "Arka",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/brand/logo-icon-dark.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `${baseUrl}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.tags[0] ?? "Digitaal",
    inLanguage: "nl",
    timeRequired: `PT${readingTimeMinutes}M`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Editorial article hero */}
      <section className="relative bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-narrow mx-auto px-6 sm:px-8 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-muted hover:text-slate-ink text-[13px] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar blog
          </Link>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-meta bg-slate-950/5 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-serif font-medium text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] text-slate-ink tracking-tight text-balance">
            {post.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-[12.5px] text-slate-meta">
            <span>{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-slate-meta/60" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString("nl-NL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-meta/60" />
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </section>

      <section className="relative bg-cream py-12 md:py-20">
        <div className="max-w-narrow mx-auto px-6 sm:px-8 lg:px-10">
          <article>{renderContent(post.content)}</article>

          <div className="mt-20 p-8 md:p-10 bg-ink text-cream rounded-2xl">
            <h3 className="font-serif text-[1.5rem] md:text-[1.75rem] font-medium tracking-tight mb-3">
              Hulp nodig met jouw digitale groei?
            </h3>
            <p className="text-cream/60 text-[14.5px] mb-6 text-pretty max-w-md">
              Plan een vrijblijvend kennismakingsgesprek en ontdek wat Arka voor jouw bedrijf kan betekenen.
            </p>
            <Link
              href="/offerte"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-arka text-white text-[13px] font-semibold hover:bg-arka-hover transition-colors"
            >
              Offerte aanvragen
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

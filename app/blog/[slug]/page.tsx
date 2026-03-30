import { Metadata } from "next";
import { blogPosts, getPublishedPosts } from "@/content/blog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkadigital.nl";

export const dynamicParams = true;
export const revalidate = 3600; // revalidate every hour

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
        <h2 key={i} className="text-xl font-bold text-dark-900 mt-8 mb-3">
          {block.replace(/\*\*/g, "")}
        </h2>
      );
    }

    const renderInline = (text: string) =>
      text.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j}>{part.replace(/\*\*/g, "")}</strong>;
        }
        return part;
      });

    if (block.startsWith("\u2022")) {
      const items = block.split("\n").filter(Boolean);
      return (
        <ul key={i} className="space-y-2 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-dark-600">
              <span className="text-brand-500 mt-1">{"\u2022"}</span>
              <span>{renderInline(item.replace(/^\u2022\s*/, ""))}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="text-dark-600 leading-relaxed my-4">
        {renderInline(block)}
      </p>
    );
  });
}

export default function BlogPostPage({ params }: Props) {
  const published = getPublishedPosts();
  const post = published.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Arka",
      url: baseUrl,
    },
    datePublished: post.publishedAt,
    url: `${baseUrl}/blog/${post.slug}`,
    keywords: post.tags,
    inLanguage: "nl",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };

  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-dark-950 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            href="/blog"
            variant="ghost"
            size="sm"
            className="text-dark-400 hover:text-white mb-6 -ml-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar blog
          </Button>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="brand"
                className="bg-brand-900/50 text-brand-300 border-brand-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-dark-400">
            <span>{post.author}</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("nl-NL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article>{renderContent(post.content)}</article>

          <div className="mt-16 p-8 bg-brand-50 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-dark-900 mb-2">
              Hulp nodig met jouw digitale groei?
            </h3>
            <p className="text-dark-500 text-sm mb-4">
              Plan een vrijblijvend kennismakingsgesprek en ontdek wat Arka voor
              jouw bedrijf kan betekenen.
            </p>
            <Button href="/offerte" size="md">
              Offerte aanvragen
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

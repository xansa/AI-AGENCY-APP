import { Metadata } from "next";
import { blogPosts } from "@/content/blog";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktische inzichten over websites, SEO, AI en digitale groei voor MKB-bedrijven.",
};

export default function BlogPage() {
  return (
    <div className="pt-24">
      <section className="bg-dark-950 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge
            variant="brand"
            className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4"
          >
            Blog
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Inzichten &amp; artikelen
          </h1>
          <p className="text-dark-400 leading-relaxed">
            Praktische tips over websites, SEO, AI en digitale groei — geschreven
            voor ondernemers, niet voor developers.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group rounded-2xl border border-dark-100 p-8 hover:border-brand-300 hover:shadow-lg transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-dark-500 text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-dark-400">
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
                  <span className="text-brand-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lees meer <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

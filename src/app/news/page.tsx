"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, ExternalLink, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { Container, PageHero } from "@/components/ui";
import { ARTICLES } from "@/data/news";
import { SafeImage } from "@/components/safe-image";
import { RevealStagger, RevealItem } from "@/components/reveal";

type NewsArticle = {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  source_url: string;
  image_url: string;
  image_source: string;
  license: string;
  published_at: string;
  featured: string;
};

const CATEGORIES = [
  "All Categories",
  "AI / Machine Learning",
  "Quantum Computing",
  "Cybersecurity",
  "AI Governance",
  "Cloud / Infrastructure",
  "Deep Tech Research",
  "Open Source / Developer Technology",
  "Emerging Technology",
];

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [query, setQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin & load news
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dts_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.email && u.email.toLowerCase().includes("admin")) {
          setIsAdmin(true);
        }
      }
    } catch {}

    loadNews();
  }, []);

  async function loadNews() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/news");
      const data = await res.json();

      if (res.ok && data.success && data.data && data.data.length > 0) {
        setArticles(data.data);
      } else {
        // Fallback to initial static articles if sheet is empty
        fallbackToStatic();
      }
    } catch {
      fallbackToStatic();
    } finally {
      setLoading(false);
    }
  }

  function fallbackToStatic() {
    const defaultImages: Record<string, string> = {
      ai: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      quantum: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
      cybersecurity: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      governance: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    };

    const staticItems: NewsArticle[] = ARTICLES.map((a) => ({
      id: a.slug,
      title: a.title,
      summary: a.excerpt,
      category:
        a.domain === "ai"
          ? "AI / Machine Learning"
          : a.domain === "quantum"
          ? "Quantum Computing"
          : a.domain === "cybersecurity"
          ? "Cybersecurity"
          : "AI Governance",
      source: "Deep Tech Research Circle",
      source_url: `/news/${a.slug}`,
      image_url: a.image || defaultImages[a.domain] || defaultImages.ai,
      image_source: "Unsplash",
      license: "Public / Editorial",
      published_at: a.date,
      featured: a.featured ? "true" : "false",
    }));

    setArticles(staticItems);
  }

  async function handleRefreshNews() {
    setRefreshing(true);
    setError("");
    try {
      const res = await fetch("/api/news/refresh", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        await loadNews();
      } else {
        setError(data.error || "Failed to trigger RSS refresh.");
      }
    } catch {
      setError("Network error triggering news refresh.");
    } finally {
      setRefreshing(false);
    }
  }

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat =
        categoryFilter === "All Categories" ||
        a.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (categoryFilter === "AI / Machine Learning" && a.category.toLowerCase().includes("ai")) ||
        (categoryFilter === "Quantum Computing" && a.category.toLowerCase().includes("quantum")) ||
        (categoryFilter === "Cybersecurity" && a.category.toLowerCase().includes("cyber")) ||
        (categoryFilter === "AI Governance" && a.category.toLowerCase().includes("governance"));

      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);

      return matchesCat && matchesQuery;
    });
  }, [articles, categoryFilter, query]);

  const featuredArticle = useMemo(() => {
    return articles.find((a) => a.featured === "true") || articles[0];
  }, [articles]);

  return (
    <>
      <PageHero
        eyebrow="TECHNICAL RESEARCH NEWSLETTER"
        title="Live Deep Tech Research & Analysis Digest."
        description="Curated research dispatches, paper breakdowns, and technical analysis across AI, Quantum, Cybersecurity, and AI Governance."
      />

      <Container className="py-6 sm:py-8 space-y-6">
        {/* Top Control Bar: Search & Admin Manual Refresh */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6 border-border/80">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRefreshNews}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-bold transition-colors border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700 cursor-pointer disabled:opacity-50"
            >
              {refreshing ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
              {refreshing ? "Fetching RSS Feeds..." : "Refresh News"}
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-secondary" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI, Quantum, Space, Cyber..."
              aria-label="Search news briefings"
              className="h-10 w-full rounded-xl border pl-10 pr-4 font-sans text-xs placeholder:text-secondary transition-colors focus:border-neutral-900 focus:outline-none border-neutral-700 bg-surface text-primary"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-lg px-3 py-1.5 font-sans text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? "bg-neutral-100 text-neutral-950 shadow-xs"
                  : "bg-card text-secondary hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Error Banner */}
        {error && (
          <div role="alert" className="rounded-xl border p-4 text-xs font-semibold border-red-900 bg-red-950 text-red-200 flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" /> {error}
          </div>
        )}

        {/* Featured News Hero Card */}
        {featuredArticle && categoryFilter === "All Categories" && !query && (
          <div className="overflow-hidden rounded-2xl border shadow-lg border-border bg-card/90">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto overflow-hidden bg-surface">
                <SafeImage
                  src={featuredArticle.image_url}
                  alt={featuredArticle.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-md bg-surface/80 px-2.5 py-1 font-mono text-[10px] font-bold text-neutral-200 backdrop-blur-md">
                  FEATURED BRIEFING
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-muted">
                    <span className="font-bold text-primary">{featuredArticle.category}</span>
                    <span>·</span>
                    <span>{new Date(featuredArticle.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-primary leading-snug">
                    {featuredArticle.title}
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-secondary line-clamp-3 leading-relaxed">
                    {featuredArticle.summary}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-4 border-border font-mono text-xs">
                  <span className="text-muted truncate max-w-[200px]">
                    Source: <strong className="text-neutral-200">{featuredArticle.source}</strong>
                  </span>
                  <a
                    href={featuredArticle.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-sans font-semibold border-neutral-700 bg-neutral-800 text-primary hover:bg-neutral-700 transition-colors"
                  >
                    Read Original Article <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center">
            <Loader2 className="size-8 animate-spin text-muted" />
            <p className="font-mono text-xs text-muted">Fetching live Deep Tech news from database...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          /* Empty State */
          <div className="mt-16 rounded-2xl border border-dashed p-12 text-center border-border">
            <p className="font-mono text-sm font-bold text-neutral-200">
              No news briefings found for "{query || categoryFilter}".
            </p>
            <p className="mt-1 font-sans text-xs text-muted">
              Try selecting another category or click "Refresh News" to trigger an RSS feed sync.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategoryFilter("All Categories");
              }}
              className="mt-4 rounded-lg px-4 py-2 font-sans text-xs font-bold bg-neutral-100 text-neutral-950 cursor-pointer"
            >
              Clear Search Filters
            </button>
          </div>
        ) : (
          /* News Grid */
          <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <RevealItem key={article.id}>
                <div
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border p-5 shadow-xs transition-all duration-300 hover:shadow-md border-border bg-card/80 hover:border-neutral-700"
                >
                  <div>
                    {/* Article Image */}
                    <div className="relative mb-4 h-44 overflow-hidden rounded-xl bg-surface">
                      <img
                        src={article.image_url}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";
                        }}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-2.5 top-2.5 rounded-md bg-surface/80 px-2 py-0.5 font-mono text-[9px] font-bold text-neutral-200 backdrop-blur-md">
                        {article.category}
                      </div>
                    </div>

                    {/* Title & Metadata */}
                    <div className="flex items-center gap-2 font-mono text-[11px] text-secondary">
                      <span>{article.source}</span>
                      <span>•</span>
                      <span>{new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>

                    <h3 className="mt-2.5 font-display text-base font-bold tracking-tight group-hover:underline text-primary line-clamp-2 cursor-pointer">
                      <Link href={`/news/${article.id}`}>{article.title}</Link>
                    </h3>

                    <p className="mt-2 font-sans text-xs leading-relaxed text-neutral-200 line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  {/* Footer Link */}
                  <div className="mt-5 border-t pt-3 border-border/80">
                    <a
                      href={article.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border py-2 font-mono text-xs font-bold transition-colors border-neutral-700 bg-surface text-primary hover:bg-neutral-100 hover:text-neutral-950"
                    >
                      Read Original Article <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        )}
      </Container>
    </>
  );
}

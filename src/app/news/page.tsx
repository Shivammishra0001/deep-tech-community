"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, ExternalLink, RefreshCw, Loader2, Calendar, ShieldCheck, Tag, AlertCircle } from "lucide-react";
import { Container, PageHero, Button, Badge } from "@/components/ui";
import { ARTICLES } from "@/data/news";

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
  "Space Technology",
  "Cloud / Infrastructure",
  "Blockchain / Web3",
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
      ai: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop",
      quantum: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
      cybersecurity: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      space: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
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
          : "Space Technology",
      source: "Deep Tech Society Research",
      source_url: `/news/${a.slug}`,
      image_url: defaultImages[a.domain] || defaultImages.ai,
      image_source: "Unsplash / Deep Tech Society Archives",
      license: "Unsplash License / Public Domain",
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
        setError(data.error || "Failed to refresh news feeds.");
      }
    } catch {
      setError("Network error while syncing RSS feeds.");
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
        (categoryFilter === "Space Technology" && a.category.toLowerCase().includes("space"));

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
        eyebrow="AUTOMATED NEWS PIPELINE & RESEARCH"
        title="Live Deep Tech Intelligence Briefings."
        description="Automated real-time aggregation across AI, Quantum, Cybersecurity, Space Tech, and Emerging Infrastructure."
      />

      <Container className="py-12">
        {/* Top Control Bar: Search & Admin Manual Refresh */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="font-mono text-[10px] uppercase font-bold tracking-wider">
              AUTO-UPDATED EVERY 30 MIN
            </Badge>
            <button
              onClick={handleRefreshNews}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-1.5 font-mono text-xs font-bold text-neutral-800 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 cursor-pointer disabled:opacity-50"
            >
              {refreshing ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
              {refreshing ? "Fetching RSS Feeds..." : "Refresh News"}
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI, Quantum, Space, Cyber..."
              aria-label="Search news briefings"
              className="h-10 w-full rounded-xl border border-neutral-300 bg-white pl-10 pr-4 font-sans text-xs text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="mt-4 flex flex-wrap gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-lg px-3 py-1.5 font-sans text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-950 shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Error Banner */}
        {error && (
          <div role="alert" className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-xs font-semibold text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200 flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" /> {error}
          </div>
        )}

        {/* Featured News Hero Card */}
        {featuredArticle && categoryFilter === "All Categories" && !query && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900/90">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto overflow-hidden bg-neutral-950">
                <img
                  src={featuredArticle.image_url}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop";
                  }}
                  alt={featuredArticle.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-md bg-neutral-950/80 px-2.5 py-1 font-mono text-[10px] font-bold text-neutral-200 backdrop-blur-md">
                  FEATURED BRIEFING
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{featuredArticle.category}</span>
                    <span>•</span>
                    <span>{new Date(featuredArticle.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-snug">
                    {featuredArticle.title}
                  </h2>
                  <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {featuredArticle.summary}
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3 border-t border-neutral-200/80 pt-4 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                    Source: <strong className="text-neutral-800 dark:text-neutral-200">{featuredArticle.source}</strong>
                  </div>
                  <a
                    href={featuredArticle.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 font-sans text-xs font-bold text-neutral-50 shadow-sm transition-transform hover:scale-105 dark:bg-neutral-100 dark:text-neutral-950"
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
            <Loader2 className="size-8 animate-spin text-neutral-500" />
            <p className="font-mono text-xs text-neutral-500">Fetching live Deep Tech news from database...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          /* Empty State */
          <div className="mt-16 rounded-2xl border border-dashed border-neutral-300 p-12 text-center dark:border-neutral-800">
            <p className="font-mono text-sm font-bold text-neutral-700 dark:text-neutral-300">
              No news briefings found for "{query || categoryFilter}".
            </p>
            <p className="mt-1 font-sans text-xs text-neutral-500">
              Try selecting another category or click "Refresh News" to trigger an RSS feed sync.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategoryFilter("All Categories");
              }}
              className="mt-4 rounded-lg bg-neutral-900 px-4 py-2 font-sans text-xs font-bold text-neutral-50 dark:bg-neutral-100 dark:text-neutral-950 cursor-pointer"
            >
              Clear Search Filters
            </button>
          </div>
        ) : (
          /* News Grid */
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:border-neutral-700"
              >
                <div>
                  {/* Article Image */}
                  <div className="relative mb-4 h-44 overflow-hidden rounded-xl bg-neutral-950">
                    <img
                      src={article.image_url}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop";
                      }}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-2.5 top-2.5 rounded-md bg-neutral-950/80 px-2 py-0.5 font-mono text-[9px] font-bold text-neutral-200 backdrop-blur-md">
                      {article.category}
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>

                  <h3 className="mt-2.5 font-display text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="mt-2 font-sans text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                {/* Footer Link & License Info */}
                <div className="mt-5 border-t border-neutral-100 pt-3 dark:border-neutral-800/80">
                  <div className="mb-2 flex items-center justify-between font-mono text-[9px] text-neutral-400">
                    <span className="truncate">Image: {article.image_source}</span>
                    <span className="shrink-0">{article.license.includes("Public") ? "CC0 / Public Domain" : "Unsplash"}</span>
                  </div>

                  <a
                    href={article.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-neutral-300 bg-neutral-50 py-2 font-mono text-xs font-bold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-neutral-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-950"
                  >
                    Read Original Article <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Container, PageHero, DomainBadge, Avatar, Button, Card, NewsCard } from "@/components/ui";
import { ARTICLES } from "@/data/news";
import { type DomainSlug } from "@/data/core";

import { NewsInteractiveCard } from "@/components/news-actions";

const FILTERS: { label: string; value: DomainSlug | "all" }[] = [
  { label: "All Briefings", value: "all" },
  { label: "AI", value: "ai" },
  { label: "Quantum", value: "quantum" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Space Technology", value: "space" },
];

export default function NewsPage() {
  const [filter, setFilter] = useState<DomainSlug | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const matchesFilter = filter === "all" || a.domain === filter;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.author.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <>
      <PageHero
        eyebrow="Publications & Analysis"
        title="Practitioner-Authored Deep Tech Briefings."
        description="Rigorous reporting and research breakdowns authored by active developers, scientists, and systems architects."
      />
      <Container className="py-16">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/80 pb-4 dark:border-neutral-800/80">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Button
                key={f.value}
                onClick={() => setFilter(f.value)}
                variant={filter === f.value ? "primary" : "ghost"}
                size="sm"
              >
                {f.label}
              </Button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search publications..."
              aria-label="Search articles"
              className="h-9 w-full rounded-md border border-neutral-300 bg-white pl-9 pr-3 font-sans text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center font-mono text-xs text-neutral-400">
            No technical briefings match your query.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <NewsInteractiveCard
                key={a.slug}
                title={a.title}
                domain={a.domain}
                date={a.date}
                author={a.author}
                summary={a.excerpt}
                slug={a.slug}
                readTime={`${a.readingTime} min`}
                image={a.image}
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

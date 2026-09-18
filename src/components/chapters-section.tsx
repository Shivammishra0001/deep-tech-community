"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui";
import { RevealHeading, RevealStagger, RevealItem } from "@/components/reveal";
import { CHAPTERS, type Chapter } from "@/data/core";

/**
 * Internal hairlines for the chapter row, by index: stacked rules on mobile,
 * a two-divider row once the three sit side by side.
 */
const EDGES = [
  "border-b border-border hover:border-accent-border md:border-b-0 md:border-r",
  "border-b border-border hover:border-accent-border md:border-b-0 md:border-r",
  "",
];

/**
 * One chapter.
 *
 * Shows only what the data holds as structural fact: the country, its code,
 * the cities the chapter operates across, and the year it was established —
 * the same "Est." the chapters pages already publish. No organisers, member
 * counts, sessions or addresses, because the data has none.
 */
function ChapterPanel({ chapter, edges }: { chapter: Chapter; edges: string }) {
  return (
    <Link
      href={`/chapters/${chapter.slug}`}
      className={`group relative flex w-full flex-col px-7 py-8 transition-colors duration-300
                  sm:px-9 sm:py-10 md:px-7 lg:px-10 lg:py-11 ${edges}`}
    >
      {/* Network node and its run of line — the only geographic gesture here.
          Static, hairline weight, and carrying no position or status. */}
      <span className="-mr-7 flex items-center gap-3 sm:-mr-9 md:-mr-7 lg:-mr-10" aria-hidden="true">
        <span className="size-[5px] shrink-0 rounded-full bg-muted transition-colors duration-300 group-hover:bg-accent" />
        <span className="h-px flex-1 bg-border transition-colors duration-300 group-hover:bg-accent-border" />
      </span>

      <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-secondary">
        {chapter.code}
      </p>

      <h3 className="mt-3 font-sans text-[24px] font-medium leading-[1.1] tracking-[-0.015em] text-primary sm:text-[26px] lg:text-[28px]">
        {chapter.country}
      </h3>

      <p className="mt-4 font-sans text-[15px] font-medium leading-[1.6] text-secondary sm:text-base">
        {chapter.city}
      </p>

      <span className="mt-auto block pt-10">
        <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
          EST. {chapter.founded}
        </span>

        <span className="mt-4 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-secondary transition-colors duration-300 group-hover:text-accent">
          EXPLORE CHAPTER
          <ArrowUpRight className="size-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </span>

      {/* Hover wash, matched to the technology panels. */}
      <span className="pointer-events-none absolute inset-0 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-[0.022]" />
    </Link>
  );
}

export function ChaptersSection() {
  return (
    <section
      id="chapters"
      className="relative scroll-mt-20 border-t border-border bg-background py-20 text-primary sm:py-24 lg:py-28"
    >
      <Container>
        {/* ── SECTION HEADER ─────────────────────────────────────────────── */}
        <RevealHeading>
          <div className="border-b border-border pb-10 sm:pb-12">
            <div className="flex items-center justify-between gap-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-secondary sm:text-[12px]">
                05 / CHAPTERS
              </p>
              <Link
                href="/chapters"
                className="group inline-flex shrink-0 items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-secondary transition-colors duration-300 hover:text-primary sm:text-[12px]"
              >
                ALL CHAPTERS
                <ArrowUpRight className="size-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <h2
                className="font-sans font-semibold uppercase tracking-[-0.015em] text-primary
                           text-[clamp(1.875rem,7vw,2.25rem)]
                           sm:text-[clamp(2.25rem,5vw,2.75rem)]
                           lg:text-[3rem] lg:tracking-[-0.022em]
                           leading-[1.08]"
              >
                CHAPTERS
              </h2>

              <p className="max-w-[420px] font-sans text-[15px] font-medium leading-[1.65] text-secondary sm:text-base lg:pb-1.5">
                Regional chapters connect members in their own cities and time zones.
              </p>
            </div>
          </div>
        </RevealHeading>

        {/* ── THE CHAPTER ROW ────────────────────────────────────────────── */}
        <RevealStagger
          className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card sm:mt-14 md:grid-cols-3"
          staggerDelay={110}
        >
          {CHAPTERS.map((c, i) => (
            <RevealItem key={c.slug} className="flex" distance={16}>
              <ChapterPanel chapter={c} edges={EDGES[i] ?? ""} />
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}

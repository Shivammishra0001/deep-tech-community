"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui";
import { RevealHeading, RevealVisual } from "@/components/reveal";

/**
 * Community posts.
 *
 * The homepage has never read the posts API — it states the empty case
 * unconditionally, and that stays true here. Wiring a fetch in would be a
 * data change, not a redesign.
 */
export function CommunitySection() {
  return (
    <section
      id="community"
      className="relative scroll-mt-20 border-t border-border bg-surface py-20 text-primary sm:py-24 lg:py-28"
    >
      <Container>
        {/* ── SECTION HEADER ─────────────────────────────────────────────── */}
        <RevealHeading>
          <div className="border-b border-border pb-10 sm:pb-12">
            <div className="flex items-center justify-between gap-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-muted sm:text-[11px]">
                04 / COMMUNITY
              </p>
              <Link
                href="/community"
                className="group inline-flex shrink-0 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-primary sm:text-[11px]"
              >
                OPEN FORUM
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
                COMMUNITY
              </h2>

              <p className="max-w-[420px] font-sans text-[15px] font-medium leading-[1.65] text-secondary sm:text-base lg:pb-1.5">
                Articles, open projects, and technical debriefs shared directly by community
                members.
              </p>
            </div>
          </div>
        </RevealHeading>

        {/* ── THE EMPTY FORUM ────────────────────────────────────────────
            A compact band, not a panel: the standfirst above already says
            what will appear here, so the state itself only has to say that
            nothing has yet. */}
        <RevealVisual delay={100}>
          <div className="mt-12 rounded-2xl border border-border bg-card px-7 py-8 sm:mt-14 sm:px-10 sm:py-9 lg:px-12">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted sm:text-[11px]">
              NO COMMUNITY POSTS YET
            </p>
          </div>
        </RevealVisual>
      </Container>
    </section>
  );
}

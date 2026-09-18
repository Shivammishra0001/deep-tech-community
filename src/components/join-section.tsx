"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";
import { RevealHeading, RevealVisual } from "@/components/reveal";

/**
 * Closing call to action.
 *
 * The wording describes the flow the site actually implements: /join gates the
 * form behind an account ("Account Required to Apply"), and POST /api/join
 * records the entry. There is no fee and no review stage, so none is implied —
 * the note says what a visitor will be asked to do and nothing beyond it.
 */
export function JoinSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 border-t border-border bg-surface py-20 text-primary sm:py-24 lg:py-28"
    >
      <Container>
        {/* ── SECTION HEADER ─────────────────────────────────────────────── */}
        <RevealHeading>
          <div className="border-b border-border pb-10 sm:pb-12">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-muted sm:text-[11px]">
              06 / JOIN
            </p>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <h2
                className="max-w-[16ch] font-sans font-medium uppercase tracking-[-0.015em] text-primary
                           text-[clamp(1.875rem,7vw,2.25rem)]
                           sm:text-[clamp(2.25rem,5vw,2.75rem)]
                           lg:text-[3rem] lg:tracking-[-0.022em]
                           leading-[1.08]"
              >
                JOIN FRONTIER BUILDERS WORLDWIDE
              </h2>

              <p className="max-w-[420px] font-sans text-[15px] font-normal leading-[1.65] text-secondary sm:text-base lg:pb-1.5">
                Membership is free and open to students, engineers, researchers, founders, and
                educators.
              </p>
            </div>
          </div>
        </RevealHeading>

        {/* ── THE ENTRY PLATE ────────────────────────────────────────────── */}
        <RevealVisual delay={100}>
          <div className="mt-12 rounded-2xl border border-border bg-card sm:mt-14">
            <div className="flex flex-col lg:flex-row lg:items-stretch">
              <div className="flex flex-1 flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 lg:px-12">
                <p className="max-w-[46ch] font-sans text-[17px] font-normal leading-[1.55] tracking-[-0.01em] text-primary sm:text-[20px]">
                  Direct access to technical roadmaps, regional symposia, and active project
                  channels.
                </p>
              </div>

              {/* Divider: a rule between the offer and the way in. Horizontal
                  while the plate is stacked, vertical once it is side by side. */}
              <div className="h-px w-full bg-border lg:h-auto lg:w-px" aria-hidden="true" />

              <div className="flex flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 lg:px-12">
                <Link
                  href="/join"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-primary px-7
                             font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-background
                             transition-colors duration-200 hover:bg-cta-hover sm:w-auto sm:text-[13px]"
                >
                  JOIN THE COMMUNITY
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <p className="mt-5 max-w-[34ch] font-sans text-[13px] leading-[1.6] text-muted">
                  Joining is free. Create an account, then complete a short membership form.
                </p>
              </div>
            </div>
          </div>
        </RevealVisual>
      </Container>
    </section>
  );
}

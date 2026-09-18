"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, DomainBadge } from "@/components/ui";
import { RevealHeading, RevealVisual, RevealStagger, RevealItem } from "@/components/reveal";
import { EVENTS, isUpcomingEvent, type TechEvent } from "@/data/events";

/**
 * Ruled structure behind the empty state — a blank schedule sheet rather than
 * a decorative flourish. It carries no dates, day names or numbers, so it says
 * nothing the data does not. Weighted to the right of the panel so the type
 * sits on clean ground, and kept below the hero's grid in strength.
 */
const SCHEDULE_LINES = [
  "repeating-linear-gradient(0deg, var(--sheet-fine) 0 1px, transparent 1px 40px)",
  "repeating-linear-gradient(90deg, var(--sheet-fine) 0 1px, transparent 1px 40px)",
  "repeating-linear-gradient(90deg, var(--sheet-coarse) 0 1px, transparent 1px 160px)",
].join(",");

/** Wide panel: the sheet fills the open space to the right of the type. */
const RULES_WIDE = {
  backgroundImage: SCHEDULE_LINES,
  maskImage: "radial-gradient(ellipse 88% 150% at 92% 50%, #000 0%, transparent 82%)",
  WebkitMaskImage: "radial-gradient(ellipse 88% 150% at 92% 50%, #000 0%, transparent 82%)",
} as const;

/** Narrow panel: there is no room beside the type, so it settles underneath. */
const RULES_NARROW = {
  backgroundImage: SCHEDULE_LINES,
  maskImage: "radial-gradient(ellipse 140% 74% at 50% 104%, #000 0%, transparent 78%)",
  WebkitMaskImage: "radial-gradient(ellipse 140% 74% at 50% 104%, #000 0%, transparent 78%)",
} as const;

/**
 * A scheduled event, as one row of a divided schedule. The first row skips its
 * top rule — the header's own divider already closes the space above it, and
 * two hairlines that close together read as an empty row.
 */
function EventRow({ event, first }: { event: TechEvent; first: boolean }) {
  const [month, day] = event.date.split(" ");

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group flex flex-col gap-4 px-1 py-6 transition-colors duration-300
                  sm:flex-row sm:items-center sm:gap-8 sm:py-7
                  ${first ? "" : "border-t border-border hover:border-accent-border"}`}
    >
      <span className="flex shrink-0 items-baseline gap-2 sm:w-24 sm:flex-col sm:items-start sm:gap-0.5">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
          {month}
        </span>
        <span className="font-sans text-[22px] font-medium leading-none tracking-[-0.015em] text-primary">
          {day?.replace(",", "")}
        </span>
      </span>

      <span className="flex-1">
        <span className="block font-sans text-[17px] font-medium leading-[1.4] tracking-[-0.01em] text-primary sm:text-[19px]">
          {event.title}
        </span>
        <span className="mt-2 block font-sans text-[13px] leading-[1.6] text-muted sm:text-sm">
          {event.time} · {event.venue} · {event.format}
        </span>
      </span>

      <span className="flex shrink-0 items-center gap-3">
        <span className="hidden gap-1.5 sm:flex">
          {event.domains.slice(0, 2).map((d) => (
            <DomainBadge key={d} domain={d} />
          ))}
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted transition-colors duration-300 group-hover:text-accent">
          {event.type}
        </span>
        <ArrowUpRight className="size-3.5 text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-bright" />
      </span>
    </Link>
  );
}

export function EventsSection() {
  const upcoming = EVENTS.filter((e) => isUpcomingEvent(e.date));

  return (
    <section
      id="events"
      className="relative scroll-mt-20 border-t border-border bg-background py-20 text-primary sm:py-24 lg:py-28"
    >
      <Container>
        {/* ── SECTION HEADER ─────────────────────────────────────────────── */}
        <RevealHeading>
          <div className="border-b border-border pb-10 sm:pb-12">
            <div className="flex items-center justify-between gap-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-muted sm:text-[11px]">
                03 / EVENTS
              </p>
              <Link
                href="/events"
                className="group inline-flex shrink-0 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-primary sm:text-[11px]"
              >
                ALL EVENTS
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
                EVENTS
              </h2>

              <p className="max-w-[420px] font-sans text-[15px] font-medium leading-[1.65] text-secondary sm:text-base lg:pb-1.5">
                Practitioner-led conferences, hands-on security labs, and research reading groups.
              </p>
            </div>
          </div>
        </RevealHeading>

        {/* ── THE SCHEDULE, OR THE EMPTY SHEET ───────────────────────────── */}
        {upcoming.length > 0 ? (
          <RevealStagger className="mt-12 border-b border-border sm:mt-14" staggerDelay={110}>
            {upcoming.map((e, i) => (
              <RevealItem key={e.slug} distance={16}>
                <EventRow event={e} first={i === 0} />
              </RevealItem>
            ))}
          </RevealStagger>
        ) : (
          <RevealVisual delay={100}>
            <div className="relative mt-12 overflow-hidden rounded-2xl border border-border bg-card sm:mt-14">
              <div className="pointer-events-none absolute inset-0 md:hidden" style={RULES_NARROW} aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 hidden md:block" style={RULES_WIDE} aria-hidden="true" />

              <div className="relative px-7 pb-24 pt-14 sm:px-10 sm:pb-28 sm:pt-16 md:pb-16 lg:px-12 lg:py-20">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted sm:text-[11px]">
                  NO UPCOMING EVENTS
                </p>
                <p className="mt-5 max-w-[22ch] font-sans text-[20px] font-medium leading-[1.3] tracking-[-0.015em] text-primary sm:text-[24px] lg:text-[28px]">
                  New gatherings and technical sessions will appear here.
                </p>
              </div>
            </div>
          </RevealVisual>
        )}
      </Container>
    </section>
  );
}

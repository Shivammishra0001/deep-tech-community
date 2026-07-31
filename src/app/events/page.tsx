"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Radio, Calendar, Clock } from "lucide-react";
import { Container, PageHero, DomainBadge, Button, Card, Badge } from "@/components/ui";
import { EVENTS, type EventType } from "@/data/events";

const FILTERS: { label: string; value: EventType | "all" }[] = [
  { label: "All Events", value: "all" },
  { label: "Conferences", value: "Conference" },
  { label: "Workshops", value: "Workshop" },
  { label: "Meetups", value: "Meetup" },
  { label: "Webinars", value: "Webinar" },
];

export default function EventsPage() {
  const [filter, setFilter] = useState<EventType | "all">("all");
  const filtered = filter === "all" ? EVENTS : EVENTS.filter((e) => e.type === filter);

  return (
    <>
      <PageHero
        eyebrow="Technical Symposia"
        title="Conferences, Workshops & Code Labs."
        description="Practitioner gatherings across our four deep tech domains. Free registration for all verified members."
      />
      <Container className="py-16">
        <div role="group" aria-label="Filter by event type" className="flex flex-wrap gap-2 border-b border-neutral-200/80 pb-4 dark:border-neutral-800/80">
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

        <div className="mt-8 space-y-5">
          {filtered.map((e) => (
            <Card key={e.slug} hover className="group p-6">
              <Link href={`/events/${e.slug}`} className="grid gap-6 sm:grid-cols-[110px_1fr_auto] sm:items-center">
                {/* Date block */}
                <div className="w-[110px] shrink-0 rounded-xl border border-neutral-300 bg-neutral-100 p-3.5 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                    {e.date.split(" ")[0]}
                  </p>
                  <p className="mt-0.5 font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
                    {e.date.split(" ")[1]?.replace(",", "") ?? e.date}
                  </p>
                </div>

                {/* Content */}
                <div className="min-w-0 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700">{e.type}</Badge>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
                      {e.format === "Online" ? <Radio className="size-3.5 text-neutral-900 dark:text-neutral-100" aria-hidden /> : <MapPin className="size-3.5 text-neutral-900 dark:text-neutral-100" aria-hidden />}
                      {e.format}
                    </span>
                    {e.featured && (
                      <Badge className="border-neutral-900 bg-neutral-900 text-neutral-50 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950 font-bold">
                        Flagship
                      </Badge>
                    )}
                  </div>

                  <h2 className="font-display text-xl font-bold tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-50 sm:text-2xl">
                    {e.title}
                  </h2>

                  {/* High contrast Date, Time & Venue */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    <span className="flex items-center gap-2">
                      <Calendar className="size-4 text-neutral-900 dark:text-neutral-100" />
                      {e.date}
                    </span>
                    <span className="hidden sm:inline text-neutral-400">•</span>
                    <span className="flex items-center gap-2">
                      <Clock className="size-4 text-neutral-900 dark:text-neutral-100" />
                      {e.time}
                    </span>
                    <span className="hidden sm:inline text-neutral-400">•</span>
                    <span className="flex items-center gap-2">
                      <MapPin className="size-4 text-neutral-900 dark:text-neutral-100" />
                      {e.venue}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {e.domains.map((dm) => (
                      <DomainBadge key={dm} domain={dm} />
                    ))}
                  </div>
                </div>

                {/* CTA & Price */}
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center border-t border-neutral-200/80 pt-4 sm:border-0 sm:pt-0 dark:border-neutral-800">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700">
                    {e.price}
                  </span>
                  <Button variant="outline" size="md" className="group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-neutral-100 dark:group-hover:text-neutral-950">
                    Details <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

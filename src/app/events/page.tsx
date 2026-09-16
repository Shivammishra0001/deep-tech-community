"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Radio, Calendar, Clock } from "lucide-react";
import { Container, PageHero, DomainBadge, Button, Card, Badge } from "@/components/ui";
import { EVENTS, isUpcomingEvent, type EventType } from "@/data/events";
import { RevealStagger, RevealItem } from "@/components/reveal";

const FILTERS: { label: string; value: EventType | "all" }[] = [
  { label: "All Types", value: "all" },
  { label: "Conferences", value: "Conference" },
  { label: "Workshops", value: "Workshop" },
  { label: "Meetups", value: "Meetup" },
  { label: "Webinars", value: "Webinar" },
];

export default function EventsPage() {
  const [timeTab, setTimeTab] = useState<"upcoming" | "past">("upcoming");
  const [filter, setFilter] = useState<EventType | "all">("all");

  const timeFiltered = EVENTS.filter((e) =>
    timeTab === "upcoming" ? isUpcomingEvent(e.date) : !isUpcomingEvent(e.date)
  );

  const filtered = filter === "all" ? timeFiltered : timeFiltered.filter((e) => e.type === filter);

  return (
    <>
      <PageHero
        eyebrow="Technical Symposia"
        title="Conferences, Workshops & Code Labs."
        description="Practitioner gatherings across our deep tech domains. Free registration for all verified members."
      />
      <Container className="py-8 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-border/80">
          <div className="flex gap-2">
            <Button
              onClick={() => setTimeTab("upcoming")}
              variant={timeTab === "upcoming" ? "primary" : "ghost"}
              size="sm"
            >
              Upcoming
            </Button>
            <Button
              onClick={() => setTimeTab("past")}
              variant={timeTab === "past" ? "primary" : "ghost"}
              size="sm"
            >
              Past Archive
            </Button>
          </div>

          <div role="group" aria-label="Filter by event type" className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <Button
                key={f.value}
                onClick={() => setFilter(f.value)}
                variant={filter === f.value ? "outline" : "ghost"}
                size="sm"
                className="font-mono text-xs"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        <RevealStagger className="mt-8 space-y-5">
          {filtered.length === 0 ? (
            <Card className="text-center py-16">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
                NO UPCOMING EVENTS
              </p>
              <p className="mt-2 text-sm text-secondary">
                New gatherings and technical sessions will appear here.
              </p>
            </Card>
          ) : (
            filtered.map((e) => (
            <RevealItem key={e.slug}>
            <Card hover className="group p-6">
              <Link href={`/events/${e.slug}`} className="grid gap-6 sm:grid-cols-[110px_1fr_auto] sm:items-center">
                {/* Date block */}
                <div className="w-[110px] shrink-0 rounded-xl border p-3.5 text-center shadow-sm border-neutral-700 bg-card">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    {e.date.split(" ")[0]}
                  </p>
                  <p className="mt-0.5 font-display text-3xl font-extrabold tracking-tight text-primary">
                    {e.date.split(" ")[1]?.replace(",", "") ?? e.date}
                  </p>
                </div>

                {/* Content */}
                <div className="min-w-0 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="font-semibold text-xs text-primary border-neutral-700">{e.type}</Badge>
                    <span className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider border-neutral-700 bg-neutral-800 text-primary">
                      {e.format === "Online" ? <Radio className="size-3.5 text-primary" aria-hidden /> : <MapPin className="size-3.5 text-primary" aria-hidden />}
                      {e.format}
                    </span>
                    {e.featured && (
                      <Badge className="border-neutral-100 bg-neutral-100 text-neutral-950! font-bold">
                        Flagship
                      </Badge>
                    )}
                  </div>

                  <h2 className="font-display text-xl font-bold tracking-tight group-hover:underline text-primary sm:text-2xl">
                    {e.title}
                  </h2>

                  {/* High contrast Date, Time & Venue */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm font-semibold text-neutral-200">
                    <span className="flex items-center gap-2">
                      <Calendar className="size-4 text-primary" />
                      {e.date}
                    </span>
                    <span className="hidden sm:inline text-secondary">•</span>
                    <span className="flex items-center gap-2">
                      <Clock className="size-4 text-primary" />
                      {e.time}
                    </span>
                    <span className="hidden sm:inline text-secondary">•</span>
                    <span className="flex items-center gap-2">
                      <MapPin className="size-4 text-primary" />
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
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center border-t pt-4 sm:border-0 sm:pt-0 border-border">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary bg-neutral-800 px-3 py-1.5 rounded-md border border-neutral-700">
                    {e.price}
                  </span>
                  <Button variant="outline" size="md" className="group-hover:bg-neutral-100 group-hover:text-neutral-950">
                    Details <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </Link>
            </Card>
            </RevealItem>
          ))
        )}
        </RevealStagger>
      </Container>
    </>
  );
}

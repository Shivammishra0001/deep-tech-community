import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, MapPin } from "lucide-react";
import { Container, Avatar, Eyebrow, SectionHeading, Card, Button, Badge } from "@/components/ui";
import { CHAPTERS } from "@/data/core";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ch = CHAPTERS.find((c) => c.slug === slug);
  if (!ch) return { title: "Chapter Not Found" };
  return { title: `${ch.country} Chapter | Deep Tech Society`, description: `Deep Tech Society ${ch.country} chapter — ${ch.blurb}` };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ch = CHAPTERS.find((c) => c.slug === slug);
  if (!ch) notFound();

  const others = CHAPTERS.filter((c) => c.slug !== ch.slug);

  const meetups = [
    {
      title: `${ch.country} Monthly Paper Reading Group`,
      rhythm: "Every 2nd Saturday",
      location: ch.city.split("·")[0].trim(),
      desc: "Peer discussion analyzing one canonical deep tech paper per session.",
    },
    {
      title: `${ch.country} Hands-on Engineering Lab`,
      rhythm: "Monthly",
      location: ch.city.split("·")[0].trim(),
      desc: "Interactive code labs, SOC simulations, and telemetry pipeline workshops.",
    },
  ];

  return (
    <>
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-border/80">
        <Container className="relative pt-6 pb-6 sm:pt-7 sm:pb-7 lg:pt-8 lg:pb-8">
          <div className="animate-rise">
            <Link
              href="/chapters"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted hover:text-primary"
            >
              <ArrowLeft className="size-3.5" aria-hidden /> Return to Regional Chapters
            </Link>
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-5">
              <span className="text-4xl sm:text-5xl" role="img" aria-label={ch.country}>
                {ch.flag}
              </span>
              <div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
                  {ch.country} Chapter
                </h1>
                <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-sm font-semibold text-body">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" aria-hidden /> {ch.city}
                  </span>
                  <span>Est. {ch.founded}</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-8 sm:py-10 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-12">
          {/* 1. Overview */}
          <section id="overview">
            <Eyebrow>01 — Chapter Overview</Eyebrow>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-body-soft">
              {ch.about.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </section>

          {/* 2. Scheduled Events */}
          <section id="events">
            <SectionHeading eyebrow="02 — Symposia" title="Regional Events" action={{ label: "All Events", href: "/events" }} />
            <Card className="p-0 overflow-hidden">
              <ul className="divide-y divide-border/80">
                {ch.events.map((e) => (
                  <li key={e.title} className="flex flex-wrap items-center gap-x-5 gap-y-2 p-4 sm:p-5">
                    <span className="flex w-28 shrink-0 items-center gap-2 font-mono text-xs text-muted">
                      <Calendar className="size-3.5 shrink-0" aria-hidden /> {e.date}
                    </span>
                    <span className="min-w-0 flex-1 font-display text-sm font-semibold text-primary">
                      {e.title}
                    </span>
                    <Badge>{e.type}</Badge>
                    <span className="font-mono text-xs text-secondary">{e.city}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* 3. Regular Meetups */}
          <section id="meetups">
            <SectionHeading eyebrow="03 — Rhythm" title="Local Study Circles &amp; Meetups" />
            <div className="grid gap-4 sm:grid-cols-2">
              {meetups.map((m) => (
                <Card key={m.title}>
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <Badge>{m.rhythm}</Badge>
                    <span className="text-secondary">{m.location}</span>
                  </div>
                  <h3 className="mt-3 font-display text-sm font-semibold text-primary">{m.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-secondary">{m.desc}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* 4. Organizers */}
          <section id="organizers">
            <SectionHeading eyebrow="04 — Leadership" title="Chapter Organizers &amp; Leads" />
            <div className="grid gap-4 sm:grid-cols-2">
              {ch.leads.map((l) => (
                <Card key={l.name} className="flex items-center gap-3.5">
                  <Avatar name={l.name} className="size-10" />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold tracking-tight text-primary">{l.name}</p>
                    <p className="font-mono text-[11px] text-muted">{l.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* 5. Updates */}
          <section id="updates">
            <SectionHeading eyebrow="05 — Milestones" title="Chapter Activity Log &amp; Updates" />
            <ol className="space-y-4 font-mono text-xs">
              {ch.updates.map((u) => (
                <li key={u.date} className="flex items-start gap-4 rounded-md border p-4 border-border bg-card">
                  <span className="w-20 shrink-0 font-bold text-primary">{u.date}</span>
                  <p className="font-sans text-xs text-body-soft">{u.text}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <p className="font-display text-base font-semibold tracking-tight text-primary">
              Join {ch.country} Chapter
            </p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              Select “{ch.country}” as your primary region when applying to receive direct access to local study circles and lab invitations.
            </p>
            <div className="mt-4">
              <Button href="/join" variant="primary" size="md" className="w-full">
                Apply for Chapter Seat <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </Card>

          <Card>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary">
              Other Regional Hubs
            </p>
            <div className="mt-3 space-y-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/chapters/${o.slug}`}
                  className="group flex items-center justify-between rounded-md p-2 hover:bg-elevated"
                >
                  <span className="flex items-center gap-2 font-mono text-xs text-primary">
                    <span>{o.flag}</span>
                    <span>{o.country}</span>
                  </span>
                  <span className="font-mono text-[10px] text-secondary">{o.members} Members</span>
                </Link>
              ))}
            </div>
          </Card>
        </aside>
      </Container>
    </>
  );
}

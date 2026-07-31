import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Users, Radio, MessageSquare } from "lucide-react";
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
      <section className="relative overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden />
        <Container className="relative py-16 sm:py-20">
          <div className="animate-rise">
            <Link
              href="/chapters"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <ArrowLeft className="size-3.5" aria-hidden /> Return to Regional Chapters
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <span className="text-5xl" role="img" aria-label={ch.country}>
                {ch.flag}
              </span>
              <div>
                <h1 className="font-display text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
                  {ch.country} Chapter
                </h1>
                <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-neutral-500">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" aria-hidden /> {ch.city}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5" aria-hidden /> {ch.members.toLocaleString()} Members
                  </span>
                  <span>Est. {ch.founded}</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-12">
          {/* 1. Overview */}
          <section id="overview">
            <Eyebrow>01 — Chapter Overview</Eyebrow>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {ch.about.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </section>

          {/* 2. Scheduled Events */}
          <section id="events">
            <SectionHeading eyebrow="02 — Symposia" title="Regional Events" action={{ label: "All Events", href: "/events" }} />
            <Card className="p-0 overflow-hidden">
              <ul className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
                {ch.events.map((e) => (
                  <li key={e.title} className="flex flex-wrap items-center gap-x-5 gap-y-2 p-4 sm:p-5">
                    <span className="flex w-28 shrink-0 items-center gap-2 font-mono text-xs text-neutral-500">
                      <Calendar className="size-3.5 shrink-0" aria-hidden /> {e.date}
                    </span>
                    <span className="min-w-0 flex-1 font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {e.title}
                    </span>
                    <Badge>{e.type}</Badge>
                    <span className="font-mono text-xs text-neutral-400">{e.city}</span>
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
                    <span className="text-neutral-400">{m.location}</span>
                  </div>
                  <h3 className="mt-3 font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">{m.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{m.desc}</p>
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
                    <p className="font-display text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{l.name}</p>
                    <p className="font-mono text-[11px] text-neutral-500">{l.role}</p>
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
                <li key={u.date} className="flex items-start gap-4 rounded-md border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="w-20 shrink-0 font-bold text-neutral-900 dark:text-neutral-100">{u.date}</span>
                  <p className="font-sans text-xs text-neutral-700 dark:text-neutral-300">{u.text}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <p className="font-display text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Join {ch.country} Chapter
            </p>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              Select “{ch.country}” as your primary region when applying to receive direct access to local study circles and lab invitations.
            </p>
            <div className="mt-4">
              <Button href="/join" variant="primary" size="md" className="w-full">
                Apply for Chapter Seat <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </Card>

          <Card>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Other Regional Hubs
            </p>
            <div className="mt-3 space-y-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/chapters/${o.slug}`}
                  className="group flex items-center justify-between rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <span className="flex items-center gap-2 font-mono text-xs text-neutral-900 dark:text-neutral-100">
                    <span>{o.flag}</span>
                    <span>{o.country}</span>
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400">{o.members} Members</span>
                </Link>
              ))}
            </div>
          </Card>
        </aside>
      </Container>
    </>
  );
}

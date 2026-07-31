import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Users, BadgeCheck, ChevronDown, Camera } from "lucide-react";
import { Container, DomainBadge, Eyebrow, Avatar, Card, Badge } from "@/components/ui";
import { EVENTS } from "@/data/events";
import { DOMAINS } from "@/data/core";
import { RegisterForm } from "@/components/register-form";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ev = EVENTS.find((e) => e.slug === slug);
  if (!ev) return { title: "Event Not Found" };
  return { title: `${ev.title} | Deep Tech Society`, description: `${ev.title} — ${ev.date}, ${ev.venue}. ${ev.description[0].slice(0, 140)}…` };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ev = EVENTS.find((e) => e.slug === slug);
  if (!ev) notFound();

  return (
    <>
      {/* 1. Banner */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden />
        <Container className="relative py-16 sm:py-20">
          <div className="max-w-3xl animate-rise">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <ArrowLeft className="size-3.5" aria-hidden /> Return to All Events
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge>{ev.type}</Badge>
              <Badge>{ev.format}</Badge>
              {ev.domains.map((dm) => (
                <DomainBadge key={dm} domain={dm} />
              ))}
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
              {ev.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-neutral-500">
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-3.5" aria-hidden /> {ev.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-3.5" aria-hidden /> {ev.time}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5" aria-hidden /> {ev.venue}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_360px]">
        {/* Main Content */}
        <div className="min-w-0 space-y-12">
          {/* Abstract */}
          <section>
            <Eyebrow>Event Abstract</Eyebrow>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {ev.description.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </section>

          {/* 2 & 3. Agenda & Schedule */}
          <section>
            <Eyebrow>Agenda &amp; Time Schedule</Eyebrow>
            <ol className="mt-5 space-y-3 font-mono text-xs">
              {ev.agenda.map((item) => (
                <li key={item.time + item.title} className="flex gap-4 rounded-md border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="w-20 shrink-0 font-bold text-neutral-900 dark:text-neutral-100">{item.time}</span>
                  <div>
                    <p className="font-sans font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</p>
                    {item.speaker && <p className="mt-0.5 font-sans text-neutral-500">{item.speaker}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* 4. Speakers */}
          <section>
            <Eyebrow>Keynote Speakers &amp; Track Leads</Eyebrow>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {ev.speakers.map((s) => (
                <Card key={s.name} className="flex items-center gap-3.5">
                  <Avatar name={s.name} className="size-10" />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{s.name}</p>
                    <p className="font-mono text-[11px] text-neutral-500">{s.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* 5. Venue Information */}
          <section>
            <Eyebrow>Venue &amp; Logistics</Eyebrow>
            <Card className="mt-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 text-neutral-900 dark:text-neutral-100" />
                <div>
                  <h3 className="font-display text-base font-semibold text-neutral-900 dark:text-neutral-100">{ev.venue}</h3>
                  <p className="mt-1 font-mono text-xs text-neutral-500">Format: {ev.format} · Capacity: {ev.capacity}</p>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Detailed access instructions, room assignments, and streaming credentials will be dispatched to confirmed attendees 48 hours prior to the event start time.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* 6. FAQ */}
          <section>
            <Eyebrow>Frequently Asked Questions</Eyebrow>
            <Card className="mt-4 p-0 divide-y divide-neutral-200 dark:divide-neutral-800">
              {ev.faqs.map((f) => (
                <details key={f.q} className="group p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {f.q}
                    <ChevronDown className="size-4 text-neutral-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{f.a}</p>
                </details>
              ))}
            </Card>
          </section>

          {/* 7. Gallery */}
          <section>
            <Eyebrow>Event Gallery &amp; Archives</Eyebrow>
            <Card className="mt-4 text-center py-8">
              <Camera className="mx-auto size-6 text-neutral-400" />
              <p className="mt-3 font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">Symposium Recordings &amp; Photo Archives</p>
              <p className="mt-1 font-mono text-xs text-neutral-500 max-w-md mx-auto">
                Photo archives and slide decks are published to the member library within 7 days following event completion.
              </p>
            </Card>
          </section>
        </div>

        {/* 8. Registration Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <div className="flex items-center justify-between">
              <p className="font-display text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Event Registration</p>
              <BadgeCheck className="size-5 text-neutral-900 dark:text-neutral-100" />
            </div>
            <dl className="mt-4 space-y-2.5 border-b border-neutral-100 pb-4 font-mono text-xs text-neutral-500 dark:border-neutral-800">
              <div className="flex justify-between">
                <dt>Date</dt>
                <dd className="font-semibold text-neutral-900 dark:text-neutral-100">{ev.date}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Format</dt>
                <dd className="font-semibold text-neutral-900 dark:text-neutral-100">{ev.format}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Capacity</dt>
                <dd className="font-semibold text-neutral-900 dark:text-neutral-100">{ev.capacity}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Cost</dt>
                <dd className="font-semibold text-neutral-900 dark:text-neutral-100">{ev.price}</dd>
              </div>
            </dl>
            <div className="mt-5">
              <RegisterForm eventSlug={ev.slug} eventTitle={ev.title} />
            </div>
          </Card>
        </aside>
      </Container>
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, BadgeCheck, ChevronDown, Camera } from "lucide-react";
import { Container, DomainBadge, Eyebrow, Avatar, Card, Badge } from "@/components/ui";
import { EVENTS } from "@/data/events";
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
      <section className="relative overflow-hidden border-b border-border/80">
        <Container className="relative pt-6 pb-6 sm:pt-7 sm:pb-7 lg:pt-8 lg:pb-8">
          <div className="max-w-3xl animate-rise">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted hover:text-primary"
            >
              <ArrowLeft className="size-3.5" aria-hidden /> Return to All Events
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge>{ev.type}</Badge>
              <Badge>{ev.format}</Badge>
              {ev.domains.map((dm) => (
                <DomainBadge key={dm} domain={dm} />
              ))}
            </div>
            <h1 className="mt-2.5 sm:mt-3 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {ev.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted">
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

      <Container className="grid gap-12 py-8 sm:py-10 lg:grid-cols-[1fr_360px]">
        {/* Main Content */}
        <div className="min-w-0 space-y-12">
          {/* Abstract */}
          <section>
            <Eyebrow>Event Abstract</Eyebrow>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-body-soft">
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
                <li key={item.time + item.title} className="flex gap-4 rounded-md border p-4 border-border bg-card">
                  <span className="w-20 shrink-0 font-bold text-primary">{item.time}</span>
                  <div>
                    <p className="font-sans font-semibold text-primary">{item.title}</p>
                    {item.speaker && <p className="mt-0.5 font-sans text-muted">{item.speaker}</p>}
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
                    <p className="font-display text-sm font-semibold tracking-tight text-primary">{s.name}</p>
                    <p className="font-mono text-[11px] text-muted">{s.role}</p>
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
                <MapPin className="mt-1 size-5 text-primary" />
                <div>
                  <h3 className="font-display text-base font-semibold text-primary">{ev.venue}</h3>
                  <p className="mt-1 font-mono text-xs text-muted">Format: {ev.format} · Capacity: {ev.capacity}</p>
                  <p className="mt-3 text-xs leading-relaxed text-secondary">
                    Detailed access instructions, room assignments, and streaming credentials will be dispatched to confirmed attendees 48 hours prior to the event start time.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* 6. FAQ */}
          <section>
            <Eyebrow>Frequently Asked Questions</Eyebrow>
            <Card className="mt-4 p-0 divide-y divide-border">
              {ev.faqs.map((f) => (
                <details key={f.q} className="group p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-display text-sm font-semibold text-primary">
                    {f.q}
                    <ChevronDown className="size-4 text-secondary transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-secondary">{f.a}</p>
                </details>
              ))}
            </Card>
          </section>

          {/* 7. Gallery */}
          <section>
            <Eyebrow>Event Gallery &amp; Archives</Eyebrow>
            <Card className="mt-4 text-center py-8">
              <Camera className="mx-auto size-6 text-secondary" />
              <p className="mt-3 font-display text-sm font-semibold text-primary">Symposium Recordings &amp; Photo Archives</p>
              <p className="mt-1 font-mono text-xs text-muted max-w-md mx-auto">
                Photo archives and slide decks are published to the member library within 7 days following event completion.
              </p>
            </Card>
          </section>
        </div>

        {/* 8. Registration Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <div className="flex items-center justify-between">
              <p className="font-display text-base font-semibold tracking-tight text-primary">Event Registration</p>
              <BadgeCheck className="size-5 text-primary" />
            </div>
            <dl className="mt-4 space-y-2.5 border-b pb-4 font-mono text-xs text-muted border-border">
              <div className="flex justify-between">
                <dt>Date</dt>
                <dd className="font-semibold text-primary">{ev.date}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Format</dt>
                <dd className="font-semibold text-primary">{ev.format}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Capacity</dt>
                <dd className="font-semibold text-primary">{ev.capacity}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Cost</dt>
                <dd className="font-semibold text-primary">{ev.price}</dd>
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

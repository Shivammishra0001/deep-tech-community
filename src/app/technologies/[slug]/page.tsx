import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container, DomainBadge, SectionHeading, Card, Button, Badge } from "@/components/ui";
import { DOMAINS } from "@/data/core";
import { TECH_PAGES } from "@/data/technologies";
import { ARTICLES } from "@/data/news";
import { EVENTS } from "@/data/events";
import { GovernanceDiagram } from "@/components/governance-diagram";
import type { DomainSlug } from "@/data/core";
import type { Metadata } from "next";

const TECH_SLUGS: Record<string, DomainSlug> = {
  "artificial-intelligence": "ai",
  "quantum-computing": "quantum",
  cybersecurity: "cybersecurity",
  "ai-governance": "governance",
};

export function generateStaticParams() {
  return [
    { slug: "artificial-intelligence" },
    { slug: "quantum-computing" },
    { slug: "cybersecurity" },
    { slug: "ai-governance" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const domain = TECH_SLUGS[slug];
  if (!domain) return { title: "Technology Not Found" };
  return {
    title: `${DOMAINS[domain].name} | Deep Tech Community`,
    description: `${DOMAINS[domain].name} track at Deep Tech Community — overview, beginner guide, learning roadmap, research papers, tutorials, news, and events.`,
  };
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "beginner", label: "Beginner Guide" },
  { id: "roadmap", label: "Learning Roadmap" },
  { id: "news", label: "Latest News" },
  { id: "industry-updates", label: "Industry Updates" },
  { id: "papers", label: "Research Papers" },
  { id: "tutorials", label: "Tutorials" },
  { id: "community-articles", label: "Community Articles" },
  { id: "events", label: "Upcoming Events" },
];

export default async function TechnologyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = TECH_SLUGS[slug];
  if (!domain) notFound();

  const d = DOMAINS[domain];
  const page = TECH_PAGES[domain];
  const Icon = d.icon;

  const domainNews = ARTICLES.filter((a) => a.domain === domain);
  const latestNews = domainNews.slice(0, 2);
  const domainEvents = EVENTS.filter((e) => e.domains.includes(domain));

  return (
    <>
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-border/80">
        <Container className="relative pt-6 pb-6 sm:pt-7 sm:pb-7 lg:pt-8 lg:pb-8">
          <div className="max-w-3xl animate-rise">
            <span className="grid size-10 place-items-center rounded-lg border border-border-strong bg-elevated text-primary">
              <Icon className="size-5" />
            </span>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">{d.name}</h1>
            <p className="mt-2 font-sans text-sm font-semibold text-body">{d.tagline}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body-soft">{page.overview[0]}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/join" variant="primary" size="md">
                Join Track
              </Button>
              <Button href="#roadmap" variant="outline" size="md">
                View Roadmap
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[220px_1fr]">
        {/* Sticky section nav */}
        <aside className="hidden lg:block">
          <nav aria-label="Sections" className="sticky top-24 space-y-1 font-mono text-xs border-l border-border pl-4">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block py-1 text-muted hover:text-primary"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 space-y-16">

          {/* 1. Overview */}
          <section id="overview" className="scroll-mt-24">
            <SectionHeading eyebrow="01 — Track Overview" title={`Engineering ${d.name}`} />
            <div className="space-y-4 text-sm leading-relaxed text-body-soft">
              {page.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            {domain === "governance" && (
              <div className="mt-8">
                <GovernanceDiagram />
              </div>
            )}
          </section>

          {/* 2. Beginner Guide */}
          <section id="beginner" className="scroll-mt-24">
            <SectionHeading
              eyebrow="02 — Onboarding"
              title="Beginner Guide"
              description="Sequential steps recommended for students and engineers entering this field."
            />
            <div className="space-y-3">
              {page.beginnerGuide.map((step, i) => (
                <Card key={step.title} className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-sm font-mono text-xs font-bold bg-inverted text-on-inverted">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight text-primary">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-secondary">{step.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* 3. Learning Roadmap */}
          <section id="roadmap" className="scroll-mt-24">
            <SectionHeading
              eyebrow="03 — Curriculum"
              title="Learning Roadmap"
              description="Ordered by fundamental prerequisites and theoretical depth."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {page.roadmap.map((phase) => (
                <Card key={phase.phase} className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-primary">{phase.phase}</span>
                      <span className="text-secondary">{phase.duration}</span>
                    </div>
                    <h3 className="mt-3 font-display text-base font-semibold text-primary">{phase.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-secondary">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* 4. Latest News */}
          <section id="news" className="scroll-mt-24">
            <SectionHeading
              eyebrow="04 — Reporting"
              title="Latest News"
              action={{ label: "All Briefings", href: "/news" }}
            />
            {latestNews.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {latestNews.map((a) => (
                  <Card key={a.slug} hover className="group">
                    <DomainBadge domain={a.domain} />
                    <h3 className="mt-3 font-display text-base font-semibold group-hover:underline text-primary">
                      <Link href={`/news/${a.slug}`}>{a.title}</Link>
                    </h3>
                    <p className="mt-2 text-xs text-secondary">{a.excerpt}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="font-mono text-xs text-secondary">
                  No briefings published in this domain yet.
                </p>
              </Card>
            )}
          </section>

          {/* 6. Research Papers */}
          <section id="papers" className="scroll-mt-24">
            <SectionHeading
              eyebrow="05 — Literature"
              title="Research Papers"
              description="Foundational publications analyzed in active research reading groups."
            />
            <Card className="p-0 divide-y divide-border">
              {page.papers.map((p) => (
                <div key={p.title} className="p-4 sm:p-5 flex flex-wrap items-baseline justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold text-primary">{p.title}</p>
                    <p className="mt-1 text-xs text-muted">{p.authors}</p>
                  </div>
                  <Badge>[{p.venue} · {p.year}]</Badge>
                </div>
              ))}
            </Card>
          </section>

          {/* 7. Tutorials */}
          <section id="tutorials" className="scroll-mt-24">
            <SectionHeading
              eyebrow="06 — Hands-on"
              title="Tutorials & Code Labs"
              description="Practitioner-led guides and reproducible notebooks."
            />
            {page.tutorials.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {page.tutorials.map((t) => (
                  <Card key={t.title} hover>
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <Badge>{t.level}</Badge>
                      <span className="text-secondary">{t.duration}</span>
                    </div>
                    <h3 className="mt-3 font-display text-sm font-semibold text-primary">{t.title}</h3>
                    <p className="mt-1 font-mono text-xs text-muted">By {t.author}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="font-mono text-xs text-secondary">
                  No tutorials published in this domain yet.
                </p>
              </Card>
            )}
          </section>

          {/* 9. Upcoming Events */}
          <section id="events" className="scroll-mt-24">
            <SectionHeading
              eyebrow="07 — Calendar"
              title="Upcoming Events"
              action={{ label: "All Events", href: "/events" }}
            />
            {domainEvents.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="font-mono text-xs text-secondary">
                  No upcoming events scheduled in this domain.
                </p>
              </Card>
            ) : (
            <Card className="p-0 divide-y divide-border">
              {domainEvents.map((e) => (
                <div key={e.slug} className="p-4 flex items-center justify-between">
                  <div>
                    <Badge>{e.type}</Badge>
                    <p className="mt-2 font-display text-sm font-semibold text-primary">
                      <Link href={`/events/${e.slug}`}>{e.title}</Link>
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted">{e.date} · {e.venue}</p>
                  </div>
                  <Button href={`/events/${e.slug}`} variant="ghost" size="sm">
                    Details <ArrowRight className="size-3" />
                  </Button>
                </div>
              ))}
            </Card>
            )}
          </section>
        </div>
      </Container>
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Calendar, FileText, GraduationCap, MapPin, Wrench, CheckCircle2, TrendingUp, User, Clock } from "lucide-react";
import { Container, DomainBadge, Eyebrow, SectionHeading, Card, Button, Badge, Tag, Avatar } from "@/components/ui";
import { DOMAINS, DOMAIN_LIST } from "@/data/core";
import { TECH_PAGES } from "@/data/technologies";
import { ARTICLES } from "@/data/news";
import { EVENTS } from "@/data/events";
import type { DomainSlug } from "@/data/core";
import type { Metadata } from "next";

const TECH_SLUGS: Record<string, DomainSlug> = {
  "artificial-intelligence": "ai",
  "quantum-computing": "quantum",
  cybersecurity: "cybersecurity",
  "space-technology": "space",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const domain = TECH_SLUGS[slug];
  if (!domain) return { title: "Technology Not Found" };
  return {
    title: `${DOMAINS[domain].name} | Deep Tech Society`,
    description: `${DOMAINS[domain].name} track at Deep Tech Society — overview, beginner guide, learning roadmap, research papers, tutorials, news, and events.`,
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

  const COMMUNITY_ARTICLES = [
    {
      author: "Priya Natarajan",
      role: "ML Researcher · Bengaluru",
      title: `Practical Lessons in Evaluating ${d.short} Models`,
      excerpt: `Key takeaways from our chapter's monthly ${d.short} reading group and evaluation benchmarks.`,
      readTime: "6 min read",
    },
    {
      author: "Wei Ling Tan",
      role: "APAC Track Lead · Singapore",
      title: `Building Open Infrastructures for ${d.short}`,
      excerpt: `How open-source tooling is changing how regional research labs collaborate on ${d.short}.`,
      readTime: "8 min read",
    },
  ];

  const INDUSTRY_UPDATES = [
    {
      title: `Global Standards Alignment for ${d.name}`,
      date: "Feb 2026",
      source: "ISO / IEEE Joint Technical Group",
      blurb: `New standards finalized for interoperability, evaluation metrics, and security benchmarks in ${d.short}.`,
    },
    {
      title: `Enterprise Adoption Trends in ${d.short}`,
      date: "Jan 2026",
      source: "Deep Tech Industry Consortium",
      blurb: `Survey across 400+ technology leaders reveals accelerated transition from pilot labs to production systems.`,
    },
  ];

  return (
    <>
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden />
        <Container className="relative py-20 sm:py-24">
          <div className="max-w-3xl animate-rise">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-md border border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
                <Icon className="size-5" />
              </span>
              <Eyebrow>Technology Track</Eyebrow>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">{d.name}</h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-neutral-500">{d.tagline}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{page.overview[0]}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/join" variant="primary" size="md">
                Join Track
              </Button>
              <Button href="#roadmap" variant="outline" size="md">
                View Roadmap
              </Button>
            </div>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            {page.facts.map((f) => (
              <Card key={f.label} className="p-4 text-center">
                <p className="font-display text-lg font-bold text-neutral-900 dark:text-neutral-100">{f.value}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400">{f.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[220px_1fr]">
        {/* Sticky section nav */}
        <aside className="hidden lg:block">
          <nav aria-label="Sections" className="sticky top-24 space-y-1 font-mono text-xs border-l border-neutral-200 dark:border-neutral-800 pl-4">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block py-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
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
            <div className="space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {page.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
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
                  <span className="grid size-7 shrink-0 place-items-center rounded-sm bg-neutral-900 font-mono text-xs font-bold text-neutral-50 dark:bg-neutral-100 dark:text-neutral-950">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{step.text}</p>
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
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">{phase.phase}</span>
                      <span className="text-neutral-400">{phase.duration}</span>
                    </div>
                    <h3 className="mt-3 font-display text-base font-semibold text-neutral-900 dark:text-neutral-100">{phase.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-neutral-900 dark:text-neutral-100" />
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
            <div className="grid gap-4 sm:grid-cols-2">
              {latestNews.map((a) => (
                <Card key={a.slug} hover className="group">
                  <DomainBadge domain={a.domain} />
                  <h3 className="mt-3 font-display text-base font-semibold text-neutral-900 group-hover:underline dark:text-neutral-100">
                    <Link href={`/news/${a.slug}`}>{a.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">{a.excerpt}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* 5. Industry Updates */}
          <section id="industry-updates" className="scroll-mt-24">
            <SectionHeading
              eyebrow="05 — Market & Standards"
              title="Industry Updates"
              description="Key shifts, corporate R&D milestones, and technical standards."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {INDUSTRY_UPDATES.map((u) => (
                <Card key={u.title}>
                  <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400">
                    <span>{u.source}</span>
                    <span>{u.date}</span>
                  </div>
                  <h3 className="mt-2 font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">{u.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{u.blurb}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* 6. Research Papers */}
          <section id="papers" className="scroll-mt-24">
            <SectionHeading
              eyebrow="06 — Literature"
              title="Research Papers"
              description="Foundational publications analyzed in active research reading groups."
            />
            <Card className="p-0 divide-y divide-neutral-200 dark:divide-neutral-800">
              {page.papers.map((p) => (
                <div key={p.title} className="p-4 sm:p-5 flex flex-wrap items-baseline justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">{p.title}</p>
                    <p className="mt-1 text-xs text-neutral-500">{p.authors}</p>
                  </div>
                  <Badge>[{p.venue} · {p.year}]</Badge>
                </div>
              ))}
            </Card>
          </section>

          {/* 7. Tutorials */}
          <section id="tutorials" className="scroll-mt-24">
            <SectionHeading
              eyebrow="07 — Hands-on"
              title="Tutorials & Code Labs"
              description="Practitioner-led guides and reproducible notebooks."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {page.tutorials.map((t) => (
                <Card key={t.title} hover>
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <Badge>{t.level}</Badge>
                    <span className="text-neutral-400">{t.duration}</span>
                  </div>
                  <h3 className="mt-3 font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">{t.title}</h3>
                  <p className="mt-1 font-mono text-xs text-neutral-500">By {t.author}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* 8. Community Articles */}
          <section id="community-articles" className="scroll-mt-24">
            <SectionHeading
              eyebrow="08 — Peer Contributions"
              title="Community Articles"
              description="Articles published directly by members in this domain circle."
              action={{ label: "Community Feed", href: "/community" }}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {COMMUNITY_ARTICLES.map((ca) => (
                <Card key={ca.title} hover>
                  <div className="flex items-center gap-2">
                    <Avatar name={ca.author} className="size-6 text-[8px]" />
                    <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">{ca.author}</span>
                  </div>
                  <h3 className="mt-3 font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">{ca.title}</h3>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{ca.excerpt}</p>
                  <p className="mt-3 font-mono text-[10px] text-neutral-400">{ca.readTime}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* 9. Upcoming Events */}
          <section id="events" className="scroll-mt-24">
            <SectionHeading
              eyebrow="09 — Calendar"
              title="Upcoming Events"
              action={{ label: "All Events", href: "/events" }}
            />
            <Card className="p-0 divide-y divide-neutral-200 dark:divide-neutral-800">
              {domainEvents.map((e) => (
                <div key={e.slug} className="p-4 flex items-center justify-between">
                  <div>
                    <Badge>{e.type}</Badge>
                    <p className="mt-2 font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      <Link href={`/events/${e.slug}`}>{e.title}</Link>
                    </p>
                    <p className="mt-1 font-mono text-xs text-neutral-500">{e.date} · {e.venue}</p>
                  </div>
                  <Button href={`/events/${e.slug}`} variant="ghost" size="sm">
                    Details <ArrowRight className="size-3" />
                  </Button>
                </div>
              ))}
            </Card>
          </section>
        </div>
      </Container>
    </>
  );
}

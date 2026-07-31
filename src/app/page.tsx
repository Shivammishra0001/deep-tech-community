import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Layers, Cpu, Shield, BookOpen, Users, MessageSquare, Newspaper, Globe } from "lucide-react";
import { Container, Eyebrow, SectionHeading, DomainBadge, Avatar, Button, Card, Badge, Tag, cx } from "@/components/ui";
import { HeroOrbits, ActivityTicker } from "@/components/orbits";
import { Reveal, CountUp } from "@/components/reveal";
import { DOMAIN_LIST, STATS, CHAPTERS } from "@/data/core";
import { TECH_PAGES } from "@/data/technologies";
import { ARTICLES } from "@/data/news";
import { EVENTS } from "@/data/events";
import type { DomainSlug } from "@/data/core";

export default function HomePage() {
  const featuredArticle = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const latestArticles = ARTICLES.filter((a) => a.slug !== featuredArticle.slug).slice(0, 3);
  const upcomingEvents = EVENTS.slice(0, 3);

  const FEATURED_POSTS = [
    {
      author: "Priya Natarajan",
      role: "ML Research Engineer · Bengaluru",
      kind: "Article",
      domain: "ai" as DomainSlug,
      title: "Evaluating reasoning traces in LLMs without falling for convincing errors",
      excerpt: "Score final answers and reasoning steps independently — self-verification protocols cut false positives by 42% in complex multi-step tasks.",
    },
    {
      author: "Arun Subramaniam",
      role: "Ground Systems Architect · Penang",
      kind: "Project",
      domain: "space" as DomainSlug,
      title: "Open-source telemetry pipeline for low-earth orbit CubeSats",
      excerpt: "A lightweight, debuggable data stack built on SQLite and server-rendered dashboards designed for low-bandwidth satellite links.",
    },
    {
      author: "Nurul Aisyah",
      role: "Security Lead · Kuala Lumpur",
      kind: "Achievement",
      domain: "cybersecurity" as DomainSlug,
      title: "SOC Simulation playbook now open for all regional chapter leads",
      excerpt: "Lab specs, adversary simulation scripts, scoring rubrics, and debrief frameworks ready for execution across local chapters.",
    },
  ];

  return (
    <div className="relative">
      {/* -------------------------------- 1. HERO (HOME) -------------------------------- */}
      <section id="hero" className="relative overflow-hidden bg-white dark:bg-neutral-950 py-20 sm:py-28 lg:py-32 scroll-mt-20">
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-rise">
            {/* What is this platform? */}
            <div className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-neutral-100/90 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-200">
              <span className="size-2 rounded-full bg-neutral-900 dark:bg-neutral-100" aria-hidden />
              Enterprise Deep Tech Community Platform
            </div>

            {/* Powerful Headline */}
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.04] tracking-[-0.035em] text-neutral-900 dark:text-neutral-50">
              Where Frontier Builders Engineer the Future.
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl font-sans text-lg sm:text-xl font-normal leading-relaxed text-neutral-700 dark:text-neutral-300">
              Deep Tech Community is a professional, member-governed network connecting 12,400+ students, engineers, researchers, founders, and executives across AI, Quantum Computing, Cybersecurity, and Space Technology.
            </p>

            {/* Two Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button href="/join" variant="primary" size="lg">
                Join Community
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="/events" variant="outline" size="lg">
                Explore Events
              </Button>
            </div>

            {/* Lightweight Horizontal Stats Strip */}
            <div className="mt-10 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-neutral-200/80 pt-8 dark:border-neutral-800/80">
              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
                  <CountUp end={12400} suffix="+" />
                </span>
                <span className="mt-1 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-400">
                  Verified Members
                </span>
              </div>

              <div className="hidden sm:block h-8 w-px bg-neutral-200/90 dark:bg-neutral-800/90" aria-hidden />

              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
                  4
                </span>
                <span className="mt-1 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-400">
                  Deep Tech Domains
                </span>
              </div>

              <div className="hidden sm:block h-8 w-px bg-neutral-200/90 dark:bg-neutral-800/90" aria-hidden />

              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
                  <CountUp end={3} />
                </span>
                <span className="mt-1 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-400">
                  Regional Hubs
                </span>
              </div>

              <div className="hidden sm:block h-8 w-px bg-neutral-200/90 dark:bg-neutral-800/90" aria-hidden />

              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
                  <CountUp end={24} suffix="+" />
                </span>
                <span className="mt-1 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-400">
                  Annual Symposia
                </span>
              </div>
            </div>
          </div>

          {/* Revolving Orbital Graphic (Shifted Further Upward) */}
          <HeroOrbits className="animate-rise lg:-mt-20 xl:-mt-28 relative z-10" />
        </Container>

        {/* Live Ticker Strip */}
        <ActivityTicker />
      </section>

      {/* ------------------- 2. TECHNOLOGIES ------------------- */}
      <section id="technologies" className="relative py-20 sm:py-28 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/40 scroll-mt-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="01 — Deep Tech Taxonomy"
              title="Four Frontiers. Zero Distractions."
              description="We deliberately restrict our focus to four deep tech domains. Each track provides technical learning roadmaps, active research circles, and peer-reviewed code bases."
              action={{ label: "View Taxonomy", href: "/technologies" }}
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {DOMAIN_LIST.map((d, i) => {
              const Icon = d.icon;
              const page = TECH_PAGES[d.slug];
              return (
                <Reveal key={d.slug} delay={i * 100}>
                  <Card hover className="group flex h-full flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="grid size-10 place-items-center rounded-md border border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
                          <Icon className={cx("size-5", d.animClass)} strokeWidth={1.8} />
                        </span>
                        <Badge>[{d.short}]</Badge>
                      </div>

                      <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-50">
                        <Link href={`/technologies/${d.techSlug}`}>{d.name}</Link>
                      </h3>
                      <p className="mt-1 font-sans text-sm font-semibold text-neutral-800 dark:text-neutral-200">{d.tagline}</p>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">{d.description}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-neutral-200/80 pt-4 font-mono text-xs dark:border-neutral-800">
                      <span className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">{page.facts[0].value} Members</span>
                      <Button href={`/technologies/${d.techSlug}`} variant="ghost" size="sm">
                        Roadmap <ArrowUpRight className="size-3.5" />
                      </Button>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ------------------- 3. NEWS ------------------- */}
      <section id="news" className="relative py-20 sm:py-28 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-950 scroll-mt-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="02 — Technical Briefings"
              title="Practitioner Analysis & Research"
              description="Rigorous technical reporting and paper breakdowns authored by scientists and systems engineers."
              action={{ label: "All Briefings", href: "/news" }}
            />
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Reveal delay={100}>
              <Card hover className="group flex h-full flex-col justify-between overflow-hidden p-0">
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <DomainBadge domain={featuredArticle.domain} />
                    <span className="rounded-md border border-neutral-700 bg-neutral-950/90 px-2.5 py-1 font-mono text-xs font-bold text-neutral-100 backdrop-blur-md">
                      {featuredArticle.date}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-50">
                      <Link href={`/news/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-neutral-200/80 pt-4 font-sans text-xs font-semibold text-neutral-800 dark:border-neutral-800 dark:text-neutral-200">
                    <div className="flex items-center gap-2">
                      <Avatar name={featuredArticle.author} className="size-7 text-xs font-bold" />
                      <span className="font-semibold text-neutral-900 dark:text-neutral-50">{featuredArticle.author}</span>
                    </div>
                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{featuredArticle.readingTime} min read</span>
                  </div>
                </div>
              </Card>
            </Reveal>

            <div className="flex flex-col gap-4">
              {latestArticles.map((a, i) => (
                <Reveal key={a.slug} delay={150 + i * 80}>
                  <Card hover className="group p-4 sm:p-5">
                    <div className="flex items-center gap-4">
                      {/* 64x64px Square Thumbnail Visual */}
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-100 dark:bg-neutral-900 shadow-xs">
                        {a.image ? (
                          <img
                            src={a.image}
                            alt={a.title}
                            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center font-mono text-xs font-bold text-neutral-400">
                            DTS
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <DomainBadge domain={a.domain} />
                          <span className="font-mono text-xs font-semibold text-neutral-500 dark:text-neutral-400">{a.date}</span>
                        </div>
                        <h4 className="mt-1.5 font-display text-sm sm:text-base font-bold leading-snug tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-50 line-clamp-2">
                          <Link href={`/news/${a.slug}`}>{a.title}</Link>
                        </h4>
                        <p className="mt-1 font-sans text-xs font-medium text-neutral-500 dark:text-neutral-400">
                          By {a.author} · {a.readingTime} min
                        </p>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------- 4. EVENTS ------------------- */}
      <section id="events" className="relative py-20 sm:py-28 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/40 scroll-mt-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="03 — Symposia & Labs"
              title="Upcoming Gatherings & Workshops"
              description="Practitioner-led conferences, hands-on security labs, and research reading groups. Free for all verified members."
              action={{ label: "All Events", href: "/events" }}
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {upcomingEvents.map((e, i) => (
              <Reveal key={e.slug} delay={i * 100}>
                <Card hover className="group flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-20 shrink-0 rounded-xl border border-neutral-300 bg-neutral-100 p-2.5 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                        <p className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">{e.date.split(" ")[0]}</p>
                        <p className="mt-0.5 font-display text-2xl font-extrabold text-neutral-900 dark:text-neutral-50">{e.date.split(" ")[1]?.replace(",", "")}</p>
                      </div>
                      <Badge className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700">{e.type}</Badge>
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold leading-snug tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-50">
                      <Link href={`/events/${e.slug}`}>{e.title}</Link>
                    </h3>
                    <div className="mt-3.5 space-y-1.5 font-sans text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      <p className="flex items-center gap-2">
                        <Calendar className="size-4 text-neutral-900 dark:text-neutral-100" /> {e.date} · {e.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="size-4 text-neutral-900 dark:text-neutral-100" /> {e.venue}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
                    <div className="flex gap-1">
                      {e.domains.slice(0, 2).map((dm) => (
                        <DomainBadge key={dm} domain={dm} />
                      ))}
                    </div>
                    <Button href={`/events/${e.slug}`} variant="ghost" size="sm">
                      Details <ArrowRight className="size-3" />
                    </Button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------- 5. COMMUNITY ------------------- */}
      <section id="community" className="relative py-20 sm:py-28 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-950 scroll-mt-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="04 — Member Knowledge Exchange"
              title="Featured Community Posts"
              description="Articles, open projects, and technical debriefs shared directly by verified community members."
              action={{ label: "Open Forum", href: "/community" }}
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURED_POSTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <Card hover className="group flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={p.author} className="size-8 text-xs font-bold" />
                        <div>
                          <p className="font-display text-sm font-bold text-neutral-900 dark:text-neutral-50">{p.author}</p>
                          <p className="font-mono text-xs font-semibold text-neutral-800 dark:text-neutral-200">{p.role}</p>
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-4 font-display text-base font-bold leading-snug tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-50">
                      <Link href="/community">{p.title}</Link>
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">{p.excerpt}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
                    <DomainBadge domain={p.domain} />
                    <Badge>{p.kind}</Badge>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------- 6. CHAPTERS ------------------- */}
      <section id="chapters" className="relative py-20 sm:py-28 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/40 scroll-mt-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="05 — Regional Hubs"
              title="Global Network, Regional Rooms"
              description="In-person meetups, hands-on SOC labs, and university reading groups run in local time zones by chapter leads."
              action={{ label: "All Chapters", href: "/chapters" }}
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.slug} delay={i * 100}>
                <Card hover className="group flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl" role="img" aria-label={c.country}>
                          {c.flag}
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                          {c.country} <span className="font-mono text-xs font-semibold text-neutral-500">[{c.code}]</span>
                        </h3>
                      </div>
                      <Badge className="font-sans text-xs font-semibold">{c.members.toLocaleString()} Members</Badge>
                    </div>
                    <p className="mt-2 font-sans text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300">{c.city}</p>
                    <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">{c.blurb}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <Button href={`/chapters/${c.slug}`} variant="outline" size="sm" className="w-full font-sans font-semibold text-xs sm:text-sm">
                      Explore Chapter <ArrowUpRight className="size-3.5" />
                    </Button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------- 7. ABOUT / CTA ------------------- */}
      <section id="about" className="relative py-20 sm:py-28 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-950 scroll-mt-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-10 text-center text-neutral-50 shadow-2xl sm:p-16">
              <Eyebrow className="text-neutral-300">Apply for Access</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-neutral-50">
                Join 12,400+ Deep Tech Builders Worldwide
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-base sm:text-lg leading-relaxed text-neutral-300 font-normal">
                Free membership for students, engineers, researchers, founders, and educators. Direct access to technical roadmaps, regional symposia, and active project channels.
              </p>
              
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 relative z-10">
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-neutral-950 hover:bg-neutral-100 px-6.5 h-12.5 font-sans text-sm sm:text-base font-bold shadow-lg transition-all duration-200 active:scale-95"
                >
                  Join Community
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-neutral-900/90 text-white hover:bg-neutral-800 hover:border-white px-6.5 h-12.5 font-sans text-sm sm:text-base font-bold shadow-sm transition-all duration-200 active:scale-95"
                >
                  View Membership Tiers
                </Link>
              </div>

              {/* Animated Live Member Counter */}
              <div className="mt-6 flex items-center justify-center gap-2 font-sans text-xs font-semibold text-neutral-400">
                <span className="size-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-pulse" aria-hidden />
                12,400+ verified members across 38 countries
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

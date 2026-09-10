import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Layers, Cpu, Shield, BookOpen, Users, MessageSquare, Newspaper, Globe } from "lucide-react";
import { Container, Eyebrow, SectionHeading, DomainBadge, Avatar, Button, Card, Badge, Tag, cx } from "@/components/ui";
import { ActivityTicker } from "@/components/orbits";
import { CinematicHero } from "@/components/hero-cinematic";
import { FrontiersExperience } from "@/components/frontiers-experience";
import { Reveal, RevealHeading, RevealText, RevealVisual, RevealStagger, RevealItem, CountUp } from "@/components/reveal";
import { DOMAIN_LIST, STATS, CHAPTERS } from "@/data/core";
import { TECH_PAGES } from "@/data/technologies";
import { ARTICLES } from "@/data/news";
import { EVENTS, isUpcomingEvent } from "@/data/events";
import { SafeImage } from "@/components/safe-image";
import type { DomainSlug } from "@/data/core";

export default function HomePage() {
  const featuredArticle = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const latestArticles = ARTICLES.filter((a) => a.slug !== featuredArticle.slug).slice(0, 3);
  const upcomingEvents = EVENTS.filter((e) => isUpcomingEvent(e.date));

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
      author: "Tomohiro Sato",
      role: "AI Governance Lead · Penang",
      kind: "Project",
      domain: "governance" as DomainSlug,
      title: "Open-source automated model compliance & auditing dashboard",
      excerpt: "A lightweight, debuggable data stack built on SQLite and server-rendered dashboards designed for EU AI Act compliance logging.",
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
      <CinematicHero />

      {/* ------------------- 2. TECHNOLOGIES (PROMPT 05 REDESIGN) ------------------- */}
      <FrontiersExperience />

      {/* ------------------- 3. NEWS ------------------- */}
      <section id="news" className="relative py-20 sm:py-28 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-950 scroll-mt-20">
        <Container>
          <RevealHeading>
            <SectionHeading
              eyebrow="04 / NEWSLETTER"
              title="THE FRONTIER BRIEF"
              description="Research, technical perspectives and important developments across frontier technology."
              action={{ label: "All Briefings", href: "/news" }}
            />
          </RevealHeading>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <RevealVisual delay={100}>
              <Card hover className="group flex h-full flex-col justify-between overflow-hidden p-0">
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-900">
                  <SafeImage
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
                    <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 font-medium">
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
            </RevealVisual>

            <RevealStagger className="flex flex-col gap-4" delay={150}>
              {latestArticles.map((a) => (
                <RevealItem key={a.slug}>
                  <Card hover className="group p-4 sm:p-5">
                    <div className="flex items-center gap-4">
                      {/* 64x64px Square Thumbnail Visual */}
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-100 dark:bg-neutral-900 shadow-xs">
                        {a.image ? (
                          <SafeImage
                            src={a.image}
                            alt={a.title}
                            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center font-mono text-xs font-bold text-neutral-300">
                            DTS
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <DomainBadge domain={a.domain} />
                          <span className="font-mono text-xs font-semibold text-neutral-400 dark:text-neutral-200">{a.date}</span>
                        </div>
                        <h4 className="mt-1.5 font-display text-sm sm:text-base font-bold leading-snug tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-50 line-clamp-2">
                          <Link href={`/news/${a.slug}`}>{a.title}</Link>
                        </h4>
                        <p className="mt-1 font-sans text-xs font-medium text-neutral-400 dark:text-neutral-200">
                          By {a.author} · {a.readingTime} min
                        </p>
                      </div>
                    </div>
                  </Card>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </Container>
      </section>

      {/* ------------------- 4. EVENTS ------------------- */}
      <section id="events" className="relative py-20 sm:py-28 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/40 scroll-mt-20">
        <Container>
          <RevealHeading>
            <SectionHeading
              eyebrow="03 — Symposia & Labs"
              title="Upcoming Gatherings & Workshops"
              description="Practitioner-led conferences, hands-on security labs, and research reading groups. Free for all verified members."
              action={{ label: "All Events", href: "/events" }}
            />
          </RevealHeading>

          {upcomingEvents.length > 0 ? (
            <RevealStagger className="grid gap-6 md:grid-cols-3">
              {upcomingEvents.map((e) => (
                <RevealItem key={e.slug}>
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
                </RevealItem>
              ))}
            </RevealStagger>
          ) : (
            <RevealVisual>
              <div className="rounded-2xl border border-neutral-300/80 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-950/50 p-12 text-center backdrop-blur-md">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-200">
                  NO UPCOMING EVENTS
                </p>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  New gatherings and technical sessions will appear here.
                </p>
              </div>
            </RevealVisual>
          )}
        </Container>
      </section>

      {/* ------------------- 5. COMMUNITY ------------------- */}
      <section id="community" className="relative py-20 sm:py-28 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-950 scroll-mt-20">
        <Container>
          <RevealHeading>
            <SectionHeading
              eyebrow="04 — Member Knowledge Exchange"
              title="Featured Community Posts"
              description="Articles, open projects, and technical debriefs shared directly by verified community members."
              action={{ label: "Open Forum", href: "/community" }}
            />
          </RevealHeading>

          <RevealStagger className="grid gap-6 md:grid-cols-3">
            {FEATURED_POSTS.map((p) => (
              <RevealItem key={p.title}>
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
                    <p className="mt-2.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 font-medium">{p.excerpt}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
                    <DomainBadge domain={p.domain} />
                    <Badge>{p.kind}</Badge>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* ------------------- 6. CHAPTERS ------------------- */}
      <section id="chapters" className="relative py-20 sm:py-28 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-neutral-900/40 scroll-mt-20">
        <Container>
          <RevealHeading>
            <SectionHeading
              eyebrow="05 — Regional Hubs"
              title="Global Network, Regional Rooms"
              description="In-person meetups, hands-on SOC labs, and university reading groups run in local time zones by chapter leads."
              action={{ label: "All Chapters", href: "/chapters" }}
            />
          </RevealHeading>

          <RevealStagger className="grid gap-6 md:grid-cols-3">
            {CHAPTERS.map((c) => (
              <RevealItem key={c.slug}>
                <Card hover className="group flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl" role="img" aria-label={c.country}>
                          {c.flag}
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                          {c.country} <span className="font-mono text-xs font-semibold text-neutral-400">[{c.code}]</span>
                        </h3>
                      </div>
                      <Badge className="font-sans text-xs font-semibold">Regional Hub</Badge>
                    </div>
                    <p className="mt-2 font-sans text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-200">{c.city}</p>
                    <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-200 font-medium">{c.blurb}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <Button href={`/chapters/${c.slug}`} variant="outline" size="sm" className="w-full font-sans font-semibold text-xs sm:text-sm">
                      Explore Chapter <ArrowUpRight className="size-3.5" />
                    </Button>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* ------------------- 7. ABOUT / CTA ------------------- */}
      <section id="about" className="relative py-20 sm:py-28 border-t border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-950 scroll-mt-20">
        <Container>
          <RevealVisual>
            <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-10 text-center text-neutral-50 shadow-2xl sm:p-16">
              <Eyebrow className="text-neutral-300">Apply for Access</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-neutral-50">
                Join Frontier Builders Worldwide
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-base sm:text-lg leading-relaxed text-white font-medium">
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
              <div className="mt-6 flex items-center justify-center gap-2 font-sans text-xs font-semibold text-neutral-300">
                <span className="size-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-pulse" aria-hidden />
                Practitioner-led global deep tech network
              </div>
            </div>
          </RevealVisual>
        </Container>
      </section>
    </div>
  );
}

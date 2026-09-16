import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Eyebrow, SectionHeading, Button, Card } from "@/components/ui";
import { CinematicHero } from "@/components/hero-cinematic";
import { FrontiersExperience } from "@/components/frontiers-experience";
import { NewsletterSection } from "@/components/newsletter-section";
import { EventsSection } from "@/components/events-section";
import { RevealHeading, RevealVisual, RevealStagger, RevealItem } from "@/components/reveal";
import { CHAPTERS } from "@/data/core";

export default function HomePage() {
  return (
    <div className="relative">
      {/* -------------------------------- 1. HERO (HOME) -------------------------------- */}
      <CinematicHero />

      {/* ------------------- 2. TECHNOLOGIES (PROMPT 05 REDESIGN) ------------------- */}
      <FrontiersExperience />

      {/* ------------------- 3. NEWSLETTER ------------------- */}
      <NewsletterSection />

      {/* ------------------- 4. EVENTS ------------------- */}
      <EventsSection />

      {/* ------------------- 5. COMMUNITY ------------------- */}
      <section id="community" className="relative py-16 sm:py-20 border-t border-border/90 bg-surface scroll-mt-20">
        <Container>
          <RevealHeading>
            <SectionHeading
              eyebrow="Community Forum"
              title="Community Posts"
              description="Articles, open projects, and technical debriefs shared directly by community members."
              action={{ label: "Open Forum", href: "/community" }}
            />
          </RevealHeading>

          <RevealVisual>
            <div className="rounded-2xl border border-border/80 bg-surface/50 p-12 text-center backdrop-blur-md">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-body">
                NO COMMUNITY POSTS YET
              </p>
              <p className="mt-2 text-sm text-body-soft">
                Articles, open projects and technical debriefs shared by members will appear here.
              </p>
            </div>
          </RevealVisual>
        </Container>
      </section>

      {/* ------------------- 6. CHAPTERS ------------------- */}
      <section id="chapters" className="relative py-16 sm:py-20 border-t border-border/90 bg-card/40 scroll-mt-20">
        <Container>
          <RevealHeading>
            <SectionHeading
              eyebrow="Regional Chapters"
              title="Global Network, Regional Rooms"
              description="Regional chapters connect members in their own cities and time zones."
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
                        <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-primary">
                          {c.country}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-2 font-sans text-xs sm:text-sm font-semibold text-body">{c.city}</p>
                    <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-body font-medium">{c.blurb}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
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
      <section id="about" className="relative py-20 sm:py-28 border-t border-border/90 bg-surface scroll-mt-20">
        <Container>
          <RevealVisual>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-10 text-center text-primary shadow-2xl sm:p-16">
              <Eyebrow className="text-body-soft">Open Membership</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-primary">
                Join Frontier Builders Worldwide
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-base sm:text-lg leading-relaxed text-primary font-medium">
                Membership is free and open to students, engineers, researchers, founders, and educators. Direct access to technical roadmaps, regional symposia, and active project channels.
              </p>
              
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 relative z-10">
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-on-inverted hover:bg-inverted px-6.5 h-12.5 font-sans text-sm sm:text-base font-bold shadow-lg transition-all duration-200 active:scale-95"
                >
                  Join Community
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <p className="mt-6 font-sans text-xs font-semibold text-body-soft">
                Practitioner-led global deep tech network
              </p>
            </div>
          </RevealVisual>
        </Container>
      </section>
    </div>
  );
}

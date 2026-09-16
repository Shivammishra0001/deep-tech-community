import { Container, SectionHeading } from "@/components/ui";
import { CinematicHero } from "@/components/hero-cinematic";
import { FrontiersExperience } from "@/components/frontiers-experience";
import { NewsletterSection } from "@/components/newsletter-section";
import { EventsSection } from "@/components/events-section";
import { ChaptersSection } from "@/components/chapters-section";
import { JoinSection } from "@/components/join-section";
import { RevealHeading, RevealVisual } from "@/components/reveal";

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
      <ChaptersSection />

      {/* ------------------- 7. JOIN ------------------- */}
      <JoinSection />
    </div>
  );
}

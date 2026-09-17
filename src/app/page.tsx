import { CinematicHero } from "@/components/hero-cinematic";
import { FrontiersExperience } from "@/components/frontiers-experience";
import { NewsletterSection } from "@/components/newsletter-section";
import { EventsSection } from "@/components/events-section";
import { CommunitySection } from "@/components/community-section";
import { ChaptersSection } from "@/components/chapters-section";
import { JoinSection } from "@/components/join-section";

export default function HomePage() {
  return (
    <div className="relative">
      <CinematicHero />
      <FrontiersExperience />
      <NewsletterSection />
      <EventsSection />
      <CommunitySection />
      <ChaptersSection />
      <JoinSection />
    </div>
  );
}

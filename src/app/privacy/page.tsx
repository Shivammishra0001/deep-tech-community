import { Container, PageHero, Card } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Deep Tech Community",
  description: "How Deep Tech Community handles member data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Enterprise Governance" title="Privacy Policy" description="Direct, transparent data handling practices. Last updated January 2026." />
      <Container className="max-w-3xl py-16">
        <Card className="space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <section>
            <h2 className="font-display text-lg font-semibold text-neutral-900 dark:text-neutral-100">1. Data Collection Scope</h2>
            <p className="mt-2">
              Upon joining, we record your name, institutional email, primary domain, and chapter preference. Technical publications and comments posted are linked to your profile. We operate without behavioral ad networks, tracking pixels, or third-party data brokers.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-neutral-900 dark:text-neutral-100">2. Usage &amp; Communication</h2>
            <p className="mt-2">
              Your registered email address is utilized solely for event invitations, chapter technical digests, and member authentication. We do not monetize member records or share data with sponsors.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-neutral-900 dark:text-neutral-100">3. Data Export &amp; Erasure</h2>
            <p className="mt-2">
              Members may request a complete data export or account erasure by contacting privacy@globaldeeptech.society. Erasure requests are completed within 30 days.
            </p>
          </section>
        </Card>
      </Container>
    </>
  );
}

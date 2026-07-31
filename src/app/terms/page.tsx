import { Container, PageHero, Card } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Deep Tech Community",
  description: "The terms of membership for Deep Tech Community.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Enterprise Governance" title="Terms & Conditions" description="Operational guidelines and member responsibilities. Last updated January 2026." />
      <Container className="max-w-3xl py-16">
        <Card className="space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <section>
            <h2 className="font-display text-lg font-semibold text-neutral-900 dark:text-neutral-100">1. Membership & Code of Ethics</h2>
            <p className="mt-2">
              Membership is free and non-transferable. Members agree to adhere to community ethics guidelines, responsible security disclosure standards, and academic integrity across all technical tracks.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-neutral-900 dark:text-neutral-100">2. Intellectual Property</h2>
            <p className="mt-2">
              Authors retain ownership of all original work published on the platform. By posting, authors grant the Society a non-exclusive license to host and index published technical articles within member archives.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-semibold text-neutral-900 dark:text-neutral-100">3. Responsible Research Conduct</h2>
            <p className="mt-2">
              Cybersecurity and post-quantum techniques discussed within Society labs are intended exclusively for authorized systems and supervised educational environments. Unauthorized exploitation of third-party systems is grounds for immediate expulsion.
            </p>
          </section>
        </Card>
      </Container>
    </>
  );
}

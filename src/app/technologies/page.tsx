import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, PageHero, Card, Button } from "@/components/ui";
import { DOMAIN_LIST } from "@/data/core";
import { TECH_PAGES } from "@/data/technologies";
import type { Metadata } from "next";
import { RevealStagger, RevealItem } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Technologies | Deep Tech Society",
  description:
    "Our deep tech domains — artificial intelligence, quantum computing, cybersecurity, and AI governance — each with a learning roadmap, resources, and an active community.",
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Deep Tech Taxonomy"
        title="Core Pillars of Engineering."
        description="We focus strictly on frontier technologies. Each domain contains technical roadmaps, open libraries, practitioner circles, and regional symposia."
      />
      <Container className="py-8 sm:py-10">
        <RevealStagger className="grid gap-6 md:grid-cols-2">
          {DOMAIN_LIST.map((d, i) => {
            const Icon = d.icon;
            const page = TECH_PAGES[d.slug];
            return (
              <RevealItem key={d.slug}>
                <Card hover className="group flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-lg border border-neutral-700 bg-neutral-800 text-primary">
                        <Icon className="size-5" />
                      </span>
                    </div>

                    <h2 className="mt-4 font-display text-2xl font-bold tracking-tight group-hover:underline text-primary">
                      <Link href={`/technologies/${d.techSlug}`}>{d.name}</Link>
                    </h2>
                    <p className="mt-1.5 font-sans text-sm font-semibold text-neutral-200">{d.tagline}</p>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-300">{d.description}</p>
                  </div>

                  <div>
                    <div className="mt-6 grid grid-cols-3 divide-x border-t pt-4 font-mono text-xs divide-border border-border/80">
                      {page.facts.map((f) => (
                        <div key={f.label} className="text-center first:pl-0 last:pr-0">
                          <p className="font-bold text-primary">{f.value}</p>
                          <p className="mt-0.5 text-[10px] text-neutral-300">{f.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-border">
                      <Button href={`/technologies/${d.techSlug}`} variant="outline" size="sm" className="w-full">
                        Explore Roadmap <ArrowUpRight className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </Container>
    </>
  );
}


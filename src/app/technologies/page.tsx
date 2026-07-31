import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, PageHero, Card, Badge, DomainBadge, Button } from "@/components/ui";
import { DOMAIN_LIST } from "@/data/core";
import { TECH_PAGES } from "@/data/technologies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technologies | Deep Tech Society",
  description:
    "Our four deep tech domains — artificial intelligence, quantum computing, cybersecurity, and space technology — each with a learning roadmap, resources, and an active community.",
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Deep Tech Taxonomy"
        title="Four Core Pillars of Engineering."
        description="We focus strictly on four frontiers. Each domain contains technical roadmaps, open libraries, practitioner circles, and regional symposia."
      />
      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {DOMAIN_LIST.map((d, i) => {
            const Icon = d.icon;
            const page = TECH_PAGES[d.slug];
            return (
              <Card key={d.slug} hover className="group flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-md border border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-xs font-semibold text-neutral-400">0{i + 1}</span>
                    </div>
                    <Badge>[{d.short}]</Badge>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-100">
                    <Link href={`/technologies/${d.techSlug}`}>{d.name}</Link>
                  </h2>
                  <p className="mt-1 font-mono text-xs text-neutral-500">{d.tagline}</p>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{d.description}</p>
                </div>

                <div>
                  <div className="mt-6 grid grid-cols-3 divide-x divide-neutral-200 border-t border-neutral-200/80 pt-4 font-mono text-xs dark:divide-neutral-800 dark:border-neutral-800/80">
                    {page.facts.map((f) => (
                      <div key={f.label} className="text-center first:pl-0 last:pr-0">
                        <p className="font-bold text-neutral-900 dark:text-neutral-100">{f.value}</p>
                        <p className="mt-0.5 text-[10px] text-neutral-400">{f.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <Button href={`/technologies/${d.techSlug}`} variant="outline" size="sm" className="w-full">
                      Explore Roadmap <ArrowUpRight className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
}

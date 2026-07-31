import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  FileText,
  GraduationCap,
  Terminal,
  Layers,
  Globe,
  BookMarked,
} from "lucide-react";
import { Container, PageHero, Eyebrow, Card, Button, Badge } from "@/components/ui";
import { DOMAIN_LIST } from "@/data/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | Deep Tech Society",
  description:
    "The Deep Tech Society learning hub — roadmaps, free courses, research papers, books, tools, cheat sheets, documentation, and recommended sites, curated by track mentors.",
};

const COURSES = [
  { title: "CS231n: Deep Learning for Computer Vision", org: "Stanford", duration: "~40 hrs", level: "Intermediate" },
  { title: "Introduction to Quantum Information", org: "QuantaForge Institute", duration: "~25 hrs", level: "Beginner" },
  { title: "Practical Ethical Hacking Fundamentals", org: "Community Lab Series", duration: "~30 hrs", level: "Beginner" },
  { title: "Spacecraft Dynamics & Control", org: "Open Courseware", duration: "~35 hrs", level: "Advanced" },
];

const PAPERS = [
  { title: "Attention Is All You Need", meta: "Vaswani et al. · NeurIPS 2017", domain: "AI" },
  { title: "Surface Code Quantum Error Correction", meta: "Fowler et al. · PRA 2012", domain: "Quantum" },
  { title: "CRYSTALS-Kyber Specification", meta: "Avanzi et al. · NIST PQC 2021", domain: "Cyber" },
  { title: "CubeSat Design Specification Rev 14", meta: "Cal Poly · 2020", domain: "Space" },
];

const BOOKS = [
  { title: "Deep Learning", meta: "Goodfellow, Bengio & Courville" },
  { title: "Quantum Computation and Quantum Information", meta: "Nielsen & Chuang" },
  { title: "The Web Application Hacker's Handbook", meta: "Stuttard & Pinto" },
  { title: "Spacecraft Systems Engineering", meta: "Fortescue, Swinerd & Stark" },
];

const TOOLS = [
  { title: "Qiskit", meta: "Quantum circuit SDK & simulators" },
  { title: "PyTorch", meta: "Deep learning framework" },
  { title: "Wireshark", meta: "Network protocol analysis" },
  { title: "SatNOGS", meta: "Open satellite ground station network" },
];

function ResourceList({
  icon: Icon,
  title,
  note,
  items,
}: {
  icon: typeof BookOpen;
  title: string;
  note: string;
  items: { title: string; meta: string }[];
}) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-md border border-neutral-200 bg-neutral-100 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
          <Icon className="size-4" aria-hidden />
        </span>
        <div>
          <h2 className="font-display text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{title}</h2>
          <p className="font-mono text-[10px] uppercase text-neutral-400">{note}</p>
        </div>
      </div>
      <ul className="mt-4 divide-y divide-neutral-100 dark:divide-neutral-800/80">
        {items.map((item, i) => (
          <li key={item.title} className="flex items-baseline gap-3 py-2.5">
            <span className="w-5 shrink-0 font-mono text-[10px] text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-xs text-neutral-900 dark:text-neutral-100">{item.title}</p>
              <p className="mt-0.5 font-mono text-[10px] text-neutral-500">{item.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Curated Literature"
        title="Technical Learning Hub."
        description="Comprehensive literature, canonical papers, open-source tooling, and technical roadmaps verified by track leads."
      />
      <Container className="space-y-12 py-16">
        {/* Roadmaps */}
        <section>
          <div className="mb-6 flex items-center justify-between border-b border-neutral-200/80 pb-3 dark:border-neutral-800/80">
            <Eyebrow>Domain Roadmaps</Eyebrow>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DOMAIN_LIST.map((d) => {
              const Icon = d.icon;
              return (
                <Card key={d.slug} hover className="group flex flex-col justify-between">
                  <div>
                    <span className="grid size-8 place-items-center rounded-md border border-neutral-200 bg-neutral-100 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <p className="mt-3 font-display text-sm font-semibold tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-100">
                      {d.name}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-neutral-400">Sequential Track →</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <Button href={`/technologies/${d.techSlug}#roadmap`} variant="ghost" size="sm" className="w-full">
                      View Roadmap <ArrowUpRight className="size-3" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Resource Grids */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ResourceList
            icon={GraduationCap}
            title="Open Courses"
            note="Full length, open access"
            items={COURSES.map((c) => ({ title: c.title, meta: `${c.org} · ${c.duration} · ${c.level}` }))}
          />
          <ResourceList
            icon={FileText}
            title="Canonical Papers"
            note="Foundational reading"
            items={PAPERS.map((p) => ({ title: p.title, meta: `${p.meta} · ${p.domain}` }))}
          />
          <ResourceList icon={BookMarked} title="Technical Texts" note="Recommended textbooks" items={BOOKS} />
          <ResourceList icon={Terminal} title="Developer Tools" note="Verified open-source SDKs" items={TOOLS} />
        </div>
      </Container>
    </>
  );
}

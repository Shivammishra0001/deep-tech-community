import Link from "next/link";
import { ArrowRight, MapPin, Users, Calendar } from "lucide-react";
import { Container, PageHero, Avatar, Eyebrow, Card, Button, Badge } from "@/components/ui";
import { CHAPTERS } from "@/data/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chapters | Deep Tech Society",
  description:
    "Deep Tech Society local chapters — India, Singapore, and Malaysia. In-person meetups, workshops, and study circles run by local organizers.",
};

export function RegionalMapSchematic() {
  return (
    <div className="relative mb-12 overflow-hidden rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-md shadow-sm">

      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-300">
            REGIONAL NETWORK SCHEMATIC · APAC NODES
          </span>
        </div>
        <span className="font-mono text-[10px] font-semibold text-neutral-400 uppercase hidden sm:inline">
          LAT 1.3521° N — 20.5937° N
        </span>
      </div>

      {/* Geometric SVG Schematic Map */}
      <div className="relative aspect-[21/9] w-full max-w-4xl mx-auto flex items-center justify-center">
        <svg viewBox="0 0 900 400" className="size-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="mapArc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#71717a" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a1a1aa" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#52525b" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Grid Latitude & Longitude Lines */}
          <g className="stroke-neutral-300/60 dark:stroke-neutral-800/80" strokeWidth="1" strokeDasharray="4 6">
            <line x1="50" y1="100" x2="850" y2="100" />
            <line x1="50" y1="200" x2="850" y2="200" />
            <line x1="50" y1="300" x2="850" y2="300" />
            <line x1="200" y1="30" x2="200" y2="370" />
            <line x1="450" y1="30" x2="450" y2="370" />
            <line x1="700" y1="30" x2="700" y2="370" />
          </g>

          {/* Abstract World / Asia Geometric Polygons */}
          <g className="fill-none stroke-neutral-400/40 dark:stroke-neutral-700/50" strokeWidth="1.5">
            {/* Europe / Eurasia outline */}
            <polygon points="120,80 280,70 340,110 300,160 220,150 140,110" />
            {/* Asia continent schematic */}
            <polygon points="360,60 620,50 780,120 720,220 540,210 400,160" />
            {/* India subcontinent schematic */}
            <polygon points="410,175 480,170 510,245 445,290 395,230" className="stroke-neutral-500/80 dark:stroke-neutral-500/90" strokeWidth="1.8" />
            {/* Southeast Asia & Malaysia schematic */}
            <polygon points="560,210 630,220 660,270 590,285 540,250" className="stroke-neutral-500/80 dark:stroke-neutral-500/90" strokeWidth="1.8" />
            {/* Australia schematic */}
            <polygon points="680,270 820,260 840,340 710,350" />
          </g>

          {/* Network Arcs connecting India -> Malaysia -> Singapore */}
          <g className="fill-none" stroke="url(#mapArc)" strokeWidth="2" strokeDasharray="6 4">
            <path d="M 445 250 Q 525 210 610 270" />
            <path d="M 610 270 Q 625 280 640 295" />
            <path d="M 445 250 Q 540 330 640 295" />
          </g>

          {/* ---------------- REGIONAL NODE 1: INDIA (IN) ---------------- */}
          <g transform="translate(445, 250)">
            <circle r="18" className="fill-neutral-400/20 dark:fill-neutral-500/15 animate-ping" />
            <circle r="8" className="fill-white stroke-neutral-800 dark:fill-neutral-950 dark:stroke-neutral-200" strokeWidth="2.5" />
            <circle r="3" className="fill-neutral-800 dark:fill-neutral-200" />
            <text x="14" y="-12" className="fill-neutral-900 dark:fill-neutral-50 font-mono text-[11px] font-bold">
              INDIA [IN]
            </text>
            <text x="14" y="2" className="fill-neutral-500 font-mono text-[9px]">
              4,200 Members
            </text>
          </g>

          {/* ---------------- REGIONAL NODE 2: MALAYSIA (MY) ---------------- */}
          <g transform="translate(610, 270)">
            <circle r="16" className="fill-neutral-400/20 dark:fill-neutral-500/15 animate-ping" />
            <circle r="7" className="fill-white stroke-neutral-700 dark:fill-neutral-950 dark:stroke-neutral-300" strokeWidth="2.5" />
            <circle r="2.5" className="fill-neutral-700 dark:fill-neutral-300" />
            <text x="12" y="-10" className="fill-neutral-900 dark:fill-neutral-50 font-mono text-[11px] font-bold">
              MALAYSIA [MY]
            </text>
            <text x="12" y="4" className="fill-neutral-500 font-mono text-[9px]">
              1,100 Members
            </text>
          </g>

          {/* ---------------- REGIONAL NODE 3: SINGAPORE (SG) ---------------- */}
          <g transform="translate(640, 295)">
            <circle r="16" className="fill-neutral-400/20 dark:fill-neutral-500/15 animate-ping" />
            <circle r="7" className="fill-white stroke-neutral-700 dark:fill-neutral-950 dark:stroke-neutral-300" strokeWidth="2.5" />
            <circle r="2.5" className="fill-neutral-700 dark:fill-neutral-300" />
            <text x="12" y="14" className="fill-neutral-900 dark:fill-neutral-50 font-mono text-[11px] font-bold">
              SINGAPORE [SG]
            </text>
            <text x="12" y="26" className="fill-neutral-500 font-mono text-[9px]">
              1,800 Members
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function ChaptersPage() {
  return (
    <>
      <PageHero
        eyebrow="Global Network"
        title="Regional Research & Engineering Hubs."
        description="Chapters operate in-person in local time zones, led by regional organizers. Network hubs maintain local research autonomy while connecting to global technical roadmaps."
      />
      <Container className="py-16">
        <RegionalMapSchematic />

        <div className="grid gap-6 lg:grid-cols-3">
          {CHAPTERS.map((c) => (
            <Card key={c.slug} hover className="group flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-3xl" role="img" aria-label={c.country}>
                    {c.flag}
                  </span>
                  <Badge>[{c.code}]</Badge>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-50">
                  <Link href={`/chapters/${c.slug}`}>{c.country}</Link>
                </h2>
                <p className="mt-1.5 flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  <MapPin className="size-4 text-neutral-900 dark:text-neutral-100" aria-hidden /> {c.city}
                </p>
                <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">{c.blurb}</p>

                <div className="mt-5 space-y-2 border-t border-neutral-100 pt-4 font-sans text-xs sm:text-sm font-medium text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                  <p className="flex items-center gap-2">
                    <Users className="size-4 text-neutral-900 dark:text-neutral-100" aria-hidden />
                    {c.members.toLocaleString()} Members · Est. {c.founded}
                  </p>
                  <p className="flex items-center gap-2 truncate">
                    <Calendar className="size-4 text-neutral-900 dark:text-neutral-100" aria-hidden />
                    Next: {c.events[0]?.title}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
                <div className="flex -space-x-1.5">
                  {c.leads.slice(0, 3).map((l) => (
                    <Avatar key={l.name} name={l.name} className="size-7 text-[9px]" />
                  ))}
                </div>
                <Button href={`/chapters/${c.slug}`} variant="ghost" size="sm">
                  Visit <ArrowRight className="size-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Expandability note */}
        <Card className="mt-12 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <Eyebrow>Expansion Protocols</Eyebrow>
            <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Establish a Chapter in Your City
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              We expand deliberately — driven by committed lead organizers. If you can organize monthly technical labs and gather ten builders, we supply the infrastructure and global platform.
            </p>
          </div>
          <Button href="/about#contact" variant="primary" size="md">
            Propose Chapter
          </Button>
        </Card>
      </Container>
    </>
  );
}

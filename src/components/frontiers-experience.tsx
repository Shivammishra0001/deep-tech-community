"use client";

import Link from "next/link";
import { ArrowUpRight, Cpu, Zap, ShieldCheck, Scale } from "lucide-react";
import { Container } from "@/components/ui";
import { SafeImage } from "@/components/safe-image";
import { RevealHeading, RevealStagger, RevealItem } from "@/components/reveal";
import { DOMAINS } from "@/data/core";

const FRONTIERS = [
  {
    slug: "artificial-intelligence",
    title: "AI",
    subtitle: "ARTIFICIAL INTELLIGENCE",
    description: "Machines that reason, learn and create.",
    tagline: "Foundation models, test-time compute, reasoning frameworks, and autonomous agents.",
    icon: Cpu,
    image: DOMAINS.ai.image,
    href: "/technologies/artificial-intelligence",
  },
  {
    slug: "quantum-computing",
    title: "QUANTUM",
    subtitle: "QUANTUM COMPUTING",
    description: "Computation beyond classical limits.",
    tagline: "Qubits, quantum error correction, fault-tolerant algorithms, and QKD networking.",
    icon: Zap,
    image: DOMAINS.quantum.image,
    href: "/technologies/quantum-computing",
  },
  {
    slug: "cybersecurity",
    title: "CYBERSECURITY",
    subtitle: "CYBERSECURITY & ZERO TRUST",
    description: "Defending the digital frontier.",
    tagline: "Post-quantum cryptography, zero-trust architectures, SOC simulation, and threat research.",
    icon: ShieldCheck,
    image: DOMAINS.cybersecurity.image,
    href: "/technologies/cybersecurity",
  },
  {
    slug: "ai-governance",
    title: "AI GOVERNANCE",
    subtitle: "AI GOVERNANCE & SAFETY",
    description: "Building trustworthy systems for an AI-powered world.",
    tagline: "Algorithmic auditability, EU AI Act compliance stacks, safety evaluations, and policy trees.",
    icon: Scale,
    href: "/technologies/ai-governance",
    image: DOMAINS.governance.image,
  },
];

/**
 * Internal hairlines for the 2x2 plate, by index. The four panels share one
 * bordered surface rather than floating as separate cards, so the dividers
 * live on the panels themselves: bottom rules between stacked panels on
 * mobile, and a cross at md where the composition becomes 2x2.
 */
const EDGES = [
  "border-b border-border hover:border-accent-border md:border-r",
  "border-b border-border hover:border-accent-border",
  "border-b border-border hover:border-accent-border md:border-b-0 md:border-r",
  "",
];

export function FrontiersExperience() {
  return (
    <section
      id="technologies"
      className="relative scroll-mt-20 border-t border-border bg-background py-20 text-primary sm:py-24 lg:py-28"
    >
      <Container>
        {/* ── SECTION HEADER ───────────────────────────────────────────────
            Eyebrow, headline and standfirst use the hero's typography so the
            two sections read as one system. */}
        <RevealHeading>
          <div className="border-b border-border pb-10 sm:pb-12">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-secondary sm:text-[12px]">
              01 / TECHNOLOGIES
            </p>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <h2
                className="font-sans font-semibold uppercase tracking-[-0.015em] text-primary
                           text-[clamp(1.875rem,7vw,2.25rem)]
                           sm:text-[clamp(2.25rem,5vw,2.75rem)]
                           lg:text-[3rem] lg:tracking-[-0.022em]
                           leading-[1.08]"
              >
                TECHNOLOGIES
              </h2>

              <p className="max-w-[420px] font-sans text-[15px] font-medium leading-[1.65] text-secondary sm:text-base lg:pb-1.5">
                Exploring the technologies shaping tomorrow. Built by people, for people, at the
                frontier.
              </p>
            </div>
          </div>
        </RevealHeading>

        {/* ── THE FOUR TECHNOLOGY PANELS ───────────────────────────────────
            One surface divided by hairlines, not four detached cards. */}
        <RevealStagger
          className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card sm:mt-14 md:grid-cols-2"
          staggerDelay={110}
        >
          {FRONTIERS.map((f, i) => {
            const Icon = f.icon;
            return (
              <RevealItem key={f.slug} className="flex" distance={16}>
                <Link
                  href={f.href}
                  className={`group relative flex w-full flex-col transition-colors duration-300 ${EDGES[i]}`}
                >
                  {/* Image band. The photograph is desaturated and held well
                      below the type, then dissolved into the panel colour so
                      it reads as a plate rather than a thumbnail. */}
                  <div
                    className="relative h-40 w-full overflow-hidden bg-surface sm:h-44 lg:h-52"
                    aria-hidden="true"
                  >
                    <SafeImage
                      src={f.image}
                      alt=""
                      className="size-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] [filter:saturate(var(--photo-saturate))_brightness(var(--photo-brightness))] [opacity:var(--photo-opacity)] group-hover:[opacity:var(--photo-opacity-hover)]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg, rgba(var(--card-rgb),0) 0%, rgba(var(--card-rgb),0.3) 58%, rgba(var(--card-rgb),0.88) 88%, var(--color-card) 100%)",
                      }}
                    />
                  </div>

                  <div className="relative flex flex-1 flex-col px-7 pb-8 pt-7 sm:px-9 sm:pb-10 sm:pt-8 lg:px-10 lg:pb-11">
                    {/* Full technology name, kept quiet above the short form. */}
                    <p className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
                      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                      {f.subtitle}
                    </p>

                    <h3 className="mt-4 font-sans text-[22px] font-semibold uppercase leading-[1.1] tracking-[-0.015em] text-primary sm:text-[26px] lg:text-[28px]">
                      {f.title}
                    </h3>

                    <p className="mt-4 max-w-[38ch] font-sans text-[15px] font-medium leading-[1.55] text-secondary sm:text-base lg:text-[17px]">
                      {f.description}
                    </p>

                    <p className="mt-3 max-w-[48ch] font-sans text-[13px] font-medium leading-[1.7] text-secondary sm:text-sm">
                      {f.tagline}
                    </p>

                    <span className="mt-auto flex items-center gap-2 pt-8 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-secondary transition-colors duration-300 group-hover:text-accent sm:pt-10">
                      EXPLORE
                      <ArrowUpRight className="size-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  {/* Hover wash — a silver breath over the panel, nothing more. */}
                  <span className="pointer-events-none absolute inset-0 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-[0.022]" />
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </Container>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Zap, ShieldCheck, Scale } from "lucide-react";
import { Container } from "@/components/ui";

const FRONTIERS = [
  {
    num: "01",
    slug: "artificial-intelligence",
    title: "AI",
    subtitle: "ARTIFICIAL INTELLIGENCE",
    description: "Machines that reason, learn and create.",
    tagline: "Foundation models, test-time compute, reasoning frameworks, and autonomous agents.",
    icon: Cpu,
    href: "/technologies/artificial-intelligence",
  },
  {
    num: "02",
    slug: "quantum-computing",
    title: "QUANTUM",
    subtitle: "QUANTUM COMPUTING",
    description: "Computation beyond classical limits.",
    tagline: "Qubits, quantum error correction, fault-tolerant algorithms, and QKD networking.",
    icon: Zap,
    href: "/technologies/quantum-computing",
  },
  {
    num: "03",
    slug: "cybersecurity",
    title: "CYBERSECURITY",
    subtitle: "CYBERSECURITY & ZERO TRUST",
    description: "Defending the digital frontier.",
    tagline: "Post-quantum cryptography, zero-trust architectures, SOC simulation, and threat research.",
    icon: ShieldCheck,
    href: "/technologies/cybersecurity",
  },
  {
    num: "04",
    slug: "ai-governance",
    title: "AI GOVERNANCE",
    subtitle: "AI GOVERNANCE & SAFETY",
    description: "Building trustworthy systems for an AI-powered world.",
    tagline: "Algorithmic auditability, EU AI Act compliance stacks, safety evaluations, and policy trees.",
    icon: Scale,
    href: "/technologies/ai-governance",
  },
];

export function FrontiersExperience() {
  return (
    <section id="technologies" className="relative bg-[#050505] text-white scroll-mt-20 border-t border-neutral-900">

      {/* ── SECTION HEADER ── */}
      <div className="border-b border-neutral-900 bg-[#070707] py-10 sm:py-12">
        <Container className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              TECHNOLOGIES
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm sm:text-base font-medium leading-relaxed text-neutral-300">
            Exploring the technologies shaping tomorrow.
            Built by people, for people, at the frontier.
          </p>
        </Container>
      </div>

      {/* ── FOUR TECHNOLOGY CARDS GRID ── */}
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-900 border border-neutral-900 rounded-2xl overflow-hidden">
          {FRONTIERS.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col justify-between bg-[#0A0A0A] p-8 sm:p-10 hover:bg-[#111111] transition-colors duration-300"
              >
                {/* Number + Icon row */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">
                    {f.num}
                  </span>
                  <span className="grid size-10 place-items-center rounded-xl border border-neutral-800 bg-neutral-900 text-white group-hover:border-neutral-600 transition-colors">
                    <Icon className="size-5" />
                  </span>
                </div>

                {/* Title + description */}
                <div className="mt-6">
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 font-sans text-base font-semibold text-white">
                    {f.description}
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-300">
                    {f.tagline}
                  </p>
                </div>

                {/* Explore link */}
                <Link
                  href={f.href}
                  className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white border-b border-neutral-700 pb-0.5 hover:border-white transition-colors w-fit"
                >
                  Explore {f.title}
                  <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

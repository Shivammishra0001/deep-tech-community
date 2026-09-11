import Link from "next/link";
import { ArrowRight, Mail, ShieldCheck, Globe, Terminal, Radio, Cpu, Zap, Scale } from "lucide-react";
import { Container, Eyebrow, SectionHeading, Card, Button } from "@/components/ui";
import type { Metadata } from "next";
import { SafeImage } from "@/components/safe-image";
import { RevealHeading, RevealVisual, RevealStagger, RevealItem } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About | Deep Tech Community",
  description:
    "An open, practitioner-focused technical community for engineers, researchers, and builders across AI, Quantum Computing, Cybersecurity, and AI Governance.",
};

const TECHNOLOGIES = [
  {
    num: "01",
    name: "Artificial Intelligence",
    short: "AI",
    description: "Foundation models, neural architectures, reasoning frameworks, and autonomous agent systems.",
    icon: Cpu,
    href: "/technologies/artificial-intelligence",
  },
  {
    num: "02",
    name: "Quantum Computing",
    short: "Quantum",
    description: "Quantum algorithms, error mitigation, post-classical compute, and quantum networking.",
    icon: Zap,
    href: "/technologies/quantum-computing",
  },
  {
    num: "03",
    name: "Cybersecurity",
    short: "Cybersecurity",
    description: "Post-quantum cryptography, zero-trust infrastructure, systems hardening, and security research.",
    icon: ShieldCheck,
    href: "/technologies/cybersecurity",
  },
  {
    num: "04",
    name: "AI Governance",
    short: "AI Governance",
    description: "Algorithmic auditability, safety evaluation benchmarks, risk frameworks, and policy alignment.",
    icon: Scale,
    href: "/technologies/ai-governance",
  },
];

const PRINCIPLES = [
  {
    num: "01",
    title: "Rigor over hype",
    text: "We discuss what is real, reproducible, and verifiable. Deep technology moves fast enough without exaggeration or marketing noise.",
    icon: ShieldCheck,
  },
  {
    num: "02",
    title: "Knowledge in the open",
    text: "Technical talks, notes, roadmaps, and research summaries are shared freely. What one person learns, the whole community learns.",
    icon: Globe,
  },
  {
    num: "03",
    title: "Builders welcome",
    text: "Students shipping their first experiment sit beside principal engineers. Curiosity, dedication, and technical craft matter most.",
    icon: Terminal,
  },
  {
    num: "04",
    title: "Local roots, global reach",
    text: "Study circles and workshops run in local time zones with local organizers, while connecting to a collaborative global network.",
    icon: Radio,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Opening Statement */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden />
        <Container className="relative pt-6 pb-6 sm:pt-7 sm:pb-7 lg:pt-8 lg:pb-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="animate-rise">
              <Eyebrow>About the Community</Eyebrow>
              <h1 className="mt-2.5 sm:mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-neutral-900 dark:text-neutral-50">
                A Community, Not a Social Feed.
              </h1>
              <p className="mt-3 sm:mt-3.5 max-w-xl font-sans text-[15px] sm:text-[16px] font-medium leading-relaxed text-neutral-700 dark:text-neutral-200">
                Deep Tech Community is an open, practitioner-led platform connecting engineers, scientists, and builders across core technology frontiers. We exist to exchange deep technical insights, review research, and collaborate without noise.
              </p>
            </div>
            <RevealVisual delay={150}>
              <div className="relative overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-800 shadow-sm">
                <SafeImage
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
                  alt="Deep Tech Community members collaborating"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            </RevealVisual>
          </div>
        </Container>
      </section>

      {/* 2. Mission & Vision */}
      <Container className="py-8 sm:py-10">
        <RevealStagger className="grid gap-6 md:grid-cols-2">
          <RevealItem>
            <Card className="h-full p-6 sm:p-7">
              <Eyebrow>Mission</Eyebrow>
              <h3 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-neutral-900 dark:text-neutral-50">
                Make deep tech knowledge accessible to anyone with the discipline to learn it.
              </h3>
              <p className="mt-3 font-sans text-sm font-medium leading-relaxed text-neutral-600 dark:text-neutral-300">
                We remove the barriers that keep talented individuals out of hard technology: access to honest guidance, direct peer connection with practitioners, and a collaborative environment where rigorous questions are welcomed.
              </p>
            </Card>
          </RevealItem>

          <RevealItem>
            <Card className="h-full p-6 sm:p-7">
              <Eyebrow>Vision</Eyebrow>
              <h3 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-neutral-900 dark:text-neutral-50">
                An open ecosystem where frontier breakthroughs are built and understood collaboratively.
              </h3>
              <p className="mt-3 font-sans text-sm font-medium leading-relaxed text-neutral-600 dark:text-neutral-300">
                A connected global network with regional study circles, open technical libraries, and transparent knowledge sharing across core domains.
              </p>
            </Card>
          </RevealItem>
        </RevealStagger>
      </Container>

      {/* 3. Technologies We Focus On */}
      <Container className="py-8 sm:py-10 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <RevealHeading>
          <SectionHeading
            eyebrow="Core Domains"
            title="Technologies We Focus On"
            description="Our discussions, reading groups, and technical roadmaps are strictly organized around frontier technology pillars."
          />
        </RevealHeading>
        <RevealStagger className="grid gap-5 sm:grid-cols-2">
          {TECHNOLOGIES.map((tech) => {
            const Icon = tech.icon;
            return (
              <RevealItem key={tech.num}>
                <Link href={tech.href} className="group block h-full">
                  <Card hover className="h-full flex flex-col justify-between p-6 sm:p-7 transition-colors">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="grid size-10 place-items-center rounded-lg border border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50">
                          <Icon className="size-5" />
                        </span>
                        <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-300">{tech.num}</span>
                      </div>
                      <h4 className="mt-4 font-display text-xl font-bold tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-50">
                        {tech.name}
                      </h4>
                      <p className="mt-2 font-sans text-sm font-medium leading-relaxed text-neutral-600 dark:text-neutral-300">
                        {tech.description}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center gap-1.5 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      <span>Explore Track</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </Container>

      {/* 4. Operating Principles */}
      <Container className="py-8 sm:py-10 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <RevealHeading>
          <SectionHeading
            eyebrow="Community Values"
            title="Operating Principles"
            description="The shared commitments that guide our technical discussions, documentation, and events."
          />
        </RevealHeading>
        <RevealStagger className="grid gap-5 sm:grid-cols-2">
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <RevealItem key={p.num}>
                <Card hover className="group flex flex-col justify-between p-6 sm:p-7 h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-lg border border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-300">{p.num}</span>
                    </div>

                    <h4 className="mt-4 font-display text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                      {p.title}
                    </h4>
                    <p className="mt-2 font-sans text-sm font-medium leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {p.text}
                    </p>
                  </div>
                </Card>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </Container>

      {/* 5. Participate & Contact */}
      <Container className="py-8 sm:py-12 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <RevealStagger className="grid gap-6 md:grid-cols-2">
          <RevealItem>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 text-neutral-50 shadow-sm">
              <div>
                <Eyebrow className="text-neutral-300">Get Involved</Eyebrow>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
                  Join Verified Builders & Researchers
                </h3>
                <p className="mt-3 font-sans text-sm font-medium leading-relaxed text-neutral-300">
                  Whether you are a researcher, software engineer, student, or founder, the community is free and open. Participate in workshops, share your projects, and exchange ideas with peers.
                </p>
              </div>
              <div className="mt-6">
                <Button href="/join" variant="primary" size="md" className="bg-white text-neutral-950 hover:bg-neutral-200 font-bold">
                  Apply for Membership <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <Card id="contact" className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <Eyebrow>Contact & Inquiries</Eyebrow>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                  Get in Touch
                </h3>
                <p className="mt-3 font-sans text-sm font-medium leading-relaxed text-neutral-600 dark:text-neutral-300">
                  For questions about community programs, organizing local study sessions, or technical contributions, reach out directly.
                </p>
              </div>
              <div className="mt-6 border-t border-neutral-200/80 pt-4 dark:border-neutral-800 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900">
                  <Mail className="size-4 text-neutral-700 dark:text-neutral-200" aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">community@dyau.ai</p>
                  <p className="font-sans text-xs text-neutral-500">General community inquiries & submissions</p>
                </div>
              </div>
            </Card>
          </RevealItem>
        </RevealStagger>
      </Container>
    </>
  );
}

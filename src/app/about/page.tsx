import Link from "next/link";
import { ArrowRight, HandHeart, Mail, MapPin, ShieldCheck, Globe, Terminal, Radio } from "lucide-react";
import { Container, Eyebrow, SectionHeading, Avatar, Card, Button, Badge, cx } from "@/components/ui";
import { TEAM, PARTNERS, VALUES } from "@/data/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Deep Tech Community",
  description:
    "The mission, vision, team, and partners behind Deep Tech Community — plus how to volunteer or contact us.",
};

export default function AboutPage() {
  return (
    <>
      {/* Opening statement */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden />
        <Container className="relative py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="animate-rise">
              <Eyebrow>About the Community</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">
                A Community, Not a Social Feed.
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                Deep Tech Community began in 2023 as a fourteen-person meetup in Bengaluru. It is now a 12,400-member enterprise network across 38 countries — member-run, free to join, and strictly focused on scientific and engineering rigor.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-neutral-300 dark:border-neutral-700">
              <img
                src="/images/community.jpg"
                alt="Members at a Deep Tech Society summit"
                className="aspect-[4/3] w-full object-cover"
              />
              <p className="absolute bottom-3 left-3 rounded-sm border border-neutral-700 bg-neutral-950/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-200 backdrop-blur-sm">
                Summit 2025 · Singapore
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & vision */}
      <Container className="grid gap-6 py-16 md:grid-cols-2">
        <Card>
          <Eyebrow>Mission</Eyebrow>
          <p className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-neutral-900 dark:text-neutral-100">
            Make deep tech knowledge accessible to anyone with the discipline to learn it.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            We remove the three barriers that keep talented individuals out of hard technology: access to honest guidance, access to practitioners, and access to a room where rigorous questions are welcome.
          </p>
        </Card>

        <Card>
          <Eyebrow>Vision</Eyebrow>
          <p className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-neutral-900 dark:text-neutral-100">
            A world where the next breakthrough is as likely to come from a study circle as from a well-funded lab.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            Regional chapters in every technology hub, open technical libraries, and a seamless pipeline from first workshop to published paper — governed by members.
          </p>
        </Card>
      </Container>

      {/* Values */}
      <Container className="pb-16">
        <SectionHeading eyebrow="Governance & Ethics" title="Four Operating Principles" />
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              num: "01",
              title: "Rigor over hype",
              text: "We discuss what is real, reproducible, and peer-reviewable. Deep tech moves fast enough without exaggeration.",
              icon: ShieldCheck,
              animClass: "animate-icon-cyber",
              badge: "VERIFIED PEER-REVIEW",
            },
            {
              num: "02",
              title: "Knowledge in the open",
              text: "Talks, notes, and roadmaps are shared with every member. What one person learns, everyone learns.",
              icon: Globe,
              animClass: "animate-icon-quantum",
              badge: "OPEN ACCESS",
            },
            {
              num: "03",
              title: "Builders welcome",
              text: "Students shipping their first project sit beside principal engineers. Titles matter less than curiosity.",
              icon: Terminal,
              animClass: "animate-icon-ai",
              badge: "PRACTITIONERS FIRST",
            },
            {
              num: "04",
              title: "Local roots, global reach",
              text: "Chapters run in-person, in local time, with local organisers — connected to a worldwide network.",
              icon: Radio,
              animClass: "animate-icon-space",
              badge: "38 CHAPTERS WORLDWIDE",
            },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title} hover className="group relative flex flex-col justify-between p-7">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-xl border border-neutral-300 bg-neutral-100 p-2.5 text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 transition-transform group-hover:scale-105">
                        <Icon className={cx("size-5.5", p.animClass)} strokeWidth={1.8} />
                      </span>
                      <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500">{p.num}</span>
                    </div>
                    <Badge className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700">
                      {p.badge}
                    </Badge>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-sm">
                    {p.text}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>

      {/* Team */}
      <section className="border-y border-neutral-200/80 bg-neutral-50/50 py-16 dark:border-neutral-800/80 dark:bg-neutral-950/50">
        <Container>
          <SectionHeading
            eyebrow="Leadership & Operations"
            title="Core Team & Track Leads"
            description="Supported by over 140 volunteer chapter organizers, lab leads, and peer reviewers worldwide."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((t) => (
              <Card key={t.name} className="flex items-start gap-4">
                <Avatar name={t.name} className="size-10" />
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{t.name}</p>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-neutral-500">{t.role}</p>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{t.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners */}
      <Container className="py-16">
        <SectionHeading
          eyebrow="Institutional Partners"
          title="Organizations Backing the Community"
          description="Knowledge-sharing agreements, lab access, and sponsored research seats without editorial compromise."
        />
        <div className="flex flex-wrap gap-3">
          {PARTNERS.map((p) => (
            <Badge key={p} className="px-4 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              {p}
            </Badge>
          ))}
        </div>
      </Container>

      {/* Volunteer + Contact */}
      <Container className="pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-between rounded-lg border border-neutral-300 bg-neutral-900 p-8 text-neutral-50 dark:border-neutral-700 dark:bg-neutral-950">
            <div>
              <HandHeart className="size-6 text-neutral-300" aria-hidden />
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">Become a Track Volunteer</h2>
              <p className="mt-3 text-xs leading-relaxed text-neutral-400">
                Every workshop, reading group, and paper summary is community-built. Roles open quarterly for event organizing, mentoring, reviewing, and chapter operations.
              </p>
            </div>
            <div className="mt-6">
              <Button href="/join" variant="primary" size="md" className="bg-neutral-100 text-neutral-950 hover:bg-white">
                Apply Through Membership <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>

          <Card id="contact" className="scroll-mt-24">
            <Eyebrow>Contact Us</Eyebrow>
            <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Reach the Executive Office</h2>
            <ul className="mt-4 space-y-4 text-xs">
              <li className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                  <Mail className="size-4 text-neutral-600 dark:text-neutral-400" aria-hidden />
                </span>
                <div>
                  <p className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">hello@globaldeeptech.society</p>
                  <p className="text-neutral-500">General inquiries, institutional partnerships, press</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                  <MapPin className="size-4 text-neutral-600 dark:text-neutral-400" aria-hidden />
                </span>
                <div>
                  <p className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">Hubs: Bengaluru · Singapore · Kuala Lumpur</p>
                  <p className="text-neutral-500">Visits by appointment on symposia days</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </Container>
    </>
  );
}

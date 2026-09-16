"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { StaggeredText } from "@/components/staggered-text";

export function CinematicHero() {
  const shouldReduceMotion = useReducedMotion();

  // Slow parallax drift on the content while the hero scrolls away.
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : -28]);

  // Secondary copy fades in as one block rather than word by word — the
  // per-word reveal is reserved for the headline so the entrance has a
  // single focal point.
  const fadeUp = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-background text-primary scroll-mt-20
                 flex items-center
                 min-h-[620px] py-24
                 sm:min-h-[680px]
                 lg:min-h-[760px] lg:py-28
                 xl:min-h-[820px]"
    >
      <HeroBackdrop />

      <Container className="relative z-10">
        <motion.div style={{ y: contentY }} className="max-w-[820px]">
          {/* Eyebrow */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-muted"
          >
            01 / FRONTIER NETWORK
          </motion.p>

          {/* Headline — 64-72px at desktop, medium weight, held to a column
              width that breaks it across three lines instead of filling the
              viewport. */}
          <h1
            className="mt-6 sm:mt-7 max-w-[560px] md:max-w-[680px] lg:max-w-[760px] font-sans uppercase text-primary
                       text-[clamp(2.25rem,7.4vw,2.75rem)]
                       sm:text-[clamp(2.75rem,6.2vw,3.5rem)]
                       lg:text-[clamp(3.5rem,5vw,4.125rem)]
                       xl:text-[4.5rem]
                       font-medium leading-[1.12] sm:leading-[1.08] lg:leading-[1.06]
                       tracking-[-0.015em] lg:tracking-[-0.022em]"
          >
            <StaggeredText
              text="WHERE FRONTIER BUILDERS ENGINEER THE FUTURE."
              segmentBy="Words"
              staggerDirection="Forward"
              direction="Top"
              duration="0.7s"
              staggerDelay="0.045s"
            />
          </h1>

          {/* Supporting paragraph — secondary tone, narrow measure. */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-7 lg:mt-8 max-w-[520px] font-sans text-[15px] sm:text-base lg:text-[17px]
                       font-normal leading-[1.65] text-secondary"
          >
            A practitioner-led network for engineers, researchers, founders and students building
            what comes next.
          </motion.p>

          {/* Calls to action */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
            className="mt-10 lg:mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href="/join"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-primary px-7
                         font-sans text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.1em] text-background
                         transition-colors duration-200 hover:bg-white"
            >
              JOIN THE COMMUNITY
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/community"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg border border-border px-7
                         font-sans text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.1em] text-secondary
                         transition-colors duration-200 hover:border-border-strong hover:text-primary"
            >
              EXPLORE THE NETWORK
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

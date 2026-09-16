"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";
import { StaggeredText } from "@/components/staggered-text";

const GhostFibers = dynamic(() => import("@/components/GhostFibers"), {
  ssr: false,
});

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
      {/* ----------------- GHOSTFIBERS BACKGROUND VISUAL ----------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <GhostFibers
          lineColor="#896abd"
          glowColor="#3437A0"
          speed={0.2}
          scale={2}
          rotation={0}
          rotationSpeed={0.25}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2.2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
          dpr={1}
        />

        {/* Soft Radial Ambient Fog for Clean Readability */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_90%_at_50%_50%,rgba(5,5,5,0.75)_0%,rgba(5,5,5,0.4)_50%,rgba(5,5,5,0.85)_100%)]" />

        {/* Small screens: the copy spans the full width, so darken evenly. */}
        <div className="pointer-events-none absolute inset-0 md:hidden bg-[linear-gradient(180deg,rgba(5,5,5,0.55)_0%,rgba(5,5,5,0.68)_55%,rgba(5,5,5,0.82)_100%)]" />

        {/* From tablet up the type sits in a left column, so weight the scrim
            left and leave the fibers visible in the open space beside it. */}
        <div className="pointer-events-none absolute inset-0 hidden md:block bg-[linear-gradient(90deg,rgba(5,5,5,0.78)_0%,rgba(5,5,5,0.55)_38%,rgba(5,5,5,0.12)_72%,rgba(5,5,5,0)_100%)]" />

        {/* Hairline seam into the next section. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border" />
      </div>

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

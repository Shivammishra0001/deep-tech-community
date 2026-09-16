"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui";
import { StaggeredText } from "@/components/staggered-text";

const GhostFibers = dynamic(() => import("@/components/GhostFibers"), {
  ssr: false,
});

export function CinematicHero() {
  const shouldReduceMotion = useReducedMotion();

  // Scroll Parallax hooks
  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : -30]);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-background text-primary min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-center items-center scroll-mt-20 pt-16 sm:pt-20 pb-16 sm:pb-20"
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
      </div>

      <Container className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          style={{ y: headlineY }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-[860px] mx-auto"
        >
          {/* Refined 64–72px Desktop Headline with Medium/Regular Weight */}
          <h1 className="font-sans text-[34px] sm:text-[46px] md:text-[56px] lg:text-[66px] xl:text-[70px] font-medium leading-[1.08] tracking-[-0.025em] text-primary uppercase max-w-[820px] text-center">
            <StaggeredText
              text="WHERE FRONTIER BUILDERS ENGINEER THE FUTURE."
              segmentBy="Words"
              staggerDirection="Forward"
              direction="Top"
              duration="0.65s"
              staggerDelay="0.04s"
              className="text-center"
            />
          </h1>

          {/* Exact Supporting Paragraph with Balanced Breathing Space */}
          <p className="mt-6 sm:mt-7 max-w-[580px] font-sans text-[15px] sm:text-base lg:text-[18px] font-normal leading-relaxed text-neutral-300 text-center mx-auto">
            <StaggeredText
              text="A practitioner-led network for engineers, researchers, founders and students building what comes next."
              segmentBy="Words"
              staggerDirection="Forward"
              direction="Top"
              duration="0.5s"
              initialDelay="0.15s"
              staggerDelay="0.015s"
              className="text-center"
            />
          </p>

          {/* Clean, Premium CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Link
              href="/join"
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 sm:px-8 py-3.5 sm:py-4 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-950 transition-all duration-200 hover:bg-neutral-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <span>JOIN THE COMMUNITY</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/community"
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-neutral-700 bg-card/60 backdrop-blur-md px-7 sm:px-8 py-3.5 sm:py-4 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-800/80 active:scale-[0.98] cursor-pointer"
            >
              <span>EXPLORE THE NETWORK</span>
              <ChevronRight className="size-4 text-secondary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

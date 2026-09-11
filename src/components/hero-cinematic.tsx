"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui";
import { StaggeredText } from "@/components/staggered-text";

const AeroShards = dynamic(() => import("@/components/AeroShards"), {
  ssr: false,
});

export function CinematicHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const shouldReduceMotion = useReducedMotion();

  // Scroll Parallax hooks
  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : -30]);

  // Mouse Move listener for subtle 3D tilt on desktop
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || typeof window === "undefined" || window.innerWidth < 1024) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePos({ x, y });
    },
    [shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-[#050505] text-neutral-50 min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-center items-center scroll-mt-20 pt-16 sm:pt-20 pb-16 sm:pb-20"
    >
      {/* ----------------- AEROSHARDS BACKGROUND VISUAL ----------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <AeroShards
          backgroundColor="#050505"
          shardColor="#896abd"
          accentColor="#ffffff"
          placement="full"
          flow="stream"
          material="pearl"
          detail="balanced"
          effect="none"
          scale={1.15}
          spread={1}
          depth={1}
          speed={1.1}
          spin={1}
          interaction="repel"
          density={1.5}
          shardSize={1.2}
          stretch={1}
          turbulence={1}
          glow={1.2}
          edgeSoftness={1.5}
          bloom={0.5}
          grain={0.03}
          chromaticAberration={0.0075}
          transitionDuration={1}
          interactionRadius={1.5}
          interactionStrength={0.5}
          rippleIntensity={1}
          holdToGather={true}
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
          <h1 className="font-sans text-[34px] sm:text-[46px] md:text-[56px] lg:text-[66px] xl:text-[70px] font-medium leading-[1.08] tracking-[-0.025em] text-neutral-50 uppercase max-w-[820px] text-center">
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
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-neutral-700 bg-neutral-900/60 backdrop-blur-md px-7 sm:px-8 py-3.5 sm:py-4 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-800/80 active:scale-[0.98] cursor-pointer"
            >
              <span>EXPLORE THE NETWORK</span>
              <ChevronRight className="size-4 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

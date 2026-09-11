"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui";

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
      className="relative w-full overflow-hidden bg-[#050505] text-neutral-50 min-h-[76vh] lg:min-h-[82vh] max-h-[840px] pt-8 sm:pt-12 lg:pt-16 pb-16 lg:pb-24 flex flex-col justify-center scroll-mt-20 border-b border-neutral-900"
    >
      {/* ----------------- AEROSHARDS WEBGPU & CANVAS BACKGROUND ----------------- */}
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
          scale={1.1}
          spread={1}
          depth={1}
          speed={1.1}
          spin={1}
          interaction="repel"
          density={1.5}
          shardSize={1.15}
          stretch={1}
          turbulence={1}
          glow={1.2}
          edgeSoftness={1.5}
          bloom={0.5}
          grain={0.04}
          chromaticAberration={0.0075}
          transitionDuration={1}
          interactionRadius={1.5}
          interactionStrength={0.5}
          rippleIntensity={1}
          holdToGather={true}
        />

        {/* Hairline Grid & Subtle Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f14_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f14_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_30%_50%,transparent_40%,rgba(5,5,5,0.6)_100%)]" />
      </div>

      <Container className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
        {/* ----------------- LEFT (8 COLS): HEADLINE, COPY & CTAS ----------------- */}
        <motion.div
          style={{ y: headlineY }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-8 flex flex-col items-start max-w-[820px]"
        >
          {/* Refined Modern Editorial Headline */}
          <h1 className="font-sans text-[34px] sm:text-[46px] md:text-[54px] lg:text-[62px] xl:text-[68px] font-semibold leading-[1.02] tracking-[-0.02em] text-neutral-50 uppercase max-w-[800px]">
            WHERE FRONTIER <br className="hidden sm:inline" />
            BUILDERS ENGINEER <br className="hidden sm:inline" />
            THE FUTURE.
          </h1>

          {/* Exact Supporting Copy */}
          <p className="mt-4 sm:mt-6 max-w-[600px] font-sans text-[15px] sm:text-base lg:text-[18px] font-medium leading-relaxed text-neutral-200">
            A practitioner-led network for engineers, researchers, founders and students building what comes next.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/join"
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-6 sm:px-8 py-3.5 sm:py-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 transition-all duration-200 hover:bg-neutral-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <span>JOIN THE COMMUNITY</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/community"
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-neutral-700 bg-neutral-900/60 backdrop-blur-sm px-6 sm:px-8 py-3.5 sm:py-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-800/80 active:scale-[0.98] cursor-pointer"
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

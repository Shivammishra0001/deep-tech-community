"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Cpu, Zap, ShieldCheck, Scale, Compass } from "lucide-react";
import { Container, cx } from "@/components/ui";

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

/**
 * Multi-State 3D Morphing Canvas Visual for Desktop Scroll Experience
 */
function FrontiersCanvasVisual({ activeIndex, progress }: { activeIndex: number; progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const stateRef = useRef({ progress: 0, activeIndex: 0 });

  useEffect(() => {
    stateRef.current.progress = progress;
    stateRef.current.activeIndex = activeIndex;
  }, [progress, activeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 480);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle nodes for state morphing
    const NODE_COUNT = 54;
    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      return {
        // State 0: AI Neural Grid
        x0: Math.cos(angle * 3) * (110 + (i % 5) * 20),
        y0: Math.sin(angle * 2) * (110 + (i % 5) * 20),
        z0: Math.sin(angle * 4) * 60,

        // State 1: Quantum Probability Rings
        x1: Math.cos(angle) * (130 + (i % 3) * 35),
        y1: Math.sin(angle) * (60 + (i % 2) * 20),
        z1: Math.sin(angle) * 140,

        // State 2: Cybersecurity Lattice Topology
        x2: ((i % 7) - 3) * 55,
        y2: (Math.floor(i / 7) - 3.5) * 45,
        z2: ((i % 4) - 1.5) * 40,

        // State 3: AI Governance Decision Tree
        x3: (Math.sin(i * 1.7) * 160),
        y3: ((i / NODE_COUNT) - 0.5) * 280,
        z3: Math.cos(i * 1.7) * 80,

        // Render positions
        rx: 0, ry: 0, rz: 0,
        size: Math.random() * 1.8 + 1.2,
      };
    });

    let rotation = 0;

    const render = () => {
      rotation += 0.003;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 380;

      const idx = stateRef.current.activeIndex;
      const rawProg = stateRef.current.progress;
      // Normalized stage transition factor t [0..1] between consecutive states
      const t = Math.min(1, Math.max(0, (rawProg * 3) - idx));

      // Interpolate 3D coordinates across 4 states
      nodes.forEach((n) => {
        let tx = 0, ty = 0, tz = 0;

        if (idx === 0) {
          tx = n.x0 + (n.x1 - n.x0) * t;
          ty = n.y0 + (n.y1 - n.y0) * t;
          tz = n.z0 + (n.z1 - n.z0) * t;
        } else if (idx === 1) {
          tx = n.x1 + (n.x2 - n.x1) * t;
          ty = n.y1 + (n.y2 - n.y1) * t;
          tz = n.z1 + (n.z2 - n.z1) * t;
        } else if (idx === 2) {
          tx = n.x2 + (n.x3 - n.x2) * t;
          ty = n.y2 + (n.y3 - n.y2) * t;
          tz = n.z2 + (n.z3 - n.z2) * t;
        } else {
          tx = n.x3;
          ty = n.y3;
          tz = n.z3;
        }

        // Apply global 3D rotation
        const cosR = Math.cos(rotation), sinR = Math.sin(rotation);
        const xRot = tx * cosR - tz * sinR;
        const zRot = tx * sinR + tz * cosR;

        const scale = fov / (fov + zRot + 280);
        n.rx = cx + xRot * scale;
        n.ry = cy + ty * scale;
        n.rz = zRot;
      });

      // Draw interconnecting structural lines
      ctx.lineWidth = 1;
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const nA = nodes[i];
          const nB = nodes[j];
          const dist = Math.hypot(nA.rx - nB.rx, nA.ry - nB.ry);

          let maxDist = 85;
          if (idx === 1) maxDist = 110;
          if (idx === 2) maxDist = 75;
          if (idx === 3) maxDist = 95;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.38;
            ctx.strokeStyle = `rgba(235, 235, 240, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(nA.rx, nA.ry);
            ctx.lineTo(nB.rx, nB.ry);
            ctx.stroke();
          }
        }
      }

      // Draw projected nodes
      nodes.forEach((n) => {
        const opacity = Math.max(0.15, Math.min(0.9, (n.rz + 200) / 400));
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.rx, n.ry, n.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle Outer Guide Ring
      ctx.strokeStyle = `rgba(255, 255, 255, 0.08)`;
      ctx.setLineDash([3, 7]);
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(width, height) * 0.36, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="size-full block" />;
}

export function FrontiersExperience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rawProgress, setRawProgress] = useState(0);

  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress listener for pinned desktop experience
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setRawProgress(latest);
      // Map 0..1 progress to 0..3 index
      const idx = Math.min(3, Math.floor(latest * 4));
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const current = FRONTIERS[activeIndex];

  return (
    <section id="technologies" className="relative bg-[#050505] text-neutral-50 scroll-mt-20 border-t border-neutral-900">

      {/* ----------------- DESKTOP PINNED SCROLL EXPERIENCE (lg+) ----------------- */}
      <div ref={containerRef} className="hidden lg:block relative h-[360vh]">
        {/* Sticky viewport container */}
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
          {/* Subtle Background Grid */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f14_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f14_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* LEFT: TEXT CONTENT & DOMAIN INDICATOR */}
            <div className="flex flex-col items-start justify-center">

              {/* Section Label + Heading — always visible above domain */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-300">
                  <span className="size-1.5 rounded-full bg-neutral-100" />
                  01 / TECHNOLOGIES
                </div>
                <h2 className="mt-3 font-display text-3xl xl:text-4xl font-black uppercase tracking-tight text-white">
                  FOUR TECHNOLOGIES
                </h2>
              </div>

              {/* Very Large Monospace Domain Number */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.num}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-7xl xl:text-8xl font-black text-white tracking-tighter"
                >
                  {current.num}
                </motion.div>
              </AnimatePresence>

              {/* Large Sans-Serif Domain Title */}
              <AnimatePresence mode="wait">
                <motion.h3
                  key={current.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.28 }}
                  className="mt-2 font-display text-5xl xl:text-6xl font-black uppercase tracking-tight text-neutral-50"
                >
                  {current.title}
                </motion.h3>
              </AnimatePresence>

              {/* Domain Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.description}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className="mt-4 max-w-lg space-y-2"
                >
                  <p className="font-sans text-xl font-semibold text-white">
                    {current.description}
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-white">
                    {current.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Explore Link */}
              <div className="mt-8">
                <Link
                  href={current.href}
                  className="group inline-flex items-center gap-2.5 rounded-lg border border-neutral-700 bg-neutral-900/80 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-neutral-500 hover:bg-neutral-800 cursor-pointer shadow-xs"
                >
                  <span>EXPLORE {current.title} ROADMAP</span>
                  <ArrowUpRight className="size-4 text-neutral-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </Link>
              </div>

              {/* Step Progress Indicators */}
              <div className="mt-12 flex items-center gap-3">
                {FRONTIERS.map((f, i) => (
                  <div
                    key={f.num}
                    className={cx(
                      "h-1 rounded-full transition-all duration-300",
                      i === activeIndex ? "w-10 bg-white" : "w-3 bg-neutral-600"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: CONTINUOUS MORPHING 3D CANVAS VISUAL */}
            <div className="relative aspect-square w-full max-w-[460px] xl:max-w-[500px] mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-neutral-800/60 bg-neutral-950/40 pointer-events-none" />
              <div className="relative size-full min-h-[380px]">
                <FrontiersCanvasVisual activeIndex={activeIndex} progress={rawProgress} />
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* ----------------- MOBILE VERTICAL EDITORIAL STACK (< lg) ----------------- */}
      <div className="lg:hidden">
        <Container className="py-12 space-y-12 divide-y divide-neutral-900">

          {/* Section heading — mobile */}
          <div className="pb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-300">
              <span className="size-1.5 rounded-full bg-neutral-100" />
              01 / TECHNOLOGIES
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              FOUR TECHNOLOGIES
            </h2>
          </div>

          {FRONTIERS.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.num} className="pt-10 first:pt-0 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-4xl font-black text-neutral-300">{f.num}</span>
                  <span className="grid size-9 place-items-center rounded-lg border border-neutral-800 bg-neutral-900 text-white">
                    <Icon className="size-4" />
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-3xl font-black uppercase tracking-tight text-neutral-50">
                    {f.title}
                  </h3>
                  <p className="mt-2 font-sans text-base font-semibold text-white">
                    {f.description}
                  </p>
                  <p className="mt-1 font-sans text-xs leading-relaxed text-white">
                    {f.tagline}
                  </p>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 p-6 text-center">
                    <Icon className="size-8 text-neutral-300 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-300">
                      {f.subtitle}
                    </span>
                  </div>
                </div>

                <Link
                  href={f.href}
                  className="group inline-flex w-full items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-neutral-100 hover:border-neutral-600"
                >
                  <span>EXPLORE {f.title} ROADMAP</span>
                  <ArrowRight className="size-4 text-neutral-300 group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </Container>
      </div>
    </section>
  );
}

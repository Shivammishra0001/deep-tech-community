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
    <section id="technologies" className="relative bg-[#050505] text-white scroll-mt-20 border-t border-neutral-900">

      {/* ── SECTION HEADER ── */}
      <div className="border-b border-neutral-900 bg-[#070707] py-10 sm:py-12">
        <Container className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              FOUR TECHNOLOGIES
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

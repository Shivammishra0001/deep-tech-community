"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui";

/**
 * 3D Vertex Projection helper for the abstract deep tech visual structure
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
  label?: string;
}

interface Edge {
  a: number;
  b: number;
}

// Generate an abstract 3D nested geodesic / orbital wireframe structure representing the 4 frontiers
function createAbstractGeometry() {
  const points: Point3D[] = [];
  const edges: Edge[] = [];

  // Inner Core
  const t = (1 + Math.sqrt(5)) / 2;
  const scaleInner = 105;
  const rawInner = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];

  rawInner.forEach(([x, y, z]) => {
    const len = Math.hypot(x, y, z);
    points.push({
      x: (x / len) * scaleInner,
      y: (y / len) * scaleInner,
      z: (z / len) * scaleInner,
    });
  });

  // Connect inner core points within distance threshold
  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) {
      const dist = Math.hypot(
        points[i].x - points[j].x,
        points[i].y - points[j].y,
        points[i].z - points[j].z
      );
      if (dist < scaleInner * 1.35) {
        edges.push({ a: i, b: j });
      }
    }
  }

  // 4 Integrated Domain Nodes (AI, QUANTUM, CYBERSECURITY, AI GOVERNANCE)
  const DOMAIN_LABELS = ["AI", "QUANTUM", "CYBERSECURITY", "AI GOVERNANCE"];
  const domainOffset = points.length;
  const domainRadius = 200;

  DOMAIN_LABELS.forEach((label, idx) => {
    const angle = (idx / 4) * Math.PI * 2;
    points.push({
      x: Math.cos(angle) * domainRadius,
      y: Math.sin(angle) * domainRadius * 0.45,
      z: Math.sin(angle) * domainRadius * 0.7,
      label,
    });
  });

  // Connect Domain Nodes in an outer orbital ring
  for (let i = 0; i < 4; i++) {
    const next = (i + 1) % 4;
    edges.push({ a: domainOffset + i, b: domainOffset + next });
    edges.push({ a: domainOffset + i, b: i * 3 });
  }

  // Outer orbital rings
  const ringOffset = points.length;
  const ringCount = 30;
  const ringRadius = 250;
  for (let i = 0; i < ringCount; i++) {
    const angle = (i / ringCount) * Math.PI * 2;
    points.push({
      x: Math.cos(angle) * ringRadius,
      y: Math.sin(angle) * ringRadius * 0.35,
      z: Math.sin(angle) * ringRadius * 0.8,
    });
  }

  // Ring Edges
  for (let i = 0; i < ringCount; i++) {
    const next = (i + 1) % ringCount;
    edges.push({ a: ringOffset + i, b: ringOffset + next });
  }

  return { points, edges, domainOffset };
}

function CanvasAbstractVisual({ mousePos }: { mousePos: { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const rotRef = useRef({ rx: 0.25, ry: 0.45, rz: 0 });
  const targetRotRef = useRef({ rx: 0, ry: 0 });

  const geomRef = useRef(createAbstractGeometry());

  useEffect(() => {
    targetRotRef.current.rx = mousePos.y * 0.35;
    targetRotRef.current.ry = mousePos.x * 0.35;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 540);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 540);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const { points, edges } = geomRef.current;

    // Ambient computational particle field
    const particles = Array.from({ length: 42 }, () => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      z: (Math.random() - 0.5) * 400,
      size: Math.random() * 1.6 + 0.6,
      vy: (Math.random() - 0.5) * 0.2,
    }));

    const render = () => {
      rotRef.current.rx += (targetRotRef.current.rx - rotRef.current.rx) * 0.05 + 0.0015;
      rotRef.current.ry += (targetRotRef.current.ry - rotRef.current.ry) * 0.05 + 0.0022;
      rotRef.current.rz += 0.0006;

      const { rx, ry, rz } = rotRef.current;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 420;

      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const cosZ = Math.cos(rz), sinZ = Math.sin(rz);

      const project = (p: Point3D) => {
        let x1 = p.x * cosY + p.z * sinY;
        let y1 = p.y;
        let z1 = -p.x * sinY + p.z * cosY;

        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        const scale = fov / (fov + z3 + 300);
        return {
          sx: cx + x3 * scale,
          sy: cy + y3 * scale,
          z: z3,
          scale,
          label: p.label,
        };
      };

      const projectedPoints = points.map(project);

      // Render wireframe edges
      ctx.lineWidth = 1;
      edges.forEach(({ a, b }) => {
        const pA = projectedPoints[a];
        const pB = projectedPoints[b];

        const avgZ = (pA.z + pB.z) / 2;
        const opacity = Math.max(0.06, Math.min(0.75, (avgZ + 250) / 500));

        ctx.strokeStyle = `rgba(225, 225, 230, ${opacity.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(pA.sx, pA.sy);
        ctx.lineTo(pB.sx, pB.sy);
        ctx.stroke();
      });

      // Render projected 3D nodes & integrated domain labels
      projectedPoints.forEach((p, idx) => {
        const opacity = Math.max(0.15, Math.min(0.95, (p.z + 250) / 500));
        const radius = Math.max(1.5, 3 * p.scale);

        if (p.label) {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, radius + 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, radius + 7, 0, Math.PI * 2);
          ctx.stroke();

          ctx.font = "bold 9px 'JetBrains Mono', monospace";
          ctx.fillStyle = `rgba(240, 240, 245, ${opacity})`;
          ctx.fillText(`[ ${p.label} ]`, p.sx + 12, p.sy + 3);
        } else {
          ctx.fillStyle = idx < 12 ? `rgba(255, 255, 255, ${opacity})` : `rgba(170, 175, 185, ${opacity * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render background particle field
      particles.forEach((part) => {
        part.y += part.vy;
        if (part.y > 200) part.y = -200;
        if (part.y < -200) part.y = 200;

        const p = project(part);
        const opacity = Math.max(0.04, Math.min(0.35, (p.z + 250) / 500));

        ctx.fillStyle = `rgba(240, 240, 245, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, part.size * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Outer dashed orbital guide ring
      ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(width, height) * 0.38, 0, Math.PI * 2);
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

export function CinematicHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const shouldReduceMotion = useReducedMotion();

  // Scroll Parallax hooks
  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : -30]);
  const visualY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : 35]);
  const lightBeamX = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : 60]);

  // Mouse Move listener for subtle 3D tilt on desktop
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || window.innerWidth < 1024) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x: nx, y: ny });
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
      className="relative w-full overflow-hidden bg-[#050505] text-neutral-50 py-12 sm:py-16 lg:py-20 flex flex-col justify-center scroll-mt-20 border-b border-neutral-900 select-none"
    >
      {/* ----------------- ATMOSPHERIC LIGHTING & SUBTLE GRID ----------------- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {/* Hairline Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f14_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f14_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        {/* Restrained Cinematic Light Beam */}
        <motion.div
          style={{ x: lightBeamX }}
          className="absolute -top-1/4 -right-1/4 h-[140%] w-[110%] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05)_0%,rgba(180,190,210,0.015)_45%,transparent_75%)] blur-3xl pointer-events-none"
        />
      </div>

      <Container className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.15fr_0.85fr]">
        {/* ----------------- LEFT (~55%): HEADLINE, COPY & CTAS ----------------- */}
        <motion.div style={{ y: headlineY }} className="flex flex-col items-start max-w-2xl">
          {/* Technical Editorial Label */}
          <div className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
            01 / FRONTIER NETWORK
          </div>

          {/* Dominant Headline with 3-line balanced wrapping */}
          <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.6rem] font-black leading-[1.02] tracking-[-0.035em] text-neutral-50 uppercase">
            WHERE FRONTIER <br />
            BUILDERS ENGINEER <br />
            <span className="text-neutral-400">THE FUTURE.</span>
          </h1>

          {/* Exact Supporting Copy */}
          <p className="mt-4 max-w-lg font-sans text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-neutral-400">
            A practitioner-led network for engineers, researchers, founders and students building what comes next.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <Link
              href="/join"
              className="group inline-flex items-center gap-2 rounded-lg border border-white bg-white px-5.5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-neutral-950 transition-all duration-200 hover:bg-neutral-200 hover:border-neutral-200 shadow-md cursor-pointer"
            >
              <span>JOIN THE COMMUNITY</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/community"
              className="group inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-transparent px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-neutral-300 transition-all duration-200 hover:border-neutral-600 hover:text-white hover:bg-neutral-900/60 cursor-pointer"
            >
              <span>EXPLORE THE NETWORK</span>
              <ChevronRight className="size-3.5 text-neutral-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>
          </div>
        </motion.div>

        {/* ----------------- RIGHT (~45%): ABSTRACT SCIENTIFIC VISUAL ----------------- */}
        <motion.div
          style={{ y: visualY }}
          className="relative aspect-square w-full max-w-[480px] lg:max-w-[540px] xl:max-w-[580px] mx-auto flex items-center justify-center"
        >
          {/* Subtle Outer Frame Halo */}
          <div className="absolute inset-0 rounded-full border border-neutral-800/40 bg-radial from-neutral-900/20 to-transparent pointer-events-none" />

          {/* Interactive 3D Canvas Visual Engine */}
          <div className="relative size-full min-h-[360px] sm:min-h-[440px] lg:min-h-[500px]">
            <CanvasAbstractVisual mousePos={mousePos} />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

import { Brain, Atom, Shield, Scale } from "lucide-react";
import { cx } from "@/components/ui";

const DOMAIN_NODES = [
  { slug: "ai", name: "AI", icon: Brain, angle: 0, animClass: "animate-icon-ai" },
  { slug: "quantum", name: "QUANTUM", icon: Atom, angle: 90, animClass: "animate-icon-quantum" },
  { slug: "cybersecurity", name: "CYBERSECURITY", icon: Shield, angle: 180, animClass: "animate-icon-cyber" },
  { slug: "governance", name: "AI GOVERNANCE", icon: Scale, angle: 270, animClass: "animate-icon-governance" },
];

/**
 * Animated Orbital Graphic matching exact user reference design:
 * - Single master orbit rotation container guarantees 100% zero drift & zero card overlapping
 * - Central dark DTS core with "ADVANCING THE FUTURE THROUGH DEEP TECH"
 * - Concentric hairline guide rings (solid & dashed)
 * - 4 square domain cards (AI, QUANTUM, CYBERSECURITY, SPACE TECH) spaced 90° apart with generous room
 * - PERFECT UPRIGHT ALIGNMENT: Cards remain 100% upright & readable while orbiting
 * - Glowing white comet trail sparks traveling along concentric rings
 */
export function HeroOrbits({ className }: { className?: string }) {
  return (
    <div className={cx("relative mx-auto aspect-square w-full max-w-[480px] p-4", className)} aria-hidden>
      {/* Outer Glow Halo */}
      <div className="absolute inset-0 rounded-full bg-white/5 blur-3xl" />

      {/* Concentric Guide Rings */}
      <div className="absolute inset-[6%] rounded-full border border-border/80" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-border" />
      <div className="absolute inset-[30%] rounded-full border border-border/90" />
      <div className="absolute inset-[42%] rounded-full border border-dashed border-neutral-850/60" />

      {/* -------------------- REVOLVING COMET SPARKS -------------------- */}

      {/* Outer Ring Spark 1 */}
      <div
        className="absolute inset-[6%]"
        style={{ animation: "orbit 12s linear infinite" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="size-2 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.9)] bg-white shadow-[0_0_12px_#ffffff]" />
        </div>
      </div>

      {/* Inner Ring Spark 2 (Reverse) */}
      <div
        className="absolute inset-[18%]"
        style={{ animation: "orbit-rev 16s linear infinite" }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="size-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.6)] bg-neutral-200 shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>

      {/* Center Ring Spark 3 */}
      <div
        className="absolute inset-[30%]"
        style={{ animation: "orbit 20s linear infinite" }}
      >
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
          <div className="size-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.7)] bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>

      {/* -------------------- CENTER DTS CORE -------------------- */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-drift flex size-36 flex-col items-center justify-center rounded-full border text-center shadow-xl backdrop-blur-md border-border-strong/80 bg-surface/95">
          <span className="font-mono text-lg font-extrabold tracking-widest text-primary">
            DTC
          </span>
          <span className="mt-1 max-w-[105px] font-mono text-[8px] font-semibold uppercase leading-tight tracking-wider text-body-soft">
            Advancing the Future Through Deep Tech
          </span>
        </div>
      </div>

      {/* -------------------- SINGLE MASTER REVOLVING ORBIT CONTAINER -------------------- */}
      {/* Ensures ALL 4 cards stay strictly 90° apart with ZERO drift or overlap */}
      <div
        className="absolute inset-[6%]"
        style={{ animation: "orbit 45s linear infinite" }}
      >
        {DOMAIN_NODES.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.slug}
              className="absolute inset-0"
              style={{ transform: `rotate(${node.angle}deg)` }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Counter-rotation: Static -node.angle + Dynamic orbit-rev */}
                <div style={{ transform: `rotate(${-node.angle}deg)` }}>
                  <div style={{ animation: "orbit-rev 45s linear infinite" }}>
                    <div className="group flex size-20 flex-col items-center justify-center gap-1 rounded-2xl border p-2 text-center shadow-lg transition-all duration-300 hover:scale-105 border-border-strong bg-card hover:border-inverted">
                      <span className="grid size-7 place-items-center text-primary transition-transform group-hover:scale-110">
                        <Icon className={cx("size-5", node.animClass)} strokeWidth={1.8} />
                      </span>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                        {node.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orbiting Ambient Micro-Nodes */}
      <span className="animate-pulse-node absolute left-[12%] top-[30%] size-1 rounded-full bg-inverted" />
      <span className="animate-pulse-node absolute right-[18%] bottom-[28%] size-1 rounded-full bg-neutral-400" style={{ animationDelay: "1.2s" }} />
    </div>
  );
}

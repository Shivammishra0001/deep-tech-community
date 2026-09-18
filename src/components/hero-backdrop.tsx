"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Hero backdrop — a quiet technical plate rather than a visual effect.
 *
 * Built from CSS gradients plus one inline SVG: a measurement grid, an
 * instrument reticle, a field of contour curves and a few survey ticks, all in
 * graphite. Everything is deterministic, so it renders identically on the
 * server and the client, and there is no canvas, no WebGL context and no
 * per-frame work — the only motion is scroll-linked parallax, which stops
 * entirely under prefers-reduced-motion.
 *
 * Tonal ceiling is roughly #2A2A2A. Nothing here should compete with the
 * headline; every line sits a few percent above the #050505 base.
 */

/** Noise tile, rasterised once by the browser and repeated. Cheaper than a full-surface filter. */
const GRAIN_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/** Contour family — a smooth scalar field sweeping under the type. */
const CONTOURS = [
  { d: "M-120 560 C 220 470, 470 640, 800 540 S 1290 440, 1600 520", o: 0.05 },
  { d: "M-120 624 C 210 540, 480 700, 810 606 S 1300 512, 1600 588", o: 0.042 },
  { d: "M-120 690 C 200 612, 490 762, 820 672 S 1310 586, 1600 658", o: 0.034 },
  { d: "M-120 486 C 230 400, 460 578, 790 474 S 1280 368, 1600 452", o: 0.034 },
  { d: "M-120 414 C 240 332, 450 512, 780 406 S 1270 296, 1600 386", o: 0.026 },
  { d: "M-120 756 C 190 684, 500 824, 830 738 S 1320 660, 1600 726", o: 0.024 },
];

/** Survey ticks on the grid — small, sparse, deliberately off-centre. */
const TICKS = [
  [336, 252], [816, 204], [1104, 348], [1248, 588],
  [624, 780], [960, 684], [432, 540], [1344, 252],
];

export function HeroBackdrop() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Two rates so the plate reads as layered depth rather than a flat image.
  const gridY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : -24]);
  const plateY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : -56]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background" aria-hidden="true">
      {/* Atmosphere: a graphite pool off to the right, away from the type column. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 90% at 72% 38%, var(--hb-atm-1) 0%, var(--hb-atm-2) 42%, var(--hb-atm-3) 78%)",
        }}
      />

      {/* Measurement grid — 48px fine, 192px coarse — faded toward the edges. */}
      <motion.div
        style={{
          y: gridY,
          backgroundImage: [
            "repeating-linear-gradient(0deg, var(--rule-fine) 0 1px, transparent 1px 48px)",
            "repeating-linear-gradient(90deg, var(--rule-fine) 0 1px, transparent 1px 48px)",
            "repeating-linear-gradient(0deg, var(--rule-coarse) 0 1px, transparent 1px 192px)",
            "repeating-linear-gradient(90deg, var(--rule-coarse) 0 1px, transparent 1px 192px)",
          ].join(","),
          maskImage: "radial-gradient(ellipse 88% 82% at 62% 42%, #000 12%, transparent 76%)",
          WebkitMaskImage: "radial-gradient(ellipse 88% 82% at 62% 42%, #000 12%, transparent 76%)",
        }}
        className="absolute -inset-y-12 inset-x-0"
      />

      {/* Instrument plate: reticle, contour field and survey ticks. */}
      <motion.svg
        style={{ y: plateY }}
        className="absolute -inset-y-16 inset-x-0 h-[calc(100%+8rem)] w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          {/* Keeps the plate from reaching the edges of the section. */}
          <radialGradient id="hb-falloff" cx="72%" cy="40%" r="62%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="62%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="hb-mask">
            <rect width="1440" height="900" fill="url(#hb-falloff)" />
          </mask>
        </defs>

        <g mask="url(#hb-mask)" stroke="var(--hb-ink)" strokeWidth="1" vectorEffect="non-scaling-stroke">
          {/* Contour field */}
          {CONTOURS.map((c) => (
            <path key={c.d} d={c.d} strokeOpacity={c.o} />
          ))}

          {/* Reticle — concentric rings, two of them dashed */}
          <g transform="translate(1052 384)">
            <circle r="132" strokeOpacity="0.075" />
            <circle r="216" strokeOpacity="0.055" strokeDasharray="2 9" />
            <circle r="318" strokeOpacity="0.05" />
            <circle r="438" strokeOpacity="0.038" strokeDasharray="2 9" />
            <circle r="572" strokeOpacity="0.028" />
            {/* Crosshair axes */}
            <line x1="-620" y1="0" x2="620" y2="0" strokeOpacity="0.035" strokeDasharray="1 12" />
            <line x1="0" y1="-560" x2="0" y2="560" strokeOpacity="0.035" strokeDasharray="1 12" />
          </g>

          {/* Two long hairlines for layered geometry */}
          <line x1="-120" y1="880" x2="1600" y2="150" strokeOpacity="0.035" />
          <line x1="-120" y1="220" x2="1600" y2="840" strokeOpacity="0.024" />

          {/* Survey ticks */}
          <g strokeOpacity="0.14">
            {TICKS.map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
                <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
              </g>
            ))}
          </g>
        </g>
      </motion.svg>

      {/* Grain */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: GRAIN_TILE, backgroundRepeat: "repeat", opacity: "var(--hb-grain)" }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 100% 100% at 50% 45%, transparent 38%, var(--hb-vignette) 100%)",
        }}
      />

      {/* Contrast scrim under the type column. The plate is already dark, so
          this only needs to guarantee the floor, not hide the artwork. */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(var(--scrim-rgb),0.35) 0%, rgba(var(--scrim-rgb),0.45) 55%, rgba(var(--scrim-rgb),0.6) 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(var(--scrim-rgb),0.72) 0%, rgba(var(--scrim-rgb),0.42) 34%, rgba(var(--scrim-rgb),0.08) 66%, rgba(var(--scrim-rgb),0) 100%)",
        }}
      />

      {/* Hairline seam into the next section. */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
    </div>
  );
}

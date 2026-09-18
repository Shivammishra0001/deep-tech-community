/**
 * Hero backdrop.
 *
 * A quiet atmospheric plate: a soft pool of light behind the type, a trace of
 * grain, and a vignette to settle the edges. No grid, no linework — the
 * headline is the only thing with an edge in this section.
 *
 * Pure CSS. No canvas, no WebGL, no per-frame work and nothing that animates,
 * so there is nothing for prefers-reduced-motion to switch off. Both themes
 * read from the same variables (see globals.css), so the plate follows the
 * theme without a second implementation.
 */

/** Noise tile, rasterised once by the browser and repeated. */
const GRAIN_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-hero" aria-hidden="true">
      {/* Atmosphere: a single pool of light, centred behind the type. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 78% 86% at 50% 42%, var(--hb-atm-1) 0%, var(--hb-atm-2) 46%, var(--hb-atm-3) 82%)",
        }}
      />

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
            "radial-gradient(ellipse 96% 100% at 50% 45%, transparent 42%, var(--hb-vignette) 100%)",
        }}
      />

      {/* Contrast floor under the type. Symmetric, because the composition is
          centred, and light enough that the plate never reads as a panel. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(var(--scrim-rgb),0.34) 0%, rgba(var(--scrim-rgb),0.16) 40%, rgba(var(--scrim-rgb),0.16) 62%, rgba(var(--scrim-rgb),0.42) 100%)",
        }}
      />

      {/* Hairline seam into the next section. */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
    </div>
  );
}

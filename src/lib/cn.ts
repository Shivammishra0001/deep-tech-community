import { twMerge } from "tailwind-merge";

/**
 * Canonical colour utility per prefix, used to ask tailwind-merge whether a
 * given class belongs to that prefix's *colour* group or to one of the other
 * groups sharing the prefix (`text-xs` is a font size, `bg-cover` a background
 * size, `shadow-[0_0_8px_#000]` a box-shadow rather than a shadow colour).
 */
const COLOUR_PROBES: Record<string, string> = {
  bg: "bg-[#000]",
  text: "text-[#000]",
  border: "border-[#000]",
  ring: "ring-[#000]",
  divide: "divide-[#000]",
  fill: "fill-[#000]",
  stroke: "stroke-[#000]",
  from: "from-[#000]",
  via: "via-[#000]",
  to: "to-[#000]",
  shadow: "shadow-[#000]",
  placeholder: "placeholder-[#000]",
  caret: "caret-[#000]",
  accent: "accent-[#000]",
  outline: "outline-[#000]",
  decoration: "decoration-[#000]",
};

const colourClassCache = new Map<string, boolean>();

/** True when `cls` sits in a colour class group, per tailwind-merge itself. */
function isColourClass(cls: string): boolean {
  const cached = colourClassCache.get(cls);
  if (cached !== undefined) return cached;

  const base = cls.replace(/^(?:[^:]+:)+/, "").replace(/!$/, "");
  const probe = COLOUR_PROBES[base.split("-")[0]];
  // Same group as the probe => merging the two leaves only the probe behind.
  const result = probe !== undefined && twMerge(`${base} ${probe}`) === probe;

  colourClassCache.set(cls, result);
  return result;
}

/**
 * Joins class names, resolving conflicting *colour* utilities so the last one
 * wins. Every other kind of conflict is left exactly as it is today.
 *
 * The UI primitives compose a base class string with a caller's `className`
 * (`cn(base, className)`). Plain concatenation left both classes in the
 * attribute and handed the decision to CSS source order, which is alphabetical
 * by colour name — so whether a call site could override a base colour depended
 * on what the two colours happened to be called, and renaming one to a design
 * token could silently flip the rendered result. Dropping the losing colour
 * removes that dependency.
 *
 * The restriction to colour is deliberate. Several call sites also pass a size,
 * padding or width that currently loses to the base class; letting those win
 * would change page layout and typography, which is a separate decision from
 * this fix. Widening the merge is a one-line change here — remove the
 * `isColourClass` guard — but it is a visual change to existing pages.
 */
export function cn(...parts: Array<string | false | null | undefined>) {
  const classes = parts.filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
  const kept = new Set(twMerge(classes.join(" ")).split(/\s+/));
  return classes.filter((cls) => kept.has(cls) || !isColourClass(cls)).join(" ");
}

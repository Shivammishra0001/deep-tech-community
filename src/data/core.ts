import { Brain, Atom, ShieldCheck, Scale, type LucideIcon } from "lucide-react";

/* ------------------------------- Domains ---------------------------------- */

export type DomainSlug = "ai" | "quantum" | "cybersecurity" | "governance";

export type Domain = {
  slug: DomainSlug;
  name: string;
  short: string;
  techSlug: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  image: string;
  text: string; // text color classes
  chip: string; // badge classes
  dot: string;
  tint: string; // soft background tint
  animClass: string;
};

export const DOMAINS: Record<DomainSlug, Domain> = {
  ai: {
    slug: "ai",
    name: "Artificial Intelligence",
    short: "AI",
    techSlug: "artificial-intelligence",
    tagline: "Machines that reason, learn, and create",
    description:
      "From foundation models to autonomous systems — work on the frontier of machine intelligence alongside researchers and engineers shipping real AI products.",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    text: "text-primary",
    chip: "border-border-strong bg-elevated/80 text-primary",
    dot: "bg-inverted",
    tint: "from-neutral-800/30",
    animClass: "animate-icon-ai",
  },
  quantum: {
    slug: "quantum",
    name: "Quantum Computing",
    short: "Quantum",
    techSlug: "quantum-computing",
    tagline: "Computation beyond classical limits",
    description:
      "Qubits, error correction, and algorithms that outpace classical machines. Join the researchers and engineers building the post-classical computing era.",
    icon: Atom,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    text: "text-primary",
    chip: "border-border-strong bg-elevated/80 text-primary",
    dot: "bg-inverted",
    tint: "from-neutral-800/30",
    animClass: "animate-icon-quantum",
  },
  cybersecurity: {
    slug: "cybersecurity",
    name: "Cybersecurity",
    short: "Cyber",
    techSlug: "cybersecurity",
    tagline: "Defending the digital frontier",
    description:
      "Offense, defense, and post-quantum security architecture. Connect with security professionals hardening global infrastructure.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1200&auto=format&fit=crop",
    text: "text-primary",
    chip: "border-border-strong bg-elevated/80 text-primary",
    dot: "bg-inverted",
    tint: "from-neutral-800/30",
    animClass: "animate-icon-cyber",
  },
  governance: {
    slug: "governance",
    name: "AI Governance",
    short: "Governance",
    techSlug: "ai-governance",
    tagline: "Frameworks, safety, and institutional alignment",
    description:
      "Policy nodes, algorithmic risk management, decision structures, and responsible AI deployment — connecting ethicists, legal scholars, and engineers building safe frontier systems.",
    icon: Scale,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    text: "text-primary",
    chip: "border-border-strong bg-elevated/80 text-primary",
    dot: "bg-inverted",
    tint: "from-neutral-800/30",
    animClass: "animate-icon-governance",
  },
};

export const DOMAIN_LIST = [DOMAINS.ai, DOMAINS.quantum, DOMAINS.cybersecurity, DOMAINS.governance];

/* --------------------------------- Stats ----------------------------------- */

export const STATS = [
  { value: "04", label: "Active Deep Tech Domains" },
  { value: "03", label: "Regional Hubs & Chapters" },
  { value: "100%", label: "Practitioner-Led Network" },
  { value: "OPEN", label: "Research & Access" },
];

/* -------------------------------- Chapters --------------------------------- */

export type Chapter = {
  slug: string;
  country: string;
  code: string;
  flag: string;
  city: string;
  founded: string;
  blurb: string;
  about: string[];
};

/**
 * Regional chapters.
 *
 * Structural facts only — where a chapter operates and since when. Organiser
 * names, member counts, session histories and scheduled events are omitted
 * rather than estimated; they belong here once they can be attributed.
 */
export const CHAPTERS: Chapter[] = [
  {
    slug: "india",
    country: "India",
    code: "IN",
    flag: "\u{1F1EE}\u{1F1F3}",
    city: "Bengaluru \u00b7 Hyderabad \u00b7 Delhi NCR",
    founded: "2023",
    blurb:
      "Regional chapter connecting members working across AI, quantum computing, cybersecurity and AI governance.",
    about: [
      "The India chapter connects Deep Tech Community members across Bengaluru, Hyderabad and Delhi NCR.",
      "Chapter organisers, study circles and session schedules will be listed here once they are confirmed.",
    ],
  },
  {
    slug: "singapore",
    country: "Singapore",
    code: "SG",
    flag: "\u{1F1F8}\u{1F1EC}",
    city: "Singapore",
    founded: "2024",
    blurb:
      "Regional chapter connecting members working across AI, quantum computing, cybersecurity and AI governance.",
    about: [
      "The Singapore chapter connects Deep Tech Community members across Singapore.",
      "Chapter organisers, study circles and session schedules will be listed here once they are confirmed.",
    ],
  },
  {
    slug: "malaysia",
    country: "Malaysia",
    code: "MY",
    flag: "\u{1F1F2}\u{1F1FE}",
    city: "Kuala Lumpur \u00b7 Penang",
    founded: "2024",
    blurb:
      "Regional chapter connecting members working across AI, quantum computing, cybersecurity and AI governance.",
    about: [
      "The Malaysia chapter connects Deep Tech Community members across Kuala Lumpur and Penang.",
      "Chapter organisers, study circles and session schedules will be listed here once they are confirmed.",
    ],
  },
];

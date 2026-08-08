import { Brain, Atom, ShieldCheck, Rocket, type LucideIcon } from "lucide-react";

/* ------------------------------- Domains ---------------------------------- */

export type DomainSlug = "ai" | "quantum" | "cybersecurity" | "space";

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
    text: "text-neutral-900 dark:text-neutral-100",
    chip: "border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-100",
    dot: "bg-neutral-900 dark:bg-neutral-100",
    tint: "from-neutral-200/20 dark:from-neutral-800/30",
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
    text: "text-neutral-900 dark:text-neutral-100",
    chip: "border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-100",
    dot: "bg-neutral-900 dark:bg-neutral-100",
    tint: "from-neutral-200/20 dark:from-neutral-800/30",
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
    text: "text-neutral-900 dark:text-neutral-100",
    chip: "border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-100",
    dot: "bg-neutral-900 dark:bg-neutral-100",
    tint: "from-neutral-200/20 dark:from-neutral-800/30",
    animClass: "animate-icon-cyber",
  },
  space: {
    slug: "space",
    name: "Space Technology",
    short: "Space",
    techSlug: "space-technology",
    tagline: "Engineering humanity's off-world future",
    description:
      "Launch systems, satellite constellations, and deep-space science. Collaborate with engineers and scientists opening the space economy.",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1446776811953-b23d57b?q=80&w=1200&auto=format&fit=crop",
    text: "text-neutral-900 dark:text-neutral-100",
    chip: "border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-100",
    dot: "bg-neutral-900 dark:bg-neutral-100",
    tint: "from-neutral-200/20 dark:from-neutral-800/30",
    animClass: "animate-icon-space",
  },
};

export const DOMAIN_LIST = [DOMAINS.ai, DOMAINS.quantum, DOMAINS.cybersecurity, DOMAINS.space];

/* --------------------------------- Stats ----------------------------------- */

export const STATS = [
  { value: "12,400+", label: "Members worldwide" },
  { value: "38", label: "Countries represented" },
  { value: "120+", label: "Events held since 2023" },
  { value: "4", label: "Deep tech domains" },
];

/* ------------------------------ Activity ticker ---------------------------- */

export const TICKER = [
  "Priya N. from Bengaluru joined the AI Research Circle",
  "New paper drop: “Lattice-based KEMs at scale” in the Cyber library",
  "Deep Tech Summit 2026 — early registration is open",
  "Wei Ling T. published a roadmap for quantum error correction",
  "Kuala Lumpur chapter announced a hands-on SOC lab",
  "Arun S. shared his CubeSat telemetry project",
  "Webinar: Post-quantum migration — 400 seats filled",
  "Malaysia chapter crossed 1,100 members",
];

/* -------------------------------- Chapters --------------------------------- */

export type Chapter = {
  slug: string;
  country: string;
  code: string;
  flag: string;
  city: string;
  members: number;
  founded: string;
  blurb: string;
  about: string[];
  leads: { name: string; role: string }[];
  events: { title: string; type: string; date: string; city: string }[];
  updates: { date: string; text: string }[];
};

export const CHAPTERS: Chapter[] = [
  {
    slug: "india",
    country: "India",
    code: "IN",
    flag: "🇮🇳",
    city: "Bengaluru · Hyderabad · Delhi NCR",
    members: 4200,
    founded: "2023",
    blurb:
      "Our largest chapter — a dense network of AI engineers, security researchers, and student builders across three metro hubs.",
    about: [
      "The India chapter is where our community began. What started as a 14-person meetup in Bengaluru now spans three cities and more than 4,200 members, from first-year students to principal engineers at global AI labs.",
      "Monthly rhythm: a hands-on workshop, a research reading group, and an open mic for project demos. Everything is recorded and shared with the global community.",
    ],
    leads: [
      { name: "Ananya Iyer", role: "Chapter Lead · Bengaluru" },
      { name: "Arjun Mehta", role: "Events Lead · Delhi NCR" },
      { name: "Sneha Kulkarni", role: "Research Circle · Hyderabad" },
    ],
    events: [
      { title: "Hands-on LLM Fine-Tuning Workshop", type: "Workshop", date: "Mar 14, 2026", city: "Bengaluru" },
      { title: "AI Research Reading Group #21", type: "Meetup", date: "Mar 28, 2026", city: "Hyderabad" },
      { title: "Student Builder Demo Night", type: "Meetup", date: "Apr 11, 2026", city: "Delhi NCR" },
    ],
    updates: [
      { date: "Feb 2026", text: "Partnered with two universities to run a semester-long quantum fundamentals track." },
      { date: "Jan 2026", text: "150 attendees at the Bengaluru CTF qualifier — team Sentinel took 2nd place nationally." },
      { date: "Dec 2025", text: "Published 12 member articles in the global community feed in a single month." },
    ],
  },
  {
    slug: "singapore",
    country: "Singapore",
    code: "SG",
    flag: "🇸🇬",
    city: "Singapore",
    members: 1800,
    founded: "2024",
    blurb:
      "Our APAC hub — founders, researchers, and policy-minded engineers meet where deep tech meets industry and government.",
    about: [
      "The Singapore chapter hosts our flagship annual summit and acts as the bridge between academic research and Southeast Asia's fast-moving deep tech industry.",
      "Expect sharp conversations: lab tours, founder AMAs, and joint sessions with local research institutes working on quantum networking and space data.",
    ],
    leads: [
      { name: "Wei Ling Tan", role: "Chapter Lead" },
      { name: "Marcus Lim", role: "Industry Partnerships" },
      { name: "Dhivya Rajan", role: "Community & Volunteering" },
    ],
    events: [
      { title: "Deep Tech Summit 2026", type: "Conference", date: "May 22–23, 2026", city: "Singapore" },
      { title: "Quantum Networking Lab Tour", type: "Meetup", date: "Apr 04, 2026", city: "Singapore" },
      { title: "Founder AMA: Building in Space Tech", type: "Webinar", date: "Apr 18, 2026", city: "Online" },
    ],
    updates: [
      { date: "Feb 2026", text: "Signed a knowledge-sharing MOU with a national quantum research programme." },
      { date: "Jan 2026", text: "Deep Tech Summit 2026 agenda published — 4 tracks, 32 speakers." },
      { date: "Nov 2025", text: "Hosted the regional post-quantum cryptography roundtable." },
    ],
  },
  {
    slug: "malaysia",
    country: "Malaysia",
    code: "MY",
    flag: "🇲🇾",
    city: "Kuala Lumpur · Penang",
    members: 1100,
    founded: "2024",
    blurb:
      "A fast-growing community of security practitioners and satellite-data enthusiasts, anchored in KL and Penang's hardware ecosystem.",
    about: [
      "The Malaysia chapter grew out of our cybersecurity study circles and now runs one of the community's most active hands-on labs — a monthly SOC simulation in Kuala Lumpur.",
      "Penang's semiconductor and aerospace supply chain gives the chapter a unique edge in hardware-adjacent space technology topics.",
    ],
    leads: [
      { name: "Nurul Aisyah", role: "Chapter Lead · Kuala Lumpur" },
      { name: "Devan Kumar", role: "Labs Lead · Penang" },
    ],
    events: [
      { title: "Cyber Defense Circle: SOC Simulation", type: "Workshop", date: "Mar 21, 2026", city: "Kuala Lumpur" },
      { title: "Satellite Data Pipelines Study Night", type: "Meetup", date: "Apr 02, 2026", city: "Penang" },
      { title: "Intro to Threat Modeling", type: "Workshop", date: "Apr 25, 2026", city: "Kuala Lumpur" },
    ],
    updates: [
      { date: "Feb 2026", text: "Crossed 1,100 members — the fastest-growing chapter in the community." },
      { date: "Jan 2026", text: "Launched the Penang hardware study circle with 60 founding members." },
      { date: "Dec 2025", text: "Co-hosted a cross-chapter CTF with the India chapter — 300 participants." },
    ],
  },
];

/* --------------------------------- People ---------------------------------- */

export const TEAM = [
  { name: "Elena Marchetti", role: "Executive Director", bio: "Former ML research lead. Believes communities are the best research instrument ever built." },
  { name: "Rahul Venkatesh", role: "Head of Programs", bio: "Quantum engineer turned educator. Runs the workshop and roadmap machinery." },
  { name: "Sarah Okafor", role: "Security Practice Lead", bio: "Red teamer and conference organiser. Keeps the community's standards sharp." },
  { name: "Tomohiro Sato", role: "Space Programs Lead", bio: "Satellite systems engineer. Coordinates the space track and chapter space events." },
  { name: "Wei Ling Tan", role: "APAC Chapters Lead", bio: "Builds the bridges between research institutes, founders, and members." },
  { name: "Ananya Iyer", role: "Community Operations", bio: "First chapter lead, now keeping the whole network running week after week." },
];

export const PARTNERS = [
  "QuantaForge Institute",
  "Helix Research Labs",
  "SentinelGrid Security",
  "Meridian Aerospace",
  "OrbitalWorks",
  "Nova Computing Society",
];

/* --------------------------------- About ----------------------------------- */

export const VALUES = [
  {
    title: "Rigor over hype",
    text: "We discuss what is real, reproducible, and peer-reviewable. Deep tech moves fast enough without exaggeration.",
  },
  {
    title: "Knowledge in the open",
    text: "Talks, notes, and roadmaps are shared with every member. What one person learns, everyone learns.",
  },
  {
    title: "Builders welcome",
    text: "Students shipping their first project sit beside principal engineers. Titles matter less than curiosity.",
  },
  {
    title: "Local roots, global reach",
    text: "Chapters run in-person, in local time, with local organisers — connected to a worldwide network.",
  },
];

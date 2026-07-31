import type { DomainSlug } from "@/data/core";

export type EventType = "Conference" | "Workshop" | "Meetup" | "Webinar";

export type TechEvent = {
  slug: string;
  title: string;
  type: EventType;
  domains: DomainSlug[];
  date: string;
  time: string;
  venue: string;
  format: "In-person" | "Online" | "Hybrid";
  capacity: string;
  price: string;
  description: string[];
  agenda: { time: string; title: string; speaker?: string }[];
  speakers: { name: string; role: string }[];
  faqs: { q: string; a: string }[];
  featured?: boolean;
};

export const EVENTS: TechEvent[] = [
  {
    slug: "deep-tech-summit-2026",
    title: "Deep Tech Summit 2026",
    type: "Conference",
    featured: true,
    domains: ["ai", "quantum", "cybersecurity", "space"],
    date: "May 22–23, 2026",
    time: "09:00 – 18:30 SGT",
    venue: "Marina Bay Convention Centre, Singapore",
    format: "Hybrid",
    capacity: "1,200 in-person · unlimited online",
    price: "Free for members",
    description: [
      "Our flagship annual gathering returns to Singapore with four parallel tracks, 32 speakers, and the community's largest-ever expo floor. Two days where AI researchers, quantum engineers, security practitioners, and space technologists share what they are actually building — results, failures, and open questions included.",
      "The summit is organized by members, not a conference company. Sessions are selected through our community call for talks, recordings go to the member library the same week, and every ticket tier funds chapter programs.",
    ],
    agenda: [
      { time: "09:00", title: "Opening keynote: The state of deep tech, honestly", speaker: "Dr. Elena Marchetti" },
      { time: "10:30", title: "AI track: Inference-time compute in production", speaker: "Priya Natarajan" },
      { time: "11:30", title: "Quantum track: The logical qubit era begins", speaker: "Dr. Mira Kovács" },
      { time: "14:00", title: "Security track: Living with stolen credentials", speaker: "Sarah Okafor" },
      { time: "15:30", title: "Space track: From pixels to decisions", speaker: "Tomohiro Sato" },
      { time: "17:00", title: "Founders' panel: Deep tech companies that ship", speaker: "Moderated by Wei Ling Tan" },
    ],
    speakers: [
      { name: "Dr. Elena Marchetti", role: "Executive Director, GDTS" },
      { name: "Dr. Mira Kovács", role: "Quantum error correction researcher" },
      { name: "Sarah Okafor", role: "Security Practice Lead, GDTS" },
      { name: "Tomohiro Sato", role: "Space Programs Lead, GDTS" },
    ],
    faqs: [
      { q: "Who can attend?", a: "Any member of the community, at any level. Students receive priority for in-person seats during the first registration window." },
      { q: "Is the online stream really free?", a: "Yes. All live streams and recordings are free for members. In-person tickets cover venue costs only." },
      { q: "Will sessions be recorded?", a: "Every main-stage and track session is recorded and published to the member library within one week." },
      { q: "Can I speak?", a: "The call for talks opens eight weeks before the summit. Community-reviewed, first-time speakers encouraged." },
    ],
  },
  {
    slug: "llm-fine-tuning-workshop-bengaluru",
    title: "Hands-on LLM Fine-Tuning Workshop",
    type: "Workshop",
    domains: ["ai"],
    date: "Mar 14, 2026",
    time: "10:00 – 17:00 IST",
    venue: "GDTS Hub, Indiranagar, Bengaluru",
    format: "In-person",
    capacity: "40 seats",
    price: "Free for members",
    description: [
      "A full-day, laptops-open workshop on fine-tuning open-weight language models — from dataset preparation and LoRA adapters to evaluation that catches regression, not just improvement.",
      "Bring a laptop with 16GB RAM; GPU compute is provided by the chapter. You will leave with a fine-tuned model, a reproducible training script, and an evaluation harness you can reuse in your own projects.",
    ],
    agenda: [
      { time: "10:00", title: "Why and when to fine-tune (and when not to)", speaker: "Elena Marchetti" },
      { time: "11:00", title: "Dataset preparation & data quality triage" },
      { time: "13:00", title: "LoRA/QLoRA training lab on chapter GPUs" },
      { time: "15:00", title: "Evaluation harness: catching silent regressions", speaker: "Priya Natarajan" },
      { time: "16:30", title: "Demo hour & open troubleshooting" },
    ],
    speakers: [
      { name: "Elena Marchetti", role: "Executive Director, GDTS" },
      { name: "Priya Natarajan", role: "ML Engineer & track mentor" },
      { name: "Ananya Iyer", role: "Chapter Lead, Bengaluru" },
    ],
    faqs: [
      { q: "What skill level do I need?", a: "Comfortable with Python and basic PyTorch. We provide a pre-workshop refresher notebook two weeks ahead." },
      { q: "Do I need my own GPU?", a: "No — the chapter provides shared GPU capacity for the training labs." },
      { q: "Is there a waitlist?", a: "Yes. When seats fill, we open a waitlist and run a repeat session if demand justifies it." },
    ],
  },
  {
    slug: "qec-webinar-series",
    title: "Quantum Error Correction, Explained by Practitioners",
    type: "Webinar",
    domains: ["quantum"],
    date: "Mar 05, 2026",
    time: "20:00 – 21:30 SGT",
    venue: "Online (member stream)",
    format: "Online",
    capacity: "Unlimited",
    price: "Free for members",
    description: [
      "The single most important topic in quantum computing, taught by people who debug decoders for a living. This session covers stabilizer codes, the surface code, and why decoding latency now decides hardware roadmaps.",
      "Part of our monthly webinar series. Live Q&A runs the final thirty minutes; the recording and annotated notes go to the library afterwards.",
    ],
    agenda: [
      { time: "20:00", title: "From physical noise to logical qubits", speaker: "Dr. Mira Kovács" },
      { time: "20:35", title: "The surface code, drawn properly", speaker: "Rahul Venkatesh" },
      { time: "21:00", title: "Live Q&A and reading list" },
    ],
    speakers: [
      { name: "Dr. Mira Kovács", role: "QEC researcher & reading group advisor" },
      { name: "Rahul Venkatesh", role: "Head of Programs, GDTS" },
    ],
    faqs: [
      { q: "What background do I need?", a: "Linear algebra and the quantum circuit model. Our Phase 1 roadmap covers the prerequisites." },
      { q: "Will there be a recording?", a: "Yes — recording plus annotated notes in the member library within 48 hours." },
    ],
  },
  {
    slug: "kl-cyber-defense-circle",
    title: "Cyber Defense Circle: SOC Simulation Lab",
    type: "Workshop",
    domains: ["cybersecurity"],
    date: "Mar 21, 2026",
    time: "14:00 – 19:00 MYT",
    venue: "GDTS Lab, Kuala Lumpur",
    format: "In-person",
    capacity: "30 seats",
    price: "Free for members",
    description: [
      "Five hours inside a simulated security operations centre. Teams defend a live environment against a scripted adversary operating with valid credentials — the exact scenario behind this year's biggest breaches.",
      "The lab emphasises detection engineering and decision-making under uncertainty. All techniques follow our ethics code; everything runs in an isolated range.",
    ],
    agenda: [
      { time: "14:00", title: "Briefing: the valid-credentials problem", speaker: "Sarah Okafor" },
      { time: "14:45", title: "Lab block 1: baseline & telemetry review" },
      { time: "16:00", title: "Lab block 2: adversary activity begins" },
      { time: "17:30", title: "Detection, triage & containment decisions" },
      { time: "18:30", title: "Debrief: what the logs actually told us", speaker: "Nurul Aisyah" },
    ],
    speakers: [
      { name: "Sarah Okafor", role: "Security Practice Lead, GDTS" },
      { name: "Nurul Aisyah", role: "Chapter Lead, Kuala Lumpur" },
      { name: "Devan Kumar", role: "Labs Lead, Penang" },
    ],
    faqs: [
      { q: "Is this suitable for beginners?", a: "Yes — beginners are paired with experienced defenders. Bring curiosity and basic Linux familiarity." },
      { q: "Do I sign anything?", a: "All participants sign the community ethics code before lab access. Non-negotiable." },
      { q: "What should I bring?", a: "A laptop with any modern browser. Lab machines are also available." },
    ],
  },
  {
    slug: "satellite-data-pipelines-101",
    title: "Satellite Data Pipelines 101",
    type: "Workshop",
    domains: ["space"],
    date: "Apr 02, 2026",
    time: "19:00 – 21:00 SGT",
    venue: "Online + GDTS Hub, Singapore (hybrid room)",
    format: "Hybrid",
    capacity: "200 online · 25 in-person",
    price: "Free for members",
    description: [
      "Earth-observation archives are the space industry's most underused asset. This hands-on session takes you from raw Level-1 imagery to a calibrated, queryable time series — using entirely open data and open tools.",
      "You will build a small pipeline end to end: discovery, correction, storage, and a visualization that answers a real question. All code lands in the community repository the same day.",
    ],
    agenda: [
      { time: "19:00", title: "From photon to pixel: what the archive really contains", speaker: "Ananya Iyer" },
      { time: "19:40", title: "Build: an open EO pipeline in 60 minutes", speaker: "Arun Subramaniam" },
      { time: "20:40", title: "Q&A and next-project ideas" },
    ],
    speakers: [
      { name: "Ananya Iyer", role: "Community Operations & EO researcher" },
      { name: "Arun Subramaniam", role: "Ground systems engineer" },
    ],
    faqs: [
      { q: "Do I need space domain knowledge?", a: "No. Python familiarity is the only prerequisite; the session teaches the EO concepts." },
      { q: "Is the hybrid room capacity limited?", a: "Yes, 25 seats in Singapore. Online seats are unlimited for members." },
    ],
  },
  {
    slug: "quantum-week-asia",
    title: "Quantum Computing Week Asia",
    type: "Conference",
    domains: ["quantum"],
    date: "Jun 10–12, 2026",
    time: "09:30 – 18:00 SGT",
    venue: "One-North Research Cluster, Singapore",
    format: "In-person",
    capacity: "400 seats",
    price: "Member rate: S$40 · includes lunches",
    description: [
      "Three days co-organized with regional research institutes: hardware roadmaps, decoding systems, quantum networking, and the talent pipeline connecting students to labs. GDTS members get a dedicated rate and a reserved mentoring session block.",
      "Our chapter runs the student track, pairing attendees with practitioners for portfolio reviews — the session that sold out first two years running.",
    ],
    agenda: [
      { time: "09:30", title: "Hardware roadmaps: superconducting, ions, photonics" },
      { time: "11:00", title: "Decoding systems: the software layer under the qubit", speaker: "Dr. Mira Kovács" },
      { time: "14:00", title: "Quantum networking: testbeds to metropolitan links", speaker: "Wei Ling Tan" },
      { time: "16:00", title: "GDTS student track: portfolio reviews & mentoring" },
    ],
    speakers: [
      { name: "Dr. Mira Kovács", role: "QEC researcher" },
      { name: "Wei Ling Tan", role: "APAC Chapters Lead, GDTS" },
      { name: "Rahul Venkatesh", role: "Head of Programs, GDTS" },
    ],
    faqs: [
      { q: "Why is this one paid?", a: "It is a partner-organized conference; members receive a subsidized rate. All GDTS-run events remain free." },
      { q: "Can students attend?", a: "Strongly encouraged — the student track is built for you, and a limited number of sponsored seats exist." },
    ],
  },
];

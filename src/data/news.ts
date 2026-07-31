import type { DomainSlug } from "@/data/core";

export type Article = {
  slug: string;
  domain: DomainSlug;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  authorRole: string;
  date: string;
  readingTime: number;
  tags: string[];
  image: string;
  featured?: boolean;
};

export const ARTICLES: Article[] = [
  {
    slug: "frontier-models-learn-to-reason",
    domain: "ai",
    featured: true,
    title: "Frontier reasoning models: inference-time compute scaling laws in production",
    excerpt:
      "The new frontier of AI capability isn't parameter scale — it's test-time compute. We unpack how test-time search and self-verification redefine reasoning performance.",
    body: [
      "For a decade, progress in deep learning followed one law: more parameters, more data, more compute. In 2026, the center of gravity has shifted. The most consequential capability gains now come from letting models spend more computation at inference — drafting, verifying, and revising their own reasoning traces before answering.",
      "The practical consequences are already visible in our community's project channels. Members report that smaller models given generous reasoning budgets routinely match larger models on multi-step technical work, at a fraction of serving costs. Evaluation discipline matters more than ever: reasoning traces can look convincing while remaining wrong, and our AI track's evaluation reading group has made 'verifier reliability' its central theme.",
      "For builders, the takeaway is tactical. Design systems where the model can check its own work — unit tests, retrieval against trusted sources, and structured output validation. Reasoning improves fastest when it collides with deterministic verification.",
      "For researchers, the open questions are enormous. How much of this capability is learned versus searched? What are the scaling laws for inference-time compute? Our next research circle session will tackle process supervision and Monte Carlo tree search over token spaces.",
      "One thing is clear: the era of judging a model solely by parameter count is over. The models that matter now are the ones that know how to think twice.",
    ],
    author: "Dr. Elena Marchetti",
    authorRole: "Executive Director, former ML research lead",
    date: "Feb 24, 2026",
    readingTime: 8,
    tags: ["reasoning", "inference", "evaluation", "frontier-models"],
    image: "/images/news-ai.jpg",
  },
  {
    slug: "thousand-qubit-milestone",
    domain: "quantum",
    title: "Logical qubit error correction: 1,000-qubit fault-tolerant systems",
    excerpt:
      "Physical qubit counts stopped being the primary metric. The breakthrough is logical qubits — and the first repeatable error-correction results are reshaping quantum roadmaps.",
    body: [
      "When the first thousand-qubit processors were announced, our quantum reading group spent an entire session arguing about what the metric means. Raw qubit count is like judging a classical computer by its raw transistor count in 1965. The metric that matters is the logical qubit: an error-corrected unit that behaves orders of magnitude better than its physical components.",
      "The last twelve months delivered the strongest empirical evidence yet that fault-tolerant computing is an engineering optimization problem. Surface-code experiments demonstrate clear error suppression as code distance increases — the exponential improvement necessary for commercial utility. Decoding latency has quietly become the battleground, with real-time FPGA decoders keeping pace with microsecond-scale syndrome measurements.",
      "For members planning technical skills, the message from our practitioners is blunt: master quantum error correction, real-time control systems, and cryogenic signal chains. The hiring demand is shifting from abstract quantum algorithm writers to hardware and systems engineers who can keep logical qubits alive.",
      "Our track is responding. This year's quantum roadmap adds a full error-correction module, and our Singapore chapter's lab tour series will visit a leading regional decoding hardware facility in April.",
      "The thousand-qubit era is a starting gun. The race that matters now is moving from noisy intermediate-scale physical chips to fault-tolerant logical reliability.",
    ],
    author: "Rahul Venkatesh",
    authorRole: "Head of Programs, quantum engineer",
    date: "Feb 18, 2026",
    readingTime: 7,
    tags: ["error-correction", "logical-qubits", "hardware", "surface-codes"],
    image: "/images/news-quantum.jpg",
  },
  {
    slug: "zero-trust-continuous-verification",
    domain: "cybersecurity",
    title: "Beyond zero trust: continuous automated authorization & threat response",
    excerpt:
      "Ten years after zero trust became enterprise doctrine, attackers live inside valid sessions. The new defense architecture shifts from static perimeter checks to continuous verification.",
    body: [
      "Zero trust was a necessary evolution: never trust the internal network, always verify identity. But breach reports reveal an uncomfortable pattern: sophisticated attackers no longer break in — they log in using valid, compromised credentials.",
      "The response emerging across mature defensive security programs is continuous verification. Identity decisions stop being one-time access gates and become running risk evaluations — device posture, behavioral telemetry, risk-scoped step-up challenges, and session-level revocation executing in milliseconds.",
      "Our cybersecurity track stress-tested these architectures in our hands-on SOC lab. Teams faced adversaries operating entirely with valid credentials. Detection depended on behavioral telemetry and automated response playbooks rather than perimeter blocklists.",
      "There are real architectural trade-offs: continuous verification raises authentication friction and demands high-fidelity telemetry pipelines. Security teams in our community warn against buying turn-key claims without investing in telemetry hygiene.",
      "The direction is clear: trust is no longer a static token granted at login; it is an active signal continuously measured across every API request.",
    ],
    author: "Sarah Okafor",
    authorRole: "Security Practice Lead",
    date: "Feb 11, 2026",
    readingTime: 6,
    tags: ["zero-trust", "identity", "soc", "architecture"],
    image: "/images/news-cyber.jpg",
  },
  {
    slug: "lunar-gateway-crew-module",
    domain: "space",
    title: "NASA Artemis Lunar Gateway HALO module clears critical systems review",
    excerpt:
      "The permanent human outpost orbiting the Moon passed its final integration gate. A systems engineering look at the life support and avionics architectures.",
    body: [
      "Review boards are where deep space hardware matures. The Gateway Habitation and Logistics Outpost (HALO) module's final design review closes a multi-year engineering milestone — from passive radiation shielding to life-support architectures operating 400,000 kilometers from Earth.",
      "Key systems engineering decisions stand out: the module's fault-tolerance philosophy prioritizes graceful degradation over redundant hardware weight, pairing automated telemetry with crew-assisted recovery. The communications payload relies on optical laser links for high-bandwidth data relay.",
      "For our community, deep space programs offer a engineering blueprint. The supplier ecosystem spans dozens of nations, and subsystem tasks — thermal management, ADCS, radiation-hardened computing — map directly to our space track curriculum.",
      "The schedule ahead includes environmental chamber testing, uncrewed launch checkout, and crewed lunar orbital operations. Each phase will surface real-world challenges that no simulation fully captures.",
      "Next in our space track: a technical study group on Gateway's Power and Propulsion Element (PPE) electric propulsion system.",
    ],
    author: "Tomohiro Sato",
    authorRole: "Space Programs Lead",
    date: "Feb 04, 2026",
    readingTime: 6,
    tags: ["gateway", "nasa", "systems-engineering", "lunar"],
    image: "/images/news-space.jpg",
  },
  {
    slug: "open-source-small-models-edge",
    domain: "ai",
    title: "On-device AI: sub-3B parameter open-weights models outperforming legacy 70B models",
    excerpt:
      "Model distillation and high-quality synthetic datasets have enabled small edge models to match server-class models on targeted industrial tasks.",
    body: [
      "The most consequential story in applied machine learning is the steady compounding improvement of open-weight models small enough to run on local edge hardware.",
      "Distillation, quantization, and clean data filtering have closed the capability gap for targeted tasks. Summarization, code synthesis, structured JSON extraction, and local privacy-first search are now regularly deployed on-device without cloud API dependencies.",
      "This shift alters software economics. On-device inference shifts the engineering focus from cloud API cost management to local integration craft: GGUF quantization, WebGPU execution backends, and low-latency local context management.",
      "Our AI track hosted an edge deployment workshop covering local model quantizations, measuring latency vs perplexity degradation, and shipping offline-first applications.",
      "Frontier foundation models will continue raising the theoretical ceiling. But edge models are raising the practical floor — making AI private, instant, and ubiquitous.",
    ],
    author: "Lena Hoffmann",
    authorRole: "ML Engineer & community contributor",
    date: "Jan 27, 2026",
    readingTime: 5,
    tags: ["small-models", "edge", "open-source", "deployment"],
    image: "/images/news-ai-2.jpg",
  },
  {
    slug: "quantum-network-southeast-asia",
    domain: "quantum",
    title: "Metropolitan quantum key distribution network links three regional research hubs",
    excerpt:
      "A fiber-based entanglement distribution network connects regional computing nodes, giving independent researchers access to quantum networking hardware.",
    body: [
      "Quantum networking is transitioning from isolated physics demonstrations to multi-node experimental infrastructure. A fiber-based entanglement distribution testbed was activated connecting three major research nodes across Southeast Asia.",
      "The technical implementation achieves metro-scale quantum key distribution (QKD) over deployed dark fiber links. What distinguishes this network is its open-access policy: a portion of beamtime is allocated to independent community researchers and graduate student projects.",
      "Our quantum computing track is submitting joint research proposals for network layer protocols and entanglement routing experiments.",
      "While metro QKD is an early step toward distributed quantum computing networks, public testbeds accelerate real-world protocol testing and talent development.",
      "Detailed notes and network architecture diagrams are available in our community open research library.",
    ],
    author: "Wei Ling Tan",
    authorRole: "APAC Chapters Lead",
    date: "Jan 20, 2026",
    readingTime: 5,
    tags: ["quantum-networking", "entanglement", "southeast-asia", "testbed"],
    image: "/images/news-quantum-2.jpg",
  },
  {
    slug: "post-quantum-migration-checklist",
    domain: "cybersecurity",
    title: "NIST FIPS post-quantum cryptography standard: migration roadmap for zero-trust architectures",
    excerpt:
      "With NIST finalizing FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA), enterprise security teams are migrating legacy public-key infrastructure to post-quantum algorithms.",
    body: [
      "Cryptographic migrations take years. The post-quantum transition carries a unique urgency: 'harvest now, decrypt later' threats mean adversaries collect encrypted traffic today to decrypt once quantum hardware matures.",
      "Our security track compiled an enterprise migration blueprint based on practitioner experience. The sequence prioritizes crypto-agility and discovery: mapping where RSA and ECC keys reside across microservices, legacy databases, and TLS endpoints.",
      "The recommended default is hybrid deployment — combining classical algorithms with post-quantum standards (ML-KEM and ML-DSA) to maintain compliance while hedging against implementation bugs.",
      "Testing reveals practical considerations: larger post-quantum key sizes and signature sizes affect network packet fragmentation and TLS handshake latency.",
      "Our regional chapters are leading migration planning workshops to help engineering teams upgrade their cryptographic primitives.",
    ],
    author: "Marcus Reid",
    authorRole: "Cryptography practitioner & mentor",
    date: "Jan 13, 2026",
    readingTime: 7,
    tags: ["post-quantum", "cryptography", "migration", "compliance"],
    image: "/images/news-cyber-2.jpg",
  },
  {
    slug: "smallsats-space-data-economy",
    domain: "space",
    title: "Commercial LEO constellations & automated Earth-observation telemetry pipelines",
    excerpt:
      "Ride-share launches have lowered payload costs to orbit. The primary bottleneck is now ground-station data pipelines and automated satellite tasking.",
    body: [
      "Lower launch costs have enabled dense low-Earth orbit (LEO) constellations. The value creation has moved downstream — processing petabytes of downlinked sensor data into actionable insights.",
      "Daily satellite imagery downlinks exceed historical volumes, yet turning raw telemetry into decision-ready insights remains a software data engineering challenge.",
      "Engineering teams face ground-station scheduling, cloud ingress bandwidth limits, and real-time automated tasking for disaster response and climate tracking.",
      "Our space technology track co-developed an open telemetry processing pipeline for CubeSat constellations, focusing on automated ground station downlinks and edge processing.",
      "The space economy is driven by software engineering as much as satellite bus design — turning orbital sensors into real-time global intelligence.",
    ],
    author: "Ananya Iyer",
    authorRole: "Community Operations & space data researcher",
    date: "Jan 06, 2026",
    readingTime: 6,
    tags: ["smallsat", "earth-observation", "data-pipelines", "newspace"],
    image: "/images/news-space-2.jpg",
  },
];

export function relatedArticles(article: Article, count = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== article.slug)
    .sort((a, b) => {
      const aScore = (a.domain === article.domain ? 10 : 0) + a.tags.filter((t) => article.tags.includes(t)).length;
      const bScore = (b.domain === article.domain ? 10 : 0) + b.tags.filter((t) => article.tags.includes(t)).length;
      return bScore - aScore;
    })
    .slice(0, count);
}

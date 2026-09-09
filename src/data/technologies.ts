import type { DomainSlug } from "@/data/core";

export type TechPage = {
  domain: DomainSlug;
  headline: string;
  overview: string[];
  beginnerGuide: { title: string; text: string }[];
  roadmap: { phase: string; title: string; duration: string; items: string[] }[];
  papers: { title: string; authors: string; venue: string; year: string }[];
  tutorials: { title: string; level: "Beginner" | "Intermediate" | "Advanced"; duration: string; author: string }[];
  resources: { title: string; org: string; kind: string }[];
  facts: { value: string; label: string }[];
};

export const TECH_PAGES: Record<DomainSlug, TechPage> = {
  ai: {
    domain: "ai",
    headline: "The discipline turning pattern recognition into reasoning.",
    overview: [
      "Artificial intelligence in our community means the serious study and engineering of learning systems — not the marketing version. Members work across foundation models, reinforcement learning, evaluation methodology, and the infrastructure that makes large-scale inference possible.",
      "Whether you are training your first classifier or deploying agents to production, the AI track gives you a structured path, honest peer review, and direct access to practitioners who ship these systems for a living.",
    ],
    beginnerGuide: [
      { title: "Ground yourself in the fundamentals", text: "Linear algebra, probability, and Python fluency. Two focused months here saves a year of confusion later." },
      { title: "Build small models from scratch", text: "Implement logistic regression and a small neural network without frameworks first. Understand what the framework is doing for you." },
      { title: "Move to PyTorch and real datasets", text: "Train, evaluate, and — critically — debug models on messy data. Learn to read learning curves like a clinician reads charts." },
      { title: "Study one frontier deeply", text: "Pick transformers, diffusion, or RL and read three canonical papers end to end. Present them at a reading group." },
      { title: "Ship something a human uses", text: "A small deployed model with real users teaches more than ten notebooks." },
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Foundations",
        duration: "Months 0–3",
        items: ["Mathematics for ML", "Python & NumPy fluency", "Classical ML (scikit-learn)", "Evaluation & experimental hygiene"],
      },
      {
        phase: "Phase 2",
        title: "Core engineering",
        duration: "Months 3–9",
        items: ["PyTorch deep learning", "Computer vision or NLP track", "Data pipelines & feature stores", "Model serving basics"],
      },
      {
        phase: "Phase 3",
        title: "Frontier systems",
        duration: "Months 9–18",
        items: ["Transformer architecture", "Fine-tuning & RLHF/RLAIF", "RAG and agent architectures", "Inference optimization"],
      },
      {
        phase: "Phase 4",
        title: "Research & leadership",
        duration: "Ongoing",
        items: ["Paper reading groups", "Reproduction projects", "Safety & evaluation research", "Mentoring junior members"],
      },
    ],
    papers: [
      { title: "Attention Is All You Need", authors: "Vaswani et al.", venue: "NeurIPS", year: "2017" },
      { title: "Scaling Laws for Neural Language Models", authors: "Kaplan et al.", venue: "arXiv", year: "2020" },
      { title: "Constitutional AI: Harmlessness from AI Feedback", authors: "Bai et al.", venue: "arXiv", year: "2022" },
      { title: "Chain-of-Thought Prompting Elicits Reasoning", authors: "Wei et al.", venue: "NeurIPS", year: "2022" },
    ],
    tutorials: [
      { title: "Your first fine-tune: a practical walkthrough", level: "Intermediate", duration: "90 min", author: "Elena Marchetti" },
      { title: "Evaluation done right: beyond accuracy", level: "Intermediate", duration: "75 min", author: "Priya Natarajan" },
      { title: "From notebook to production inference", level: "Advanced", duration: "2 hrs", author: "James Okoro" },
      { title: "Neural networks, explained with one spreadsheet", level: "Beginner", duration: "45 min", author: "Rahul Venkatesh" },
    ],
    resources: [
      { title: "Deep Learning (Goodfellow, Bengio, Courville)", org: "MIT Press", kind: "Book" },
      { title: "CS231n / CS224n lecture series", org: "Stanford", kind: "Course" },
      { title: "Hugging Face documentation", org: "Hugging Face", kind: "Docs" },
      { title: "Papers With Code", org: "Community", kind: "Index" },
    ],
    facts: [
      { value: "FOCUS", label: "Foundation models & reasoning" },
      { value: "32", label: "Tutorials & workshops" },
      { value: "120+", label: "Papers discussed" },
    ],
  },
  quantum: {
    domain: "quantum",
    headline: "Where computation meets the physics that constrains it.",
    overview: [
      "Quantum computing is the rare field where a physics breakthrough becomes an engineering discipline in real time. Our members span superconducting hardware, trapped ions, error-correcting code design, and the algorithms that will matter once logical qubits arrive.",
      "The quantum track is deliberately honest about timelines: we teach what is real today — NISQ-era constraints, noise characterization, hybrid algorithms — while preparing members for the fault-tolerant era.",
    ],
    beginnerGuide: [
      { title: "Learn the quantum circuit model", text: "Qubits, gates, measurement, entanglement. Work through the first chapters of Nielsen & Chuang with a simulator open." },
      { title: "Program on real hardware", text: "Run your first circuits on cloud quantum processors. Feeling the noise floor firsthand is a rite of passage." },
      { title: "Understand where quantum wins", text: "Shor, Grover, and — most importantly — what classical computers still do better. Skepticism is part of the craft." },
      { title: "Study error correction early", text: "Surface codes and logical qubits are the center of gravity now. Don't defer them." },
      { title: "Join a reading group", text: "Quantum papers reward collective reading. Our weekly circle dissects one paper at a time." },
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Quantum fundamentals",
        duration: "Months 0–4",
        items: ["Linear algebra refresh", "Qubits, gates & circuits", "Python + Qiskit/Cirq basics", "First runs on cloud QPUs"],
      },
      {
        phase: "Phase 2",
        title: "Algorithms & noise",
        duration: "Months 4–10",
        items: ["Deutsch–Jozsa to Grover", "VQE & QAOA (honest limits)", "Noise models & mitigation", "Quantum chemistry intro"],
      },
      {
        phase: "Phase 3",
        title: "Error correction era",
        duration: "Months 10–20",
        items: ["Stabilizer formalism", "Surface codes & decoding", "Logical qubit experiments", "Fault-tolerant protocols"],
      },
      {
        phase: "Phase 4",
        title: "Research frontiers",
        duration: "Ongoing",
        items: ["Hardware tracks (SC / ions / photonics)", "Quantum networking", "Post-quantum implications", "Conference paper projects"],
      },
    ],
    papers: [
      { title: "Quantum Computation with Quantum Dots", authors: "Loss & DiVincenzo", venue: "Physical Review A", year: "1998" },
      { title: "Surface Code Quantum Error Correction", authors: "Fowler et al.", venue: "Physical Review A", year: "2012" },
      { title: "Quantum supremacy using a programmable processor", authors: "Arute et al.", venue: "Nature", year: "2019" },
      { title: "Realizing repeated quantum error correction", authors: "Krinner et al.", venue: "Nature", year: "2022" },
    ],
    tutorials: [
      { title: "Entanglement, demystified in 40 minutes", level: "Beginner", duration: "40 min", author: "Rahul Venkatesh" },
      { title: "Your first circuit on a real QPU", level: "Beginner", duration: "60 min", author: "Wei Ling Tan" },
      { title: "Surface codes without tears", level: "Advanced", duration: "2 hrs", author: "Dr. Mira Kovács" },
      { title: "Benchmarking quantum hardware honestly", level: "Intermediate", duration: "80 min", author: "Yusof Rahman" },
    ],
    resources: [
      { title: "Quantum Computation and Quantum Information", org: "Nielsen & Chuang", kind: "Book" },
      { title: "Qiskit textbook & documentation", org: "IBM", kind: "Docs" },
      { title: "Quantum Country (Nielsen/Matuschak)", org: "Independent", kind: "Interactive" },
      { title: "arXiv quant-ph daily digest", org: "Community", kind: "Index" },
    ],
    facts: [
      { value: "RESEARCH", label: "Qubits & error correction" },
      { value: "18", label: "Reading group sessions / yr" },
      { value: "6", label: "Hardware platforms studied" },
    ],
  },
  cybersecurity: {
    domain: "cybersecurity",
    headline: "The craft of finding failure before adversaries do.",
    overview: [
      "Security is the discipline our community takes most seriously — because it has to be. Members range from SOC analysts and penetration testers to cryptography researchers and CISOs steering enterprise programs.",
      "The track covers offensive security, defense engineering, applied cryptography, and the emerging post-quantum transition. Everything is practiced in supervised labs with strict ethics rules.",
    ],
    beginnerGuide: [
      { title: "Learn how systems actually work", text: "Networking, operating systems, and HTTP at a packet level. You cannot break or defend what you do not understand." },
      { title: "Set up a home lab", text: "Virtual machines, an intentionally vulnerable box, Wireshark running. Curiosity in a sandbox beats theory." },
      { title: "Practice in legal arenas", text: "CTFs and guided labs only. Our community runs monthly competitions under a clear code of conduct." },
      { title: "Pick a lane, then widen it", text: "Web, network, cloud, malware, or crypto — go deep in one, then borrow tools from the others." },
      { title: "Learn to write it up", text: "A finding nobody can reproduce or understand is not a finding. Report writing is a core skill here." },
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Systems foundations",
        duration: "Months 0–4",
        items: ["TCP/IP & DNS at packet level", "Linux & Windows internals", "Web architecture & HTTP", "Intro to cryptography"],
      },
      {
        phase: "Phase 2",
        title: "Core tradecraft",
        duration: "Months 4–10",
        items: ["OWASP Top 10 in the lab", "Network traffic analysis", "Threat modeling", "Scripting for security"],
      },
      {
        phase: "Phase 3",
        title: "Specialization",
        duration: "Months 10–18",
        items: ["Red team operations", "Blue team / detection engineering", "Cloud security", "Applied crypto & PKI"],
      },
      {
        phase: "Phase 4",
        title: "Leadership & research",
        duration: "Ongoing",
        items: ["Post-quantum migration planning", "Vulnerability research & disclosure", "Security program design", "Mentoring lab newcomers"],
      },
    ],
    papers: [
      { title: "End-To-End Arguments in System Design", authors: "Saltzer, Reed, Clark", venue: "ACM TOCS", year: "1984" },
      { title: "Why Johnny Can't Encrypt", authors: "Whitten & Tygar", venue: "USENIX Security", year: "1999" },
      { title: "SoK: (State of) The Art of War on Offensive Security", authors: "Happe et al.", venue: "IEEE S&P", year: "2019" },
      { title: "CRYSTALS-Kyber specification", authors: "Avanzi et al.", venue: "NIST PQC", year: "2021" },
    ],
    tutorials: [
      { title: "Packet-level networking from zero", level: "Beginner", duration: "70 min", author: "Sarah Okafor" },
      { title: "Threat modeling a real product", level: "Intermediate", duration: "90 min", author: "Marcus Reid" },
      { title: "Building detection rules that survive", level: "Advanced", duration: "100 min", author: "Nurul Aisyah" },
      { title: "Post-quantum migration checklist", level: "Intermediate", duration: "60 min", author: "Devan Kumar" },
    ],
    resources: [
      { title: "The Web Application Hacker's Handbook", org: "Wiley", kind: "Book" },
      { title: "OWASP testing guide", org: "OWASP", kind: "Docs" },
      { title: "OverTheWire & HackTheBox", org: "Community", kind: "Labs" },
      { title: "MITRE ATT&CK", org: "MITRE", kind: "Framework" },
    ],
    facts: [
      { value: "PRACTICE", label: "Offense & defense labs" },
      { value: "24", label: "Labs & CTFs per year" },
      { value: "100%", label: "Ethics-code signers" },
    ],
  },
  governance: {
    domain: "governance",
    headline: "The architecture of institutional accountability for frontier models.",
    overview: [
      "AI Governance is the technical and policy discipline steering frontier model development toward safety, transparency, and societal alignment. Our members build risk assessment frameworks, algorithmic audit protocols, and human-machine decision structures.",
      "The track brings together machine learning researchers, legal scholars, compliance engineers, and policy analysts creating verifiable safety benchmarks and governance standards.",
    ],
    beginnerGuide: [
      { title: "Understand global regulatory frameworks", text: "Study the EU AI Act, NIST AI RMF, and ISO/IEC 42001. Learn how policy translates into technical requirements." },
      { title: "Master algorithmic audit methodologies", text: "Bias detection, red-teaming, interpretability tools, and automated compliance logging." },
      { title: "Explore model alignment & safety evaluations", text: "Constitutional AI, RLAIF, automated benchmark suites, and safety guardrails." },
      { title: "Analyze human-machine decision systems", text: "Human-in-the-loop protocols, oversight mechanisms, and algorithmic accountability." },
      { title: "Participate in policy circles", text: "Join our monthly governance circles examining legislative drafts and technical standards." },
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Governance foundations",
        duration: "Months 0–4",
        items: ["AI Risk Management Frameworks", "Introduction to Model Ethics", "Regulatory landscape overview", "Algorithmic bias fundamentals"],
      },
      {
        phase: "Phase 2",
        title: "Audit & Evaluation",
        duration: "Months 4–10",
        items: ["Model red-teaming & evaluation", "Transparency & interpretability tools", "Compliance logging pipelines", "Safety benchmark suites"],
      },
      {
        phase: "Phase 3",
        title: "Institutional Alignment",
        duration: "Months 10–18",
        items: ["Human-in-the-loop system design", "Third-party auditing protocols", "Cross-border AI policy analysis", "Enterprise risk governance"],
      },
      {
        phase: "Phase 4",
        title: "Frontier Policy & Standards",
        duration: "Ongoing",
        items: ["International safety agreements", "Autonomous agent governance", "Standard-setting working groups", "Policy whitepaper publications"],
      },
    ],
    papers: [
      { title: "NIST Artificial Intelligence Risk Management Framework (AI RMF 1.0)", authors: "NIST", venue: "NIST Publication", year: "2023" },
      { title: "EU Artificial Intelligence Act (Full Text)", authors: "European Parliament", venue: "Official Journal", year: "2024" },
      { title: "Auditing Algorithms: Research Methods for Detecting Bias", authors: "Sandvig et al.", venue: "ICA Conference", year: "2014" },
      { title: "Model Cards for Model Reporting", authors: "Mitchell et al.", venue: "FAT* Conference", year: "2019" },
    ],
    tutorials: [
      { title: "Implementing NIST AI RMF in production", level: "Beginner", duration: "75 min", author: "Tomohiro Sato" },
      { title: "Automated model red-teaming walkthrough", level: "Intermediate", duration: "90 min", author: "Elena Marchetti" },
      { title: "Building verifiable model cards & audit trails", level: "Intermediate", duration: "60 min", author: "Wei Ling Tan" },
      { title: "EU AI Act compliance checklist for engineering teams", level: "Advanced", duration: "2 hrs", author: "Tomohiro Sato" },
    ],
    resources: [
      { title: "NIST AI Risk Management Framework", org: "NIST", kind: "Framework" },
      { title: "OECD AI Principles Observatory", org: "OECD", kind: "Policy" },
      { title: "AI Safety Institute Benchmark Repository", org: "AISI", kind: "Tools" },
      { title: "ISO/IEC 42001 AI Management Standard", org: "ISO", kind: "Standard" },
    ],
    facts: [
      { value: "ALIGNED", label: "Safety & policy frameworks" },
      { value: "14", label: "Policy whitepapers published" },
      { value: "100%", label: "Responsible AI practitioners" },
    ],
  },
};

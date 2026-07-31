import { db } from "@/db";
import { communityPosts, postComments } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";

type SeedPost = {
  author: string;
  authorRole: string;
  kind: string;
  domain: string;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  comments: { author: string; body: string }[];
};

const SEED_POSTS: SeedPost[] = [
  {
    author: "Priya Natarajan",
    authorRole: "ML Engineer · Bengaluru",
    kind: "article",
    domain: "ai",
    title: "A practical note on evaluating reasoning models without fooling yourself",
    body: "After three months of eval work on our inference-time reasoning project, three rules have survived contact with reality: (1) score final answers AND traces separately — convincing traces hide wrong answers more often than you'd expect; (2) never evaluate on prompts your team wrote from memory, sample them from real user logs; (3) budget a fixed eval set nobody is allowed to tune against. Happy to share our harness template with anyone starting similar work.",
    tags: ["evaluation", "reasoning", "llm"],
    likes: 48,
    comments: [
      { author: "James Okoro", body: "Rule 3 is the one everyone breaks, then wonders why the eval went up and the product got worse. Sharing this with my team." },
      { author: "Elena Marchetti", body: "Would love to see the harness at the next AI circle session — adding it to the agenda." },
    ],
  },
  {
    author: "Yusof Rahman",
    authorRole: "Quantum Researcher · Singapore",
    kind: "question",
    domain: "quantum",
    title: "Realistic expectations for VQE on today's hardware?",
    body: "I keep seeing benchmark claims for VQE that don't survive contact with noise models. For those of you running experiments: what chemical accuracy gaps are you actually observing on ~100-qubit superconducting devices, and is error mitigation closing them meaningfully? Trying to calibrate what I tell students in our reading group.",
    tags: ["vqe", "nisq", "benchmarking"],
    likes: 31,
    comments: [
      { author: "Dr. Mira Kovács", body: "Honest answer: mitigation helps by a factor, not an order of magnitude. For teaching, I'd show both the ideal and noisy curves side by side — the delta is the actual lesson." },
      { author: "Rahul Venkatesh", body: "Our Phase 2 roadmap now includes exactly this comparison. Steal the framing — it lands." },
    ],
  },
  {
    author: "Nurul Aisyah",
    authorRole: "Security Lead · Kuala Lumpur",
    kind: "achievement",
    domain: "cybersecurity",
    title: "Our SOC simulation lab format is now a repeatable playbook",
    body: "After six iterations, the KL chapter's SOC simulation has a documented playbook: environment specs, adversary scripts, scoring rubric, and the debrief structure that makes it stick. Any chapter or study circle can run it. The valid-credentials scenario produced the best discussions we've ever had — watching defenders hunt an attacker who technically 'belongs' changes how people think about identity.",
    tags: ["soc", "blue-team", "labs"],
    likes: 64,
    comments: [
      { author: "Sarah Okafor", body: "This is exactly the kind of artifact the whole community should inherit. Pinning it in the security library." },
      { author: "Arjun Mehta", body: "Delhi NCR will run this in April. Will report back with adaptations for a 50-person room." },
    ],
  },
  {
    author: "Arun Subramaniam",
    authorRole: "Ground Systems Engineer · Penang",
    kind: "project",
    domain: "space",
    title: "Open-sourcing my CubeSat telemetry dashboard",
    body: "Built over the last two evenings-of-the-week: a lightweight dashboard that ingests CSP telemetry from our study satellite simulator, decodes frames, and renders power/thermal/comms state in real time. Deliberately boring stack — SQLite, a small API, server-rendered charts — because ground software should be debuggable at 2 a.m. Repo link in the project channel. PRs welcome, especially from anyone who has touched real flight software.",
    tags: ["cubesat", "telemetry", "ground-segment"],
    likes: 57,
    comments: [
      { author: "Tomohiro Sato", body: "The 'boring stack' philosophy is exactly right for ground systems. Featuring this in the space track newsletter." },
    ],
  },
  {
    author: "Lena Hoffmann",
    authorRole: "ML Engineer · Remote",
    kind: "article",
    domain: "ai",
    title: "What nobody tells you about quantization regression",
    body: "We shipped a 4-bit quantized model that looked perfect on our eval suite and degraded badly for one user segment — long, code-switched queries. The lesson: quantization errors aren't uniform, and aggregate metrics will not show you where they concentrate. Now we run segment-level evals before any precision change. Small note, expensive to learn.",
    tags: ["quantization", "edge", "deployment"],
    likes: 42,
    comments: [
      { author: "Priya Natarajan", body: "Segment-level eval should be default practice. We hit the same failure mode last quarter." },
    ],
  },
  {
    author: "Devan Kumar",
    authorRole: "Labs Lead · Penang",
    kind: "question",
    domain: "cybersecurity",
    title: "How are you sequencing PQC migration for embedded firmware?",
    body: "Server-side crypto migration is well-trodden. Firmware with 10-year device lifetimes and 64KB flash budgets is a different animal. Has anyone here completed a Kyber/Dilithium migration on constrained devices? Particularly interested in how you handled boot-chain verification and rollback protection during the hybrid phase.",
    tags: ["post-quantum", "embedded", "firmware"],
    likes: 29,
    comments: [
      { author: "Marcus Reid", body: "We did exactly this last year — the flash budget forced us to XMSS for boot verification and Dilithium only for runtime attestation. Happy to walk through the trade-offs on a call." },
    ],
  },
  {
    author: "Wei Ling Tan",
    authorRole: "APAC Chapters Lead · Singapore",
    kind: "achievement",
    domain: "quantum",
    title: "Our members got 3 of 12 slots in the national quantum internship",
    body: "The selection committee specifically mentioned the quality of applicants' reading-group write-ups. If you've been wondering whether the weekly paper circles matter: they do, and they show up in applications. Next cohort meets Thursdays — newcomers welcome, no prerequisites beyond linear algebra and honesty about what you don't understand.",
    tags: ["careers", "reading-group", "quantum"],
    likes: 73,
    comments: [
      { author: "Rahul Venkatesh", body: "This is the flywheel working exactly as designed. Congratulations to all three." },
      { author: "Yusof Rahman", body: "One of the three was in my study circle two semesters ago. The write-up habit is everything." },
    ],
  },
  {
    author: "Ananya Iyer",
    authorRole: "EO Researcher · Bengaluru",
    kind: "project",
    domain: "space",
    title: "Turning 10 years of open EO data into one queryable time series",
    body: "The chapter project from the satellite data study circle is live: a calibrated, cloud-optimized time series of our region's reservoir surface area from a decade of public imagery, with a reproducible pipeline anyone can fork. First finding already cited by a local research group studying drawdown patterns. Data work like this is the strongest proof that small teams can do real science with open archives.",
    tags: ["earth-observation", "open-data", "pipeline"],
    likes: 51,
    comments: [
      { author: "Tomohiro Sato", body: "From pixels to decisions, exactly as the track intends. The reservoir finding deserves a full article — volunteer?" },
    ],
  },
];

let seeded = false;

export async function ensureSeed() {
  if (seeded) return;
  seeded = true;
  try {
    const existing = await db.select({ id: communityPosts.id }).from(communityPosts).limit(1);
    if (existing.length > 0) return;

    for (const p of SEED_POSTS) {
      const [inserted] = await db
        .insert(communityPosts)
        .values({
          author: p.author,
          authorRole: p.authorRole,
          kind: p.kind,
          domain: p.domain,
          title: p.title,
          body: p.body,
          tags: p.tags,
          likes: p.likes,
        })
        .returning({ id: communityPosts.id });

      if (p.comments.length > 0) {
        await db.insert(postComments).values(
          p.comments.map((c) => ({
            postId: inserted.id,
            author: c.author,
            body: c.body,
          })),
        );
      }
    }
  } catch (err) {
    // Table may not exist yet before drizzle push; fail soft.
    seeded = false;
    console.error("Seed skipped:", err instanceof Error ? err.message : err);
  }
}

export async function listPosts(kind?: string, domain?: string) {
  await ensureSeed();
  const conditions = [];
  if (kind && kind !== "all") conditions.push(eq(communityPosts.kind, kind));
  if (domain && domain !== "all") conditions.push(eq(communityPosts.domain, domain));

  const rows = await db
    .select({
      id: communityPosts.id,
      author: communityPosts.author,
      authorRole: communityPosts.authorRole,
      kind: communityPosts.kind,
      domain: communityPosts.domain,
      title: communityPosts.title,
      body: communityPosts.body,
      tags: communityPosts.tags,
      likes: communityPosts.likes,
      createdAt: communityPosts.createdAt,
    })
    .from(communityPosts)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(communityPosts.id);

  const ids = rows.map((r) => r.id);
  const comments =
    ids.length > 0
      ? await db.select({ id: postComments.id, postId: postComments.postId, author: postComments.author, body: postComments.body, createdAt: postComments.createdAt }).from(postComments).where(inArray(postComments.postId, ids))
      : [];

  return rows
    .map((r) => ({
      ...r,
      comments: comments.filter((c) => c.postId === r.id),
    }))
    .reverse();
}

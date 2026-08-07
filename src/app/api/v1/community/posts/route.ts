import { type NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/response";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const domain = searchParams.get("domain");
  const kind = searchParams.get("kind");

  const samplePosts = [
    {
      id: "post_1",
      author: "Dr. Elena Marchetti",
      authorRole: "Quantum Hardware Lead · Zurich",
      kind: "ARTICLE",
      domain: "quantum",
      title: "Superconducting qubit coherence times extended by 3x using niobium capping",
      body: "Surface dielectric loss remains the primary bottleneck for 2D transmon lifetime...",
      tags: ["Quantum", "Superconducting", "Materials"],
      likeCount: 42,
      createdAt: new Date().toISOString(),
    },
    {
      id: "post_2",
      author: "Aris Thorne",
      authorRole: "AI Architect · San Francisco",
      kind: "PROJECT",
      domain: "ai",
      title: "Open-source sparse attention kernel for local LLM inference",
      body: "Sub-quadratic memory scaling achieved through block-sparse matrix multiplication...",
      tags: ["AI", "LLM", "CUDA"],
      likeCount: 68,
      createdAt: new Date().toISOString(),
    },
  ];

  let filtered = samplePosts;
  if (domain && domain !== "all") {
    filtered = filtered.filter((p) => p.domain === domain);
  }
  if (kind && kind !== "all") {
    filtered = filtered.filter((p) => p.kind.toLowerCase() === kind.toLowerCase());
  }

  return apiSuccess(filtered, { total: filtered.length });
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return apiError("Unauthorized — authentication required to write a post.", 401);
  }

  try {
    const body = await request.json();
    const { title, body: content, domain, kind, tags } = body;

    if (!title || !content || !domain) {
      return apiError("Title, content, and domain are required.", 400);
    }

    const newPost = {
      id: "post_" + Math.random().toString(36).substring(2, 9),
      authorId: userId,
      author: "Verified Member",
      authorRole: "Practitioner",
      kind: (kind || "ARTICLE").toUpperCase(),
      domain: domain.toLowerCase(),
      title: title.trim(),
      body: content.trim(),
      tags: Array.isArray(tags) ? tags : [],
      likeCount: 0,
      createdAt: new Date().toISOString(),
    };

    return apiSuccess(newPost, undefined, 201);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create post.";
    return apiError(msg, 500);
  }
}

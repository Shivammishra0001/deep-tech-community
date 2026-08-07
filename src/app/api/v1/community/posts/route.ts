import { type NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/response";
import { GoogleSheetsDB, SHEET_TABS } from "@/lib/google-sheets-db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const domain = searchParams.get("domain");
  const kind = searchParams.get("kind");

  const rows = await GoogleSheetsDB.readRows(SHEET_TABS.COMMUNITY_POSTS);

  // Map Google Sheets rows to post objects
  let posts = rows.map((r) => ({
    id: r[0] || "post_1",
    author: r[1] || "Dr. Elena Marchetti",
    authorRole: "Practitioner",
    domain: r[3] || "quantum",
    kind: r[4] || "ARTICLE",
    title: r[5] || "Deep Tech Research Note",
    body: r[6] || "",
    tags: r[7] ? r[7].split(",") : ["DeepTech"],
    likeCount: parseInt(r[8] || "0", 10),
    createdAt: r[9] || new Date().toISOString(),
  }));

  if (posts.length === 0) {
    posts = [
      {
        id: "post_sample_1",
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
    ];
  }

  if (domain && domain !== "all") {
    posts = posts.filter((p) => p.domain.toLowerCase() === domain.toLowerCase());
  }
  if (kind && kind !== "all") {
    posts = posts.filter((p) => p.kind.toLowerCase() === kind.toLowerCase());
  }

  return apiSuccess(posts, { total: posts.length });
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

    const postId = "post_" + Math.random().toString(36).substring(2, 9);
    const authorName = "Verified Member";
    const authorEmail = userId;
    const domainFocus = domain.toLowerCase();
    const postKind = (kind || "ARTICLE").toUpperCase();
    const postTitle = title.trim();
    const postBody = content.trim();
    const postTags = Array.isArray(tags) ? tags.join(",") : "";
    const likesCount = 0;
    const createdAt = new Date().toISOString();

    const row = [postId, authorName, authorEmail, domainFocus, postKind, postTitle, postBody, postTags, likesCount, createdAt];
    await GoogleSheetsDB.appendRow(SHEET_TABS.COMMUNITY_POSTS, row);

    const newPost = {
      id: postId,
      authorId: userId,
      author: authorName,
      authorRole: "Practitioner",
      kind: postKind,
      domain: domainFocus,
      title: postTitle,
      body: postBody,
      tags: Array.isArray(tags) ? tags : [],
      likeCount: 0,
      createdAt,
    };

    return apiSuccess(newPost, undefined, 201);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create post.";
    return apiError(msg, 500);
  }
}

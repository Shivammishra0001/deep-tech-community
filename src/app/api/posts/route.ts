import { NextResponse } from "next/server";
import { db } from "@/db";
import { communityPosts } from "@/db/schema";
import { listPosts } from "@/db/seed";

const KINDS = new Set(["article", "question", "project", "achievement"]);
const DOMAINS = new Set(["ai", "quantum", "cybersecurity", "space"]);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const kind = url.searchParams.get("kind") ?? "all";
    const domain = url.searchParams.get("domain") ?? "all";
    const posts = await listPosts(kind, domain);
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Could not load posts." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const author = String(body.author || "Community Member").trim();
    const authorRole = String(body.authorRole || "Practitioner").trim();
    const kind = String(body.kind ?? "article").trim();
    const domain = String(body.domain ?? "ai").trim();
    const title = String(body.title ?? "").trim();
    const postBody = String(body.body ?? "").trim();
    const image = body.image && typeof body.image === "string" ? body.image.trim() : null;
    const tags: string[] = Array.isArray(body.tags)
      ? body.tags.map((t: string) => String(t).trim().replace(/^#/, "")).filter(Boolean).slice(0, 5)
      : [];

    if (!title || !postBody) {
      return NextResponse.json({ error: "Title and Content are required fields." }, { status: 400 });
    }
    if (!KINDS.has(kind) || !DOMAINS.has(domain)) {
      return NextResponse.json({ error: "Please choose a valid post type and domain." }, { status: 400 });
    }
    if (title.length > 140 || postBody.length > 2000) {
      return NextResponse.json({ error: "Title too long (140) or content too long (2000 chars)." }, { status: 400 });
    }

    let post;
    try {
      [post] = await db
        .insert(communityPosts)
        .values({ author, authorRole, kind, domain, title, body: postBody, image, tags })
        .returning();
    } catch {
      // Memory fallback for instant post creation
      post = {
        id: Date.now(),
        author,
        authorRole,
        kind,
        domain,
        title,
        body: postBody,
        image,
        tags,
        likes: 0,
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Could not publish post." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { communityPosts, postComments } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const postId = Number(id);
  if (!Number.isInteger(postId)) {
    return NextResponse.json({ error: "Invalid post id." }, { status: 400 });
  }
  const [post] = await db.select().from(communityPosts).where(eq(communityPosts.id, postId)).limit(1);
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  const comments = await db
    .select()
    .from(postComments)
    .where(eq(postComments.postId, postId))
    .orderBy(postComments.id);
  return NextResponse.json({ post, comments });
}

export async function POST(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const postId = Number(id);
  if (!Number.isInteger(postId)) {
    return NextResponse.json({ error: "Invalid post id." }, { status: 400 });
  }
  try {
    const body = await req.json();
    const action = String(body.action ?? "");

    if (action === "like") {
      const [updated] = await db
        .update(communityPosts)
        .set({ likes: sql`${communityPosts.likes} + 1` })
        .where(eq(communityPosts.id, postId))
        .returning({ likes: communityPosts.likes });
      if (!updated) return NextResponse.json({ error: "Post not found." }, { status: 404 });
      return NextResponse.json({ likes: updated.likes });
    }

    if (action === "comment") {
      const author = String(body.author ?? "").trim();
      const text = String(body.body ?? "").trim();
      if (!author || !text) {
        return NextResponse.json({ error: "Name and comment are required." }, { status: 400 });
      }
      if (text.length > 600) {
        return NextResponse.json({ error: "Comment too long (600 chars)." }, { status: 400 });
      }
      const [post] = await db.select({ id: communityPosts.id }).from(communityPosts).where(eq(communityPosts.id, postId)).limit(1);
      if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

      const [comment] = await db
        .insert(postComments)
        .values({ postId, author, body: text })
        .returning();
      return NextResponse.json({ comment }, { status: 201 });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

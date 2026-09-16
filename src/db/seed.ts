import { db } from "@/db";
import { communityPosts, postComments } from "@/db/schema";
import { inArray } from "drizzle-orm";

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

/**
 * Fallback/seed posts.
 *
 * Empty on purpose: the forum shows real member posts or nothing. Seeding
 * invented authors made the community look active when it was not.
 */
const SEED_POSTS: SeedPost[] = [];

let seeded = false;

export async function ensureSeed() {
  if (seeded) return;
  try {
    const existing = await db.select({ id: communityPosts.id }).from(communityPosts).limit(1);
    if (existing.length === 0) {
      for (const p of SEED_POSTS) {
        const [post] = await db
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
          .returning();

        if (post && p.comments.length > 0) {
          await db.insert(postComments).values(
            p.comments.map((c) => ({
              postId: post.id,
              author: c.author,
              body: c.body,
            }))
          );
        }
      }
    }
    seeded = true;
  } catch (err) {
    console.warn("DB seed skipped or failed (falling back to static seed data):", err instanceof Error ? err.message : err);
  }
}

export async function listPosts(kind = "all", domain = "all"): Promise<SeedPost[]> {
  try {
    let posts = await db.select().from(communityPosts);
    if (posts.length === 0) {
      await ensureSeed();
      posts = await db.select().from(communityPosts);
    }
    if (posts.length === 0) {
      return filterPosts(SEED_POSTS, kind, domain);
    }

    const postIds = posts.map((p) => p.id);
    const comments = postIds.length > 0 ? await db.select().from(postComments).where(inArray(postComments.postId, postIds)) : [];

    const commentsByPost = new Map<number, { author: string; body: string }[]>();
    for (const c of comments) {
      const list = commentsByPost.get(c.postId) || [];
      list.push({ author: c.author, body: c.body });
      commentsByPost.set(c.postId, list);
    }

    const mapped: SeedPost[] = posts.map((p) => ({
      author: p.author,
      authorRole: p.authorRole,
      kind: p.kind,
      domain: p.domain,
      title: p.title,
      body: p.body,
      tags: p.tags,
      likes: p.likes,
      comments: commentsByPost.get(p.id) || [],
    }));

    return filterPosts(mapped, kind, domain);
  } catch {
    return filterPosts(SEED_POSTS, kind, domain);
  }
}

function filterPosts(posts: SeedPost[], kind: string, domain: string): SeedPost[] {
  return posts.filter((p) => {
    if (kind !== "all" && p.kind !== kind) return false;
    if (domain !== "all" && p.domain !== domain) return false;
    return true;
  });
}

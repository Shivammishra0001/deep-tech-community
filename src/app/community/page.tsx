"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bookmark,
  MessageCircle,
  Heart,
  Loader2,
  PenLine,
  ChevronDown,
  Send,
  CircleHelp,
  FileText,
  FolderGit2,
  Trophy,
  Image as ImageIcon,
} from "lucide-react";
import { Container, PageHero, DomainBadge, Avatar, Tag, Input, Label, Select, Textarea, Button, Card, Badge, cx } from "@/components/ui";
import type { DomainSlug } from "@/data/core";

type Comment = { id: number; author: string; body: string };
type Post = {
  id: number;
  author: string;
  authorRole: string;
  kind: string;
  domain: DomainSlug;
  title: string;
  body: string;
  image?: string;
  tags: string[];
  likes: number;
  comments: Comment[];
};

const KIND_META: Record<string, { label: string; icon: typeof FileText }> = {
  article: { label: "Article", icon: FileText },
  question: { label: "Question", icon: CircleHelp },
  project: { label: "Project", icon: FolderGit2 },
  achievement: { label: "Achievement", icon: Trophy },
};

const KIND_FILTERS = [
  { value: "all", label: "Everything" },
  { value: "article", label: "Articles" },
  { value: "question", label: "Questions" },
  { value: "project", label: "Projects" },
  { value: "achievement", label: "Achievements" },
];

/* ------------------------------ Post composer ------------------------------ */

function Composer({ onPublished }: { onPublished: (p: Post) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [kind, setKind] = useState("article");
  const [domain, setDomain] = useState<DomainSlug>("ai");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const handleWritePostClick = () => {
    try {
      const stored = localStorage.getItem("dts_user") || localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) setName(parsed.name);
        setOpen(true);
        return;
      }
    } catch {}

    // User is not logged in -> navigate directly to login page
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  async function publish(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: name.trim() || "Community Member",
          authorRole: role.trim() || "Practitioner",
          kind,
          domain,
          title,
          body,
          image: image.trim() || undefined,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState("error");
        setError(data.error ?? "Could not publish.");
        return;
      }
      onPublished({ ...data.post, comments: [] });
      setTitle("");
      setBody("");
      setImage("");
      setTags("");
      setOpen(false);
      setState("idle");
    } catch {
      setState("error");
      setError("Network error — please try again.");
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  if (!open) {
    return (
      <Card hover onClick={handleWritePostClick} className="cursor-pointer flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar name={name || "You"} />
          <span className="text-xs text-neutral-400">Share technical insights, upload diagrams, or publish a project…</span>
        </div>
        <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); handleWritePostClick(); }}>
          <PenLine className="size-3.5" aria-hidden /> Write Post
        </Button>
      </Card>
    );
  }

  return (
    <Card className="border-neutral-900 dark:border-neutral-100">
      <form onSubmit={publish}>
        <div className="flex items-center justify-between">
          <p className="font-display text-base font-semibold text-neutral-900 dark:text-neutral-100">Create Community Post</p>
          <button type="button" onClick={() => setOpen(false)} className="font-mono text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            [Cancel]
          </button>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="c-name">Full Name</Label>
            <Input id="c-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Elena Marchetti" />
          </div>
          <div>
            <Label htmlFor="c-role">Role / Institution</Label>
            <Input id="c-role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Systems Engineer · Lab lead" />
          </div>
          <div>
            <Label htmlFor="c-kind">Post Classification</Label>
            <Select id="c-kind" value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="article">Article — Technical breakdown</option>
              <option value="question">Question — Domain query</option>
              <option value="project">Project — Open-source release</option>
              <option value="achievement">Achievement — Milestone</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="c-domain">Core Domain</Label>
            <Select id="c-domain" value={domain} onChange={(e) => setDomain(e.target.value as DomainSlug)}>
              <option value="ai">Artificial Intelligence</option>
              <option value="quantum">Quantum Computing</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="space">Space Technology</option>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="c-title">Title</Label>
          <Input id="c-title" required maxLength={140} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Specific technical title" />
        </div>
        <div className="mt-4">
          <Label htmlFor="c-body">Content &amp; References</Label>
          <Textarea id="c-body" required maxLength={2000} rows={5} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Provide full context, methodologies, trade-offs, and empirical findings." />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="c-image">IMAGE / DIAGRAM URL (OPTIONAL)</Label>
            <div className="space-y-2">
              <Input
                id="c-image"
                value={image.startsWith("data:") ? "" : image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://... (or choose file below)"
              />
              <div className="flex items-center gap-2">
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-neutral-300 bg-neutral-100 px-3 py-1.5 font-mono text-xs font-semibold text-neutral-800 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
                  <ImageIcon className="size-3.5" />
                  <span>Upload Local Image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="font-mono text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    [Clear Image]
                  </button>
                )}
              </div>
            </div>

            {/* Live Image Preview Box */}
            {image && (
              <div className="relative mt-3 aspect-[16/9] w-full overflow-hidden rounded-md border border-neutral-300 bg-neutral-900 dark:border-neutral-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Preview" className="size-full object-cover" />
                <span className="absolute bottom-2 left-2 rounded-sm bg-neutral-950/80 px-2 py-0.5 font-mono text-[10px] text-neutral-300 backdrop-blur-md">
                  Image Attached
                </span>
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="c-tags">Tags (Comma-separated)</Label>
            <Input id="c-tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="post-quantum, cryptography, lattice" />
          </div>
        </div>
        {state === "error" && (
          <p role="alert" className="mt-4 font-mono text-xs text-neutral-900 dark:text-neutral-100">
            {error}
          </p>
        )}
        <div className="mt-6 flex justify-end">
          <Button type="submit" variant="primary" size="md" disabled={state === "loading"}>
            {state === "loading" ? "Publishing..." : "Publish Post"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

/* -------------------------------- Post card -------------------------------- */

function PostCard({ post, onUpdate }: { post: Post; onUpdate: (p: Post) => void }) {
  const meta = KIND_META[post.kind] ?? KIND_META.article;
  const Icon = meta.icon;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [sending, setSending] = useState(false);

  async function like() {
    if (liked) return;
    setLiked(true);
    onUpdate({ ...post, likes: post.likes + 1 });
    try {
      await fetch(`/api/posts/${post.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
    } catch {
      /* optimistic update */
    }
  }

  async function addComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentName.trim() || !commentBody.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "comment", author: commentName, body: commentBody }),
      });
      const data = await res.json();
      if (res.ok) {
        onUpdate({ ...post, comments: [...post.comments, data.comment] });
        setCommentBody("");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <Card hover className="flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar name={post.author} domain={post.domain} kind={post.kind} />
            <div>
              <p className="font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">{post.author}</p>
              <p className="font-mono text-[11px] text-neutral-400">{post.authorRole}</p>
            </div>
          </div>
          <Badge>
            <Icon className="mr-1 size-3" />
            {meta.label}
          </Badge>
        </div>

        <h3 className="mt-4 font-display text-base font-semibold leading-snug tracking-tight text-neutral-900 dark:text-neutral-100">
          {post.title}
        </h3>
        <p className="mt-2.5 whitespace-pre-line text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">{post.body}</p>

        {post.image && (
          <div className="mt-4 overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800 max-h-64">
            <img
              src={post.image}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop";
              }}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <DomainBadge domain={post.domain} />
          {post.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 font-mono text-xs dark:border-neutral-800">
        <div className="flex items-center gap-4">
          <button
            onClick={like}
            className={cx("flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100", liked ? "text-neutral-900 dark:text-neutral-100 font-bold" : "text-neutral-500")}
          >
            <Heart className={cx("size-3.5", liked && "fill-current")} />
            <span>{post.likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <MessageCircle className="size-3.5" />
            <span>{post.comments.length}</span>
            <ChevronDown className={cx("size-3 transition-transform", showComments && "rotate-180")} />
          </button>
        </div>

        <button
          onClick={() => setSaved(!saved)}
          className={cx("flex items-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-100", saved ? "text-neutral-900 dark:text-neutral-100 font-bold" : "text-neutral-500")}
        >
          <Bookmark className={cx("size-3.5", saved && "fill-current")} />
          <span>{saved ? "Saved" : "Save"}</span>
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
          {post.comments.length > 0 && (
            <ul className="space-y-3">
              {post.comments.map((c) => (
                <li key={c.id} className="flex gap-3 text-xs">
                  <Avatar name={c.author} className="size-6 text-[8px]" />
                  <div className="min-w-0 flex-1 rounded-md border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-950">
                    <p className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">{c.author}</p>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={addComment} className="mt-3 flex gap-2">
            <Input
              required
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="Name"
              className="h-8 w-28 text-xs font-mono"
            />
            <Input
              required
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Add technical comment..."
              className="h-8 text-xs font-mono"
            />
            <Button type="submit" variant="primary" size="sm" disabled={sending}>
              <Send className="size-3" />
            </Button>
          </form>
        </div>
      )}
    </Card>
  );
}

/* ---------------------------------- Page ----------------------------------- */

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [filter, setFilter] = useState("all");
  const [domainFilter, setDomainFilter] = useState("all");

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts ?? []))
      .catch(() => setPosts([]));
  }, []);

  const updatePost = useCallback((p: Post) => {
    setPosts((prev) => (prev ? prev.map((x) => (x.id === p.id ? p : x)) : prev));
  }, []);

  const visible = useMemo(() => {
    if (!posts) return [];
    return posts.filter(
      (p) => (filter === "all" || p.kind === filter) && (domainFilter === "all" || p.domain === domainFilter),
    );
  }, [posts, filter, domainFilter]);

  return (
    <>
      <PageHero
        eyebrow="Community Forum"
        title="Practitioner Knowledge Exchange."
        description="Write technical articles, upload diagrams, share open projects, post achievements, ask domain queries, and engage in peer discussions."
      />
      <Container className="grid gap-8 py-16 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <Composer
            onPublished={(p) => {
              setPosts((prev) => (prev ? [p, ...prev] : [p]));
              setFilter("all");
            }}
          />

          {/* Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/80 pb-4 dark:border-neutral-800/80">
            <div className="flex flex-wrap gap-2">
              {KIND_FILTERS.map((f) => (
                <Button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  variant={filter === f.value ? "primary" : "ghost"}
                  size="sm"
                >
                  {f.label}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { v: "all", l: "ALL" },
                { v: "ai", l: "AI" },
                { v: "quantum", l: "QUANTUM" },
                { v: "cybersecurity", l: "CYBER" },
                { v: "space", l: "SPACE" },
              ].map((d) => (
                <Button
                  key={d.v}
                  onClick={() => setDomainFilter(d.v)}
                  variant={domainFilter === d.v ? "outline" : "ghost"}
                  size="sm"
                  className="font-mono text-[10px]"
                >
                  [{d.l}]
                </Button>
              ))}
            </div>
          </div>

          {/* Feed */}
          <div className="mt-6 space-y-4">
            {posts === null ? (
              <div className="grid place-items-center py-20">
                <Loader2 className="size-6 animate-spin text-neutral-400" />
              </div>
            ) : visible.length === 0 ? (
              <Card className="text-center py-12">
                <p className="font-mono text-xs text-neutral-400">No entries match the current filter criteria.</p>
              </Card>
            ) : (
              visible.map((p) => <PostCard key={p.id} post={p} onUpdate={updatePost} />)
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400">Community Charter</p>
            <ul className="mt-3 space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <li>• Technical depth over hot takes.</li>
              <li>• Security research requires responsible disclosure.</li>
              <li>• Code snippets must include environment reproduction details.</li>
              <li>• Respectful peer review across all career levels.</li>
            </ul>
          </Card>

          <Card>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400">Weekly Metrics</p>
            <dl className="mt-3 space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <dt className="text-neutral-500">Publications</dt>
                <dd className="font-bold text-neutral-900 dark:text-neutral-100">47</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Resolved Q&amp;As</dt>
                <dd className="font-bold text-neutral-900 dark:text-neutral-100">31</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Open Releases</dt>
                <dd className="font-bold text-neutral-900 dark:text-neutral-100">9</dd>
              </div>
            </dl>
          </Card>
        </aside>
      </Container>
    </>
  );
}

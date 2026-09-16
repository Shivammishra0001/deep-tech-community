"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Share2, Bookmark, Send, Check, User, Clock } from "lucide-react";
import { Avatar, Button, DomainBadge, Input, Card, cx } from "@/components/ui";
import type { DomainSlug } from "@/data/core";

export type NewsComment = {
  id: string;
  author: string;
  body: string;
  date: string;
};

export type NewsArticleInteractiveProps = {
  slug: string;
  title: string;
  domain: DomainSlug;
  date: string;
  author: string;
  summary: string;
  readTime?: string;
  image?: string;
  initialLikes?: number;
  initialComments?: NewsComment[];
};

export function NewsInteractiveCard({
  slug,
  title,
  domain,
  date,
  author,
  summary,
  readTime,
  image,
  initialLikes = 0,
  initialComments = [],
}: NewsArticleInteractiveProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<NewsComment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [copied, setCopied] = useState(false);

  function handleLike(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      setLikes((l) => l - 1);
      setIsLiked(false);
    } else {
      setLikes((l) => l + 1);
      setIsLiked(true);
    }
  }

  function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  }

  function handleShare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}/news/${slug}` : "";
    if (navigator.clipboard && url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    let authorName = "Community Member";
    try {
      const user = localStorage.getItem("dts_user") || localStorage.getItem("user");
      if (user) {
        const parsed = JSON.parse(user);
        if (parsed?.name) authorName = parsed.name;
      }
    } catch {}

    const item: NewsComment = {
      id: `c_${Date.now()}`,
      author: authorName,
      body: newComment.trim(),
      date: "Just now",
    };

    setComments((prev) => [...prev, item]);
    setNewComment("");
  }

  return (
    <Card hover className="group flex flex-col justify-between overflow-hidden p-0 transition-all duration-300">
      {image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/80 bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <DomainBadge domain={domain} />
            <span className="rounded-md border border-border-strong bg-surface/90 px-2.5 py-1 font-mono text-xs font-bold text-primary backdrop-blur-md">
              {date}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          {!image && (
            <div className="mb-3 flex items-center justify-between gap-2">
              <DomainBadge domain={domain} />
              <span className="font-mono text-xs font-semibold text-body">{date}</span>
            </div>
          )}
          <h3 className="font-display text-lg sm:text-xl font-bold leading-snug tracking-tight group-hover:underline text-primary">
            <Link href={`/news/${slug}`}>{title}</Link>
          </h3>
          <p className="mt-3 line-clamp-3 font-sans text-sm sm:text-base leading-relaxed text-body font-medium">
            {summary}
          </p>
        </div>

        {/* Author & Read Time */}
        <div className="mt-6 flex items-center justify-between border-t pt-4 border-border/60">
          <div className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold text-body">
            <User className="size-4 text-primary" />
            <span>{author}</span>
          </div>
          {readTime && (
            <span className="flex items-center gap-1 font-sans text-xs sm:text-sm font-semibold text-body">
              <Clock className="size-4 text-primary" />
              {readTime}
            </span>
          )}
        </div>

        {/* Interactive Actions Toolbar: Like, Comment, Share, Save */}
        <div className="mt-4 flex items-center justify-between border-t pt-3 border-border/80">
          <div className="flex items-center gap-1.5">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={cx(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold transition-all duration-200 cursor-pointer",
                isLiked
                  ? "bg-rose-950/60 text-rose-400"
                  : "text-secondary hover:bg-elevated hover:text-primary"
              )}
              title={isLiked ? "Unlike" : "Like article"}
            >
              <Heart className={cx("size-4", isLiked && "fill-current text-rose-400")} />
              <span>{likes}</span>
            </button>

            {/* Comment Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowComments(!showComments);
              }}
              className={cx(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold transition-all duration-200 cursor-pointer",
                showComments
                  ? "bg-elevated text-primary"
                  : "text-secondary hover:bg-elevated hover:text-primary"
              )}
              title="View & add comments"
            >
              <MessageCircle className="size-4" />
              <span>{comments.length}</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="relative inline-flex items-center gap-1 rounded-lg p-1.5 text-secondary hover:bg-elevated hover:text-primary transition-colors cursor-pointer"
              title="Share article link"
            >
              {copied ? <Check className="size-4 text-emerald-400" /> : <Share2 className="size-4" />}
            </button>

            {/* Save / Bookmark Button */}
            <button
              onClick={handleSave}
              className={cx(
                "inline-flex items-center gap-1 rounded-lg p-1.5 transition-colors cursor-pointer",
                isSaved
                  ? "text-primary"
                  : "text-secondary hover:bg-elevated hover:text-primary"
              )}
              title={isSaved ? "Saved to bookmarks" : "Save article"}
            >
              <Bookmark className={cx("size-4", isSaved && "fill-current")} />
            </button>
          </div>
        </div>

        {/* Toast feedback when share link is copied */}
        {copied && (
          <p className="mt-2 text-center font-mono text-[10px] font-semibold text-emerald-400 animate-fade">
            Article link copied to clipboard!
          </p>
        )}

        {/* Collapsible Comment Drawer */}
        {showComments && (
          <div className="mt-4 space-y-3 border-t pt-3 border-border/80 animate-fade">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-secondary">
              Discussion ({comments.length})
            </p>

            <div className="max-h-48 space-y-2.5 overflow-y-auto pr-1">
              {comments.map((c) => (
                <div key={c.id} className="rounded-lg border p-2.5 text-xs border-border/90 bg-card/60">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-semibold text-primary">{c.author}</span>
                    <span className="font-mono text-[10px] text-secondary">{c.date}</span>
                  </div>
                  <p className="mt-1 font-sans text-body font-medium leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2 pt-1">
              <Input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a technical comment..."
                className="h-8 text-xs"
              />
              <Button type="submit" variant="primary" size="sm" className="h-8 px-3 shrink-0">
                <Send className="size-3" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </Card>
  );
}

export function ArticleDetailPageActions({
  title,
  slug,
  initialLikes = 0,
}: {
  title: string;
  slug: string;
  initialLikes?: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState<NewsComment[]>([]);
  const [newComment, setNewComment] = useState("");

  function handleLike() {
    if (isLiked) {
      setLikes((l) => l - 1);
      setIsLiked(false);
    } else {
      setLikes((l) => l + 1);
      setIsLiked(true);
    }
  }

  function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : `https://globaldeeptech.society/news/${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    let authorName = "Community Member";
    try {
      const user = localStorage.getItem("dts_user") || localStorage.getItem("user");
      if (user) {
        const parsed = JSON.parse(user);
        if (parsed?.name) authorName = parsed.name;
      }
    } catch {}

    setComments((prev) => [
      ...prev,
      {
        id: `c_${Date.now()}`,
        author: authorName,
        body: newComment.trim(),
        date: "Just now",
      },
    ]);
    setNewComment("");
  }

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card/60 p-6 sm:p-8 backdrop-blur-md">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div className="flex items-center gap-3">
          {/* Like */}
          <button
            onClick={handleLike}
            className={cx(
              "inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 cursor-pointer",
              isLiked
                ? "border-rose-900 bg-rose-950/60 text-rose-400"
                : "border-border-strong bg-surface text-body hover:bg-card"
            )}
          >
            <Heart className={cx("size-4", isLiked && "fill-current text-rose-400")} />
            <span>{likes} Likes</span>
          </button>

          {/* Save / Bookmark */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={cx(
              "inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 cursor-pointer",
              isSaved
                ? "border-inverted bg-inverted text-on-inverted"
                : "border-border-strong bg-surface text-body hover:bg-card"
            )}
          >
            <Bookmark className={cx("size-4", isSaved && "fill-current")} />
            <span>{isSaved ? "Saved" : "Save Article"}</span>
          </button>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-xs font-semibold border-border-strong bg-surface text-body hover:bg-card transition-colors cursor-pointer"
        >
          {copied ? <Check className="size-4 text-emerald-400" /> : <Share2 className="size-4" />}
          <span>{copied ? "Link Copied!" : "Share Article"}</span>
        </button>
      </div>

      {/* Discussion Section */}
      <div className="mt-6 space-y-6">
        <h3 className="font-display text-lg font-bold tracking-tight text-primary">
          Community Discussion ({comments.length})
        </h3>

        {/* Comment Input */}
        <form onSubmit={handleAddComment} className="space-y-3">
          <Input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your technical commentary or inquiry..."
            className="text-xs sm:text-sm"
          />
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="sm">
              <Send className="size-3.5" /> Post Comment
            </Button>
          </div>
        </form>

        {/* Comment List */}
        <div className="space-y-3.5 pt-2">
          {comments.map((c) => (
            <div key={c.id} className="rounded-xl border p-4 text-xs sm:text-sm border-border/90 bg-surface">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar name={c.author} className="size-6" />
                  <span className="font-display font-semibold text-primary">{c.author}</span>
                </div>
                <span className="font-mono text-[10px] text-secondary">{c.date}</span>
              </div>
              <p className="mt-2 font-sans text-body font-medium leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

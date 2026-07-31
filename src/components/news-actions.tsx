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
  initialLikes = 24,
  initialComments = [
    {
      id: "c1",
      author: "Dr. Aris Thorne",
      body: "Exceptional breakdown of the hardware architecture trade-offs.",
      date: "2 hours ago",
    },
  ],
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
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <DomainBadge domain={domain} />
            <span className="rounded-md border border-neutral-700 bg-neutral-950/90 px-2.5 py-1 font-mono text-xs font-bold text-neutral-100 backdrop-blur-md">
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
              <span className="font-mono text-xs font-semibold text-neutral-800 dark:text-neutral-200">{date}</span>
            </div>
          )}
          <h3 className="font-display text-lg sm:text-xl font-bold leading-snug tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-50">
            <Link href={`/news/${slug}`}>{title}</Link>
          </h3>
          <p className="mt-3 line-clamp-3 font-sans text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">
            {summary}
          </p>
        </div>

        {/* Author & Read Time */}
        <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800/60">
          <div className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            <User className="size-4 text-neutral-900 dark:text-neutral-100" />
            <span>{author}</span>
          </div>
          {readTime && (
            <span className="flex items-center gap-1 font-sans text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              <Clock className="size-4 text-neutral-900 dark:text-neutral-100" />
              {readTime}
            </span>
          )}
        </div>

        {/* Interactive Actions Toolbar: Like, Comment, Share, Save */}
        <div className="mt-4 flex items-center justify-between border-t border-neutral-200/80 pt-3 dark:border-neutral-800/80">
          <div className="flex items-center gap-1.5">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={cx(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold transition-all duration-200 cursor-pointer",
                isLiked
                  ? "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              )}
              title={isLiked ? "Unlike" : "Like article"}
            >
              <Heart className={cx("size-4", isLiked && "fill-current text-rose-600 dark:text-rose-400")} />
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
                  ? "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
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
              className="relative inline-flex items-center gap-1 rounded-lg p-1.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 transition-colors cursor-pointer"
              title="Share article link"
            >
              {copied ? <Check className="size-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="size-4" />}
            </button>

            {/* Save / Bookmark Button */}
            <button
              onClick={handleSave}
              className={cx(
                "inline-flex items-center gap-1 rounded-lg p-1.5 transition-colors cursor-pointer",
                isSaved
                  ? "text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              )}
              title={isSaved ? "Saved to bookmarks" : "Save article"}
            >
              <Bookmark className={cx("size-4", isSaved && "fill-current")} />
            </button>
          </div>
        </div>

        {/* Toast feedback when share link is copied */}
        {copied && (
          <p className="mt-2 text-center font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 animate-fade">
            Article link copied to clipboard!
          </p>
        )}

        {/* Collapsible Comment Drawer */}
        {showComments && (
          <div className="mt-4 space-y-3 border-t border-neutral-200/80 pt-3 dark:border-neutral-800/80 animate-fade">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Discussion ({comments.length})
            </p>

            <div className="max-h-48 space-y-2.5 overflow-y-auto pr-1">
              {comments.map((c) => (
                <div key={c.id} className="rounded-lg border border-neutral-200/90 bg-neutral-50/80 p-2.5 text-xs dark:border-neutral-800/90 dark:bg-neutral-900/60">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-semibold text-neutral-900 dark:text-neutral-100">{c.author}</span>
                    <span className="font-mono text-[10px] text-neutral-400">{c.date}</span>
                  </div>
                  <p className="mt-1 font-sans text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">{c.body}</p>
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
  initialLikes = 48,
}: {
  title: string;
  slug: string;
  initialLikes?: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState<NewsComment[]>([
    {
      id: "c1",
      author: "Elena Marchetti",
      body: "Fascinating analysis. The empirical benchmarks on post-quantum lattice verification align with our lab results.",
      date: "Yesterday",
    },
    {
      id: "c2",
      author: "Vikram Shah",
      body: "Will this architecture scale to multi-node clusters without memory bottlenecking?",
      date: "3 hours ago",
    },
  ]);
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
    <div className="mt-10 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-md">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="flex items-center gap-3">
          {/* Like */}
          <button
            onClick={handleLike}
            className={cx(
              "inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 cursor-pointer",
              isLiked
                ? "border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-400"
                : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
            )}
          >
            <Heart className={cx("size-4", isLiked && "fill-current text-rose-600 dark:text-rose-400")} />
            <span>{likes} Likes</span>
          </button>

          {/* Save / Bookmark */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={cx(
              "inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 cursor-pointer",
              isSaved
                ? "border-neutral-900 bg-neutral-900 text-neutral-50 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950"
                : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
            )}
          >
            <Bookmark className={cx("size-4", isSaved && "fill-current")} />
            <span>{isSaved ? "Saved" : "Save Article"}</span>
          </button>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 font-mono text-xs font-semibold text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
        >
          {copied ? <Check className="size-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="size-4" />}
          <span>{copied ? "Link Copied!" : "Share Article"}</span>
        </button>
      </div>

      {/* Discussion Section */}
      <div className="mt-6 space-y-6">
        <h3 className="font-display text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
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
            <div key={c.id} className="rounded-xl border border-neutral-200/90 bg-white p-4 text-xs sm:text-sm dark:border-neutral-800/90 dark:bg-neutral-950">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar name={c.author} className="size-6" />
                  <span className="font-display font-semibold text-neutral-900 dark:text-neutral-100">{c.author}</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-400">{c.date}</span>
              </div>
              <p className="mt-2 font-sans text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

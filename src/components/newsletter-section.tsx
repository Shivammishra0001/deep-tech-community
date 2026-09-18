"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Container, DomainBadge } from "@/components/ui";
import { SafeImage } from "@/components/safe-image";
import { RevealHeading, RevealVisual, RevealStagger, RevealItem } from "@/components/reveal";
import { ARTICLES, type Article } from "@/data/news";

type Status = "idle" | "loading" | "success" | "already" | "error";

/**
 * Email capture for the briefings.
 *
 * Talks to the same POST /api/newsletter contract as the rest of the site:
 * 200 {ok} on a new address, 200 {ok, already} on a repeat, 4xx/5xx {error}.
 * Outcomes are distinguished by icon and wording rather than by hue, so the
 * section stays inside the graphite palette and still reads without colour.
 */
function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const pending = status === "loading";
  const done = status === "success" || status === "already";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus(data.already ? "already" : "success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <div className="relative w-full lg:max-w-[440px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          suppressHydrationWarning
          type="email"
          required
          autoComplete="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={pending || done}
          className="h-12 w-full rounded-lg border border-border bg-background px-4 font-sans text-[15px]
                     text-primary placeholder:text-muted transition-colors duration-200
                     hover:border-accent-border
                     focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent
                     disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={pending || done}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-lg bg-inverted px-7
                     font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-on-inverted
                     transition-colors duration-200 hover:bg-cta-hover
                     disabled:pointer-events-none disabled:opacity-50 sm:text-[13px]"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              SENDING
            </>
          ) : done ? (
            <>
              <CheckCircle2 className="size-4" aria-hidden="true" />
              DONE
            </>
          ) : (
            <>
              SUBSCRIBE
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      <p role="status" aria-live="polite" className="left-0 right-0 top-full mt-3 font-sans text-[13px] leading-[1.6] sm:absolute">
        {status === "success" && (
          <span className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
            You are subscribed.
          </span>
        )}
        {status === "already" && (
          <span className="flex items-center gap-2 text-secondary">
            <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
            That address is already subscribed.
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center gap-2 text-primary">
            <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            {errorMsg}
          </span>
        )}
      </p>
    </div>
  );
}

/** The lead briefing: image plate on the left, type on the right. */
function LeadBriefing({ article }: { article: Article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group grid overflow-hidden rounded-2xl border border-border bg-card
                 transition-colors duration-300 hover:border-accent-border lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      <div className="relative h-52 overflow-hidden bg-surface sm:h-64 lg:h-full lg:min-h-[300px]" aria-hidden="true">
        <SafeImage
          src={article.image}
          alt=""
          className="size-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] [filter:saturate(var(--photo-saturate))_brightness(var(--photo-brightness))] [opacity:var(--photo-opacity)] group-hover:[opacity:var(--photo-opacity-hover)]"
        />
        <div
          className="absolute inset-0 [background-image:linear-gradient(180deg,rgba(var(--card-rgb),0)_0%,rgba(var(--card-rgb),0.55)_100%)] lg:[background-image:linear-gradient(90deg,rgba(var(--card-rgb),0)_40%,rgba(var(--card-rgb),0.9)_100%)]"
        />
      </div>

      <div className="flex flex-col p-7 sm:p-9 lg:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <DomainBadge domain={article.domain} />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
            {article.date}
          </span>
        </div>

        <h3 className="mt-5 font-sans text-[22px] font-medium leading-[1.2] tracking-[-0.015em] text-primary sm:text-[26px] lg:text-[28px]">
          {article.title}
        </h3>

        <p className="mt-4 max-w-[52ch] font-sans text-[15px] leading-[1.65] text-secondary sm:text-base">
          {article.excerpt}
        </p>

        <span className="mt-auto flex items-center gap-2 pt-8 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-secondary transition-colors duration-300 group-hover:text-accent">
          READ BRIEFING
          <ArrowUpRight className="size-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

/** Remaining briefings as a divided contents list rather than a row of cards. */
function BriefingRow({ article }: { article: Article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col gap-3 border-t border-border px-1 py-6 transition-colors duration-300
                 hover:border-accent-border sm:flex-row sm:items-baseline sm:gap-8 sm:py-7"
    >
      <span className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-secondary sm:w-32">
        {article.date}
      </span>

      <span className="flex-1 font-sans text-[17px] font-medium leading-[1.4] tracking-[-0.01em] text-primary sm:text-[19px]">
        {article.title}
      </span>

      <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-secondary transition-colors duration-300 group-hover:text-accent">
        {article.readingTime} MIN
        <ArrowUpRight className="size-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

export function NewsletterSection() {
  const featured: Article | undefined = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const rest = featured ? ARTICLES.filter((a) => a.slug !== featured.slug).slice(0, 3) : [];

  return (
    <section
      id="news"
      className="relative scroll-mt-20 border-t border-border bg-surface py-20 text-primary sm:py-24 lg:py-28"
    >
      <Container>
        {/* ── SECTION HEADER ─────────────────────────────────────────────── */}
        <RevealHeading>
          <div className="border-b border-border pb-10 sm:pb-12">
            <div className="flex items-center justify-between gap-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-secondary sm:text-[12px]">
                02 / NEWSLETTER
              </p>
              <Link
                href="/news"
                className="group inline-flex shrink-0 items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-secondary transition-colors duration-300 hover:text-primary sm:text-[12px]"
              >
                ALL BRIEFINGS
                <ArrowUpRight className="size-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <h2
                className="font-sans font-semibold uppercase tracking-[-0.015em] text-primary
                           text-[clamp(1.875rem,7vw,2.25rem)]
                           sm:text-[clamp(2.25rem,5vw,2.75rem)]
                           lg:text-[3rem] lg:tracking-[-0.022em]
                           leading-[1.08]"
              >
                NEWSLETTER
              </h2>

              <p className="max-w-[420px] font-sans text-[15px] font-medium leading-[1.65] text-secondary sm:text-base lg:pb-1.5">
                Research, technical perspectives and important developments across frontier
                technology.
              </p>
            </div>
          </div>
        </RevealHeading>

        {/* ── PUBLISHED BRIEFINGS, OR THE HONEST EMPTY STATE ─────────────── */}
        {featured ? (
          <RevealStagger className="mt-12 sm:mt-14" staggerDelay={110}>
            <RevealItem distance={16}>
              <LeadBriefing article={featured} />
            </RevealItem>
            {rest.length > 0 && (
              <div className="mt-10 border-b border-border sm:mt-12">
                {rest.map((a) => (
                  <RevealItem key={a.slug} distance={16}>
                    <BriefingRow article={a} />
                  </RevealItem>
                ))}
              </div>
            )}
          </RevealStagger>
        ) : (
          <RevealVisual delay={100}>
            <div className="mt-12 rounded-2xl border border-border bg-card px-7 py-10 sm:mt-14 sm:px-10 sm:py-12">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:justify-between lg:gap-16">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-secondary sm:text-[12px]">
                  NOTHING PUBLISHED YET
                </p>
                <p className="max-w-[420px] font-sans text-[15px] leading-[1.65] text-secondary sm:text-base">
                  Research notes and technical briefings will appear here as they are published.
                </p>
              </div>
            </div>
          </RevealVisual>
        )}

        {/* ── SUBSCRIBE ──────────────────────────────────────────────────── */}
        <RevealVisual delay={160}>
          <div className="mt-6 rounded-2xl border border-border bg-card px-7 py-10 sm:px-10 sm:py-12 lg:px-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div className="max-w-[46ch]">
                <h3 className="font-sans text-[22px] font-medium leading-[1.2] tracking-[-0.015em] text-primary sm:text-[26px]">
                  Subscribe to the briefings
                </h3>
                <p className="mt-4 font-sans text-[15px] leading-[1.65] text-secondary sm:text-base">
                  Add your email to receive new briefings as they are published.
                </p>
              </div>

              <SubscribeForm />
            </div>
          </div>
        </RevealVisual>
      </Container>
    </section>
  );
}

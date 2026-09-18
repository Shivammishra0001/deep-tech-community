import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { ArrowRight, Calendar, MapPin, ArrowUpRight, Clock, User, ChevronRight } from "lucide-react";
import { DOMAINS, type DomainSlug } from "@/data/core";
import { StaggeredText } from "@/components/staggered-text";

export { StaggeredText };

export { cn };

/** Retained alias so existing call sites keep working; identical to `cn`. */
export const cx = cn;

/* ---------------------------------- Layout --------------------------------- */

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12", className)}>{children}</div>;
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-skeleton rounded-lg bg-elevated/80", className)}
      aria-hidden
    />
  );
}

/* -------------------------------- Typography ------------------------------- */

export function Eyebrow({ children, className }: { children?: ReactNode; className?: string }) {
  if (!children) return null;
  return (
    <p className={cn("font-mono text-xs font-bold uppercase tracking-[0.2em] text-body", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b pb-6 border-border/80", className)}>
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-[2.6rem] sm:leading-[1.12]">
          <StaggeredText
            text={title}
            segmentBy="Words"
            staggerDirection="Forward"
            direction="Top"
            duration="0.55s"
            staggerDelay="0.025s"
          />
        </h2>
        {description && <p className="mt-3 font-sans text-base sm:text-[17px] font-medium leading-relaxed text-body">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="link-arrow group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold tracking-wide text-primary hover:text-body-soft"
        >
          {action.label}
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}

/* ---------------------------------- Buttons -------------------------------- */

type BtnBase = {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "lg" | "md" | "sm";
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BtnBase & (ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }) | (BtnBase & { href: string })) {
  const styles = cn(
    "btn-hover inline-flex items-center justify-center gap-2 rounded-lg font-sans text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
    variant === "primary" &&
      "bg-inverted text-on-inverted hover:bg-cta-hover shadow-sm",
    variant === "secondary" &&
      "bg-elevated text-primary hover:bg-border-strong",
    variant === "outline" &&
      "border bg-transparent border-border-strong text-primary hover:bg-elevated",
    variant === "ghost" &&
      "text-body-soft hover:bg-elevated hover:text-primary",
    size === "sm" && "h-8.5 px-3 text-[11px]",
    size === "md" && "h-10.5 px-4.5 text-xs sm:text-sm",
    size === "lg" && "h-12.5 px-6.5 text-sm sm:text-base font-bold",
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props as BtnBase & { href: string };
    return (
      <Link href={href} className={styles} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button suppressHydrationWarning className={styles} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

/* ------------------------------- Badges & Tags ------------------------------ */

export function DomainBadge({ domain, className }: { domain: DomainSlug; className?: string }) {
  const d = DOMAINS[domain];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider border-border-strong bg-elevated text-primary shadow-xs",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-inverted" aria-hidden />
      [{d.short}]
    </span>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider border-border-strong bg-elevated text-primary shadow-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-semibold border-border-strong bg-elevated text-body">
      #{children}
    </span>
  );
}

/* ---------------------------------- Avatar --------------------------------- */

export function Avatar({
  name,
  domain,
  kind,
  className,
}: {
  name: string;
  domain?: DomainSlug;
  kind?: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const ringClass =
    domain === "ai" || kind === "article"
      ? "ring-2 ring-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.35)]"
      : domain === "quantum" || kind === "project"
      ? "ring-2 ring-blue-400/80 shadow-[0_0_10px_rgba(59,130,246,0.35)]"
      : domain === "cybersecurity" || kind === "achievement"
      ? "ring-2 ring-purple-400/80 shadow-[0_0_10px_rgba(168,85,247,0.35)]"
      : domain === "governance" || kind === "question"
      ? "ring-2 ring-amber-400/80 shadow-[0_0_10px_rgba(245,158,11,0.35)]"
      : "ring-2 ring-neutral-600/70";

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-bold border-border-strong bg-inverted text-on-inverted transition-all duration-200",
        ringClass,
        className,
      )}
    >
      {initials}
    </span>
  );
}

/* ----------------------------------- Cards --------------------------------- */

export function Card({
  children,
  className,
  hover = false,
  ...props
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
  onClick?: import("react").MouseEventHandler<HTMLDivElement>;
  style?: import("react").CSSProperties;
  "aria-label"?: string;
  "data-testid"?: string;
  role?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-7 shadow-sm border-border/90 bg-card/90",
        hover && "card-hover cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* Specialized News Card */
import { SafeImage } from "@/components/safe-image";

export function ArticleCard({
  title,
  domain,
  date,
  author,
  summary,
  slug,
  readTime = "5",
  image,
}: {
  title: string;
  domain: DomainSlug;
  date: string;
  author: string;
  summary: string;
  slug: string;
  readTime?: string;
  image?: string;
}) {
  return (
    <Card hover className="group flex flex-col justify-between overflow-hidden p-0">
      {image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/80 bg-card">
          <SafeImage
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
          <p className="mt-3 line-clamp-3 font-sans text-sm sm:text-base leading-relaxed text-body font-normal">{summary}</p>
        </div>

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
      </div>
    </Card>
  );
}

/* Specialized Event Card */
export function EventCard({
  title,
  domain,
  date,
  location,
  type,
  slug,
}: {
  title: string;
  domain: DomainSlug;
  date: string;
  location: string;
  type: string;
  slug: string;
}) {
  return (
    <Card hover className="group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <DomainBadge domain={domain} />
          <Badge>{type}</Badge>
        </div>
        <h3 className="mt-4 font-display text-lg sm:text-xl font-semibold leading-snug tracking-tight group-hover:underline text-primary">
          <Link href={`/events/${slug}`}>{title}</Link>
        </h3>
      </div>
      <div className="mt-6 space-y-2 border-t pt-4 font-sans text-xs sm:text-sm font-semibold border-border/60 text-body">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-primary" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-primary" />
          <span>{location}</span>
        </div>
      </div>
    </Card>
  );
}

/* Specialized Community Chapter Card */
export function CommunityCard({
  country,
  code,
  flag,
  city,
  members,
  blurb,
  slug,
}: {
  country: string;
  code: string;
  flag: string;
  city: string;
  members: number;
  blurb: string;
  slug: string;
}) {
  return (
    <Card hover className="group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-label={country}>
              {flag}
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-primary">
              {country} <span className="font-mono text-xs font-semibold text-body-soft">[{code}]</span>
            </h3>
          </div>
          <Badge className="font-sans text-xs font-semibold">{members.toLocaleString()} Members</Badge>
        </div>
        <p className="mt-2 font-sans text-xs sm:text-sm font-semibold text-body">{city}</p>
        <p className="mt-3 line-clamp-3 font-sans text-sm sm:text-base leading-relaxed text-body font-normal">{blurb}</p>
      </div>
      <div className="mt-6 pt-4 border-t border-border/60">
        <Link
          href={`/chapters/${slug}`}
          className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold tracking-wide hover:underline text-primary"
        >
          Explore Chapter <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </Card>
  );
}

/* ----------------------------------- Forms --------------------------------- */

export function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-body">
      {children}
    </label>
  );
}

const fieldCls =
  "w-full rounded-lg border px-4 py-3 text-sm sm:text-base transition-colors focus:outline-none focus:ring-1 border-border-strong bg-surface text-primary placeholder:text-muted focus:border-inverted focus:ring-inverted font-sans";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input suppressHydrationWarning {...props} className={cn(fieldCls, props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea suppressHydrationWarning {...props} className={cn(fieldCls, "resize-y", props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select suppressHydrationWarning {...props} className={cn(fieldCls, "appearance-none", props.className)} />;
}

/* -------------------------------- Navigation Helpers ---------------------- */

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-xs text-body-soft">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-2">
          {idx > 0 && <ChevronRight className="size-3 text-secondary" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="text-primary font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* -------------------------------- Page Hero -------------------------------- */

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/80">
      <Container className="relative pt-6 pb-6 sm:pt-7 sm:pb-7 lg:pt-8 lg:pb-8">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-primary">
            <StaggeredText
              text={title}
              segmentBy="Words"
              staggerDirection="Forward"
              direction="Top"
              duration="0.6s"
              staggerDelay="0.03s"
            />
          </h1>
          {description && (
            <p className="mt-3 sm:mt-3.5 max-w-2xl font-sans text-base sm:text-lg font-medium leading-relaxed text-body">
              <StaggeredText
                text={description}
                segmentBy="Words"
                staggerDirection="Forward"
                direction="Top"
                duration="0.5s"
                initialDelay="0.1s"
                staggerDelay="0.015s"
              />
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}


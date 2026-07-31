import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { ArrowRight, Calendar, MapPin, ArrowUpRight, Clock, User, ChevronRight } from "lucide-react";
import { DOMAINS, type DomainSlug } from "@/data/core";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ---------------------------------- Layout --------------------------------- */

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12", className)}>{children}</div>;
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cx("animate-skeleton rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80", className)}
      aria-hidden
    />
  );
}

/* -------------------------------- Typography ------------------------------- */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("font-mono text-xs font-bold uppercase tracking-[0.2em] text-neutral-800 dark:text-neutral-200", className)}>
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
  eyebrow: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={cx("mb-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80", className)}>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl lg:text-[2.6rem] sm:leading-[1.12]">
          {title}
        </h2>
        {description && <p className="mt-3.5 font-sans text-base sm:text-[17px] font-normal leading-relaxed text-neutral-700 dark:text-neutral-300">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="link-arrow group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold tracking-wide text-neutral-900 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300"
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
  const styles = cx(
    "btn-hover inline-flex items-center justify-center gap-2 rounded-lg font-sans text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none",
    variant === "primary" &&
      "bg-neutral-900 text-neutral-50 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white shadow-sm",
    variant === "secondary" &&
      "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
    variant === "outline" &&
      "border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800",
    variant === "ghost" &&
      "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
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
      className={cx(
        "inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 shadow-xs",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" aria-hidden />
      [{d.short}]
    </span>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 shadow-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1 font-mono text-xs font-semibold text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
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
      ? "ring-2 ring-emerald-500/80 dark:ring-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.35)]"
      : domain === "quantum" || kind === "project"
      ? "ring-2 ring-blue-500/80 dark:ring-blue-400/80 shadow-[0_0_10px_rgba(59,130,246,0.35)]"
      : domain === "cybersecurity" || kind === "achievement"
      ? "ring-2 ring-purple-500/80 dark:ring-purple-400/80 shadow-[0_0_10px_rgba(168,85,247,0.35)]"
      : domain === "space" || kind === "question"
      ? "ring-2 ring-amber-500/80 dark:ring-amber-400/80 shadow-[0_0_10px_rgba(245,158,11,0.35)]"
      : "ring-2 ring-neutral-400/70 dark:ring-neutral-600/70";

  return (
    <span
      aria-hidden
      className={cx(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-neutral-900 font-mono text-[10px] font-bold text-neutral-100 dark:border-neutral-700 dark:bg-neutral-100 dark:text-neutral-950 transition-all duration-200",
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
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-7 shadow-sm dark:border-neutral-800/90 dark:bg-neutral-900/90",
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
export function NewsCard({
  title,
  domain,
  date,
  author,
  summary,
  slug,
  readTime,
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
          <p className="mt-3 line-clamp-3 font-sans text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">{summary}</p>
        </div>

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
        <h3 className="mt-4 font-display text-lg sm:text-xl font-semibold leading-snug tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-100">
          <Link href={`/events/${slug}`}>{title}</Link>
        </h3>
      </div>
      <div className="mt-6 space-y-2 border-t border-neutral-100 pt-4 font-sans text-xs sm:text-sm font-semibold text-neutral-800 dark:border-neutral-800/60 dark:text-neutral-200">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-neutral-900 dark:text-neutral-100" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-neutral-900 dark:text-neutral-100" />
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
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {country} <span className="font-mono text-xs font-semibold text-neutral-500">[{code}]</span>
            </h3>
          </div>
          <Badge className="font-sans text-xs font-semibold">{members.toLocaleString()} Members</Badge>
        </div>
        <p className="mt-2 font-sans text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300">{city}</p>
        <p className="mt-3 line-clamp-3 font-sans text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">{blurb}</p>
      </div>
      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
        <Link
          href={`/chapters/${slug}`}
          className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold tracking-wide text-neutral-900 hover:underline dark:text-neutral-100"
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
    <label htmlFor={htmlFor} className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
      {children}
    </label>
  );
}

const fieldCls =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-100 dark:focus:ring-neutral-100 font-sans";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input suppressHydrationWarning {...props} className={cx(fieldCls, props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea suppressHydrationWarning {...props} className={cx(fieldCls, "resize-y", props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select suppressHydrationWarning {...props} className={cx(fieldCls, "appearance-none", props.className)} />;
}

/* -------------------------------- Navigation Helpers ---------------------- */

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-xs text-neutral-500">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-2">
          {idx > 0 && <ChevronRight className="size-3 text-neutral-400" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-neutral-900 dark:hover:text-neutral-100">
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-900 dark:text-neutral-100 font-medium">{item.label}</span>
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
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden />
      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl animate-rise">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-neutral-900 dark:text-neutral-50">
            {title}
          </h1>
          {description && <p className="mt-5 max-w-2xl font-sans text-lg sm:text-xl font-normal leading-relaxed text-neutral-700 dark:text-neutral-300">{description}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container, cx, Button, Input } from "@/components/ui";

const NAV_ITEMS = [
  { label: "TECHNOLOGIES", href: "/technologies" },
  { label: "NETWORK", href: "/community" },
  { label: "NEWSLETTER", href: "/news" },
  { label: "EVENTS", href: "/events" },
  { label: "ABOUT", href: "/about" },
];

export function LogoSymbol({ className, animated = true }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={cx("size-8 shrink-0", className)} aria-hidden>
      <g
        style={{ transformOrigin: "50px 50px" }}
        className={cx(animated && "animate-[spin_22s_linear_infinite]")}
      >
        <path d="M 58.5 16.5 A 35 35 0 0 1 83.5 41.5" className="stroke-current" strokeWidth="4" strokeLinecap="round" />
        <path d="M 83.5 58.5 A 35 35 0 0 1 58.5 83.5" className="stroke-current" strokeWidth="4" strokeLinecap="round" />
        <path d="M 41.5 83.5 A 35 35 0 0 1 16.5 58.5" className="stroke-current" strokeWidth="4" strokeLinecap="round" />
        <path d="M 16.5 41.5 A 35 35 0 0 1 41.5 16.5" className="stroke-current" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="15" r="4.5" className="fill-current" />
        <circle cx="85" cy="50" r="4.5" className="fill-current" />
        <circle cx="50" cy="85" r="4.5" className="fill-current" />
        <circle cx="15" cy="50" r="4.5" className="fill-current" />
      </g>
      <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" className="stroke-current opacity-60" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="9" className={cx("fill-current", animated && "animate-pulse")} />
    </svg>
  );
}

/** Brand lockup used outside the header (footer, login). Unchanged. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cx("group inline-flex items-center gap-2.5", className)}>
      <span className="inline-flex size-7.5 items-center justify-center rounded-md border border-border bg-card text-primary transition-colors duration-200">
        <LogoSymbol className="size-full" />
      </span>
      <div className="flex flex-col leading-none">
        <span className="font-sans text-sm font-semibold tracking-tight text-primary group-hover:text-body-soft transition-colors">
          DTC
        </span>
        <span className="font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-primary mt-0.5">
          DEEP TECH COMMUNITY
        </span>
      </div>
    </Link>
  );
}

/**
 * Header brand lockup.
 *
 * "DTC" carries the weight; the full name sits under it at a smaller size and
 * lower contrast so the two read as one mark rather than two equal labels. The
 * symbol is static here — a permanently spinning mark fights the calm the rest
 * of the header is going for.
 */
function HeaderBrand() {
  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center gap-3 rounded-sm"
      aria-label="Deep Tech Community — home"
    >
      <LogoSymbol animated={false} className="size-7 text-primary transition-opacity duration-200 group-hover:opacity-80" />
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[15px] font-semibold leading-none tracking-[-0.01em] text-primary">
          DTC
        </span>
        <span className="mt-[5px] font-sans text-[9px] font-medium uppercase leading-none tracking-[0.18em] text-muted transition-colors duration-200 group-hover:text-secondary">
          Deep Tech Community
        </span>
      </span>
    </Link>
  );
}

function JoinCta({ size = "sm", className }: { size?: "sm" | "md"; className?: string }) {
  return (
    <Link
      href="/join"
      className={cx(
        "group inline-flex items-center justify-center gap-2 rounded-lg bg-primary",
        size === "sm" ? "h-9 px-4" : "h-10 px-5",
        "font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-background",
        "transition-colors duration-200 hover:bg-white",
        className,
      )}
    >
      JOIN
      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => setMobileOpen(false), [pathname]);

  // Condenses the header once the page has moved off the top.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape closes the mobile panel; body scroll is locked while it is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  // Auth user state sync
  useEffect(() => {
    const checkUser = () => {
      try {
        const stored = localStorage.getItem("dts_user");
        setUser(stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, [pathname]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("dts_user");
      localStorage.removeItem("dts_token");
    } catch {}
    setUser(null);
    window.location.href = "/login";
  };

  const initials = (name: string) =>
    name ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl">
      <Container
        className={cx(
          "flex items-center justify-between gap-6 transition-[height] duration-300 ease-out",
          scrolled ? "h-[60px]" : "h-[72px]",
        )}
      >
        <HeaderBrand />

        <nav className="hidden items-center gap-7 md:flex lg:gap-9" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cx(
                  "relative py-1 font-sans text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-200",
                  isActive ? "text-primary" : "text-secondary hover:text-primary",
                )}
              >
                {item.label}
                <span
                  className={cx(
                    "pointer-events-none absolute -bottom-px left-0 right-0 h-px bg-primary transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          {user ? (
            <Link
              href="/admin"
              className="hidden h-9 items-center gap-2.5 rounded-lg border border-border px-3 font-sans text-[12px] font-medium text-body transition-colors duration-200 hover:border-border-strong hover:text-primary md:inline-flex"
            >
              <span className="grid size-5 place-items-center rounded-full bg-primary font-sans text-[9px] font-bold text-background">
                {initials(user.name)}
              </span>
              <span className="max-w-[96px] truncate">{user.name.split(" ")[0]}</span>
            </Link>
          ) : (
            <span className="hidden md:block">
              <JoinCta />
            </span>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="grid size-10 place-items-center rounded-lg border border-border text-body transition-colors duration-200 hover:border-border-strong hover:text-primary md:hidden"
          >
            {mobileOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </Container>

      {/* Mobile panel. Rendered inside the sticky header so it always sits
          flush beneath the bar, whatever height the bar currently has. */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <Container className="py-4">
              <nav className="grid" aria-label="Mobile">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cx(
                        "flex h-12 items-center font-sans text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-200",
                        isActive ? "text-primary" : "text-secondary hover:text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 border-t border-border pt-4">
                {user ? (
                  <div className="flex items-center justify-between gap-4">
                    <Link href="/admin" className="flex min-w-0 items-center gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary font-sans text-[11px] font-bold text-background">
                        {initials(user.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-sans text-[13px] font-medium text-primary">{user.name}</span>
                        <span className="block truncate font-sans text-[11px] text-muted">{user.email}</span>
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="h-9 shrink-0 rounded-lg border border-border px-3 font-sans text-[12px] font-medium text-body transition-colors duration-200 hover:border-border-strong hover:text-primary"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <Link
                      href="/login"
                      className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-border font-sans text-[12px] font-medium uppercase tracking-[0.08em] text-body transition-colors duration-200 hover:border-border-strong hover:text-primary"
                    >
                      Log in
                    </Link>
                    <JoinCta size="md" className="flex-1" />
                  </div>
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    const targetEmail = email.trim();

    try {
      fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });
    } catch {}

    router.push(`/login?email=${encodeURIComponent(targetEmail)}&mode=signup`);
  }

  return (
    <div className="rounded-xl border p-5 shadow-xs border-border bg-card/90">
      <p className="font-display text-[15px] font-bold tracking-tight text-primary">
        DEEP TECH BRIEFING
      </p>
      <p className="mt-2 text-sm leading-relaxed text-body font-medium">
        Technical digests — open roadmaps, research highlights, and symposium schedules. No noise.
      </p>

      <form suppressHydrationWarning onSubmit={subscribe} className="mt-3.5 flex gap-2">
        <Input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="researcher@lab.org"
          className="h-10 text-xs font-medium"
        />
        <Button type="submit" variant="primary" size="md">
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/90 bg-surface/50">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1.6fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-body">
            Open practitioner community platform for Artificial Intelligence, Quantum Computing, Cybersecurity, and AI Governance.
          </p>
        </div>

        <nav aria-label="Footer Navigation" className="grid content-start gap-2.5 text-sm font-sans">
          <p className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-primary">
            SITES
          </p>
          <Link href="/about" className="font-semibold text-body hover:text-primary">
            About Community
          </Link>
          <Link href="/technologies" className="font-semibold text-body hover:text-primary">
            Technologies
          </Link>
          <Link href="/events" className="font-semibold text-body hover:text-primary">
            Symposia &amp; Labs
          </Link>
          <Link href="/community" className="font-semibold text-body hover:text-primary">
            Member Forum
          </Link>
          <Link href="/chapters" className="font-semibold text-body hover:text-primary">
            Regional Chapters
          </Link>
        </nav>

        <FooterNewsletter />
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-6 font-mono text-[11px] text-body-soft">
          <p>© 2026 Dyau Deep Tech Community.</p>
          <p>[ 01 AI · 02 QUANTUM · 03 CYBER · 04 AI GOVERNANCE ]</p>
        </Container>
      </div>
    </footer>
  );
}

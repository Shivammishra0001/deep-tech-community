"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Search, Cpu, Users, Newspaper, Calendar, Info, MapPin, ChevronRight, ShieldCheck, Zap } from "lucide-react";
import { Container, cx, Button, Input } from "@/components/ui";

const NAV_CENTER_ITEMS = [
  { label: "TECHNOLOGIES", href: "/technologies" },
  { label: "NETWORK", href: "/community" },
  { label: "NEWSLETTER", href: "/news" },
  { label: "EVENTS", href: "/events" },
  { label: "ABOUT", href: "/about" },
];

const SEARCH_ITEMS = [
  { category: "Technologies", title: "Artificial Intelligence", href: "/technologies/artificial-intelligence", icon: Cpu },
  { category: "Technologies", title: "Quantum Computing", href: "/technologies/quantum-computing", icon: Zap },
  { category: "Technologies", title: "Cybersecurity", href: "/technologies/cybersecurity", icon: ShieldCheck },
  { category: "Technologies", title: "AI Governance", href: "/technologies/ai-governance", icon: Info },
  { category: "Page", title: "Technologies Overview", href: "/technologies", icon: Cpu },
  { category: "Page", title: "Member Network", href: "/community", icon: Users },
  { category: "Page", title: "Newsletter Briefings", href: "/news", icon: Newspaper },
  { category: "Page", title: "Symposia & Events", href: "/events", icon: Calendar },
  { category: "Page", title: "Regional Chapters", href: "/chapters", icon: MapPin },
  { category: "Page", title: "About Deep Tech Community", href: "/about", icon: Info },
  { category: "Action", title: "Join Community Application", href: "/join", icon: ArrowRight },
];

export function LogoSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={cx("size-8 shrink-0", className)} aria-hidden>
      <g style={{ transformOrigin: "50px 50px" }} className="animate-[spin_22s_linear_infinite]">
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
      <circle cx="50" cy="50" r="9" className="fill-current animate-pulse" />
    </svg>
  );
}

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

function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = SEARCH_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -8 }}
          transition={{ duration: 0.15 }}
          className="relative z-10 w-full max-w-xl overflow-hidden rounded-lg border border-border bg-surface"
        >
          {/* Search Input Box */}
          <div className="flex items-center border-b border-border px-4 py-3">
            <Search className="size-4 text-secondary mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search technologies, research briefs, events, pages..."
              className="w-full bg-transparent font-sans text-sm text-primary placeholder-neutral-500 outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-xs text-secondary hover:text-body">
                Clear
              </button>
            )}
            <kbd className="ml-2 rounded border border-border bg-card px-1.5 py-0.5 font-sans text-[10px] text-body-soft">
              ESC
            </kbd>
          </div>

          {/* Search Results List */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="p-8 text-center font-sans text-xs text-body-soft">
                No matching results found for &quot;{query}&quot;
              </div>
            ) : (
              <div className="space-y-1">
                {filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleSelect(item.href)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition-colors hover:bg-card cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-7 items-center justify-center rounded border border-border bg-card text-body-soft">
                          <Icon className="size-3.5" />
                        </div>
                        <div>
                          <p className="font-sans text-xs font-semibold text-primary">
                            {item.title}
                          </p>
                          <p className="font-sans text-[10px] uppercase tracking-wider text-body-soft">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="size-3.5 text-muted" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer info */}
          <div className="border-t border-border bg-background px-4 py-2 font-sans text-[10px] text-secondary flex justify-between items-center">
            <span>DEEP TECH COMMUNITY SEARCH</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/** Refined Minimal Editorial Header Component */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => setMobileOpen(false), [pathname]);

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auth user state sync
  useEffect(() => {
    const checkUser = () => {
      try {
        const stored = localStorage.getItem("dts_user");
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          setUser(null);
        }
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

  return (
    <>
      <header
        className={cx(
          "sticky top-0 z-50 w-full transition-all duration-200 border-b border-neutral-900 bg-background",
          scrolled ? "py-2 sm:py-2.5" : "py-2.5 sm:py-3"
        )}
      >
        <Container className="flex items-center justify-between gap-4">
          {/* LEFT: Brand Emblem & Label */}
          <Logo />

          {/* CENTER: Primary Editorial Navigation Links */}
          <nav className="hidden md:flex items-center gap-3.5 lg:gap-4.5" aria-label="Main Navigation">
            {NAV_CENTER_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "relative py-1 px-1 font-sans text-[12px] font-medium uppercase tracking-[0.03em] transition-colors duration-150",
                    isActive
                      ? "text-primary"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1 right-1 h-[1px] bg-white" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Actions (Subtle Search, Theme, Clean White JOIN Button) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1 px-1.5 py-1 font-sans text-[11px] font-medium text-muted hover:text-body transition-colors cursor-pointer"
              aria-label="Search platform"
            >
              <Search className="size-3.5" />
              <span className="hidden lg:inline uppercase tracking-[0.03em]">
                SEARCH
              </span>
            </button>

            {/* User Auth or Clean White JOIN Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-primary hover:bg-elevated transition-colors"
                >
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-white font-sans text-[9px] font-bold text-on-inverted">
                    {user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
                  </span>
                  <span className="hidden sm:inline max-w-[90px] truncate">{user.name.split(" ")[0]}</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/join"
                className="group inline-flex items-center gap-1 rounded-md bg-white px-3 py-1 font-sans text-[12px] font-medium tracking-wide text-on-inverted transition-colors duration-150 hover:bg-neutral-200 cursor-pointer shadow-xs"
              >
                <span>JOIN</span>
                <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            )}

            {/* Mobile Navigation Drawer Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="grid size-7.5 place-items-center rounded-md border border-border text-body-soft md:hidden cursor-pointer"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Search Modal Dialog */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Full-Width Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="sticky top-[49px] z-40 overflow-hidden border-b border-neutral-900 bg-background md:hidden"
          >
            <Container className="py-4 space-y-3">
              <div className="grid gap-1">
                {NAV_CENTER_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between rounded-md px-3 py-2 font-sans text-xs font-medium uppercase tracking-wider text-body-soft hover:bg-card hover:text-primary"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="size-3.5 text-muted" />
                  </Link>
                ))}
              </div>

              <div className="border-t border-neutral-900 pt-3">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-full bg-white font-sans text-xs font-semibold text-on-inverted">
                        {user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
                      </div>
                      <div>
                        <p className="font-sans text-xs font-semibold text-primary">{user.name}</p>
                        <p className="font-sans text-[10px] text-body-soft">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="rounded-md border border-red-900/60 px-2.5 py-1 font-sans text-xs font-medium text-red-400 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button href="/login" variant="outline" size="sm" className="flex-1 justify-center font-sans text-xs font-medium">
                      Login
                    </Button>
                    <Button href="/join" variant="primary" size="sm" className="flex-1 justify-center font-sans text-xs font-medium bg-white text-on-inverted hover:bg-neutral-200">
                      Join Community →
                    </Button>
                  </div>
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Alias export to maintain backward compatibility */
export const SidebarNav = Navbar;

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

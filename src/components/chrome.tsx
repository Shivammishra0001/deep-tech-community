"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  Search,
  Cpu,
  Users,
  Newspaper,
  Calendar,
  Info,
  MapPin,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Container, cx, Button, Input } from "@/components/ui";

const SOCIALS: { label: string; path: string }[] = [
  {
    label: "X (Twitter)",
    path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z",
  },
  {
    label: "LinkedIn",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z",
  },
  {
    label: "WhatsApp",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413",
  },
  {
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
];

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
      <span className="inline-flex size-7.5 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 text-white transition-colors duration-200">
        <LogoSymbol className="size-full" />
      </span>
      <div className="flex flex-col leading-none">
        <span className="font-sans text-sm font-semibold tracking-tight text-white group-hover:text-neutral-300 transition-colors">
          DTC
        </span>
        <span className="font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-white mt-0.5">
          DEEP TECH COMMUNITY
        </span>
      </div>
    </Link>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted ? theme === "dark" : true;
  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid size-7 place-items-center rounded-md text-neutral-400 hover:text-white transition-colors cursor-pointer"
    >
      {dark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
    </button>
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
          className="relative z-10 w-full max-w-xl overflow-hidden rounded-lg border border-neutral-800 bg-[#0a0a0a]"
        >
          {/* Search Input Box */}
          <div className="flex items-center border-b border-neutral-800 px-4 py-3">
            <Search className="size-4 text-neutral-400 mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search technologies, research briefs, events, pages..."
              className="w-full bg-transparent font-sans text-sm text-neutral-50 placeholder-neutral-500 outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-xs text-neutral-400 hover:text-neutral-200">
                Clear
              </button>
            )}
            <kbd className="ml-2 rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 font-sans text-[10px] text-neutral-300">
              ESC
            </kbd>
          </div>

          {/* Search Results List */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="p-8 text-center font-sans text-xs text-neutral-300">
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
                      className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition-colors hover:bg-neutral-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-7 items-center justify-center rounded border border-neutral-800 bg-neutral-900 text-neutral-300">
                          <Icon className="size-3.5" />
                        </div>
                        <div>
                          <p className="font-sans text-xs font-semibold text-neutral-100">
                            {item.title}
                          </p>
                          <p className="font-sans text-[10px] uppercase tracking-wider text-neutral-300">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="size-3.5 text-neutral-500" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer info */}
          <div className="border-t border-neutral-800 bg-[#050505] px-4 py-2 font-sans text-[10px] text-neutral-400 flex justify-between items-center">
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
          "sticky top-0 z-50 w-full transition-all duration-200 border-b border-neutral-900 bg-[#050505]",
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
                      ? "text-white"
                      : "text-neutral-400 hover:text-white"
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
              className="flex items-center gap-1 px-1.5 py-1 font-sans text-[11px] font-medium text-neutral-500 hover:text-neutral-200 transition-colors cursor-pointer"
              aria-label="Search platform"
            >
              <Search className="size-3.5" />
              <span className="hidden lg:inline uppercase tracking-[0.03em]">
                SEARCH
              </span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Auth or Clean White JOIN Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs font-medium text-neutral-100 hover:bg-neutral-800 transition-colors"
                >
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-white font-sans text-[9px] font-bold text-neutral-950">
                    {user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
                  </span>
                  <span className="hidden sm:inline max-w-[90px] truncate">{user.name.split(" ")[0]}</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/join"
                className="group inline-flex items-center gap-1 rounded-md bg-white px-3 py-1 font-sans text-[12px] font-medium tracking-wide text-neutral-950 transition-colors duration-150 hover:bg-neutral-200 cursor-pointer shadow-xs"
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
              className="grid size-7.5 place-items-center rounded-md border border-neutral-800 text-neutral-300 md:hidden cursor-pointer"
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
            className="sticky top-[49px] z-40 overflow-hidden border-b border-neutral-900 bg-[#050505] md:hidden"
          >
            <Container className="py-4 space-y-3">
              <div className="grid gap-1">
                {NAV_CENTER_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between rounded-md px-3 py-2 font-sans text-xs font-medium uppercase tracking-wider text-neutral-300 hover:bg-neutral-900 hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="size-3.5 text-neutral-500" />
                  </Link>
                ))}
              </div>

              <div className="border-t border-neutral-900 pt-3">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-full bg-white font-sans text-xs font-semibold text-neutral-950">
                        {user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
                      </div>
                      <div>
                        <p className="font-sans text-xs font-semibold text-neutral-50">{user.name}</p>
                        <p className="font-sans text-[10px] text-neutral-300">{user.email}</p>
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
                    <Button href="/join" variant="primary" size="sm" className="flex-1 justify-center font-sans text-xs font-medium bg-white text-neutral-950 hover:bg-neutral-200">
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
    <div className="rounded-xl border border-neutral-300/80 bg-neutral-100/90 p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900/90">
      <p className="font-display text-[15px] font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
        DEEP TECH BRIEFING
      </p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 font-medium">
        Bi-weekly technical digests — open roadmaps, research highlights, and symposium schedules. No noise.
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
    <footer className="border-t border-neutral-200/90 bg-neutral-50/50 dark:border-neutral-800/90 dark:bg-neutral-950/50">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1.6fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
            Enterprise-grade community platform for Artificial Intelligence, Quantum Computing, Cybersecurity, and AI Governance.
          </p>
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map(({ path, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-9 place-items-center rounded-lg border border-neutral-300 bg-neutral-100 text-neutral-800 transition-colors hover:border-neutral-900 hover:text-neutral-950 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-100 dark:hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer Navigation" className="grid content-start gap-2.5 text-sm font-sans">
          <p className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">
            SITES
          </p>
          <Link href="/about" className="font-semibold text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white">
            About Community
          </Link>
          <Link href="/technologies" className="font-semibold text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white">
            Four Technologies
          </Link>
          <Link href="/events" className="font-semibold text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white">
            Symposia &amp; Labs
          </Link>
          <Link href="/community" className="font-semibold text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white">
            Member Forum
          </Link>
          <Link href="/chapters" className="font-semibold text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white">
            Regional Chapters
          </Link>
        </nav>

        <FooterNewsletter />
      </Container>
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-6 font-mono text-[11px] text-neutral-500 dark:text-neutral-300">
          <p>© 2026 Dyau Deep Tech Community. Handcrafted Enterprise Platform.</p>
          <p>[ 01 AI · 02 QUANTUM · 03 CYBER · 04 AI GOVERNANCE ]</p>
        </Container>
      </div>
    </footer>
  );
}

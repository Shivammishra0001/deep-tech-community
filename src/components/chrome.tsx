"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowRight, Check, Compass, Cpu, Newspaper, Calendar, Users, MapPin, Info, ShieldCheck, LogOut, User as UserIcon } from "lucide-react";
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

// Left vertical navigation items
const NAV_ITEMS = [
  { label: "Home", href: "/", sectionId: "hero", icon: Compass },
  { label: "Technologies", href: "/technologies", sectionId: "technologies", icon: Cpu },
  { label: "News", href: "/news", sectionId: "news", icon: Newspaper },
  { label: "Events", href: "/events", sectionId: "events", icon: Calendar },
  { label: "Community", href: "/community", sectionId: "community", icon: Users },
  { label: "Chapters", href: "/chapters", sectionId: "chapters", icon: MapPin },
  { label: "About", href: "/about", sectionId: "about", icon: Info },
  { label: "Admin", href: "/admin", sectionId: "admin", icon: ShieldCheck },
];

export function LogoSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={cx("size-9 shrink-0", className)} aria-hidden>
      {/* Revolving Outer Orbital Ring & Cardinal Nodes */}
      <g style={{ transformOrigin: "50px 50px" }} className="animate-[spin_22s_linear_infinite]">
        {/* Outer 4 Arcs */}
        <path d="M 58.5 16.5 A 35 35 0 0 1 83.5 41.5" className="stroke-neutral-900 dark:stroke-neutral-50" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 83.5 58.5 A 35 35 0 0 1 58.5 83.5" className="stroke-neutral-900 dark:stroke-neutral-50" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 41.5 83.5 A 35 35 0 0 1 16.5 58.5" className="stroke-neutral-900 dark:stroke-neutral-50" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 16.5 41.5 A 35 35 0 0 1 41.5 16.5" className="stroke-neutral-900 dark:stroke-neutral-50" strokeWidth="3.5" strokeLinecap="round"/>

        {/* 4 Node Circles */}
        <circle cx="50" cy="15" r="5" className="fill-neutral-900 dark:fill-neutral-50"/>
        <circle cx="85" cy="50" r="5" className="fill-neutral-900 dark:fill-neutral-50"/>
        <circle cx="50" cy="85" r="5" className="fill-neutral-900 dark:fill-neutral-50"/>
        <circle cx="15" cy="50" r="5" className="fill-neutral-900 dark:fill-neutral-50"/>
      </g>

      {/* Inner Diamond Lines */}
      <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" className="stroke-neutral-900/80 dark:stroke-neutral-50/80" strokeWidth="2.2" strokeLinejoin="round"/>

      {/* Center Core Circle with breathing pulse */}
      <circle cx="50" cy="50" r="11" className="fill-neutral-900 dark:fill-neutral-50 animate-pulse"/>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={cx("group inline-flex items-center gap-3.5", className)}
    >
      <span className="inline-flex size-10 items-center justify-center rounded-xl border border-neutral-300 bg-neutral-100 p-1 shadow-sm transition-transform duration-300 group-hover:scale-105 dark:border-neutral-800 dark:bg-neutral-900">
        <LogoSymbol className="size-full" />
      </span>
      <span className="flex flex-col">
        <span className="font-display text-base font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-50 dark:group-hover:text-neutral-300">
          DEEP TECH
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          COMMUNITY
        </span>
      </span>
    </motion.span>
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
      className="grid size-8.5 place-items-center rounded-lg border border-neutral-300 text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-100 dark:hover:text-neutral-100 shadow-xs cursor-pointer"
    >
      {dark ? <Sun className="size-4 text-amber-300" /> : <Moon className="size-4 text-neutral-800 dark:text-neutral-200" />}
    </button>
  );
}

/** Sticky Left-Side Vertical Navigation Component for Desktop & Responsive Header for Mobile */
export function SidebarNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => setMobileOpen(false), [pathname]);

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
      localStorage.removeItem("dts_access_token");
      document.cookie = "dts_access_token=; path=/; max-age=0;";
    } catch {}
    setUser(null);
    window.location.href = "/login";
  };

  // Scroll Spy with IntersectionObserver for rock-solid active tab switching
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionElements = NAV_ITEMS.map((item) => document.getElementById(item.sectionId)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0.15,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      {/* ----------------- DESKTOP STICKY LEFT VERTICAL FLOATING SIDEBAR ----------------- */}
      <aside className="hidden xl:flex xl:sticky xl:top-4 xl:z-50 xl:my-4 xl:ml-5 xl:h-[calc(100vh-2rem)] xl:w-72 xl:flex-col xl:justify-between xl:rounded-2xl xl:border xl:border-neutral-200/90 xl:bg-white/90 xl:p-5 xl:shadow-[0_12px_40px_rgba(0,0,0,0.06)] xl:backdrop-blur-xl dark:xl:border-neutral-800/90 dark:xl:bg-neutral-950/90 dark:xl:shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        <div className="flex flex-col min-h-0">
          {/* Brand Logo */}
          <Link href="/" aria-label="Deep Tech Society — home" className="block mb-5 shrink-0">
            <Logo />
          </Link>

          {/* Vertical Navigation Links with Framer Motion layoutId pill animation */}
          <nav aria-label="Sidebar Primary" className="space-y-1 overflow-y-auto pr-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isPageActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const isSectionActive = pathname === "/" && activeSection === item.sectionId;
              const active = isSectionActive || (pathname !== "/" && isPageActive);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative block rounded-xl"
                >
                  {/* Floating Active Solid Filled Background Pill */}
                  {active && (
                    <motion.div
                      layoutId="sidebar-floating-active-pill"
                      className="absolute inset-0 rounded-xl bg-neutral-950 shadow-[0_6px_25px_rgba(0,0,0,0.22)] dark:bg-white dark:shadow-[0_6px_28px_rgba(255,255,255,0.18)] z-0 scale-[1.02]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                        mass: 0.8,
                      }}
                    />
                  )}

                  <motion.div
                    whileHover={{ x: 4, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    className={cx(
                      "relative z-10 flex items-center justify-between px-3.5 py-2.5 font-sans text-sm transition-colors duration-200",
                      active
                        ? "text-neutral-50 dark:text-neutral-950 font-semibold"
                        : "text-neutral-600 dark:text-neutral-400 font-medium hover:text-neutral-950 dark:hover:text-neutral-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cx(
                        "size-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3",
                        active ? "text-neutral-50 dark:text-neutral-950" : "text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
                      )} />
                      <span className="tracking-tight font-sans text-sm font-semibold">{item.label}</span>
                    </div>

                    {/* Precise 6px Dot on Right Side */}
                    {active && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="size-1.5 rounded-full bg-neutral-50 dark:bg-neutral-950 shadow-xs"
                        aria-hidden
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="border-t border-neutral-200/80 pt-4 shrink-0 dark:border-neutral-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-neutral-400">Theme Mode</span>
            <ThemeToggle />
          </div>

          {user ? (
            <div className="grid gap-2">
              <div className="rounded-xl border border-neutral-300 bg-neutral-100/90 p-2.5 dark:border-neutral-800 dark:bg-neutral-900/90 shadow-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 font-mono text-xs font-bold text-neutral-50 dark:bg-neutral-100 dark:text-neutral-950 shadow-xs">
                    {user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-xs font-bold tracking-tight text-neutral-900 dark:text-neutral-50 truncate">
                      {user.name || "Member"}
                    </p>
                    <p className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sign Out"
                  className="flex size-7.5 shrink-0 items-center justify-center rounded-lg border border-neutral-300 bg-white text-red-600 transition-colors hover:bg-red-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer"
                >
                  <LogOut className="size-3.5" />
                </button>
              </div>
              <Button href="/join" variant="primary" size="sm" className="w-full justify-center">
                Join Community
              </Button>
            </div>
          ) : (
            <div className="grid gap-2">
              <Button href="/login" variant="outline" size="sm" className="w-full justify-center">
                Login
              </Button>
              <Button href="/join" variant="primary" size="sm" className="w-full justify-center">
                Join Community
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* ----------------- MOBILE / TABLET HEADER NAVIGATION ----------------- */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/90 bg-white/90 backdrop-blur-md xl:hidden dark:border-neutral-800/90 dark:bg-neutral-950/90">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label="Deep Tech Society — home" className="shrink-0">
            <Logo />
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex size-7 items-center justify-center rounded-full bg-neutral-900 font-mono text-[10px] font-bold text-neutral-50 dark:bg-neutral-100 dark:text-neutral-950">
                  {user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
                </div>
              </div>
            ) : (
              <Button href="/join" variant="primary" size="sm" className="hidden sm:inline-flex">
                Join Community
              </Button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="grid size-8 place-items-center rounded-md border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </Container>

        {/* Mobile Slide-Out Menu */}
        {mobileOpen && (
          <div className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
            <Container className="grid gap-1 py-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-3 font-sans text-sm font-semibold text-neutral-800 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-neutral-200 pt-3 dark:border-neutral-800">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-full bg-neutral-900 font-mono text-xs font-bold text-neutral-50 dark:bg-neutral-100 dark:text-neutral-950">
                        {user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
                      </div>
                      <div>
                        <p className="font-display text-xs font-bold text-neutral-900 dark:text-neutral-50">{user.name}</p>
                        <p className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="rounded-lg border border-red-300 px-3 py-1.5 font-mono text-xs font-bold text-red-600 dark:border-red-800 dark:text-red-400"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button href="/login" variant="outline" size="sm" className="flex-1">
                      Login
                    </Button>
                    <Button href="/join" variant="primary" size="sm" className="flex-1">
                      Join Community
                    </Button>
                  </div>
                )}
              </div>
            </Container>
          </div>
        )}
      </header>
    </>
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

    // Direct redirect to proper login/signup page with prefilled email
    router.push(`/login?email=${encodeURIComponent(targetEmail)}&mode=signup`);
  }

  return (
    <div className="rounded-xl border border-neutral-300 bg-neutral-100/90 p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900/90">
      <p className="font-display text-[15px] font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
        DEEP TECH BRIEFING
      </p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">
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
            Enterprise-grade community platform for Artificial Intelligence, Quantum Computing, Cybersecurity, and Space Technology.
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
            Four Frontiers
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
        <Container className="flex flex-wrap items-center justify-between gap-2 py-6 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
          <p>© 2026 Dyau Deep Tech Community. Handcrafted Enterprise Platform.</p>
          <p>[ AI · QUANTUM · CYBER · SPACE ]</p>
        </Container>
      </div>
    </footer>
  );
}

"use client";

import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const STORAGE_KEY = "dtc-theme";

/**
 * Light / dark switch.
 *
 * Writes the same data-theme attribute the inline script in <head> sets before
 * first paint, so the two agree and nothing flashes. Both marks stay in the DOM
 * and CSS picks between them (see globals.css), which keeps this component free
 * of client state: it renders identically on the server and the client, so
 * there is nothing to mismatch on hydration and no icon swap after load.
 *
 * A choice is persisted only once the visitor makes one. Until then the page
 * follows the system preference and keeps following it, including when the OS
 * flips while the tab is open.
 */
export function ThemeToggle({ className }: { className?: string }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");

    const follow = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* storage unavailable — fall through and follow the system */
      }
      if (stored === "light" || stored === "dark") return; // an explicit choice wins
      document.documentElement.setAttribute("data-theme", e.matches ? "light" : "dark");
    };

    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the switch still works for this page view */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch between light and dark theme"
      className={[
        "inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border",
        "text-secondary transition-colors duration-200",
        "hover:border-border-strong hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
        className ?? "",
      ].join(" ")}
    >
      <Sun className="theme-icon-sun size-4" aria-hidden="true" />
      <Moon className="theme-icon-moon size-4" aria-hidden="true" />
    </button>
  );
}

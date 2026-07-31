"use client";

import { useEffect } from "react";

export function GlobalClickGlow() {
  useEffect(() => {
    // Track cursor position on cards and interactive elements for border glow
    const handleMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".card-hover, .hover-glow-card, button, a, input, select, textarea, aside");
      if (target) {
        const rect = (target as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (target as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (target as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      }
    };

    // Trigger radiant border glow pulse when anything interactive is clicked
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, input, select, textarea, [role='button'], .card-hover, section, aside, div.group");
      if (target) {
        target.classList.remove("glow-active");
        // Force browser reflow to restart animation
        void (target as HTMLElement).offsetWidth;
        target.classList.add("glow-active");

        setTimeout(() => {
          target.classList.remove("glow-active");
        }, 750);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}

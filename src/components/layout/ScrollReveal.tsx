"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Fades up `[data-reveal]` elements (section headings) and the children of `[data-reveal="group"]`
 * (card groups) once, when they scroll into view; the CSS is in globals.css. Only elements that
 * start below the viewport are hidden, so nothing visible on load moves, and without JS (or with
 * reduced motion) nothing is ever hidden. The state lives in its own attribute, which React never
 * renders, so re-renders cannot reset it.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealState = "in";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    // Wait a frame, so a restored or reset scroll position is in place before deciding what is on screen.
    const frame = requestAnimationFrame(() => {
      for (const element of document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-state])")) {
        if (element.getBoundingClientRect().top < window.innerHeight) continue;
        element.dataset.revealState = "pending";
        observer.observe(element);
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

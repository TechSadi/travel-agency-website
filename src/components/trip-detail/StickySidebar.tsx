"use client";

import clsx from "clsx";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const GAP = 24;

/**
 * Sticky booking column from 980px. A plain `top: 24px` would hide the bottom of a
 * sidebar taller than the window (about 700px against a 580px laptop viewport), so
 * the top offset goes negative by the overflow: the sidebar scrolls with the page
 * until its bottom is in view, then stays put.
 */
type StickySidebarProps = { label: string; className?: string; children: ReactNode };

/** Renders the page's <aside>; it must be the grid item itself so it has the column's height to stick within. */
export function StickySidebar({ label, className, children }: StickySidebarProps) {
  const ref = useRef<HTMLElement>(null);
  const [top, setTop] = useState(GAP);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setTop(Math.min(GAP, window.innerHeight - element.offsetHeight - GAP));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <aside
      ref={ref}
      aria-label={label}
      style={{ "--sticky-top": `${top}px` } as CSSProperties}
      className={clsx("lg:sticky lg:top-(--sticky-top)", className)}
    >
      {children}
    </aside>
  );
}

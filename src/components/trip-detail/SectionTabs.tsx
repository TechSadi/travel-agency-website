"use client";

import clsx from "clsx";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { SlidingIndicator, useSlidingIndicator } from "@/components/ui/SlidingIndicator";

export type SectionTab = { id: string; label: string };

type SectionTabsProps = {
  tabs: SectionTab[];
  className?: string;
};

/**
 * Sticky in-page navigation for the trip detail sections. Clicking scrolls to the
 * section; while reading, an IntersectionObserver highlights the section in view.
 * These are links to anchors, not ARIA tabs, so the current one gets aria-current.
 */
export function SectionTabs({ tabs, className }: SectionTabsProps) {
  const [active, setActive] = useState(tabs[0]?.id);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  // While a click-triggered smooth scroll runs, ignore the sections it passes on the way.
  const scrollTarget = useRef<string | null>(null);
  const unlockTimer = useRef<number | undefined>(undefined);
  // One bar slides to the current tab; until it is measured, the current tab draws its own border.
  const indicator = useSlidingIndicator(listRef, active);

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((section): section is HTMLElement => section !== null);
    const tabsHeight = navRef.current?.offsetHeight ?? 53;
    const visible = new Set<string>();

    // The "reading line" is the band just under the sticky tabs, down to 45% of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (scrollTarget.current) return;
        const first = tabs.find((tab) => visible.has(tab.id));
        if (first) setActive(first.id);
      },
      { rootMargin: `-${tabsHeight + 1}px 0px -55% 0px` },
    );
    sections.forEach((section) => observer.observe(section));

    // Above the first section (e.g. a jump back to the top from below the last one), no
    // intersection changes, so the observer stays silent: highlight the first tab again.
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!scrollTarget.current && sections[0] && sections[0].getBoundingClientRect().top > tabsHeight) {
          setActive(tabs[0].id);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      window.clearTimeout(unlockTimer.current);
    };
  }, [tabs]);

  // Keep the active tab visible inside the row when it scrolls sideways on phones.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, [active]);

  function onClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const section = document.getElementById(id);
    if (!section) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollTarget.current = id;
    window.clearTimeout(unlockTimer.current);
    unlockTimer.current = window.setTimeout(() => (scrollTarget.current = null), reduceMotion ? 100 : 1000);
    setActive(id);
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav
      ref={navRef}
      aria-label="Trip sections"
      className={clsx(
        "sticky top-0 z-20 bg-white max-md:-mx-[var(--gutter)]",
        className,
      )}
    >
      <ul
        ref={listRef}
        // The divider is an inset shadow, so the active link's 2px underline can cover it
        // without overflowing the sideways-scrolling row.
        className="scrollbar-none relative flex gap-[22px] overflow-x-auto shadow-[inset_0_-1px_0_var(--color-line)] max-md:px-[var(--gutter)] md:gap-7"
      >
        {tabs.map((tab) => {
          const current = tab.id === active;
          return (
            <li key={tab.id} className="shrink-0">
              <a
                href={`#${tab.id}`}
                aria-current={current ? "true" : undefined}
                onClick={(event) => onClick(event, tab.id)}
                className={clsx(
                  "block min-w-11 border-b-2 py-3 text-center whitespace-nowrap no-underline transition-colors md:py-3.5",
                  current
                    ? clsx("font-semibold text-brand hover:text-brand", indicator ? "border-transparent" : "border-brand")
                    : "border-transparent font-medium text-ink hover:text-brand-dark",
                )}
              >
                {tab.label}
              </a>
            </li>
          );
        })}
        <SlidingIndicator box={indicator} />
      </ul>
    </nav>
  );
}

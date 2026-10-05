"use client";

import { useEffect, useState, type RefObject } from "react";

type IndicatorBox = { left: number; width: number; animate: boolean };

/**
 * Measures the `[aria-current]` link inside `listRef` (which must be `relative`) whenever
 * `activeKey` changes or the list resizes. Null until measured, or when nothing is current.
 * It only animates a move from one item to another, never its first appearance.
 */
export function useSlidingIndicator(listRef: RefObject<HTMLElement | null>, activeKey: unknown, enabled = true) {
  const [box, setBox] = useState<IndicatorBox | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !enabled) return;
    const measure = () => {
      const active = list.querySelector<HTMLElement>("[aria-current]");
      const next = active && active.offsetWidth > 0 ? { left: active.offsetLeft, width: active.offsetWidth } : null;
      setBox((previous) => next && { ...next, animate: previous !== null });
    };
    // A ResizeObserver reports once on observe, and again when fonts load or the layout changes.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [listRef, activeKey, enabled]);

  return box;
}

/**
 * The 2px brand bar under the current item, as the last child of the list. It slides with
 * translate and scale (a 1px bar scaled to the item width), so only transforms animate.
 */
export function SlidingIndicator({ box }: { box: IndicatorBox | null }) {
  if (!box) return null;
  return (
    <li
      aria-hidden="true"
      className={
        box.animate
          ? "pointer-events-none absolute bottom-0 left-0 h-0.5 w-px origin-left bg-brand transition-[translate,scale] duration-(--duration-base) ease-out"
          : "pointer-events-none absolute bottom-0 left-0 h-0.5 w-px origin-left bg-brand"
      }
      style={{ translate: `${box.left}px 0`, scale: `${box.width} 1` }}
    />
  );
}

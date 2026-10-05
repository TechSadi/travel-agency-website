"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const DURATION = 1600;
/** Prefix, number (with Indian grouping or decimals) and suffix, e.g. "18,000+" or "4.8". */
const PATTERN = /^(\D*)([\d,]+(?:\.\d+)?)(.*)$/;

/**
 * A stat that counts up once when scrolled to. The server renders the final value, so without
 * JS, with reduced motion, or when the stat is already on screen at load, it simply shows.
 * Screen readers get the final value only.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const match = value.match(PATTERN);
    if (!element || !match || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    const [, prefix, number, suffix] = match;
    const target = parseFloat(number.replace(/,/g, ""));
    const decimals = number.split(".")[1]?.length ?? 0;
    const format = new Intl.NumberFormat("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const show = (n: number) => (element.textContent = `${prefix}${format.format(n)}${suffix}`);

    let frame = 0;
    show(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION);
          show(target * (1 - (1 - progress) ** 3)); // ease-out
          if (progress < 1) frame = requestAnimationFrame(tick);
          else element.textContent = value;
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.textContent = value;
    };
  }, [value]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

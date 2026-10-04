import clsx from "clsx";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type HomeSectionProps = {
  /** id of the section heading, for aria-labelledby. */
  labelledBy: string;
  paper?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

/**
 * Home section band. DESIGN.md rhythm (72 to 120px) from 768px; phones use the
 * tighter 40 to 44px spacing of design-reference/mobile-home.html.
 */
export function HomeSection({ labelledBy, paper, className, containerClassName, children }: HomeSectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={clsx(paper && "bg-paper", className)}>
      <Container className={clsx("py-11 md:py-[clamp(72px,9vw,120px)]", containerClassName)}>{children}</Container>
    </section>
  );
}

/** Phone-sized section heading, from design-reference/mobile-home.html. */
export const mobileTitle = "max-md:text-[1.75rem] max-md:leading-[1.1]";

/**
 * Phones show one card at a time, as mobile-home.html does, with the next one peeking in
 * a horizontal snap row that bleeds to the screen edges. From 768px the row is a grid again.
 */
// `relative` makes the row the containing block of absolutely positioned children
// (e.g. sr-only text), so they are clipped by the row instead of widening the page.
export const mobileSnapRow =
  "relative max-md:-mx-[var(--gutter)] max-md:flex max-md:snap-x max-md:snap-mandatory max-md:scroll-px-[var(--gutter)] max-md:gap-3 max-md:overflow-x-auto max-md:px-[var(--gutter)] scrollbar-none";
export const mobileSnapItem = "max-md:w-[86%] max-md:shrink-0 max-md:snap-start";

import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  link?: { href: string; label: ReactNode };
  id?: string;
  className?: string;
  /** Extra classes for the h2, e.g. a smaller size on phones. */
  titleClassName?: string;
  linkClassName?: string;
  descriptionClassName?: string;
};

/**
 * Section h2 with an optional muted paragraph and an optional right-aligned text link.
 * Fades up when scrolled to (ScrollReveal); keep it off forms and the trip detail sections.
 */
export function SectionHeading({
  title,
  description,
  link,
  id,
  className,
  titleClassName,
  linkClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div data-reveal className={clsx("mb-9 flex flex-wrap items-end justify-between gap-5", className)}>
      <div>
        <h2 id={id} className={clsx("m-0 max-w-[22ch] text-section", titleClassName)}>
          {title}
        </h2>
        {description && (
          <p className={clsx("mt-3.5 max-w-[34rem] text-[1.1rem] leading-[1.6] text-muted", descriptionClassName)}>
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link href={link.href} className={clsx("tap-target relative font-medium text-ink underline underline-offset-[5px]", linkClassName)}>
          {link.label}
        </Link>
      )}
    </div>
  );
}

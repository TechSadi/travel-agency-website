import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  link?: { href: string; label: string };
  id?: string;
  className?: string;
};

/** Section h2 with an optional muted paragraph and an optional right-aligned text link. */
export function SectionHeading({ title, description, link, id, className }: SectionHeadingProps) {
  return (
    <div className={clsx("mb-9 flex flex-wrap items-end justify-between gap-5", className)}>
      <div>
        <h2 id={id} className="m-0 max-w-[22ch] text-section">
          {title}
        </h2>
        {description && <p className="mt-3.5 max-w-[34rem] text-[1.1rem] leading-[1.6] text-muted">{description}</p>}
      </div>
      {link && (
        <Link href={link.href} className="font-medium text-ink underline underline-offset-[5px]">
          {link.label}
        </Link>
      )}
    </div>
  );
}

import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";

type BreadcrumbProps = {
  /** Every item but the last is a link; the last is the current page. */
  items: { label: string; href?: string }[];
  /** "light" for use on a dark photo hero. */
  tone?: "default" | "light";
};

/** "Home / Trips" trail above a page title. */
export function Breadcrumb({ items, tone = "default" }: BreadcrumbProps) {
  const light = tone === "light";
  return (
    <nav aria-label="Breadcrumb" className={clsx("text-[0.95rem]", light ? "text-topbar-text" : "text-muted")}>
      <ol className="flex flex-wrap items-center gap-x-1.5">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <Fragment key={item.label}>
              <li>
                {last || !item.href ? (
                  <span aria-current={last ? "page" : undefined} className={light ? "text-white" : "text-ink"}>
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className={clsx("no-underline", light ? "text-topbar-text hover:text-white" : "text-muted hover:text-brand-dark")}>
                    {item.label}
                  </Link>
                )}
              </li>
              {!last && (
                <li aria-hidden="true" className="select-none">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

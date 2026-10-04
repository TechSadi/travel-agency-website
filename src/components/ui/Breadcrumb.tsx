import Link from "next/link";
import { Fragment } from "react";

type BreadcrumbProps = {
  /** Every item but the last is a link; the last is the current page. */
  items: { label: string; href?: string }[];
};

/** "Home / Trips" trail above a page title. */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.95rem] text-muted">
      <ol className="flex flex-wrap items-center gap-x-1.5">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <Fragment key={item.label}>
              <li>
                {last || !item.href ? (
                  <span aria-current={last ? "page" : undefined} className="text-ink">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="text-muted no-underline hover:text-brand-dark">
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

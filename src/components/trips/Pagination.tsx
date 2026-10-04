"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, type MouseEvent, type ReactNode } from "react";

type PaginationProps = {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => string;
  /** Called on a plain click, instead of following the link. Modified clicks (new tab) still follow it. */
  onNavigate: (page: number) => void;
};

const item = "inline-flex h-11 min-w-11 items-center justify-center rounded-control border px-2 no-underline transition-colors";

/** Page links under the results, as real links so each page can be opened or shared. */
export function Pagination({ page, pageCount, hrefFor, onNavigate }: PaginationProps) {
  if (pageCount <= 1) return null;

  function link(target: number, content: ReactNode, label?: string) {
    const current = target === page;
    return (
      <a
        href={hrefFor(target)}
        aria-label={label}
        aria-current={current ? "page" : undefined}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
          event.preventDefault();
          if (!current) onNavigate(target);
        }}
        className={clsx(
          item,
          current ? "border-ink bg-ink text-white hover:text-white" : "border-line bg-white text-ink hover:border-ink hover:text-ink",
        )}
      >
        {content}
      </a>
    );
  }

  return (
    <nav aria-label="Pages" className="mt-12 flex flex-wrap justify-center gap-2">
      {page > 1 && link(page - 1, <ChevronLeft size={18} strokeWidth={1.8} aria-hidden="true" />, "Previous page")}
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((target) => (
        <Fragment key={target}>{link(target, target, `Page ${target}`)}</Fragment>
      ))}
      {page < pageCount && link(page + 1, <ChevronRight size={18} strokeWidth={1.8} aria-hidden="true" />, "Next page")}
    </nav>
  );
}

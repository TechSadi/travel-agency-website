"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { useModalDialog } from "@/lib/useModalDialog";

type FilterSheetProps = {
  id: string;
  open: boolean;
  /** Close and return focus to the Filters button. */
  onDismiss: () => void;
  /** Close without moving focus (the viewport grew past the breakpoint). */
  onAutoClose: () => void;
  /** "Show N trips": close and bring the results into view. */
  onShowResults: () => void;
  onClearAll: () => void;
  resultCount: number;
  children: ReactNode;
};

/** Bottom sheet with the trip filters, under 768px (DESIGN.md section 7). Filters apply as they change. */
export function FilterSheet({ id, open, onDismiss, onAutoClose, onShowResults, onClearAll, resultCount, children }: FilterSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = `${id}-title`;

  useModalDialog({
    open,
    panelRef,
    initialFocusRef: closeButtonRef,
    onDismiss,
    autoCloseQuery: "(min-width: 768px)",
    onAutoClose,
  });

  return (
    <div className="md:hidden">
      <div
        aria-hidden="true"
        onClick={onDismiss}
        className={clsx(
          "fixed inset-0 z-40 bg-ink/55 transition-opacity duration-(--duration-base) ease-out",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        inert={!open}
        className={clsx(
          "fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-panel bg-white shadow-bar",
          // Visibility flips at once on open (so focus can move in) and only after the slide on close.
          "duration-(--duration-base) ease-out",
          open ? "visible translate-y-0 transition-[translate]" : "invisible translate-y-full transition-[translate,visibility]",
        )}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line py-3 pr-3 pl-5">
          <h2 id={titleId} className="font-sans text-[1.15rem] font-semibold">
            Filters
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close filters"
            onClick={onDismiss}
            className="inline-flex size-11 items-center justify-center rounded-control text-ink transition-colors hover:bg-paper"
          >
            <X size={22} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-2 [&>div>fieldset:first-child]:border-t-0 [&>div>fieldset:first-child]:pt-3">
          {children}
        </div>

        <div className="flex gap-3 border-t border-line px-5 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
          <button type="button" onClick={onClearAll} className={buttonClasses("outline", "md", "flex-1 hover:bg-transparent hover:text-ink")}>
            Clear all
          </button>
          <button type="button" onClick={onShowResults} className={buttonClasses("primary", "md", "flex-[2]")}>
            Show {resultCount} {resultCount === 1 ? "trip" : "trips"}
          </button>
        </div>
      </div>
    </div>
  );
}

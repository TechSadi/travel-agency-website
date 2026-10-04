import clsx from "clsx";
import type { ReactNode } from "react";

type CollapsibleProps = {
  id: string;
  open: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Accordion panel that animates its height open and closed (grid rows 0fr to 1fr).
 * Closed panels are `inert`, so their links and text stay out of the tab order and
 * the accessibility tree. The global reduced-motion rule turns the transition off.
 */
export function Collapsible({ id, open, className, children }: CollapsibleProps) {
  return (
    <div
      id={id}
      inert={!open}
      className={clsx(
        "grid transition-[grid-template-rows] duration-300 ease-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}

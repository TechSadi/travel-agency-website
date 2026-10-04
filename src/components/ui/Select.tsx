import clsx from "clsx";
import type { ComponentProps } from "react";

type SelectProps = ComponentProps<"select"> & {
  /** "paper" for form fields (search panel), "white" for toolbar controls (sort). */
  tone?: "paper" | "white";
  /** Extra classes for the select itself; `className` goes on the wrapper. */
  selectClassName?: string;
};

export const fieldClasses =
  "min-h-11 w-full min-w-0 rounded-control border border-line px-3 text-[1rem] text-ink placeholder:text-muted focus-visible:border-ink";

/** Native select with a custom chevron, so it matches the text inputs. */
export function Select({ tone = "paper", className, selectClassName, children, ...rest }: SelectProps) {
  return (
    <div className={clsx("relative", className)}>
      <select
        {...rest}
        className={clsx(
          fieldClasses,
          "cursor-pointer appearance-none pr-9",
          tone === "paper" ? "bg-paper" : "bg-white",
          selectClassName,
        )}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

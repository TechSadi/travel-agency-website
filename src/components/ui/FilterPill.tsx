import clsx from "clsx";
import type { ComponentProps } from "react";

type FilterPillProps = Omit<ComponentProps<"button">, "type"> & {
  selected: boolean;
};

/** Toggle pill for filters (DESIGN.md FilterPills): ink when selected, white with a line border otherwise. */
export function FilterPill({ selected, className, ...rest }: FilterPillProps) {
  return (
    <button
      {...rest}
      type="button"
      aria-pressed={selected}
      className={clsx(
        "min-h-[42px] cursor-pointer rounded-pill border px-[18px] text-[0.95rem] whitespace-nowrap transition-colors",
        selected ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink",
        className,
      )}
    />
  );
}

"use client";

import clsx from "clsx";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import type { Ref } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { sortOptions, type ActiveFilter, type SortKey, type ViewMode } from "@/data/tripList";

type ResultsBarProps = {
  total: number;
  chips: ActiveFilter[];
  onRemoveChip: (chip: ActiveFilter) => void;
  onClearAll: () => void;
  sort: SortKey;
  onSort: (sort: SortKey) => void;
  view: ViewMode;
  onView: (view: ViewMode) => void;
  /** Mobile "Filters" button, which opens the bottom sheet. */
  sheetId: string;
  sheetOpen: boolean;
  onOpenFilters: () => void;
  filtersButtonRef: Ref<HTMLButtonElement>;
};

const views = [
  { value: "grid", label: "Grid view", icon: LayoutGrid },
  { value: "list", label: "List view", icon: List },
] as const;

/** Result count, removable filter chips, sort and the grid/list toggle above the trips. */
export function ResultsBar({
  total,
  chips,
  onRemoveChip,
  onClearAll,
  sort,
  onSort,
  view,
  onView,
  sheetId,
  sheetOpen,
  onOpenFilters,
  filtersButtonRef,
}: ResultsBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3.5 border-b border-line pb-5">
      <div className="order-2 flex w-full flex-wrap items-center gap-2.5 md:order-1 md:w-auto md:flex-1">
        <p role="status" className="mr-1.5 font-medium text-ink">
          {total} {total === 1 ? "trip" : "trips"} found
        </p>
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={() => onRemoveChip(chip)}
            aria-label={`Remove filter: ${chip.label}`}
            className="inline-flex min-h-9 items-center gap-2 rounded-pill bg-brand-tint pr-2.5 pl-3.5 text-[0.92rem] text-brand-dark transition-colors hover:bg-brand-tint/70"
          >
            {chip.label}
            <X size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        ))}
        {chips.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="min-h-9 px-1 text-[0.95rem] text-brand-dark underline underline-offset-2 md:hidden"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="order-1 flex w-full items-center gap-2.5 md:order-2 md:w-auto">
        <button
          ref={filtersButtonRef}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
          aria-controls={sheetId}
          onClick={onOpenFilters}
          className={buttonClasses("outline", "sm", "min-h-11 flex-1 hover:bg-transparent hover:text-ink md:hidden")}
        >
          <SlidersHorizontal size={18} strokeWidth={1.8} aria-hidden="true" />
          Filters
          {chips.length > 0 && (
            <span className="inline-flex min-w-6 items-center justify-center rounded-pill bg-brand px-1.5 text-[0.82rem] leading-6 font-semibold text-white">
              {chips.length}
              <span className="sr-only"> active</span>
            </span>
          )}
        </button>

        <label className="flex flex-1 items-center gap-2.5 text-muted md:flex-none">
          <span className="whitespace-nowrap max-md:sr-only">Sort by</span>
          <Select
            tone="white"
            value={sort}
            onChange={(event) => onSort(event.target.value as SortKey)}
            className="w-full md:w-auto"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>

        {/* Under 640px the list card stacks like the grid card, so the toggle would do nothing. */}
        <div role="group" aria-label="Layout" className="hidden shrink-0 overflow-hidden rounded-control border border-line sm:flex">
          {views.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              aria-label={label}
              aria-pressed={view === value}
              onClick={() => onView(value)}
              className={clsx(
                "inline-flex h-[42px] w-11 items-center justify-center transition-colors",
                view === value ? "bg-ink text-white" : "bg-white text-ink hover:bg-paper",
              )}
            >
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

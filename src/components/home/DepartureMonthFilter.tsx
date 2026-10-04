"use client";

import { Fragment, useState, type ReactNode } from "react";
import { DepartureList } from "@/components/departures/DepartureList";
import { FilterPill } from "@/components/ui/FilterPill";

export type DepartureFilterRow = {
  key: string;
  /** YYYY-MM of the departure. */
  month: string;
  /** Part of the "All upcoming" view (the next few departures overall). */
  upcoming: boolean;
  row: ReactNode;
};

type DepartureMonthFilterProps = {
  months: { value: string; label: string }[];
  rows: DepartureFilterRow[];
  /** Rows per view. */
  limit: number;
  /** The section heading, laid out beside the pills from 768px. */
  heading: ReactNode;
};

const ALL = "all";

/**
 * Month pills over the group departures list. The rows are rendered on the server
 * and passed in, so only their month tags reach the client.
 */
export function DepartureMonthFilter({ months, rows, limit, heading }: DepartureMonthFilterProps) {
  const [selected, setSelected] = useState(ALL);
  const options = [{ value: ALL, label: "All upcoming" }, ...months];
  const visible = rows
    .filter((row) => (selected === ALL ? row.upcoming : row.month === selected))
    .slice(0, limit);
  const selectedLabel = options.find((option) => option.value === selected)?.label;

  return (
    <>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-6 md:mb-9">
        {heading}
        <div role="group" aria-label="Filter departures by month" className="hidden flex-wrap gap-2 md:flex">
          {options.map((option) => (
            <FilterPill
              key={option.value}
              selected={option.value === selected}
              onClick={() => setSelected(option.value)}
            >
              {option.label}
            </FilterPill>
          ))}
        </div>
      </div>

      <DepartureList label={`Group departures, ${selectedLabel}`} mobilePreview>
        {visible.map((row) => (
          <Fragment key={row.key}>{row.row}</Fragment>
        ))}
      </DepartureList>
      <p aria-live="polite" className="sr-only">
        {visible.length} departures shown
      </p>
    </>
  );
}

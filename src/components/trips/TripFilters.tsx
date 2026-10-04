"use client";

import type { ReactNode } from "react";
import type { FilterGroup, FilterOptions, TripListState } from "@/data/tripList";
import { BudgetRange } from "./BudgetRange";

type TripFiltersProps = {
  state: TripListState;
  options: FilterOptions;
  counts: Record<FilterGroup, Record<string, number>>;
  onChange: (next: TripListState) => void;
  /** Keeps input ids unique when the sidebar and the mobile sheet are both in the page. */
  idPrefix: string;
};

const groups: { key: FilterGroup; legend: string }[] = [
  { key: "dest", legend: "Destination" },
  { key: "type", legend: "Kind of trip" },
  { key: "dur", legend: "Duration" },
];

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line py-[22px]">
      <legend className="mb-3 pr-3 font-semibold text-ink">{legend}</legend>
      {children}
    </fieldset>
  );
}

/** The trip filters (DESIGN.md section 5, Trips), shared by the sidebar and the mobile sheet. */
export function TripFilters({ state, options, counts, onChange, idPrefix }: TripFiltersProps) {
  function toggle(group: FilterGroup, value: string, checked: boolean) {
    const current = state[group] as string[];
    const next = checked ? [...current, value] : current.filter((v) => v !== value);
    onChange({ ...state, [group]: next, page: 1 });
  }

  function checkboxes(group: FilterGroup) {
    const selected = state[group] as string[];
    return (
      <ul className="flex flex-col gap-2.5">
        {options[group].map((option) => {
          const id = `${idPrefix}-${group}-${option.value}`;
          return (
            <li key={option.value}>
              <label htmlFor={id} className="flex cursor-pointer items-center justify-between gap-2.5 text-body">
                <span className="inline-flex items-center gap-2.5">
                  <input
                    id={id}
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    onChange={(event) => toggle(group, option.value, event.target.checked)}
                    className="size-[18px] shrink-0 cursor-pointer accent-brand"
                  />
                  {option.label}
                </span>
                <span className="text-[0.9rem] text-muted">
                  {counts[group][option.value] ?? 0}
                  <span className="sr-only"> trips</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div>
      {groups.map((group) => (
        <Fieldset key={group.key} legend={group.legend}>
          {checkboxes(group.key)}
        </Fieldset>
      ))}

      <Fieldset legend="Budget per person">
        <div className="pt-0.5">
          <BudgetRange
            idPrefix={`${idPrefix}-budget`}
            min={options.budget.min}
            max={options.budget.max}
            step={options.budget.step}
            low={state.min}
            high={state.max}
            onCommit={(min, max) => onChange({ ...state, min, max, page: 1 })}
          />
        </div>
      </Fieldset>

      {options.month.length > 0 && <Fieldset legend="Departure month">{checkboxes("month")}</Fieldset>}
    </div>
  );
}

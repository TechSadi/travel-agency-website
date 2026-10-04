"use client";

import { useState } from "react";
import { formatRupees } from "@/lib/format";

type BudgetRangeProps = {
  min: number;
  max: number;
  step: number;
  /** Selected bounds; `null` means the end of the track. */
  low: number | null;
  high: number | null;
  onCommit: (low: number | null, high: number | null) => void;
  idPrefix: string;
};

/**
 * Two-handle budget slider: two overlaid native range inputs, so arrows, Page Up/Down
 * and Home/End work with the keyboard. The handles move freely while dragging and the
 * filter is applied on release, so the URL is not rewritten on every pixel.
 */
export function BudgetRange({ min, max, step, low, high, onCommit, idPrefix }: BudgetRangeProps) {
  const committed: [number, number] = [low ?? min, high ?? max];
  const [draft, setDraft] = useState(committed);
  const [synced, setSynced] = useState(committed);

  // Follow outside changes (a removed chip, Clear all) while keeping an in-progress drag.
  if (synced[0] !== committed[0] || synced[1] !== committed[1]) {
    setSynced(committed);
    setDraft(committed);
  }

  const [lo, hi] = draft;
  const commit = () => {
    if (lo === committed[0] && hi === committed[1]) return;
    onCommit(lo <= min ? null : lo, hi >= max ? null : hi);
  };
  const fraction = (value: number) => (value - min) / (max - min);
  // Thumbs are 20px and travel inside the track, so map values onto (100% - 20px).
  const at = (value: number) => `calc(10px + (100% - 20px) * ${fraction(value)})`;

  const shared = {
    min,
    max,
    step,
    onPointerUp: commit,
    onKeyUp: commit,
    onBlur: commit,
    className: "range-thumb absolute inset-0 h-6 w-full",
  };

  return (
    <div>
      <div className="relative h-6">
        <span aria-hidden="true" className="absolute inset-x-0 top-2.5 h-1 rounded-pill bg-line" />
        <span
          aria-hidden="true"
          className="absolute top-2.5 h-1 rounded-pill bg-brand"
          style={{ left: at(lo), right: `calc(100% - ${at(hi)})` }}
        />
        <input
          {...shared}
          type="range"
          id={`${idPrefix}-min`}
          aria-label="Minimum budget"
          aria-valuetext={formatRupees(lo)}
          value={lo}
          onChange={(event) => setDraft([Math.min(Number(event.target.value), hi), hi])}
          // When both handles meet at the top end, keep the minimum handle reachable.
          style={{ zIndex: lo > min + (max - min) / 2 ? 2 : 1 }}
        />
        <input
          {...shared}
          type="range"
          id={`${idPrefix}-max`}
          aria-label="Maximum budget"
          aria-valuetext={formatRupees(hi)}
          value={hi}
          onChange={(event) => setDraft([lo, Math.max(Number(event.target.value), lo)])}
        />
      </div>
      <div className="mt-2.5 flex justify-between text-body" aria-hidden="true">
        <span>{formatRupees(lo)}</span>
        <span>{formatRupees(hi)}</span>
      </div>
    </div>
  );
}

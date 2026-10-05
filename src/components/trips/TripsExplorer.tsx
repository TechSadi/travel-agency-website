"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/data/site";
import {
  activeFilters,
  clearedFilters,
  facetCounts,
  filterTrips,
  PAGE_SIZE,
  parseListState,
  serializeListState,
  type ActiveFilter,
  type FilterOptions,
  type TripListItem,
  type TripListState,
} from "@/data/tripList";
import { formatRupees } from "@/lib/format";
import { durationToken, easeOutToken, prefersReducedMotion } from "@/lib/motion";
import { EmptyState } from "./EmptyState";
import { FilterSheet } from "./FilterSheet";
import { Pagination } from "./Pagination";
import { ResultsBar } from "./ResultsBar";
import { TripCard } from "./TripCard";
import { TripFilters } from "./TripFilters";

type TripsExplorerProps = {
  trips: TripListItem[];
  options: FilterOptions;
};

const SHEET_ID = "trip-filters-sheet";

// Card image widths beside the filter sidebar (from 768px): one column up to about 900px, then two or three.
const RESULT_SIZES = {
  grid: "(min-width: 1280px) 310px, (min-width: 980px) 31vw, (min-width: 768px) 55vw, (min-width: 600px) 50vw, 100vw",
  list: "(min-width: 1280px) 370px, (min-width: 768px) 30vw, (min-width: 640px) 38vw, 100vw",
};

/**
 * The filterable trips list (DESIGN.md section 5, Trips). The URL is the only source of
 * state: every change rewrites the query string with the native History API, which
 * Next.js syncs into useSearchParams, so results update instantly and any view can be
 * shared or reloaded. Filter changes replace the history entry; page changes push one.
 */
export function TripsExplorer({ trips, options }: TripsExplorerProps) {
  const searchParams = useSearchParams();
  const state = useMemo(
    () => parseListState(new URLSearchParams(searchParams.toString()), options),
    [searchParams, options],
  );

  const results = useMemo(() => filterTrips(trips, state), [trips, state]);
  const counts = useMemo(() => facetCounts(trips, state, options), [trips, state, options]);
  const chips = useMemo(() => activeFilters(state, options, formatRupees), [state, options]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(state.page, pageCount);
  const pageItems = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resultsRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // When the visible results change (not on the first render), the cards fade up 12px,
  // 40ms apart. A keyed <ViewTransition> would crossfade, but it would start a view
  // transition on every step of a budget slider drag.
  const resultsKey = `${state.view}|${page}|${pageItems.map((trip) => trip.slug).join()}`;
  const previousKey = useRef(resultsKey);
  useEffect(() => {
    if (previousKey.current === resultsKey) return;
    previousKey.current = resultsKey;
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    const cards = list.querySelectorAll<HTMLElement>(":scope > ul > li");
    const targets = cards.length > 0 ? Array.from(cards) : [list];
    const duration = durationToken("--duration-slow");
    const easing = easeOutToken();
    targets.forEach((target, index) =>
      target.animate([{ opacity: 0, translate: "0 12px" }, { opacity: 1, translate: "0 0" }], {
        duration,
        easing,
        delay: Math.min(index, 8) * 40,
        fill: "backwards",
      }),
    );
  }, [resultsKey]);
  const filtersButtonRef = useRef<HTMLButtonElement>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const hrefFor = useCallback(
    (next: TripListState) => `/trips${serializeListState(next, new URLSearchParams(searchParams.toString()))}`,
    [searchParams],
  );

  const update = useCallback(
    (next: TripListState, mode: "replace" | "push" = "replace") => {
      const url = hrefFor(next);
      if (mode === "push") window.history.pushState(null, "", url);
      else window.history.replaceState(null, "", url);
    },
    [hrefFor],
  );

  /** Brings the top of the results into view, unless it is already on screen. */
  const revealResults = useCallback(() => {
    const element = resultsRef.current;
    if (!element || element.getBoundingClientRect().top >= 0) return;
    element.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }, []);

  const clearAll = () => update(clearedFilters(state));
  const removeChip = (chip: ActiveFilter) => update(chip.remove(state));

  const closeSheet = () => {
    setSheetOpen(false);
    filtersButtonRef.current?.focus({ preventScroll: true });
  };

  const whatsappMessage =
    chips.length > 0
      ? `Hello Suman Holidays, I could not find a trip on your website for: ${chips.map((chip) => chip.label).join(", ")}. Can you suggest one?`
      : "Hello Suman Holidays, I would like help planning a trip.";

  const filters = (idPrefix: string) => (
    <TripFilters
      state={state}
      options={options}
      counts={counts}
      onChange={(next) => update(next)}
      idPrefix={idPrefix}
    />
  );

  return (
    <>
      <div className="flex items-start gap-10 lg:gap-12">
        <aside aria-label="Trip filters" className="hidden w-[240px] shrink-0 md:block lg:w-[260px]">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="font-sans text-[1.15rem] font-semibold">Filters</h2>
            {chips.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="min-h-11 text-[0.95rem] text-brand underline underline-offset-2 hover:text-brand-dark"
              >
                Clear all
              </button>
            )}
          </div>
          {filters("sidebar")}
          <div className="mt-2 rounded-card bg-paper p-[22px]">
            <h3 className="text-[1.35rem] leading-[1.2]">Can’t find the right trip?</h3>
            <p className="mt-1.5 mb-4 text-[0.95rem] text-muted">
              Tell us your plan and we’ll build a custom itinerary.
            </p>
            <Button
              href={whatsappLink(whatsappMessage)}
              variant="whatsapp"
              size="sm"
              icon={<WhatsAppIcon size={18} />}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </Button>
          </div>
        </aside>

        <section ref={resultsRef} aria-labelledby="trip-results" className="min-w-0 flex-1 scroll-mt-6">
          {/* Keeps the heading order (h1, h2, then the cards' h3) where the sidebar's h2 is hidden. */}
          <h2 id="trip-results" className="sr-only">
            Trips
          </h2>
          <ResultsBar
            total={results.length}
            chips={chips}
            onRemoveChip={removeChip}
            onClearAll={clearAll}
            sort={state.sort}
            onSort={(sort) => update({ ...state, sort, page: 1 })}
            view={state.view}
            onView={(view) => update({ ...state, view })}
            sheetId={SHEET_ID}
            sheetOpen={sheetOpen}
            onOpenFilters={() => setSheetOpen(true)}
            filtersButtonRef={filtersButtonRef}
          />

          <div ref={listRef} className="mt-7">
            {results.length === 0 ? (
              <EmptyState onClear={clearAll} whatsappHref={whatsappLink(whatsappMessage)} />
            ) : (
              <ul
                className={clsx(
                  "grid gap-6",
                  // As in design-reference/trips.html: as many 280px+ columns as fit (3 at 1440px).
                  state.view === "grid" ? "grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))]" : "grid-cols-1",
                )}
              >
                {pageItems.map((trip, index) => (
                  <li key={trip.slug} className="flex">
                    <TripCard
                      trip={trip}
                      layout={state.view}
                      sizes={RESULT_SIZES[state.view]}
                      priority={index === 0}
                      className="w-full"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Pagination
            page={page}
            pageCount={pageCount}
            hrefFor={(target) => hrefFor({ ...state, page: target })}
            onNavigate={(target) => {
              update({ ...state, page: target }, "push");
              revealResults();
            }}
          />
        </section>
      </div>

      <FilterSheet
        id={SHEET_ID}
        open={sheetOpen}
        onDismiss={closeSheet}
        onAutoClose={() => setSheetOpen(false)}
        onShowResults={() => {
          closeSheet();
          // Wait for the sheet to release its page scroll lock.
          requestAnimationFrame(revealResults);
        }}
        onClearAll={clearAll}
        resultCount={results.length}
      >
        {filters("sheet")}
      </FilterSheet>
    </>
  );
}

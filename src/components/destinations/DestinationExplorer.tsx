"use client";

import { Search } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { EmptyState } from "@/components/trips/EmptyState";
import { FilterPill } from "@/components/ui/FilterPill";
import { whatsappLink } from "@/data/site";
import type { DestinationSummary, Region } from "@/data/types";
import { DestinationCard } from "./DestinationCard";

type DestinationExplorerProps = {
  destinations: DestinationSummary[];
  regions: Region[];
};

const ALL = "All";

/** Region pills and a search box that filter the destinations grid as you type (DESIGN.md section 5, Destinations). */
export function DestinationExplorer({ destinations, regions }: DestinationExplorerProps) {
  const [region, setRegion] = useState<Region | typeof ALL>(ALL);
  const [query, setQuery] = useState("");
  const searchId = useId();

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return destinations.filter(
      (destination) =>
        (region === ALL || destination.region === region) &&
        (needle === "" ||
          destination.name.toLowerCase().includes(needle) ||
          destination.country.toLowerCase().includes(needle)),
    );
  }, [destinations, region, query]);

  const clear = () => {
    setRegion(ALL);
    setQuery("");
  };

  return (
    <>
      <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter destinations by region" className="flex flex-wrap gap-2">
          {[ALL, ...regions].map((option) => (
            <FilterPill key={option} selected={option === region} onClick={() => setRegion(option as Region)}>
              {option}
            </FilterPill>
          ))}
        </div>

        <div className="flex min-h-[46px] w-full items-center gap-2.5 rounded-control border border-line bg-white px-3.5 focus-within:border-ink has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-offset-3 has-[input:focus-visible]:outline-brand sm:w-auto sm:min-w-[260px]">
          <label htmlFor={searchId} className="sr-only">
            Search destinations
          </label>
          <Search size={18} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-muted" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search destinations"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-[1rem] text-ink outline-none placeholder:text-muted"
          />
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {results.length === 1 ? "1 destination" : `${results.length} destinations`} shown
      </p>

      {results.length > 0 ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-x-7 gap-y-10">
          {results.map((destination) => (
            <li key={destination.slug}>
              <DestinationCard destination={destination} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          onClear={clear}
          whatsappHref={whatsappLink(
            query.trim()
              ? `Hello Suman Holidays, I would like to plan a trip to ${query.trim()}.`
              : "Hello Suman Holidays, I would like to plan a custom trip.",
          )}
          title="No destinations match"
          description="We plan custom trips almost anywhere. Clear the filters, or tell us the place and we will put a trip together."
        />
      )}
    </>
  );
}

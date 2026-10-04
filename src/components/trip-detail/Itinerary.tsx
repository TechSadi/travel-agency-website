"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ItineraryDay } from "@/data/types";
import { Collapsible } from "./Collapsible";
import { DetailSection } from "./DetailSection";

type ItineraryProps = { id: string; days: ItineraryDay[] };

/** "Day by day": a vertical timeline with an accordion per day. Day 1 starts open. */
export function Itinerary({ id, days }: ItineraryProps) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([days[0]?.day]));
  const allOpen = open.size === days.length;

  function toggle(day: number) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  }

  return (
    <DetailSection
      id={id}
      title="Day by day"
      action={
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(days.map((d) => d.day)))}
          className="font-medium text-ink underline underline-offset-[5px] transition-colors hover:text-brand-dark"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      }
    >
      <ol className="ml-[9px] border-l-2 border-line pl-6 md:pl-[34px]">
        {days.map((item) => {
          const isOpen = open.has(item.day);
          const panelId = `${id}-day-${item.day}`;
          return (
            <li key={item.day} className="relative pb-[26px] last:pb-1">
              <span
                aria-hidden="true"
                className={clsx(
                  "absolute top-1 -left-[34px] size-[18px] rounded-pill border-2 border-brand transition-colors md:-left-[44px]",
                  isOpen ? "bg-brand" : "bg-white",
                )}
              />
              <h3 className="font-sans">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.day)}
                  className="flex w-full items-center justify-between gap-4 text-left text-ink"
                >
                  <span className="flex flex-col leading-[1.3]">
                    <span className="text-[0.88rem] font-semibold text-brand">Day {item.day}</span>
                    <span className="font-serif text-[1.35rem] font-medium">{item.title}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className={clsx("shrink-0 transition-transform duration-300", isOpen && "rotate-180")}
                  />
                </button>
              </h3>
              <Collapsible id={panelId} open={isOpen}>
                <p className="mt-2.5 mb-3 max-w-[42rem] text-body">{item.description}</p>
                {item.tags && item.tags.length > 0 && (
                  <ul aria-label="Included this day" className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag} className="rounded-pill bg-paper px-3 py-1 text-[0.88rem] text-body">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </Collapsible>
            </li>
          );
        })}
      </ol>
    </DetailSection>
  );
}

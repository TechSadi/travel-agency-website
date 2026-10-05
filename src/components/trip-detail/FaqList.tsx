"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { TripFaq } from "@/data/types";
import { Collapsible } from "./Collapsible";

type FaqListProps = { id: string; faqs: TripFaq[] };

/** "Questions travellers ask" accordion. The first answer starts open. */
export function FaqList({ id, faqs }: FaqListProps) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  function toggle(index: number) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="border-b border-line">
      {faqs.map((faq, index) => {
        const isOpen = open.has(index);
        const panelId = `${id}-answer-${index}`;
        return (
          <div key={faq.q} className="border-t border-line">
            <h3 className="font-sans">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 py-[18px] text-left text-[1.08rem] font-medium text-ink"
              >
                {faq.q}
                <ChevronDown
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className={clsx("shrink-0 transition-transform duration-(--duration-base) ease-out", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            <Collapsible id={panelId} open={isOpen}>
              <p className="-mt-2 max-w-[44rem] pb-[18px] text-body">{faq.a}</p>
            </Collapsible>
          </div>
        );
      })}
    </div>
  );
}

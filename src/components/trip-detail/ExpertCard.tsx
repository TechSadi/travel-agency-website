import { Headphones } from "lucide-react";
import { site } from "@/data/site";

/** "Talk to our Kashmir expert" card under the booking card. */
export function ExpertCard({ place }: { place: string }) {
  return (
    <div className="flex items-center gap-3.5 rounded-card bg-paper p-5">
      <span
        aria-hidden="true"
        className="inline-flex size-[52px] shrink-0 items-center justify-center rounded-pill bg-white text-brand"
      >
        <Headphones size={24} strokeWidth={1.8} />
      </span>
      <p className="flex flex-col leading-[1.35]">
        <span className="font-semibold">Talk to our {place} expert</span>
        <a href={site.phone.href} className="text-ink underline underline-offset-4">
          {site.phone.display}
        </a>
      </p>
    </div>
  );
}

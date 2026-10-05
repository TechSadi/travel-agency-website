import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/data/site";
import { formatRupees } from "@/lib/format";

type TripActionBarProps = { title: string; priceFrom: number };

/**
 * Fixed bottom bar on the trip page under 768px, in place of the site-wide
 * MobileActionBar (see `data-page-action-bar` in globals.css). Same height, so the
 * body padding in the root layout still fits.
 */
export function TripActionBar({ title, priceFrom }: TripActionBarProps) {
  return (
    <div
      data-page-action-bar
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-line bg-white px-4 pt-2.5 pb-[calc(14px+env(safe-area-inset-bottom))] shadow-bar md:hidden"
    >
      <p className="flex flex-col leading-[1.2]">
        <span className="text-[0.85rem] text-muted">From, per person</span>
        <span className="text-[1.35rem] font-semibold">{formatRupees(priceFrom)}</span>
      </p>
      <div className="flex gap-2">
        <a
          href={whatsappLink(`Hello Suman Holidays, I would like to ask about ${title}.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask about ${title} on WhatsApp`}
          className="inline-flex size-12 items-center justify-center rounded-control border border-line text-whatsapp transition-colors hover:border-whatsapp hover:text-whatsapp"
        >
          <WhatsAppIcon size={20} />
        </a>
        <a href="#booking" className={buttonClasses("primary", "md")}>
          Enquire now
        </a>
      </div>
    </div>
  );
}

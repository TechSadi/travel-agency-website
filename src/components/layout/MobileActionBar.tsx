import { Phone } from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { planTripHref } from "@/data/navigation";
import { site } from "@/data/site";

const action =
  "inline-flex min-h-12 items-center justify-center gap-1.5 rounded-control border font-medium no-underline transition-colors";

/**
 * Fixed WhatsApp / Call / Plan my trip bar under 768px. The root layout pads the
 * page by --action-bar-height so it never covers content.
 */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      data-global-action-bar
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_1fr_1.3fr] gap-2 border-t border-line bg-white px-3 pt-2.5 pb-[calc(14px+env(safe-area-inset-bottom))] shadow-bar md:hidden"
    >
      <a
        href={site.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${action} border-line text-whatsapp hover:border-whatsapp hover:text-whatsapp`}
      >
        <WhatsAppIcon size={18} />
        WhatsApp
      </a>
      <a href={site.phone.href} className={`${action} border-line text-ink hover:border-ink hover:text-ink`}>
        <Phone size={18} strokeWidth={1.8} aria-hidden="true" />
        Call
      </a>
      <Link
        href={planTripHref}
        className={`${action} border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark hover:text-white`}
      >
        Plan my trip
      </Link>
    </nav>
  );
}

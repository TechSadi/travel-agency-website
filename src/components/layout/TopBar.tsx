import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

function Item({ icon: Icon, href, children }: { icon: LucideIcon; href?: string; children: ReactNode }) {
  const content = (
    <>
      <Icon size={15} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
      {children}
    </>
  );
  const classes = "inline-flex items-center gap-2";
  return href ? (
    <a href={href} className={`${classes} text-topbar-text no-underline hover:text-white`}>
      {content}
    </a>
  ) : (
    <span className={classes}>{content}</span>
  );
}

/** Contact strip above the header. Desktop only (hidden under 980px). */
export function TopBar() {
  return (
    <div className="hidden bg-ink text-[0.9rem] text-topbar-text lg:block">
      <Container className="flex flex-wrap justify-between gap-x-7 gap-y-2 py-[9px]">
        <div className="flex flex-wrap gap-x-7 gap-y-2">
          <Item icon={Phone} href={site.phone.href}>
            {site.phone.display}
          </Item>
          <Item icon={Mail} href={site.email.href}>
            {site.email.display}
          </Item>
          <Item icon={Clock}>{site.hours.short}</Item>
        </div>
        <Item icon={MapPin}>{site.address.short}</Item>
      </Container>
    </div>
  );
}

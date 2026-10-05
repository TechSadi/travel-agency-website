import clsx from "clsx";
import type { ReactNode } from "react";

type ContactCardProps = {
  icon: ReactNode;
  tone: "brand" | "whatsapp";
  title: string;
  value: string;
  note: string;
  link: { href: string; label: string; external?: boolean };
};

/** One way to reach the office: icon tile, channel, the real number or address, and an action link. */
export function ContactCard({ icon, tone, title, value, note, link }: ContactCardProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-card border border-line bg-white p-6 sm:p-7">
      <span
        className={clsx(
          "inline-flex size-[52px] items-center justify-center rounded-[12px]",
          tone === "brand" ? "bg-brand-tint text-brand" : "bg-whatsapp-tint text-whatsapp",
        )}
      >
        {icon}
      </span>
      <h2 className="mt-1.5 font-sans text-[1.15rem] font-semibold">{title}</h2>
      <span className="text-[1.1rem] font-medium [overflow-wrap:anywhere]">{value}</span>
      <span className="text-[0.95rem] text-muted">{note}</span>
      <a
        href={link.href}
        className="tap-target relative mt-1.5 self-start font-medium text-brand underline underline-offset-4"
        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {link.label}
      </a>
    </div>
  );
}

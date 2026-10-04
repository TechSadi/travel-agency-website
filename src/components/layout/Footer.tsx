import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/ui/SocialIcons";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { footerNav, legalLinks } from "@/data/navigation";
import { site } from "@/data/site";

const socialIcons: Record<(typeof site.social)[number]["label"], ReactNode> = {
  Facebook: <FacebookIcon />,
  Instagram: <InstagramIcon />,
  YouTube: <YouTubeIcon />,
};

const socialLinks = [
  ...site.social.map((s) => ({ ...s, icon: socialIcons[s.label], external: false })),
  { label: "WhatsApp", href: site.whatsapp.href, icon: <WhatsAppIcon size={18} />, external: true },
];

const columnHeading = "m-0 mb-1 font-sans text-[1rem] font-semibold text-white";
const footerLink = "text-footer-text no-underline transition-colors hover:text-white";

function ContactLine({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <li className="flex gap-3 leading-normal">
      <Icon size={18} strokeWidth={1.8} aria-hidden="true" className="mt-[3px] shrink-0 text-white" />
      <span>{children}</span>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-footer-text">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-12 pt-20 pb-10">
        <div className="flex flex-col gap-[18px]">
          <Image src="/images/logo-white.png" alt={site.name} width={150} height={117} className="h-auto w-[150px]" />
          <p className="m-0 max-w-[20rem] leading-[1.6]">{site.description}</p>
          <ul className="flex gap-2.5">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="inline-flex size-11 items-center justify-center rounded-pill border border-footer-social text-white transition-colors hover:border-white hover:text-white"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerNav.map((column) => (
          <nav key={column.title} aria-labelledby={`footer-${column.title}`} className="flex flex-col">
            <h2 id={`footer-${column.title}`} className={columnHeading}>
              {column.title}
            </h2>
            <ul className="mt-3 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="flex flex-col">
          <h2 className={columnHeading}>Visit or call</h2>
          <ul className="mt-3.5 flex flex-col gap-3.5">
            <ContactLine icon={MapPin}>{site.address.full}</ContactLine>
            <ContactLine icon={Phone}>
              <a href={site.phone.href} className={footerLink}>
                {site.phone.display}
              </a>
            </ContactLine>
            <ContactLine icon={Mail}>
              <a href={site.email.href} className={`${footerLink} [overflow-wrap:anywhere]`}>
                {site.email.display}
              </a>
            </ContactLine>
            <ContactLine icon={Clock}>{site.hours.short}. Sunday closed.</ContactLine>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-wrap justify-between gap-3 border-t border-footer-line pt-[22px] pb-[30px] text-[0.92rem] text-footer-muted">
        <p className="m-0">© 2026 {site.name}. All rights reserved.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="text-footer-muted no-underline transition-colors hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { planTripHref } from "@/data/navigation";
import { site } from "@/data/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { TopBar } from "./TopBar";

export function Header() {
  return (
    // The desktop contact strip sits inside the banner landmark, so no page content is outside a landmark.
    // Named for view transitions so it stays still while the page below crossfades (globals.css).
    <header className="border-b border-line bg-white" style={{ viewTransitionName: "site-header" }}>
      <TopBar />
      <Container className="flex items-center justify-between gap-6 py-3.5">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks variant="desktop" />
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex size-12 items-center justify-center rounded-control border border-line text-whatsapp transition-colors hover:border-whatsapp hover:text-whatsapp"
          >
            <WhatsAppIcon size={22} />
          </a>
          <Button href={planTripHref}>Plan my trip</Button>
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}

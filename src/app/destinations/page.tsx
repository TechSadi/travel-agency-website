import type { Metadata } from "next";
import Image from "next/image";
import { DestinationExplorer } from "@/components/destinations/DestinationExplorer";
import { PageMain } from "@/components/layout/PageMain";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getDestinationSummaries, regions } from "@/data/destinations";
import { planTripHref } from "@/data/navigation";
import { whatsappLink } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const description =
  "Holiday destinations from Vadodara: Kashmir, Nepal, the Maldives, Bali, Dubai, Palawan, Santorini, Italy and Kenya. Pick a place to see every package we run there.";

export const metadata: Metadata = pageMetadata({ title: "Destinations", description, path: "/destinations" });

export default function DestinationsPage() {
  const destinations = getDestinationSummaries();

  return (
    <PageMain>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="/images/palawan.jpg"
          alt="Aerial view of a hidden lagoon between limestone cliffs in Palawan"
          fill
          preload
          sizes="100vw"
          // Settles once from 1.1 to 1, like the Home hero.
          className="object-cover motion-safe:animate-[hero-zoom_var(--duration-hero-zoom)_var(--ease-out)_both]"
        />
        <span aria-hidden="true" className="absolute inset-0 overlay-page-hero" />
        <Container className="relative py-[clamp(48px,min(8vw,11vh),112px)]">
          <Breadcrumb tone="light" items={[{ label: "Home", href: "/" }, { label: "Destinations" }]} />
          <h1 className="intro mt-4 mb-3 max-w-[16ch] text-page text-white">
            40 destinations, one travel desk
          </h1>
          <p className="intro intro-2 max-w-[34rem] text-[1.15rem] text-photo-text">
            Pick a place to see every package we run there, or ask us to plan somewhere new.
          </p>
        </Container>
      </section>

      <Container className="pt-8 pb-[clamp(72px,9vw,120px)] md:pt-9">
        <DestinationExplorer destinations={destinations} regions={regions} />
      </Container>

      <section aria-labelledby="custom-trip">
        <Container className="pb-[clamp(72px,9vw,120px)]">
          <CtaPanel
            id="custom-trip"
            title="Don’t see where you want to go?"
            description="We plan custom trips to Japan, Australia, Europe, the USA and anywhere else. Tell us the place and the dates."
            actions={
              <>
                <Button href={planTripHref} size="lg">
                  Plan a custom trip
                </Button>
                <Button
                  href={whatsappLink("Hello Suman Holidays, I would like to plan a custom trip.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost-dark"
                  size="lg"
                  icon={<WhatsAppIcon size={18} />}
                >
                  WhatsApp us
                </Button>
              </>
            }
          />
        </Container>
      </section>
    </PageMain>
  );
}

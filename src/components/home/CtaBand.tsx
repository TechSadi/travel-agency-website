import { Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/data/site";

/** Full-bleed closing call to action on couple-beach.jpg. */
export function CtaBand() {
  return (
    <section aria-labelledby="home-cta" className="relative bg-ink text-white">
      <Image
        src="/images/couple-beach.jpg"
        alt="A couple walking along a white sand beach"
        fill
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <span aria-hidden="true" className="absolute inset-0 overlay-cta" />
      <Container className="relative flex flex-col items-center gap-[18px] py-[clamp(72px,11vw,140px)] text-center">
        <h2
          id="home-cta"
          className="max-w-[18ch] text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.015em] text-white"
        >
          Tell us where you want to go. We’ll plan the rest.
        </h2>
        <p className="max-w-[34rem] text-[1.15rem] text-photo-text">
          Share your dates and budget. You’ll get a day-by-day plan and a full quote within 24 hours.
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3.5">
          <Button
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            icon={<WhatsAppIcon size={18} />}
          >
            WhatsApp us
          </Button>
          <Button
            href={site.phone.href}
            variant="white"
            size="lg"
            icon={<Phone size={18} strokeWidth={1.8} aria-hidden="true" />}
          >
            Call {site.phone.display}
          </Button>
        </div>
      </Container>
    </section>
  );
}

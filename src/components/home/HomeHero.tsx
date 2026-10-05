import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/StarRating";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { heroContent } from "@/data/home";
import { site } from "@/data/site";
import { googleRating } from "@/data/stats";

/** Load-in: the content fades up 120ms apart (the `intro` classes in globals.css). Pure CSS, so it also runs without JS. */
const fadeUp = ["intro", "intro intro-2", "intro intro-3", "intro intro-4"];

/**
 * Full-bleed Home hero (DESIGN.md section 5). The bottom padding leaves room for the
 * SearchPanel, which overlaps the hero by 84px (64px on phones).
 */
export function HomeHero() {
  return (
    <section aria-labelledby="home-hero-title" className="relative overflow-hidden bg-ink text-white">
      <Image
        src="/images/hero.jpg"
        alt="Snow-covered Himalayan peaks under a clear sky"
        fill
        preload
        sizes="100vw"
        // Settles once from 1.1 to 1. Only a transform, so the image still paints (LCP) on the first frame.
        className="object-cover object-[65%_center] motion-safe:animate-[hero-zoom_var(--duration-hero-zoom)_var(--ease-out)_both] md:object-center"
      />
      <span aria-hidden="true" className="absolute inset-0 overlay-hero-mobile md:overlay-hero" />

      <Container className="relative pt-12 pb-[104px] md:pt-[clamp(32px,min(5vw,6vh),88px)] md:pb-[clamp(140px,12vw,172px)]">
        <p className={`${fadeUp[0]} mb-3.5 inline-flex items-center gap-2 text-[0.85rem] md:mb-4 md:rounded-pill md:bg-white/12 md:py-1 md:pr-3 md:pl-2.5`}>
          <StarRating rating={googleRating.rating} stars={5} size={13} showValue={false} />
          <span className="md:hidden">
            {googleRating.rating} from {googleRating.reviewCount} reviews
          </span>
          <span className="hidden md:inline">
            {googleRating.rating} from {googleRating.reviewCount} Google reviews
          </span>
        </p>

        <h1
          id="home-hero-title"
          className={`${fadeUp[1]} max-w-[14ch] text-[2.3rem] leading-[1.02] tracking-[-0.02em] text-white md:text-hero`}
        >
          {heroContent.title}
        </h1>

        <p className={`${fadeUp[2]} mt-3.5 max-w-[36rem] text-[1rem] leading-normal text-photo-text md:mt-5 md:text-lead`}>
          <span className="md:hidden">{heroContent.leadShort}</span>
          <span className="hidden md:inline">{heroContent.lead}</span>
        </p>

        <div className={`${fadeUp[3]} mt-6 flex flex-wrap gap-3 md:mt-7 md:gap-3.5`}>
          <Button href="/trips" size="lg" className="max-md:flex-1">
            Explore trips
          </Button>
          <Button
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost-dark"
            size="lg"
            icon={<WhatsAppIcon size={18} />}
            className="max-md:flex-1"
          >
            WhatsApp us
          </Button>
        </div>
      </Container>
    </section>
  );
}

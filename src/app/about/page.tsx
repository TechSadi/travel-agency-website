import { MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { CountUp } from "@/components/about/CountUp";
import { mobileTitle } from "@/components/home/HomeSection";
import { PageMain } from "@/components/layout/PageMain";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutStory, values } from "@/data/about";
import { site } from "@/data/site";
import { stats } from "@/data/stats";
import { team } from "@/data/team";
import { pageMetadata } from "@/lib/seo";

const description =
  "Suman Holidays is a travel desk in Fatehgunj, Vadodara, planning family holidays, honeymoons and group tours since 2009. Meet the team and visit the office.";

export const metadata: Metadata = pageMetadata({ title: "About us", description, path: "/about" });

const sectionY = "py-[clamp(72px,9vw,120px)]";

export default function AboutPage() {
  return (
    <PageMain>
      <Container className="flex flex-wrap items-center gap-x-14 gap-y-10 pt-8 pb-[clamp(56px,8vw,96px)] md:pt-12">
        <div className="flex-[1_1_440px]">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About us" }]} />
          <h1 className="intro mt-4 mb-5 max-w-[14ch] text-page">
            A Vadodara travel desk since 2009
          </h1>
          {aboutStory.map((paragraph) => (
            <p key={paragraph} className="intro intro-2 mb-4 max-w-[36rem] text-[1.15rem] text-body last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="intro intro-3 relative aspect-[4/3] w-full flex-[1_1_480px] overflow-hidden rounded-panel bg-paper">
          <Image
            src="/images/office-Interior-1.png"
            alt="Inside the Suman Holidays office: consultant desks, a glass-walled meeting room and private cabins"
            fill
            preload
            sizes="(min-width: 1280px) 610px, (min-width: 1075px) 50vw, 100vw"
            className="object-cover motion-safe:animate-[photo-settle_var(--duration-photo)_var(--ease-out)_240ms_backwards]"
          />
        </div>
      </Container>

      <section aria-label="Suman Holidays in numbers">
        <Container className="pb-[clamp(72px,9vw,120px)]">
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-8 max-sm:grid-cols-2 max-sm:gap-x-5">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse border-t-2 border-ink py-7 max-sm:py-5">
                <dt className="mt-2.5 text-muted">{stat.label}</dt>
                <dd className="font-serif text-[clamp(2.1rem,3.2vw,2.8rem)] leading-none font-medium">
                  {stat.countUp === false ? stat.value : <CountUp value={stat.value} />}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="how-we-work" className="bg-paper">
        <Container className={`flex flex-wrap items-start gap-x-14 gap-y-9 ${sectionY}`}>
          <div className="flex-[1_1_320px]">
            <SectionHeading id="how-we-work" title="How we work" className="mb-0" titleClassName={mobileTitle} />
          </div>
          <div data-reveal="group" className="grid flex-[2_1_560px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-10 max-sm:gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col gap-2.5">
                <h3 className="text-[1.4rem] leading-[1.15]">{value.title}</h3>
                <p className="text-muted">{value.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="team">
        <Container className={sectionY}>
          <SectionHeading id="team" title="The people who plan your trip" titleClassName={mobileTitle} />
          <ul data-reveal="group" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-7 max-sm:grid-cols-2 max-sm:gap-x-4 max-sm:gap-y-6">
            {team.map((person) => (
              <li key={person.name} className="flex flex-col gap-3.5">
                <span
                  aria-hidden="true"
                  className="flex aspect-square items-center justify-center rounded-card bg-paper font-serif text-[clamp(2.4rem,5vw,3.4rem)] text-brand-dark"
                >
                  {person.initials}
                </span>
                <span className="flex flex-col leading-[1.3]">
                  <strong className="text-[1.1rem] font-semibold">{person.name}</strong>
                  <span className="text-muted">{person.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="visit-us">
        <Container className="pb-[clamp(72px,9vw,120px)]">
          <div className="flex flex-wrap overflow-hidden rounded-panel bg-ink text-white">
            <div className="relative min-h-[260px] flex-[1_1_420px] sm:min-h-[320px]">
              <Image
                src="/images/office-exterior-1.png"
                alt="The Suman Holidays shopfront at Blue Diamond, Fatehgunj, with the red logo sign above the glass entrance"
                fill
                sizes="(min-width: 1280px) 640px, (min-width: 980px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-[1_1_420px] flex-col justify-center gap-4 p-[clamp(28px,4vw,56px)]">
              <h2 id="visit-us" className="text-[clamp(1.75rem,2.6vw,2.3rem)] leading-[1.08] text-white">
                Come and see us
              </h2>
              <p className="text-topbar-text">
                {site.address.short}. {site.hours.table[0].days}, {site.hours.table[0].time}.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<MapPin size={18} strokeWidth={1.8} aria-hidden="true" />}
                >
                  Get directions
                </Button>
                <Button
                  href={site.phone.href}
                  variant="ghost-dark"
                  icon={<Phone size={18} strokeWidth={1.8} aria-hidden="true" />}
                >
                  Call us
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageMain>
  );
}

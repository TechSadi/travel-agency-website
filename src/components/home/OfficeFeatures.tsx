import { MapPin } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceFeatures } from "@/data/home";
import { site } from "@/data/site";
import { homeIcons } from "./homeIcons";
import { HomeSection, mobileTitle } from "./HomeSection";

/** "One team, from visa to homecoming": office photo with a floating card, beside four features. */
export function OfficeFeatures() {
  return (
    <HomeSection labelledBy="home-team" paper containerClassName="flex flex-wrap items-center gap-x-14 gap-y-16">
      <div className="relative flex-[1_1_420px]">
        <Image
          src="/images/office-desk.jpg"
          alt="A Suman Holidays travel consultant at her desk"
          width={1200}
          height={960}
          sizes="(min-width: 1280px) 600px, (min-width: 980px) 48vw, 100vw"
          className="block aspect-[5/4] w-full rounded-panel object-cover"
        />
        <div className="absolute -bottom-7 left-4 max-w-[290px] rounded-card border border-line bg-white px-[22px] py-5 shadow-float md:left-6">
          <p className="flex items-center gap-2 font-semibold">
            <MapPin size={18} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-brand" />
            Visit our office
          </p>
          <p className="mt-1.5 text-[0.95rem] leading-normal text-muted">
            {site.address.line1}, {site.address.locality}. Walk in, have a chai, plan your trip.
          </p>
        </div>
      </div>

      <div className="flex-[1_1_460px]">
        <SectionHeading
          id="home-team"
          titleClassName={mobileTitle}
          className="mb-0"
          title="One team, from visa to homecoming"
          description="We plan, book and look after every part of your holiday, so you deal with one person instead of five websites."
        />
        <ul className="mt-10 grid gap-x-7 gap-y-8 sm:grid-cols-2">
          {serviceFeatures.map(({ icon, title, text }) => {
            const Icon = homeIcons[icon];
            return (
              <li key={title} className="flex flex-col gap-2.5">
                <span className="inline-flex size-[52px] items-center justify-center rounded-xl bg-brand-tint text-brand">
                  <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-1 font-sans text-[1.15rem] font-semibold">{title}</h3>
                <p className="leading-[1.55] text-muted">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </HomeSection>
  );
}

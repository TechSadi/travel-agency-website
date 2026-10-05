import { ThemeTile } from "@/components/themes/ThemeTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { themes } from "@/data/themes";
import { HomeSection, mobileTitle } from "./HomeSection";

/** "Travel the way you like": four theme tiles. Follows the packages grid without its own top padding. */
export function TravelThemes() {
  return (
    <HomeSection labelledBy="home-themes" containerClassName="pt-0 md:pt-0">
      <SectionHeading
        id="home-themes"
        titleClassName={mobileTitle}
        className="max-md:mb-[18px]"
        title="Travel the way you like"
      />
      <div data-reveal="group" className="grid grid-cols-2 gap-x-4 gap-y-7 md:gap-6 lg:grid-cols-4">
        {themes.map((theme) => (
          <ThemeTile key={theme.type} theme={theme} />
        ))}
      </div>
    </HomeSection>
  );
}

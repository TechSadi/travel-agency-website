import { Container } from "@/components/ui/Container";
import { trustPoints } from "@/data/home";
import { homeIcons } from "./homeIcons";

/** Four reassurance points under the search panel. Left out on phones, as in design-reference/mobile-home.html. */
export function TrustRow() {
  return (
    <Container className="pt-11 max-md:hidden">
      <ul className="grid gap-x-5 gap-y-4 text-body sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map(({ icon, label }) => {
          const Icon = homeIcons[icon];
          return (
            <li key={label} className="flex items-center gap-3">
              <Icon size={22} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-brand" />
              {label}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

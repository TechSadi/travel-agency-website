import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { Theme } from "@/data/types";

type ThemeTileProps = {
  theme: Theme;
  sizes?: string;
  className?: string;
};

/** "Travel the way you like" tile on Home: a 4:5 photo, title and one line. */
export function ThemeTile({ theme, sizes, className }: ThemeTileProps) {
  return (
    <Link
      href={`/trips?type=${theme.type}`}
      className={clsx("group flex flex-col gap-3.5 text-ink no-underline hover:text-ink", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-paper">
        {/* The visible title labels the link, so the photo is decorative. */}
        <Image
          src={theme.image}
          alt=""
          fill
          sizes={sizes ?? "(min-width: 1280px) 305px, (min-width: 980px) 25vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <span className="font-serif text-[1.55rem] leading-[1.1] font-medium">{theme.title}</span>
      <span className="-mt-1.5 text-muted">{theme.description}</span>
    </Link>
  );
}

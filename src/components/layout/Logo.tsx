import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/** Logo mark plus the name and tagline, linking home. Phones get the compact 40px mark without the tagline. */
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} onClick={onClick} className="flex min-h-11 items-center gap-3 no-underline">
      <Image src="/images/logo-mark.png" alt="" width={48} height={48} className="size-10 shrink-0 md:size-12" />
      <span className="flex flex-col leading-[1.1]">
        <span className="text-[1.2rem] font-semibold tracking-[-0.01em] text-brand md:text-[1.4rem]">{site.name}</span>
        <span className="text-[0.85rem] text-muted max-md:hidden">{site.tagline}</span>
      </span>
    </Link>
  );
}

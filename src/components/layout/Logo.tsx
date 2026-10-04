import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/** Logo mark plus the name and tagline, linking home. */
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} onClick={onClick} className="flex items-center gap-3 no-underline">
      <Image src="/images/logo-mark.png" alt="" width={48} height={48} className="size-12 shrink-0" />
      <span className="flex flex-col leading-[1.1]">
        <span className="text-[1.4rem] font-semibold tracking-[-0.01em] text-brand">{site.name}</span>
        <span className="text-[0.85rem] text-muted">{site.tagline}</span>
      </span>
    </Link>
  );
}

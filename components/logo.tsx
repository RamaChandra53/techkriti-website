import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/content";

export function Logo() {
  return <Link href="/" aria-label="Techkriti After dark · 2026 — home" className="group inline-flex min-h-11 items-center gap-2 font-display text-sm font-black uppercase tracking-[-.04em] text-[#fff6e9] sm:gap-2.5 sm:text-lg">
    <span className="relative block h-9 w-9 shrink-0 sm:h-12 sm:w-12"><Image src="/fest-logo-transparent.png" alt="" fill sizes="(max-width: 640px) 36px, 48px" className="object-contain" /></span>
    <span className="flex flex-col leading-tight"><span>{siteConfig.shortName}</span><span className="mt-1 whitespace-nowrap font-sans text-[8px] font-bold tracking-[.12em] text-[#ffae7a] sm:text-[9px] sm:tracking-[.18em]">AFTER DARK · 2026</span></span>
  </Link>;
}

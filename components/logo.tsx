import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/content";

export function Logo() {
  return <Link href="/" aria-label="Techkriti After dark · 2026 — home" className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-[#fff6e9]">
    <span className="relative block h-11 w-11 shrink-0 sm:h-14 sm:w-14"><Image src="/fest-logo-transparent.png" alt="" fill sizes="(max-width: 640px) 44px, 56px" className="object-contain" /></span>
    <span className="flex flex-col leading-tight"><span className="font-display text-sm font-black uppercase tracking-[-.04em] sm:text-base">{siteConfig.shortName}</span><span className="mt-0.5 whitespace-nowrap font-sans text-[7px] font-bold tracking-[.1em] text-[#ffae7a] sm:text-[8px]">AFTER DARK · 2026</span></span>
  </Link>;
}

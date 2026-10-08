import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/content";

export function Logo() {
  return <Link href="/" aria-label="Techriti home" className="group inline-flex items-center gap-2.5 font-display text-base font-black uppercase tracking-[-.04em] text-[#fff6e9] sm:text-lg">
    <span className="relative block h-11 w-11 shrink-0 sm:h-12 sm:w-12"><Image src="/fest-logo-transparent.png" alt="" fill sizes="48px" className="object-contain" /></span>
    <span className="flex flex-col leading-tight"><span>{siteConfig.shortName}</span><span className="mt-1 font-sans text-[9px] font-bold tracking-[.18em] text-[#ffae7a]">AFTER DARK · 2026</span></span>
  </Link>;
}

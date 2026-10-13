import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return <Link href="/" aria-label="Techkriti After Dark 2026 — home" className="group flex w-[78px] shrink-0 flex-col items-center text-[#fff6e9] sm:w-[96px]">
    <span className="relative block h-16 w-16 sm:h-20 sm:w-20"><Image src="/branding/techkriti-mark-2026.png" alt="" fill sizes="(max-width: 640px) 64px, 80px" className="object-contain" /></span>
    <span className="whitespace-nowrap font-sans text-[7px] font-bold tracking-[.06em] text-[#ffae7a] sm:text-[8px]">AFTER DARK · 2026</span>
  </Link>;
}

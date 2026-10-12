import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return <Link href="/" aria-label="Techkriti After dark · 2026 — home" className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-[#fff6e9]">
    <span className="relative block h-11 w-11 shrink-0 sm:h-14 sm:w-14"><Image src="/fest-logo-transparent.png" alt="" fill sizes="(max-width: 640px) 44px, 56px" className="object-contain" /></span>
    <span className="flex w-[clamp(85px,8vw,108px)] shrink-0 flex-col items-center">
      <Image src="/branding/techkriti-splatter-white.png" alt="" width={1642} height={958} sizes="(max-width: 640px) 85px, 108px" className="block h-auto w-full" />
      <span className="-mt-1 whitespace-nowrap font-sans text-[7px] font-bold tracking-[.06em] text-[#ffae7a] sm:text-[8px]">AFTER DARK · 2026</span>
    </span>
  </Link>;
}

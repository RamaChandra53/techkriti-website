import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return <Link href="/#home" aria-label="Techkriti After Dark 2026 — home" className="group flex w-[78px] shrink-0 flex-col items-center text-[#fff6e9] sm:w-[96px]">
    <span className="relative block h-14 w-14 sm:h-16 sm:w-16"><Image src="/branding/techkriti-mark-2026.png" alt="" fill sizes="(max-width: 640px) 56px, 64px" className="object-contain" /></span>
  </Link>;
}

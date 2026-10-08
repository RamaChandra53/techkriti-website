"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Logo } from "./logo";
import { Container } from "./container";

const links = [["Events", "/events"], ["Schedule", "/schedule"], ["About", "/about"], ["Gallery", "/gallery"], ["FAQs", "/faq"]] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="sticky top-0 z-50 border-b border-[#493547] bg-[#0d0a12]/95 text-[#fff4e9] backdrop-blur-lg">
    <Container className="flex min-h-[68px] items-center justify-between gap-3">
      <Logo />
      <div className="ml-auto flex items-center gap-2 lg:hidden"><Link href="/events" className="button-flame inline-flex min-h-11 items-center px-3 text-xs font-black uppercase tracking-[.08em]">Events <ArrowUpRightIcon className="ml-1 h-4 w-4" /></Link><button type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center border border-[#876780] text-[#fff4e9]">
        {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button></div>
      <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
        {links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={`px-3 py-3 text-sm font-semibold text-[#dacbd8] hover:text-[#ffae7a] ${pathname === href ? "text-[#ffae7a] underline decoration-2 underline-offset-8" : ""}`}>{label}</Link>)}
      </nav>
      <div className="hidden items-center gap-3 lg:flex"><Link href="/events" className="button-flame inline-flex min-h-11 items-center px-5 py-3 text-sm font-extrabold">Explore events <ArrowUpRightIcon className="ml-3 h-4 w-4" /></Link></div>
    </Container>
    {open && <nav id="mobile-nav" aria-label="Mobile navigation" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }} className="border-t border-[#493547] bg-[#0d0a12] px-5 pb-6 lg:hidden">
      <Link href="/" onClick={() => setOpen(false)} aria-current={pathname === "/" ? "page" : undefined} className="block border-b border-[#493547] py-4 text-xl font-semibold text-[#fff4e9]">Home</Link>
      {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? "page" : undefined} className="block border-b border-[#493547] py-4 text-xl font-semibold text-[#fff4e9]">{label}</Link>)}
      <Link href="/contact" onClick={() => setOpen(false)} className="block border-b border-[#493547] py-4 text-xl font-semibold text-[#fff4e9]">Contact</Link>
    </nav>}
  </header>;
}

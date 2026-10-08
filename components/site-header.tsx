"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUpRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Logo } from "./logo";
import { Container } from "./container";

const links = [["Schedule", "/schedule"], ["About", "/about"], ["Gallery", "/gallery"], ["FAQs", "/faq"]] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const eventCtaHref = pathname === "/" ? "#discover" : "/#discover";
  return <header onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } }} className="sticky top-0 z-50 border-b border-[#493547] bg-[#0d0a12]/95 text-[#fff4e9] backdrop-blur-lg">
    <Container className="flex min-h-[60px] items-center justify-between gap-2 sm:min-h-[68px] sm:gap-3">
      <Logo />
      <div className="ml-auto flex items-center gap-2 lg:hidden"><Link href={eventCtaHref} onClick={() => setOpen(false)} className="button-flame inline-flex min-h-9 max-w-28 items-center px-2 py-1 text-center text-xs font-black uppercase leading-tight tracking-[.08em] sm:min-h-10 sm:max-w-none sm:px-2.5">Explore Events / Register <ArrowUpRightIcon className="ml-1 hidden h-4 w-4 sm:block" /></Link><button ref={menuButton} type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center border border-[#876780] text-[#fff4e9] sm:h-11 sm:w-11">
        {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button></div>
      <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
        {links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={`px-3 py-3 text-sm font-semibold text-[#dacbd8] hover:text-[#ffae7a] ${pathname === href ? "text-[#ffae7a] underline decoration-2 underline-offset-8" : ""}`}>{label}</Link>)}
      </nav>
      <div className="hidden items-center gap-3 lg:flex"><Link href={eventCtaHref} className="button-flame inline-flex min-h-11 items-center px-5 py-3 text-sm font-extrabold">Explore Events / Register <ArrowUpRightIcon className="ml-3 h-4 w-4" /></Link></div>
    </Container>
    {open && <nav id="mobile-nav" aria-label="Mobile navigation" className="max-h-[calc(100dvh-60px)] overflow-y-auto border-t border-[#493547] bg-[#0d0a12] px-5 pb-6 sm:max-h-[calc(100dvh-68px)] lg:hidden">
      <Link href="/" onClick={() => setOpen(false)} aria-current={pathname === "/" ? "page" : undefined} className="block border-b border-[#493547] py-4 text-xl font-semibold text-[#fff4e9]">Home</Link>
      {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? "page" : undefined} className="block border-b border-[#493547] py-4 text-xl font-semibold text-[#fff4e9]">{label}</Link>)}
      <Link href="/contact" onClick={() => setOpen(false)} className="block border-b border-[#493547] py-4 text-xl font-semibold text-[#fff4e9]">Contact</Link>
    </nav>}
  </header>;
}

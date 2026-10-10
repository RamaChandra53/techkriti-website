"use client";

import Link from "next/link";
import { Bars3Icon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { Container } from "./container";

const menuItems = [
  ["Revelation", "/#revelation"],
  ["Events", "/#discover"],
  ["Previous edition", "/gallery"],
  ["Photos", "/#archive"],
  ["FAQs", "/#faq"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const closeOutside = (event: PointerEvent) => { if (!menuRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);

  return <header className="sticky top-0 z-50 border-b border-[#493547] bg-[#0d0a12]/95 text-[#fff4e9] backdrop-blur-lg">
    <Container className="flex min-h-[60px] items-center justify-between gap-3 sm:min-h-[68px]">
      <Logo />
      <div ref={menuRef} className="flex items-center gap-2 sm:gap-3">
        <Link href="/#discover" className="register-button inline-flex min-h-10 items-center justify-center px-3 py-2 text-xs font-black uppercase tracking-[.1em] sm:min-h-11 sm:px-6 sm:text-sm sm:tracking-[.12em]">Register</Link>
        <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close navigation menu" : "Open navigation menu"} className="grid h-10 w-10 place-items-center rounded-sm border border-[#68475c] bg-[#171019] text-[#fff4e9] transition-colors hover:border-[#ff9258] hover:text-[#ffad72] sm:h-11 sm:w-11">
          {open ? <XMarkIcon className="h-5 w-5" aria-hidden="true" /> : <Bars3Icon className="h-5 w-5" aria-hidden="true" />}
        </button>
        {open && <nav id="site-menu" aria-label="Main navigation" className="site-menu-panel absolute right-3 top-[calc(100%+.5rem)] w-[min(19rem,calc(100vw-1.5rem))] overflow-hidden rounded-md border border-[#68475c] bg-[#100a12]/[.98] shadow-[0_24px_55px_#000b] backdrop-blur-xl sm:right-6">
            <ul>
              {menuItems.map(([label, href]) => <li key={label} className="border-b border-[#493547] last:border-b-0">
                <Link href={href} onClick={() => setOpen(false)} className="group flex min-h-12 items-center justify-between gap-5 px-4 py-3 transition-colors hover:bg-[#291723]">
                  <span className="text-sm font-bold text-[#fff4e9]">{label}</span>
                  <ChevronRightIcon className="h-4 w-4 shrink-0 text-[#ff8b4d] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>)}
            </ul>
        </nav>}
      </div>
    </Container>
  </header>;
}

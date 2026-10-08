import Link from "next/link";
import { siteConfig } from "@/lib/content";
import { Container } from "./container";
import { Logo } from "./logo";

export function SiteFooter() {
  return <footer className="border-t border-[#453444] bg-[#09070d] py-16 text-[#fff4e9] sm:py-20">
    <Container>
      <div className="grid gap-12 md:grid-cols-[1.4fr_.8fr_.8fr]">
        <div><Logo /><p className="mt-6 max-w-sm leading-relaxed text-[#cbbac7]">A student festival at MGIT. Technical and non-technical experiences, reimagined for Halloween.</p><p className="mt-8 font-haunt text-3xl text-[#ffae7a]">Made here. Made together.</p></div>
        <div><h2 className="eyebrow">Explore</h2><div className="mt-5 grid gap-3 text-sm text-[#eee2e8] [&_a:hover]:text-[#ffae7a]"><Link href="/events">Events</Link><Link href="/schedule">Schedule</Link><Link href="/about">Our story</Link><Link href="/gallery">February 2026 gallery</Link><Link href="/sponsors">Sponsors</Link></div></div>
        <div><h2 className="eyebrow">Need to know</h2><div className="mt-5 grid gap-3 text-sm text-[#eee2e8] [&_a:hover]:text-[#ffae7a]"><Link href="/faq">FAQs</Link><Link href="/contact">Contact</Link><span>MGIT, Hyderabad</span><span>16–17 October 2026</span>{siteConfig.social.instagram && <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">Instagram <span className="sr-only">(opens in a new tab)</span>↗</a>}</div></div>
      </div>
      <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-[#453444] pt-6 text-xs font-semibold text-[#bdaab9]"><span>© {siteConfig.year} {siteConfig.name} · MGIT</span><span>Registration opens in official Google Forms, never on this site.</span></div>
    </Container>
  </footer>;
}

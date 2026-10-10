import Link from "next/link";
import { siteConfig } from "@/lib/content";
import { Container } from "./container";
import { Logo } from "./logo";

const footerLinks = [["About", "/about"], ["Schedule", "/schedule"], ["Gallery", "/gallery"], ["FAQs", "/faq"], ["Contact", "/contact"], ["Sponsors", "/sponsors"]] as const;

export function SiteFooter() {
  return <footer className="border-t border-[var(--line)] bg-[#09070d]/85 py-9 text-[var(--text)] sm:py-12">
    <Container>
      <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
        <Logo />
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--muted)]">
          {footerLinks.map(([label, href]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center hover:text-[#ffb386]">{label}</Link>)}
          {siteConfig.social.instagram && <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-[#ffb386]">Instagram ↗<span className="sr-only"> (opens in a new tab)</span></a>}
        </nav>
      </div>
      <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-[var(--line)] pt-5 text-xs text-[var(--muted)]"><span>© {siteConfig.year} {siteConfig.name} · MGIT</span><span>16–17 October 2026 · Hyderabad</span></div>
    </Container>
  </footer>;
}

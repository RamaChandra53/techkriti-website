import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { sponsors } from "@/lib/content";

export const metadata: Metadata = { title: "Partners", description: "Techriti 2026 partners and supporters at MGIT." };

export default function SponsorsPage() {
  return <>
    <PageHero eyebrow="PARTNERS & SUPPORTERS" title={sponsors.length ? "The people backing Techriti." : "Partners announced soon."} copy={sponsors.length ? "Meet the organizations supporting the October 2026 edition." : "We will share the organizations supporting Techriti once the partner list and assets are confirmed."} />
    <Container className="py-16 sm:py-24">
      {sponsors.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{sponsors.map((sponsor) => <article key={sponsor.name} className="festival-panel flex min-h-52 flex-col justify-between p-7"><p className="eyebrow">{sponsor.tier}</p><h2 className="text-2xl font-black tracking-[-.04em]">{sponsor.name}</h2>{sponsor.url && <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-11 items-center gap-2 self-start font-bold text-[#ffb386]">Visit partner <ArrowUpRightIcon className="h-5 w-5" /><span className="sr-only">(opens in a new tab)</span></a>}</article>)}</div> : <section className="relative overflow-hidden border border-[#684b63] bg-[#211827] p-8 sm:p-12"><div className="section-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" /><div className="relative"><p className="eyebrow">A place for confirmed supporters</p><h2 className="display-heading mt-5 max-w-3xl text-[clamp(2.6rem,5vw,5rem)]">Built with the people who back the campus.</h2><p className="muted-copy mt-6 max-w-2xl">This space is reserved for confirmed 2026 partners. No previous-edition sponsors are being presented as current supporters.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/events" className="button-flame inline-flex min-h-12 items-center px-5 py-3 font-black">Explore events</Link><Link href="/about" className="cta-outline inline-flex min-h-12 items-center px-5 py-3 font-bold">Our story</Link></div></div></section>}
    </Container>
  </>;
}

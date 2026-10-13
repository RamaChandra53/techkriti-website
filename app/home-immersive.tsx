import Image from "next/image";
import Link from "next/link";
import { BannerReveal } from "@/components/banner-reveal";
import { Container } from "@/components/container";
import { EventCarousel } from "@/components/event-carousel";
import { ArchiveStory } from "@/components/archive-story";
import { FAQList } from "@/components/faq-list";
import { events, faqs, sponsors } from "@/lib/content";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { StormBackground } from "@/components/storm-background";
import { PastGuests } from "@/components/past-guests";
import { FestivalContacts } from "@/components/festival-contacts";

export default function HomeImmersive() {
  return <>
    <StormBackground />
    <section id="home" aria-labelledby="festival-title" className="relative isolate scroll-mt-[120px] overflow-hidden xl:scroll-mt-[104px]">
      <Container className="relative flex flex-col pb-3 pt-5 sm:pb-5 sm:pt-8">
        <h1 id="festival-title" className="mt-3 w-full sm:mt-4">
          <Image src="/branding/techkriti-splatter-white.png" alt="Techkriti" width={1642} height={958} priority sizes="(max-width: 1400px) 100vw, 1304px" className="h-auto w-full" />
        </h1>
        <p className="mt-3 max-w-3xl self-start text-left text-[clamp(1.25rem,3vw,1.8rem)] font-normal italic leading-snug tracking-[-.025em] text-[#fff4e9] sm:mt-5">Two nights. Eleven events.<br />Enter if you dare.</p>
        <Link href="#discover" className="header-register mt-4 inline-flex min-h-10 items-center self-center justify-center rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[.12em]">Explore events</Link>
      </Container>
    </section>

    <BannerReveal />

    <PastGuests />

    <section id="discover" aria-labelledby="discover-title" className="festival-section scroll-mt-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="eyebrow">The reason you came</p><h2 id="discover-title" className="display-heading mt-3 text-[clamp(2.8rem,6vw,6rem)]">Pick your <span className="text-[var(--ember)]">poison.</span></h2></div>
        </div>
        <EventCarousel events={events} />
      </Container>
    </section>

    <section id="archive" aria-labelledby="archive-title" className="festival-section scroll-mt-24">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
          <div><p className="eyebrow">February 2025 · The previous edition</p><h2 id="archive-title" className="display-heading mt-4 text-[clamp(2.8rem,6vw,6rem)]">Last edition’s<br /><span className="text-[var(--ember)]">ghosts.</span></h2></div>
        </div>
        <ArchiveStory />
      </Container>
    </section>

    <section id="faq" aria-labelledby="faq-title" className="festival-section scroll-mt-24 bg-[#0d0911]/72">
      <Container className="max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <p className="eyebrow">Before you arrive</p>
          <h2 id="faq-title" className="display-heading mt-1 text-[clamp(2.8rem,6vw,5.5rem)]">Frightfully <span className="text-[var(--ember)]">asked.</span></h2>
        </div>
        <FAQList items={faqs} />
        <FestivalContacts className="mt-8" />
      </Container>
    </section>

    <section id="sponsors" aria-labelledby="sponsors-title" className="festival-section scroll-mt-24">
      <Container>
        <p className="eyebrow">Partners & supporters</p>
        <h2 id="sponsors-title" className="display-heading mt-3 text-[clamp(2.8rem,6vw,5.5rem)]">Partners in <span className="text-[var(--ember)]">crime</span></h2>
        {sponsors.length ? <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{sponsors.map((sponsor) => <article key={sponsor.name} className="festival-panel flex min-h-52 flex-col justify-between p-7"><p className="eyebrow">{sponsor.tier}</p><h3 className="text-2xl font-black">{sponsor.name}</h3>{sponsor.url && <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-11 items-center gap-2 self-start font-bold text-[#ffb386]">Visit partner <ArrowUpRightIcon className="h-5 w-5" aria-hidden="true" /></a>}</article>)}</div> : <div className="relative mt-8 overflow-hidden border border-[#684b63] bg-[#211827] p-8 sm:p-12"><div className="section-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" /><div className="relative"><p className="eyebrow">A place for confirmed supporters</p><p className="muted-copy mt-6 max-w-2xl">This space is reserved for confirmed 2026 partners. No previous-edition sponsors are being presented as current supporters.</p></div></div>}
      </Container>
    </section>

  </>;
}

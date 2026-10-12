import Image from "next/image";
import Link from "next/link";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { BannerReveal } from "@/components/banner-reveal";
import { Container } from "@/components/container";
import { EventCarousel } from "@/components/event-carousel";
import { ArchiveStory } from "@/components/archive-story";
import { FAQList } from "@/components/faq-list";
import { events, faqs } from "@/lib/content";
import { StormBackground } from "@/components/storm-background";

export default function HomeImmersive() {
  return <>
    <StormBackground />
    <section id="home" aria-labelledby="festival-title" className="relative isolate scroll-mt-[120px] overflow-hidden xl:scroll-mt-[104px]">
      <Container className="relative flex flex-col pb-3 pt-5 sm:pb-5 sm:pt-8">
        <p className="eyebrow">16–17 October 2026 · MGIT, Hyderabad</p>
        <h1 id="festival-title" className="mt-3 max-w-[480px] sm:mt-4 lg:max-w-[min(480px,54svh)]">
          <Image src="/branding/techkriti-splatter-white.png" alt="Techkriti" width={2048} height={1536} priority className="h-auto w-full" />
          <span className="display-heading mt-[-.15rem] block whitespace-nowrap text-[clamp(2.7rem,7vw,4rem)] text-[var(--ember)]">After dark.</span>
        </h1>
        <p className="mt-3 max-w-3xl self-center text-center text-[clamp(1.25rem,3vw,1.8rem)] font-semibold leading-snug tracking-[-.025em] text-[#fff4e9] sm:mt-5">Two nights. Eleven events. Enter if you dare.</p>
        <Link href="#discover" className="header-register mt-4 inline-flex min-h-10 items-center self-center justify-center rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[.12em]">Explore events</Link>
      </Container>
    </section>

    <BannerReveal />

    <section id="discover" aria-labelledby="discover-title" className="festival-section scroll-mt-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="eyebrow">The reason you came</p><h2 id="discover-title" className="display-heading mt-3 text-[clamp(2.8rem,6vw,6rem)]">Pick your poison.</h2></div>
        </div>
        <EventCarousel events={events} />
      </Container>
    </section>

    <section id="archive" aria-labelledby="archive-title" className="festival-section scroll-mt-24">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
          <div><p className="eyebrow">February 2026 · The previous edition</p><h2 id="archive-title" className="display-heading mt-4 text-[clamp(2.8rem,6vw,6rem)]">Last edition’s<br /><span className="text-[var(--ember)]">ghosts.</span></h2></div>
        </div>
        <ArchiveStory />
      </Container>
    </section>

    <section id="faq" aria-labelledby="faq-title" className="festival-section scroll-mt-24 bg-[#0d0911]/72">
      <Container className="max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <p className="eyebrow">Before you arrive</p>
          <h2 id="faq-title" className="display-heading mt-3 text-[clamp(2.8rem,6vw,5.5rem)]">Frightfully asked.</h2>
        </div>
        <FAQList items={faqs} />
        <div className="mt-8 grid gap-4 border border-[#704832] bg-[#160e17]/90 p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:p-6">
          <UserGroupIcon className="h-8 w-8 text-[#ff8a4c]" aria-hidden="true" />
          <div>
            <h3 className="text-lg font-black tracking-[-.03em] text-[#fff4e9]">Whom to contact</h3>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div><dt className="font-bold text-[#ffb482]">Name</dt><dd className="mt-1 text-[#fff4e9]">Techkriti organizing team</dd></div>
              <div><dt className="font-bold text-[#ffb482]">Phone number</dt><dd className="mt-1 text-[var(--muted)]">Awaiting confirmation</dd></div>
            </dl>
          </div>
        </div>
      </Container>
    </section>

  </>;
}

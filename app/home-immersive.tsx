import Image from "next/image";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { BannerReveal } from "@/components/banner-reveal";
import { Container } from "@/components/container";
import { EventCarousel } from "@/components/event-carousel";
import { ArchiveStory } from "@/components/archive-story";
import { FAQList } from "@/components/faq-list";
import { events, faqs } from "@/lib/content";
import { EntranceBats } from "@/components/entrance-bats";

export default function HomeImmersive() {
  return <>
    <section aria-labelledby="festival-title" className="relative isolate overflow-hidden lg:mx-5 lg:mt-5 lg:rounded-[2rem] lg:border lg:border-[#754936] lg:shadow-[0_28px_80px_#05030899] 2xl:mx-auto 2xl:max-w-[1500px]">
      <div className="festival-hero-veil absolute inset-0" aria-hidden="true" />
      <EntranceBats />
      <Container className="relative flex min-h-[calc(100svh-60px)] flex-col justify-center py-12 sm:min-h-[calc(100svh-68px)] sm:py-10 lg:min-h-[calc(100svh-108px)] lg:py-16">
        <p className="eyebrow">16–17 October 2026 · MGIT, Hyderabad</p>
        <h1 id="festival-title" className="mt-3 max-w-[680px] sm:mt-5">
          <Image src="/branding/techkriti-splatter-white.png" alt="Techkriti" width={2048} height={1536} priority className="h-auto w-full" />
          <span className="display-heading mt-[-.15rem] block text-[clamp(2.7rem,10vw,7rem)] text-[var(--ember)]">After dark.</span>
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[#f1e2e8] sm:mt-5 sm:text-xl">Technical + non-technical.<br />Two days. A whole new atmosphere.</p>
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
          <h2 id="faq-title" className="display-heading mt-3 text-[clamp(2.8rem,6vw,5.5rem)]">Questions, answered.</h2>
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

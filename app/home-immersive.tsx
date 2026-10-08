import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { BannerReveal } from "@/components/banner-reveal";
import { Container } from "@/components/container";
import { EventCarousel } from "@/components/event-carousel";
import { ArchiveStory } from "@/components/archive-story";
import { events } from "@/lib/content";

export default function HomeImmersive() {
  return <>
    <section aria-labelledby="festival-title" className="relative isolate overflow-hidden border-b border-[var(--line)] bg-[#0b0812]">
      <Image src="/hero-halloween.webp" alt="" fill sizes="100vw" loading="eager" fetchPriority="high" className="object-cover object-[70%_center] lg:object-center" />
      <div className="festival-hero-veil absolute inset-0" aria-hidden="true" />
      <Container className="relative flex min-h-[430px] flex-col justify-center py-8 sm:min-h-[560px] sm:py-10 lg:min-h-[640px] lg:py-20">
        <p className="eyebrow">16–17 October 2026 · MGIT, Hyderabad</p>
        <h1 id="festival-title" className="mt-3 max-w-[680px] sm:mt-5">
          <Image src="/branding/techkriti-splatter-white.png" alt="Techkriti" width={2048} height={1536} priority className="h-auto w-full" />
          <span className="display-heading mt-[-.15rem] block text-[clamp(2.7rem,10vw,7rem)] text-[var(--ember)]">After dark.</span>
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[#f1e2e8] sm:mt-5 sm:text-xl">Technical + non-technical.<br />Two days. A whole new atmosphere.</p>
        <div className="mt-5 grid max-w-[440px] grid-cols-1 gap-2 min-[380px]:grid-cols-2 sm:mt-7 sm:gap-3">
          <Link href="#discover" className="button-flame inline-flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-sm font-black">Explore events <ArrowRightIcon className="h-5 w-5 shrink-0" aria-hidden="true" /></Link>
          <Link href="#revelation" className="cta-outline inline-flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-sm font-bold">The revelation <ArrowDownIcon className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
        </div>
      </Container>
    </section>

    <BannerReveal />

    <section id="discover" aria-labelledby="discover-title" className="festival-section scroll-mt-24 border-b border-[var(--line)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="eyebrow">The reason you came</p><h2 id="discover-title" className="display-heading mt-3 text-[clamp(2.8rem,6vw,6rem)]">Find your event.</h2></div>
        </div>
        <EventCarousel events={events} />
      </Container>
    </section>

    <section aria-labelledby="archive-title" className="festival-section">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
          <div><p className="eyebrow">February 2026 · The previous edition</p><h2 id="archive-title" className="display-heading mt-4 text-[clamp(2.8rem,6vw,6rem)]">Last time at<br /><span className="text-[var(--ember)]">Techkriti.</span></h2></div>
          <Link href="/gallery" className="text-link inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#ffb386]">More memories <ArrowUpRightIcon className="h-5 w-5" aria-hidden="true" /></Link>
        </div>
        <ArchiveStory />
      </Container>
    </section>

    <section aria-labelledby="enter-title" className="festival-section-compact border-t border-[#79513f] bg-[var(--ember)] text-[#170d11]">
      <Container className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[.15em]">16–17 October · MGIT</p><h2 id="enter-title" className="display-heading mt-4 text-[clamp(2.8rem,6vw,6rem)]">Ready for<br />after dark?</h2></div>
        <Link href="#discover" className="inline-flex min-h-12 shrink-0 items-center justify-between gap-6 self-start rounded-sm bg-[#170d11] px-6 py-4 font-bold text-[#fff4e9] transition-colors hover:bg-[#332036]">Explore Events / Register <ArrowUpRightIcon className="h-5 w-5" aria-hidden="true" /></Link>
      </Container>
    </section>
  </>;
}

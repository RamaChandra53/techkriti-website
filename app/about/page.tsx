import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { archivePhotos } from "@/lib/archive";

export const metadata: Metadata = { title: "About Techriti", description: "The story behind Techriti, a Halloween-themed student fest at MGIT on 16–17 October 2026." };

export default function AboutPage() {
  return <>
    <PageHero eyebrow="OUR CAMPUS · OUR FESTIVAL" title="Made here. Made together." copy="Techriti is a student fest at Mahatma Gandhi Institute of Technology. This October, its technical and non-technical sides meet a new Halloween identity." />
    <Container className="py-20 sm:py-32">
      <section className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20" aria-labelledby="about-story">
        <div><p className="eyebrow">The idea</p><h2 id="about-story" className="display-heading mt-5 max-w-2xl text-[clamp(2.8rem,5vw,5.5rem)]">It becomes ours when we show up.</h2></div>
        <div className="space-y-6 text-lg leading-relaxed text-[#d4c3d0] lg:pt-8"><p>Techriti is a place to try something unfamiliar, take on a challenge, bring friends along, and feel proud of what this campus can create.</p><p>Technical and non-technical experiences offer different ways in. Halloween gives this edition its atmosphere; the people who participate give it its character.</p><p>Every confirmed event will have its own page with eligibility, rules, timing, venue, and a direct official Google Form link when registration opens.</p></div>
      </section>
      <section className="mt-24 grid gap-10 border-t border-[#564254] pt-16 lg:grid-cols-[1.15fr_.85fr] lg:items-center" aria-labelledby="archive-story">
        <figure><div className="archive-image relative aspect-[1.4] overflow-hidden bg-[#2b202e]"><Image src={archivePhotos[0].src} alt={archivePhotos[0].alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div><figcaption className="mt-3 text-sm text-[#c7b2c2]">Previous edition, February 2026 · not the upcoming Halloween edition</figcaption></figure>
        <div><p className="eyebrow">The story so far</p><h2 id="archive-story" className="display-heading mt-4 text-[clamp(2.6rem,4.4vw,4.8rem)]">The campus already knows how to show up.</h2><p className="muted-copy mt-6 text-lg">The February archive shows the students and teams behind the previous edition. October 2026 is a new chapter, with its own events still being finalized.</p><Link href="/gallery" className="text-link mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-[#ffb386]">See the February gallery <ArrowRightIcon className="h-5 w-5" /></Link></div>
      </section>
      <section className="mt-24 flex flex-col justify-between gap-8 border-t border-[#564254] pt-16 md:flex-row md:items-end" aria-labelledby="join-story"><div><p className="eyebrow">The next chapter</p><h2 id="join-story" className="display-heading mt-4 max-w-3xl text-[clamp(2.8rem,5vw,5.2rem)]">Find your part in it.</h2><p className="muted-copy mt-6 max-w-2xl">Explore the two tracks now. Confirmed event details and registration links will appear as soon as organizers publish them.</p></div><Link href="/events" className="button-flame inline-flex min-h-12 shrink-0 items-center gap-3 self-start px-6 py-4 font-black">Explore events <ArrowRightIcon className="h-5 w-5" /></Link></section>
    </Container>
  </>;
}

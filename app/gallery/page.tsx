import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/container";
import { archivePhotos } from "@/lib/archive";

export const metadata: Metadata = {
  title: "February 2026 photo gallery",
  description: "A look back at the previous Techriti edition at MGIT. These photos are from February 2026, before the upcoming Halloween edition."
};

export default function GalleryPage() {
  return <>
    <section className="relative isolate overflow-hidden border-b border-[#564254] bg-[#120d17] py-20 sm:py-28">
      <Image src={archivePhotos[0].src} alt="" fill sizes="100vw" className="object-cover object-center opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#120d17] via-[#120d17]/85 to-[#120d17]/60" aria-hidden="true" />
      <Container className="relative"><p className="eyebrow">FEBRUARY 2026 · PHOTO ARCHIVE</p><h1 className="display-heading mt-5 max-w-6xl text-[clamp(3.2rem,7vw,7rem)]">This is what<br /><span className="text-[#ff8b4f]">we made.</span></h1><p className="muted-copy mt-7 max-w-2xl text-lg sm:text-xl">A look back at the people and moments of the previous edition. These photos are not from the upcoming October Halloween fest.</p></Container>
    </section>
    <Container className="py-16 sm:py-24">
      <div className="grid grid-flow-dense gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
        {archivePhotos.map((photo, index) => {
          const wide = index === 0 || index === 8 || index === 15;
          return <figure key={photo.src} className={wide ? "md:col-span-2" : ""}>
            <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Open larger view: ${photo.alt}`} className="group block"><div className={`archive-image relative overflow-hidden bg-[#302431] ${wide ? "aspect-[4/3] sm:aspect-[1.8]" : index % 4 === 2 ? "aspect-[4/5]" : "aspect-[4/3]"}`}><Image src={photo.src} alt={photo.alt} fill sizes={wide ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"} className="object-cover" /></div></a>
            <figcaption className="mt-3 flex max-w-xl items-start gap-2 border-l-2 border-[#ff7938] pl-3 text-sm leading-relaxed text-[#d0bdcb]">{photo.caption}<ArrowUpRightIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#ffae7a]" aria-hidden="true" /></figcaption>
          </figure>;
        })}
      </div>
      <div className="mt-20 flex flex-col justify-between gap-6 border-t border-[#564254] pt-10 sm:flex-row sm:items-center"><p className="max-w-2xl leading-relaxed text-[#d0bdcb]">The next chapter happens on 16–17 October 2026. Event details and registration links will appear as they are confirmed.</p><Link href="/events" className="text-link inline-flex min-h-11 items-center gap-2 font-bold text-[#ffb386]">Explore this year’s events <ArrowRightIcon className="h-5 w-5" /></Link></div>
    </Container>
  </>;
}

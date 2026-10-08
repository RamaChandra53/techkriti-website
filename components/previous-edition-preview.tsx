import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { archivePhotos } from "@/lib/archive";
import { Container } from "./container";

export function PreviousEditionPreview() {
  return <section aria-labelledby="previous-edition-title" className="border-y border-[#765266] bg-[#100a14] py-20 sm:py-24">
    <Container>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><p className="eyebrow">FROM THE FEBRUARY 2026 EDITION</p><h2 id="previous-edition-title" className="mt-4 max-w-3xl font-haunt text-5xl leading-[1.05] text-[#fff0dc] sm:text-6xl">Look what we made <em className="text-[#ff914d]">together.</em></h2></div>
        <p className="max-w-md leading-relaxed text-[#c5b2be]">These are moments from the previous Techkriti. October’s Halloween edition is a new chapter, and the people who join it will shape what it becomes.</p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-[1.3fr_1fr_1fr]">
        {archivePhotos.slice(0, 3).map((photo, index) => <figure key={photo.src} className={index === 0 ? "col-span-2 lg:col-span-1" : ""}><div className={`relative overflow-hidden border border-[#79506c] bg-[#211526] ${index === 0 ? "h-64 sm:h-72 lg:h-80" : "h-40 sm:h-72 lg:h-80"}`}><Image src={photo.src} alt={photo.alt} fill sizes={index === 0 ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 640px) 50vw, 30vw"} className="object-cover" /></div><figcaption className="mt-3 text-sm text-[#d5bfca]">{photo.caption}</figcaption></figure>)}
      </div>
      <Link href="/gallery" className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-[#ff914d] pb-2 text-sm font-bold uppercase tracking-[.12em] text-[#ffb681] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ff914d]">See the February photo gallery <ArrowRightIcon className="h-5 w-5" /></Link>
    </Container>
  </section>;
}

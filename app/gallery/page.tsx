import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/container";
import { ArchiveFigure } from "@/components/archive-story";
import { archivePhotos } from "@/lib/archive";

export const metadata: Metadata = {
  title: "Last time at Techkriti · February 2026",
  description: "The people, the campus, and the moments from Techkriti at MGIT in February 2026. A photo story from the previous edition.",
  alternates: { canonical: "/gallery" },
};

const chapters = [
  { title: "The people.", label: "01 / Together", photos: [0, 3, 1, 2, 4, 5, 6] },
  { title: "The campus.", label: "02 / Made here", photos: [8, 7, 9, 11, 10, 12, 13] },
  { title: "The little things.", label: "03 / Made by us", photos: [15, 16, 14, 17, 18] },
];

export default function GalleryPage() {
  return <>
    <Container className="pb-10 pt-12 sm:pb-16 sm:pt-20">
      <p className="eyebrow">February 2026 · The previous edition</p>
      <h1 className="display-heading mt-5 text-[clamp(3rem,7vw,7rem)]">Last time at<br /><span className="text-[var(--ember)]">Techkriti.</span></h1>
      <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--muted)]">Before this October&apos;s Halloween chapter, there was this.</p>
    </Container>
    {chapters.map((chapter) => <section key={chapter.label} aria-label={chapter.title} className="pb-16 sm:pb-24">
      <Container>
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3 border-t border-[var(--line)] pt-6">
          <h2 className="text-2xl font-extrabold tracking-[-.04em] sm:text-3xl">{chapter.title}</h2>
          <p className="eyebrow">{chapter.label}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12">
          {chapter.photos.map((photoIndex, index) => {
            const wide = index % 3 === 0 || (index === chapter.photos.length - 1 && index % 3 === 1);
            return <ArchiveFigure key={archivePhotos[photoIndex].src} photo={archivePhotos[photoIndex]} wide={wide} className={wide ? "col-span-2" : index % 3 === 2 ? "pt-8 sm:pt-16" : ""} />;
          })}
        </div>
      </Container>
    </section>)}
    <Container className="pb-14 sm:pb-20"><div className="flex flex-wrap items-center justify-between gap-5 border-t border-[var(--line)] pt-8"><p className="font-semibold text-[var(--muted)]">Next chapter: 16–17 October 2026.</p><Link href="/events" className="button-flame inline-flex min-h-12 items-center gap-4 rounded-sm px-5 py-3 font-bold">Explore events <ArrowRightIcon className="h-5 w-5" aria-hidden="true" /></Link></div></Container>
  </>;
}

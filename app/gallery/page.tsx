import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/container";
import { ArchiveStory } from "@/components/archive-story";

export const metadata: Metadata = {
  title: "Last time at Techkriti · February 2026",
  description: "The people, the campus, and the moments from Techkriti at MGIT in February 2026. A photo story from the previous edition.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return <>
    <Container className="pb-10 pt-12 sm:pb-16 sm:pt-20">
      <p className="eyebrow">February 2026 · The previous edition</p>
      <h1 className="display-heading mt-5 text-[clamp(3rem,7vw,7rem)]">Last time at<br /><span className="text-[var(--ember)]">Techkriti.</span></h1>
      <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--muted)]">Before this October&apos;s Halloween chapter, there was this.</p>
    </Container>
    <section aria-label="February 2026 photo stack" className="pb-16 sm:pb-24"><Container><ArchiveStory /></Container></section>
    <Container className="pb-14 sm:pb-20"><div className="flex flex-wrap items-center justify-between gap-5 border-t border-[var(--line)] pt-8"><p className="font-semibold text-[var(--muted)]">Next chapter: 16–17 October 2026.</p><Link href="/#discover" className="button-flame inline-flex min-h-12 items-center gap-4 rounded-sm px-5 py-3 font-bold">See events <ArrowRightIcon className="h-5 w-5" aria-hidden="true" /></Link></div></Container>
  </>;
}

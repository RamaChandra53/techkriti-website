import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/lib/types";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export function EventCard({ event, discovery = false }: { event: Event; discovery?: boolean }) {
  return <article className="festival-card flex h-full min-w-0 flex-col overflow-hidden">
    {event.image && <div className="relative aspect-[16/10] overflow-hidden bg-[#241925]">
      <Image src={event.image.src} alt={event.image.alt} fill sizes={discovery ? "(max-width: 768px) 80vw, 640px" : "(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 420px"} className="object-cover" />
    </div>}
    <div data-track={event.division} className={`event-poster-art relative flex flex-col justify-between p-5 sm:p-7 ${event.image ? "min-h-36" : "min-h-56 sm:min-h-64"}`}>
      {!event.image && <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true"><span className="absolute -right-16 -top-24 h-80 w-80 rotate-[-25deg] rounded-[40%] border border-[#a889c6]/20" /><span className="absolute -right-8 -top-16 h-80 w-80 rotate-[-25deg] rounded-[40%] border border-[#ff7938]/15" /></div>}
      <p className="relative text-[.65rem] font-bold uppercase tracking-[.13em] text-[#e9c4b5]">{event.division} / {event.category}</p>
      <h3 className="relative mt-8 break-words text-[clamp(2rem,4vw,3.4rem)] font-black leading-[1] tracking-[-.055em] text-[var(--text)]">{event.title}</h3>
    </div>
    <div className="flex flex-1 flex-col p-5 sm:p-7">
      <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{event.summary}</p>
      <dl className="mt-5 grid gap-2 border-t border-[var(--line)] pt-4 text-sm">
        <div className="flex gap-3"><dt className="w-12 shrink-0 text-[var(--muted)]">When</dt><dd>{event.day ? (event.day === 1 ? "16" : "17") : "16–17"} Oct · {event.time ?? "Schedule TBA"}</dd></div>
        <div className="flex gap-3"><dt className="w-12 shrink-0 text-[var(--muted)]">Where</dt><dd className="min-w-0 break-words">{event.venue}</dd></div>
        <div className="flex gap-3"><dt className="w-12 shrink-0 text-[var(--muted)]">Team</dt><dd>{event.teamSize}</dd></div>
      </dl>
      <div className="mt-auto pt-6">
        <Link href={`/events/${event.slug}`} aria-label={`View event details: ${event.title}`} className="flex min-h-12 items-center justify-between gap-3 border-t border-[#725467] pt-4 font-bold text-[#ffb386] hover:text-white">View event <ArrowUpRightIcon className="h-5 w-5 shrink-0" aria-hidden="true" /></Link>
        {!discovery && event.registrationUrl && <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="button-flame mt-4 flex min-h-12 items-center justify-between gap-2 rounded-sm px-4 py-3 text-sm font-bold">Register now <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> for {event.title} (Google Form opens in a new tab)</span></a>}
      </div>
    </div>
  </article>;
}

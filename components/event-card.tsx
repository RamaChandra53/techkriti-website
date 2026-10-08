import Link from "next/link";
import type { Event } from "@/lib/types";
import { ArrowUpRightIcon, CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";

const colors = { electric: "bg-[#a889c6]", coral: "bg-[#ff7938]", sky: "bg-[#8d80c8]", acid: "bg-[#c7b67d]" };

export function EventCard({ event }: { event: Event }) {
  return <article className="flex h-full flex-col border border-[#5b4559] bg-[#1b1420]">
    <div className={`h-1.5 ${colors[event.accent]}`} aria-hidden="true" />
    <div className="flex flex-1 flex-col p-6">
      <div className="flex flex-wrap gap-2"><span className="border border-[#986744] px-3 py-1 text-xs font-bold text-[#ffae7a]">{event.division}</span><span className="border border-[#6c5369] px-3 py-1 text-xs font-bold text-[#d9c8d6]">{event.category}</span></div>
      <p className="mt-7 text-xs font-bold text-[#ffae7a]">{event.eyebrow}</p>
      <h3 className="mt-2 text-3xl font-black leading-[1.05] tracking-[-.045em] text-[#fff4e9]">{event.title}</h3>
      <p className="mt-4 flex-1 leading-relaxed text-[#d4c3d0]">{event.summary}</p>
      <dl className="mt-6 grid gap-2 border-t border-[#564254] pt-4 text-sm text-[#e0d1dc]"><div className="flex items-start gap-2"><CalendarDaysIcon className="h-5 w-5 shrink-0 text-[#ffae7a]" /><dt className="sr-only">When</dt><dd>{event.day === 1 ? "16" : "17"} October · {event.time}</dd></div><div className="flex items-start gap-2"><MapPinIcon className="h-5 w-5 shrink-0 text-[#ffae7a]" /><dt className="sr-only">Where</dt><dd>{event.venue}</dd></div></dl>
      <div className="mt-6 flex flex-wrap items-center gap-3"><Link href={`/events/${event.slug}`} className="inline-flex min-h-11 items-center gap-2 border border-[#8b6b86] px-4 py-2 text-sm font-bold text-[#fff4e9] hover:bg-[#332739]">Event details <ArrowUpRightIcon className="h-4 w-4" /></Link>{event.registrationUrl ? <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="button-flame inline-flex min-h-11 items-center gap-2 px-4 py-2 text-sm font-black">Register now <ArrowUpRightIcon className="h-4 w-4" /><span className="sr-only"> (Google Form opens in a new tab)</span></a> : <span className="text-xs font-semibold text-[#c4b1c0]">Registration link coming soon</span>}</div>
    </div>
  </article>;
}

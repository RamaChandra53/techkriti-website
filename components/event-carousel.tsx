"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { divisions } from "@/lib/content";
import type { Event, EventDivision } from "@/lib/types";

const posterColors = {
  electric: "bg-[#33223d] text-[#ffb27f]",
  coral: "bg-[#422523] text-[#ffc09a]",
  sky: "bg-[#2a2842] text-[#dec8f0]",
  acid: "bg-[#343024] text-[#e8daa8]",
} as const;

function EventPoster({ event }: { event: Event }) {
  return <article className="flex h-full flex-col overflow-hidden border border-[#684b63] bg-[#1b1420]">
    <div className={`relative flex min-h-52 flex-col justify-between overflow-hidden p-6 ${posterColors[event.accent]}`}>
      <div className="section-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-current opacity-20" aria-hidden="true" />
      <p className="relative text-xs font-bold uppercase tracking-[.16em]">{event.category} · {event.division}</p>
      <h3 className="relative mt-8 max-w-[18rem] text-balance text-4xl font-black leading-[.98] tracking-[-.065em] text-[#fff4e9]">{event.title}</h3>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <p className="line-clamp-3 min-h-[4.5rem] leading-relaxed text-[#ded0dc]">{event.summary}</p>
      <dl className="mt-5 grid gap-2 border-t border-[#564254] pt-4 text-sm text-[#d7c6d2]">
        <div className="flex gap-2"><dt className="w-14 shrink-0 font-bold">When</dt><dd>{event.day === 1 ? "16" : "17"} October · {event.time}</dd></div>
        <div className="flex gap-2"><dt className="w-14 shrink-0 font-bold">Where</dt><dd>{event.venue}</dd></div>
        <div className="flex gap-2"><dt className="w-14 shrink-0 font-bold">Team</dt><dd>{event.teamSize}</dd></div>
      </dl>
      <Link href={`/events/${event.slug}`} className="mt-6 inline-flex min-h-11 items-center justify-between gap-3 border-t border-[#564254] pt-4 font-extrabold text-[#ffb386] hover:text-[#fff4e9]">View event details <ArrowUpRightIcon className="h-5 w-5" /></Link>
    </div>
  </article>;
}

export function EventCarousel({ events }: { events: Event[] }) {
  const [selectedTrack, setSelectedTrack] = useState<EventDivision>(events[0]?.division ?? "Technical");
  const activeTrack = selectedTrack;
  const visibleEvents = events.filter((event) => event.division === activeTrack);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const selectTrack = (track: EventDivision) => {
    setSelectedTrack(track);
    setActiveIndex(0);
    listRef.current?.scrollTo({ left: 0, behavior: "auto" });
  };

  const goTo = (index: number) => {
    const list = listRef.current;
    if (!list || index < 0 || index >= visibleEvents.length) return;
    const first = list.children[0] as HTMLElement | undefined;
    const target = list.children[index] as HTMLElement | undefined;
    if (!first || !target) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
    setActiveIndex(index);
  };

  const syncIndex = () => {
    const list = listRef.current;
    if (!list || !visibleEvents.length) return;
    const first = list.children[0] as HTMLElement | undefined;
    if (!first) return;
    const step = first.offsetWidth + 16;
    setActiveIndex(Math.min(visibleEvents.length - 1, Math.max(0, Math.round(list.scrollLeft / step))));
  };

  return <div className="mt-6 sm:mt-9">
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div role="group" aria-label="Choose an event track" className="inline-flex gap-2">
        {divisions.map((track) => <button key={track} type="button" aria-pressed={activeTrack === track} onClick={() => selectTrack(track)} className={`min-h-11 border px-4 py-2 text-sm font-bold sm:px-6 ${activeTrack === track ? "border-[#ff7938] bg-[#ff7938] text-[#170d11]" : "border-[#765b73] bg-[#1d1722] text-[#fff4e9] hover:border-[#ff7938]"}`}>{track === "Non-Technical" ? "Non-technical" : track}</button>)}
      </div>
      <p className="text-xs font-semibold text-[#c9b4c5]">Swipe cards or use the arrows</p>
    </div>
    {visibleEvents.length ? <div ref={listRef} role="region" aria-roledescription="carousel" aria-label={`${activeTrack} events`} tabIndex={0} onScroll={syncIndex} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); goTo(activeIndex + 1); } if (event.key === "ArrowLeft") { event.preventDefault(); goTo(activeIndex - 1); } }} className="relative mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 scroll-smooth focus-visible:outline-offset-[-3px] motion-reduce:scroll-auto">
      {visibleEvents.map((event) => <div key={event.slug} className="w-[min(84vw,350px)] shrink-0 snap-start self-stretch sm:w-[350px]"><EventPoster event={event} /></div>)}
    </div> : <p className="mt-5 border-l-4 border-[#ff7938] bg-[#211827] p-5 font-semibold text-[#dfd0dc]">No {activeTrack.toLowerCase()} events have been confirmed yet. Check the full events page for updates.</p>}
    {visibleEvents.length > 0 && <div className="mt-2 flex items-center justify-between border-t border-[#564254] pt-4">
      <p aria-live="polite" className="text-sm font-bold text-[#ddc8d5]">{String(activeIndex + 1).padStart(2, "0")} / {String(visibleEvents.length).padStart(2, "0")}</p>
      <div className="flex gap-2"><button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous event" className="grid h-11 w-11 place-items-center border border-[#765b73] text-[#fff4e9] hover:bg-[#342739] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeftIcon className="h-5 w-5" /></button><button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex >= visibleEvents.length - 1} aria-label="Next event" className="grid h-11 w-11 place-items-center border border-[#765b73] text-[#fff4e9] hover:bg-[#342739] disabled:cursor-not-allowed disabled:opacity-40"><ChevronRightIcon className="h-5 w-5" /></button></div>
    </div>}
  </div>;
}

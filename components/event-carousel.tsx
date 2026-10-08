"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { divisions } from "@/lib/content";
import type { Event, EventDivision } from "@/lib/types";
import { EventCard } from "./event-card";

function slides(list: HTMLDivElement) {
  return Array.from(list.querySelectorAll<HTMLElement>("[data-event-slide]"));
}

function nearestIndex(list: HTMLDivElement) {
  const items = slides(list);
  const origin = items[0]?.offsetLeft ?? 0;
  let nearest = 0;
  items.forEach((item, index) => {
    if (Math.abs(item.offsetLeft - origin - list.scrollLeft) < Math.abs(items[nearest].offsetLeft - origin - list.scrollLeft)) nearest = index;
  });
  return nearest;
}

export function EventCarousel({ events }: { events: Event[] }) {
  const [selectedTrack, setSelectedTrack] = useState<EventDivision>(events[0]?.division ?? "Technical");
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleEvents = events.filter((event) => event.division === selectedTrack);
  const listRef = useRef<HTMLDivElement>(null);
  const regionId = useId();
  const currentIndex = Math.min(activeIndex, Math.max(0, visibleEvents.length - 1));

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => setActiveIndex(nearestIndex(list)));
    observer.observe(list);
    return () => observer.disconnect();
  }, [selectedTrack, visibleEvents.length]);

  const goTo = (index: number) => {
    const list = listRef.current;
    if (!list || index < 0 || index >= visibleEvents.length) return;
    const items = slides(list);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: items[index].offsetLeft - items[0].offsetLeft, behavior: reducedMotion ? "instant" : "smooth" });
  };

  return <div className="mt-7 sm:mt-10">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div role="group" aria-label="Choose an event track" className="inline-grid max-w-full grid-cols-2 gap-1 rounded-md border border-[#725467] bg-[#17111c] p-1">
        {divisions.map((track) => <button key={track} type="button" aria-pressed={selectedTrack === track} aria-controls={regionId} onClick={() => { setSelectedTrack(track); setActiveIndex(0); }} className={`min-h-11 rounded-sm px-3 py-2 text-sm font-bold transition-colors sm:px-6 ${selectedTrack === track ? "bg-[var(--ember)] text-[#170d11]" : "text-[#dccbd8] hover:bg-[#332538]"}`}>{track === "Non-Technical" ? "Non-technical" : track}</button>)}
      </div>
      {visibleEvents.length > 1 && <p className="text-xs text-[var(--muted)]">Swipe to explore · or use the arrows</p>}
    </div>

    {visibleEvents.length > 0 ? <>
      <div key={selectedTrack} id={regionId} ref={listRef} role="region" aria-roledescription="carousel" aria-label={`${selectedTrack} events`} tabIndex={0} onScroll={() => { if (listRef.current) setActiveIndex(nearestIndex(listRef.current)); }} onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        const targets: Record<string, number> = { ArrowRight: currentIndex + 1, ArrowLeft: currentIndex - 1, Home: 0, End: visibleEvents.length - 1 };
        if (event.key in targets) { event.preventDefault(); goTo(targets[event.key]); }
      }} className="event-rail relative mt-6 max-w-[960px] pb-4">
        {visibleEvents.map((event, index) => <div key={event.slug} data-event-slide role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${visibleEvents.length}: ${event.title}`} className="event-slide"><EventCard event={event} discovery /></div>)}
        <div className="event-rail-tail" aria-hidden="true" />
      </div>
      <div className="mt-2 flex max-w-[960px] items-center justify-between border-t border-[var(--line)] pt-4">
        <p aria-live="polite" aria-atomic="true" className="text-sm font-bold tabular-nums text-[#ddc8d5]">{String(currentIndex + 1).padStart(2, "0")} <span className="mx-1 text-[#a18b9a]">/</span> {String(visibleEvents.length).padStart(2, "0")}<span className="sr-only"> · {visibleEvents[currentIndex]?.title}</span></p>
        <div className="flex gap-2">
          <button type="button" onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0} aria-label="Previous event" aria-controls={regionId} className="grid h-12 w-12 place-items-center rounded-sm border border-[#765b73] hover:bg-[#342739] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /></button>
          <button type="button" onClick={() => goTo(currentIndex + 1)} disabled={currentIndex >= visibleEvents.length - 1} aria-label="Next event" aria-controls={regionId} className="grid h-12 w-12 place-items-center rounded-sm border border-[#765b73] hover:bg-[#342739] disabled:cursor-not-allowed disabled:opacity-40"><ChevronRightIcon className="h-5 w-5" aria-hidden="true" /></button>
        </div>
      </div>
    </> : <div id={regionId} role="status" className="relative mt-6 overflow-hidden rounded-md border border-[#63485d] bg-[var(--surface)] px-6 py-9 sm:px-9 sm:py-12">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 border-l border-[#a889c6]/10 bg-[#a889c6]/[.03]" aria-hidden="true" />
      <div className="relative">
        <p className="eyebrow">{selectedTrack} · October 2026</p>
        <h3 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-[-.045em] sm:text-4xl">The lineup is taking shape.</h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)] sm:text-base">Events and registration links will appear here once confirmed.</p>
        <Link href={`/events?division=${encodeURIComponent(selectedTrack)}`} className="text-link mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#ffb386]">Explore this track <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </div>}
  </div>;
}

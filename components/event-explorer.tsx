"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { Event } from "@/lib/types";
import { divisions, eventCategories } from "@/lib/content";
import { filterEvents } from "@/lib/events";
import { EventCard } from "./event-card";

export function EventExplorer({ events }: { events: Event[] }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const q = params.get("q") ?? "";
  const division = params.get("division") ?? "";
  const category = params.get("category") ?? "";
  const day = params.get("day") ?? "";
  const filtered = useMemo(() => filterEvents(events, { q, division, category, day }), [events, q, division, category, day]);
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    window.history.replaceState(null, "", `${pathname}${next.size ? `?${next}` : ""}`);
  };
  const clear = () => window.history.replaceState(null, "", pathname);

  return <>
    <div className="grid gap-4 border border-[#564254] bg-[#1b1420] p-5 sm:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr_auto] xl:items-end lg:p-7">
      <label className="grid gap-2 text-sm font-bold text-[#fff4e9]">Search events<input type="search" value={q} onChange={(e) => update("q", e.target.value)} placeholder="Search the lineup…" className="min-h-12 border border-[#765b73] bg-[#0e0b14] px-4 text-base font-normal text-[#fff4e9] placeholder:text-[#baa8b9]" /></label>
      <label className="grid gap-2 text-sm font-bold text-[#fff4e9]">Track<select value={division} onChange={(e) => update("division", e.target.value)} className="min-h-12 border border-[#765b73] bg-[#0e0b14] px-4 text-base font-normal text-[#fff4e9]"><option value="">Both tracks</option>{divisions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      <label className="grid gap-2 text-sm font-bold text-[#fff4e9]">Category<select value={category} onChange={(e) => update("category", e.target.value)} className="min-h-12 border border-[#765b73] bg-[#0e0b14] px-4 text-base font-normal text-[#fff4e9]"><option value="">All categories</option>{eventCategories.map((item) => <option key={item} value={item.toLowerCase()}>{item}</option>)}</select></label>
      <label className="grid gap-2 text-sm font-bold text-[#fff4e9]">Day<select value={day} onChange={(e) => update("day", e.target.value)} className="min-h-12 border border-[#765b73] bg-[#0e0b14] px-4 text-base font-normal text-[#fff4e9]"><option value="">Both days</option><option value="1">16 October</option><option value="2">17 October</option></select></label>
      <button type="button" onClick={clear} className="min-h-12 self-end border border-[#8c728a] px-5 py-3 font-bold text-[#fff4e9] hover:bg-[#342739]">Reset</button>
    </div>
    <div aria-live="polite" className="my-8 flex items-center justify-between gap-4"><p className="text-sm font-bold text-[#ffae7a]">{events.length ? `${filtered.length} ${filtered.length === 1 ? "event" : "events"} found` : "2026 lineup update"}</p></div>
    {filtered.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filtered.map((event) => <EventCard key={event.slug} event={event} />)}</div> : <div className="relative overflow-hidden border border-[#684b63] bg-[#201725] p-8 sm:p-12"><div className="section-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" /><div className="relative"><p className="eyebrow">{events.length ? "Try another route" : "The story is still opening"}</p><h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-.05em] text-[#fff4e9] sm:text-5xl">{events.length ? "No events match those filters." : "The lineup is being confirmed."}</h2><p className="mt-5 max-w-2xl leading-relaxed text-[#d4c3d0]">{events.length ? "Try another search or clear the filters to see the confirmed lineup." : "Technical and non-technical event names, rules, rooms, and direct Google Form registration links will appear here as organizers confirm them."}</p>{events.length > 0 && <button type="button" onClick={clear} className="button-flame mt-7 px-5 py-3 text-sm font-black">Clear filters</button>}</div></div>}
  </>;
}

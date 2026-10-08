"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Event } from "@/lib/types";
import { filterEvents } from "@/lib/events";
import { EventCarousel } from "./event-carousel";

export function EventExplorer({ events }: { events: Event[] }) {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const division = params.get("division") ?? "";
  const category = params.get("category") ?? "";
  const day = params.get("day") ?? "";
  const filtered = useMemo(() => filterEvents(events, { q, division, category, day }), [events, q, division, category, day]);

  return <div>
    <div aria-live="polite" className="mb-8 flex items-center justify-between gap-4">
      <p className="text-sm font-bold text-[#ffae7a]">
        {filtered.length} {filtered.length === 1 ? "event" : "events"} in the lineup
      </p>
    </div>
    {filtered.length
      ? <EventCarousel events={filtered} />
      : <div className="relative overflow-hidden border border-[#684b63] bg-[#201725] p-8 sm:p-12">
          <div className="section-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow">No matching events</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-.05em] text-[#fff4e9] sm:text-5xl">That event route is empty.</h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-[#d4c3d0]">The lineup is updated from organizer-approved content. Open the full list to see every confirmed event.</p>
            <Link href="/events" className="button-flame mt-7 inline-flex min-h-11 items-center px-5 py-3 text-sm font-black">View all events</Link>
          </div>
        </div>}
  </div>;
}

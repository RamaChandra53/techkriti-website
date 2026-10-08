import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { EventExplorer } from "@/components/event-explorer";
import { PageHero } from "@/components/page-hero";
import { events } from "@/lib/content";

export const metadata: Metadata = { title: "Event lineup", description: "Technical and non-technical events at Techriti 2026, MGIT." };

export default function EventsPage() {
  return <><PageHero eyebrow="THE EVENT LINEUP" title="Find your event." copy={events.length ? "Search the lineup, filter by track or day, and see the details before you register through each event’s official Google Form." : "Technical and non-technical events are being finalized. The lineup will appear here with dates, rooms, rules, and direct Google Form links when confirmed."} /><Container className="py-12 sm:py-20"><Suspense fallback={<div className="border border-[#564254] bg-[#1b1420] p-8 text-[#fff4e9]">Loading event lineup…</div>}><EventExplorer events={events} /></Suspense></Container></>;
}

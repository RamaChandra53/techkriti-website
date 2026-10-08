import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { schedule } from "@/lib/content";

export const metadata: Metadata = { title: "Schedule", description: "The Techriti 2026 schedule at MGIT, Hyderabad." };

const days = [{ day: 1, date: "Friday, 16 October" }, { day: 2, date: "Saturday, 17 October" }] as const;

export default function SchedulePage() {
  return <>
    <PageHero eyebrow="16–17 OCTOBER · MGIT" title="Plan your two days." copy="The confirmed event timetable and MGIT rooms will appear here. For now, the dates are set and the individual schedules are being finalized." />
    <Container className="py-16 sm:py-24">
      <div className="grid gap-12">
        {days.map(({ day, date }) => {
          const items = schedule.filter((item) => item.day === day);
          return <section key={day} aria-labelledby={`day-${day}`} className="border-t border-[#5b4559]">
            <div className="grid gap-4 border-b border-[#5b4559] py-7 sm:grid-cols-[7rem_1fr] sm:items-center">
              <span className="text-7xl font-black leading-none tracking-[-.08em] text-[#ff8b4f]">{day === 1 ? "16" : "17"}</span>
              <div><p className="eyebrow">MGIT CAMPUS · OCTOBER 2026</p><h2 id={`day-${day}`} className="mt-2 text-3xl font-black tracking-[-.05em] text-[#fff4e9] sm:text-4xl">{date}</h2></div>
            </div>
            {items.length ? items.map((item) => <div key={item.id} className="grid gap-3 border-b border-[#5b4559] py-6 sm:grid-cols-[8rem_1fr_12rem] sm:items-center">
              <time className="text-xl font-bold text-[#fff4e9]">{item.time}</time>
              <div><p className="eyebrow">{item.category}</p>{item.eventSlug ? <Link href={`/events/${item.eventSlug}`} className="text-link mt-1 inline-block text-xl font-bold text-[#fff4e9]">{item.title}</Link> : <p className="mt-1 text-xl font-bold text-[#fff4e9]">{item.title}</p>}</div>
              <p className="text-sm font-semibold text-[#d2bfce] sm:text-right">{item.venue}</p>
            </div>) : <div className="border-b border-[#5b4559] bg-[#18121e] px-6 py-8"><p className="max-w-2xl leading-relaxed text-[#d2bfce]">Event times and campus rooms for this day have not been announced yet.</p><Link href="/events" className="text-link mt-4 inline-block font-bold text-[#ffb386]">See event updates</Link></div>}
          </section>;
        })}
      </div>
    </Container>
  </>;
}

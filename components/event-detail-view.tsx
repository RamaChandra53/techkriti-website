import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { Event } from "@/lib/types";
import { Container } from "./container";

function RegistrationLink({ event, className = "" }: { event: Event; className?: string }) {
  if (!event.registrationUrl) return null;
  return <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className={`button-flame flex min-h-12 items-center justify-between gap-4 rounded-sm px-5 py-4 font-bold ${className}`}>Register now <ArrowUpRightIcon className="h-5 w-5" aria-hidden="true" /><span className="sr-only"> for {event.title} (Google Form opens in a new tab)</span></a>;
}

export function EventDetailView({ event }: { event: Event }) {
  const dayLabel = event.day ? (event.day === 1 ? "Friday, 16 October" : "Saturday, 17 October") : "16–17 October 2026";
  const rules = event.rules?.length ? <ul className="list-disc space-y-3 pl-5 text-[var(--muted)]">{event.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul> : null;
  return <>
    <section className="section-glow border-b border-[var(--line)] py-10 sm:py-16">
      <Container>
        <Link href="/events" className="text-link inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#ffb386]"><ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> All events</Link>
        <p className="eyebrow mt-8">{event.division} · {event.category}</p>
        <h1 className="display-heading mt-4 max-w-6xl break-words text-[clamp(2.8rem,7vw,7rem)]">{event.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">{event.summary}</p>
      </Container>
    </section>
    <Container className="grid gap-10 py-10 sm:py-16 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16">
      <aside className="order-first h-fit rounded-md border border-[#725467] bg-[var(--surface)] p-6 lg:order-last lg:sticky lg:top-24">
        <h2 className="eyebrow">The essentials</h2>
        <dl className="mt-5 grid gap-5">
          <div><dt className="text-xs font-bold uppercase tracking-[.12em] text-[var(--muted)]">When</dt><dd className="mt-1 font-semibold">{dayLabel}<br />{event.time ?? "Schedule to be announced"}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-[.12em] text-[var(--muted)]">Where</dt><dd className="mt-1 font-semibold">MGIT · {event.venue}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-[.12em] text-[var(--muted)]">Team size</dt><dd className="mt-1 font-semibold">{event.teamSize}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-[.12em] text-[var(--muted)]">Eligibility</dt><dd className="mt-1 leading-relaxed">{event.eligibility}</dd></div>
        </dl>
        {event.registrationUrl ? <><RegistrationLink event={event} className="mt-6 hidden lg:flex" /><p className="mt-4 hidden text-xs text-[var(--muted)] lg:block">Registration opens in Google Forms.</p></> : <p className="mt-6 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted)]">Registration link coming soon.</p>}
      </aside>
      <div className="min-w-0">
        {event.image && <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-md"><Image src={event.image.src} alt={event.image.alt} fill sizes="(max-width: 1024px) 90vw, 60vw" className="object-cover" /></div>}
        <section aria-labelledby="about-event"><h2 id="about-event" className="text-2xl font-extrabold tracking-[-.04em] sm:text-3xl">About the event</h2><p className="muted-copy mt-5 whitespace-pre-line text-base sm:text-lg">{event.description}</p></section>
        {(rules || event.rulesUrl) && <section className="mt-10 border-t border-[var(--line)] pt-7" aria-labelledby="event-rules">
          <h2 id="event-rules" className="text-2xl font-extrabold tracking-[-.04em]">Rules</h2>
          {rules && (event.rules!.length > 4 ? <details className="mt-4 rounded-sm border border-[#725467] p-4"><summary className="min-h-11 cursor-pointer py-2 font-semibold text-[#ffb386]">Read all {event.rules!.length} rules</summary><div className="pb-2 pt-4">{rules}</div></details> : <div className="mt-5">{rules}</div>)}
          {event.rulesUrl && <a href={event.rulesUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-[#ffb386]">Open full rules <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
        </section>}
        {event.prizes && <section className="mt-10 border-t border-[var(--line)] pt-7" aria-labelledby="event-prizes"><h2 id="event-prizes" className="text-2xl font-extrabold tracking-[-.04em]">Prizes</h2><p className="muted-copy mt-5">{event.prizes}</p></section>}
      </div>

    </Container>
    {event.registrationUrl && <div className="event-registration-bar fixed inset-x-0 bottom-0 z-40 border-t border-[#765165] bg-[#0d0a12] p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] lg:hidden"><RegistrationLink event={event} className="mx-auto max-w-lg" /></div>}
  </>;
}

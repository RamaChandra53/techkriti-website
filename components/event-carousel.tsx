"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { Event } from "@/lib/types";

function PumpkinArrow({ direction }: { direction: "left" | "right" }) {
  return <span className="pumpkin-face" aria-hidden="true">
    <svg viewBox="0 0 48 48" fill="none"><path d="M24 10V5m0 4c2-3 5-4 7-3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M24 11c-9-5-18 1-18 13 0 11 8 19 18 19s18-8 18-19c0-12-9-18-18-13Z" fill="currentColor"/><path d="M18 13c-4 5-5 17 0 25M30 13c4 5 5 17 0 25M24 12v29" stroke="#b84e25" strokeWidth="1.4" strokeLinecap="round" opacity=".75"/><path className="pumpkin-direction" d={direction === "left" ? "M31 24H16m0 0 6-6m-6 6 6 6" : "M17 24h15m0 0-6-6m6 6-6 6"} stroke="#fff4e9" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </span>;
}

function EventPoster({ event }: { event: Event }) {
  return <span className="event-poster-artwork">
    {event.image ? <Image src={event.image.src} alt={event.image.alt} fill sizes="(max-width: 640px) 200px, 320px" className="object-cover" /> : <span className="event-poster-placeholder">
      <span className="event-poster-halo" aria-hidden="true" />
      <strong>{event.title}</strong>
      <span className="event-poster-pending">Official poster coming soon</span>
    </span>}
    <span className="event-poster-division">{event.division}</span>
    <span className="event-poster-open" aria-hidden="true"><span>Details</span><ArrowUpRightIcon className="h-3 w-3" /></span>
  </span>;
}

export function EventCarousel({ events }: { events: Event[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<Event | null>(null);
  const [paused, setPaused] = useState(false);
  const [stepSize, setStepSize] = useState(150);
  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<number | null>(null);
  const regionId = useId();
  const count = events.length;
  const active = events[activeIndex];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => setStepSize(Math.min(215, Math.max(105, stage.clientWidth * .22))));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || selected || count < 2) return;
    const timer = window.setInterval(() => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setActiveIndex((index) => (index + 1) % count);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [count, paused, selected]);

  useEffect(() => {
    if (selected && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
      closeRef.current?.focus();
    }
  }, [selected]);

  const move = (direction: number) => setActiveIndex((index) => (index + direction + count) % count);
  const openDetails = (event: Event, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelected(event);
  };
  const closeDetails = () => dialogRef.current?.close();

  return <div className="event-carousel mt-5 sm:mt-7" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    {active ? <div id={regionId} role="region" aria-roledescription="carousel" aria-label="All Techkriti events" tabIndex={0} onKeyDown={(event) => {
      if (dialogRef.current?.open) return;
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "Home") { event.preventDefault(); setActiveIndex(0); }
      if (event.key === "End") { event.preventDefault(); setActiveIndex(count - 1); }
    }} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
      if (touchStart.current === null || dialogRef.current?.open) return;
      const delta = event.changedTouches[0].clientX - touchStart.current;
      if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1);
      touchStart.current = null;
    }}>
      <div ref={stageRef} className="event-fan-stage">
        {events.map((item, index) => {
          const offset = (index - activeIndex + count) % count;
          const signed = offset > count / 2 ? offset - count : offset;
          const visible = Math.abs(signed) <= 2;
          const distance = Math.abs(signed);
          const scale = distance === 0 ? 1 : distance === 1 ? .76 : .56;
          const tilt = signed * (distance === 2 ? -8 : -11);
          return <button key={item.slug} type="button" tabIndex={visible ? 0 : -1} aria-hidden={!visible} aria-label={`Show details for ${item.title}, ${item.division}`} onClick={(event) => openDetails(item, event.currentTarget)} className="event-poster" style={{ transform: `translate(-50%, -50%) translateX(${signed * stepSize}px) rotate(${tilt}deg) scale(${scale})`, opacity: visible ? 1 : 0, zIndex: 5 - distance, pointerEvents: visible ? "auto" : "none" }}>
            <EventPoster event={item} />
          </button>;
        })}
      </div>
      <div className="mt-1 flex items-center justify-center gap-3">
        <button type="button" onClick={() => move(-1)} aria-label="Previous event" aria-controls={regionId} className="pumpkin-control"><PumpkinArrow direction="left" /></button>
        <p aria-live="polite" aria-atomic="true" className="min-w-16 text-center text-sm font-bold tabular-nums text-[#ddc8d5]">{String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}<span className="sr-only"> · {active.title}</span></p>
        <button type="button" onClick={() => move(1)} aria-label="Next event" aria-controls={regionId} className="pumpkin-control"><PumpkinArrow direction="right" /></button>
      </div>
    </div> : <div id={regionId} role="status" className="border border-[#63485d] bg-[var(--surface)] px-6 py-9"><h3 className="text-3xl font-extrabold">The lineup is taking shape.</h3><p className="mt-3 text-[var(--muted)]">Events and registration links will appear here once confirmed.</p></div>}

    <dialog ref={dialogRef} aria-labelledby="event-dialog-title" className="event-detail-dialog" onClose={() => { setSelected(null); triggerRef.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) closeDetails(); }}>
      {selected && <div className="event-dialog-content">
        <div className="flex items-start justify-between gap-3"><span className="event-track-label">{selected.division}</span><button ref={closeRef} type="button" onClick={closeDetails} aria-label="Close event details" className="event-dialog-close">×</button></div>
        <h3 id="event-dialog-title" className="mt-4 text-3xl font-black leading-tight tracking-[-.055em] sm:text-4xl">{selected.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{selected.summary}</p>
        <dl className="event-dialog-facts mt-5">
          <div><dt>When</dt><dd>{selected.day ? (selected.day === 1 ? "16" : "17") : "16–17"} October · {selected.time ?? "Time to be announced"}</dd></div>
          <div><dt>Where</dt><dd>{selected.venue}</dd></div>
          <div><dt>Team</dt><dd>{selected.teamSize}</dd></div>
          <div><dt>Eligibility</dt><dd>{selected.eligibility}</dd></div>
        </dl>
        <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">{selected.description}</p>
        {selected.rules?.length ? <details className="mt-5 border-t border-[var(--line)] pt-4"><summary className="cursor-pointer font-semibold text-[#ffb386]">Event rules</summary><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">{selected.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul></details> : null}
        {selected.registrationUrl ? <a href={selected.registrationUrl} target="_blank" rel="noopener noreferrer" className="register-button mt-6 inline-flex min-h-11 items-center px-5 font-bold">Register now<span className="sr-only"> (Google Form opens in a new tab)</span></a> : <p className="mt-5 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted)]">Registration link coming soon.</p>}
      </div>}
    </dialog>
  </div>;
}

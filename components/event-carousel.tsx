"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { Event } from "@/lib/types";

const selectedPosterKey = "techkriti:selected-event-poster";
const subscribeToStorage = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};
const getSelectedPoster = () => window.sessionStorage.getItem(selectedPosterKey);
const getServerSelectedPoster = () => null;

function PumpkinArrow({ direction }: { direction: "left" | "right" }) {
  return <span className="pumpkin-face" aria-hidden="true">
    <svg viewBox="0 0 48 48" fill="none"><path d="M24 10V5m0 4c2-3 5-4 7-3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M24 11c-9-5-18 1-18 13 0 11 8 19 18 19s18-8 18-19c0-12-9-18-18-13Z" fill="currentColor"/><path d="M18 13c-4 5-5 17 0 25M30 13c4 5 5 17 0 25M24 12v29" stroke="#b84e25" strokeWidth="1.4" strokeLinecap="round" opacity=".75"/><path className="pumpkin-direction" d={direction === "left" ? "M31 24H16m0 0 6-6m-6 6 6 6" : "M17 24h15m0 0-6-6m6 6-6 6"} stroke="#fff4e9" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </span>;
}

function EventPoster({ event }: { event: Event }) {
  return <span className="event-poster-artwork">
    {event.image ? <Image src={event.image.src} alt={event.image.alt} fill sizes="(max-width: 640px) 250px, 440px" className="event-poster-image" /> : <span className="event-poster-placeholder">
      <span className="event-poster-halo" aria-hidden="true" />
      <strong>{event.title}</strong>
      <span className="event-poster-pending">Official poster coming soon</span>
    </span>}
    <span className="event-poster-open" aria-hidden="true"><span>View</span><ArrowUpRightIcon className="h-3 w-3" /></span>
  </span>;
}

export function EventCarousel({ events }: { events: Event[] }) {
  const orderedEvents = [...events].sort((first, second) => Number((first.image?.height ?? 0) <= (first.image?.width ?? 0)) - Number((second.image?.height ?? 0) <= (second.image?.width ?? 0)));
  const selectedSlug = useSyncExternalStore(subscribeToStorage, getSelectedPoster, getServerSelectedPoster);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [stepSize, setStepSize] = useState(150);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const regionId = useId();
  const count = orderedEvents.length;
  const currentIndex = activeIndex ?? Math.max(0, orderedEvents.findIndex((event) => event.slug === selectedSlug));
  const active = orderedEvents[currentIndex];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => setStepSize(Math.min(215, Math.max(105, stage.clientWidth * .22))));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setInterval(() => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setActiveIndex((index) => ((index ?? currentIndex) + 1) % count);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [count, currentIndex, paused]);

  const move = (direction: number) => setActiveIndex((index) => ((index ?? currentIndex) + direction + count) % count);
  return <div className="event-carousel mt-5 sm:mt-7" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    {active ? <div id={regionId} role="region" aria-roledescription="carousel" aria-label="All Techkriti events" tabIndex={0} onKeyDown={(event) => {
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "Home") { event.preventDefault(); setActiveIndex(0); }
      if (event.key === "End") { event.preventDefault(); setActiveIndex(count - 1); }
    }} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
      if (touchStart.current === null) return;
      const delta = event.changedTouches[0].clientX - touchStart.current;
      if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1);
      touchStart.current = null;
    }}>
      <div ref={stageRef} className="event-fan-stage">
        {orderedEvents.map((item, index) => {
          const offset = (index - currentIndex + count) % count;
          const signed = offset > count / 2 ? offset - count : offset;
          const visible = Math.abs(signed) <= 2;
          const distance = Math.abs(signed);
          const scale = distance === 0 ? 1 : distance === 1 ? .76 : .56;
          const tilt = signed * (distance === 2 ? -8 : -11);
          return <Link key={item.slug} href={`/events/${item.slug}`} onClick={() => { window.sessionStorage.setItem(selectedPosterKey, item.slug); setActiveIndex(index); }} tabIndex={visible ? 0 : -1} aria-hidden={!visible} aria-label={`View ${item.title} event page, ${item.division}`} className={`event-poster ${item.image && (item.image.height ?? 1) > (item.image.width ?? 1) ? "event-poster-portrait" : "event-poster-landscape"} ${distance === 0 ? "event-poster-active" : ""}`} style={{ transform: `translate(-50%, -50%) translateX(${signed * stepSize}px) rotate(${tilt}deg) scale(${scale})`, opacity: visible ? 1 : 0, zIndex: 5 - distance, pointerEvents: visible ? "auto" : "none" }}>
            <EventPoster event={item} />
          </Link>;
        })}
      </div>
      <div className="mt-1 flex items-center justify-center gap-3">
        <button type="button" onClick={() => move(-1)} aria-label="Previous event" aria-controls={regionId} className="pumpkin-control"><PumpkinArrow direction="left" /></button>
        <p aria-live="polite" aria-atomic="true" className="min-w-16 text-center text-sm font-bold tabular-nums text-[#ddc8d5]">{String(currentIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}<span className="sr-only"> · {active.title}</span></p>
        <button type="button" onClick={() => move(1)} aria-label="Next event" aria-controls={regionId} className="pumpkin-control"><PumpkinArrow direction="right" /></button>
      </div>
    </div> : <div id={regionId} role="status" className="border border-[#63485d] bg-[var(--surface)] px-6 py-9"><h3 className="text-3xl font-extrabold">The lineup is taking shape.</h3><p className="mt-3 text-[var(--muted)]">Events and registration links will appear here once confirmed.</p></div>}

  </div>;
}

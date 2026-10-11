"use client";

import { useEffect, useState } from "react";

// Count down to the confirmed calendar date, not an unconfirmed opening time.
const FESTIVAL_DATE = Date.parse("2026-10-16T00:00:00+05:30");

export function FestivalCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, FESTIVAL_DATE - Date.now()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const values = remaining === null ? [null, null, null, null] : [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
  return <div className="festival-countdown">
    <p className="eyebrow mb-3">{remaining === 0 ? "The festival date has arrived" : "Until 16 October"}</p>
    <div className="countdown-digits" role="timer" aria-label="Time until 16 October 2026, midnight India Standard Time" aria-live="off">
      {values.map((value, index) => <div className="countdown-unit" key={index}><span>{value === null ? "—" : String(value).padStart(2, "0")}</span><small>{["Days", "Hours", "Minutes", "Seconds"][index]}</small></div>)}
    </div>
    <p className="mt-2 text-xs text-[var(--muted)]">Opening time to be announced · IST</p>
  </div>;
}

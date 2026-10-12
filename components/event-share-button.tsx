"use client";

import { ShareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function EventShareButton({ title }: { title: string }) {
  const [status, setStatus] = useState("");

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${title} · Techkriti`, url });
        setStatus("Shared");
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("Link copied");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Unable to copy link");
    }
  };

  return <div className="flex items-center gap-2">
    <button type="button" onClick={share} className="event-share inline-flex min-h-11 items-center gap-2 px-3 text-sm font-bold">
      <ShareIcon className="h-5 w-5" aria-hidden="true" /> Share
    </button>
    <span className="text-xs text-[var(--muted)]" role="status" aria-live="polite">{status}</span>
  </div>;
}

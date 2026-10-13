"use client";

import Link from "next/link";

export function ExploreEventsLink() {
  return <Link href="#discover" onClick={(event) => {
    event.preventDefault();
    window.history.pushState(null, "", "/#discover");
    window.dispatchEvent(new CustomEvent("homepage-section-change", { detail: { section: "discover" } }));
    document.getElementById("discover")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }} className="header-register hero-copy mt-4 inline-flex min-h-10 items-center self-center justify-center rounded-full px-5 py-2 text-sm font-bold">Explore events</Link>;
}

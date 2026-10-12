"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { Container } from "./container";

const menuItems = [
  { label: "Home", href: "/#home" },
  { label: "Events", href: "/#discover" },
  { label: "Past", href: "/gallery" },
  { label: "Sponsors", href: "/sponsors" },
] as const;

function selectedItem(pathname: string, hash: string) {
  if (pathname.startsWith("/events")) return 1;
  if (pathname === "/" && hash === "#discover") return 1;
  const index = menuItems.findIndex((item) => item.href === pathname);
  return index < 0 ? 0 : index;
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(() => selectedItem(pathname, ""));
  const [thumb, setThumb] = useState({ left: 0, width: 0 });
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dragRef = useRef<{ pointerId: number; startX: number; left: number; width: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    const sync = () => setActive(selectedItem(pathname, window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const link = linkRefs.current[active];
    if (!track || !link) return;
    const measure = () => {
      const trackBounds = track.getBoundingClientRect();
      const linkBounds = link.getBoundingClientRect();
      const next = { left: linkBounds.left - trackBounds.left + track.scrollLeft, width: linkBounds.width };
      const element = thumbRef.current;
      const previous = element?.getBoundingClientRect();
      element?.getAnimations().forEach((animation) => animation.cancel());
      setThumb(next);
      if (element && previous && previous.width > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const from = previous.left - trackBounds.left + track.scrollLeft;
        const stretchLeft = Math.min(from, next.left);
        const stretchRight = Math.max(from + previous.width, next.left + next.width);
        if (Math.abs(from - next.left) > 1) element.animate([
          { left: `${from}px`, width: `${previous.width}px`, transform: "scaleY(1)", offset: 0 },
          { left: `${stretchLeft}px`, width: `${stretchRight - stretchLeft}px`, transform: "scaleY(.82)", offset: .38 },
          { left: `${next.left - 3}px`, width: `${next.width + 6}px`, transform: "scaleY(1.06)", offset: .8 },
          { left: `${next.left}px`, width: `${next.width}px`, transform: "scaleY(1)", offset: 1 },
        ], { duration: 560, easing: "cubic-bezier(.23,1,.32,1)" });
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(link);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    linkRefs.current[active]?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "nearest", inline: "nearest" });
  }, [active]);

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || !trackRef.current) return;
    const bounds = trackRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left + trackRef.current.scrollLeft;
    if (x < thumb.left || x > thumb.left + thumb.width) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, left: thumb.left, width: thumb.width, moved: false };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(delta) < 4) return;
    if (!drag.moved) track.setPointerCapture(event.pointerId);
    drag.moved = true;
    thumbRef.current?.getAnimations().forEach((animation) => animation.cancel());
    setDragging(true);
    const maxLeft = track.scrollWidth - drag.width;
    setThumb({ left: Math.max(0, Math.min(maxLeft, drag.left + delta)), width: drag.width });
  };

  const onPointerEnd = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (!drag.moved) return;
    suppressClick.current = true;
    window.setTimeout(() => { suppressClick.current = false; }, 0);
    const left = Math.max(0, Math.min(track.scrollWidth - drag.width, drag.left + event.clientX - drag.startX));
    const center = left + drag.width / 2;
    const trackBounds = track.getBoundingClientRect();
    const nearest = linkRefs.current.reduce((best, link, index) => {
      if (!link) return best;
      const bounds = link.getBoundingClientRect();
      const distance = Math.abs(bounds.left - trackBounds.left + track.scrollLeft + bounds.width / 2 - center);
      return distance < best.distance ? { index, distance } : best;
    }, { index: active, distance: Infinity }).index;
    setActive(nearest);
    const target = linkRefs.current[nearest];
    if (target) setThumb({ left: target.getBoundingClientRect().left - trackBounds.left + track.scrollLeft, width: target.getBoundingClientRect().width });
    router.push(menuItems[nearest].href);
  };

  return <header className="site-header-plum sticky top-0 z-50 text-[#fff4e9]">
    <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2 xl:min-h-[104px] xl:flex-nowrap">
      <Logo />
      <nav
        ref={trackRef}
        aria-label="Main navigation"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={() => { dragRef.current = null; setDragging(false); const link = linkRefs.current[active]; if (link && trackRef.current) setThumb({ left: link.offsetLeft, width: link.offsetWidth }); }}
        onDragStart={(event) => event.preventDefault()}
        className="header-segments order-3 grid w-full grid-cols-4 items-center overflow-x-auto rounded-full bg-black p-1.5 xl:order-none xl:w-auto xl:overflow-visible"
      >
        <span ref={thumbRef} className={`header-segments-thumb ${dragging ? "header-segments-thumb-dragging" : ""}`} style={{ left: thumb.left, width: thumb.width }} aria-hidden="true" />
        {menuItems.map((item, index) => <Link
          key={item.label}
          ref={(element) => { linkRefs.current[index] = element; }}
          href={item.href}
          aria-current={active === index ? "page" : undefined}
          onClick={(event) => { if (suppressClick.current) { event.preventDefault(); suppressClick.current = false; return; } setActive(index); }}
          className={`header-segment relative z-10 inline-flex min-h-10 w-full items-center justify-center rounded-full px-3 text-sm font-bold xl:min-h-12 2xl:px-4 2xl:text-base ${active === index ? "text-[#170d11]" : "text-[#fff4e9] hover:text-[#ffae7a]"}`}
        >{item.label}</Link>)}
      </nav>
    </Container>
  </header>;
}

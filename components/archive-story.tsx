"use client";

import Image from "next/image";
import { AnimatePresence, motion, useIsPresent, useMotionValue, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { archivePhotos, type ArchivePhoto } from "@/lib/archive";

export function ArchiveFigure({ photo, wide = false, className = "" }: { photo: ArchivePhoto; wide?: boolean; className?: string }) {
  return <figure className={`min-w-0 ${className}`}>
    <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Open larger photo: ${photo.alt} (new tab)`} className={`archive-image group relative block overflow-hidden rounded-sm bg-[var(--surface)] ${wide ? "aspect-[4/3] sm:aspect-[1.85]" : "aspect-[4/5] sm:aspect-[5/4]"}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={wide ? "(max-width: 640px) calc(100vw - 40px), (max-width: 1400px) 90vw, 1304px" : "(max-width: 640px) calc(50vw - 28px), (max-width: 1400px) 45vw, 636px"} className="object-cover" />
    </a>
    <figcaption className="mt-3 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">{photo.caption}</figcaption>
  </figure>;
}

function StackCard({ photo, depth, number, advance, onInteract, showCue }: { photo: ArchivePhoto; depth: number; number: number; advance: () => void; onInteract: () => void; showCue: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const suppressClick = useRef(false);
  const isFront = depth === 0;
  const isPresent = useIsPresent();

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    x.set(0);
    y.set(0);
    if (Math.abs(info.offset.x) > 75 || Math.abs(info.offset.y) > 75) advance();
    window.setTimeout(() => { suppressClick.current = false; }, 0);
  }

  return <motion.button
    type="button"
    className={`archive-carousel-card ${showCue ? "archive-carousel-card-invite" : ""}`}
    style={{ zIndex: 5 - depth, x: isFront ? x : 0, y: isFront ? y : 0, pointerEvents: isPresent && isFront ? "auto" : "none" }}
    initial={{ opacity: 0, scale: .94 }}
    animate={{ opacity: 1, top: -depth * 9, left: depth === 0 ? 0 : depth % 2 ? -depth * 18 : depth * 16, rotateZ: depth * (depth % 2 ? -6 : 6), scale: 1 - depth * .035 }}
    exit={isFront ? { opacity: 0, x: 115, rotateZ: 12, scale: .95 } : { opacity: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    drag={isFront}
    dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
    dragElastic={.45}
    dragMomentum={false}
    onPointerDown={onInteract}
    onDragStart={() => { onInteract(); suppressClick.current = true; }}
    onDragEnd={handleDragEnd}
    onClick={() => { onInteract(); if (!suppressClick.current) advance(); }}
    tabIndex={isPresent && isFront ? 0 : -1}
    aria-hidden={!isPresent || !isFront}
    aria-label={isPresent && isFront ? `Photo ${number} of ${archivePhotos.length}: ${photo.alt}. Show next photo` : undefined}
  >
    <span className="archive-carousel-photo"><Image src={photo.src} alt="" fill sizes="(max-width: 640px) 86vw, 620px" className="pointer-events-none object-contain" draggable={false} priority={isFront && number === 1} /></span>
    {showCue && <span className="archive-carousel-cue" aria-hidden="true">Touch or drag <span>→</span></span>}
    <span className="archive-ornament-ghost" aria-hidden="true"><svg viewBox="0 0 28 28"><path d="M5 24V13C5 6 9 3 14 3s9 3 9 10v11l-3-2-3 2-3-2-3 2-3-2-3 2Z"/><circle cx="11" cy="12" r="1.4"/><circle cx="17" cy="12" r="1.4"/></svg></span>
  </motion.button>;
}

export function ArchiveStory() {
  const [order, setOrder] = useState(() => archivePhotos.map((_, index) => index));
  const [interacted, setInteracted] = useState(false);
  const currentIndex = order[0];
  const visible = order.slice(0, 4);
  const advance = useCallback(() => setOrder((previous) => [...previous.slice(1), previous[0]]), []);
  const stopAutoTurn = useCallback(() => setInteracted(true), []);

  useEffect(() => {
    if (interacted) return;
    const timer = window.setInterval(advance, 5000);
    return () => window.clearInterval(timer);
  }, [advance, interacted]);

  return <div className="archive-carousel" aria-label="February 2026 Techkriti photo archive">
    <div className="archive-carousel-stage">
      <AnimatePresence initial={false}>
        {visible.map((photoIndex, depth) => <StackCard key={archivePhotos[photoIndex].src} photo={archivePhotos[photoIndex]} depth={depth} number={photoIndex + 1} advance={advance} onInteract={stopAutoTurn} showCue={depth === 0 && !interacted} />)}
      </AnimatePresence>
    </div>
    <div className="archive-carousel-meta" aria-live="polite" aria-atomic="true">
      <span className="archive-carousel-count">{String(currentIndex + 1).padStart(2, "0")} / {archivePhotos.length}</span>
    </div>
  </div>;
}

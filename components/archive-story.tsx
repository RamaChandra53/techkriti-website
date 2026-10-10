"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useTransform, type PanInfo } from "framer-motion";
import { useRef, useState } from "react";
import { archivePhotos, type ArchivePhoto } from "@/lib/archive";

export function ArchiveFigure({ photo, wide = false, className = "" }: { photo: ArchivePhoto; wide?: boolean; className?: string }) {
  return <figure className={`min-w-0 ${className}`}>
    <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Open larger photo: ${photo.alt} (new tab)`} className={`archive-image group relative block overflow-hidden rounded-sm bg-[var(--surface)] ${wide ? "aspect-[4/3] sm:aspect-[1.85]" : "aspect-[4/5] sm:aspect-[5/4]"}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={wide ? "(max-width: 640px) calc(100vw - 40px), (max-width: 1400px) 90vw, 1304px" : "(max-width: 640px) calc(50vw - 28px), (max-width: 1400px) 45vw, 636px"} className="object-cover" />
    </a>
    <figcaption className="mt-3 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">{photo.caption}</figcaption>
  </figure>;
}

function StackCard({ photo, depth, number, advance }: { photo: ArchivePhoto; depth: number; number: number; advance: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-180, 180], [14, -14]);
  const rotateY = useTransform(x, [-180, 180], [-14, 14]);
  const reduceMotion = useReducedMotion();
  const suppressClick = useRef(false);
  const isFront = depth === 0;

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    x.set(0);
    y.set(0);
    if (Math.abs(info.offset.x) > 75 || Math.abs(info.offset.y) > 75) advance();
    window.setTimeout(() => { suppressClick.current = false; }, 0);
  }

  return <motion.button
    type="button"
    className="archive-carousel-card"
    style={{ zIndex: 5 - depth, top: -depth * 9, left: depth === 0 ? 0 : depth % 2 ? -depth * 18 : depth * 16, x: isFront ? x : 0, y: isFront ? y : 0, rotateX: isFront && !reduceMotion ? rotateX : 0, rotateY: isFront && !reduceMotion ? rotateY : 0 }}
    animate={{ rotateZ: reduceMotion ? 0 : depth * (depth % 2 ? -6 : 6), scale: 1 - depth * .035 }}
    initial={false}
    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
    drag={isFront}
    dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
    dragElastic={.45}
    dragMomentum={false}
    onDragStart={() => { suppressClick.current = true; }}
    onDragEnd={handleDragEnd}
    onClick={() => { if (!suppressClick.current) advance(); }}
    tabIndex={isFront ? 0 : -1}
    aria-hidden={!isFront}
    aria-label={isFront ? `Photo ${number} of ${archivePhotos.length}: ${photo.alt}. Show next photo` : undefined}
  >
    <span className="archive-carousel-photo"><Image src={photo.src} alt="" fill sizes="(max-width: 640px) 86vw, 620px" className="pointer-events-none object-contain" draggable={false} priority={isFront && number === 1} /></span>
  </motion.button>;
}

export function ArchiveStory() {
  const [order, setOrder] = useState(() => archivePhotos.map((_, index) => index));
  const currentIndex = order[0];
  const currentPhoto = archivePhotos[currentIndex];
  const visible = order.slice(0, 4);
  const advance = () => setOrder((previous) => [...previous.slice(1), previous[0]]);

  return <div className="archive-carousel" aria-label="February 2026 Techkriti photo archive">
    <div className="archive-carousel-stage" data-orientation={currentPhoto.height > 1800 ? "portrait" : "landscape"} style={{ aspectRatio: `1800 / ${currentPhoto.height}` }}>
      {visible.map((photoIndex, depth) => <StackCard key={archivePhotos[photoIndex].src} photo={archivePhotos[photoIndex]} depth={depth} number={photoIndex + 1} advance={advance} />)}
    </div>
    <p className="archive-carousel-hint">Swipe, drag, or tap the top photo to explore all 19 memories.</p>
    <div className="archive-carousel-meta" aria-live="polite" aria-atomic="true">
      <span className="archive-carousel-count">{String(currentIndex + 1).padStart(2, "0")} / {archivePhotos.length}</span>
      <span className="archive-carousel-caption">{currentPhoto.caption}</span>
    </div>
  </div>;
}

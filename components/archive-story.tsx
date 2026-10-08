import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { archivePhotos, type ArchivePhoto } from "@/lib/archive";

export function ArchiveFigure({ photo, wide = false, className = "" }: { photo: ArchivePhoto; wide?: boolean; className?: string }) {
  return <figure className={`min-w-0 ${className}`}>
    <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Open larger photo: ${photo.alt} (new tab)`} className={`archive-image group relative block overflow-hidden rounded-sm bg-[var(--surface)] ${wide ? "aspect-[4/3] sm:aspect-[1.85]" : "aspect-[4/5] sm:aspect-[5/4]"}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={wide ? "(max-width: 640px) calc(100vw - 40px), (max-width: 1400px) 90vw, 1304px" : "(max-width: 640px) calc(50vw - 28px), (max-width: 1400px) 45vw, 636px"} className="object-cover" />
      <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-sm border border-white/40 bg-[#100a13]/85 text-white" aria-hidden="true"><ArrowUpRightIcon className="h-4 w-4" /></span>
    </a>
    <figcaption className="mt-3 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">{photo.caption}</figcaption>
  </figure>;
}

export function ArchiveStory() {
  return <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-10">
    <ArchiveFigure photo={archivePhotos[0]} wide className="col-span-2" />
    <ArchiveFigure photo={archivePhotos[3]} />
    <ArchiveFigure photo={archivePhotos[1]} className="pt-8 sm:pt-16" />
    <ArchiveFigure photo={archivePhotos[2]} wide className="col-span-2" />
  </div>;
}

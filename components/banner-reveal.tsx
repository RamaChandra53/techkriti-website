import { siteConfig } from "@/lib/content";
import { Container } from "./container";

export function BannerReveal() {
  const videoUrl = siteConfig.bannerVideoUrl;
  return <section id="revelation" aria-labelledby="reveal-title" className="scroll-mt-24 border-b border-[var(--line)] bg-[#110c16]/70 pb-12 pt-6 sm:py-20">
    <Container>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="reveal-title" className="text-2xl font-extrabold tracking-[-.055em] sm:text-4xl">The revelation.</h2>
        <p className="eyebrow">October 2026</p>
      </div>
      <div className="revelation-frame relative overflow-hidden rounded-sm border border-[#60414e]">
        {videoUrl ? <video className="block aspect-[16/9] h-auto w-full bg-black object-contain" controls playsInline preload="metadata" aria-label="Techkriti October 2026 banner revelation video">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video> : <div className="grid aspect-[16/9] min-h-44 place-items-center px-5 text-center sm:aspect-[2.3/1]">
          <div><p className="text-[clamp(1.9rem,5vw,5rem)] font-black uppercase leading-none tracking-[-.06em] text-[#f8e4d5]">Still under wraps.</p><p className="mt-4 text-xs font-semibold uppercase tracking-[.16em] text-[#e8bca4] sm:text-sm">The banner film is coming.</p></div>
        </div>}
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">Techkriti · October 2026 banner revelation</p>
    </Container>
  </section>;
}

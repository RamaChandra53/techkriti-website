import { siteConfig } from "@/lib/content";
import { Container } from "./container";

export function BannerReveal() {
  const videoUrl = siteConfig.previousBannerVideoUrl;
  return <section id="revelation" aria-labelledby="reveal-title" className="scroll-mt-24 bg-[#110c16]/58 pb-8 pt-2 sm:pb-11 sm:pt-4">
    <Container>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="reveal-title" className="display-heading text-3xl sm:text-4xl">The revelation.</h2>
        <p className="eyebrow">February 2026 · Previous edition</p>
      </div>
      {videoUrl ? <video className="revelation-video block h-auto w-full" controls playsInline preload="metadata" aria-label="Techkriti February 2026 banner revelation video">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video> : <div className="revelation-frame grid aspect-[16/9] min-h-44 place-items-center px-5 text-center sm:aspect-[2.3/1]">
          <div><p className="text-[clamp(1.9rem,5vw,5rem)] font-black uppercase leading-none tracking-[-.06em] text-[#f8e4d5]">Still under wraps.</p><p className="mt-4 text-xs font-semibold uppercase tracking-[.16em] text-[#e8bca4] sm:text-sm">The banner film is coming.</p></div>
        </div>}
    </Container>
  </section>;
}

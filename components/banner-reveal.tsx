import { siteConfig } from "@/lib/content";
import { Container } from "./container";

export function BannerReveal() {
  const videoUrl = siteConfig.bannerVideoUrl || siteConfig.previousBannerVideoUrl;
  const isPreviousEdition = !siteConfig.bannerVideoUrl && Boolean(siteConfig.previousBannerVideoUrl);
  const videoType = videoUrl?.toLowerCase().split("?")[0].endsWith(".webm") ? "video/webm" : "video/mp4";
  return <section aria-labelledby="reveal-title" className="relative overflow-hidden bg-[#0e0a14] py-20 text-[#fff4e9] sm:py-32">
    <div className="section-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
    <Container className="relative grid items-center gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
      <div><p className="eyebrow">A moment worth waiting for</p><h2 id="reveal-title" className="display-heading mt-5 max-w-xl text-[clamp(3rem,5.4vw,6rem)]">The<br /><span className="text-[#ff8b4f]">revelation.</span></h2><p className="muted-copy mt-6 max-w-lg text-lg">{siteConfig.bannerVideoUrl ? "Watch the official banner revelation for the October Halloween edition." : isPreviousEdition ? "The October reveal is still being prepared. This film looks back at the February 2026 edition, not the upcoming Halloween fest." : "The October banner revelation belongs here. We will share the official film as soon as the organizers release it."}</p><p className="mt-7 border-l-2 border-[#ff7938] pl-4 text-sm font-bold text-[#ffb386]">{siteConfig.bannerVideoUrl ? "October 2026 edition" : isPreviousEdition ? "February 2026 archive film · October reveal coming later" : "October 2026 film not yet released"}</p></div>
      <div className="relative aspect-video overflow-hidden border border-[#765165] bg-[#241524] shadow-[0_25px_80px_rgba(0,0,0,.38)]">
        {videoUrl ? <video className="h-full w-full object-cover" controls playsInline preload="none" poster={isPreviousEdition ? siteConfig.previousBannerPosterUrl : undefined} aria-label={isPreviousEdition ? "February 2026 previous-edition banner revelation video" : "October 2026 Halloween banner revelation video"}><source src={videoUrl} type={videoType} />Your browser does not support video playback.</video> : <div className="relative grid h-full place-items-center overflow-hidden p-5"><div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#b84f29]/30 blur-[55px]" aria-hidden="true" /><div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[#0b0811] to-transparent" aria-hidden="true" /><div className="relative text-center"><p className="text-xs font-black uppercase tracking-[.2em] text-[#ffb386]">TECHKRITI · OCTOBER 2026</p><p className="mt-5 text-[clamp(2.2rem,4.5vw,5rem)] font-black leading-[.94] tracking-[-.075em]">The next look<br /><span className="text-[#ff8b4f]">is coming.</span></p></div></div>}
      </div>
    </Container>
  </section>;
}
